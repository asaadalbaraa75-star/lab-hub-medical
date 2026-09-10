/**
 * HISTOLOGY DATA SOURCE:
 * Primary Source: "Histology Lab" Handout (histology_260910_135413.pdf)
 * Author: Dr. Ruqia Y. Sharaf Addin
 * Institution: Sana'a University, Faculty of Medicine, First Year Medical Practical Curriculum.
 *
 * All terminology, specimen sources, stains, and identification points strictly adhere
 * to this verified faculty curriculum.
 */

export interface MicroscopePart {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'lenses' | 'adjustments' | 'movable' | 'constant';
  categoryLabelEn: string;
  categoryLabelAr: string;
  explanation: string;
  function: string;
  practicalIdentificationPoint: string;
  x: number; // percentage on diagram (0-100)
  y: number; // percentage on diagram (0-100)
}

export interface SlidePrepStep {
  stepNumber: number;
  titleEn: string;
  titleAr: string;
  reagent: string;
  purpose: string;
  details: string[];
  keyPracticalNote: string;
  temperatureOrDuration?: string;
}

export interface HistologicalStain {
  id: string;
  name: string;
  nameAr: string;
  category: 'acidic' | 'basic' | 'neutral';
  categoryLabel: string;
  charge: string;
  whatItStains: string[];
  expectedColor: string;
  colorHex: string;
  practicalIdentification: string;
  examPearl: string;
}

export interface OrganelleStudy {
  id: string;
  nameEn: string;
  nameAr: string;
  type: 'membranous' | 'non_membranous' | 'granule';
  structureAndPolarity: string;
  mainFunction: string;
  specialStain: string;
  slideSpecimenSource: string;
  appearanceUnderHE: string;
  appearanceUnderSpecialStain: string;
  practicalIdentificationPoints: string[];
  clinicalSignificance: string;
}

export interface MitosisStage {
  stageNumber: number;
  nameEn: string;
  nameAr: string;
  phase: 'karyokinesis' | 'cytokinesis';
  morphology: string;
  chromosomeAppearance: string;
  nuclearChanges: string;
  practicalIdentificationClue: string;
  plantVsAnimalClue: string;
}

export interface EpithelialTissueStudy {
  id: string;
  typeNumber: number;
  nameEn: string;
  nameAr: string;
  category: 'simple' | 'stratified' | 'specialized';
  definition: string;
  numberOfLayers: string;
  cellShape: string;
  nucleusAppearance: string;
  mainFunction: string;
  sites: string[];
  practicalSlideTitle: string;
  sourceTissue: string;
  stainUsed: string;
  howToIdentifyUnderMicroscope: string[];
  commonConfusionExamTrap: string;
  highYieldExamQuestion: {
    question: string;
    correctAnswer: string;
    explanation: string;
  };
}

export interface ConnectiveTissueStudy {
  id: string;
  typeNumber: number;
  nameEn: string;
  nameAr: string;
  category: 'loose' | 'dense' | 'general';
  definition: string;
  predominantCells: string[];
  fibersPresent: string[];
  extracellularMatrix: string;
  mainFunction: string;
  locations: string[];
  specimenSource: string;
  stainUsed: string;
  microscopicIdentificationClues: string[];
  examTrap: string;
}

// ==========================================
// LESSON 1: INTRODUCTION TO HISTOLOGY
// ==========================================
export const HISTOLOGY_INTRO_DATA = {
  titleEn: 'Introduction to Histology',
  titleAr: 'مقدمة في علم الأنسجة والخلايا (Histology)',
  sourceCredit: "Dr. Ruqia Y. Sharaf Addin — Faculty of Medicine, Sana'a University (1st Year)",
  definition: {
    en: 'Histology (derived from Greek: histos = web/tissue, and logos = science/study) is the branch of biological science that studies the microscopic anatomy of normal cells, tissues, and organs of the human body.',
    ar: 'علم الأنسجة (Histology) هو فرع العلوم الطبية الذي يختص بدراسة التركيب المجهري الدقيق للخلايا، الأنسجة، والأعضاء السليمة في جسم الإنسان.'
  },
  goalsOfStudying: [
    {
      titleEn: 'Understanding Microscopic Architecture',
      titleAr: 'فهم البنية المجهرية الطبيعية',
      descEn: 'Grasping the detailed microscopic arrangement of cells and extracellular matrix in the 4 fundamental tissues (Epithelial, Connective, Muscular, Nervous).',
      descAr: 'استيعاب الترتيب المجهري الدقيق للأنسجة الأساسية الأربعة في جسم الإنسان (الطلائي، الضام، العضلي، والعصبي).'
    },
    {
      titleEn: 'Structure-Function Relationship',
      titleAr: 'العلاقة التكاملية بين التركيب والوظيفة',
      descEn: 'Recognizing how specific cellular features (e.g., microvilli for absorption, cilia for transport, thick basement membranes for filtration) directly enable physiological tasks.',
      descAr: 'إدراك كيف أن كل تفصيلة مجهرية (كالخملات للامتصاص، والأهداب للحركة، والأغشية القاعدية للترشيح) مصممة لتأدية وظيفة فسيولوجية محددة.'
    },
    {
      titleEn: 'Scientific Basis for Histopathology',
      titleAr: 'الأساس العلمي لفهم علم الأمراض (Pathology)',
      descEn: 'Serving as the indispensable baseline: a clinician or pathologist cannot detect tissue dysplasia, inflammation, necrosis, or malignant tumors without knowing normal histology.',
      descAr: 'توفير المرجع الطبي الحتمي؛ إذ يستحيل على الطبيب تشخيص الالتهاب أو التنخر أو الأورام السرطانية دون معرفة الهيئة النسيجية الطبيعية السليمة أولاً.'
    },
    {
      titleEn: 'Histology and Treatment of Diseased / Injured Tissue',
      titleAr: 'توجيه خطط العلاج وترميم الأنسجة المصابة',
      descEn: 'Evaluating surgical margins in biopsies, assessing wound healing and tissue regeneration, and monitoring tissue responses to pharmacological therapy.',
      descAr: 'فحص حواف الاستئصال الجراحي في الخزعات، ومتابعة التئام الجروح وتجدد الأنسجة، وتقييم استجابة العضو المصاب للأدوية والعلاج.'
    }
  ]
};

// ==========================================
// LESSON 2: MICROSCOPES & COMPARISON
// ==========================================
export const MICROSCOPES_LESSON_DATA = {
  titleEn: 'Microscopes in Medical Practice',
  titleAr: 'المجاهر الطبية وأنواعها (Microscopes)',
  lightMicroscopes: [
    {
      nameEn: 'Simple Microscope',
      nameAr: 'المجهر البسيط',
      optics: 'Uses a single lens system (e.g. magnifying loupe) with limited magnification.',
      use: 'Basic macroscopic inspection of skin surfaces and large specimens.'
    },
    {
      nameEn: 'Compound Light Microscope',
      nameAr: 'المجهر الضوئي المركب',
      optics: 'Uses two lens systems (objective + eyepiece) with total magnification = Objective × Eyepiece (up to 1000x–1500x).',
      use: 'The primary workhorse in histology and pathology practical labs for stained tissue sections.'
    },
    {
      nameEn: 'Phase Contrast Microscope',
      nameAr: 'مجهر تباين الأطوار',
      optics: 'Converts invisible phase differences of light waves passing through living cells into visible intensity/brightness changes.',
      use: 'Observing LIVING unstained cultured cells, living spermatozoa, and mitotic cell movements without fixation.'
    },
    {
      nameEn: 'Fluorescent Microscope',
      nameAr: 'المجهر الفلوري',
      optics: 'Uses high-energy ultraviolet (UV) light to illuminate specimens labeled with fluorescent fluorophores which emit visible light.',
      use: 'Immunofluorescence in diagnostic nephrology (kidney biopsy immune complexes), autoimmunity (ANA), and viral antigen detection.'
    },
    {
      nameEn: 'Dark-Ground (Dark-Field) Microscope',
      nameAr: 'مجهر الحقل المظلم',
      optics: 'A special central stop condenser prevents direct light from entering the objective; only light scattered/refracted by the specimen enters.',
      use: 'Specimen appears bright/luminous against a completely black background. Ideal for slender unstained microorganisms (e.g., Treponema pallidum).'
    }
  ],
  electronMicroscopes: {
    tem: {
      nameEn: 'Transmission Electron Microscope (TEM)',
      nameAr: 'المجهر الإلكتروني النافذ',
      radiationSource: 'High-voltage beam of electrons (wavelength ~0.005 nm).',
      lenses: 'Electromagnetic coils focusing the electron beam.',
      sectionThickness: 'Ultra-thin sections (50–100 nm) cut with diamond knife on ultramicrotome.',
      specimenSupport: 'Mounted on fine copper mesh grids (glass slides block electrons).',
      magnification: 'Up to 500,000x – 1,000,000x.',
      resolution: 'Extremely high (~0.2 nm, revealing molecular bilayers).',
      imageType: 'Two-dimensional (2D) internal ultrastructure (organelles, cristae, ribosomes, nuclear pores).',
      viewing: 'Florescent screen or digital CCD camera in vacuum chamber.'
    },
    sem: {
      nameEn: 'Scanning Electron Microscope (SEM)',
      nameAr: 'المجهر الإلكتروني الماسح',
      radiationSource: 'Focused fine beam of electrons that scans back-and-forth across the specimen surface.',
      lenses: 'Electromagnetic condenser and scanning deflector coils.',
      sectionThickness: 'No sectioning required; whole specimen fixed and coated with heavy metal (gold/platinum).',
      specimenSupport: 'Mounted on solid metal aluminum stub.',
      magnification: '10,000x – 100,000x.',
      resolution: '1 – 10 nm (lower than TEM).',
      imageType: 'Striking Three-dimensional (3D) surface topography, contours, cilia, and external microvilli.',
      viewing: 'Cathode ray tube / high-resolution digital monitor.'
    }
  },
  comparisonTable: [
    { feature: 'Electron Beam Trajectory', tem: 'Transmits THROUGH ultra-thin slice', sem: 'SCANS across the outer specimen surface' },
    { feature: 'Image Dimensionality', tem: '2D internal ultrastructural slice', sem: '3D surface topography with realistic depth' },
    { feature: 'Section Thickness', tem: '50 – 100 nm (ultra-thin slice mandatory)', sem: 'Whole intact specimen (no microtome slicing)' },
    { feature: 'Specimen Coating', tem: 'Heavy metal stains (Uranyl acetate & Lead citrate)', sem: 'Gold / Platinum surface sputter coating' },
    { feature: 'Resolution Limit', tem: '~0.2 nm (atomic/molecular resolution)', sem: '~1 – 10 nm' },
    { feature: 'Maximum Useful Magnification', tem: 'Up to 1,000,000x', sem: 'Up to 100,000x' },
    { feature: 'Primary Diagnostic Use', tem: 'Subcellular organelles, basement membrane podocytes, viral particles', sem: 'Ciliated respiratory epithelium, glomeruli surface, RBC sickle shapes' }
  ]
};

