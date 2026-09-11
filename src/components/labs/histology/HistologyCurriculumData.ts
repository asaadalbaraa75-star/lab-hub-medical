/**
 * HISTOLOGY LAB CURRICULUM DATA
 * Source of Truth: Verified Faculty Handout by Dr. Ruqia Y. Sharaf Addin
 * First-Year Medical Practical Curriculum, Faculty of Medicine, Sana'a University.
 *
 * STRICT RULE: All explanations, key points, terms, locations, and questions
 * are taken strictly from the handout. No external information or invented facts.
 */

export interface HistologyTerm {
  term: string;
  termAr?: string;
  definition: string;
}

export interface HistologyLabel {
  id: string;
  label: string;
  labelAr?: string;
  clue?: string;
}

export interface HistologyPracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface HistologyLessonItem {
  id: string;
  sectionId: string;
  numberString: string;
  titleEn: string;
  titleAr: string;
  badge: string;
  category?: 'simple' | 'stratified' | 'specialized' | 'loose' | 'dense' | 'general';
  
  // 01 — QUICK EXPLANATION (Very short & simple using ONLY the handout)
  quickExplanation: string;
  quickExplanationAr?: string;

  // 02 — KEY POINTS (Short bullet points)
  keyPoints: string[];

  // 03 — IMPORTANT TERMS
  importantTerms: HistologyTerm[];

  // For Epithelial / Connective Tissues:
  shape?: string;
  location?: string[];
  function?: string[];
  cells?: string[];
  fibers?: string[];
  matrix?: string;

  // 04 — HISTOLOGY IMAGE & 05 — IDENTIFICATION
  visualId: string;
  stain: string;
  magnification: string;
  specimen: string;
  labels: HistologyLabel[];

  // 06 — PRACTICE & 07 — QUICK CHECK
  practiceQuestions: HistologyPracticeQuestion[];

  // 08 — MOTIVATION
  motivation: string;
}

export interface HistologySection {
  id: string;
  number: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  iconName: string;
  badge: string;
  lessons: HistologyLessonItem[];
}

export const MOTIVATIONAL_QUOTES = [
  "🔬 One slide at a time.",
  "🎯 Train your eyes, not only your memory.",
  "🧠 Your microscopic eye is getting stronger.",
  "✓ Excellent identification!",
  "🔬 Observe → Identify → Answer.",
  "Keep going. You are improving."
];

