/**
 * HISTOLOGY LESSONS CURRICULUM DATA
 * Designed strictly for 1st-Year Medical Students (Sana'a University Faculty of Medicine).
 * Follows the "One Image = One Explanatory Slide" pedagogical architecture.
 *
 * Primary Faculty Handout: Dr. Ruqia Y. Sharaf Addin
 */

export interface SlidePointer {
  id: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  description?: string;
}

export interface ExplanatorySlideData {
  structureName: string;
  structureNameAr?: string;
  image: string;
  imageAlt: string;
  stain: string;
  stainBadgeColor?: string; // e.g. 'amber', 'rose', 'blue', 'cyan', 'purple'
  definition: string;
  location: string[];
  function: string[];
  appearance: string;
  identificationClues: string[];
  examClue: string;
  arabicNote?: string;
  pointers?: SlidePointer[];
  visualId?: string;
  magnification?: string;
  practicalQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizSlideData {
  prompt: string;
  image: string;
  imageAlt: string;
  question: string;
  options: string[];
  correctIndex: number;
  answerTitle: string;
  stainUsed: string;
  identificationClue: string;
  diagnosticReason: string;
  examPearl: string;
}

export interface ReviewTableRow {
  structure: string;
  stain: string;
  appearance: string;
  clue: string;
  pearl: string;
}

export interface ReviewTableSlideData {
  title: string;
  subtitle: string;
  rows: ReviewTableRow[];
  takeaways: string[];
}

export interface LessonSlide {
  id: string;
  slideNumber: number;
  title: string;
  titleAr?: string;
  type: 'intro' | 'explanatory' | 'interactive' | 'quiz' | 'review';
  explanatory?: ExplanatorySlideData;
  quiz?: QuizSlideData;
  review?: ReviewTableSlideData;
  interactiveType?: 'microscope_diagram' | 'slide_workflow' | 'mitosis_player';
}

export interface HistologyLesson {
  id: string;
  lessonNumber: number;
  numberString: string; // e.g. "LESSON 01"
  titleEn: string;
  titleAr: string;
  badge: string;
  coverImage: string;
  summaryEn: string;
  summaryAr: string;
  durationMinutes: number;
  keyConcepts: string[];
  slides: LessonSlide[];
}

export const HISTOLOGY_LESSONS: HistologyLesson[] = [
  // ==========================================
  // LESSON 01: INTRODUCTION TO HISTOLOGY
  // ==========================================
  {
    id: 'lesson_01',
    lessonNumber: 1,
    numberString: 'LESSON 01',
    titleEn: 'Introduction to Histology',
    titleAr: 'مقدمة في علم الأنسجة والخلايا',
    badge: 'FOUNDATION',
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Foundational concepts of microscopic anatomy, 4 basic tissue classes, and clinical relevance to pathology.',
    summaryAr: 'المفاهيم الأساسية للتشريح المجهري، الأنسجة الأربعة الرئيسية، والصلة السريرية بعلم الأمراض.',
    durationMinutes: 12,
    keyConcepts: ['Microscopic Anatomy', '4 Basic Tissues', 'Histopathology Baseline', 'Biopsy Evaluation'],
    slides: [
      {
        id: 'l1_s1',
        slideNumber: 1,
        title: 'Definition of Histology',
        titleAr: 'تعريف علم الأنسجة',
        type: 'explanatory',
        explanatory: {
          structureName: 'What is Histology?',
          structureNameAr: 'ما هو علم الأنسجة؟',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Microscopic view of stained human tissue architecture',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'blue',
          definition: 'Histology (Greek: histos = tissue/web, logos = study) is the branch of medical science studying the microscopic structure of normal cells, tissues, and organs.',
          location: [
            'Cellular level (organelles, membranes, nuclei)',
            'Tissue level (epithelial, connective, muscular, nervous)',
            'Organ level (architecture of liver, kidney, lungs, stomach)'
          ],
          function: [
            'Establishes the anatomical baseline of health',
            'Connects gross macroscopic anatomy with cellular physiology',
            'Enables understanding of microscopic organ function'
          ],
          appearance: 'Cells and extracellular matrix stained in contrasting colors (nuclei purple-blue, cytoplasm and fibers pink/red) forming organized architectural layers.',
          identificationClues: [
            'Look for cellular organization into distinct architectural boundaries.',
            'Identify nuclei (basophilic dots) and supporting stroma.'
          ],
          examClue: 'Histology studies NORMAL human tissue architecture; Pathology studies abnormal diseased tissue.',
          arabicNote: 'علم الأنسجة يدرس التركيب المجهري الطبيعي السليم للأنسجة كمرجع أساسي للتمييز ضد الأمراض.',
          pointers: [
            { id: 'p1', label: 'Cellular Nuclei (Blue)', x: 45, y: 35, description: 'Hematoxylin stains nucleic acids' },
            { id: 'p2', label: 'Cytoplasm / Matrix (Pink)', x: 60, y: 65, description: 'Eosin stains basic proteins' }
          ]
        }
      },
      {
        id: 'l1_s2',
        slideNumber: 2,
        title: 'The 4 Fundamental Tissues',
        titleAr: 'الأنسجة الأربعة الأساسية بالجسم',
        type: 'explanatory',
        explanatory: {
          structureName: 'The 4 Basic Tissues of the Human Body',
          structureNameAr: 'الأنسجة الأساسية الأربعة',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Histological montage of epithelial, connective, muscle and nervous tissues',
          stain: 'Routine Diagnostic Stains',
          stainBadgeColor: 'cyan',
          definition: 'All organs in the human body are formed by combinations of only four primary tissues: Epithelial, Connective, Muscular, and Nervous tissue.',
          location: [
            '1. Epithelial Tissue: Covers external body surfaces, lines internal cavities, and forms glands.',
            '2. Connective Tissue: Supports, protects, cushions, and binds other tissues together.',
            '3. Muscular Tissue: Contractile cells producing movement (skeletal, cardiac, smooth).',
            '4. Nervous Tissue: Neurons and glial cells transmitting electrical impulses.'
          ],
          function: [
            'Epithelium: Protection, absorption, secretion, sensory reception.',
            'Connective: Mechanical support, metabolic exchange, immune defense, fat storage.',
            'Muscle: Voluntary locomotion and involuntary peristalsis / cardiac pumping.',
            'Nerve: Rapid communication, sensory integration, motor control.'
          ],
          appearance: 'Epithelium has tightly packed cells with minimal matrix; Connective tissue has abundant extracellular matrix with widely spaced cells.',
          identificationClues: [
            'Epithelium: Cells packed shoulder-to-shoulder on a basement membrane.',
            'Connective: Abundant fibers (collagen/elastic) separating scattered cells.'
          ],
          examClue: 'Epithelium is AVASCULAR (no direct blood vessels); receives nutrients by diffusion from underlying connective tissue.',
          arabicNote: 'جميع أعضاء الجسم تتكون من تضافر الأنسجة الأربعة الأساسية فقط.'
        }
      },
      {
        id: 'l1_s3',
        slideNumber: 3,
        title: 'Practical Spotter: Tissue Identification',
        titleAr: 'اختبار عملي: التعرف على النسيج الأساسي',
        type: 'quiz',
        quiz: {
          prompt: 'Station 01 — Examine this histological specimen under 10x magnification:',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Microscopic slide showing tubular epithelial cells and basement membrane',
          question: 'What fundamental tissue class forms the cellular lining of these circular lumens?',
          options: [
            'A. Muscular Tissue',
            'B. Epithelial Tissue',
            'C. Nervous Tissue',
            'D. Dense Connective Tissue'
          ],
          correctIndex: 1,
          answerTitle: 'Epithelial Tissue (Simple Cuboidal Epithelium)',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Tightly packed, orderly cells lining a lumen with prominent spherical nuclei and minimal intercellular space.',
          diagnosticReason: 'Epithelial cells strictly line free surfaces and hollow tubular lumens (here, renal tubules).',
          examPearl: 'Lining of hollow organs and glands is ALWAYS epithelial tissue.'
        }
      },
      {
        id: 'l1_s4',
        slideNumber: 4,
        title: 'Lesson 01: Quick Review',
        titleAr: 'مراجعة سريعة للدرس الأول',
        type: 'review',
        review: {
          title: 'Lesson 01 Summary: Foundational Histology',
          subtitle: 'High-Yield Medical Exam Pearls for 1st-Year Practical OSPE',
          rows: [
            {
              structure: 'Histology',
              stain: 'H&E Routine',
              appearance: 'Normal micro-architecture',
              clue: 'Baseline reference for clinical pathology',
              pearl: 'Cannot identify diseased tissue without knowing normal anatomy.'
            },
            {
              structure: 'Epithelial Tissue',
              stain: 'H&E / PAS',
              appearance: 'Tightly packed cells, no matrix',
              clue: 'Avascular; rests on basement membrane',
              pearl: 'Lines all body surfaces, cavities, and forms glands.'
            },
            {
              structure: 'Connective Tissue',
              stain: 'H&E / Special stains',
              appearance: 'Abundant extracellular matrix',
              clue: 'Widely separated cells with fibers',
              pearl: 'Provides vascular support to overlying epithelium.'
            }
          ],
          takeaways: [
            'Histology = Study of normal micro-anatomy of cells, tissues, and organs.',
            '4 basic tissues: Epithelium (lining), Connective (support), Muscle (contraction), Nervous (impulse).',
            'Epithelial tissue is avascular and depends on underlying connective tissue diffusion.'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 02: MICROSCOPES & OPTICS
  // ==========================================
  {
    id: 'lesson_02',
    lessonNumber: 2,
    numberString: 'LESSON 02',
    titleEn: 'Microscopes & Optics',
    titleAr: 'المجاهر الضوئية والإلكترونية',
    badge: 'OPTICS',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Light vs electron microscopes, resolution limits, and TEM vs SEM diagnostic comparison.',
    summaryAr: 'المقارنة بين المجاهر الضوئية والإلكترونية، حدود التمييز، والفرق التشخيصي بين TEM و SEM.',
    durationMinutes: 15,
    keyConcepts: ['Resolving Power', 'Light Microscopes', 'TEM (Transmission)', 'SEM (Scanning)'],
    slides: [
      {
        id: 'l2_s1',
        slideNumber: 1,
        title: 'Compound Light Microscope',
        titleAr: 'المجهر الضوئي المركب',
        type: 'explanatory',
        explanatory: {
          structureName: 'Compound Light Microscope (LM)',
          structureNameAr: 'المجهر الضوئي المركب',
          image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Compound light microscope in medical laboratory',
          stain: 'Visible Light Spectrum (λ = 400–700 nm)',
          stainBadgeColor: 'blue',
          definition: 'The standard optical instrument in histology utilizing two lens systems (objective + ocular) to magnify thin, stained tissue sections up to 1000x–1500x.',
          location: [
            'Histology & Pathology teaching laboratories',
            'Clinical diagnostic hematology and cytology',
            'Surgical pathology frozen section evaluations'
          ],
          function: [
            'Magnifies stained tissue structures up to 1000x.',
            'Maximum resolution limit: approximately 0.2 micrometers (0.2 µm).',
            'Enables visualization of cell morphology, nuclei, and tissue layers.'
          ],
          appearance: 'Two-dimensional colored image of stained glass slide illuminated from underneath by a bright light source.',
          identificationClues: [
            'Total Magnification = Objective Lens Power × Eyepiece (Ocular) Power.',
            'Example: 40x objective × 10x ocular = 400x total magnification.'
          ],
          examClue: 'Resolution of LM is 0.2 µm, limited by the wavelength of visible light (~500 nm).',
          arabicNote: 'المجهر الضوئي المركب يعتمد على الضوء المرئي وتكبيره الأقصى 1500 مرة وقوة تمييزه 0.2 ميكرومتر.'
        }
      },
      {
        id: 'l2_s2',
        slideNumber: 2,
        title: 'TEM: Transmission Electron Microscope',
        titleAr: 'المجهر الإلكتروني النافذ (TEM)',
        type: 'explanatory',
        explanatory: {
          structureName: 'Transmission Electron Microscope (TEM)',
          structureNameAr: 'المجهر الإلكتروني النافذ (TEM)',
          image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'High resolution ultrastructural micrograph of cell organelles under TEM',
          stain: 'Heavy Metals (Lead Citrate / Uranyl Acetate)',
          stainBadgeColor: 'purple',
          definition: 'An electron microscope that transmits a high-voltage electron beam THROUGH an ultra-thin tissue section (40–90 nm) to produce 2D images of internal ultrastructure.',
          location: [
            'Advanced research laboratories',
            'Renal biopsy pathology (glomerular basement membrane thickness)',
            'Viral particle identification and ciliary dyskinesia diagnostics'
          ],
          function: [
            'Resolving power down to 0.2 nanometers (0.2 nm) — 1,000x sharper than LM.',
            'Magnifications up to 500,000x or more.',
            'Visualizes cell organelles: mitochondrial cristae, ribosomes, nuclear pores, membrane bilayers.'
          ],
          appearance: 'Black-and-white (greyscale) TWO-DIMENSIONAL (2D) cross-sectional image displaying electron-dense (dark) vs electron-lucent (light) internal details.',
          identificationClues: [
            'Image is strictly 2D flat cross-section.',
            'Shows internal anatomy of organelles (e.g. mitochondrial cristae folds).'
          ],
          examClue: 'TEM reveals 2D INTERNAL ultrastructure; SEM reveals 3D SURFACE topography.',
          arabicNote: 'المجهر الإلكتروني النافذ (TEM) يخترق العينة ويعرض التركيب الداخلي ثنائي الأبعاد للعضيات.'
        }
      },
      {
        id: 'l2_s3',
        slideNumber: 3,
        title: 'SEM: Scanning Electron Microscope',
        titleAr: 'المجهر الإلكتروني الماسح (SEM)',
        type: 'explanatory',
        explanatory: {
          structureName: 'Scanning Electron Microscope (SEM)',
          structureNameAr: 'المجهر الإلكتروني الماسح (SEM)',
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Three-dimensional surface topography of ciliated respiratory cells under SEM',
          stain: 'Gold or Platinum sputter coating',
          stainBadgeColor: 'amber',
          definition: 'An electron microscope that scans a focused electron beam ACROSS the heavy-metal-coated surface of a specimen, collecting secondary reflected electrons to create a 3D surface view.',
          location: [
            'Surface topology research',
            'Respiratory tract cilia study',
            'Red blood cell surface alterations (sickle cell morphology), sensory hair cells'
          ],
          function: [
            'Reveals three-dimensional (3D) surface contours, texture, and topography.',
            'Resolution approximately 1–10 nm.',
            'Specimen does not need ultra-thin sectioning; whole cells or surfaces are viewed.'
          ],
          appearance: 'Striking THREE-DIMENSIONAL (3D) greyscale image with realistic shadows, depth of field, and protruding surface structures (like cilia or microvilli).',
          identificationClues: [
            'Image has profound 3D depth of field and surface texture.',
            'Cannot see internal organelles; only external contours.'
          ],
          examClue: 'Keyword "3D Surface / Topography" → ALWAYS Scanning Electron Microscope (SEM).',
          arabicNote: 'المجهر الإلكتروني الماسح (SEM) يمسح السطح الخارجي ويعطي صورة ثلاثية الأبعاد 3D مجسمة.'
        }
      },
      {
        id: 'l2_s4',
        slideNumber: 4,
        title: 'Practical Spotter: TEM vs SEM',
        titleAr: 'اختبار عملي: التمييز بين TEM و SEM',
        type: 'quiz',
        quiz: {
          prompt: 'Station 02 — Examine this electron micrograph showing respiratory cilia:',
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Micrograph displaying protruding hair-like cilia in realistic 3D depth',
          question: 'What type of microscopy was used to produce this 3-dimensional surface image?',
          options: [
            'A. Compound Light Microscope (Bright-field)',
            'B. Transmission Electron Microscope (TEM)',
            'C. Scanning Electron Microscope (SEM)',
            'D. Phase Contrast Microscope'
          ],
          correctIndex: 2,
          answerTitle: 'Scanning Electron Microscope (SEM)',
          stainUsed: 'Gold / Platinum surface coating',
          identificationClue: 'Pronounced 3D surface topography with realistic shadowing and protruding cilia.',
          diagnosticReason: 'SEM detects secondary electrons reflected off the surface, yielding high-depth 3D images.',
          examPearl: 'If the image is flat 2D with internal cristae → TEM. If it is 3D surface with shadows → SEM.'
        }
      },
      {
        id: 'l2_s5',
        slideNumber: 5,
        title: 'Lesson 02: Quick Review',
        titleAr: 'مقارنة سريعة: المجاهر الطبية',
        type: 'review',
        review: {
          title: 'Lesson 02 Summary: Microscope Diagnostics',
          subtitle: 'Comparison between Light Microscopy, TEM, and SEM',
          rows: [
            {
              structure: 'Light Microscope (LM)',
              stain: 'H&E / Visible Light',
              appearance: 'Colored 2D slide',
              clue: 'Resolution 0.2 µm; max 1000–1500x',
              pearl: 'Workhorse of clinical histology lab.'
            },
            {
              structure: 'TEM (Transmission)',
              stain: 'Uranyl Acetate / Lead',
              appearance: 'Greyscale 2D flat cross-section',
              clue: 'Internal organelle ultrastructure (0.2 nm)',
              pearl: 'Beams pass THROUGH ultra-thin slice.'
            },
            {
              structure: 'SEM (Scanning)',
              stain: 'Gold surface coating',
              appearance: 'Greyscale 3D surface topography',
              clue: 'External surface contours & cilia (1–10 nm)',
              pearl: 'Beams bounce OFF surface; striking 3D depth.'
            }
          ],
          takeaways: [
            'LM resolution limit = 0.2 µm (governed by visible light wavelength).',
            'TEM = 2D internal ultrastructure (organelles, membranes).',
            'SEM = 3D external surface topography (cilia, cell shapes).'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 03: COMPOUND MICROSCOPE
  // ==========================================
  {
    id: 'lesson_03',
    lessonNumber: 3,
    numberString: 'LESSON 03',
    titleEn: 'Compound Microscope',
    titleAr: 'أجزاء وتشغيل المجهر الضوئي المركب',
    badge: 'INSTRUMENTATION',
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Mechanical vs optical components, objective lenses color coding, oil immersion, and magnification calculations.',
    summaryAr: 'الأجزاء الميكانيكية والضوئية، التمييز اللوني للعدسات الشيئية، عدسة الزيت، وحساب التكبير الكلي.',
    durationMinutes: 14,
    keyConcepts: ['Eyepiece & Objectives', 'Coarse vs Fine Focus', 'Substage Condenser', 'Oil Immersion (100x)'],
    slides: [
      {
        id: 'l3_s1',
        slideNumber: 1,
        title: 'Optical System: Objectives & Oculars',
        titleAr: 'النظام البصري: العدسات الشيئية والعينية',
        type: 'explanatory',
        explanatory: {
          structureName: 'Objective Lenses (العدسات الشيئية)',
          structureNameAr: 'العدسات الشيئية ونظام التكبير',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Revolving nosepiece with 4 objective lenses on microscope',
          stain: 'Optical Glass Optics',
          stainBadgeColor: 'blue',
          definition: 'The primary magnifying lenses mounted on the revolving nosepiece directly above the specimen stage, producing the initial real inverted image.',
          location: [
            'Mounted on the revolving nosepiece (turret) directly above the specimen stage.'
          ],
          function: [
            'Scanning Objective (4x - Red ring): Fast field scanning and slide orientation.',
            'Low Power (10x - Yellow ring): Locating general tissue architecture and layers.',
            'High Power (40x - Blue ring): High detail analysis of individual cells and nuclei.',
            'Oil Immersion (100x - White ring): Maximum resolution of bacteria and nuclear details.'
          ],
          appearance: 'Color-coded metal cylinders of increasing length (higher magnification = longer objective barrel).',
          identificationClues: [
            'Total Magnification = Objective Power × 10x Eyepiece.',
            'Scanning = 40x | Low = 100x | High = 400x | Oil = 1000x.'
          ],
          examClue: 'Oil immersion (100x) lens MUST use cedarwood/synthetic immersion oil to prevent light refraction.',
          arabicNote: 'العدسات الشيئية الأربع: المسحية 4x، الصغرى 10x، الكبرى 40x، والزيتية 100x.'
        }
      },
      {
        id: 'l3_s2',
        slideNumber: 2,
        title: 'Mechanical & Focusing System',
        titleAr: 'النظام الميكانيكي ومقابض الضبط',
        type: 'explanatory',
        explanatory: {
          structureName: 'Coarse & Fine Adjustment Knobs',
          structureNameAr: 'مقبضا الضبط التقريبي والدقيق',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Microscope mechanical focus knobs on lower arm',
          stain: 'Mechanical Control Knobs',
          stainBadgeColor: 'cyan',
          definition: 'Coaxial mechanical knobs that move the stage vertically to bring the specimen into crisp optical focus.',
          location: [
            'Located on both sides of the microscope lower arm/stand.'
          ],
          function: [
            'Coarse Adjustment (Large knob): Rapid vertical stage movement; used ONLY with low-power lenses (4x, 10x).',
            'Fine Adjustment (Small knob): Precise microscopic stage movement; used with 40x and 100x lenses to sharpen focus.',
            'Substage Condenser: Focuses and condenses the light beam onto the slide plane.',
            'Iris Diaphragm: Regulates light cone diameter, contrast, and depth of field.'
          ],
          appearance: 'Large outer dial (coarse) paired concentrically with a smaller inner dial (fine).',
          identificationClues: [
            'NEVER use coarse adjustment under high-power (40x or 100x) — risks cracking the slide and scratching the lens.'
          ],
          examClue: 'Under high power (40x / 100x), use FINE adjustment knob only.',
          arabicNote: 'المقبض الكبير (التقريبي) للعدسات الصغرى فقط؛ المقبض الصغير (الدقيق) لتوضيح الصورة تحت التكبير العالي.'
        }
      },
      {
        id: 'l3_s3',
        slideNumber: 3,
        title: 'Practical Spotter: Microscope Operation',
        titleAr: 'اختبار عملي: حساب التكبير وقواعد التشغيل',
        type: 'quiz',
        quiz: {
          prompt: 'Station 03 — Practical microscope calculation & safety question:',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Close-up of compound microscope 40x high power objective in position',
          question: 'A student views a tissue slide using a 10x eyepiece and a 40x objective. What is the total magnification, and which knob should be adjusted to sharpen focus?',
          options: [
            'A. 50x total magnification; use coarse adjustment knob',
            'B. 400x total magnification; use fine adjustment knob only',
            'C. 400x total magnification; use coarse adjustment knob',
            'D. 4000x total magnification; use condenser iris diaphragm'
          ],
          correctIndex: 1,
          answerTitle: '400x Total Magnification — Fine Adjustment Knob Only',
          stainUsed: 'High Power Optical Analysis',
          identificationClue: 'Total Magnification = 10 × 40 = 400x. Under high power, coarse knob is strictly prohibited.',
          diagnosticReason: 'The 40x objective has a minimal working distance; turning the coarse knob can smash the cover slip.',
          examPearl: 'Total magnification is MULTIPLICATIVE (Ocular × Objective), not additive!'
        }
      },
      {
        id: 'l3_s4',
        slideNumber: 4,
        title: 'Lesson 03: Quick Review',
        titleAr: 'مراجعة سريعة لأجزاء المجهر',
        type: 'review',
        review: {
          title: 'Lesson 03 Summary: Microscope Operations',
          subtitle: 'Key Optical Rules and Magnification Checklist',
          rows: [
            {
              structure: 'Total Magnification',
              stain: 'Formula',
              appearance: 'Ocular × Objective',
              clue: '10x ocular × 40x objective = 400x',
              pearl: 'Always multiply, never add magnification powers.'
            },
            {
              structure: 'Coarse Knob',
              stain: 'Mechanical',
              appearance: 'Large outer dial',
              clue: 'Rapid movement; use ONLY with 4x and 10x',
              pearl: 'Strictly prohibited with 40x and 100x.'
            },
            {
              structure: 'Fine Knob',
              stain: 'Mechanical',
              appearance: 'Small inner dial',
              clue: 'Micrometer precision; use with 40x and 100x',
              pearl: 'Brings plane of focus into sharp definition.'
            },
            {
              structure: 'Oil Immersion',
              stain: '100x Lens (White ring)',
              appearance: 'Immersion oil droplet',
              clue: 'Refractive index of oil = glass (1.515)',
              pearl: 'Prevents light scattering at high magnification.'
            }
          ],
          takeaways: [
            'Total magnification = Eyepiece power × Objective power.',
            'Coarse adjustment is for 4x/10x only; fine adjustment for 40x/100x.',
            'Cedarwood oil matches glass refractive index, eliminating light loss.'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 04: SLIDE PREPARATION WORKFLOW
  // ==========================================
  {
    id: 'lesson_04',
    lessonNumber: 4,
    numberString: 'LESSON 04',
    titleEn: 'Slide Preparation Workflow',
    titleAr: 'خطوات تحضير الشريحة النسيجية (10 خطوات)',
    badge: 'LAB PROTOCOL',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'The 10 verified steps from surgical biopsy to paraffin microtomy (4–6 µm) and mounting.',
    summaryAr: 'الخطوات العشر المعتمدة من أخذ الخزعة إلى التثبيت بالفورمالين والتقطيع بالميكروتوم والصبغ.',
    durationMinutes: 16,
    keyConcepts: ['10% Neutral Formalin', 'Graded Ethanol Dehydration', 'Xylene Clearing', 'Paraffin Microtomy (4–6 µm)'],
    slides: [
      {
        id: 'l4_s1',
        slideNumber: 1,
        title: 'Step 01 & 02: Biopsy & Fixation',
        titleAr: 'أخذ العينة والتثبيت بالفورمالين 10%',
        type: 'explanatory',
        explanatory: {
          structureName: 'Fixation with 10% Neutral Buffered Formalin',
          structureNameAr: 'التثبيت بمحلول الفورمالين 10%',
          image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Tissue specimen in formalin fixation jar in histology laboratory',
          stain: '10% Formalin (Formaldehyde in water)',
          stainBadgeColor: 'blue',
          definition: 'Fixation is the crucial second step that chemically preserves tissue architecture and prevents post-mortem decay.',
          location: [
            'Step 1: Sampling (Surgical excision, biopsy punch, autopsy).',
            'Step 2: Immediate immersion in fixative solution.'
          ],
          function: [
            'Inactivates intracellular autolytic lysosomal enzymes (prevents autolysis).',
            'Kills bacteria and molds (prevents putrefaction/decomposition).',
            'Cross-links and denatures structural proteins, hardening soft tissues for cutting.',
            'Standard fixative: 10% Neutral Buffered Formalin (fixative volume must be 10–20x tissue volume).'
          ],
          appearance: 'Tissue becomes firm, slightly opaque, and resistant to mechanical deformation.',
          identificationClues: [
            'Fixation must be performed IMMEDIATELY after surgical excision to avoid tissue necrosis artifacts.'
          ],
          examClue: 'Primary purpose of 10% Formalin: PREVENTS AUTOLYSIS and PUTREFACTION by protein cross-linking.',
          arabicNote: 'التثبيت بالفورمالين 10% يمنع التحلل الذاتي بالإنزيمات والتعفن البكتيري ويصلب النسيج.'
        }
      },
      {
        id: 'l4_s2',
        slideNumber: 2,
        title: 'Steps 03–06: Dehydration, Clearing & Embedding',
        titleAr: 'سحب الماء، الترويق بالزايلين، والطمر بالشمع',
        type: 'explanatory',
        explanatory: {
          structureName: 'Dehydration, Clearing, and Paraffin Embedding',
          structureNameAr: 'التجفيف والترويق والطمر بشمع البارافين',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Paraffin tissue block ready for microtomy',
          stain: 'Ethanol, Xylene & Paraffin Wax',
          stainBadgeColor: 'amber',
          definition: 'The chemical processing series that replaces cellular water with solid molten paraffin wax (melting point 56–58°C).',
          location: [
            'Automated tissue processor cassette baskets.'
          ],
          function: [
            'Dehydration (Step 3): Graded ascending alcohols (70% → 80% → 95% → 100% ethanol) gently extract all water without tissue shrinkage.',
            'Clearing (Step 4): Xylene (or toluene) removes alcohol and makes tissue translucent; xylene is miscible with both alcohol and paraffin.',
            'Infiltration (Step 5): Molten paraffin at 56–58°C penetrates cellular spaces.',
            'Embedding (Step 6): Tissue is oriented in a metal mold, topped with liquid wax, and chilled to form a solid Paraffin Block.'
          ],
          appearance: 'Solid opaque white wax block encasing the brown preserved tissue specimen.',
          identificationClues: [
            'Why graded alcohols? Direct jump to 100% alcohol causes severe osmotic distortion and cell collapse.',
            'Why xylene? Alcohol and paraffin wax do NOT mix; xylene dissolves both.'
          ],
          examClue: 'Xylene dissolves lipids and fat droplets, leaving behind empty spaces ("signet ring" in adipose tissue).',
          arabicNote: 'التجفيف بالكحول المتدرج يمنع انكماش الخلايا؛ الزايلين وسيط مذيب للدهن والبارافين.'
        }
      },
      {
        id: 'l4_s3',
        slideNumber: 3,
        title: 'Steps 07–10: Microtomy, Staining & Mounting',
        titleAr: 'التقطيع بالميكروتوم 4-6 ميكرون والصبغ والتحميل',
        type: 'explanatory',
        explanatory: {
          structureName: 'Microtomy, Rehydration, Staining, and Mounting',
          structureNameAr: 'التقطيع بالميكروتوم والصبغ والتحميل النهائي',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Microtome slicing paraffin ribbon onto warm water bath',
          stain: 'H&E Staining & DPX Mountant',
          stainBadgeColor: 'purple',
          definition: 'The final mechanical and staining sequence transforming a paraffin block into a permanent glass slide for light microscopy.',
          location: [
            'Rotary microtome, warm water bath (45°C), staining rack, glass coverslips.'
          ],
          function: [
            'Microtomy (Step 7): Rotary microtome slices tissue ribbon at 4–6 micrometers (4–6 µm) thickness.',
            'Mounting on slide (Step 8): Ribbons float on warm water bath (45°C) to flatten wrinkles, picked onto glass slides.',
            'Staining (Step 9): Wax is removed by xylene; slide is rehydrated through descending alcohols to water; stained with Hematoxylin (nuclei) and Eosin (cytoplasm).',
            'Permanent Mounting (Step 10): Dehydrated, cleared in xylene, and covered with a glass coverslip using DPX or Canada balsam resin.'
          ],
          appearance: 'Finished transparent glass slide with stained pink-and-purple tissue section sealed under a glass coverslip.',
          identificationClues: [
            'Standard section thickness for light microscopy: 4–6 µm (one cell layer thick).',
            'Water-based stains require dewaxing and rehydration before staining.'
          ],
          examClue: 'Standard microtome slice thickness is 4 to 6 µm. Mounting medium is DPX or Canada balsam.',
          arabicNote: 'سُمك الشريحة 4-6 ميكرومتر لتسمح بنفاذ الضوء عبر طبقة خلوية واحدة فقط.'
        }
      },
      {
        id: 'l4_s4',
        slideNumber: 4,
        title: 'Practical Spotter: Slide Prep Reagents',
        titleAr: 'اختبار عملي: كواشف تحضير الشريحة',
        type: 'quiz',
        quiz: {
          prompt: 'Station 04 — Practical slide preparation protocol question:',
          image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Tissue cassette in processing container',
          question: 'Why is xylene used in Step 4 (Clearing) before paraffin wax infiltration?',
          options: [
            'A. To stain the cellular nuclei dark purple',
            'B. Because paraffin wax cannot mix with alcohol, and xylene is miscible with both',
            'C. To freeze the tissue at sub-zero temperatures for rapid cryosectioning',
            'D. To preserve DNA from hydrolytic degradation'
          ],
          correctIndex: 1,
          answerTitle: 'Intermediate Solvent Miscibility (Alcohol + Paraffin)',
          stainUsed: 'Step 4: Clearing Reagent (Xylene / Xylol)',
          identificationClue: 'Paraffin wax is hydrophobic and immiscible with ethanol. Xylene dissolves both and makes tissue translucent.',
          diagnosticReason: 'Xylene acts as the chemical bridge between absolute dehydration alcohol and molten embedding wax.',
          examPearl: 'Xylene dissolves neutral lipids; this is why fat cells appear empty and clear under routine H&E.'
        }
      },
      {
        id: 'l4_s5',
        slideNumber: 5,
        title: 'Lesson 04: Quick Review',
        titleAr: 'مراجعة سريعة لخطوات تحضير الشريحة',
        type: 'review',
        review: {
          title: 'Lesson 04 Summary: Slide Preparation Protocol',
          subtitle: 'The 10 Sequential Steps and Key Laboratory Reagents',
          rows: [
            {
              structure: 'Fixation (Step 2)',
              stain: '10% Formalin',
              appearance: 'Preserved firm tissue',
              clue: 'Prevents autolysis & bacterial putrefaction',
              pearl: 'Volume must be 10–20x tissue volume.'
            },
            {
              structure: 'Dehydration (Step 3)',
              stain: 'Graded Alcohols (70%–100%)',
              appearance: 'Water-free tissue',
              clue: 'Gradual ascent prevents cell shrinkage',
              pearl: 'Must reach 100% absolute ethanol.'
            },
            {
              structure: 'Clearing (Step 4)',
              stain: 'Xylene (Xylol)',
              appearance: 'Translucent clearing',
              clue: 'Miscible with both alcohol and paraffin',
              pearl: 'Extracts cellular lipids (leaves empty fat droplets).'
            },
            {
              structure: 'Embedding (Step 5–6)',
              stain: 'Paraffin Wax (56–58°C)',
              appearance: 'Solid wax block',
              clue: 'Provides structural support for microtomy',
              pearl: 'Solidifies upon chilling on cooling plate.'
            },
            {
              structure: 'Microtomy (Step 7)',
              stain: 'Rotary Microtome',
              appearance: 'Thin ribbon (4–6 µm)',
              clue: 'Floated on 45°C warm water bath',
              pearl: 'Standard thickness is 4 to 6 micrometers.'
            }
          ],
          takeaways: [
            'Fixation with 10% formalin prevents autolysis and putrefaction.',
            'Dehydration uses graded alcohols to avoid osmotic distortion.',
            'Microtomy produces 4–6 µm thin slices for light transmission.'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 05: HISTOLOGICAL STAINS
  // ==========================================
  {
    id: 'lesson_05',
    lessonNumber: 5,
    numberString: 'LESSON 05',
    titleEn: 'Histological Stains',
    titleAr: 'الصبغات النسيجية العامة والخاصة',
    badge: 'STAINING',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Principles of acidic vs basic stains, routine Hematoxylin & Eosin (H&E), and special selective stains.',
    summaryAr: 'مبادئ الصبغات الحامضية والقاعدية، صبغة H&E الروتينية، والصبغات النوعية الخاصة (الفضة، سودان 3، PAS، والأورسين).',
    durationMinutes: 18,
    keyConcepts: ['Basophilic vs Acidophilic', 'H&E Chemistry', 'Silver Impregnation', 'Periodic Acid-Schiff (PAS)'],
    slides: [
      {
        id: 'l5_s1',
        slideNumber: 1,
        title: 'Routine Stain: Hematoxylin & Eosin (H&E)',
        titleAr: 'الصبغة الروتينية: الهيماتوكسيلين والإيوسين',
        type: 'explanatory',
        explanatory: {
          structureName: 'Hematoxylin & Eosin (H&E Routine Stain)',
          structureNameAr: 'صبغة الهيماتوكسيلين والإيوسين (H&E)',
          image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'High power histology slide stained with routine Hematoxylin and Eosin',
          stain: 'Hematoxylin (Basic) + Eosin (Acidic)',
          stainBadgeColor: 'purple',
          definition: 'The universal routine histological stain combining a basic blue dye (Hematoxylin) with an acidic pink dye (Eosin).',
          location: [
            'Over 90% of all diagnostic medical histology and pathology slides worldwide.'
          ],
          function: [
            'Hematoxylin (Basic, positive charge): Binds negatively charged acidic tissue components (basophilic structures) → stains DNA, RNA, ribosomes, and nuclei DEEP BLUE or PURPLE.',
            'Eosin (Acidic, negative charge): Binds positively charged basic proteins (acidophilic/eosinophilic structures) → stains cytoplasm, collagen fibers, and red blood cells PINK or RED.'
          ],
          appearance: 'Vibrant dual-contrast slide: cellular nuclei stand out as crisp dark blue/purple circles, embedded in bright pink cytoplasm and extracellular collagen fibers.',
          identificationClues: [
            'Purple dots = Cell nuclei (heterochromatin & nucleoli).',
            'Pink/Red areas = Cytoplasm, muscle fibers, collagen bundles, erythrocytes.'
          ],
          examClue: 'Basophilic = Stains BLUE with Hematoxylin (DNA/RNA). Acidophilic/Eosinophilic = Stains PINK with Eosin (cytoplasm/proteins).',
          arabicNote: 'الهيماتوكسيلين (قاعدي) يصبغ الأنوية بالأزرق؛ الإيوسين (حامضي) يصبغ السيتوبلازم والكولاجين بالوردي.'
        }
      },
      {
        id: 'l5_s2',
        slideNumber: 2,
        title: 'Special Stain: Silver Impregnation',
        titleAr: 'الصبغة الخاصة: الترسيب الفضي (Silver Stain)',
        type: 'explanatory',
        explanatory: {
          structureName: 'Silver Impregnation Stain (ترسيب الفضة)',
          structureNameAr: 'الصبغة الفضية الخاصة',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Silver impregnated section showing delicate black reticular fibers and Golgi complex',
          stain: 'Silver Nitrate (AgNO₃) / Da Fano method',
          stainBadgeColor: 'amber',
          definition: 'A specialized histological method where silver ions are reduced by specific cellular structures to metallic silver, depositing black or dark brown precipitates.',
          location: [
            'Reticular connective tissue (lymph nodes, spleen, liver stroma)',
            'Nerve tissue (neurofibrils, axons)',
            'Cell organelles: Golgi apparatus in spinal ganglion neurons'
          ],
          function: [
            'Demonstrates delicate Type III collagen reticular fibers (argyrophilic fibers) that cannot be visualized on routine H&E.',
            'Visualizes the Golgi apparatus as an intricate dark brown or black reticular network surrounding the nucleus.'
          ],
          appearance: 'Fine, branching JET BLACK or DARK BROWN fibers and reticular networks standing out against a pale brownish or golden-yellow background.',
          identificationClues: [
            'Black branching network in lymphoid organs → Reticular fibers.',
            'Perinuclear black lace-like network in large neurons → Golgi apparatus.'
          ],
          examClue: 'High-Yield Formula: Silver Stain / Silver Impregnation → Reticular Fibers OR Golgi Apparatus.',
          arabicNote: 'ترسيب أملاح الفضة يظهر ألياف الشباك الدقيقة وجهاز جولجي بلون أسود داكن لا يظهر في H&E.'
        }
      },
      {
        id: 'l5_s3',
        slideNumber: 3,
        title: 'Special Stains: Sudan III, PAS & Orcein',
        titleAr: 'الصبغات الخاصة: سودان 3، PAS، والأورسين',
        type: 'explanatory',
        explanatory: {
          structureName: 'Special Diagnostic Stains (Sudan, PAS, Orcein)',
          structureNameAr: 'حزمة الصبغات التشخيصية الخاصة',
          image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Histological montage of special stained tissues',
          stain: 'Sudan III / PAS / Orcein',
          stainBadgeColor: 'rose',
          definition: 'Selective chemical stains designed to identify specific biochemical macromolecules (lipids, carbohydrates, elastic fibers).',
          location: [
            'Sudan III / Sudan Black: Adipose tissue, myelin sheath, fatty liver droplets.',
            'Periodic Acid-Schiff (PAS): Glycogen in hepatocytes, epithelial basement membranes, goblet cell mucin, brush border microvilli.',
            'Orcein / Weigert: Elastic fibers in large arteries (aorta) and elastic cartilage.'
          ],
          function: [
            'Sudan III: Dissolves into neutral triglycerides on frozen sections → stains lipid droplets ORANGE or RED-ORANGE.',
            'PAS (Periodic Acid-Schiff): Oxidizes 1,2-glycol groups to aldehydes, producing a vibrant MAGENTA / PURPLE-RED color for carbohydrates.',
            'Orcein: Selective basic dye staining elastic fibers DARK BROWN or BLACK-BROWN.'
          ],
          appearance: 'Sudan = Bright orange fat droplets. PAS = Deep magenta brush border and basement membranes. Orcein = Wavy dark brown elastic lines.',
          identificationClues: [
            'Lipid in frozen section stained orange → Sudan III.',
            'Basement membrane or goblet cell stained magenta/purple → PAS.',
            'Wavy brown fibers in aorta wall → Orcein.'
          ],
          examClue: 'Glycogen & Mucin → PAS (Magenta). Lipids on frozen sections → Sudan III (Orange). Elastic fibers → Orcein (Brown).',
          arabicNote: 'سودان 3 يصبغ الدهون بالبرتقالي، PAS يصبغ الكربوهيدرات بالبنفسجي/الماجنتا، والأورسين يصبغ الألياف المرنة بالبني.'
        }
      },
      {
        id: 'l5_s4',
        slideNumber: 4,
        title: 'Practical Spotter: Histological Stains',
        titleAr: 'اختبار عملي: التعرف على الصبغة النسيجية',
        type: 'quiz',
        quiz: {
          prompt: 'Station 05 — Practical stain identification station:',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Micrograph of reticular meshwork stained jet black',
          question: 'A tissue section from a lymph node displays a delicate network of branching black fibers. What special stain was utilized?',
          options: [
            'A. Periodic Acid-Schiff (PAS)',
            'B. Silver Impregnation (Silver stain)',
            'C. Sudan III Stain',
            'D. Altmann’s Acid Fuchsin'
          ],
          correctIndex: 1,
          answerTitle: 'Silver Impregnation (Silver Stain)',
          stainUsed: 'Silver Salts (AgNO₃)',
          identificationClue: 'Jet-black, branching meshwork of argyrophilic reticular fibers against a pale background.',
          diagnosticReason: 'Reticular fibers are argyrophilic; they avidly reduce silver salts to metallic black silver precipitates.',
          examPearl: 'Whenever you see jet black fibers or a black perinuclear network → think Silver stain.'
        }
      },
      {
        id: 'l5_s5',
        slideNumber: 5,
        title: 'Lesson 05: Quick Review',
        titleAr: 'مراجعة سريعة للصبغات النسيجية',
        type: 'review',
        review: {
          title: 'Lesson 05 Summary: Stains Master Table',
          subtitle: 'High-Yield Microscopic Stains and Diagnostic Color Codes',
          rows: [
            {
              structure: 'Hematoxylin (in H&E)',
              stain: 'Basic dye (+)',
              appearance: 'Blue / Purple',
              clue: 'Stains acidic basophilic structures (DNA, RNA, nuclei)',
              pearl: 'Routine nuclear stain.'
            },
            {
              structure: 'Eosin (in H&E)',
              stain: 'Acidic dye (-)',
              appearance: 'Pink / Red',
              clue: 'Stains basic acidophilic proteins (cytoplasm, collagen, RBCs)',
              pearl: 'Routine cytoplasmic/matrix stain.'
            },
            {
              structure: 'Silver Impregnation',
              stain: 'Silver nitrate (Ag)',
              appearance: 'Black / Dark Brown',
              clue: 'Reticular fibers & Golgi complex',
              pearl: 'Silver stain = Golgi OR Reticular fibers.'
            },
            {
              structure: 'PAS (Periodic Acid-Schiff)',
              stain: 'Schiff reagent',
              appearance: 'Intense Magenta / Purple-Red',
              clue: 'Glycogen, mucin, basement membranes, brush borders',
              pearl: 'Specific for carbohydrate-rich structures.'
            },
            {
              structure: 'Sudan III',
              stain: 'Lipophilic dye',
              appearance: 'Bright Orange / Red-Orange',
              clue: 'Neutral triglycerides / fat droplets in frozen sections',
              pearl: 'Cannot use on paraffin (xylene dissolves fat).'
            },
            {
              structure: 'Orcein',
              stain: 'Elastic stain',
              appearance: 'Dark Brown / Purple-Brown',
              clue: 'Wavy elastic fibers in aorta & elastic cartilage',
              pearl: 'Demonstrates internal elastic lamina.'
            }
          ],
          takeaways: [
            'H&E: Blue nuclei (Hematoxylin) + Pink cytoplasm (Eosin).',
            'Silver impregnation = Black fibers (reticular) and Golgi apparatus.',
            'PAS = Magenta carbohydrates; Sudan III = Orange lipids on frozen tissue.'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 06: CELL ORGANELLES
  // (Strict adherence to section 9 of user request)
  // ==========================================
  {
    id: 'lesson_06',
    lessonNumber: 6,
    numberString: 'LESSON 06',
    titleEn: 'Cell Organelles',
    titleAr: 'العضيات الخلوية (جهاز جولجي، الميتوكوندريا، وأجسام نيسل)',
    badge: 'CELL BIOLOGY',
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Dedicated visual slides for Golgi apparatus (Silver), Mitochondria (Altmann’s fuchsin), and Nissl bodies (Toluidine blue).',
    summaryAr: 'شرائح بصرية مخصصة لكل من جهاز جولجي (الفضة)، الميتوكوندريا (ألتمن)، وأجسام نيسل (تولويدين الأزرق).',
    durationMinutes: 20,
    keyConcepts: ['Golgi Apparatus (Silver)', 'Mitochondria (Altmann)', 'Nissl Bodies (Toluidine Blue)', 'Organelle OSPE Station'],
    slides: [
      {
        id: 'l6_s1',
        slideNumber: 1,
        title: 'Introduction: Membranous vs Non-Membranous',
        titleAr: 'مقدمة: العضيات الغشائية وغير الغشائية',
        type: 'explanatory',
        explanatory: {
          structureName: 'Classification of Cell Organelles',
          structureNameAr: 'تصنيف العضيات الخلوية',
          image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'High resolution ultrastructural micrograph of cell organelles',
          stain: 'Transmission Electron Microscopy (TEM)',
          stainBadgeColor: 'purple',
          definition: 'Organelles are metabolically active, specialized intracellular structures performing vital biochemical tasks inside the cytoplasm.',
          location: [
            'Suspended within the intracellular cytosol of all eukaryotic cells.'
          ],
          function: [
            'Membranous Organelles (Enclosed by lipid bilayers): Mitochondria, Endoplasmic Reticulum (rER/sER), Golgi Apparatus, Lysosomes, Peroxisomes.',
            'Non-Membranous Organelles (No membrane barrier): Ribosomes, Centrosome (centrioles), Cytoskeleton (microtubules, microfilaments, intermediate filaments).'
          ],
          appearance: 'Organelles require special histological stains or electron microscopy (TEM) to be recognized individually.',
          identificationClues: [
            'Mitochondria → Altmann’s Acid Fuchsin (Red granules).',
            'Golgi Apparatus → Silver Impregnation (Black network) or H&E (Negative Golgi halo).',
            'Nissl Bodies (rER in neurons) → Toluidine Blue / Cresyl Violet (Basophilic granules).'
          ],
          examClue: 'Three classic 1st-year practical organelle slides: GOLGI (Silver), MITOCHONDRIA (Altmann), and NISSL BODIES (Toluidine blue).',
          arabicNote: 'تنقسم العضيات إلى غشائية (كالميتوكوندريا وجولجي) وغير غشائية (كالريبوسومات والمريكزات).'
        }
      },
      {
        id: 'l6_s2',
        slideNumber: 2,
        title: 'Slide 1: Golgi Apparatus',
        titleAr: 'الشريحة الأولى: جهاز جولجي (Golgi Apparatus)',
        type: 'explanatory',
        explanatory: {
          structureName: 'GOLGI APPARATUS',
          structureNameAr: 'جهاز جولجي (Golgi Complex)',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Silver impregnation demonstrating Golgi apparatus as a dark reticular network around neuron nucleus',
          stain: 'Silver Impregnation (Da Fano method / Osmic acid)',
          stainBadgeColor: 'amber',
          definition: 'A membranous organelle consisting of stacks of curved, flattened cisternae with distinct functional polarity (cis entry face and trans exit face).',
          location: [
            'Perinuclear cytoplasm (encircling the nucleus).',
            'Prominent in secretory cells: spinal ganglion neurons, pancreatic acinar cells, and plasma cells.'
          ],
          function: [
            'Post-translational chemical modification of proteins (glycosylation, sulfation, phosphorylation).',
            'Sorting, packaging, and shipping proteins into secretory vesicles and lysosomes.'
          ],
          appearance: 'Under Silver Impregnation: An intricate dark brown or jet-black reticular network (plexus) encircling the pale nucleus. Under routine H&E in active plasma cells: A clear, unstained crescent-shaped zone adjacent to the eccentric nucleus known as the "Negative Golgi Image".',
          identificationClues: [
            'Dark black/brown curved threads forming a basket around the nucleus under silver stain.',
            'Clear unstained halo next to the nucleus in antibody-secreting plasma cells under H&E.'
          ],
          examClue: 'Silver impregnation → Golgi apparatus (or "Negative Golgi image" in plasma cells under H&E).',
          arabicNote: 'جهاز جولجي: يُصبغ بترسيب أملاح الفضة كشبكة خيطية سوداء حول النواة، ووظيفته تعديل وتغليف البروتينات.',
          pointers: [
            { id: 'g1', label: 'Golgi Reticular Network (Black)', x: 48, y: 44, description: 'Silver precipitate decorating cisternae' },
            { id: 'g2', label: 'Perinuclear Zone', x: 52, y: 55, description: 'Positioned immediately adjacent to nucleus' }
          ]
        }
      },
      {
        id: 'l6_s3',
        slideNumber: 3,
        title: 'Slide 2: Mitochondria',
        titleAr: 'الشريحة الثانية: الميتوكوندريا (Mitochondria)',
        type: 'explanatory',
        explanatory: {
          structureName: 'MITOCHONDRIA',
          structureNameAr: 'الميتوكوندريا (بيوت الطاقة الخلوية)',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Altmann acid fuchsin stain showing bright red granular mitochondria in renal tubule cells',
          stain: "Altmann's Acid Fuchsin Stain (or Iron Hematoxylin)",
          stainBadgeColor: 'rose',
          definition: 'Oval or rod-shaped double-membraned organelles with heavily folded inner cristae, generating cellular ATP via oxidative phosphorylation.',
          location: [
            'Cytoplasm of highly active metabolic cells: renal proximal tubules, cardiac myocytes, hepatocytes, and spermatozoa flagellum.'
          ],
          function: [
            'Aerobic cellular respiration, Krebs cycle, and ATP synthesis via ATP synthase complexes.',
            'Regulation of apoptosis (programmed cell death) through Cytochrome c release.',
            'Intracellular calcium storage and heat generation in brown fat.'
          ],
          appearance: 'Under Altmann’s Acid Fuchsin: Brilliant bright red or crimson granular, rod-shaped, or filamentous structures densely packed in the basal cytoplasm (basal striations) of renal tubule cells. Under routine H&E: Imparts intense acidophilic (deep pink) staining to the cytoplasm of active cells.',
          identificationClues: [
            'Red-staining cytoplasmic granular structures aligned vertically beneath the round nuclei of kidney tubule cells.',
            'Abundance correlates directly with high ATP demand for active transport (Na⁺/K⁺ ATPase).'
          ],
          examClue: "Altmann's fuchsin → mitochondria (acidophilic red cytoplasmic granules).",
          arabicNote: 'الميتوكوندريا: تُصبغ بصبغة ألتمن (Acid Fuchsin) بحبيبات حمراء زاهية في السيتوبلازم، وظيفتها إنتاج طاقة ATP.',
          pointers: [
            { id: 'm1', label: 'Basal Striations (Mitochondria)', x: 42, y: 58, description: 'Dense rows of mitochondria powering ion pumps' },
            { id: 'm2', label: 'Acidophilic Red Granules', x: 55, y: 48, description: 'Acid fuchsin binds high protein content' }
          ]
        }
      },
      {
        id: 'l6_s4',
        slideNumber: 4,
        title: 'Slide 3: Nissl Bodies',
        titleAr: 'الشريحة الثالثة: أجسام نيسل (Nissl Bodies)',
        type: 'explanatory',
        explanatory: {
          structureName: 'NISSL BODIES',
          structureNameAr: 'أجسام نيسل (Nissl Bodies / Tigroid Bodies)',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Motor neuron stained with Toluidine blue displaying coarse basophilic Nissl granules sparing axon hillock',
          stain: 'Toluidine Blue or Cresyl Violet (Basic aniline dyes)',
          stainBadgeColor: 'blue',
          definition: 'Dense parallel aggregates of Rough Endoplasmic Reticulum (rER) cisternae studded with free polyribosomes inside the neuronal cell body.',
          location: [
            'Neuronal perikaryon (soma) of motor neurons in spinal cord anterior horn and cerebral pyramidal cells.',
            'Extends into proximal dendrites; strictly ABSENT from the axon and the Axon Hillock (منطقة خروج المحور).'
          ],
          function: [
            'Intense synthesis of structural proteins, neurotransmitter enzymes, and membrane receptors required to maintain long axonal processes.'
          ],
          appearance: 'Under Toluidine Blue or Cresyl Violet: Coarse, intensely basophilic (deep blue or purple) clumps scattered throughout the pale neuroplasm, resembling a spotted tiger skin ("tigroid bodies"). The pale cone-shaped area lacking granules identifies the Axon Hillock.',
          identificationClues: [
            'Large multipolar neuron with pale vesicular nucleus and prominent dark nucleolus.',
            'Cytoplasm packed with coarse blue granules.',
            'Clear cone-shaped region devoid of granules = Axon Hillock.'
          ],
          examClue: 'Toluidine blue / Cresyl violet → Nissl bodies (rER in neurons, absent at axon hillock).',
          arabicNote: 'أجسام نيسل: عبارة عن شبكة إندوبلازمية خشنة وريبوسومات في الخلايا العصبية، تصبغ بالأزرق وتنعدم عند منشأ المحور (Axon hillock).',
          pointers: [
            { id: 'n1', label: 'Coarse Nissl Granules (Blue)', x: 46, y: 42, description: 'rER + ribosomes staining with basic dye' },
            { id: 'n2', label: 'Axon Hillock (Devoid of Nissl)', x: 62, y: 68, description: 'Clear cone where axon leaves soma' }
          ]
        }
      },
      {
        id: 'l6_s5',
        slideNumber: 5,
        title: 'Practical Spotter: Cell Organelles',
        titleAr: 'اختبار عملي: التعرف على العضيات الخلوية',
        type: 'quiz',
        quiz: {
          prompt: 'Station 06 — Practical Spotter Identification Question:',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Microscopic slide of dorsal root ganglion neuron treated with silver impregnation',
          question: 'Examine this spinal ganglion neuron stained with silver impregnation. What cellular organelle forms the prominent dark brown/black reticular network encircling the nucleus?',
          options: [
            'A. Mitochondria',
            'B. Golgi Apparatus',
            'C. Nissl Bodies',
            'D. Centrosome'
          ],
          correctIndex: 1,
          answerTitle: 'Golgi Apparatus (Golgi Complex)',
          stainUsed: 'Silver Impregnation Stain',
          identificationClue: 'Dark brown/black perinuclear reticular network in a sensory ganglion neuron.',
          diagnosticReason: 'Silver impregnation selectively deposits reduced metallic silver on Golgi cisternae. (Nissl bodies stain with Toluidine blue; Mitochondria stain with Altmann’s fuchsin).',
          examPearl: 'Silver stain + Perinuclear black network = ALWAYS GOLGI APPARATUS.'
        }
      },
      {
        id: 'l6_s6',
        slideNumber: 6,
        title: 'Lesson 06: Quick Review',
        titleAr: 'مراجعة سريعة للعضيات الخلوية',
        type: 'review',
        review: {
          title: 'Lesson 06 Summary: Cell Organelles Master Table',
          subtitle: 'The 3 Cardinal Histological Organelles for 1st-Year Medical Practical',
          rows: [
            {
              structure: 'Golgi Apparatus',
              stain: 'Silver Impregnation (or H&E for negative image)',
              appearance: 'Dark brown/black reticular network around nucleus',
              clue: 'Perinuclear network in neurons; Negative Golgi halo in plasma cells',
              pearl: 'Silver impregnation → Golgi apparatus.'
            },
            {
              structure: 'Mitochondria',
              stain: "Altmann's Acid Fuchsin (or Iron Hematoxylin)",
              appearance: 'Acidophilic / bright red cytoplasmic granules',
              clue: 'Basal striations in renal proximal tubules',
              pearl: "Altmann's fuchsin → mitochondria (ATP production)."
            },
            {
              structure: 'Nissl Bodies',
              stain: 'Toluidine Blue / Cresyl Violet',
              appearance: 'Basophilic coarse blue granules in neuroplasm',
              clue: 'Present in soma and dendrites; ABSENT at Axon Hillock',
              pearl: 'Toluidine blue / Cresyl violet → Nissl bodies (rER).'
            }
          ],
          takeaways: [
            'Golgi Apparatus: Modified & packaged proteins; stained with Silver Impregnation.',
            'Mitochondria: ATP powerhouses; stained red with Altmann’s Acid Fuchsin.',
            'Nissl Bodies: rER + polyribosomes in neurons; stained blue with Toluidine Blue (absent at Axon Hillock).'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 07: CELL DIVISION (MITOSIS)
  // ==========================================
  {
    id: 'lesson_07',
    lessonNumber: 7,
    numberString: 'LESSON 07',
    titleEn: 'Cell Division (Mitosis)',
    titleAr: 'الانقسام الخلوي المتساوي (Mitosis)',
    badge: 'CYTOGENETICS',
    coverImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Microscopic identification of the 4 mitotic phases: Prophase, Metaphase, Anaphase, and Telophase/Cytokinesis.',
    summaryAr: 'التعرف المجهري على الأطوار الأربعة: التمهيدي، الاستوائي، الانفصالي، والنهائي مع انقسام السيتوبلازم.',
    durationMinutes: 16,
    keyConcepts: ['Prophase (Condensation)', 'Metaphase (Equatorial Plate)', 'Anaphase (V-shaped arms)', 'Telophase (Cleavage Furrow)'],
    slides: [
      {
        id: 'l7_s1',
        slideNumber: 1,
        title: 'Phase 1: Prophase',
        titleAr: 'الطور التمهيدي (Prophase)',
        type: 'explanatory',
        explanatory: {
          structureName: 'PROPHASE (الطور التمهيدي)',
          structureNameAr: 'الطور التمهيدي للانقسام المتساوي',
          image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Microscopic slide showing prophase with condensed tangled chromosomes',
          stain: 'Iron Hematoxylin / Basic Nuclear Stains',
          stainBadgeColor: 'blue',
          definition: 'The initial stage of karyokinesis where diffuse chromatin condenses into distinct visible dark chromosomes, and the nucleolus and nuclear envelope disassemble.',
          location: [
            'Rapidly dividing tissues: plant root tips (Allium / onion), bone marrow, intestinal crypts, epidermal stratum basale.'
          ],
          function: [
            'Compacts extended DNA molecules into portable chromosome packages.',
            'Centrosomes separate to opposite poles, nucleating mitotic spindle fibers.'
          ],
          appearance: 'A rounded cell where the nucleus resembles a dense, tangled ball of dark yarn. The nuclear boundary becomes fuzzy or disappears.',
          identificationClues: [
            'Chromosomes are condensed and dark, but NOT yet aligned in a line.',
            'Nuclear envelope has dissolved; nucleolus is gone.'
          ],
          examClue: 'Tangled ball of dark chromosomes scattered inside cell without linear order = PROPHASE.',
          arabicNote: 'الطور التمهيدي: تتكاثف خيوط الكروماتين وتظهر ككتلة متشابكة من الخيوط الداكنة وتختفي النوية والغلاف النووي.'
        }
      },
      {
        id: 'l7_s2',
        slideNumber: 2,
        title: 'Phase 2: Metaphase',
        titleAr: 'الطور الاستوائي (Metaphase)',
        type: 'explanatory',
        explanatory: {
          structureName: 'METAPHASE (الطور الاستوائي)',
          structureNameAr: 'الطور الاستوائي للانقسام المتساوي',
          image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Metaphase plate showing straight dark line of chromosomes across cell equator',
          stain: 'Iron Hematoxylin / Giemsa',
          stainBadgeColor: 'cyan',
          definition: 'The stage where fully condensed sister chromatids are held by spindle microtubules and aligned along the equatorial plane (Metaphase Plate).',
          location: [
            'Equator of actively dividing cells.',
            'Stage chosen for diagnostic karyotyping (colchicine arrests cells in metaphase).'
          ],
          function: [
            'Ensures each kinetochore is stably attached to opposite spindle poles before separation (Spindle Assembly Checkpoint).'
          ],
          appearance: 'A crisp, straight, unmistakable dark linear plate or band of chromosomes aligned across the middle diameter of the cell.',
          identificationClues: [
            'Chromosomes form a single straight dark line down the middle of the cell.',
            'Easiest phase to identify in histology practical exams.'
          ],
          examClue: 'Straight dark line across the middle = METAPHASE PLATE (الطور الاستوائي).',
          arabicNote: 'الطور الاستوائي: تصطف الكروموسومات في خط مستقيم واحد على طول خط استواء الخلية.'
        }
      },
      {
        id: 'l7_s3',
        slideNumber: 3,
        title: 'Phase 3: Anaphase',
        titleAr: 'الطور الانفصالي (Anaphase)',
        type: 'explanatory',
        explanatory: {
          structureName: 'ANAPHASE (الطور الانفصالي)',
          structureNameAr: 'الطور الانفصالي للانقسام المتساوي',
          image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Anaphase showing two retreating clusters of V-shaped chromosomes pulled toward opposite poles',
          stain: 'Iron Hematoxylin / Basic Stains',
          stainBadgeColor: 'amber',
          definition: 'The shortest phase of mitosis where centromeres split and sister chromatids are pulled apart toward opposite spindle poles as daughter chromosomes.',
          location: [
            'Elongated mitotic cells with two polar clusters.'
          ],
          function: [
            'Synchronously separates identical genetic copies to ensure each daughter cell receives a diploid genome.'
          ],
          appearance: 'Two distinct, symmetrical dark groups of "V" or "J"-shaped chromosomes pulled away from each other, leaving a wide, clear chromosome-free central zone.',
          identificationClues: [
            'Two separate dark chromosome groups moving apart.',
            'Centromeres point toward the pole while chromosome arms trail behind in a "V" shape.'
          ],
          examClue: 'Two retreating dark chromosome groups with a clear central gap = ANAPHASE.',
          arabicNote: 'الطور الانفصالي: تنفصل الكروماتيدات الشقيقة وتهاجر نحو قطبي الخلية وتبدو كحرف V.'
        }
      },
      {
        id: 'l7_s4',
        slideNumber: 4,
        title: 'Phase 4: Telophase & Cytokinesis',
        titleAr: 'الطور النهائي وانقسام السيتوبلازم (Telophase & Cytokinesis)',
        type: 'explanatory',
        explanatory: {
          structureName: 'TELOPHASE & CYTOKINESIS',
          structureNameAr: 'الطور النهائي وانقسام السيتوبلازم',
          image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Telophase showing hourglass pinched cell with cleavage furrow and two forming daughter nuclei',
          stain: 'Basic Nuclear Stains',
          stainBadgeColor: 'purple',
          definition: 'Daughter chromosomes uncoil back into chromatin, nuclear envelopes reform, and a contractile ring of actin-myosin pinches the cell into two daughter cells.',
          location: [
            'End stage of cell division.'
          ],
          function: [
            'Reconstructs the interphase nuclear architecture and physically divides the cytoplasm (Cytokinesis).'
          ],
          appearance: 'A dumbbell or hourglass-shaped pinched cell possessing a deep central waist (Cleavage Furrow) and two distinct re-forming nuclei.',
          identificationClues: [
            'Pinched cell with two newly formed daughter nuclei.',
            'Animal cells: Cleavage Furrow pinching from outside inward.',
            'Plant cells: Cell Plate (phragmoplast) forming a new wall from inside outward.'
          ],
          examClue: 'Hourglass pinched cell with Cleavage Furrow = TELOPHASE & CYTOKINESIS.',
          arabicNote: 'الطور النهائي: يتخسر السيتوبلازم بواسطة حلقة الانقباض وتتكون نواتان جديدتان.'
        }
      },
      {
        id: 'l7_s5',
        slideNumber: 5,
        title: 'Practical Spotter: Mitosis Stages',
        titleAr: 'اختبار عملي: التعرف على طور الانقسام',
        type: 'quiz',
        quiz: {
          prompt: 'Station 07 — Mitosis stage microscopic spotter:',
          image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Micrograph showing linear alignment of chromosomes along cell equator',
          question: 'In this dividing cell, chromosomes are aligned in a straight dark linear plate across the equatorial diameter. Identify the mitotic stage:',
          options: [
            'A. Prophase',
            'B. Metaphase',
            'C. Anaphase',
            'D. Telophase'
          ],
          correctIndex: 1,
          answerTitle: 'Metaphase (الطور الاستوائي)',
          stainUsed: 'Basic Nuclear Stain',
          identificationClue: 'A crisp, straight linear plate of condensed chromosomes across the center of the cell.',
          diagnosticReason: 'Equatorial alignment is the pathognomonic hallmark of Metaphase.',
          examPearl: 'Straight line in the center = Metaphase. Two separated groups = Anaphase. Pinched waist = Telophase.'
        }
      },
      {
        id: 'l7_s6',
        slideNumber: 6,
        title: 'Lesson 07: Quick Review',
        titleAr: 'مراجعة سريعة لأطوار الانقسام الخلوي',
        type: 'review',
        review: {
          title: 'Lesson 07 Summary: Mitosis Diagnostic Guide',
          subtitle: 'Pathognomonic Microscopic Clues for the 4 Mitotic Phases',
          rows: [
            {
              structure: 'Prophase',
              stain: 'Nuclear Stain',
              appearance: 'Tangled dark ball of yarn',
              clue: 'Chromatin condensed; nucleolus and envelope gone',
              pearl: 'Scattered, non-aligned chromosomes.'
            },
            {
              structure: 'Metaphase',
              stain: 'Nuclear Stain',
              appearance: 'Straight linear plate at equator',
              clue: 'Crisp alignment along equatorial diameter',
              pearl: 'Easiest phase to identify; used for karyotyping.'
            },
            {
              structure: 'Anaphase',
              stain: 'Nuclear Stain',
              appearance: 'Two separated V-shaped clusters',
              clue: 'Wide clear central gap between retreating groups',
              pearl: 'Shortest duration phase.'
            },
            {
              structure: 'Telophase / Cytokinesis',
              stain: 'Nuclear Stain',
              appearance: 'Hourglass pinched cell with 2 nuclei',
              clue: 'Cleavage furrow pinching cytoplasm',
              pearl: 'Animal: Cleavage furrow; Plant: Cell plate.'
            }
          ],
          takeaways: [
            'Prophase: Tangled chromatin, no nuclear boundary.',
            'Metaphase: Linear equatorial plate (crisp straight line).',
            'Anaphase: Two retreating V-shaped chromosome clusters.',
            'Telophase: Hourglass pinching with cleavage furrow.'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 08: EPITHELIAL TISSUE (ALL 9 TYPES)
  // ==========================================
  {
    id: 'lesson_08',
    lessonNumber: 8,
    numberString: 'LESSON 08',
    titleEn: 'Epithelial Tissue',
    titleAr: 'النسيج الطلائي (الأنواع التسعة المعتمدة)',
    badge: '9 TISSUE TYPES',
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Simple (Squamous, Cuboidal, Columnar, Pseudostratified) and Stratified (Squamous Keratinized/Non-keratinized, Cuboidal, Columnar, Transitional).',
    summaryAr: 'الطلائي البسيط (الحرشفية، المكعبة، العمودية، الكاذبة) والمطبق (الحرشفي المتقرن وغير المتقرن، المكعب، العمودي، والانتقالي).',
    durationMinutes: 24,
    keyConcepts: ['Simple Squamous & Cuboidal', 'Pseudostratified Ciliated (Trachea)', 'Stratified Squamous (Skin/Esophagus)', 'Transitional (Urothelium)'],
    slides: [
      {
        id: 'l8_s1',
        slideNumber: 1,
        title: 'Simple Squamous & Simple Cuboidal',
        titleAr: 'الظهارة الحرشفية البسيطة والمكعبة البسيطة',
        type: 'explanatory',
        explanatory: {
          structureName: 'Simple Squamous vs Simple Cuboidal Epithelium',
          structureNameAr: 'الظهارة الحرشفية البسيطة والمكعبة البسيطة',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Micrograph of renal cortex showing simple cuboidal tubule cells and simple squamous capsule',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'blue',
          definition: 'Single cell layer resting on a basement membrane. Squamous = flattened scale-like cells with flat disc-like nuclei; Cuboidal = cube-like cells with spherical central nuclei.',
          location: [
            'Simple Squamous: Lung alveoli, kidney Bowman’s capsule, vascular endothelium, serosal mesothelium.',
            'Simple Cuboidal: Kidney convoluted tubules, thyroid gland follicles, surface of ovary.'
          ],
          function: [
            'Squamous: Rapid passive gas diffusion (lungs) and liquid filtration (renal glomerulus).',
            'Cuboidal: Active reabsorption and secretion (kidney tubules, thyroid hormone production).'
          ],
          appearance: 'Squamous: Ultra-thin cytoplasmic ribbons with bulging flattened nuclei. Cuboidal: Square cells forming rings around a central lumen with round, perfectly centered nuclei.',
          identificationClues: [
            'Kidney tubules: Single row of square cells with round central nuclei = Simple Cuboidal.',
            'Blood vessel lining or alveolar wall: Ultra-thin line with flattened nucleus = Simple Squamous.'
          ],
          examClue: 'Round central nuclei in tubular rings = SIMPLE CUBOIDAL (Kidney tubules).',
          arabicNote: 'الحرشفية البسيطة: طبقة واحدة مسطحة لترشيح الغازات؛ المكعبة البسيطة: طبقة مكعبة بأنوية دائرية مركزية لإعادة الامتصاص.'
        }
      },
      {
        id: 'l8_s2',
        slideNumber: 2,
        title: 'Simple Columnar & Pseudostratified Ciliated',
        titleAr: 'الظهارة العمودية البسيطة والمطبقة الكاذبة المهدبة',
        type: 'explanatory',
        explanatory: {
          structureName: 'Simple Columnar vs Pseudostratified Ciliated Epithelium',
          structureNameAr: 'الظهارة العمودية البسيطة والمطبقة الكاذبة المهدبة',
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Respiratory mucosa of trachea showing pseudostratified ciliated columnar epithelium and goblet cells',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'cyan',
          definition: 'Simple Columnar: Single layer of tall rectangular cells with oval basal nuclei. Pseudostratified: Single layer where ALL cells touch the basement membrane, but nuclei lie at different heights giving a false multi-layered look.',
          location: [
            'Simple Columnar: Stomach lining, small and large intestine, gallbladder (often with microvilli/brush border).',
            'Pseudostratified Ciliated Columnar with Goblet Cells: Trachea, bronchi, and nasal cavity (Respiratory Epithelium).'
          ],
          function: [
            'Columnar: Absorption of nutrients and mucus secretion.',
            'Pseudostratified: Mucociliary escalator: goblet cells trap inhaled dust; apical cilia sweep mucus upward away from lungs.'
          ],
          appearance: 'Pseudostratified: Nuclei at staggered levels, clear pale goblet cells, prominent luminal border of dense hair-like cilia, resting on a thick basement membrane.',
          identificationClues: [
            'Trachea: Multi-tiered nuclei + apical cilia fringe + goblet cells resting on hyaline cartilage = Pseudostratified Ciliated Columnar.'
          ],
          examClue: 'Cilia + Goblet cells + Multi-tiered nuclei in Trachea = PSEUDOSTRATIFIED CILIATED COLUMNAR EPITHELIUM.',
          arabicNote: 'المطبقة الكاذبة المهدبة في القصبة الهوائية: جميع الخلايا تلامس الغشاء القاعدي ولكن أنويتها على ارتفاعات مختلفة مع أهداب سطحية.'
        }
      },
      {
        id: 'l8_s3',
        slideNumber: 3,
        title: 'Stratified Squamous: Keratinized vs Non-Keratinized',
        titleAr: 'الظهارة المطبقة الحرشفية: المتقرنة (الجلد) وغير المتقرنة (المريء)',
        type: 'explanatory',
        explanatory: {
          structureName: 'Stratified Squamous Epithelium (Keratinized vs Non-Keratinized)',
          structureNameAr: 'الظهارة المطبقة الحرشفية (متقرنة وغير متقرنة)',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Epidermis of skin showing basal cells, prickle layer, and superficial dead eosinophilic keratin sheets',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'amber',
          definition: 'Multi-layered epithelium where basal cells are cuboidal/columnar, intermediate cells are polygonal, and superficial cells are flattened squamous plates.',
          location: [
            'Keratinized: Epidermis of skin (thick and thin skin).',
            'Non-Keratinized: Wet internal orifices: Oral cavity, esophagus, vagina, anal canal.'
          ],
          function: [
            'Maximum protection against mechanical abrasion, friction, water loss, and microbial invasion.'
          ],
          appearance: 'Keratinized (Skin): Superficial layers consist of dead, acellular, wavy, bright pink keratin sheets lacking nuclei (stratum corneum). Non-Keratinized (Esophagus): Superficial flattened cells retain viable, visible dark nuclei and there is NO keratin layer.',
          identificationClues: [
            'Superficial layer flat and dead with NO nuclei = Keratinized (Skin).',
            'Superficial layer flat with VISIBLE nuclei = Non-Keratinized (Esophagus).'
          ],
          examClue: 'Nuclei present on outermost flat cells → Non-Keratinized. No nuclei on top (only wavy pink keratin) → Keratinized.',
          arabicNote: 'المتقرنة (الجلد): الطبقة السطحية كيراتين ميت بدون أنوية؛ غير المتقرنة (المريء): تحتفظ الأنوية السطحية بوجودها.'
        }
      },
      {
        id: 'l8_s4',
        slideNumber: 4,
        title: 'Transitional Epithelium (Urothelium)',
        titleAr: 'الظهارة الانتقالية (المثانة البولية - Urothelium)',
        type: 'explanatory',
        explanatory: {
          structureName: 'TRANSITIONAL EPITHELIUM (UROTHELIUM)',
          structureNameAr: 'الظهارة الانتقالية (نسيج المثانة والحالب)',
          image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Urinary bladder urothelium showing large dome-shaped umbrella cells bulging into the lumen',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'purple',
          definition: 'A specialized stratified epithelium exclusive to the urinary tract (calyces, renal pelvis, ureter, bladder), capable of accommodating dramatic volume and pressure changes.',
          location: [
            'Renal pelvis, ureters, urinary bladder, and proximal urethra.'
          ],
          function: [
            'Accommodates organ distension without rupture (cells slide over one another during bladder filling).',
            'Forms an impermeable osmotic and chemical barrier against hypertonic, toxic urine (uroplakin plaques).'
          ],
          appearance: 'In empty/relaxed state: 5–8 cell layers deep; surface is scalloped with large pillowy, dome-shaped "Umbrella Cells" bulging into the lumen; frequently binucleate (two nuclei); intermediate cells are pear-shaped.',
          identificationClues: [
            'Large convex dome/umbrella cells on the surface.',
            'Frequent binucleate umbrella cells.',
            'Organ source: Urinary bladder or ureter.'
          ],
          examClue: 'Dome-shaped umbrella cells + Binucleated surface cells = TRANSITIONAL EPITHELIUM (Urinary Bladder).',
          arabicNote: 'الظهارة الانتقالية: خاصة بالجهاز البولي، وتتميز بخلايا سطحية محدبة تشبه المظلة (Umbrella cells) قد تكون ثنائية النواة.'
        }
      },
      {
        id: 'l8_s5',
        slideNumber: 5,
        title: 'Practical Spotter: Epithelial Slide OSPE',
        titleAr: 'اختبار عملي: التعرف على النسيج الطلائي',
        type: 'quiz',
        quiz: {
          prompt: 'Station 08 — Practical OSPE slide identification question:',
          image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Micrograph of hollow pelvic organ lining displaying dome cells and intermediate layers',
          question: 'Examine the luminal surface cells of this hollow pelvic organ. Identify the epithelium and organ source:',
          options: [
            'A. Keratinized Stratified Squamous — Skin',
            'B. Transitional Epithelium (Urothelium) — Urinary Bladder',
            'C. Pseudostratified Ciliated Columnar — Trachea',
            'D. Simple Columnar Epithelium — Stomach'
          ],
          correctIndex: 1,
          answerTitle: 'Transitional Epithelium (Urothelium) — Urinary Bladder',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Large dome-shaped umbrella cells bulging convexly into the lumen, with intermediate pear-shaped cells.',
          diagnosticReason: 'Dome cells and frequent binucleate cells are pathognomonic of urinary bladder urothelium.',
          examPearl: 'If surface cells are round dome-shaped (not flat) → Transitional Epithelium.'
        }
      },
      {
        id: 'l8_s6',
        slideNumber: 6,
        title: 'Lesson 08: Quick Review',
        titleAr: 'مراجعة سريعة للأنواع التسعة للأنسجة الطلائية',
        type: 'review',
        review: {
          title: 'Lesson 08 Summary: Epithelial Classification',
          subtitle: 'The 9 Classical Epithelial Tissues and Key Exam Organs',
          rows: [
            {
              structure: 'Simple Squamous',
              stain: 'H&E',
              appearance: 'Ultra-thin single layer, flat nuclei',
              clue: 'Lining of blood vessels (endothelium) & lung alveoli',
              pearl: 'Diffusion and filtration barrier.'
            },
            {
              structure: 'Simple Cuboidal',
              stain: 'H&E',
              appearance: 'Single layer of square cells, round central nuclei',
              clue: 'Renal convoluted tubules & thyroid follicles',
              pearl: 'Kidney tubule cross-sections.'
            },
            {
              structure: 'Simple Columnar',
              stain: 'H&E',
              appearance: 'Single layer of tall cells, oval basal nuclei',
              clue: 'Stomach, small intestine, gallbladder',
              pearl: 'Absorption & secretion (often has brush border).'
            },
            {
              structure: 'Pseudostratified Ciliated',
              stain: 'H&E',
              appearance: 'Multi-tiered nuclei, cilia fringe, goblet cells',
              clue: 'Trachea (respiratory mucosa) over hyaline cartilage',
              pearl: 'All cells touch basement membrane.'
            },
            {
              structure: 'Stratified Squamous Keratinized',
              stain: 'H&E',
              appearance: 'Multi-layered; top dead pink keratin (no nuclei)',
              clue: 'Epidermis of skin',
              pearl: 'Acellular stratum corneum on surface.'
            },
            {
              structure: 'Stratified Squamous Non-Keratinized',
              stain: 'H&E',
              appearance: 'Multi-layered; flat top cells RETAIN nuclei',
              clue: 'Esophagus & oral cavity',
              pearl: 'Wet protective surface with visible nuclei.'
            },
            {
              structure: 'Transitional (Urothelium)',
              stain: 'H&E',
              appearance: 'Dome-shaped umbrella cells, binucleate',
              clue: 'Urinary bladder & ureter',
              pearl: 'Pillowy dome surface; distensible.'
            }
          ],
          takeaways: [
            'Simple = 1 layer (Squamous = flat, Cuboidal = square, Columnar = tall).',
            'Trachea = Pseudostratified Ciliated Columnar with Goblet Cells.',
            'Skin = Keratinized (dead top); Esophagus = Non-keratinized (living top nuclei).',
            'Urinary bladder = Transitional (dome/umbrella cells).'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 09: CONNECTIVE TISSUE (ALL 7 TYPES)
  // ==========================================
  {
    id: 'lesson_09',
    lessonNumber: 9,
    numberString: 'LESSON 09',
    titleEn: 'Connective Tissue',
    titleAr: 'النسيج الضام (الأنواع السبعة المعتمدة)',
    badge: '7 TISSUE TYPES',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Loose (Areolar, Adipose, Reticular, Mucoid) and Dense (Regular Tendon, Irregular Dermis, Elastic Aorta).',
    summaryAr: 'الضام الرخو (الخلالي، الشحمي، الشبكي، المخاطاني) والكثيف (المنتظم بالوتر، غير المنتظم بالأدمة، والمرن بالأبهر).',
    durationMinutes: 22,
    keyConcepts: ['Areolar (Collagen + Elastic)', 'Adipose (Signet-ring)', 'Dense Regular Tendon', 'Dense Irregular Dermis'],
    slides: [
      {
        id: 'l9_s1',
        slideNumber: 1,
        title: 'Loose Connective Tissue: Areolar & Adipose',
        titleAr: 'النسيج الضام الرخو: الخلالي (Areolar) والشحمي (Adipose)',
        type: 'explanatory',
        explanatory: {
          structureName: 'Areolar vs Adipose Connective Tissue',
          structureNameAr: 'النسيج الضام الخلالي والنسيج الشحمي',
          image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Micrograph of unilocular adipose tissue showing signet-ring cells and delicate reticular stroma',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'amber',
          definition: 'Areolar: Generalized loose meshwork of collagen and elastic fibers with diverse cells. Adipose: Specialized connective tissue dominated by lipid-storing adipocytes.',
          location: [
            'Areolar: Lamina propria beneath all epithelia, surrounding blood vessels and nerves.',
            'Adipose: Subcutaneous tissue (hypodermis), renal fat pad, mesentery, greater omentum.'
          ],
          function: [
            'Areolar: Cushions organs, provides vascular pathways, site of immune inflammatory responses.',
            'Adipose: Thermal insulation, mechanical shock absorption, energy reserve (triglycerides), endocrine secretion (leptin).'
          ],
          appearance: 'Adipose tissue exhibits a classic "chicken-wire" or "honeycomb" meshwork of large clear polygonal spaces. The lipid droplet was dissolved by xylene during processing, leaving an empty center with the nucleus compressed flat against the cell margin ("Signet-Ring" appearance).',
          identificationClues: [
            'Empty polygonal honeycomb compartments with flat peripheral nuclei = Adipose Tissue.',
            'Why empty? Organic clearing solvent (xylene) dissolves triglycerides.'
          ],
          examClue: 'Honeycomb meshwork + Peripheral flattened nucleus ("Signet-ring") = ADIPOSE TISSUE.',
          arabicNote: 'النسيج الشحمي يظهر كأقراص فارغة تشبه عش النحل مع نواة طرفية منضغطة تشبه الخاتم (Signet ring).'
        }
      },
      {
        id: 'l9_s2',
        slideNumber: 2,
        title: 'Dense Regular Connective Tissue: Tendon',
        titleAr: 'النسيج الضام الكثيف المنتظم: وتر العضلة (Tendon)',
        type: 'explanatory',
        explanatory: {
          structureName: 'DENSE REGULAR CONNECTIVE TISSUE (TENDON)',
          structureNameAr: 'النسيج الضام الكثيف المنتظم (وتر العضلة)',
          image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Longitudinal section of tendon showing densely packed parallel collagen bundles and linear rows of fibrocytes',
          stain: 'Hematoxylin & Eosin (H&E)',
          stainBadgeColor: 'rose',
          definition: 'Connective tissue dominated by dense, parallel arrays of Type I collagen fibers designed to withstand extreme unidirectional tensile pull.',
          location: [
            'Tendons (attaching muscle to bone), ligaments (bone to bone), and aponeuroses.'
          ],
          function: [
            'Transmits mechanical pulling force from contracting muscle to bone with minimal stretch and high resistance.'
          ],
          appearance: 'Wavy, densely packed parallel sheets and ribbons of eosinophilic (pink) Type I collagen fibers. Interspersed between bundles are neat single-file linear rows of compressed, dark, flattened fibrocyte nuclei (tendon cells / tenocytes). Ground substance is minimal.',
          identificationClues: [
            'Parallel ribbons of dense pink collagen.',
            'Dark flattened nuclei lined up in single-file linear rows.',
            'Specimen source: Tendon (longitudinal section).'
          ],
          examClue: 'Parallel wavy collagen ribbons + Single-file linear rows of dark fibrocyte nuclei = TENDON (Dense Regular CT).',
          arabicNote: 'النسيج الضام الكثيف المنتظم (الوتر): حزم كولاجين متوازية كثيفة بينها صفوف منتظمة من أنوية الخلايا الوترية.'
        }
      },
      {
        id: 'l9_s3',
        slideNumber: 3,
        title: 'Dense Irregular & Elastic Connective Tissue',
        titleAr: 'النسيج الضام الكثيف غير المنتظم والمرن (Dermis & Aorta)',
        type: 'explanatory',
        explanatory: {
          structureName: 'Dense Irregular CT vs Elastic Tissue',
          structureNameAr: 'النسيج الضام الكثيف غير المنتظم والنسيج المرن',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Dermis showing interwoven multidirectional coarse collagen bundles',
          stain: 'H&E / Orcein',
          stainBadgeColor: 'purple',
          definition: 'Dense Irregular: Coarse collagen bundles arranged in random 3D multidirectional weave to resist multidirectional stresses. Elastic: Dense parallel sheets of elastic lamellae providing recoil.',
          location: [
            'Dense Irregular: Reticular layer of skin dermis, submucosa of gastrointestinal tract, fibrous organ capsules (kidney, spleen, lymph node).',
            'Elastic Tissue: Media of large elastic arteries (Aorta), ligamentum nuchae, vocal cords.'
          ],
          function: [
            'Dense Irregular: Resists mechanical tearing and stretching forces from all directions.',
            'Elastic: Expands during cardiac ventricular systole and recoils during diastole to smooth pulsatile blood flow.'
          ],
          appearance: 'Dense Irregular: Thick, coarse pink collagen bundles traveling in all orientations (criss-cross pattern). Elastic (Aorta with Orcein): Dark brown or purplish wavy fenestrated elastic lamellae running concentrically.',
          identificationClues: [
            'Random interwoven pink bundles under skin epidermis = Reticular Dermis (Dense Irregular CT).',
            'Wavy concentric elastic ribbons in artery wall = Aorta (Elastic CT).'
          ],
          examClue: 'Random criss-cross collagen bundles in skin = DENSE IRREGULAR CT (Reticular Dermis).',
          arabicNote: 'الكثيف غير المنتظم (أدمة الجلد): حزم كولاجين متشابكة في كل الاتجاهات لمقاومة الشد متعدد الاتجاهات.'
        }
      },
      {
        id: 'l9_s4',
        slideNumber: 4,
        title: 'Practical Spotter: Connective Tissue OSPE',
        titleAr: 'اختبار عملي: التعرف على النسيج الضام',
        type: 'quiz',
        quiz: {
          prompt: 'Station 09 — Connective tissue spotter question:',
          image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'High power longitudinal micrograph of high-tensile musculoskeletal organ',
          question: 'Examine this high-tensile specimen showing parallel collagen ribbons with single-file rows of flattened nuclei. Identify the tissue and organ source:',
          options: [
            'A. Dense Irregular Connective Tissue — Reticular Dermis',
            'B. Dense Regular Connective Tissue — Tendon',
            'C. Skeletal Muscle Tissue',
            'D. Smooth Muscle Tissue'
          ],
          correctIndex: 1,
          answerTitle: 'Dense Regular Connective Tissue — Tendon',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Dense parallel bundles of pink collagen fibers with neat single-file rows of flattened fibrocyte nuclei.',
          diagnosticReason: 'Unidirectional parallel orientation with rows of tenocytes is pathognomonic of tendon.',
          examPearl: 'If collagen bundles are parallel in rows → Tendon. If random criss-cross → Dermis.'
        }
      },
      {
        id: 'l9_s5',
        slideNumber: 5,
        title: 'Lesson 09: Quick Review',
        titleAr: 'مراجعة سريعة لأنواع النسيج الضام السبعة',
        type: 'review',
        review: {
          title: 'Lesson 09 Summary: Connective Tissue Guide',
          subtitle: 'The 7 Essential Connective Tissue Types and Key Exam Findings',
          rows: [
            {
              structure: 'Areolar CT',
              stain: 'H&E',
              appearance: 'Loose meshwork of fibers & cells',
              clue: 'Lamina propria & under skin',
              pearl: 'Universal packing and cushioning tissue.'
            },
            {
              structure: 'Adipose Tissue',
              stain: 'H&E / Sudan III',
              appearance: 'Honeycomb mesh, signet-ring cells',
              clue: 'Lipid dissolved by xylene leaving empty space',
              pearl: 'Flattened peripheral crescent nucleus.'
            },
            {
              structure: 'Reticular CT',
              stain: 'Silver Impregnation',
              appearance: 'Black branching reticular mesh',
              clue: 'Spleen, lymph nodes, liver stroma',
              pearl: 'Type III collagen; supports immune cells.'
            },
            {
              structure: 'Mucoid CT',
              stain: 'H&E / Alcian Blue',
              appearance: 'Gelatinous matrix, star-shaped cells',
              clue: "Umbilical cord (Wharton's Jelly)",
              pearl: 'Rich in hyaluronic acid ground substance.'
            },
            {
              structure: 'Dense Regular CT',
              stain: 'H&E',
              appearance: 'Parallel collagen ribbons, rows of fibrocytes',
              clue: 'Tendon & ligaments',
              pearl: 'Withstands extreme unidirectional tension.'
            },
            {
              structure: 'Dense Irregular CT',
              stain: 'H&E',
              appearance: 'Random criss-cross coarse collagen weave',
              clue: 'Reticular layer of skin dermis',
              pearl: 'Resists multi-directional mechanical stresses.'
            },
            {
              structure: 'Elastic CT',
              stain: 'Orcein / Resorcin-fuchsin',
              appearance: 'Dark wavy concentric elastic ribbons',
              clue: 'Wall of large arteries (Aorta)',
              pearl: 'Provides arterial elastic recoil.'
            }
          ],
          takeaways: [
            'Adipose: Honeycomb empty rings with peripheral flattened nucleus (Signet-ring).',
            'Tendon: Parallel collagen bundles with single-file rows of fibrocytes.',
            'Dermis: Multidirectional random collagen weave (Dense Irregular CT).',
            'Aorta: Concentric wavy elastic lamellae (Elastic CT).'
          ]
        }
      }
    ]
  },

  // ==========================================
  // LESSON 10: PRACTICAL IDENTIFICATION & OSPE EXAM
  // ==========================================
  {
    id: 'lesson_10',
    lessonNumber: 10,
    numberString: 'LESSON 10',
    titleEn: 'OSPE Practical Exam Simulator',
    titleAr: 'محاكي الامتحان العملي الشامل (OSPE Spotters)',
    badge: 'OSPE EXAM',
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    summaryEn: 'Comprehensive timed practical spotter stations simulating the official Sana’a University 1st-Year Histology exam.',
    summaryAr: 'محطات الامتحان العملي بالوقت المحدد لمحاكاة الامتحان الفصلي الرسمي بكلية الطب - جامعة صنعاء.',
    durationMinutes: 25,
    keyConcepts: ['Timed Stations', 'High-Yield Spotters', 'Checklist Scoring', 'Virtual Objective Switching (4x–100x)'],
    slides: [
      {
        id: 'l10_s1',
        slideNumber: 1,
        title: 'Station 1: Simple Cuboidal (Kidney)',
        titleAr: 'المحطة 1: الظهارة المكعبة البسيطة (الكلية)',
        type: 'quiz',
        quiz: {
          prompt: 'Station 01 / 06 — Examine the pointed circular tubular structures under 40x:',
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Renal cortex showing tubules lined by simple cuboidal epithelium',
          question: 'A) Identify the lining epithelium; B) Identify the organ source:',
          options: [
            'A. Simple Squamous Epithelium — Lung',
            'B. Simple Cuboidal Epithelium — Kidney Cortex (Renal Tubules)',
            'C. Transitional Epithelium — Urinary Bladder',
            'D. Stratified Cuboidal Epithelium — Sweat Gland Duct'
          ],
          correctIndex: 1,
          answerTitle: 'Simple Cuboidal Epithelium — Kidney Cortex',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Single layer of cube-like cells with round, perfectly centered nuclei forming circular tubular cross-sections.',
          diagnosticReason: 'Cube height equals width; spherical central nucleus is characteristic of renal tubules.',
          examPearl: 'Key OSPE question: "Name one site in the human body" → Kidney convoluted tubules or thyroid follicles.'
        }
      },
      {
        id: 'l10_s2',
        slideNumber: 2,
        title: 'Station 2: Pseudostratified Ciliated (Trachea)',
        titleAr: 'المحطة 2: الظهارة المطبقة الكاذبة المهدبة (القصبة)',
        type: 'quiz',
        quiz: {
          prompt: 'Station 02 / 06 — Examine this respiratory mucosal lining:',
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Trachea respiratory mucosa with apical cilia and goblet cells',
          question: 'Identify the epithelium and the specialized apical surface modification indicated at the luminal border:',
          options: [
            'A. Simple Columnar Epithelium with Microvilli',
            'B. Pseudostratified Ciliated Columnar with Goblet Cells — Cilia',
            'C. Keratinized Stratified Squamous — Keratin',
            'D. Transitional Epithelium — Umbrella Cells'
          ],
          correctIndex: 1,
          answerTitle: 'Pseudostratified Ciliated Columnar with Goblet Cells — Cilia',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Multi-tiered nuclei at varied heights, apical hair-like cilia, and clear goblet cells.',
          diagnosticReason: 'Cilia sweep mucus in respiratory tract; resting on underlying hyaline cartilage ring.',
          examPearl: 'All cells contact the basement membrane, making it pseudostratified, not truly stratified.'
        }
      },
      {
        id: 'l10_s3',
        slideNumber: 3,
        title: 'Station 3: Keratinized Stratified Squamous (Skin)',
        titleAr: 'المحطة 3: الظهارة المطبقة الحرشفية المتقرنة (الجلد)',
        type: 'quiz',
        quiz: {
          prompt: 'Station 03 / 06 — Examine this cutaneous biopsy section under 20x:',
          image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Epidermis of skin showing stratum corneum and basal layer',
          question: 'Why is the uppermost layer (stratum corneum) acellular and eosinophilic?',
          options: [
            'A. Artifact due to incomplete formalin fixation',
            'B. The cells have undergone cornification, losing nuclei to form dense dead keratin sheets',
            'C. It is an artifact created by excessive xylene clearing',
            'D. It consists of extracellular elastin fibers secreted by tenocytes'
          ],
          correctIndex: 1,
          answerTitle: 'Cornification & Keratinization — Dead Keratin Sheets',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Multi-layered epithelium topped with wavy bright pink acellular sheets devoid of nuclei.',
          diagnosticReason: 'Epidermal keratinocytes accumulate tonofilaments, degrade nuclei/organelles, and form protective keratin.',
          examPearl: 'In esophagus (non-keratinized), flat surface cells KEEP their nuclei.'
        }
      },
      {
        id: 'l10_s4',
        slideNumber: 4,
        title: 'Station 4: Transitional Epithelium (Bladder)',
        titleAr: 'المحطة 4: الظهارة الانتقالية (المثانة)',
        type: 'quiz',
        quiz: {
          prompt: 'Station 04 / 06 — Examine the mucosal lining of this hollow pelvic organ:',
          image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Urinary bladder urothelium showing umbrella cells bulging into lumen',
          question: 'What is the diagnostic name of the outermost surface cells bulging convexly into the lumen?',
          options: [
            'A. Goblet cells',
            'B. Umbrella cells (Dome cells)',
            'C. Paneth cells',
            'D. Prickle cells'
          ],
          correctIndex: 1,
          answerTitle: 'Umbrella Cells (Dome Cells / الخلايا المظلية)',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Large rounded dome-shaped surface cells, frequently binucleated, bulging convexly into the lumen.',
          diagnosticReason: 'Umbrella cells protect underlying tissues from urine toxicity and stretch during filling.',
          examPearl: 'Dome-shaped surface + frequent binucleation = Transitional Epithelium (Urinary Bladder).'
        }
      },
      {
        id: 'l10_s5',
        slideNumber: 5,
        title: 'Station 5: Dense Regular CT (Tendon)',
        titleAr: 'المحطة 5: النسيج الضام الكثيف المنتظم (الوتر)',
        type: 'quiz',
        quiz: {
          prompt: 'Station 05 / 06 — Examine this high-tensile musculoskeletal specimen:',
          image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Longitudinal section of tendon with parallel collagen ribbons and rows of fibrocytes',
          question: 'What cell type possesses the dark flattened nuclei arranged in single-file linear rows between collagen bundles?',
          options: [
            'A. Adipocytes',
            'B. Tenocytes / Fibrocytes (Tendon Cells)',
            'C. Chondrocytes',
            'D. Plasma cells'
          ],
          correctIndex: 1,
          answerTitle: 'Tenocytes / Fibrocytes (Tendon Cells)',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Dark rod-shaped flattened nuclei aligned in neat single-file rows between parallel collagen bundles.',
          diagnosticReason: 'Inactive tenocytes are compressed by dense parallel Type I collagen fibers.',
          examPearl: 'Tendon = Dense Regular CT; Dermis = Dense Irregular CT.'
        }
      },
      {
        id: 'l10_s6',
        slideNumber: 6,
        title: 'Station 6: Adipose Tissue (White Fat)',
        titleAr: 'المحطة 6: النسيج الضام الشحمي (الخلايا الدهنية)',
        type: 'quiz',
        quiz: {
          prompt: 'Station 06 / 06 — Examine this subcutaneous adipose tissue biopsy:',
          image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1000&auto=format&fit=crop&q=80',
          imageAlt: 'Adipose tissue showing signet-ring honeycomb pattern',
          question: 'Why does the cytoplasm of adipocytes appear completely clear and empty under routine H&E paraffin sections?',
          options: [
            'A. Adipocytes contain no cytoplasm or organelles naturally',
            'B. Lipid droplets are dissolved and extracted by alcohol and xylene during routine tissue processing',
            'C. Formalin fixation evaporates triglycerides into water',
            'D. Eosin and hematoxylin repel lipid membranes'
          ],
          correctIndex: 1,
          answerTitle: 'Lipid Extraction by Organic Solvents (Alcohol & Xylene)',
          stainUsed: 'Hematoxylin & Eosin (H&E)',
          identificationClue: 'Honeycomb or chicken-wire empty spaces with peripheral flattened nuclei ("Signet-ring" appearance).',
          diagnosticReason: 'Organic clearing agents dissolve neutral fats. To demonstrate lipids, use frozen sections with Sudan III.',
          examPearl: 'To preserve and stain lipids → Cryostat (frozen section) + Sudan III / Oil Red O.'
        }
      }
    ]
  }
];