// ==========================================
// LESSON 3: COMPOUND LIGHT MICROSCOPE (THE 12 EXACT PARTS)
// 3 Lenses, 3 Adjustments, 3 Movable Parts, 3 Constant Parts
// ==========================================
export const COMPOUND_MICROSCOPE_PARTS: MicroscopePart[] = [
  // --- THREE LENSES ---
  {
    id: 'eye_lens',
    nameEn: 'Eye Lens (Ocular Lens / Eyepiece)',
    nameAr: 'العدسة العينية (Eyepiece)',
    category: 'lenses',
    categoryLabelEn: 'Three Lenses',
    categoryLabelAr: 'العدسات الثلاث',
    explanation: 'The top lens cylinder that the observer looks directly through. In standard laboratory microscopes, it provides 10x (or 15x) magnification.',
    function: 'Magnifies the primary real inverted image produced by the objective lens, presenting an enlarged virtual image to the eye.',
    practicalIdentificationPoint: 'Located at the top of the body tube. Look for the stamped "10x" or "15x" inscription on its upper metallic rim.',
    x: 50,
    y: 12
  },
  {
    id: 'objective_lenses',
    nameEn: 'Objective Lenses (Low, High, Oil Immersion)',
    nameAr: 'العدسات الشيئية (Low, High, Oil)',
    category: 'lenses',
    categoryLabelEn: 'Three Lenses',
    categoryLabelAr: 'العدسات الثلاث',
    explanation: 'A cluster of 3–4 precision lenses mounted on a revolving nosepiece closest to the specimen: Low Power (10x), High Power (40x/45x), and Oil Immersion (100x).',
    function: 'Collects light from the specimen to create the primary magnified real image. Low power scans the slide; high power analyzes cells; oil immersion reveals subcellular detail.',
    practicalIdentificationPoint: 'Mounted on the revolving nosepiece. Color-coded rings: Yellow ring = 10x (Low); Blue ring = 40x (High); White ring = 100x (Oil).',
    x: 50,
    y: 38
  },
  {
    id: 'condenser_lens',
    nameEn: 'Condenser Lens',
    nameAr: 'العدسة المكثفة (Condenser)',
    category: 'lenses',
    categoryLabelEn: 'Three Lenses',
    categoryLabelAr: 'العدسات الثلاث',
    explanation: 'A heavy glass optical lens assembly mounted directly beneath the mechanical stage aperture.',
    function: 'Focuses, gathers, and concentrates the parallel light rays emitted from the illuminator into an intense cone of light onto the tissue section.',
    practicalIdentificationPoint: 'Located under the central hole of the stage. Raised or lowered via a dedicated small condenser rack-and-pinion knob.',
    x: 50,
    y: 58
  },

  // --- THREE ADJUSTMENTS ---
  {
    id: 'coarse_adjustment',
    nameEn: 'Coarse Adjustment Knob',
    nameAr: 'ضابط التقريب السريع (Coarse Adjustment)',
    category: 'adjustments',
    categoryLabelEn: 'Three Adjustments',
    categoryLabelAr: 'الضوابط الثلاثة',
    explanation: 'The larger outer bilateral knob on the side of the microscope arm.',
    function: 'Rapidly moves the mechanical stage up and down over large vertical distances to bring the specimen into rapid initial focal plane.',
    practicalIdentificationPoint: 'The large diameter outer knob on the arm. RULE: Use ONLY with Low Power (10x); NEVER use with High Power or Oil Immersion to prevent crushing the slide!',
    x: 24,
    y: 64
  },
  {
    id: 'fine_adjustment',
    nameEn: 'Fine Adjustment Knob',
    nameAr: 'ضابط التقريب الدقيق (Fine Adjustment)',
    category: 'adjustments',
    categoryLabelEn: 'Three Adjustments',
    categoryLabelAr: 'الضوابط الثلاثة',
    explanation: 'The smaller inner knob concentric with (or adjacent to) the coarse adjustment knob.',
    function: 'Permits minute, micrometer-level vertical adjustments of the stage for crisp, razor-sharp optical focusing and scanning through tissue depth.',
    practicalIdentificationPoint: 'The smaller central dial protruding from the coarse knob. Used continuously while examining under 40x and 100x oil.',
    x: 24,
    y: 72
  },
  {
    id: 'eye_lens_adjustment',
    nameEn: 'Eye Lens Adjustment (Diopter & Interpupillary)',
    nameAr: 'ضابط العدسة العينية والمسافة البؤرية (Diopter Adjustment)',
    category: 'adjustments',
    categoryLabelEn: 'Three Adjustments',
    categoryLabelAr: 'الضوابط الثلاثة',
    explanation: 'A knurled rotating collar on the left ocular tube and a hinged binocular head mechanism.',
    function: 'Compensates for focal length differences between the observer’s left and right eyes and adjusts the distance between oculars to match pupillary distance.',
    practicalIdentificationPoint: 'Knurled ring with +/- diopter marks located directly below the left eyepiece lens barrel.',
    x: 44,
    y: 20
  },

  // --- THREE MOVABLE PARTS ---
  {
    id: 'light_switch',
    nameEn: 'Light Switch & Rheostat',
    nameAr: 'مفتاح الإضاءة والتحكم بالسطوع (Light Switch)',
    category: 'movable',
    categoryLabelEn: 'Three Movable Parts',
    categoryLabelAr: 'الأجزاء المتحركة الثلاثة',
    explanation: 'An electrical toggle rocker switch combined with a rotary brightness intensity dimmer wheel.',
    function: 'Turns the halogen or LED illuminator lamp ON/OFF and regulates the voltage/light intensity emitted from the base.',
    practicalIdentificationPoint: 'Positioned on the side or rear of the base. Rotate forward to increase illumination; backward to decrease.',
    x: 75,
    y: 84
  },
  {
    id: 'iris_diaphragm',
    nameEn: 'Iris Diaphragm & Lever',
    nameAr: 'الحجاب الحاجز القزحي (Iris Diaphragm)',
    category: 'movable',
    categoryLabelEn: 'Three Movable Parts',
    categoryLabelAr: 'الأجزاء المتحركة الثلاثة',
    explanation: 'An adjustable circular aperture mechanism with overlapping metal leaves located immediately beneath the condenser lens.',
    function: 'Controls the diameter of the light beam entering the condenser, regulating numerical aperture, image contrast, and depth of field.',
    practicalIdentificationPoint: 'A small metal lever protruding horizontally beneath the condenser. Closing it increases contrast; opening it increases brightness/resolution.',
    x: 62,
    y: 60
  },
  {
    id: 'slide_clip',
    nameEn: 'Slide Clip (Mechanical Stage Clip)',
    nameAr: 'ماسك الشريحة الزجاجية (Slide Clip)',
    category: 'movable',
    categoryLabelEn: 'Three Movable Parts',
    categoryLabelAr: 'الأجزاء المتحركة الثلاثة',
    explanation: 'A spring-loaded curved metal caliper arm anchored to the top surface of the mechanical stage.',
    function: 'Securely clasps the 75×25 mm glass histology slide in place, enabling smooth X-Y coaxial translation across the light beam via stage drive knobs.',
    practicalIdentificationPoint: 'Spring lever on the left-rear of the mechanical stage. Pull gently backward to seat the slide square against the right bracket.',
    x: 58,
    y: 49
  },

  // --- THREE CONSTANT PARTS ---
  {
    id: 'microscope_base',
    nameEn: 'Base (Foot)',
    nameAr: 'القاعدة الثابتة (Base)',
    category: 'constant',
    categoryLabelEn: 'Three Constant Parts',
    categoryLabelAr: 'الأجزاء الثابتة الثلاثة',
    explanation: 'The heavy, flat horseshoe or rectangular cast-iron/aluminum foundation that rests securely on the laboratory bench.',
    function: 'Provides absolute stability and vibration damping for the microscope, and houses the built-in light bulb, collector lens, and power supply.',
    practicalIdentificationPoint: 'The broad bottom foundation. Always place one hand underneath the base when carrying the microscope!',
    x: 50,
    y: 92
  },
  {
    id: 'microscope_arm',
    nameEn: 'Arm (Spine / Limb)',
    nameAr: 'الذراع الثابت (Arm)',
    category: 'constant',
    categoryLabelEn: 'Three Constant Parts',
    categoryLabelAr: 'الأجزاء الثابتة الثلاثة',
    explanation: 'The sturdy curved metallic backbone that ascends rigidly from the base to support the viewing head, nosepiece, and stage.',
    function: 'Structural spine connecting all optical components at precise alignments. Serves as the designated ergonomic carrying handle.',
    practicalIdentificationPoint: 'The central upright curved pillar behind the stage. Always hold the arm firmly with your dominant hand when transporting the unit.',
    x: 72,
    y: 44
  },
  {
    id: 'microscope_stage',
    nameEn: 'Mechanical Stage',
    nameAr: 'المسرح / المنصة الميكانيكية (Stage)',
    category: 'constant',
    categoryLabelEn: 'Three Constant Parts',
    categoryLabelAr: 'الأجزاء الثابتة الثلاثة',
    explanation: 'A rigid flat black horizontal platform positioned between the objective lenses and the condenser, featuring a central round light aperture.',
    function: 'Supports the specimen glass slide squarely perpendicular to the optical axis, with Vernier scales for precise coordinates recording.',
    practicalIdentificationPoint: 'The black flat square platform in the middle of the microscope where the glass slide is placed.',
    x: 42,
    y: 50
  }
];