export const HISTOLOGY_SECTIONS: HistologySection[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. INTRODUCTION & MICROSCOPES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_intro_microscopes',
    number: 1,
    titleEn: 'Introduction & Microscopes',
    titleAr: 'مقدمة في علم الأنسجة والمجاهر',
    descriptionEn: 'Definition of histology, goals of study, optical compound microscope parts, and microscope types.',
    iconName: 'Microscope',
    badge: 'FOUNDATION',
    lessons: [
      {
        id: 'lesson_intro_histology',
        sectionId: 'sec_intro_microscopes',
        numberString: 'LESSON 1.1',
        titleEn: 'Definition & Goals of Histology',
        titleAr: 'تعريف علم الأنسجة وأهداف دراسته',
        badge: 'FOUNDATION',
        quickExplanation: 'Histology is the branch of science studying the microscopic anatomy of normal cells, tissues, and organs of the human body.',
        quickExplanationAr: 'علم الأنسجة هو علم دراسة التركيب المجهري الدقيق للخلايا والأنسجة والأعضاء الطبيعية في جسم الإنسان.',
        keyPoints: [
          'Derived from Greek: "histos" = tissue/web, and "logos" = study/science.',
          'The microscope is the primary instrument used in histology.',
          'There are four basic tissue groups: Epithelial, Connective, Muscular, and Nervous tissues.',
          'Knowing normal histology is mandatory before understanding diseased tissue (Histopathology).'
        ],
        importantTerms: [
          { term: 'Histology', termAr: 'علم الأنسجة', definition: 'Science of the microscopic structure of normal cells and tissues.' },
          { term: 'Histopathology', termAr: 'علم أمراض الأنسجة', definition: 'Microscopic examination of diseased tissue to study the manifestations of disease.' },
          { term: 'Four Basic Tissues', termAr: 'الأنسجة الأساسية الأربعة', definition: 'Epithelial, Connective, Muscular, and Nervous tissues.' }
        ],
        visualId: 'microscope_parts',
        stain: 'Not applicable (Instrumentation & Foundations)',
        magnification: 'Macroscopic / Conceptual',
        specimen: 'Human body tissues overview',
        labels: [
          { id: '1', label: 'Epithelial Tissue', clue: 'Closely packed cells covering surfaces' },
          { id: '2', label: 'Connective Tissue', clue: 'Cells separated by abundant extracellular matrix' },
          { id: '3', label: 'Muscular Tissue', clue: 'Contractile cells for body movements' },
          { id: '4', label: 'Nervous Tissue', clue: 'Neurons and supporting cells for communication' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the literal derivation and definition of "Histology" according to the handout?',
            options: [
              'Study of macroscopic bones and organs',
              'Histos = web/tissue, logos = science; study of microscopic structure of normal cells and tissues',
              'Study of pathological bacteria in blood',
              'Chemical synthesis of body hormones'
            ],
            correctIndex: 1,
            explanation: 'Histology is derived from histos (web/tissue) and logos (science), studying normal microscopic anatomy.'
          },
          {
            id: 'q2',
            question: 'How many basic tissue classes constitute the human body according to the handout?',
            options: ['2 classes', '4 classes', '6 classes', '10 classes'],
            correctIndex: 1,
            explanation: 'The handout defines four fundamental tissue categories: Epithelial, Connective, Muscular, and Nervous.'
          }
        ],
        motivation: '🔬 Train your eyes, not only your memory.'
      },
      {
        id: 'lesson_compound_microscope',
        sectionId: 'sec_intro_microscopes',
        numberString: 'LESSON 1.2',
        titleEn: 'Compound Light Microscope',
        titleAr: 'المجهر الضوئي المركب (الأجزاء والوظائف)',
        badge: 'INSTRUMENTATION',
        quickExplanation: 'The compound light microscope uses two lens systems (ocular and objective) and is the main tool used in practical medical histology.',
        quickExplanationAr: 'المجهر الضوئي المركب هو الأداة الأساسية لدراسة شرائح الأنسجة المصبوغة، ويتألف من مجموعتين من العدسات (عينية وشيئية).',
        keyPoints: [
          'LENSES: Eye lens (10x), Objective lenses (Low 10x, High 40x, Oil immersion 100x), and Condenser.',
          'ADJUSTMENTS: Coarse adjustment (large vertical stage movement), Fine adjustment (precise focus), Eye lens adjustment (diopter).',
          'OTHER PARTS: Light switch, Iris diaphragm (beam diameter/contrast), Slide clip, Base, Arm, and Mechanical Stage.',
          'RULE: Coarse adjustment must NEVER be used with High Power (40x) or Oil lens (100x) to avoid breaking the glass slide.'
        ],
        importantTerms: [
          { term: 'Eye Lens (Eyepiece)', termAr: 'العدسة العينية', definition: 'Lens at the top of the body tube magnified 10x.' },
          { term: 'Objective Lenses', termAr: 'العدسات الشيئية', definition: 'Lenses closest to the specimen: Low power (10x), High power (40x), Oil immersion (100x).' },
          { term: 'Condenser', termAr: 'المكثف الضوئي', definition: 'Substage lens that focuses light rays into a bright cone onto the slide.' },
          { term: 'Iris Diaphragm', termAr: 'الحجاب القزحي', definition: 'Regulates the diameter of the light beam entering the condenser.' },
          { term: 'Coarse Adjustment', termAr: 'الضابط التقريبي', definition: 'Moves the stage rapidly up and down; used ONLY with low power.' },
          { term: 'Fine Adjustment', termAr: 'الضابط الدقيق', definition: 'Provides micro-level focusing for sharp resolution at 40x and 100x.' }
        ],
        visualId: 'microscope_parts',
        stain: 'Optical Instrument',
        magnification: '10x Eyepiece × (10x / 40x / 100x Objectives)',
        specimen: 'Compound Optical Microscope Unit',
        labels: [
          { id: '1', label: 'Eye Lens (10x)', clue: 'Top lens looked through' },
          { id: '2', label: 'Objective Lenses (10x, 40x, 100x)', clue: 'Mounted on revolving nosepiece' },
          { id: '3', label: 'Mechanical Stage & Slide Clip', clue: 'Supports and clasps glass slide' },
          { id: '4', label: 'Substage Condenser & Diaphragm', clue: 'Focuses and controls light beam' },
          { id: '5', label: 'Coarse & Fine Adjustments', clue: 'Focus knobs on arm' },
          { id: '6', label: 'Microscope Arm & Base', clue: 'Structural frame and light source base' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Which lens system in the compound microscope is situated closest to the specimen slide?',
            options: ['Eye lens (Eyepiece)', 'Objective lens', 'Diopter adjustment', 'Collector lens'],
            correctIndex: 1,
            explanation: 'Objective lenses are clustered on the revolving nosepiece closest to the specimen.'
          },
          {
            id: 'q2',
            question: 'Under which objective lens is the coarse adjustment knob strictly permitted?',
            options: ['Oil immersion lens (100x) only', 'High power lens (40x) only', 'Low power lens (10x)', 'Any objective lens'],
            correctIndex: 2,
            explanation: 'Coarse adjustment is used ONLY with low power (10x) to avoid crashing into the slide.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      },
      {
        id: 'lesson_microscope_types',
        sectionId: 'sec_intro_microscopes',
        numberString: 'LESSON 1.3',
        titleEn: 'Types of Microscopes',
        titleAr: 'أنواع المجاهر الضوئية المتخصصة',
        badge: 'OPTICS',
        quickExplanation: 'Different microscope types are utilized depending on whether specimens are stained, living, fluorescent, or unstained.',
        quickExplanationAr: 'تتنوع المجاهر بحسب طبيعة العينة المراد فحصها: مجهر ضوئي، مجهر تباين الأطوار، مجهر فلوري، ومجهر الحقل المظلم.',
        keyPoints: [
          'Light Microscope: Routine workhorse for stained tissue sections.',
          'Phase Contrast Microscope: Converts phase shifts of light into brightness changes; used for LIVING unstained cells and spermatozoa.',
          'Fluorescent Microscope: Uses UV light to excite fluorescent dyes attached to cellular targets.',
          'Dark-Ground (Dark-Field) Microscope: Central stop blocks direct light; specimen appears luminous on a black background (e.g., Treponema pallidum).'
        ],
        importantTerms: [
          { term: 'Phase Contrast', termAr: 'مجهر تباين الأطوار', definition: 'Special optics to observe living unstained cells without chemical fixation.' },
          { term: 'Fluorescent Microscope', termAr: 'المجهر الفلوري', definition: 'Utilizes ultraviolet (UV) illumination to detect fluorophore-tagged molecules.' },
          { term: 'Dark-Ground Microscope', termAr: 'مجهر الحقل المظلم', definition: 'Uses indirect scattered light so specimens appear luminous against a black background.' }
        ],
        visualId: 'microscope_parts',
        stain: 'Optical Modalities',
        magnification: 'Variable (Light & Phase Optics)',
        specimen: 'Microscope comparative optics',
        labels: [
          { id: '1', label: 'Phase Contrast Condenser', clue: 'Annular ring diaphragm' },
          { id: '2', label: 'UV Light Excitation', clue: 'Fluorescence excitation filter' },
          { id: '3', label: 'Darkfield Central Stop', clue: 'Blocks direct zero-order light' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Which microscope is specifically indicated for examining LIVING unstained cultured cells and spermatozoa?',
            options: ['Transmission Electron Microscope', 'Phase Contrast Microscope', 'Standard Light Microscope with H&E', 'Simple Loupe'],
            correctIndex: 1,
            explanation: 'Phase contrast microscopy visualizes unstained living cells by converting invisible phase differences into brightness contrast.'
          },
          {
            id: 'q2',
            question: 'What is the characteristic visual appearance in dark-ground (dark-field) microscopy?',
            options: [
              'Pink cytoplasm and blue nuclei on a white background',
              'Bright luminous specimen against a completely dark background',
              'Green fluorescent signals under daylight',
              'Black and white 2D ultrastructure'
            ],
            correctIndex: 1,
            explanation: 'In dark-field microscopy, only scattered light enters the objective, rendering the specimen bright on a dark background.'
          }
        ],
        motivation: '🔬 Observe → Identify → Answer.'
      },
      {
        id: 'lesson_electron_microscopes',
        sectionId: 'sec_intro_microscopes',
        numberString: 'LESSON 1.4',
        titleEn: 'Electron Microscopes (TEM vs SEM)',
        titleAr: 'المجهر الإلكتروني: المقارنة بين TEM و SEM',
        badge: 'ULTRASTRUCTURE',
        quickExplanation: 'Electron microscopes use high-voltage electron beams and electromagnetic lenses, achieving magnifications up to 1,000,000x.',
        quickExplanationAr: 'تستخدم المجاهر الإلكترونية حزمة من الإلكترونات وعدسات كهرومغناطيسية لدراسة البنى تحت الخلوية الدقيقة جداً.',
        keyPoints: [
          'Transmission Electron Microscope (TEM): Electron beam passes THROUGH an ultra-thin slice (50–100 nm). Produces 2D internal ultrastructure up to 1,000,000x.',
          'Scanning Electron Microscope (SEM): Electron beam SCANS across the heavy-metal coated surface. Produces striking 3D surface topography up to 100,000x.',
          'TEM requires ultra-thin sections cut on an ultramicrotome; SEM requires whole specimens coated with gold/platinum.',
          'Wavelength of electron beam (~0.005 nm) yields far higher resolution (~0.2 nm) than light photons (~200 nm).'
        ],
        importantTerms: [
          { term: 'TEM', termAr: 'المجهر الإلكتروني النافذ', definition: 'Transmission Electron Microscope: reveals 2D internal organelle ultrastructure.' },
          { term: 'SEM', termAr: 'المجهر الإلكتروني الماسح', definition: 'Scanning Electron Microscope: reveals 3D external surface contours.' },
          { term: 'Ultramicrotome', termAr: 'ميكروتوم فائق الدقة', definition: 'Instrument with a diamond knife used to cut 50–100 nm ultra-thin sections for TEM.' }
        ],
        visualId: 'microscope_parts',
        stain: 'Heavy Metal Stains (Lead/Uranium) vs Gold Sputter',
        magnification: '100,000x – 1,000,000x',
        specimen: 'TEM grid vs SEM stub',
        labels: [
          { id: '1', label: 'TEM: 2D Internal Ultrastructure', clue: 'Electrons pass through ultra-thin slice' },
          { id: '2', label: 'SEM: 3D Surface Topography', clue: 'Electrons scan outer metallic surface' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the primary difference in image dimensionality between TEM and SEM?',
            options: [
              'TEM produces 3D surface images; SEM produces 2D slices',
              'TEM produces 2D internal ultrastructural slices; SEM produces 3D surface topography',
              'Both produce identical color pictures',
              'Neither uses electron beams'
            ],
            correctIndex: 1,
            explanation: 'TEM transmits through ultra-thin sections providing 2D internal slices, whereas SEM scans outer surfaces producing 3D images.'
          },
          {
            id: 'q2',
            question: 'What section thickness is required for Transmission Electron Microscopy (TEM)?',
            options: ['5–7 micrometers', '50–100 nanometers (ultra-thin)', '1–2 millimeters', 'No sectioning required'],
            correctIndex: 1,
            explanation: 'TEM requires ultra-thin sections (50–100 nm) cut with a diamond knife so electrons can pass through.'
          }
        ],
        motivation: '🧠 Your microscopic eye is getting stronger.'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. TISSUE SLIDE PREPARATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_slide_prep',
    number: 2,
    titleEn: 'Tissue Slide Preparation',
    titleAr: 'تحضير الشرائح النسيجية (10 خطوات)',
    descriptionEn: 'The exact 10-step sequence for preparing paraffin sections from surgical biopsy to permanent slide.',
    iconName: 'Layers',
    badge: 'PRACTICAL LAB',
    lessons: [
      {
        id: 'lesson_tissue_prep_10steps',
        sectionId: 'sec_slide_prep',
        numberString: 'LESSON 2.1',
        titleEn: '10-Step Slide Preparation Workflow',
        titleAr: 'خطوات تحضير الشريحة النسيجية خطوة بخطوة',
        badge: 'TECHNIQUE',
        quickExplanation: 'Preparing a histological slide requires an exact sequence of 10 chemical and physical steps to convert fresh tissue into a permanent stained section.',
        quickExplanationAr: 'يتطلب إعداد الشريحة النسيجية 10 خطوات متسلسلة ودقيقة من لحظة أخذ العينة وحتى فحصها بالمجهر.',
        keyPoints: [
          '1. Fixation: 10% Neutral Buffered Formalin prevents autolysis and putrefaction.',
          '2. Dehydration: Ascending grades of alcohol (70% → 80% → 90% → 95% → 100%) remove all water.',
          '3. Clearing: Xylene (Xylol) replaces alcohol and makes tissue translucent.',
          '4. Embedding: Molten paraffin wax (56°C–58°C) infiltrates and solidifies into a rigid block.',
          '5. Section Cutting: Rotary microtome cuts ribbons 5–7 micrometers (5–7 μm) thick.',
          '6. Deparaffinization: Xylene dissolves and removes paraffin wax from the slide.',
          '7. Hydration: Descending alcohols (100% → 70%) to water prepare tissue for aqueous stains.',
          '8. Staining: Hematoxylin (nuclei blue/purple) and Eosin (cytoplasm pink/red).',
          '9. Dehydration: Ascending alcohols remove water before mounting.',
          '10. Clearing & Mounting: Xylene + DPX resin permanently seals tissue under a coverslip.'
        ],
        importantTerms: [
          { term: 'Fixation (Formalin)', termAr: 'التثبيت (فورمالين)', definition: '10% neutral buffered formalin cross-links proteins, arresting autolysis and decomposition.' },
          { term: 'Clearing (Xylene)', termAr: 'الترويق (الزايلين)', definition: 'Xylene acts as a solvent miscible with both alcohol and paraffin wax.' },
          { term: 'Microtomy (5–7 μm)', termAr: 'التقطيع المجهري', definition: 'Cutting paraffin blocks into ribbons 5–7 μm thick (approx. one RBC diameter).' },
          { term: 'DPX Resin', termAr: 'مادة التركيب DPX', definition: 'Permanent mounting resin that binds the coverslip and preserves the section for decades.' }
        ],
        visualId: 'tissue_prep_workflow',
        stain: 'Formalin → Xylene → Paraffin → H&E → DPX',
        magnification: 'Macroscopic / Histopathology Lab Bench',
        specimen: 'Tissue processing workflow jars',
        labels: [
          { id: '1', label: '1. Fixation (10% Formalin)', clue: 'Stops autolysis and preserves morphology' },
          { id: '2', label: '2. Dehydration (Ascending Alcohols)', clue: '70% to 100% ethanol' },
          { id: '3', label: '3. Clearing (Xylene/Xylol)', clue: 'Miscible with alcohol and wax' },
          { id: '4', label: '4. Embedding (Paraffin 58°C)', clue: 'Forms solid paraffin block' },
          { id: '5', label: '5. Microtomy (5–7 μm ribbons)', clue: 'Rotary microtome cutting' },
          { id: '6', label: '8. Staining (H&E)', clue: 'Hematoxylin (blue) & Eosin (pink)' },
          { id: '7', label: '10. Mounting (DPX + Coverslip)', clue: 'Permanent optical sealing' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the primary universal reagent used in Step 1 (Fixation) according to the handout?',
            options: ['100% Absolute Ethanol', '10% Neutral Buffered Formalin', 'Molten Paraffin Wax', 'DPX Mountant'],
            correctIndex: 1,
            explanation: '10% neutral buffered formalin is the universal fixative that terminates enzymatic autolysis.'
          },
          {
            id: 'q2',
            question: 'What is the standard section thickness produced by the microtome in histology?',
            options: ['50–100 nanometers', '5–7 micrometers (μm)', '1–2 millimeters', '20–30 micrometers'],
            correctIndex: 1,
            explanation: 'The standard histological section thickness is 5 to 7 micrometers (5–7 μm).'
          },
          {
            id: 'q3',
            question: 'Why must tissue undergo dehydration before embedding into paraffin wax?',
            options: [
              'Because water makes tissue too hard to cut',
              'Because paraffin wax is hydrophobic and immiscible with water',
              'To stain cell nuclei blue',
              'To kill all bacteria'
            ],
            correctIndex: 1,
            explanation: 'Paraffin wax is hydrophobic; all tissue water must be replaced with alcohol then xylene.'
          }
        ],
        motivation: '🔬 One slide at a time.'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. STAINS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_stains',
    number: 3,
    titleEn: 'Stains',
    titleAr: 'الصبغات النسيجية (Stains)',
    descriptionEn: 'Acidic, basic, neutral, and special stains used in histological diagnosis.',
    iconName: 'Sparkles',
    badge: 'DIAGNOSTIC DYES',
    lessons: [
      {
        id: 'lesson_histological_stains',
        sectionId: 'sec_stains',
        numberString: 'LESSON 3.1',
        titleEn: 'Histological Stains & Dyes',
        titleAr: 'أنواع الصبغات النسيجية وتصنيفاتها',
        badge: 'BIOCHEMISTRY',
        quickExplanation: 'Stains impart contrasting colors based on ionic charges: acidic dyes stain basic components, basic dyes stain acidic components.',
        quickExplanationAr: 'تعتمد الصباغة على التفاعلات الأيونية: الصبغات القاعدية تصبغ الأجزاء الحمضية، والصبغات الحمضية تصبغ الأجزاء القاعدية.',
        keyPoints: [
          'BASIC STAINS (e.g., Hematoxylin, Methylene Blue): Cationic (+), bind acidic anions like DNA/RNA; stain nuclei and ribosomes DEEP BLUE/PURPLE (Basophilic).',
          'ACIDIC STAINS (e.g., Eosin, Orange G): Anionic (-), bind cationic basic proteins; stain cytoplasm and collagen PINK/RED (Acidophilic / Eosinophilic).',
          'NEUTRAL STAINS (e.g., Leishman stain): Mixture of basic and acidic dyes; used for blood films.',
          'SPECIAL STAINS: Silver (black for reticular fibers & Golgi), Sudan III (orange for fat/adipose), Iron Hematoxylin (black for mitochondria), Toluidine Blue (blue for Nissl bodies), Orcein (brown/purple for elastic fibers).'
        ],
        importantTerms: [
          { term: 'Basophilic', termAr: 'محب للقواعد (قاعدي الصباغة)', definition: 'Structures stained blue/purple by basic dyes (e.g., nuclei, chromatin, rER).' },
          { term: 'Acidophilic / Eosinophilic', termAr: 'محب للأحماض (حمضي الصباغة)', definition: 'Structures stained pink/red by acidic dyes (e.g., cytoplasm, collagen fibers, RBCs).' },
          { term: 'H&E (Hematoxylin & Eosin)', termAr: 'صبغة H&E', definition: 'The universal routine combination: Hematoxylin stains nuclei blue, Eosin stains cytoplasm pink.' },
          { term: 'Silver Impregnation', termAr: 'الترسيب الفضي', definition: 'Special method where silver salts deposit as black precipitate on reticular fibers and Golgi.' }
        ],
        visualId: 'stains_comparison',
        stain: 'Comparative: H&E, Silver, Sudan III, Toluidine Blue',
        magnification: '400x High Power',
        specimen: 'Comparative staining affinity array',
        labels: [
          { id: '1', label: 'Basophilic Nuclei (Blue/Purple)', clue: 'Stained by basic hematoxylin' },
          { id: '2', label: 'Acidophilic Cytoplasm (Pink/Red)', clue: 'Stained by acidic eosin' },
          { id: '3', label: 'Silver Staining (Black Mesh)', clue: 'Reticular fibers & Golgi complex' },
          { id: '4', label: 'Sudan III Staining (Orange/Red)', clue: 'Adipose lipid droplets' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What color do cell nuclei display when stained with standard Hematoxylin and Eosin (H&E)?',
            options: ['Bright pink', 'Deep blue to dark purple (Basophilic)', 'Golden yellow', 'Jet black'],
            correctIndex: 1,
            explanation: 'Hematoxylin is a basic dye that binds anionic nucleic acids, staining nuclei deep blue/purple.'
          },
          {
            id: 'q2',
            question: 'Which special stain is specifically used to demonstrate reticular fibers and the Golgi apparatus?',
            options: ['Sudan III', 'Silver impregnation', 'Toluidine blue', 'Periodic Acid Schiff'],
            correctIndex: 1,
            explanation: 'Silver impregnation deposits metallic silver, staining reticular fibers and Golgi complex black.'
          }
        ],
        motivation: '✓ Excellent identification!'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. THE CELL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_the_cell',
    number: 4,
    titleEn: 'The Cell',
    titleAr: 'الخلية وبنيتها الأساسية',
    descriptionEn: 'The fundamental structural and functional unit of the human body.',
    iconName: 'Circle',
    badge: 'CYTOLOGY',
    lessons: [
      {
        id: 'lesson_the_cell',
        sectionId: 'sec_the_cell',
        numberString: 'LESSON 4.1',
        titleEn: 'The Eukaryotic Cell',
        titleAr: 'الخلية حقيقية النواة وتركيبها العام',
        badge: 'CYTOLOGY',
        quickExplanation: 'The cell is the basic building block of all living tissues, composed of plasma membrane, cytoplasm with organelles, and a nucleus.',
        quickExplanationAr: 'الخلية هي الوحدة التركيبية والوظيفية الأساسية للجسم، وتتألف من غشاء خلوي وسيتوبلازم وعضيات ونواة.',
        keyPoints: [
          'Plasma Membrane: Trilaminar lipid bilayer regulating transport.',
          'Cytoplasm: Viscous cytosol containing membranous and non-membranous organelles.',
          'Nucleus: Master control center containing chromatin (DNA), nucleolus (RNA/ribosome assembly), and nuclear envelope.',
          'Organelles carry out specific specialized metabolic functions (energy production, secretion, synthesis).'
        ],
        importantTerms: [
          { term: 'Plasma Membrane', termAr: 'الغشاء البلازمي', definition: 'Outer boundary of the cell controlling permeability and intercellular communication.' },
          { term: 'Cytosol', termAr: 'السيتوسول', definition: 'Fluid portion of the cytoplasm in which organelles and inclusions are suspended.' },
          { term: 'Chromatin', termAr: 'الكروماتين', definition: 'Complex of DNA and histone proteins inside the interphase nucleus.' }
        ],
        visualId: 'eukaryotic_cell',
        stain: 'H&E / Electron Microscopy Schema',
        magnification: 'High Power / Ultrastructure',
        specimen: 'Typical human eukaryotic cell',
        labels: [
          { id: '1', label: 'Plasma Membrane', clue: 'Trilaminar outer boundary' },
          { id: '2', label: 'Nucleus & Nucleolus', clue: 'Basophilic genetic center' },
          { id: '3', label: 'Cytoplasm & Organelles', clue: 'Metabolic machinery' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What are the three primary components of any eukaryotic animal cell according to the handout?',
            options: [
              'Cell wall, chloroplast, and vacuole',
              'Plasma membrane, cytoplasm (with organelles), and nucleus',
              'Only nucleus and ribosomes',
              'Capsule, flagellum, and plasmid'
            ],
            correctIndex: 1,
            explanation: 'The eukaryotic cell consists of plasma membrane, cytoplasm with organelles, and nucleus.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. CELL ORGANELLES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_cell_organelles',
    number: 5,
    titleEn: 'Cell Organelles',
    titleAr: 'عضيات الخلية (Organelles)',
    descriptionEn: 'Individual lessons for each major organelle: Golgi apparatus, mitochondria, Nissl bodies, and division centers.',
    iconName: 'Activity',
    badge: 'ORGANELLES',
    lessons: [
      {
        id: 'lesson_golgi_apparatus',
        sectionId: 'sec_cell_organelles',
        numberString: 'LESSON 5.1',
        titleEn: 'Golgi Apparatus',
        titleAr: 'جهاز جولجي (Golgi Apparatus)',
        badge: 'ORGANELLE',
        quickExplanation: 'The Golgi apparatus modifies, sorts, and packages proteins for secretion; visualized as a dark brown/black reticular network by silver impregnation.',
        quickExplanationAr: 'جهاز جولجي يختص بتعديل وتغليف وإفراز البروتينات، ويظهر كشبكة بنية أو سوداء بترسيب الفضة.',
        keyPoints: [
          'Stained selectively with Silver Impregnation (Da Fano / Cajal method) in spinal ganglion or epididymis.',
          'Appears as a dark brown or black network of fibrils and granules surrounding a negative (unstained) round nucleus.',
          'Structural polarity: Cis face (forming/receiving face facing rER) and Trans face (maturing/shipping face releasing secretory vesicles).',
          'Primary function: Post-translational modification, concentration, packaging, and sorting of secretory proteins.'
        ],
        importantTerms: [
          { term: 'Golgi Apparatus', termAr: 'جهاز جولجي', definition: 'Membranous organelle composed of flattened cisternae dedicated to packaging and secretion.' },
          { term: 'Silver Impregnation', termAr: 'الصباغة بالفضة', definition: 'Selective histological method to stain the Golgi complex black/dark brown.' },
          { term: 'Cis Face vs Trans Face', termAr: 'الوجه المورّد والمفرز', definition: 'Cis receives proteins from rER; Trans packages and buds off mature secretory granules.' }
        ],
        visualId: 'organelle_golgi',
        stain: 'Silver Impregnation (Cajal / Da Fano)',
        magnification: '1000x Oil Immersion',
        specimen: 'Spinal Ganglion / Epididymal Epithelium',
        labels: [
          { id: '1', label: 'Golgi Complex (Black Network)', clue: 'Brown/black network in cytoplasm' },
          { id: '2', label: 'Negative Round Nucleus', clue: 'Unstained central circle' },
          { id: '3', label: 'Cell Boundary', clue: 'Outer plasma membrane border' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What special stain is used to visualize the Golgi apparatus in practical histology?',
            options: ['Eosin Y', 'Silver impregnation', 'Toluidine blue', 'Sudan III'],
            correctIndex: 1,
            explanation: 'Silver impregnation selectively reveals the Golgi apparatus as a dark black/brown network.'
          },
          {
            id: 'q2',
            question: 'What is the main physiological function of the Golgi apparatus?',
            options: [
              'Synthesis of ATP through oxidative phosphorylation',
              'Modification, concentration, packaging, and sorting of secretory proteins',
              'Digestion of phagocytosed bacteria',
              'Organization of mitotic spindle fibers'
            ],
            correctIndex: 1,
            explanation: 'The Golgi apparatus is the packing and shipping center of the cell.'
          }
        ],
        motivation: '🔬 One slide at a time.'
      },
      {
        id: 'lesson_mitochondria',
        sectionId: 'sec_cell_organelles',
        numberString: 'LESSON 5.2',
        titleEn: 'Mitochondria',
        titleAr: 'الميتوكوندريا (Mitochondria)',
        badge: 'ORGANELLE',
        quickExplanation: 'Mitochondria are the powerhouses of the cell, generating ATP via oxidative phosphorylation; demonstrated with Iron Hematoxylin.',
        quickExplanationAr: 'الميتوكوندريا هي مصانع طاقة الخلية (ATP)، وتُصبغ بصبغة هيماتوكسيلين الحديد كحبيبات وقضبان زرقاء داكنة/سوداء.',
        keyPoints: [
          'Demonstrated microscopically using Iron Hematoxylin stain (e.g., in renal tubule or liver cells).',
          'Appear as blue-black rods, granules, or filaments in the cytoplasm.',
          'Double-membrane structure: Outer smooth membrane and inner folded membrane forming cristae.',
          'Abundant in metabolically active cells with active transport (renal proximal tubules, cardiac muscle).'
        ],
        importantTerms: [
          { term: 'Mitochondria', termAr: 'الميتوكوندريا', definition: 'Double-membraned organelle generating ATP by cellular respiration.' },
          { term: 'Iron Hematoxylin', termAr: 'هيماتوكسيلين الحديد', definition: 'Special histological stain coloring mitochondria dark blue/black.' },
          { term: 'Cristae', termAr: 'الأعراف', definition: 'Folds of the inner mitochondrial membrane containing respiratory chain enzymes.' }
        ],
        visualId: 'organelle_mitochondria',
        stain: 'Iron Hematoxylin (Heidenhain)',
        magnification: '1000x Oil Immersion',
        specimen: 'Kidney (Renal Proximal Convoluted Tubules)',
        labels: [
          { id: '1', label: 'Basal Striated Mitochondria (Dark Rods)', clue: 'Mitochondria stacked between basal infoldings' },
          { id: '2', label: 'Round Nucleus', clue: 'Tubule cell nucleus' },
          { id: '3', label: 'Tubule Lumen', clue: 'Central cavity of renal tubule' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Which histological stain is used to demonstrate mitochondria as dark blue/black granules?',
            options: ['Toluidine Blue', 'Iron Hematoxylin', 'Orcein', 'Sudan III'],
            correctIndex: 1,
            explanation: 'Iron hematoxylin stains mitochondria dark blue/black in renal tubule and liver cells.'
          }
        ],
        motivation: '🧠 Your microscopic eye is getting stronger.'
      },
      {
        id: 'lesson_nissl_bodies',
        sectionId: 'sec_cell_organelles',
        numberString: 'LESSON 5.3',
        titleEn: 'Nissl Bodies',
        titleAr: 'أجسام نيسل (Nissl Bodies in Neurons)',
        badge: 'ORGANELLE',
        quickExplanation: 'Nissl bodies are prominent basophilic clumps of rough ER and free ribosomes in nerve cells; stained intensely with Toluidine Blue.',
        quickExplanationAr: 'أجسام نيسل هي كتل قاعدية الصباغة من الشبكة الإندوبلازمية الخشنة والريبوسومات في الخلايا العصبية، وتُصبغ بأزرق التولويدين.',
        keyPoints: [
          'Stained with Toluidine Blue or Thionine in motor neurons of the spinal cord anterior horn.',
          'Under the microscope, you must identify: 1. Nissl bodies (blue granules), 2. Large vesicular nucleus, 3. Prominent dark nucleolus, 4. Supporting neuroglial cells.',
          'Composed ultrastructurally of stacks of Rough Endoplasmic Reticulum (rER) and abundant free polyribosomes.',
          'DIAGNOSTIC EXAM RULE: Nissl bodies are present throughout the soma and dendrites, but are COMPLETELY ABSENT from the Axon Hillock and axon.'
        ],
        importantTerms: [
          { term: 'Nissl Bodies (Nissl Substance)', termAr: 'أجسام نيسل', definition: 'Large basophilic masses of rER and ribosomes in neuron cytoplasm dedicated to protein synthesis.' },
          { term: 'Toluidine Blue', termAr: 'أزرق التولويدين', definition: 'Basic stain selectively binding RNA in Nissl bodies and nuclei.' },
          { term: 'Axon Hillock', termAr: 'أكمة المحور', definition: 'Funnel-shaped region of the neuron soma giving rise to the axon; strictly devoid of Nissl bodies.' }
        ],
        visualId: 'organelle_nissl',
        stain: 'Toluidine Blue (or Methylene Blue)',
        magnification: '400x High Power / 1000x Oil',
        specimen: 'Spinal Cord Anterior Horn (Motor Neuron)',
        labels: [
          { id: '1', label: 'Nissl Bodies (Basophilic Granules)', clue: 'Intense blue RNA clumps throughout soma' },
          { id: '2', label: 'Vesicular Pale Nucleus', clue: 'Euchromatic round nucleus' },
          { id: '3', label: 'Prominent Dark Nucleolus', clue: '"Owl-eye" central dark dot' },
          { id: '4', label: 'Axon Hillock (Devoid of Nissl!)', clue: 'Pale clear zone lacking granules' },
          { id: '5', label: 'Supporting Glial Cells', clue: 'Small dark neuroglia nuclei around neuron' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What are Nissl bodies biochemically and ultrastructurally composed of according to the handout?',
            options: [
              'Smooth endoplasmic reticulum and glycogen',
              'Stacks of Rough Endoplasmic Reticulum (rER) and free ribosomes',
              'Mitochondrial cristae and Golgi cisternae',
              'Lipid droplets and lysosomes'
            ],
            correctIndex: 1,
            explanation: 'Nissl bodies are aggregated masses of rER cisternae and ribosomes for neurotransmitter/protein synthesis.'
          },
          {
            id: 'q2',
            question: 'Which region of the motor neuron is strictly DEVOID of Nissl bodies?',
            options: ['Dendrites', 'Axon Hillock and Axon', 'Perinuclear soma', 'Cell center'],
            correctIndex: 1,
            explanation: 'The axon hillock and axon contain no Nissl bodies, creating a pale diagnostic zone on histology.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. CELL DIVISION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_cell_division',
    number: 6,
    titleEn: 'Cell Division',
    titleAr: 'انقسام الخلية (Cell Division)',
    descriptionEn: 'Karyokinesis, cytokinesis, and the 4 phases of mitosis: Prophase, Metaphase, Anaphase, Telophase.',
    iconName: 'RotateCcw',
    badge: 'MITOSIS',
    lessons: [
      {
        id: 'lesson_mitosis_prophase',
        sectionId: 'sec_cell_division',
        numberString: 'LESSON 6.1',
        titleEn: 'Prophase',
        titleAr: 'الطور التمهيدي (Prophase)',
        badge: 'STAGE 1',
        quickExplanation: 'During prophase, chromatin condenses into visible chromosomes, nucleoli disappear, and the nuclear envelope disintegrates.',
        quickExplanationAr: 'في الطور التمهيدي، يتكثف الكروماتين إلى صبغيات واضحة، وتختفي النوية، ويتحلل الغلاف النووي، وتتشكل خيوط المغزل.',
        keyPoints: [
          'Chromatin threads condense into distinct, thick visible chromosomes.',
          'Each chromosome consists of two sister chromatids held by a centromere.',
          'The nucleolus disappears and the nuclear envelope breaks down into vesicles.',
          'Centrosomes migrate to opposite poles and mitotic spindle fibers form.'
        ],
        importantTerms: [
          { term: 'Prophase', termAr: 'الطور التمهيدي', definition: 'First stage of mitosis characterized by chromosome condensation and spindle formation.' },
          { term: 'Karyokinesis', termAr: 'الانقسام النووي', definition: 'The division of the cell nucleus into two daughter nuclei.' }
        ],
        visualId: 'cell_division_mitosis',
        stain: 'Iron Hematoxylin / Basic Nuclear Dyes',
        magnification: '1000x Oil Immersion',
        specimen: 'Dividing cells (Onion root tip / Blastula / Bone marrow)',
        labels: [
          { id: '1', label: 'Condensed Chromosomes', clue: 'Dark coiled chromosome threads' },
          { id: '2', label: 'Disintegrating Nuclear Envelope', clue: 'Dissolving nuclear border' },
          { id: '3', label: 'Forming Spindle Poles', clue: 'Centrosomes at opposite sides' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What major event marks the transition of chromatin during Prophase?',
            options: [
              'Chromosomes decondense into invisible threads',
              'Diffuse chromatin condenses into distinct visible coiled chromosomes',
              'Centromeres split and pull apart',
              'Cleavage furrow divides the cell into two'
            ],
            correctIndex: 1,
            explanation: 'Prophase is characterized by condensation of diffuse chromatin into visible chromosomes.'
          }
        ],
        motivation: '🔬 Observe → Identify → Answer.'
      },
      {
        id: 'lesson_mitosis_metaphase',
        sectionId: 'sec_cell_division',
        numberString: 'LESSON 6.2',
        titleEn: 'Metaphase',
        titleAr: 'الطور الاستوائي (Metaphase)',
        badge: 'STAGE 2',
        quickExplanation: 'In metaphase, chromosomes line up in a single plane along the cell equator (metaphase plate) attached to spindle fibers.',
        quickExplanationAr: 'في الطور الاستوائي، تصطف الصبغيات في خط واحد على الصفيحة الاستوائية في منتصف الخلية.',
        keyPoints: [
          'Chromosomes reach their maximum state of condensation and visibility.',
          'Chromosomes align precisely in a single plane across the cell equator (Metaphase / Equatorial Plate).',
          'Mitotic spindle fibers connect to the kinetochores of each chromosome centromere.',
          'Ideal phase for cytogenetic karyotype examination.'
        ],
        importantTerms: [
          { term: 'Metaphase Plate', termAr: 'الصفيحة الاستوائية', definition: 'Equatorial plane where condensed chromosomes align midway between spindle poles.' },
          { term: 'Kinetochore', termAr: 'الحيز الحركي', definition: 'Protein complex on the centromere serving as attachment point for spindle microtubules.' }
        ],
        visualId: 'cell_division_mitosis',
        stain: 'Nuclear Stain',
        magnification: '1000x Oil Immersion',
        specimen: 'Dividing tissue (Metaphase stage)',
        labels: [
          { id: '1', label: 'Equatorial Metaphase Plate', clue: 'Chromosomes aligned in center line' },
          { id: '2', label: 'Mitotic Spindle Fibers', clue: 'Radiating microtubules' },
          { id: '3', label: 'Spindle Pole Centrosomes', clue: 'Opposite cell poles' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Where do chromosomes align during Metaphase?',
            options: [
              'At opposite cell poles',
              'Along the central equatorial plate (metaphase plate)',
              'Inside the intact nucleus',
              'Outside the plasma membrane'
            ],
            correctIndex: 1,
            explanation: 'During metaphase, chromosomes align along the central equatorial plate.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      },
      {
        id: 'lesson_mitosis_anaphase',
        sectionId: 'sec_cell_division',
        numberString: 'LESSON 6.3',
        titleEn: 'Anaphase',
        titleAr: 'الطور الانفصالي (Anaphase)',
        badge: 'STAGE 3',
        quickExplanation: 'Centromeres split, and sister chromatids separate into daughter chromosomes moving toward opposite poles.',
        quickExplanationAr: 'في الطور الانفصالي، تنشطر القطع المركزية وتتباعد الكروماتيدات الشقيقة نحو القطبين المتقابلين.',
        keyPoints: [
          'Centromere of each chromosome divides synchronously.',
          'Sister chromatids separate and become individual daughter chromosomes.',
          'Spindle fibers shorten, pulling daughter chromosomes V-shaped toward opposite centrosome poles.',
          'This is the shortest phase of mitosis.'
        ],
        importantTerms: [
          { term: 'Anaphase', termAr: 'الطور الانفصالي', definition: 'Stage where sister chromatids separate and migrate to opposite spindle poles.' },
          { term: 'Daughter Chromosomes', termAr: 'الصبغيات البنوية', definition: 'Separated chromatids moving toward opposite poles.' }
        ],
        visualId: 'cell_division_mitosis',
        stain: 'Nuclear Stain',
        magnification: '1000x Oil Immersion',
        specimen: 'Dividing tissue (Anaphase stage)',
        labels: [
          { id: '1', label: 'Separating Chromosome Sets', clue: 'Two V-shaped groups moving apart' },
          { id: '2', label: 'Shortening Spindle Fibers', clue: 'Microtubules pulling toward poles' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What occurs to sister chromatids during Anaphase?',
            options: [
              'They duplicate their DNA',
              'They separate at the centromere and migrate toward opposite poles',
              'They align at the center',
              'They form a new nucleolus'
            ],
            correctIndex: 1,
            explanation: 'In anaphase, centromeres split and sister chromatids are pulled to opposite poles.'
          }
        ],
        motivation: '🧠 Your microscopic eye is getting stronger.'
      },
      {
        id: 'lesson_mitosis_telophase',
        sectionId: 'sec_cell_division',
        numberString: 'LESSON 6.4',
        titleEn: 'Telophase & Cytokinesis',
        titleAr: 'الطور النهائي وانقسام السيتوبلازم (Telophase)',
        badge: 'STAGE 4',
        quickExplanation: 'Daughter chromosomes reach the poles, nuclear envelopes reform, chromosomes uncoil, and cytokinesis divides the cytoplasm.',
        quickExplanationAr: 'في الطور النهائي، تصل الصبغيات إلى القطبين، ويتشكل الغلاف النووي من جديد، وينقسم السيتوبلازم (Cytokinesis).',
        keyPoints: [
          'Daughter chromosomes arrive at opposite poles and begin to decondense/uncoil back into diffuse chromatin.',
          'New nuclear envelopes assemble around each daughter chromosome cluster.',
          'Nucleoli reappear inside each new daughter nucleus.',
          'Cytokinesis: In animal cells, a contractile ring of actin microfilaments forms a cleavage furrow that constricts the cell into two identical daughter cells.'
        ],
        importantTerms: [
          { term: 'Telophase', termAr: 'الطور النهائي', definition: 'Final stage of karyokinesis where daughter nuclei reform.' },
          { term: 'Cytokinesis', termAr: 'انقسام السيتوبلازم', definition: 'Physical division of the cytoplasm and organelles into two daughter cells.' },
          { term: 'Cleavage Furrow', termAr: 'ثلم الانقسام', definition: 'Constriction indentation in animal cells that deepens until cells separate.' }
        ],
        visualId: 'cell_division_mitosis',
        stain: 'Nuclear Stain',
        magnification: '1000x Oil Immersion',
        specimen: 'Dividing tissue (Telophase stage)',
        labels: [
          { id: '1', label: 'Reforming Daughter Nuclei', clue: 'Two pale nuclei with reforming envelopes' },
          { id: '2', label: 'Cleavage Furrow (Cytokinesis)', clue: 'Indentation constricting equator' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the term for the physical division of the cytoplasm into two daughter cells?',
            options: ['Karyokinesis', 'Cytokinesis', 'Prophase', 'Interphase'],
            correctIndex: 1,
            explanation: 'Cytokinesis is the cytoplasmic division, distinct from nuclear karyokinesis.'
          }
        ],
        motivation: '✓ Excellent identification!'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. EPITHELIAL TISSUE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_epithelial_tissue',
    number: 7,
    titleEn: 'Epithelial Tissue',
    titleAr: 'النسيج الطلائي (Epithelial Tissue)',
    descriptionEn: 'Simple epithelium, stratified epithelium, and neuro-epithelium with high-yield practical microscopic slides.',
    iconName: 'BookmarkCheck',
    badge: 'TISSUES',
    lessons: [
      // --- SIMPLE EPITHELIUM ---
      {
        id: 'lesson_simple_squamous',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.1',
        titleEn: 'Simple Squamous Epithelium',
        titleAr: 'النسيج الطلائي الحرشفي البسيط',
        badge: 'SIMPLE',
        category: 'simple',
        quickExplanation: 'A single layer of flat, scale-like cells with flat disc-shaped nuclei, adapted for rapid diffusion and filtration.',
        quickExplanationAr: 'طبقة واحدة من خلايا مسطحة تشبه الحراشف ذات أنوية قرصية مسطحة، مخصصة للترشيح والانتشار السريع.',
        keyPoints: [
          'Single layer of thin, flattened polygonal cells resting on a basement membrane.',
          'Nucleus: Flattened oval/disc-shaped, bulging slightly in the cell center.',
          'Locations: Bowman’s capsule parietal layer (kidney), lung alveoli, endothelial lining of blood vessels, mesothelium of serous cavities.',
          'Function: Passive diffusion of gases and filtration of fluids.'
        ],
        importantTerms: [
          { term: 'Simple Squamous', termAr: 'حرشفي بسيط', definition: 'One layer of flat cells with flattened nuclei.' },
          { term: 'Bowman’s Capsule', termAr: 'محفظة بومان', definition: 'Renal corpuscle structure lined by simple squamous epithelium.' },
          { term: 'Endothelium', termAr: 'البطانة الوعائية', definition: 'Simple squamous lining of blood and lymphatic vessels.' }
        ],
        shape: 'Flat, scale-like cells; cell width much greater than height',
        location: [
          'Parietal layer of Bowman’s capsule in kidney',
          'Lung alveoli (Type I pneumocytes)',
          'Endothelium lining blood and lymphatic vessels',
          'Mesothelium lining pleural, peritoneal, and pericardial cavities'
        ],
        function: [
          'Rapid diffusion of oxygen and carbon dioxide',
          'Filtration of blood plasma in renal glomeruli'
        ],
        visualId: 'simple_squamous_lung',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Kidney Cortex (Bowman’s Capsule) / Lung Alveoli',
        labels: [
          { id: '1', label: 'Simple Squamous Lining', clue: 'Thin layer with flattened dark nuclei' },
          { id: '2', label: 'Bowman’s Urinary Space', clue: 'Clear space receiving glomerular filtrate' },
          { id: '3', label: 'Glomerular Capillary Tuft', clue: 'Central knot of fenestrated capillaries' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the characteristic shape of cells and nuclei in simple squamous epithelium?',
            options: [
              'Tall columnar cells with basal oval nuclei',
              'Flat scale-like cells with flattened disc-shaped nuclei',
              'Cube-shaped cells with central round nuclei',
              'Multiple layers of umbrella cells'
            ],
            correctIndex: 1,
            explanation: 'Simple squamous epithelium consists of flat scale-like cells with flattened oval nuclei.'
          },
          {
            id: 'q2',
            question: 'Which of the following is a verified site of simple squamous epithelium from the handout?',
            options: [
              'Gallbladder mucosal lining',
              'Parietal layer of Bowman’s capsule in kidney',
              'Tracheal respiratory epithelium',
              'Epidermis of the skin'
            ],
            correctIndex: 1,
            explanation: 'The parietal layer of Bowman’s capsule in the kidney cortex is lined by simple squamous epithelium.'
          }
        ],
        motivation: '🔬 One slide at a time.'
      },
      {
        id: 'lesson_simple_cuboidal',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.2',
        titleEn: 'Simple Cuboidal Epithelium',
        titleAr: 'النسيج الطلائي المكعبي البسيط',
        badge: 'SIMPLE',
        category: 'simple',
        quickExplanation: 'A single layer of cube-shaped cells with equal height and width, featuring central round spherical nuclei; adapted for secretion and absorption.',
        quickExplanationAr: 'طبقة واحدة من خلايا مكعبة متساوية الطول والعرض، ذات أنوية مركزية دائرية، مخصصة للإفراز والامتصاص.',
        keyPoints: [
          'Single layer of box-like cells appearing square in vertical section.',
          'Nucleus: Perfectly round, spherical, located in the center of each cell.',
          'Locations: Thyroid gland follicles, kidney collecting tubules, surface of ovary (germinal epithelium).',
          'Function: Secretion (e.g., thyroid hormones) and absorption.'
        ],
        importantTerms: [
          { term: 'Simple Cuboidal', termAr: 'مكعبي بسيط', definition: 'Single layer of cells with equal height and width and central spherical nuclei.' },
          { term: 'Thyroid Follicles', termAr: 'حويصلات الغدة الدرقية', definition: 'Spherical sacs lined by simple cuboidal epithelium filled with pink colloid.' }
        ],
        shape: 'Cube-shaped (equal height and width)',
        location: [
          'Thyroid gland follicles',
          'Kidney tubules (distal and collecting tubules)',
          'Germinal epithelium covering the ovary'
        ],
        function: [
          'Secretion of hormones (thyroid colloid)',
          'Absorption and conduit of tubular fluid'
        ],
        visualId: 'simple_cuboidal_kidney',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Thyroid Gland Follicles / Renal Tubules',
        labels: [
          { id: '1', label: 'Simple Cuboidal Epithelium', clue: 'Cube cells with central round nuclei' },
          { id: '2', label: 'Colloid in Follicle Lumen', clue: 'Pink homogenous thyroglobulin' },
          { id: '3', label: 'Basement Membrane', clue: 'Thin line supporting epithelial base' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the characteristic position and shape of the nucleus in simple cuboidal epithelium?',
            options: [
              'Flat disc at the base',
              'Centrally located, perfectly round/spherical nucleus',
              'Elongated oval in the basal third',
              'Multiple nuclei near the surface'
            ],
            correctIndex: 1,
            explanation: 'Simple cuboidal cells feature centrally placed, spherical, round nuclei.'
          },
          {
            id: 'q2',
            question: 'Which organ slide clearly demonstrates simple cuboidal epithelium according to the handout?',
            options: ['Thyroid gland follicles', 'Esophagus lining', 'Urinary bladder', 'Tendon'],
            correctIndex: 0,
            explanation: 'Thyroid follicles are lined by a single layer of simple cuboidal cells surrounding pink colloid.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      },
      {
        id: 'lesson_simple_columnar',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.3',
        titleEn: 'Simple Columnar Epithelium',
        titleAr: 'النسيج الطلائي العمودي البسيط',
        badge: 'SIMPLE',
        category: 'simple',
        quickExplanation: 'A single layer of tall rectangular cells with vertically oriented oval nuclei located near the base; adapted for absorption and secretion.',
        quickExplanationAr: 'طبقة واحدة من خلايا أسطوانية مستطيلة ذات أنوية بيضاوية تقع في الثلث القاعدي، مخصصة للامتصاص والإفراز.',
        keyPoints: [
          'Single layer of tall cells whose height noticeably exceeds width.',
          'Nucleus: Oval, vertically oriented, situated in the basal third of each cell.',
          'Non-ciliated with brush border microvilli in the gallbladder and small intestine.',
          'Often interspersed with mucus-secreting Goblet Cells in the gastrointestinal tract.',
          'Function: Absorption of nutrients and secretion of mucus and digestive enzymes.'
        ],
        importantTerms: [
          { term: 'Simple Columnar', termAr: 'عمودي بسيط', definition: 'Single layer of tall cells with basal oval nuclei.' },
          { term: 'Goblet Cell', termAr: 'خلية كأسية', definition: 'Mucus-secreting unicellular gland appearing clear/pale in H&E.' },
          { term: 'Brush Border (Microvilli)', termAr: 'حافة فرشاتية', definition: 'Dense apical microvilli that amplify absorptive surface area.' }
        ],
        shape: 'Tall rectangular/cylindrical (height > width)',
        location: [
          'Lining of the Gallbladder (non-ciliated)',
          'Gastrointestinal tract: Stomach, Small intestine, Large intestine',
          'Lining of uterus and oviduct (ciliated variety)'
        ],
        function: [
          'Absorption of water and digested nutrients',
          'Secretion of protective lubricating mucus'
        ],
        visualId: 'simple_columnar_intestine',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Gallbladder / Small Intestine (Jejunum/Ileum)',
        labels: [
          { id: '1', label: 'Simple Columnar Cells', clue: 'Tall cells with basal oval nuclei' },
          { id: '2', label: 'Goblet Cells', clue: 'Pale mucus-secreting cups' },
          { id: '3', label: 'Apical Brush Border (Microvilli)', clue: 'Dense pink apical line' },
          { id: '4', label: 'Basement Membrane', clue: 'Underlying supporting boundary' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Where is the nucleus typically located in simple columnar epithelial cells?',
            options: [
              'At the apical surface',
              'In the basal third, with vertically oriented oval shape',
              'Centrally placed and perfectly spherical',
              'Squeezed flat against the lateral membrane'
            ],
            correctIndex: 1,
            explanation: 'Simple columnar cells feature oval, vertically oriented nuclei located in the basal third.'
          },
          {
            id: 'q2',
            question: 'What is the function of Goblet cells interspersed in simple columnar epithelium?',
            options: [
              'Contraction for peristalsis',
              'Secretion of lubricating and protective mucus',
              'Gas diffusion',
              'Elastic recoil'
            ],
            correctIndex: 1,
            explanation: 'Goblet cells are specialized single-cell glands that synthesize and secrete protective mucus.'
          }
        ],
        motivation: '🧠 Your microscopic eye is getting stronger.'
      },
      {
        id: 'lesson_pseudostratified',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.4',
        titleEn: 'Pseudostratified Columnar Epithelium',
        titleAr: 'النسيج الطلائي العمودي المطبق الكاذب',
        badge: 'PSEUDOSTRATIFIED',
        category: 'simple',
        quickExplanation: 'All cells touch the basement membrane but not all reach the surface; nuclei lie at different levels, giving a false appearance of stratification.',
        quickExplanationAr: 'جميع الخلايا ترتكز على الغشاء القاعدي ولكن لا تصل جميعها للسطح؛ تقع الأنوية في مستويات مختلفة لتعطي مظهراً كاذباً بالتعدد.',
        keyPoints: [
          'FALSE STRATIFICATION: It is a SIMPLE epithelium because EVERY cell rests directly upon the basement membrane.',
          'Cells have varying heights: short basal stem cells and tall columnar ciliated cells.',
          'Nuclei are staggered at multiple vertical levels.',
          'Ciliated variety with goblet cells is the classic "Respiratory Epithelium" lining the Trachea and bronchi.',
          'Function: Cilia sweep mucus and trapped dust particles upward toward the pharynx (mucociliary escalator).'
        ],
        importantTerms: [
          { term: 'Pseudostratified', termAr: 'مطبق كاذب', definition: 'Single layer of cells of varying heights with nuclei at different levels mimicking multiple layers.' },
          { term: 'Cilia', termAr: 'أهداب متحركة', definition: 'Motile hair-like apical projections that beat rhythmically to propel mucus.' },
          { term: 'Respiratory Epithelium', termAr: 'النسيج الطلائي التنفسي', definition: 'Pseudostratified ciliated columnar epithelium with goblet cells lining the trachea.' }
        ],
        shape: 'Irregular cells of differing heights; tall ciliated cells + short basal cells',
        location: [
          'Trachea and major bronchi (ciliated with goblet cells)',
          'Nasal cavity and nasopharynx',
          'Epididymis and vas deferens (with non-motile stereocilia)'
        ],
        function: [
          'Mucociliary clearance of inhaled airborne particles and pathogens',
          'Secretion of mucus by goblet cells'
        ],
        visualId: 'pseudostratified_trachea',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Trachea Cross Section',
        labels: [
          { id: '1', label: 'Cilia (Apical Surface)', clue: 'Hair-like brush sweeping mucus' },
          { id: '2', label: 'Staggered Nuclei at Different Levels', clue: 'False stratified appearance' },
          { id: '3', label: 'Goblet Cell', clue: 'Mucus-producing pale gland' },
          { id: '4', label: 'Thick Basement Membrane', clue: 'All cells contact this base' },
          { id: '5', label: 'Hyaline Cartilage Ring (C-shaped)', clue: 'Underlying trachea wall cartilage' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Why is pseudostratified epithelium classified as a simple epithelium?',
            options: [
              'Because it has only flat cells',
              'Because every single cell rests directly upon the basement membrane',
              'Because it has no nuclei',
              'Because it lines blood vessels'
            ],
            correctIndex: 1,
            explanation: 'It is a simple epithelium because ALL cells contact the basement membrane, despite nuclei being at different levels.'
          },
          {
            id: 'q2',
            question: 'Where is pseudostratified ciliated columnar epithelium with goblet cells classically found?',
            options: ['Urinary bladder', 'Trachea and bronchi (Respiratory tract)', 'Skin epidermis', 'Kidney Bowman’s capsule'],
            correctIndex: 1,
            explanation: 'The trachea is the classic site for pseudostratified ciliated columnar epithelium with goblet cells.'
          }
        ],
        motivation: '✓ Excellent identification!'
      },

      // --- STRATIFIED EPITHELIUM ---
      {
        id: 'lesson_stratified_squamous_keratinized',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.5',
        titleEn: 'Stratified Squamous Keratinized Epithelium',
        titleAr: 'النسيج الطلائي الحرشفي المطبق المتقرن',
        badge: 'STRATIFIED',
        category: 'stratified',
        quickExplanation: 'Multiple cell layers topped by a thick protective layer of dead, enucleated, waterproof keratin flakes (Epidermis of Skin).',
        quickExplanationAr: 'طبقات متعددة تعلوها طبقة سميكة من الكيراتين الميت المقاوم للماء والاحتكاك (بشرة الجلد).',
        keyPoints: [
          'Multiple layers of cells: Basal layer is columnar/cuboidal, intermediate polyhedral spinous cells, surface cells are flat squamous.',
          'The superficial layer is composed of dead enucleated scales packed with the water-resistant protein Keratin.',
          'Location: Epidermis of thick and thin skin.',
          'Function: Heavy physical protection against mechanical abrasion, water loss (dehydration), and bacterial invasion.'
        ],
        importantTerms: [
          { term: 'Stratified Squamous', termAr: 'حرشفي مطبق', definition: 'Multiple layers with flat squamous cells at the outermost free surface.' },
          { term: 'Keratin Layer (Stratum Corneum)', termAr: 'طبقة الكيراتين', definition: 'Superficial layer of dead, non-nucleated cells packed with keratin protein.' }
        ],
        shape: 'Multi-layered; basal columnar/cuboidal → middle polyhedral → superficial flat squamous dead scales',
        location: [
          'Epidermis of the skin (both thick skin of palms/soles and thin skin of body)'
        ],
        function: [
          'Protection against physical friction and mechanical wear',
          'Impermeable barrier preventing water evaporation and chemical/microbial entry'
        ],
        visualId: 'stratified_squamous_keratinized',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Thick Skin (Palm / Sole)',
        labels: [
          { id: '1', label: 'Keratin Layer (Stratum Corneum)', clue: 'Thick wavy acidophilic dead flakes' },
          { id: '2', label: 'Stratified Squamous Layers', clue: 'Living polyhedral cells with nuclei' },
          { id: '3', label: 'Basal Layer (Stratum Basale)', clue: 'Columnar mitotic stem cells' },
          { id: '4', label: 'Dermal Papillae (Connective Tissue)', clue: 'Underlying vascular dermis' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What distinguishes keratinized stratified squamous epithelium from the non-keratinized variety?',
            options: [
              'Keratinized has only one layer',
              'Keratinized has a superficial layer of dead enucleated cells packed with keratin',
              'Keratinized lines the esophagus',
              'Keratinized has cilia'
            ],
            correctIndex: 1,
            explanation: 'The keratinized type is covered by dead, non-nucleated keratin flakes (stratum corneum) to protect the skin.'
          }
        ],
        motivation: '🔬 One slide at a time.'
      },
      {
        id: 'lesson_stratified_squamous_nonkeratinized',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.6',
        titleEn: 'Stratified Squamous Non-keratinized Epithelium',
        titleAr: 'النسيج الطلائي الحرشفي المطبق غير المتقرن',
        badge: 'STRATIFIED',
        category: 'stratified',
        quickExplanation: 'Multiple cell layers where surface flat cells retain living, visible nuclei; lines wet, lubricated cavities (Esophagus, Oral cavity).',
        quickExplanationAr: 'طبقات متعددة تحتفظ فيها الخلايا السطحية المسطحة بأنويتها الحية؛ تبطن التجاويف الرطبة كالمريء وتجويف الفم.',
        keyPoints: [
          'Multi-layered epithelium protecting moist internal surfaces exposed to friction.',
          'SURFACE CELLS RETAIN NUCLEI: Unlike the skin, the surface squamous cells are living and possess visible flat nuclei (NO keratin layer).',
          'Locations: Esophagus, Oral cavity, Tongue, Pharynx, Vagina.',
          'Function: Protection against mechanical abrasion while remaining moist and flexible.'
        ],
        importantTerms: [
          { term: 'Non-keratinized', termAr: 'غير متقرن', definition: 'Surface squamous cells maintain their nuclei without forming a dead keratin layer.' },
          { term: 'Esophagus Mucosa', termAr: 'مخاطية المريء', definition: 'Classic histological site for stratified squamous non-keratinized epithelium.' }
        ],
        shape: 'Multi-layered; flat living squamous cells at the free surface',
        location: [
          'Esophagus',
          'Oral cavity and tongue',
          'Pharynx and vocal cords',
          'Vagina and anal canal'
        ],
        function: [
          'Protection against friction from food boluses while remaining moist'
        ],
        visualId: 'stratified_squamous_nonkeratinized',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Esophagus Cross Section',
        labels: [
          { id: '1', label: 'Surface Flat Cells with Nuclei', clue: 'Living squamous cells (NO dead keratin)' },
          { id: '2', label: 'Polyhedral Intermediate Layers', clue: 'Interconnected prickle-like cells' },
          { id: '3', label: 'Basal Layer on Basement Membrane', clue: 'Mitotic stem layer' },
          { id: '4', label: 'Lamina Propria (Connective Tissue)', clue: 'Supporting vascular loose CT' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the verified location of stratified squamous non-keratinized epithelium in the digestive system?',
            options: ['Stomach', 'Esophagus', 'Gallbladder', 'Duodenum'],
            correctIndex: 1,
            explanation: 'The esophagus is lined by stratified squamous non-keratinized epithelium to withstand bolus friction.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      },
      {
        id: 'lesson_stratified_cuboidal',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.7',
        titleEn: 'Stratified Cuboidal Epithelium',
        titleAr: 'النسيج الطلائي المكعبي المطبق',
        badge: 'STRATIFIED',
        category: 'stratified',
        quickExplanation: 'Composed of two or more layers of cube-shaped cells; lines the excretory ducts of sweat glands.',
        quickExplanationAr: 'يتألف من طبقتين أو أكثر من خلايا مكعبة الشكل؛ يبطن قنوات الغدد العرقية.',
        keyPoints: [
          'Rare type of epithelium in the human body.',
          'Consists typically of two distinct layers of cuboidal cells.',
          'Location: Excretory ducts of sweat glands and larger ducts of exocrine glands.',
          'Function: Reinforces duct walls and secretes/absorbs luminal electrolytes.'
        ],
        importantTerms: [
          { term: 'Stratified Cuboidal', termAr: 'مكعبي مطبق', definition: 'Two or more layers of cuboidal cells lining excretory ducts.' },
          { term: 'Sweat Gland Duct', termAr: 'قناة الغدة العرقية', definition: 'Classic histology specimen exhibiting a two-layered cuboidal lining.' }
        ],
        shape: 'Two layers of cube-shaped cells',
        location: [
          'Excretory ducts of sweat glands'
        ],
        function: [
          'Strengthens duct lining during sweat secretion'
        ],
        visualId: 'stratified_cuboidal_sweat',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Skin Dermis (Sweat Gland Ducts)',
        labels: [
          { id: '1', label: 'Double Layer of Cuboidal Cells', clue: 'Two rings of round nuclei around lumen' },
          { id: '2', label: 'Duct Lumen', clue: 'Central sweat passage' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Where is stratified cuboidal epithelium typically found according to the handout?',
            options: ['Lining of the trachea', 'Ducts of sweat glands', 'Lung alveoli', 'Thyroid follicles'],
            correctIndex: 1,
            explanation: 'Stratified cuboidal epithelium lines the excretory ducts of sweat glands (typically 2 layers).'
          }
        ],
        motivation: '🧠 Your microscopic eye is getting stronger.'
      },
      {
        id: 'lesson_transitional_epithelium',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.8',
        titleEn: 'Transitional Epithelium (Urothelium)',
        titleAr: 'النسيج الطلائي الانتقالي (المسار البولي)',
        badge: 'UROTHELIUM',
        category: 'stratified',
        quickExplanation: 'Specialized stratified epithelium of the urinary tract characterized by large dome-shaped umbrella surface cells that flatten during distension.',
        quickExplanationAr: 'نسيج طلائي طبقي مخصص للجهاز البولي، يتميز بخلايا مظلية قبية سطحية كبيرة تتفلطح عند امتلاء المثانة بالبول.',
        keyPoints: [
          'Exclusively lines the excretory urinary passages: Urinary bladder, Ureter, Renal pelvis, and Calyces.',
          'RELAXED / EMPTY BLADDER: Thick (4–6 layers), with large dome-shaped (umbrella) surface cells often containing two nuclei (binucleated).',
          'DISTENDED / FULL BLADDER: Stretches into 2–3 layers of flattened cells as the organ fills with urine.',
          'Function: Accommodates large changes in urine volume and provides a toxic barrier against hypertonic urine.'
        ],
        importantTerms: [
          { term: 'Transitional Epithelium (Urothelium)', termAr: 'النسيج الانتقالي', definition: 'Stratified epithelium capable of stretching to accommodate volume changes in the urinary tract.' },
          { term: 'Umbrella Cells (Dome Cells)', termAr: 'الخلايا المظلية', definition: 'Large, superficial dome-shaped cells, sometimes binucleated, covering the luminal surface.' }
        ],
        shape: 'Dome-shaped / umbrella cells at the surface in relaxed state; flattens during stretching',
        location: [
          'Urinary bladder',
          'Ureters',
          'Renal pelvis and major/minor calyces',
          'Prostatic urethra'
        ],
        function: [
          'Distensibility to accommodate fluctuating urine volumes',
          'Impermeable osmotic barrier protecting underlying tissues from hypertonic, acidic urine'
        ],
        visualId: 'transitional_bladder',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Urinary Bladder (Relaxed state)',
        labels: [
          { id: '1', label: 'Umbrella / Dome Surface Cells', clue: 'Large rounded caps, often binucleate' },
          { id: '2', label: 'Intermediate Pear-Shaped Cells', clue: 'Polygonal cells with vertical axis' },
          { id: '3', label: 'Basal Layer', clue: 'Small cuboidal stem cells on basement membrane' },
          { id: '4', label: 'Lamina Propria', clue: 'Underlying loose connective tissue' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the characteristic feature of the superficial cells in relaxed transitional epithelium?',
            options: [
              'Thin dead keratin flakes',
              'Large dome-shaped umbrella cells (sometimes binucleated)',
              'Brush border of microvilli',
              'Long beating cilia'
            ],
            correctIndex: 1,
            explanation: 'In the relaxed state, superficial cells are large, dome-shaped (umbrella cells) and often binucleated.'
          },
          {
            id: 'q2',
            question: 'Which of the following organs is lined by transitional epithelium?',
            options: ['Gallbladder', 'Urinary bladder', 'Trachea', 'Esophagus'],
            correctIndex: 1,
            explanation: 'Transitional epithelium (urothelium) exclusively lines urinary passages such as the urinary bladder.'
          }
        ],
        motivation: '✓ Excellent identification!'
      },
      {
        id: 'lesson_neuroepithelium',
        sectionId: 'sec_epithelial_tissue',
        numberString: 'LESSON 7.9',
        titleEn: 'Neuro-epithelium',
        titleAr: 'النسيج الطلائي العصبي الحسي (Neuroepithelium)',
        badge: 'SPECIALIZED',
        category: 'specialized',
        quickExplanation: 'Specialized epithelial cells that act as sensory receptors with apical hair processes and basal synaptic nerve endings.',
        quickExplanationAr: 'خلايا طلائية متخصصة تعمل كمستقبلات حسية، تمتلك شعيرات في القمة ومشابك عصبية في القاعدة.',
        keyPoints: [
          'Composed of modified epithelial receptor cells interspersed with supporting sustentacular cells.',
          'Locations: Taste buds of the tongue (papillae) and Organ of Corti in the inner ear cochlea.',
          'Possess apical sensory hair processes (stereocilia/microvilli) and basal synapses with sensory nerve terminals.',
          'Function: Perception of taste (gustation) and sound vibrations (audition).'
        ],
        importantTerms: [
          { term: 'Neuro-epithelium', termAr: 'النسيج الطلائي العصبي', definition: 'Specialized epithelial cells adapted for sensory reception.' },
          { term: 'Taste Bud', termAr: 'برعم التذوق', definition: 'Barrel-shaped intraepithelial sensory organ in tongue papillae.' },
          { term: 'Organ of Corti', termAr: 'عضو كورتي', definition: 'Sensory neuroepithelium of the inner ear cochlea responsible for hearing.' }
        ],
        shape: 'Barrel-shaped sensory clusters containing spindle receptor cells and supporting cells',
        location: [
          'Taste buds in circumvallate and foliate papillae of tongue',
          'Organ of Corti in inner ear cochlea',
          'Olfactory epithelium in nasal cavity roof'
        ],
        function: [
          'Transduction of chemical tastants into electrical nerve impulses',
          'Transduction of acoustic sound waves into auditory sensations'
        ],
        visualId: 'neuroepithelium_taste_bud',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Tongue (Circumvallate Papilla Taste Buds)',
        labels: [
          { id: '1', label: 'Taste Bud (Barrel Cluster)', clue: 'Pale barrel-shaped intraepithelial unit' },
          { id: '2', label: 'Taste Pore', clue: 'Apical opening communicating with trench' },
          { id: '3', label: 'Sensory Gustatory Cells', clue: 'Spindle cells with central nuclei' },
          { id: '4', label: 'Stratified Squamous Epithelium of Papilla', clue: 'Surrounding mucosal wall' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Which of the following is an example of neuro-epithelium from the handout?',
            options: ['Duct of sweat gland', 'Taste buds of the tongue', 'Tendon of skeletal muscle', 'Thyroid follicle'],
            correctIndex: 1,
            explanation: 'Taste buds in the tongue are specialized neuro-epithelial structures for taste perception.'
          }
        ],
        motivation: '🔬 Observe → Identify → Answer.'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. CONNECTIVE TISSUE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'sec_connective_tissue',
    number: 8,
    titleEn: 'Connective Tissue',
    titleAr: 'النسيج الضام (Connective Tissue)',
    descriptionEn: 'Loose and dense connective tissues: Areolar, Adipose, Reticular, Mucoid, Dense regular, Dense irregular, and Yellow elastic.',
    iconName: 'Layers',
    badge: 'STROMA',
    lessons: [
      // --- LOOSE CONNECTIVE TISSUE ---
      {
        id: 'lesson_loose_areolar',
        sectionId: 'sec_connective_tissue',
        numberString: 'LESSON 8.1',
        titleEn: 'Loose Areolar Connective Tissue',
        titleAr: 'النسيج الضام الفجوي / الهلالي الرخو (Areolar CT)',
        badge: 'LOOSE CT',
        category: 'loose',
        quickExplanation: 'The most widespread connective tissue, with a loose mesh of collagen and elastic fibers, diverse cells, and abundant semi-fluid ground substance.',
        quickExplanationAr: 'النسيج الضام الأكثر انتشاراً بالجسم؛ يتميز بشبكة رخوة من ألياف الكولاجين والألياف المرنة وخلايا متنوعة كالأرومات الليفية والبلعمية.',
        keyPoints: [
          'Characteristics: High cellularity and abundant ground substance; fibers are loosely and loosely arranged.',
          'Cells: Fibroblasts (most common), Macrophages (histiocytes), Mast cells, Plasma cells, Fat cells.',
          'Fibers: Pink thick collagen fibers (bundles) and dark thin branching elastic fibers.',
          'Locations: Subcutaneous tissue (hypodermis), lamina propria beneath epithelia, surrounding blood vessels and nerves.',
          'Function: Cushions organs, supports epithelia, provides metabolic nutrient exchange and immune defense.'
        ],
        importantTerms: [
          { term: 'Areolar Connective Tissue', termAr: 'النسيج الضام الهلالي', definition: 'Pliable, mesh-like tissue with fluid matrix supporting epithelia.' },
          { term: 'Fibroblast', termAr: 'الخلية المولدة لليف', definition: 'Principal cell of connective tissue that synthesizes extracellular collagen and ground substance.' },
          { term: 'Ground Substance', termAr: 'المادة الأساسية', definition: 'Amorphous viscous gel rich in glycosaminoglycans and hyaluronic acid.' }
        ],
        cells: ['Fibroblasts', 'Macrophages (Histiocytes)', 'Mast cells', 'Plasma cells', 'Adipocytes'],
        fibers: ['Thick pink collagen fibers', 'Thin dark branching elastic fibers'],
        matrix: 'Abundant viscous semi-fluid ground substance rich in hyaluronic acid',
        location: [
          'Subcutaneous tissue (hypodermis beneath the skin)',
          'Lamina propria beneath moist epithelial linings',
          'Mesentery of intestines',
          'Surrounding blood vessels, lymphatics, and nerves'
        ],
        function: [
          'Binds tissues together while allowing flexibility and mobility',
          'Nutritional conduit and site of inflammatory/immune responses'
        ],
        visualId: 'areolar_loose_ct',
        stain: 'H&E / Verhoeff Elastic Stain',
        magnification: '400x High Power',
        specimen: 'Subcutaneous Tissue / Mesentery Spread',
        labels: [
          { id: '1', label: 'Collagen Fiber Bundles (Thick Pink)', clue: 'Coarse eosinophilic wavy bands' },
          { id: '2', label: 'Elastic Fibers (Thin Dark Strands)', clue: 'Fine dark branching threads' },
          { id: '3', label: 'Fibroblast Nuclei', clue: 'Spindle-shaped pale nuclei' },
          { id: '4', label: 'Macrophage / Mast Cell', clue: 'Round mononuclear defense cells' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Which cell type is the most predominant and responsible for synthesizing fibers in areolar connective tissue?',
            options: ['Erythrocyte', 'Fibroblast', 'Osteocyte', 'Chondrocyte'],
            correctIndex: 1,
            explanation: 'Fibroblasts are the primary structural cells that synthesize collagen, elastic fibers, and ground substance.'
          },
          {
            id: 'q2',
            question: 'What are the two major fiber types visible in loose areolar connective tissue?',
            options: [
              'Myosin and actin fibers',
              'Thick pink collagen bundles and thin dark branching elastic fibers',
              'Only reticular fibers',
              'Only myelin sheaths'
            ],
            correctIndex: 1,
            explanation: 'Areolar tissue features a loose mesh of thick pink collagen fibers and thin dark elastic fibers.'
          }
        ],
        motivation: '🔬 One slide at a time.'
      },
      {
        id: 'lesson_adipose_tissue',
        sectionId: 'sec_connective_tissue',
        numberString: 'LESSON 8.2',
        titleEn: 'Adipose Tissue (Fat Tissue)',
        titleAr: 'النسيج الدهني (Adipose Tissue)',
        badge: 'LOOSE CT',
        category: 'loose',
        quickExplanation: 'Specialized loose connective tissue packed with fat cells (adipocytes), showing classic empty "Signet-Ring" appearance in H&E slides.',
        quickExplanationAr: 'نسيج ضام تملؤه الخلايا الدهنية؛ يظهر في شرائح H&E بمظهر "الخاتم ذي الفص" (Signet-Ring) لأن الكحول والزايلين يذيبان الدهن.',
        keyPoints: [
          'Predominant cell: Adipocyte (fat cell) containing a single large lipid droplet occupying almost the entire cytoplasm.',
          'H&E PREPARATION ARTIFACT: Organic solvents (alcohol and xylene) dissolve out the intracellular lipid during processing, leaving an empty, clear polygonal space.',
          'SIGNET-RING APPEARANCE: The nucleus is squeezed flat and pushed to the periphery by the lipid vacuole, resembling a ring with a gem.',
          'Special Stain: Sudan III or Sudan IV stains intracellular lipids bright orange/red in frozen un-dehydrated sections.',
          'Function: Energy storage (triglycerides), thermal insulation, and mechanical shock absorption.'
        ],
        importantTerms: [
          { term: 'Adipocyte', termAr: 'خلية دهنية', definition: 'Specialized cell containing a massive lipid droplet that displaces the nucleus to the periphery.' },
          { term: 'Signet-Ring Appearance', termAr: 'مظهر الخاتم ذي الفص', definition: 'Diagnostic histological look of fat cells in H&E: empty ring with a flattened peripheral nucleus.' },
          { term: 'Sudan III', termAr: 'صبغة سودان 3', definition: 'Lipid-soluble stain coloring fat droplets brilliant orange-red.' }
        ],
        cells: ['Unilocular white adipocytes', 'Scattered pericytes and fibroblasts'],
        fibers: ['Fine reticular fibers supporting individual adipocytes and capillary nets'],
        matrix: 'Minimal ground substance squeezed between tightly abutting adipocytes',
        location: [
          'Subcutaneous layer (hypodermis)',
          'Around kidneys (perirenal fat capsule)',
          'Greater omentum and mesenteries',
          'Yellow bone marrow'
        ],
        function: [
          'Primary metabolic reservoir for energy storage (triglycerides)',
          'Thermal insulation against body heat loss',
          'Protective mechanical cushioning for organs (e.g., kidneys, eyeballs)'
        ],
        visualId: 'adipose_tissue',
        stain: 'H&E (Clear polygonal spaces) / Sudan III (Orange)',
        magnification: '400x High Power',
        specimen: 'Subcutaneous Adipose Tissue / Perirenal Fat',
        labels: [
          { id: '1', label: 'Empty Fat Droplet (Lipid dissolved by Xylene)', clue: 'Large clear hexagonal space' },
          { id: '2', label: 'Flattened Peripheral Nucleus (Signet-Ring)', clue: 'Nucleus pressed against cell membrane' },
          { id: '3', label: 'Thin Cytoplasmic Rim', clue: 'Delicate pink border' },
          { id: '4', label: 'Blood Capillary', clue: 'Small vessel squeezed between fat cells' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Why do adipocytes appear as "empty / clear" spaces in routine H&E paraffin sections?',
            options: [
              'Because they contain air',
              'Because xylene and alcohol dissolve and extract the intracellular lipid during slide preparation',
              'Because they have no cytoplasm',
              'Because hematoxylin does not stain fat'
            ],
            correctIndex: 1,
            explanation: 'Routine processing with alcohol and xylene extracts lipid, leaving empty spaces in H&E.'
          },
          {
            id: 'q2',
            question: 'What is the classic diagnostic shape described for the nucleus of a white adipocyte?',
            options: [
              'Centrally placed spherical nucleus',
              'Flattened peripheral nucleus giving a "Signet-Ring" appearance',
              'Spindle-shaped wavy nucleus',
              'Trilobed nucleus'
            ],
            correctIndex: 1,
            explanation: 'The lipid droplet pushes the nucleus to the periphery, creating the classic "signet-ring" appearance.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      },
      {
        id: 'lesson_reticular_tissue',
        sectionId: 'sec_connective_tissue',
        numberString: 'LESSON 8.3',
        titleEn: 'Reticular Connective Tissue',
        titleAr: 'النسيج الضام الشبكي (Reticular CT)',
        badge: 'LOOSE CT',
        category: 'loose',
        quickExplanation: 'A delicate 3D meshwork of fine reticular fibers (Type III collagen) stained jet-black by silver impregnation, forming the architectural framework of lymphoid organs.',
        quickExplanationAr: 'شبكة ثلاثية الأبعاد رقيقة من ألياف الكولاجين من النوع الثالث تُصبغ بالأسود بترسيب الفضة، وتشكل الهيكل الداعم للأعضاء اللمفاوية.',
        keyPoints: [
          'Formed by an anastomosing network of delicate Reticular Fibers (Type III collagen) associated with reticular cells.',
          'ARGENTAFFIN / ARGYROPHILIC: Reticular fibers do NOT show well with routine H&E; they are stained JET-BLACK with Silver Impregnation.',
          'Locations: Stroma of lymphoid and hematopoietic organs: Lymph Nodes, Spleen, and Bone Marrow.',
          'Function: Provides a porous architectural scaffolding that supports free lymphocytes, macrophages, and blood cells.'
        ],
        importantTerms: [
          { term: 'Reticular Fibers', termAr: 'الألياف الشبكية', definition: 'Fine branching fibers of Type III collagen stained black by silver salts.' },
          { term: 'Argyrophilic', termAr: 'محب للفضة', definition: 'Property of fibers binding silver and reducing it to metallic black precipitate.' },
          { term: 'Lymph Node Stroma', termAr: 'سدى العقدة اللمفاوية', definition: 'Supporting framework of reticular tissue filtering lymph.' }
        ],
        cells: ['Reticular cells (star-shaped)', 'Dendritic cells', 'Abundant lymphocytes and macrophages'],
        fibers: ['Fine branching reticular fibers (Type III collagen) stained jet-black'],
        matrix: 'Aqueous lymph fluid filling the porous meshwork',
        location: [
          'Lymph nodes',
          'Spleen (red and white pulp stroma)',
          'Bone marrow'
        ],
        function: [
          'Architectural framework supporting filtering cells in lymphoid organs'
        ],
        visualId: 'reticular_tissue_silver',
        stain: 'Silver Impregnation (Gomori / Bielschowsky)',
        magnification: '400x High Power',
        specimen: 'Lymph Node / Spleen Section',
        labels: [
          { id: '1', label: 'Black Reticular Fiber Network', clue: 'Fine dark branching meshwork' },
          { id: '2', label: 'Reticular Cells', clue: 'Star-shaped cells producing the fibers' },
          { id: '3', label: 'Lymphocytes', clue: 'Small round basophilic cells suspended in mesh' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What special stain is mandatory to visualize reticular connective tissue fibers as jet-black branching threads?',
            options: ['Toluidine Blue', 'Silver Impregnation', 'Sudan III', 'Eosin Y alone'],
            correctIndex: 1,
            explanation: 'Reticular fibers are argyrophilic and stain jet-black exclusively with silver impregnation.'
          },
          {
            id: 'q2',
            question: 'Which of the following organs contains reticular connective tissue stroma according to the handout?',
            options: ['Tendon', 'Lymph node and spleen', 'Aorta wall', 'Skin epidermis'],
            correctIndex: 1,
            explanation: 'Lymph nodes, spleen, and bone marrow utilize reticular connective tissue as their structural framework.'
          }
        ],
        motivation: '🧠 Your microscopic eye is getting stronger.'
      },

      // --- DENSE CONNECTIVE TISSUE ---
      {
        id: 'lesson_dense_regular',
        sectionId: 'sec_connective_tissue',
        numberString: 'LESSON 8.4',
        titleEn: 'Dense Regular Connective Tissue (Tendon)',
        titleAr: 'النسيج الضام الكثيف المنتظم (الوتر - Tendon)',
        badge: 'DENSE CT',
        category: 'dense',
        quickExplanation: 'Densely packed, parallel bundles of pink collagen fibers with flattened fibroblast nuclei squeezed in linear rows; resists extreme tensile pull in ONE direction.',
        quickExplanationAr: 'حزم كثيفة ومتوازية من ألياف الكولاجين الوردية، تصطف بينها أنوية الخلايا الليفية في صفوف مستقيمة؛ يقاوم الشد الهائل في اتجاه واحد.',
        keyPoints: [
          'PARALLEL ORIENTATION: Coarse collagen bundles are packed in strictly parallel arrays with almost no space between them.',
          'TENDON CELLS: Inactive fibroblasts (tenocytes) have flattened, dark, elongated nuclei squeezed in single linear rows between parallel collagen bundles.',
          'Locations: Tendons (connecting muscle to bone), Ligaments (connecting bone to bone), Aponeuroses.',
          'Function: Tremendous mechanical tensile strength resisting pull along a single primary axis.'
        ],
        importantTerms: [
          { term: 'Dense Regular CT', termAr: 'ضام كثيف منتظم', definition: 'Connective tissue dominated by parallel collagen bundles resisting unidirectional stress.' },
          { term: 'Tendon', termAr: 'الوتر', definition: 'Fibrous cord of dense regular connective tissue anchoring muscle to bone.' },
          { term: 'Tenocytes', termAr: 'الخلايا الوترية', definition: 'Flattened fibroblasts arranged in linear rows between collagen bundles.' }
        ],
        cells: ['Tendon cells (flattened fibroblasts in linear rows)'],
        fibers: ['Densely packed parallel bundles of Type I collagen'],
        matrix: 'Very scant ground substance due to dense fiber packing',
        location: [
          'Tendons connecting muscles to bones',
          'Ligaments connecting bones to bones',
          'Aponeuroses'
        ],
        function: [
          'Transmits powerful muscular contractions to bones without stretching',
          'Withstands extreme uniaxial tensile stress'
        ],
        visualId: 'dense_regular_tendon',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Tendon Longitudinal Section',
        labels: [
          { id: '1', label: 'Parallel Collagen Bundles', clue: 'Dense pink longitudinal waves' },
          { id: '2', label: 'Tendon Cells (Fibroblasts in Rows)', clue: 'Dark flattened nuclei in straight rows' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'How are the collagen fibers and fibroblast nuclei arranged in dense regular connective tissue (Tendon)?',
            options: [
              'Random criss-cross directions with empty spaces',
              'Densely packed parallel bundles with fibroblast nuclei in straight linear rows',
              'Concentrically around a central Haversian canal',
              'Scattered loosely in abundant fluid'
            ],
            correctIndex: 1,
            explanation: 'In tendons, collagen bundles are parallel and fibroblast nuclei are squeezed into straight linear rows.'
          },
          {
            id: 'q2',
            question: 'What is the primary mechanical property of dense regular connective tissue?',
            options: [
              'Elastic expansion in all directions',
              'Tremendous tensile resistance to stretching in a single direction',
              'Rapid gas diffusion',
              'Energy storage'
            ],
            correctIndex: 1,
            explanation: 'Dense regular tissue resists immense uniaxial tensile pull without stretching.'
          }
        ],
        motivation: '✓ Excellent identification!'
      },
      {
        id: 'lesson_dense_irregular',
        sectionId: 'sec_connective_tissue',
        numberString: 'LESSON 8.5',
        titleEn: 'Dense Irregular Connective Tissue',
        titleAr: 'النسيج الضام الكثيف غير المنتظم (أدمة الجلد - Dermis)',
        badge: 'DENSE CT',
        category: 'dense',
        quickExplanation: 'Coarse collagen fiber bundles woven in random, criss-cross directions with few cells; resists mechanical pulling forces from MULTIPLE directions.',
        quickExplanationAr: 'حزم كولاجينية سميكة متشابكة في اتجاهات عشوائية متعددة، تقاوم قوى الشد والتمزق القادمة من اتجاهات مختلفة (أدمة الجلد).',
        keyPoints: [
          'IRREGULAR WEAVE: Heavy bundles of collagen fibers are arranged randomly in all spatial planes (criss-cross feltwork).',
          'Few cells (mostly scattered inactive fibroblasts) and very little ground substance.',
          'Locations: Reticular dermis of the skin, capsules of organs (kidney, liver, lymph node capsules), submucosa of the GI tract.',
          'Function: Provides structural toughness and withstands tearing stresses applied from multiple diverse directions.'
        ],
        importantTerms: [
          { term: 'Dense Irregular CT', termAr: 'ضام كثيف غير منتظم', definition: 'Collagen bundles interwoven randomly to resist multi-directional mechanical stresses.' },
          { term: 'Dermis of Skin', termAr: 'أدمة الجلد', definition: 'Deep cutaneous layer rich in dense irregular connective tissue.' }
        ],
        cells: ['Few scattered fibroblasts', 'Occasional wandering macrophages'],
        fibers: ['Coarse bundles of Type I collagen arranged in random intersecting directions'],
        matrix: 'Scant ground substance',
        location: [
          'Reticular layer of dermis of the skin',
          'Fibrous capsules of organs (kidney, spleen, lymph nodes)',
          'Submucosa of digestive tract organs'
        ],
        function: [
          'Resists mechanical stretching and tearing from all directions'
        ],
        visualId: 'dense_irregular_dermis',
        stain: 'H&E (Hematoxylin and Eosin)',
        magnification: '400x High Power',
        specimen: 'Skin Reticular Dermis',
        labels: [
          { id: '1', label: 'Interwoven Collagen Bundles (Random)', clue: 'Coarse pink bundles running in all directions' },
          { id: '2', label: 'Scattered Fibroblast Nucleus', clue: 'Rare dark nucleus in fibrous matrix' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'What is the verified location of dense irregular connective tissue according to the handout?',
            options: ['Tendon', 'Reticular dermis of the skin', 'Wharton’s jelly of umbilical cord', 'Lung alveoli'],
            correctIndex: 1,
            explanation: 'The reticular dermis of the skin is the classic location for dense irregular connective tissue.'
          }
        ],
        motivation: '🔬 Observe → Identify → Answer.'
      },
      {
        id: 'lesson_yellow_elastic',
        sectionId: 'sec_connective_tissue',
        numberString: 'LESSON 8.6',
        titleEn: 'Yellow Elastic Connective Tissue',
        titleAr: 'النسيج الضام المرن (الأبهر - Aorta)',
        badge: 'ELASTIC CT',
        category: 'dense',
        quickExplanation: 'Characterized by a predominance of thick, wavy, branching elastic fibers forming fenestrated laminae; stained dark brown/purple with Orcein.',
        quickExplanationAr: 'يتميز بسيادة ألياف مرنة سميكة ومموجة تشكل صفائح مثقبة؛ تُصبغ بلون بني/بنفسجي داكن بصبغة الأورسين (جدار الشريان الأبهر).',
        keyPoints: [
          'DOMINANCE OF ELASTIC FIBERS: Dense concentration of thick, branching, wavy elastic fibers and fenestrated elastic membranes.',
          'SPECIAL STAIN: Demonstrated dramatically by Orcein stain (staining elastic fibers dark brown to purple) or Verhoeff stain.',
          'Locations: Tunica media of large elastic arteries (e.g., Aorta), Ligamentum nuchae, Ligamenta flava of vertebral column.',
          'Function: Enables passive elastic recoil following systolic arterial pressure, maintaining smooth continuous diastolic blood flow (Windkessel effect).'
        ],
        importantTerms: [
          { term: 'Yellow Elastic Tissue', termAr: 'النسيج المرن الأصفر', definition: 'Connective tissue dominated by elastic fibers providing passive stretch and recoil.' },
          { term: 'Orcein Stain', termAr: 'صبغة الأورسين', definition: 'Special histological dye staining elastic fibers dark reddish-brown to purple.' },
          { term: 'Tunica Media of Aorta', termAr: 'الطبقة المتوسطة للأبهر', definition: 'Thick arterial wall layer composed of concentric wavy elastic laminae.' }
        ],
        cells: ['Interspersed vascular smooth muscle cells', 'Few fibroblasts'],
        fibers: ['Predominant wavy branching elastic fibers and concentric fenestrated elastic laminae'],
        matrix: 'Basophilic ground substance rich in chondroitin sulfate',
        location: [
          'Tunica media of the Aorta and large elastic arteries',
          'Ligamentum nuchae of the neck',
          'Ligamenta flava connecting vertebral arches'
        ],
        function: [
          'Expands under systolic blood pressure and recoils during diastole to propel blood'
        ],
        visualId: 'yellow_elastic_aorta',
        stain: 'Orcein Stain (Dark Brown/Purple Wavy Fibers)',
        magnification: '400x High Power',
        specimen: 'Aorta Wall (Tunica Media)',
        labels: [
          { id: '1', label: 'Wavy Elastic Laminae (Orcein Stained)', clue: 'Dark brown/purple undulating ribbons' },
          { id: '2', label: 'Smooth Muscle Nuclei', clue: 'Elongated nuclei between elastic waves' }
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'Which special stain is selectively used to demonstrate the wavy elastic laminae in the wall of the Aorta?',
            options: ['Sudan III', 'Orcein stain', 'Toluidine blue', 'Methylene blue'],
            correctIndex: 1,
            explanation: 'Orcein selectively stains elastic fibers dark brown/purple in the wall of the aorta.'
          },
          {
            id: 'q2',
            question: 'What is the primary function of the elastic connective tissue in the Tunica Media of the Aorta?',
            options: [
              'Secretion of mucus',
              'Elastic expansion during systole and recoil during diastole to sustain blood circulation',
              'Filtration of urine',
              'Synthesis of keratin'
            ],
            correctIndex: 1,
            explanation: 'Elastic laminae recoil passively during diastole to smooth out pulsatile blood pressure.'
          }
        ],
        motivation: '🎯 Train your eyes, not only your memory.'
      }
    ]
  }
];

// Helper to find a lesson by ID
export function getHistologyLessonById(lessonId: string): HistologyLessonItem | undefined {
  for (const section of HISTOLOGY_SECTIONS) {
    const found = section.lessons.find(l => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

// Flat list of all lessons
export const ALL_HISTOLOGY_LESSONS: HistologyLessonItem[] = HISTOLOGY_SECTIONS.flatMap(s => s.lessons);