// ==========================================
// LESSON 4: HISTOLOGY SLIDE PREPARATION (10-STEP SEQUENCE)
// Formalin, ascending alcohols, xylene, paraffin, microtomy (5-7um), xylol, descending alcohols, H&E, DPX
// ==========================================
export const HISTOLOGY_SLIDE_PREPARATION_STEPS: SlidePrepStep[] = [
  {
    stepNumber: 1,
    titleEn: 'Fixation',
    titleAr: '1. التثبيت (Fixation)',
    reagent: '10% Neutral Buffered Formalin (aqueous formaldehyde)',
    purpose: 'Prevents autolysis (self-digestion by lysosomal enzymes) and putrefaction (bacterial decomposition), hardens tissue, insolubilizes structural proteins.',
    details: [
      'Specimen is immediately immersed in formalin solution at a volume ratio of at least 10:1 to 20:1.',
      'Formaldehyde forms cross-links between amino groups of proteins, terminating enzymatic activity and preserving in-vivo morphology.',
      'Prevents post-mortem distortion and prepares tissue to withstand harsh dehydrating chemicals.'
    ],
    keyPracticalNote: 'Formalin is the universal fixative for routine diagnostic pathology and histology.',
    temperatureOrDuration: '24–48 hours at room temperature'
  },
  {
    stepNumber: 2,
    titleEn: 'Dehydration',
    titleAr: '2. سحب الماء / التجفيف (Dehydration)',
    reagent: 'Ascending Grades of Ethyl Alcohol (70% → 80% → 90% → 95% → 100% Absolute Ethanol)',
    purpose: 'Completely extracts all free and intracellular water from the tissue because paraffin wax is hydrophobic and immiscible with water.',
    details: [
      'Must be performed in gradual ascending concentrations to prevent sudden osmotic shock and tissue shrinkage or collapse.',
      'Absolute alcohol (100%) ensures total removal of water before the clearing step.'
    ],
    keyPracticalNote: 'Never jump directly from formalin to 100% alcohol; gradual ascent prevents cellular distortion.',
    temperatureOrDuration: '1–2 hours per alcohol bath'
  },
  {
    stepNumber: 3,
    titleEn: 'Clearing',
    titleAr: '3. الترويق / التطهير (Clearing)',
    reagent: 'Xylene (Xylol) — Organic aromatic solvent',
    purpose: 'Replaces alcohol inside the tissue with a solvent miscible with paraffin wax. Xylene gives tissue a translucent / clear appearance.',
    details: [
      'Alcohol is immiscible with molten paraffin wax; xylene is fully soluble in both alcohol and paraffin, acting as an essential chemical bridge.',
      'The tissue becomes visibly transparent (cleared) due to change in refractive index.'
    ],
    keyPracticalNote: 'Over-exposure to xylene makes tissue brittle and hard, causing cracks during section cutting.',
    temperatureOrDuration: '1–3 hours (2 changes of Xylene)'
  },
  {
    stepNumber: 4,
    titleEn: 'Embedding',
    titleAr: '4. الطمر / التضمين (Embedding)',
    reagent: 'Molten Paraffin Wax (Melting point: 56°C – 58°C)',
    purpose: 'Infiltrates tissue cavities with molten wax, which is then placed in a mold and cooled to form a solid rigid block (paraffin block).',
    details: [
      'Tissue is placed in molten paraffin inside an oven at 58°C so wax permeates every microscopic interstitium.',
      'Transferred into an embedding cassette/mold, filled with liquid wax, and placed on a cooling plate to solidify.',
      'Provides solid mechanical support so that extremely thin sections can be cut without crumpling.'
    ],
    keyPracticalNote: 'The resulting "paraffin block" can be archived permanently for decades.',
    temperatureOrDuration: 'Paraffin oven at 58°C followed by ice-plate cooling'
  },
  {
    stepNumber: 5,
    titleEn: 'Section Cutting / Microtomy',
    titleAr: '5. تقطيع العينات / الميكروتوم (Microtomy)',
    reagent: 'Rotary Microtome with Razor-Sharp Steel / Disposable Knife',
    purpose: 'Slices the paraffin block into microscopic ribbons of sections having a standard thickness of 5 to 7 micrometers (5–7 μm).',
    details: [
      'The paraffin block is mounted on the rotary microtome chuck. As the handwheel turns, precision advancement moves the block across the knife blade.',
      'Produces continuous ribbons of 5–7 μm sections.',
      'The ribbon is floated onto a warm water bath (45°C) to expand creases and flatten the section.',
      'A clean glass microscope slide is dipped underneath to lift and mount the section.'
    ],
    keyPracticalNote: 'Standard histology section thickness is 5–7 μm (approximately the diameter of a single red blood cell!).',
    temperatureOrDuration: 'Warm water bath at 45°C, then slide drying oven at 60°C'
  },
  {
    stepNumber: 6,
    titleEn: 'Deparaffinization',
    titleAr: '6. إزالة البرافين (Deparaffinization)',
    reagent: 'Xylene (Xylol)',
    purpose: 'Removes the solid paraffin wax from the mounted tissue section on the slide, as histological stains are water-based aqueous solutions.',
    details: [
      'The dried slide is immersed in xylene baths to dissolve away the paraffin matrix surrounding the tissue.',
      'Without deparaffinization, water-based dyes cannot penetrate the waxy section.'
    ],
    keyPracticalNote: 'Slides are warmed to melt wax slightly, then soaked in xylene until wax is completely dissolved.',
    temperatureOrDuration: '2 baths of Xylene, 3–5 minutes each'
  },
  {
    stepNumber: 7,
    titleEn: 'Hydration',
    titleAr: '7. إعادة الترطيب (Hydration)',
    reagent: 'Descending Grades of Ethyl Alcohol (100% → 95% → 90% → 80% → 70%) → Distilled Water',
    purpose: 'Re-introduces water into the tissue section step-by-step to prepare cellular components for aqueous hematoxylin staining.',
    details: [
      'Xylene is replaced by absolute alcohol, which is then gradually diluted down through descending alcohol grades to pure water.',
      'Hydrated tissue allows ionic interactions between aqueous dyes and cellular proteins.'
    ],
    keyPracticalNote: 'Reversing the dehydration process prepares the cell nuclei to bind water-soluble hematoxylin.',
    temperatureOrDuration: '1–2 minutes in each descending alcohol jar'
  },
  {
    stepNumber: 8,
    titleEn: 'Staining (Hematoxylin & Eosin - H&E)',
    titleAr: '8. الصباغة بروتينية بالهيماتوكسيلين والإيوسين (H&E Staining)',
    reagent: 'Aqueous Hematoxylin (Harris / Mayer) + Eosin Y Solution',
    purpose: 'Imparts contrasting colors to acidic and basic cellular components to reveal fine microscopic architecture.',
    details: [
      'Hematoxylin (basic dye): Stains acidic/anionic nucleic acids (DNA, RNA, nuclei, nucleoli, ribosomes) intense Blue/Purple (Basophilic).',
      'Wash with tap water (blueing step in weakly alkaline water to convert hematoxylin to insoluble deep blue lake).',
      'Eosin (acidic dye): Stains basic/cationic cytoplasmic proteins, collagen fibers, and red blood cells Pink/Red (Acidophilic/Eosinophilic).'
    ],
    keyPracticalNote: 'H&E is the gold standard universal stain in diagnostic histology and histopathology.',
    temperatureOrDuration: 'Hematoxylin: 5–10 min; Wash: 3 min; Eosin: 1–2 min'
  },
  {
    stepNumber: 9,
    titleEn: 'Dehydration (Post-Staining)',
    titleAr: '9. سحب الماء بعد الصباغة (Post-Staining Dehydration)',
    reagent: 'Ascending Grades of Ethanol (70% → 95% → 100% Absolute Alcohol)',
    purpose: 'Removes all water from the stained section because the permanent mounting resin (DPX) is non-aqueous and hydrophobic.',
    details: [
      'Brief dips through ascending alcohol grades.',
      'Excessive time in lower alcohols can wash out water-soluble eosin; must be rapid and precise.'
    ],
    keyPracticalNote: 'Absolute alcohol ensures total dryness before mounting medium application.',
    temperatureOrDuration: 'Rapid sequential dips (30–60 seconds each)'
  },
  {
    stepNumber: 10,
    titleEn: 'Clearing and Mounting',
    titleAr: '10. الترويق والتركيب الدائم (Clearing & Mounting)',
    reagent: 'Xylene Clearing + DPX (Dibutylphthalate Polystyrene Xylene) Mounting Resin + Coverslip',
    purpose: 'Renders the section transparent with refractive index matching glass (n ≈ 1.5), then permanently seals it under a thin glass coverslip.',
    details: [
      'Slide is cleared in xylene to remove alcohol.',
      'A drop of viscous DPX resin (or Canada balsam) is placed on the section.',
      'A clean, ultra-thin glass coverslip (No. 1 thickness) is lowered gently at a 45° angle to prevent air bubbles.',
      'The resin hardens permanently, protecting the tissue section from oxidation, physical abrasion, and dehydration for decades.'
    ],
    keyPracticalNote: 'The completed slide is now ready for immediate observation under the compound light microscope.',
    temperatureOrDuration: 'Drying and curing at room temperature'
  }
];

// ==========================================
// LESSON 5: HISTOLOGICAL STAINS
// Acidic, Basic, and Neutral Stains
// ==========================================
export const HISTOLOGICAL_STAINS_DATA: HistologicalStain[] = [
  {
    id: 'stain_eosin',
    name: 'Eosin (Eosin Y)',
    nameAr: 'صبغة الإيوسين (Eosin)',
    category: 'acidic',
    categoryLabel: 'Acidic Stain (Negatively Charged / Anionic)',
    charge: 'Anionic (Negatively charged dye molecule)',
    whatItStains: [
      'Basic / Cationic cellular structures (Acidophilic / Eosinophilic)',
      'Cytoplasmic proteins and enzymes',
      'Extracellular collagen fibers in connective tissue',
      'Red Blood Cells (Erythrocytes / RBCs) — brilliant red'
    ],
    expectedColor: 'Pink to Bright Red / Orange-Red',
    colorHex: '#F43F5E',
    practicalIdentification: 'Look for pink-stained cytoplasm surrounding dark blue nuclei, pink wavy collagen bands, and bright red disc-shaped RBCs inside blood vessels.',
    examPearl: 'Tissues with high protein content (like parietal cells of stomach and muscle fibers) stain intensely acidophilic pink with eosin.'
  },
  {
    id: 'stain_orange_g',
    name: 'Orange G',
    nameAr: 'صبغة أورانج جي (Orange G)',
    category: 'acidic',
    categoryLabel: 'Acidic Stain (Synthetic Azo Dye)',
    charge: 'Anionic (Negatively charged acidic dye)',
    whatItStains: [
      'Keratin proteins in cornified stratified squamous epithelium',
      'Erythrocytes (RBCs)',
      'Acidophil cells (somatotropes, lactotropes) in anterior pituitary gland'
    ],
    expectedColor: 'Bright Yellow to Golden Orange',
    colorHex: '#F59E0B',
    practicalIdentification: 'Used in trichrome staining methods (e.g., Mallory trichrome). Stains superficial cornified dead keratin layers and RBCs vibrant yellow-orange.',
    examPearl: 'Orange G specifically identifies keratin in skin biopsy specimens and differentiates acidophils in adenohypophysis.'
  },
  {
    id: 'stain_hematoxylin',
    name: 'Hematoxylin',
    nameAr: 'صبغة الهيماتوكسيلين (Hematoxylin)',
    category: 'basic',
    categoryLabel: 'Basic Stain (Cationic Complex with Al³⁺ Mordant)',
    charge: 'Cationic dye-mordant complex (Acts like a basic dye)',
    whatItStains: [
      'Acidic / Anionic cellular structures (Basophilic)',
      'Nuclear chromatin and DNA',
      'Nucleoli (dense ribosomal RNA)',
      'Rough Endoplasmic Reticulum (rER / ergastoplasm) and free ribosomes'
    ],
    expectedColor: 'Deep Blue to Dark Violet / Purple',
    colorHex: '#4F46E5',
    practicalIdentification: 'Look for spherical or oval dark blue/violet nuclei in all living cells, and intense blue basophilic cytoplasm in active protein-secreting cells (e.g., plasma cells, pancreatic acinar cells).',
    examPearl: 'Hematoxylin is extracted naturally from the heartwood of the logwood tree (Haematoxylum campechianum) and oxidized to hematein.'
  },
  {
    id: 'stain_toluidine_blue',
    name: 'Toluidine Blue',
    nameAr: 'صبغة أزرق التولويدين (Toluidine Blue)',
    category: 'basic',
    categoryLabel: 'Basic Metachromatic Dye',
    charge: 'Cationic (Basic dye showing metachromasia)',
    whatItStains: [
      'Nissl bodies (rough ER aggregates) in nerve cells / motor neurons',
      'Heparin and histamine granules in mast cells',
      'Sulfated proteoglycans in cartilage matrix'
    ],
    expectedColor: 'Deep Blue (Orthochromatic) or Reddish-Purple (Metachromasia)',
    colorHex: '#0284C7',
    practicalIdentification: 'Shows coarse dark-blue granules (Nissl bodies) scattered throughout the cytoplasm of spinal cord anterior horn motor neurons. Stains mast cell granules reddish-purple.',
    examPearl: 'Metachromasia: The property where a dye stains certain tissue elements (rich in polyanions like heparin) a different color (red-purple) from that of the dye solution (blue).'
  },
  {
    id: 'stain_leishman',
    name: 'Leishman Stain',
    nameAr: 'صبغة ليشمان (Leishman Stain)',
    category: 'neutral',
    categoryLabel: 'Neutral Stain (Compound of Methylene Blue + Eosin)',
    charge: 'Neutral salt (Eosinate of methylene blue dissolved in pure methyl alcohol)',
    whatItStains: [
      'Peripheral blood smears (Differential Leukocyte Count - DLC)',
      'Bone marrow aspirate cells',
      'Blood parasites (Plasmodium malaria parasites, Leishmania)'
    ],
    expectedColor: 'Nuclei: Purple-Blue; RBCs: Salmon Pink; Eosinophil granules: Orange-Red; Basophil granules: Blue-Black; Neutrophil granules: Fine Lilac',
    colorHex: '#9333EA',
    practicalIdentification: 'Standard blood smear slide showing pink biconcave RBCs and white blood cells with distinctly colored cytoplasmic granules and lobulated nuclei.',
    examPearl: 'Methanol acts simultaneously as both the fixative and the solvent for the Leishman stain during smear preparation.'
  }
];

// ==========================================
// LESSON 6: CELL & CELL ORGANELLES
// Golgi apparatus, Mitochondria, Nissl bodies
// ==========================================
export const CELL_ORGANELLES_DATA: OrganelleStudy[] = [
  {
    id: 'organelle_golgi',
    nameEn: 'Golgi Apparatus (Golgi Complex)',
    nameAr: 'جهاز جولجي (Golgi Apparatus)',
    type: 'membranous',
    structureAndPolarity: 'Membranous organelle composed of stacks of 4–8 curved, flattened cisternae (saccules) with associated transport vesicles. Marked polarity: convex Cis Face (entry/forming face facing rER) and concave Trans Face (maturing/exit face facing plasma membrane shipping secretory vesicles and lysosomes).',
    mainFunction: 'Post-translational chemical modification of proteins (glycosylation, sulfation, phosphorylation), packaging, sorting, and directed secretion.',
    specialStain: 'Silver Impregnation (Silver stain / Osmic acid / Da Fano method)',
    slideSpecimenSource: 'Spinal Ganglia (Dorsal root ganglion neurons) or Epididymis',
    appearanceUnderHE: 'Cannot be stained directly with H&E. In actively secreting cells (e.g., plasma cells producing antibodies and osteoblasts), it appears as a distinct pale, clear unstained zone adjacent to the nucleus, known as the "Negative Golgi Image" (الهالة السلبية لجهاز جولجي).',
    appearanceUnderSpecialStain: 'Appears as an intricate dark brown or black reticular network (plexus) of curved threads and granules located in the perinuclear cytoplasm.',
    practicalIdentificationPoints: [
      'Under Silver stain: Dense black/brown fibrillar net encircling the nucleus of spinal ganglion sensory neurons.',
      'Under H&E: Clear pale crescent-shaped halo next to the eccentric round nucleus in plasma cells.'
    ],
    clinicalSignificance: 'Hypertrophied in secretory glandular cells and antibody-producing plasma cells in myeloma.'
  },
  {
    id: 'organelle_mitochondria',
    nameEn: 'Mitochondria (Chondriosomes)',
    nameAr: 'الميتوكوندريا (Mitochondria / بيوت الطاقة)',
    type: 'membranous',
    structureAndPolarity: 'Oval or rod-shaped double-membraned organelle (0.5–1.0 μm diameter). Outer smooth membrane; inner membrane heavily folded into transverse shelves called Cristae to maximize surface area for ATP synthase. Inner Matrix contains respiratory Krebs cycle enzymes, circular mitochondrial DNA (mtDNA), ribosomes, and dense divalent calcium granules.',
    mainFunction: 'Aerobic cellular respiration, oxidative phosphorylation, and generation of ATP (cellular energy currency). Also regulates apoptosis via cytochrome c release.',
    specialStain: "Altmann's Acid Fuchsin Stain (or Iron Hematoxylin)",
    slideSpecimenSource: 'Renal Tubules (Proximal convoluted tubules of Kidney Cortex) or Liver hepatocytes',
    appearanceUnderHE: 'Because mitochondria have abundant membrane proteins and inner enzymes, cells packed with mitochondria (like kidney proximal tubule cells and cardiac myocytes) exhibit deeply acidophilic, intense pink cytoplasm under H&E.',
    appearanceUnderSpecialStain: 'Appear as distinct brilliant bright red granules, filaments, or rods aligned vertically in the basal cytoplasm (basal striations) of renal tubular epithelial cells.',
    practicalIdentificationPoints: [
      "Under Altmann's stain: Distinct bright red granules packed in the basal half of renal tubule cells beneath the round nucleus.",
      'High abundance corresponds directly with high active transport demands (Na⁺/K⁺ ATPase pumps).'
    ],
    clinicalSignificance: 'Mitochondrial myopathies and maternal inheritance of mtDNA mutations (e.g., Leber hereditary optic neuropathy).'
  },
  {
    id: 'organelle_nissl',
    nameEn: 'Nissl Bodies (Nissl Substance / Tigroid Bodies)',
    nameAr: 'أجسام نيسل (Nissl Bodies)',
    type: 'granule',
    structureAndPolarity: 'Composed of dense parallel arrays of Rough Endoplasmic Reticulum (rER) cisternae studded with free polyribosomes. Abundant in the neuronal soma (cell body) and large proximal dendrites; strictly ABSENT from the axon and the Axon Hillock (منطقة خروج المحور).',
    mainFunction: 'Intense synthesis of neurotransmitter enzymes, membrane receptors, and structural proteins needed to maintain long axonal projections.',
    specialStain: 'Toluidine Blue or Cresyl Violet (Basic stains)',
    slideSpecimenSource: 'Motor Neurons of Spinal Cord (Anterior Horn) or Cerebral Cortex',
    appearanceUnderHE: 'Visible as coarse, intensely basophilic (blue-purple) clumps scattered throughout the pale eosinophilic neuroplasm.',
    appearanceUnderSpecialStain: 'Intense dark-blue or purple granular patches resembling a tiger skin pattern ("tigroid substance"), clearly sparing the pale axon hillock.',
    practicalIdentificationPoints: [
      'Large multipolar neuron with a pale vesicular nucleus and prominent dark nucleolus.',
      'Cytoplasm filled with coarse blue granules (Nissl bodies).',
      'The pale cone-shaped region lacking granules identifies the Axon Hillock.'
    ],
    clinicalSignificance: 'Chromatolysis: Following axonal transection (nerve injury), Nissl bodies disperse, break down, and migrate to the cell periphery within 24–48 hours, indicating cellular stress and repair response.'
  }
];

// ==========================================
// LESSON 7: CELL DIVISION (MITOSIS)
// Karyokinesis & Cytokinesis
// ==========================================
export const MITOSIS_STAGES_DATA: MitosisStage[] = [
  {
    stageNumber: 1,
    nameEn: 'Prophase',
    nameAr: 'الطور التمهيدي (Prophase)',
    phase: 'karyokinesis',
    morphology: 'Chromatin fibers condense and coil tightly into distinct visible dark chromosomes, each consisting of two sister chromatids joined at the centromere. The nucleolus disappears. Centrosomes duplicate and separate toward opposite poles, radiating mitotic spindle microtubules. The nuclear envelope disintegrates near the end of prophase (prometaphase).',
    chromosomeAppearance: 'Dark, tangled thread-like or worm-like condensed structures scattered throughout the center of the cell.',
    nuclearChanges: 'Nuclear membrane becomes fragmented and disappears; nucleolus is completely dissolved.',
    practicalIdentificationClue: 'Look for a round cell where chromatin is no longer smooth, but looks like a tangled ball of dark yarn with no visible nuclear boundary.',
    plantVsAnimalClue: 'In plant root tip (Allium / onion): Square cell with clear walls; condensed chromosomes in center. In animal tissue: Round cell with aster rays.'
  },
  {
    stageNumber: 2,
    nameEn: 'Metaphase',
    nameAr: 'الطور الاستوائي (Metaphase)',
    phase: 'karyokinesis',
    morphology: 'The mitotic spindle is fully assembled. Chromosomes reach their maximum state of condensation. Spindle microtubules attach to the kinetochores of each sister chromatid and pull them into alignment along the equatorial plane (Metaphase Plate) midway between the two spindle poles.',
    chromosomeAppearance: 'Arranged in a straight dark linear plate or disc along the cell equator. Viewed from the pole, they form a circular rosette ("monaster").',
    nuclearChanges: 'No nuclear membrane present; cytoplasm and nucleoplasm are continuous.',
    practicalIdentificationClue: 'A crisp, unmistakable straight dark line or band of condensed chromosomes aligned precisely across the middle diameter of the cell.',
    plantVsAnimalClue: 'Easiest phase to count chromosomes and prepare clinical karyotype analysis (colchicine arrests cells in metaphase).'
  },
  {
    stageNumber: 3,
    nameEn: 'Anaphase',
    nameAr: 'الطور الانفصالي (Anaphase)',
    phase: 'karyokinesis',
    morphology: 'The centromere of each chromosome divides synchronously. Sister chromatids split and become independent daughter chromosomes. Kinetochore microtubules shorten, pulling daughter chromosomes toward opposite poles. The cell begins to elongate along the polar axis.',
    chromosomeAppearance: 'Chromosomes assume distinct "V" or "J" shapes with their centromeres pointing forward toward the spindle pole and trailing arms.',
    nuclearChanges: 'Two distinct dark chromosomal groups separated by a clear, wide chromosome-free central zone.',
    practicalIdentificationClue: 'Two symmetrical clusters of V-shaped dark chromosomes migrating away from each other toward opposite ends of an elongated cell.',
    plantVsAnimalClue: 'Shortest phase in duration; easily identified by the wide gap separating the two retreating chromosome groups.'
  },
  {
    stageNumber: 4,
    nameEn: 'Telophase & Cytokinesis',
    nameAr: 'الطور النهائي وانقسام السيتوبلازم (Telophase & Cytokinesis)',
    phase: 'cytokinesis',
    morphology: 'Daughter chromosomes reach the poles and uncoil/decondense back into diffuse chromatin. New nuclear envelopes reassemble around each set of chromosomes from rER cisternae. Nucleoli reappear within each daughter nucleus. The mitotic spindle completely disassembles. Simultaneously, cytokinesis occurs: an actin-myosin contractile ring forms a Cleavage Furrow pinching animal cells into two independent daughter cells.',
    chromosomeAppearance: 'Chromosomes loosen and lose their sharp boundaries, reverting to pale granular chromatin.',
    nuclearChanges: 'Two separate round, re-formed nuclei inside a single elongated or dumbbell-shaped cell body.',
    practicalIdentificationClue: 'A pinched cell with a deep waist (cleavage furrow) containing two distinct newly formed nuclei.',
    plantVsAnimalClue: 'Animal cells divide by inward Cleavage Furrow pinching; plant cells divide by outward Cell Plate (phragmoplast) synthesis building a new cell wall.'
  }
];

// ==========================================
// LESSON 8: EPITHELIAL TISSUE (ALL 9 TYPES)
// Lung, sublingual gland, renal tubules, stomach, small intestine, gallbladder, trachea, skin, esophagus, sweat gland ducts, large ducts, urinary bladder, taste bud, organ of Corti
// ==========================================
export const EPITHELIAL_TISSUE_DATA: EpithelialTissueStudy[] = [
  // 1. SIMPLE SQUAMOUS
  {
    id: 'epi_simple_squamous',
    typeNumber: 1,
    nameEn: 'Simple Squamous Epithelium',
    nameAr: 'الظهارة الحرشفية البسيطة (Simple Squamous)',
    category: 'simple',
    definition: 'A single layer of extremely thin, flat, scale-like cells resting on a delicate basement membrane, with cell width substantially exceeding height.',
    numberOfLayers: 'Single layer (1 layer)',
    cellShape: 'Thin, flat, polygonal from surface; spindle-shaped / elongated in cross-section.',
    nucleusAppearance: 'Flattened, disc-shaped / oval nucleus bulging slightly into the lumen.',
    mainFunction: 'Rapid passive diffusion of gases, filtration of fluids, and secretion of lubricating serous fluid.',
    sites: [
      'Alveoli of Lungs (Pulmonary alveoli / Type I pneumocytes)',
      'Bowman’s Capsule (Parietal layer) of Renal Corpuscles in Kidney',
      'Endothelium (Inner lining of blood and lymphatic vessels)',
      'Mesothelium (Lining of peritoneal, pleural, and pericardial serous cavities)'
    ],
    practicalSlideTitle: 'Lung (Pulmonary Alveoli) / Kidney Cortex (Bowman’s Capsule)',
    sourceTissue: 'Lung / Kidney Cortex',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Scan for delicate, lace-like air-filled spaces (alveoli) separated by paper-thin interalveolar septa.',
      'Look along the alveolar walls for extremely thin continuous cytoplasmic ribbons containing bulging, flattened dark purple nuclei.',
      'In kidney: identify the glomerulus and look at the outer parietal wall of Bowman’s capsule, which is lined by a neat single row of flat cells.'
    ],
    commonConfusionExamTrap: 'Do not confuse the flattened endothelial cells of alveolar capillary lumens with the simple squamous epithelial cells lining the air space.',
    highYieldExamQuestion: {
      question: 'Identify the tissue lining the parietal layer of Bowman’s capsule in the kidney cortex:',
      correctAnswer: 'Simple squamous epithelium',
      explanation: 'Bowman’s capsule parietal layer consists of a classic single layer of flattened squamous cells adapted to contain filtered glomerular fluid.'
    }
  },

  // 2. SIMPLE CUBOIDAL
  {
    id: 'epi_simple_cuboidal',
    typeNumber: 2,
    nameEn: 'Simple Cuboidal Epithelium',
    nameAr: 'الظهارة المكعبة البسيطة (Simple Cuboidal)',
    category: 'simple',
    definition: 'A single layer of cube-like cells whose height and width are approximately equal, resting on a basement membrane.',
    numberOfLayers: 'Single layer (1 layer)',
    cellShape: 'Square / Cube-shaped in cross section with distinct lateral cell borders.',
    nucleusAppearance: 'Perfectly spherical, dark-staining, situated centrally within each cell.',
    mainFunction: 'Active secretion (enzymes, hormones) and selective reabsorption (electrolytes, water).',
    sites: [
      'Renal Tubules (Proximal and Distal Convoluted Tubules of Kidney Cortex)',
      'Ducts of Exocrine Glands (e.g., Sublingual Salivary Gland and Pancreas)',
      'Thyroid Follicles (Lining simple cuboidal epithelium producing thyroid hormone)',
      'Surface of Ovary (Germinal epithelium)'
    ],
    practicalSlideTitle: 'Kidney Cortex (Renal Tubules) / Sublingual Salivary Gland Ducts',
    sourceTissue: 'Renal Tubules / Sublingual Salivary Gland',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Look for circular or oval tubule cross-sections encircling a central lumen.',
      'The ring is composed of neat square cells.',
      'The nuclei form a striking circle of dark, round, perfectly centered marbles.'
    ],
    commonConfusionExamTrap: 'Oblique cuts across renal tubules can create an artificial multilayered appearance. Always look for circular cross-sections with a distinct lumen and central round nuclei.',
    highYieldExamQuestion: {
      question: 'What is the characteristic appearance and location of the nucleus in simple cuboidal epithelium of renal tubules?',
      correctAnswer: 'Spherical and centrally located',
      explanation: 'In simple cuboidal cells, the nucleus is always spherical and positioned precisely in the center of the square cell.'
    }
  },

  // 3. SIMPLE COLUMNAR
  {
    id: 'epi_simple_columnar',
    typeNumber: 3,
    nameEn: 'Simple Columnar Epithelium',
    nameAr: 'الظهارة العمودية البسيطة (Simple Columnar)',
    category: 'simple',
    definition: 'A single layer of tall rectangular cells whose height is significantly greater than their width, resting on a basement membrane.',
    numberOfLayers: 'Single layer (1 layer)',
    cellShape: 'Tall, pillar-like / rectangular columns with apical specialized modifications (microvilli or cilia).',
    nucleusAppearance: 'Oval, vertically oriented, positioned in the basal third of the cell at a uniform level.',
    mainFunction: 'Active absorption of digested nutrients, secretion of protective mucus and digestive enzymes.',
    sites: [
      'Stomach (Gastric mucosa: Non-ciliated, mucus-secreting surface columnar cells)',
      'Small Intestine (Duodenum/Jejunum: Columnar cells with apical brush border/microvilli and interspersed Goblet Cells)',
      'Gallbladder (Simple tall columnar with prominent microvilli concentrating bile)',
      'Uterine (Fallopian) Tubes (Ciliated simple columnar assisting ovum transport)'
    ],
    practicalSlideTitle: 'Stomach (Gastric mucosa) / Small Intestine (Jejunum/Ileum) / Gallbladder',
    sourceTissue: 'Stomach / Small Intestine / Gallbladder',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Identify long finger-like intestinal villi or stomach gastric pits.',
      'Observe a uniform palisade of tall, slender cells with their oval nuclei neatly lined up in a row near the base.',
      'In small intestine: identify pale, clear cup-shaped Goblet Cells (خلايا كأسية) scattered among columnar enterocytes and a pink apical Brush Border.'
    ],
    commonConfusionExamTrap: 'Do not confuse the clear mucus droplet inside Goblet Cells with lipid droplets or empty spaces; Goblet cells are unicellular mucus glands embedded within simple columnar epithelium.',
    highYieldExamQuestion: {
      question: 'Which histological feature distinguishes the simple columnar epithelium of the small intestine from that of the stomach?',
      correctAnswer: 'Presence of an apical brush border (microvilli) and interspersed goblet cells in the small intestine',
      explanation: 'Stomach columnar epithelium has uniform surface mucus cells without goblet cells or brush border; small intestine enterocytes possess an extensive brush border and interspersed goblet cells.'
    }
  },

  // 4. PSEUDOSTRATIFIED COLUMNAR
  {
    id: 'epi_pseudostratified',
    typeNumber: 4,
    nameEn: 'Pseudostratified Ciliated Columnar Epithelium',
    nameAr: 'الظهارة المطبقة الكاذبة المهدبة (Pseudostratified Columnar)',
    category: 'simple',
    definition: 'A single layer of cells resting on a shared basement membrane, but whose cells have variable heights and nuclear levels, giving the deceptive optical illusion of stratification (pseudo = false).',
    numberOfLayers: 'Technically 1 layer (all cells touch the basement membrane, but only tall cells reach the lumen).',
    cellShape: 'Basal small stem cells + tall columnar cells with apical hair-like Cilia.',
    nucleusAppearance: 'Nuclei positioned at 2 to 3 distinct vertical levels (basal round nuclei + middle and apical oval nuclei).',
    mainFunction: 'Mucociliary clearance: Goblet cells secrete sticky mucus to trap inhaled pathogens/dust, and coordinated ciliary beats sweep mucus upward toward the pharynx.',
    sites: [
      'Trachea and Main Bronchi (Classic Respiratory Epithelium)',
      'Nasal Cavity and Nasopharynx',
      'Male Epididymis and Vas Deferens (Non-ciliated with stereocilia / long microvilli)'
    ],
    practicalSlideTitle: 'Trachea (Cross section through respiratory mucosa and hyaline cartilage ring)',
    sourceTissue: 'Trachea',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Look for thick respiratory mucosa overlying a C-shaped ring of glassy pink-purple Hyaline Cartilage.',
      'Epithelium shows staggered nuclei at multiple heights with no true cell layering.',
      'The apical luminal border features a prominent, continuous fringe of dark pink/purple hair-like Cilia (الأهداب).',
      'Pale, clear goblet cells are interspersed between ciliated columnar cells.'
    ],
    commonConfusionExamTrap: 'Do not diagnose this as true stratified epithelium; the presence of luminal surface cilia is virtually unique to pseudostratified or simple columnar epithelia (stratified epithelia are almost never ciliated in humans!).',
    highYieldExamQuestion: {
      question: 'Why is respiratory epithelium classified as "pseudostratified"?',
      correctAnswer: 'All cells contact the basement membrane, but their nuclei lie at different levels giving a false appearance of multiple layers',
      explanation: 'Under electron microscopy, every cell is anchored to the basal lamina, making it a true simple epithelium despite the multi-tiered appearance of nuclei under light microscopy.'
    }
  },

  // 5. STRATIFIED SQUAMOUS (KERATINIZED & NON-KERATINIZED)
  {
    id: 'epi_stratified_squamous',
    typeNumber: 5,
    nameEn: 'Stratified Squamous Epithelium (Keratinized & Non-Keratinized)',
    nameAr: 'الظهارة المطبقة الحرشفية (المتقرنة وغير المتقرنة)',
    category: 'stratified',
    definition: 'Multiple layers of cells that transition from a basal germinative cuboidal/columnar layer, through polygonal intermediate prickle cells, to flattened squamous cells at the free surface.',
    numberOfLayers: 'Multiple layers (10 to 30+ cell layers)',
    cellShape: 'Basal layer: Cuboidal/Columnar; Middle layers: Polyhedral/Polygonal with spine-like desmosomes; Superficial layers: Flat squamous.',
    nucleusAppearance: 'Basal nuclei: Dark and round; Superficial nuclei: Flattened disc-shaped in Non-Keratinized; Absent in the dead Keratinized stratum corneum.',
    mainFunction: 'Heavy-duty physical protection against mechanical abrasion, chemical friction, pathogen invasion, and dehydration.',
    sites: [
      'Keratinized: Epidermis of Skin (thick skin of palms/soles and thin hairy skin)',
      'Non-Keratinized: Esophagus, Oral cavity (tongue, cheeks), Vagina, Anal canal'
    ],
    practicalSlideTitle: 'Skin (Thick skin epidermis) [Keratinized] / Esophagus (Mucosa) [Non-Keratinized]',
    sourceTissue: 'Skin / Esophagus',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Skin (Keratinized): Identify the thick, wavy, dark-pink acellular stratum corneum on top, containing NO nuclei. Beneath it are the stratum granulosum, spinosum, and basale.',
      'Esophagus (Non-Keratinized): Multiple layers of living cells where flattened dark nuclei are clearly visible all the way to the apical luminal surface; surface is moist and lacks keratin.'
    ],
    commonConfusionExamTrap: 'Confusing non-keratinized stratified squamous (esophagus) with transitional epithelium: In esophagus, surface cells are extremely flat with flattened nuclei; in transitional (bladder), surface cells are large, dome-shaped umbrella cells.',
    highYieldExamQuestion: {
      question: 'How do you histologically distinguish keratinized stratified squamous epithelium from non-keratinized stratified squamous epithelium?',
      correctAnswer: 'Keratinized has an acellular superficial stratum corneum without nuclei; non-keratinized retains flattened nuclei in surface cells',
      explanation: 'Keratinization involves programmed death where surface cells lose all organelles and nuclei, leaving dense keratin envelopes; non-keratinized cells remain viable and nucleated.'
    }
  },

  // 6. STRATIFIED CUBOIDAL
  {
    id: 'epi_stratified_cuboidal',
    typeNumber: 6,
    nameEn: 'Stratified Cuboidal Epithelium',
    nameAr: 'الظهارة المطبقة المكعبة (Stratified Cuboidal)',
    category: 'stratified',
    definition: 'A rare stratified epithelium consisting typically of exactly two (or three) tiers of cuboidal cells lining excretory duct lumens.',
    numberOfLayers: 'Two layers (occasionally three)',
    cellShape: 'Square / Cuboidal cells in both layers.',
    nucleusAppearance: 'Round, dark nuclei arranged in two concentric rows around the duct lumen.',
    mainFunction: 'Strengthening and protecting the walls of exocrine glandular ducts while participating in ion reabsorption.',
    sites: [
      'Ducts of Sweat Glands (in the dermis of skin)',
      'Developing ovarian follicles (growing granulosa cells)',
      'Excretory ducts of salivary glands (larger segments)'
    ],
    practicalSlideTitle: 'Skin Dermis (Sweat Gland Ducts in cross-section)',
    sourceTissue: 'Sweat Gland Ducts (Skin Dermis)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Find the dermis of skin (dense irregular connective tissue).',
      'Locate small, round or oval duct cross-sections with darker, more basophilic staining than the secretory coils.',
      'Count the nuclear tiers: distinctly lined by TWO concentric rows of round, dark nuclei.'
    ],
    commonConfusionExamTrap: 'Do not confuse with simple cuboidal: Simple cuboidal has only ONE ring of nuclei; stratified cuboidal exhibits TWO distinct concentric rings of round nuclei.',
    highYieldExamQuestion: {
      question: 'Where is stratified cuboidal epithelium typically identified in first-year medical practicals?',
      correctAnswer: 'Ducts of sweat glands in skin dermis',
      explanation: 'Sweat gland ducts are the classic and most reliable textbook site for two-layered stratified cuboidal epithelium.'
    }
  },

  // 7. STRATIFIED COLUMNAR
  {
    id: 'epi_stratified_columnar',
    typeNumber: 7,
    nameEn: 'Stratified Columnar Epithelium',
    nameAr: 'الظهارة المطبقة العمودية (Stratified Columnar)',
    category: 'stratified',
    definition: 'A rare protective epithelium featuring basal irregular/polyhedral cells capped by a definitive superficial row of tall, true columnar cells.',
    numberOfLayers: 'Two to three layers',
    cellShape: 'Basal cells: Polyhedral/Cuboidal; Superficial layer: Tall columnar.',
    nucleusAppearance: 'Basal nuclei: Round; Superficial nuclei: Oval, vertically oriented.',
    mainFunction: 'Protection and mucus secretion in transitional junction zones between stratified squamous and pseudostratified epithelia.',
    sites: [
      'Large Excretory Ducts of Salivary Glands (Parotid, Submandibular)',
      'Fornix of the Conjunctiva of the Eye',
      'Cavernous / Penile Urethra (parts)'
    ],
    practicalSlideTitle: 'Submandibular Salivary Gland (Large interlobular excretory duct) / Conjunctiva',
    sourceTissue: 'Large Ducts / Conjunctiva',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Locate the thick interlobular connective tissue septa of a salivary gland.',
      'Identify a wide excretory duct.',
      'Observe that the cells directly bordering the wide lumen are unmistakably tall columnar, resting on deeper smaller polygonal cells.'
    ],
    commonConfusionExamTrap: 'Distinguish from pseudostratified columnar: Stratified columnar has true, discrete multiple cellular layers where superficial columnar cells do NOT reach the basement membrane.',
    highYieldExamQuestion: {
      question: 'Identify the epithelium lining large excretory ducts of major salivary glands:',
      correctAnswer: 'Stratified columnar epithelium',
      explanation: 'As salivary ducts enlarge and exit lobules, their lining transitions from simple columnar to stratified columnar before merging with the oral cavity.'
    }
  },

  // 8. TRANSITIONAL EPITHELIUM (UROTHELIUM)
  {
    id: 'epi_transitional',
    typeNumber: 8,
    nameEn: 'Transitional Epithelium (Urothelium)',
    nameAr: 'الظهارة الانتقالية (Transitional / Urothelium)',
    category: 'specialized',
    definition: 'A specialized stratified epithelium confined strictly to the urinary tract, capable of profound reversible stretching and distension without tearing, while forming an impermeable osmotic barrier against toxic, hypertonic urine.',
    numberOfLayers: 'Variable: 5 to 7 layers in relaxed/empty state; flattens to 2 to 3 layers in distended/full state.',
    cellShape: [
      'Basal layer: Small cuboidal/columnar stem cells.',
      'Intermediate layers: Multiple tiers of pear-shaped / polygonal cells (خلايا كمثرية).',
      'Superficial layer: Characteristic large, convex, dome-shaped Umbrella Cells (خلايا مظلية) with a thickened eosinophilic apical crust (uroplakin plaques).'
    ].join(' '),
    nucleusAppearance: 'Basal/intermediate: Round nuclei; Umbrella cells: Large round, frequently binucleate (two nuclei) with prominent nucleoli.',
    mainFunction: 'Allows major volume distension as urine accumulates; uroplakin plaques prevent toxic urea resorption and resist hypertonic osmotic gradient.',
    sites: [
      'Urinary Bladder (Classic primary specimen)',
      'Ureter (Lining star-shaped lumen)',
      'Renal Pelvis and Calyces',
      'Prostatic Urethra'
    ],
    practicalSlideTitle: 'Urinary Bladder (Relaxed bladder wall) / Ureter (Cross section)',
    sourceTissue: 'Urinary Bladder / Ureter',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Scalloped luminal border: Large convex Umbrella Cells bulge into the lumen like cobblestones or pillowy domes.',
      'Binucleated cells: Look carefully for umbrella cells containing two nuclei.',
      'Intermediate pear-shaped cells: Rounded bodies with tapering tails pointing toward the basement membrane.',
      'Absence of keratin: Surface cells are viable and have prominent nuclei.'
    ],
    commonConfusionExamTrap: 'Relaxed bladder appears very thick with dome-shaped umbrella cells; distended bladder is stretched thin with flattened surface cells. Look for binucleate cells and the pink apical umbrella cell crust to confirm urothelium.',
    highYieldExamQuestion: {
      question: 'What is the characteristic feature of the superficial cells of transitional epithelium of the urinary bladder?',
      correctAnswer: 'Large dome-shaped (umbrella) cells that are frequently binucleate with a thickened apical crust',
      explanation: 'Umbrella cells (facet cells) are unique to the urinary tract, displaying a scalloped apical surface, binucleation, and uroplakin plaques.'
    }
  },

  // 9. NEURO-EPITHELIUM
  {
    id: 'epi_neuroepithelium',
    typeNumber: 9,
    nameEn: 'Neuro-Epithelium (Sensory Epithelium)',
    nameAr: 'الظهارة العصبية الحسية (Neuro-Epithelium)',
    category: 'specialized',
    definition: 'Specialized epithelial cells modified to act as primary sensory receptors detecting external physical or chemical stimuli and transmitting signals to sensory nerve endings.',
    numberOfLayers: 'Specialized barrel-shaped or multi-tiered cellular complexes.',
    cellShape: 'Elongated spindle-shaped sensory neuroepithelial receptor cells with apical microvilli/hairs, surrounded by tall supporting (sustentacular) cells and basal stem cells.',
    nucleusAppearance: 'Centrally situated, dark elongated or oval nuclei in receptor cells; basal nuclei in supporting cells.',
    mainFunction: 'Sensory reception and transduction (Taste, Hearing, Balance, Olfaction).',
    sites: [
      'Taste Buds (Gustatory receptors in circumvallate and fungiform papillae of Tongue)',
      'Organ of Corti (Auditory hair cells in Cochlea of Inner Ear)',
      'Maculae and Cristae Ampullares (Vestibular balance hair cells in Vestibule/Semicircular Canals)',
      'Olfactory Epithelium (Superior nasal concha / roof of nasal cavity)'
    ],
    practicalSlideTitle: 'Tongue (Circumvallate Papilla with Taste Buds) / Cochlea (Organ of Corti)',
    sourceTissue: 'Taste Bud (Tongue) / Organ of Corti (Inner Ear)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    howToIdentifyUnderMicroscope: [
      'Tongue: Locate circumvallate papilla surrounded by a deep moat/trench.',
      'Look along the lateral stratified squamous walls lining the trench for pale, barrel-shaped (onion-shaped) clusters of cells called Taste Buds.',
      'Identify the tiny apical Taste Pore opening to the trench with delicate sensory hairs.'
    ],
    commonConfusionExamTrap: 'Do not confuse taste buds with simple glands; taste buds are intra-epithelial sensory structures composed of slender neuroepithelial receptor cells, sustentacular cells, and basal cells.',
    highYieldExamQuestion: {
      question: 'Where are taste buds (neuro-epithelium) most abundantly located in tongue histology practicals?',
      correctAnswer: 'Along the lateral walls of the moat surrounding Circumvallate Papillae of the tongue',
      explanation: 'Circumvallate papillae feature a deep circular furrow containing dozens of pale barrel-shaped taste buds washed by serous glands of von Ebner.'
    }
  }
];

// ==========================================
// LESSON 9: CONNECTIVE TISSUE (ALL 7 TYPES)
// Loose (Areolar, Adipose, Reticular, Mucoid) & Dense (Irregular, Regular, Yellow Elastic)
// ==========================================
export const CONNECTIVE_TISSUE_DATA: ConnectiveTissueStudy[] = [
  // 1. LOOSE AREOLAR CT
  {
    id: 'ct_loose_areolar',
    typeNumber: 1,
    nameEn: 'Loose Areolar Connective Tissue',
    nameAr: 'النسيج الضام الفجوي الرخو (Loose Areolar CT)',
    category: 'loose',
    definition: 'A loose, highly vascular tissue with an abundance of semi-fluid ground substance and a loose, airy meshwork of collagen and elastic fibers supporting diverse wandering and resident cells.',
    predominantCells: [
      'Fibroblasts (Most numerous: spindle/star-shaped with elongated dark nuclei synthesizing fibers)',
      'Macrophages (Histiocytes: phagocytic cells with irregular borders and indented nuclei)',
      'Mast Cells (Round/oval with cytoplasm packed with basophilic granules containing histamine and heparin)',
      'Plasma Cells (Cartwheel / clock-face nuclear chromatin, basophilic cytoplasm, negative Golgi image)',
      'Adipocytes (Fat cells scattered singly)'
    ],
    fibersPresent: [
      'Collagen Fibers (Type I: Thick, wavy pink bundles running in loose, unorganized patterns)',
      'Elastic Fibers (Thin, dark, sharp branching threads forming a resilient network)'
    ],
    extracellularMatrix: 'Abundant, semi-fluid, gelatinous ground substance rich in hyaluronic acid, proteoglycans, and tissue fluid.',
    mainFunction: 'Wraps and cushions organs, embeds blood vessels and nerves, permits flexible tissue gliding, and acts as the prime battleground for inflammatory and immune defenses.',
    locations: [
      'Papillary Dermis of Skin (directly beneath epidermis)',
      'Lamina Propria and Submucosa of Digestive, Respiratory, and Urinary Tracts',
      'Mesentery of Intestines and Fascia binding muscles'
    ],
    specimenSource: 'Papillary Dermis / Subcutaneous Tissue / Spread Mesentery',
    stainUsed: 'Hematoxylin & Eosin (H&E) or Verhoeff-Van Gieson',
    microscopicIdentificationClues: [
      'Open, "airy" appearance with vast pale spaces between fibers.',
      'Pink wavy bands of collagen crisscrossing with thin dark pencil-like branching elastic lines.',
      'Dozens of varied cell nuclei scattered randomly throughout the matrix.'
    ],
    examTrap: 'Distinguish from dense irregular CT: Loose areolar has far more cells and ground substance, and far thinner, looser collagen bundles compared to the coarse, packed collagen of dense irregular CT.'
  },

  // 2. ADIPOSE TISSUE
  {
    id: 'ct_adipose',
    typeNumber: 2,
    nameEn: 'Adipose Tissue (White & Brown Fat)',
    nameAr: 'النسيج الضام الشحمي / الدهني (Adipose Tissue)',
    category: 'loose',
    definition: 'A specialized loose connective tissue dominated overwhelmingly by adipocytes (fat cells) closely packed together in lobules separated by thin fibrous septa.',
    predominantCells: [
      'Unilocular Adipocytes (White fat: Large spherical cells 50–100 μm containing a single gigantic lipid droplet that displaces cytoplasm and nucleus to the rim)',
      'Multilocular Adipocytes (Brown fat: Smaller polygonal cells with multiple small lipid droplets and abundant dark mitochondria for non-shivering thermogenesis in neonates)'
    ],
    fibersPresent: ['Delicate network of reticular fibers (Type III collagen) encircling individual adipocytes'],
    extracellularMatrix: 'Scanty ground substance; vascular capillary network tightly surrounds every adipocyte.',
    mainFunction: 'Caloric energy storage (triglycerides), thermal insulation, structural cushioning against mechanical trauma (soles, orbits, kidneys).',
    locations: [
      'Subcutaneous Tissue (Hypodermis / Panniculus adiposus)',
      'Perirenal fat capsule around Kidneys',
      'Greater Omentum, Mesentery, and retroperitoneal spaces'
    ],
    specimenSource: 'Subcutaneous Tissue / Hypodermis / Perirenal Fat',
    stainUsed: 'Hematoxylin & Eosin (H&E) [Lipid dissolves during xylene processing leaving empty rings] or Sudan Black / Oil Red O on frozen sections',
    microscopicIdentificationClues: [
      'Resembles a classic "chicken-wire" or honeycomb network.',
      'Large, clear polygonal rounded spaces where intracellular fat was dissolved by xylene.',
      'The cytoplasm is reduced to a whisper-thin peripheral rim.',
      'Flattened dark purple nucleus pressed against the cell membrane: "Signet Ring" appearance (مظهر الخاتم ذي الفص).'
    ],
    examTrap: 'Under routine paraffin H&E, fat is completely dissolved by xylene, so adipocytes appear completely empty and white. To demonstrate actual fat droplets in practicals, special Sudan Red / Osmium tetroxide on unfixed frozen sections must be used.'
  },

  // 3. RETICULAR CT
  {
    id: 'ct_reticular',
    typeNumber: 3,
    nameEn: 'Reticular Connective Tissue',
    nameAr: 'النسيج الضام الشبكي (Reticular CT)',
    category: 'loose',
    definition: 'A delicate sponge-like meshwork formed by branching reticular fibers (Type III collagen) enveloped by star-shaped reticular cells, forming the architectural stroma for lymphoid and hematopoietic organs.',
    predominantCells: ['Reticular Cells (Stellate / star-shaped cells with pale oval nuclei and branching cytoplasmic processes sheathing the fibers)', 'Wandering Lymphocytes, Macrophages, and Dendritic Cells'],
    fibersPresent: ['Reticular Fibers (Delicate, thin, branching fibrils of Type III collagen coated with glycoproteins)'],
    extracellularMatrix: 'Fluid-rich matrix allowing free passage of lymph, blood, and migrating immune cells.',
    mainFunction: 'Constructs the delicate internal structural framework (Stroma) of soft cellular organs, filtering fluids and supporting free immune cells.',
    locations: [
      'Liver (Stroma of hepatic sinusoids)',
      'Spleen (Red and White pulp stroma)',
      'Lymph Nodes (Cortex and medullary cords)',
      'Bone Marrow'
    ],
    specimenSource: 'Liver / Spleen / Lymph Node',
    stainUsed: 'Silver Impregnation (Gömöri / Bielschowsky Silver Stain) — Argyrophilic (محب للفضة)',
    microscopicIdentificationClues: [
      'Reticular fibers are Argyrophilic: they bind silver salts and reduce to metallic silver, staining Jet-Black.',
      'Appears as a gorgeous branching black spiderweb or lattice supporting pink parenchymal hepatocytes or purple lymphocytes.'
    ],
    examTrap: 'Reticular fibers CANNOT be seen clearly with routine H&E (they are too thin and mask in eosin pink). Any slide showing a jet-black branching meshwork in liver or lymph node is stained with Silver Stain.'
  },

  // 4. MUCOID CT (WHARTON'S JELLY)
  {
    id: 'ct_mucoid',
    typeNumber: 4,
    nameEn: "Mucoid Connective Tissue (Mucous CT / Wharton's Jelly)",
    nameAr: "النسيج الضام المخاطاني (هلام وارتون - Wharton's Jelly)",
    category: 'loose',
    definition: 'A transient embryonic connective tissue characterized by an immense volume of gelatinous, amorphous ground substance rich in hyaluronic acid, with delicate sparse collagen fibers and star-shaped fibroblasts.',
    predominantCells: ['Mesenchymal Fibroblasts (Star-shaped or spindle-shaped cells with branching cytoplasmic processes connecting to neighbors)'],
    fibersPresent: ['Fine, delicate, sparse wavy collagen fibers (Type I & III)'],
    extracellularMatrix: "Copious jelly-like, basophilic amorphous ground substance (Wharton's Jelly) exceptionally rich in hyaluronic acid and chondroitin sulfate, holding large amounts of water.",
    mainFunction: 'Cushions and protects the umbilical cord blood vessels (2 umbilical arteries, 1 umbilical vein), preventing compression or kinking of fetal blood flow.',
    locations: [
      'Umbilical Cord (surrounding the umbilical vessels)',
      'Vitreous Body of the Eye',
      'Pulp of developing deciduous teeth'
    ],
    specimenSource: 'Umbilical Cord (Cross Section)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    microscopicIdentificationClues: [
      'Cross section of umbilical cord showing two thick muscular umbilical arteries and one wide umbilical vein.',
      'Surrounding tissue is pale, watery pink-purple with abundant empty-looking jelly space.',
      'Fibroblasts appear as small star-shaped cells with delicate branching arms suspended in jelly.'
    ],
    examTrap: 'Remember that Wharton’s jelly is found only in the umbilical cord and fetal tissues; in adults, it persists only in the dental pulp and vitreous humor.'
  },

  // 5. DENSE IRREGULAR CT
  {
    id: 'ct_dense_irregular',
    typeNumber: 5,
    nameEn: 'Dense Irregular Connective Tissue',
    nameAr: 'النسيج الضام الكثيف غير المنتظم (Dense Irregular CT)',
    category: 'dense',
    definition: 'A robust, coarse tissue dominated by massive bundles of collagen fibers interwoven randomly in three-dimensional directions, providing immense tensile resistance against stretching in all vectors.',
    predominantCells: ['Relatively few Fibroblasts squeezed tightly between coarse fiber bundles with dark, compressed elongated nuclei'],
    fibersPresent: ['Massive, coarse, thick bundles of Type I Collagen fibers weaving in haphazard, multi-directional orientations. Sparse elastic network.'],
    extracellularMatrix: 'Scanty ground substance; minimal space between dense collagen bundles; low vascularity compared to loose areolar CT.',
    mainFunction: 'Provides tough mechanical resistance to tearing, stretching, and physical stresses applied from multiple varied directions.',
    locations: [
      'Reticular Dermis of Skin (deep layer of skin)',
      'Fibrous Protective Capsules of Organs (Kidney, Spleen, Liver, Lymph nodes)',
      'Periosteum of Bone and Perichondrium of Cartilage',
      'Submucosa of Gastrointestinal Tract'
    ],
    specimenSource: 'Dermis of Skin (Reticular Dermis) / Fibrous Capsule of Kidney',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    microscopicIdentificationClues: [
      'Field is almost solid pink/eosinophilic.',
      'Thick, coarse ribbons of collagen running in all possible directions (longitudinal, transverse, and oblique sections visible simultaneously).',
      'Very few cells; only dark, flattened fibroblast nuclei scattered sparsely among collagen bundles.'
    ],
    examTrap: 'Compare with dense regular CT: Dense irregular has fibers running in random multi-directional chaos; dense regular has fibers running strictly parallel in ONE single direction.'
  },

  // 6. DENSE REGULAR CT
  {
    id: 'ct_dense_regular',
    typeNumber: 6,
    nameEn: 'Dense Regular Connective Tissue',
    nameAr: 'النسيج الضام الكثيف المنتظم (Dense Regular CT - الأوتار)',
    category: 'dense',
    definition: 'A tissue composed of densely packed, strictly parallel, straight and wavy bundles of collagen fibers aligned precisely along the primary axis of mechanical pulling force.',
    predominantCells: ['Fibrocytes / Tendon Cells (Winged cells with dark, compressed, elongated rod-like nuclei aligned in long parallel single-file rows between fiber bundles)'],
    fibersPresent: ['Extremely dense, parallel, tightly packed arrays of Type I Collagen fibers filling almost the entire extracellular space.'],
    extracellularMatrix: 'Almost negligible ground substance; poorly vascularized (which is why torn tendons heal very slowly!).',
    mainFunction: 'Transmits immense unidirectional pulling force from muscle to bone without stretching (maximum tensile strength along one axis).',
    locations: [
      'Tendons (connecting skeletal muscle to bone)',
      'Aponeuroses (broad flat tendons)',
      'Most Ligaments (connecting bone to bone)'
    ],
    specimenSource: 'Tendon (Longitudinal Section)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    microscopicIdentificationClues: [
      'Long parallel ribbons of glossy pink collagen with a gentle, regular wave (crimp).',
      'Dark, thin, elongated inactive fibrocyte nuclei arranged in neat, single-file parallel rows ("boxcars on a railroad track").',
      'No random intersecting fibers; pure unidirectional architecture.'
    ],
    examTrap: 'Do not confuse with smooth muscle: Smooth muscle has plump, cigar-shaped nuclei located inside the muscle fibers; tendon has ultra-condensed flattened nuclei squeezed BETWEEN the collagen fiber bundles.'
  },

  // 7. YELLOW ELASTIC CT
  {
    id: 'ct_yellow_elastic',
    typeNumber: 7,
    nameEn: 'Yellow Elastic Connective Tissue',
    nameAr: 'النسيج الضام المرن الأصفر (Yellow Elastic CT)',
    category: 'dense',
    definition: 'A specialized dense connective tissue dominated by thick, parallel or branching elastic fibers providing exceptional recoil capacity after repeated physiological stretching.',
    predominantCells: ['Fibroblasts located in spaces between elastic fibers', 'Smooth muscle cells in vascular tunica media'],
    fibersPresent: ['Thick, coarse, branching Elastic Fibers (composed of elastin surrounded by fibrillin microfibrils). Sparse collagen fibers.'],
    extracellularMatrix: 'Minimal ground substance.',
    mainFunction: 'Allows organs to stretch under physiological pressure (e.g., cardiac ventricular systole) and recoil passively to maintain continuous arterial blood pressure and airway patency.',
    locations: [
      'Wall of Large Elastic Arteries (Aorta, Pulmonary Trunk: concentric fenestrated elastic lamellae)',
      'Ligamentum Nuchae (back of neck) and Ligamenta Flava (vertebral column laminae)',
      'Vocal Cords (True vocal ligaments)',
      'Walls of Bronchi and Trachea'
    ],
    specimenSource: 'Aorta (Wall / Tunica Media) / Ligamentum Nuchae / Vocal Ligament',
    stainUsed: "Orcein Stain (Dark Brown/Black) or Verhoeff's Elastic Stain (Jet-Black) or H&E (intensely refractive pink wavy bands)",
    microscopicIdentificationClues: [
      'Under Orcein/Verhoeff: Dozens of dense, parallel, wavy black/brown undulating elastic ribbons running concentrically through the tunica media of the aorta.',
      'Noticeable branching and fenestrations (windows) allowing nutrient diffusion.'
    ],
    examTrap: 'Collagen fibers stain pink with H&E and do not branch; elastic fibers branch freely and stain specifically black/brown with Orcein and Verhoeff stains.'
  }
];

// ==========================================
// LESSON 10 / PRACTICAL MODE SLIDES CATALOG
// Authentic slide specifications for the Practical Identification Mode
// ==========================================
export interface HistologyPracticalSlide {
  id: string;
  slideNumber: number;
  tissueNameEn: string;
  tissueNameAr: string;
  epitheliumOrCTType: string;
  stainUsed: string;
  specimenSource: string;
  characteristicDiagnosticFeature: string;
  imageUrl: string;
  zoomLevels: {
    '4x': string;
    '10x': string;
    '40x': string;
    '100x': string;
  };
  labels: {
    id: string;
    nameEn: string;
    nameAr: string;
    x: number; // percentage
    y: number; // percentage
    description: string;
  }[];
  ospeQuestion: {
    prompt: string;
    questionA: string;
    answerA: string;
    questionB: string;
    answerB: string;
  };
}

export const HISTOLOGY_PRACTICAL_SLIDES: HistologyPracticalSlide[] = [
  {
    id: 'slide_kidney_cuboidal',
    slideNumber: 1,
    tissueNameEn: 'Simple Cuboidal Epithelium',
    tissueNameAr: 'الظهارة المكعبة البسيطة (النبيبات الكلوية)',
    epitheliumOrCTType: 'Simple Cuboidal Epithelium',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    specimenSource: 'Kidney Cortex (Renal Convoluted Tubules)',
    characteristicDiagnosticFeature: 'Circular cross sections of tubules lined by a single layer of square cells with round, perfectly centered nuclei.',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    zoomLevels: {
      '4x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
      '10x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
      '40x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&auto=format&fit=crop&q=80',
      '100x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1400&auto=format&fit=crop&q=80'
    },
    labels: [
      { id: 'p1', nameEn: 'Renal Tubule Lumen', nameAr: 'تجويف النبيب الكلوي', x: 50, y: 48, description: 'Central lumen where glomerular filtrate flows.' },
      { id: 'p2', nameEn: 'Simple Cuboidal Cell', nameAr: 'خلية مكعبة بسيطة', x: 38, y: 46, description: 'Cube-like cell with equal height and width.' },
      { id: 'p3', nameEn: 'Spherical Central Nucleus', nameAr: 'نواة كروية مركزية', x: 34, y: 52, description: 'Dark round nucleus situated exactly in cell center.' },
      { id: 'p4', nameEn: 'Basement Membrane', nameAr: 'الغشاء القاعدي', x: 28, y: 56, description: 'Delicate basal lamina anchoring the epithelial cells.' }
    ],
    ospeQuestion: {
      prompt: 'Station 1: Examine the pointed microscopic field under 40x objective:',
      questionA: 'A) Identify the pointed epithelium and organ:',
      answerA: 'Simple cuboidal epithelium — Kidney (renal tubules)',
      questionB: 'B) Give one diagnostic microscopic feature of this cell layer:',
      answerB: 'Single layer of cube-shaped cells with round, centrally located nuclei'
    }
  },
  {
    id: 'slide_trachea_pseudo',
    slideNumber: 2,
    tissueNameEn: 'Pseudostratified Ciliated Columnar Epithelium',
    tissueNameAr: 'الظهارة المطبقة الكاذبة المهدبة (القصبة الهوائية)',
    epitheliumOrCTType: 'Pseudostratified Ciliated Columnar with Goblet Cells',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    specimenSource: 'Trachea (Respiratory Mucosa)',
    characteristicDiagnosticFeature: 'Multi-tiered nuclei at different heights, prominent apical fringe of cilia, and pale goblet cells, resting on hyaline cartilage ring.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
    zoomLevels: {
      '4x': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
      '10x': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
      '40x': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80',
      '100x': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&auto=format&fit=crop&q=80'
    },
    labels: [
      { id: 't1', nameEn: 'Apical Cilia (الأهداب)', nameAr: 'الأهداب السطحية', x: 52, y: 22, description: 'Dense border of motile hair-like cilia sweeping mucus upward.' },
      { id: 't2', nameEn: 'Goblet Cell (خلية كأسية)', nameAr: 'خلية كأسية مخاطية', x: 44, y: 34, description: 'Pale clear cup-shaped mucus-secreting unicellular gland.' },
      { id: 't3', nameEn: 'Multi-tiered Nuclei', nameAr: 'أنوية على مستويات متعددة', x: 50, y: 44, description: 'Nuclei positioned at varied heights creating the false layered look.' },
      { id: 't4', nameEn: 'Thick Basement Membrane', nameAr: 'الغشاء القاعدي السميك', x: 52, y: 64, description: 'Distinct glassy eosinophilic basal boundary.' }
    ],
    ospeQuestion: {
      prompt: 'Station 2: Examine the mucosa of this tubular respiratory organ:',
      questionA: 'A) Identify the lining epithelium:',
      answerA: 'Pseudostratified ciliated columnar epithelium with goblet cells',
      questionB: 'B) Name the specialized surface modification indicated at the luminal border:',
      answerB: 'Cilia (motile respiratory cilia)'
    }
  },
  {
    id: 'slide_skin_strat_squam',
    slideNumber: 3,
    tissueNameEn: 'Keratinized Stratified Squamous Epithelium',
    tissueNameAr: 'الظهارة المطبقة الحرشفية المتقرنة (بشرة الجلد)',
    epitheliumOrCTType: 'Stratified Squamous Epithelium (Keratinized)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    specimenSource: 'Skin (Epidermis of Thick Skin)',
    characteristicDiagnosticFeature: 'Multi-layered epithelium with basal cuboidal cells, prickle cell layer, and superficial dead eosinophilic flaky stratum corneum lacking nuclei.',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    zoomLevels: {
      '4x': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
      '10x': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
      '40x': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
      '100x': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1400&auto=format&fit=crop&q=80'
    },
    labels: [
      { id: 's1', nameEn: 'Stratum Corneum (Keratin)', nameAr: 'طبقة الكيراتين المتقرنة', x: 50, y: 18, description: 'Acellular dense wavy pink sheets of dead keratin.' },
      { id: 's2', nameEn: 'Stratum Granulosum', nameAr: 'الطبقة الحبيبية', x: 50, y: 32, description: 'Dark basophilic keratohyalin granules.' },
      { id: 's3', nameEn: 'Stratum Spinosum', nameAr: 'الطبقة الشائكة', x: 50, y: 48, description: 'Polygonal cells linked by spine-like desmosomes.' },
      { id: 's4', nameEn: 'Stratum Basale', nameAr: 'الطبقة القاعدية المولدة', x: 50, y: 68, description: 'Single row of proliferating cuboidal/columnar stem cells.' }
    ],
    ospeQuestion: {
      prompt: 'Station 3: Examine the specimen under the microscope:',
      questionA: 'A) Identify the tissue and state whether keratinized or non-keratinized:',
      answerA: 'Keratinized stratified squamous epithelium — Skin (epidermis)',
      questionB: 'B) Why is the uppermost layer (stratum corneum) acellular?',
      answerB: 'The cells have undergone cornification, losing their nuclei and organelles to form dense keratin sheets'
    }
  },
  {
    id: 'slide_bladder_transitional',
    slideNumber: 4,
    tissueNameEn: 'Transitional Epithelium (Urothelium)',
    tissueNameAr: 'الظهارة الانتقالية (المثانة البولية)',
    epitheliumOrCTType: 'Transitional Epithelium (Urothelium)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    specimenSource: 'Urinary Bladder (Empty / Relaxed State)',
    characteristicDiagnosticFeature: 'Scalloped surface with large dome-shaped umbrella cells bulging into lumen, frequently binucleate, with pear-shaped intermediate cells.',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    zoomLevels: {
      '4x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80',
      '10x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
      '40x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&auto=format&fit=crop&q=80',
      '100x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1400&auto=format&fit=crop&q=80'
    },
    labels: [
      { id: 'b1', nameEn: 'Umbrella Cell (Dome Cell)', nameAr: 'خلية مظلية محدبة', x: 50, y: 26, description: 'Large pillowy surface cell bulging convexly into the bladder lumen.' },
      { id: 'b2', nameEn: 'Binucleated Cell', nameAr: 'خلية ثنائية النواة', x: 40, y: 30, description: 'Umbrella cell possessing two distinct round nuclei.' },
      { id: 'b3', nameEn: 'Pear-shaped Intermediate Cells', nameAr: 'خلايا وسيطة كمثرية الشكل', x: 52, y: 50, description: 'Multiple layers of polygonal cells tapering basally.' },
      { id: 'b4', nameEn: 'Lamina Propria (Connective Tissue)', nameAr: 'الصفيحة المخصوصة', x: 52, y: 76, description: 'Vascular supporting connective tissue layer.' }
    ],
    ospeQuestion: {
      prompt: 'Station 4: Examine the mucosal lining of this hollow pelvic organ:',
      questionA: 'A) Identify the specific epithelium:',
      answerA: 'Transitional epithelium (Urothelium) — Urinary bladder',
      questionB: 'B) Name two characteristic features of the outermost surface cells:',
      answerB: 'Large dome/umbrella shape bulging into lumen, and presence of binucleated cells'
    }
  },
  {
    id: 'slide_tendon_dense_reg',
    slideNumber: 5,
    tissueNameEn: 'Dense Regular Connective Tissue',
    tissueNameAr: 'النسيج الضام الكثيف المنتظم (وتر العضلة - Tendon)',
    epitheliumOrCTType: 'Dense Regular Collagenous Connective Tissue',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    specimenSource: 'Tendon (Longitudinal Section)',
    characteristicDiagnosticFeature: 'Dense parallel bundles of collagen fibers with single-file linear rows of compressed dark inactive fibrocyte nuclei.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    zoomLevels: {
      '4x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
      '10x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
      '40x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80',
      '100x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&auto=format&fit=crop&q=80'
    },
    labels: [
      { id: 'td1', nameEn: 'Parallel Collagen Bundles', nameAr: 'حزم الكولاجين المتوازية', x: 50, y: 35, description: 'Densely packed, wave-like parallel ribbons of Type I collagen.' },
      { id: 'td2', nameEn: 'Rows of Fibrocytes (Tendon Cells)', nameAr: 'صفوف الخلايا الوترية المتراصة', x: 50, y: 55, description: 'Dark, flattened rod-like nuclei aligned in neat single-file lines.' },
      { id: 'td3', nameEn: 'Endotenon Septum', nameAr: 'الحاجز الضام الداخلي', x: 50, y: 78, description: 'Delicate loose connective tissue wrapping primary bundles.' }
    ],
    ospeQuestion: {
      prompt: 'Station 5: Examine this high-tensile musculoskeletal specimen:',
      questionA: 'A) Identify the tissue type and organ source:',
      answerA: 'Dense regular connective tissue — Tendon',
      questionB: 'B) Name the cell type whose flattened nuclei are arranged in rows:',
      answerB: 'Fibrocytes (tendon cells / tenocytes)'
    }
  },
  {
    id: 'slide_adipose_white',
    slideNumber: 6,
    tissueNameEn: 'Adipose Tissue (White Fat)',
    tissueNameAr: 'النسيج الضام الشحمي (الخلايا الدهنية)',
    epitheliumOrCTType: 'Adipose Connective Tissue (Unilocular)',
    stainUsed: 'Hematoxylin & Eosin (H&E)',
    specimenSource: 'Subcutaneous Tissue (Hypodermis)',
    characteristicDiagnosticFeature: 'Chicken-wire or honeycomb pattern of clear polygonal spaces with peripheral crescent-shaped flattened nuclei ("signet-ring" appearance).',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1000&auto=format&fit=crop&q=80',
    zoomLevels: {
      '4x': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
      '10x': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1000&auto=format&fit=crop&q=80',
      '40x': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&auto=format&fit=crop&q=80',
      '100x': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1400&auto=format&fit=crop&q=80'
    },
    labels: [
      { id: 'ad1', nameEn: 'Extracted Lipid Droplet Space', nameAr: 'الفراغ الدهني المذاب', x: 48, y: 48, description: 'Large empty space left after xylene dissolved the triglyceride droplet.' },
      { id: 'ad2', nameEn: 'Peripheral Flattened Nucleus', nameAr: 'نواة طرفية مسطحة', x: 32, y: 42, description: 'Dark flattened nucleus pushed to the cell border ("Signet Ring").' },
      { id: 'ad3', nameEn: 'Delicate Cytoplasmic Rim', nameAr: 'حافة سيتوبلازمية رقيقة', x: 62, y: 52, description: 'Ultra-thin membrane of remaining cytoplasm enclosing the fat droplet.' }
    ],
    ospeQuestion: {
      prompt: 'Station 6: Examine this subcutaneous biopsy section:',
      questionA: 'A) Identify the tissue:',
      answerA: 'Adipose tissue (white / unilocular fat)',
      questionB: 'B) Why does the cytoplasm appear empty/clear under routine H&E preparation?',
      answerB: 'Lipid is dissolved and extracted by organic solvents (alcohol and xylene) during tissue processing'
    }
  }
];
