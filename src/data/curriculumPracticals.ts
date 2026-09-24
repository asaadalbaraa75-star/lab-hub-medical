import { Practical } from '../types';

export const ADDITIONAL_PRACTICALS: Practical[] = [
  // ==================== ANATOMY ====================
  {
    id: 'prac_anat_01',
    courseId: 'anatomy',
    categoryId: 'anat_bones',
    practicalNumber: 1,
    title: 'Cranial Osteology & Skull Base Foramina',
    subTitle: 'Systematic Identification of Neurovascular Openings and Calvarial Landmarks',
    estimatedTime: '50 mins',
    version: '2.0',
    lastUpdated: 'Aug 28, 2026',
    status: 'published',
    authorName: 'Prof. Marcus Brody, PhD',
    authorRole: 'Department of Anatomy',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 29, 2026',
    learningObjectives: [
      'Identify the three cranial fossae (anterior, middle, posterior) on a dried human skull.',
      'Locate key foramina including cribriform plate, optic canal, superior orbital fissure, foramen rotundum, ovale, spinosum, and jugular foramen.',
      'Correlate each foramen with the specific cranial nerves and vascular structures passing through it.',
      'Examine common skull fractures and signs of base-of-skull injury (Battle sign, raccoon eyes).'
    ],
    beforeTheLab: {
      previousKnowledge: [
        'Gross divisions of the human central nervous system.',
        'General terminology for cranial bones (frontal, parietal, sphenoid, temporal, occipital).'
      ],
      recommendedReading: [
        "Moore's Clinically Oriented Anatomy (9th Ed.), Chapter 8: Head, pp. 820-855."
      ],
      preparationChecklist: [
        { id: 'chk_a1_1', text: 'Review cranial nerve exit pathways from brainstem to periphery' },
        { id: 'chk_a1_2', text: 'Memorize the contents of the superior orbital fissure' }
      ],
      preLabSummary: 'The skull base is divided into three stepped cranial fossae. Each fossa houses specific brain regions and features distinct foramina transmitting cranial nerves and vessels.'
    },
    equipment: [
      {
        id: 'eq_anat_skull',
        name: 'Articulated & Disarticulated Adult Human Skulls',
        description: 'Natural dried adult human specimens with calvaria cut horizontally to expose the endocranial floor.'
      },
      {
        id: 'eq_anat_probe',
        name: 'Flexible Blunt Neurovascular Probes',
        description: 'Non-metallic probes used to trace foraminal trajectories without damaging fragile bony septa.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Anterior Cranial Fossa Inspection',
        description: 'Locate the crista galli and the surrounding sieve-like cribriform plate of the ethmoid bone transmitting CN I (Olfactory nerve fibers).'
      },
      {
        stepNumber: 2,
        title: 'Middle Cranial Fossa & Sphenoid Bone',
        description: 'Identify the sella turcica, chiasmatic sulcus, and trace CN II through the optic canal. Lateral to the sella, identify the superior orbital fissure, foramen rotundum, foramen ovale, and foramen spinosum (ROS mnemonic).'
      },
      {
        stepNumber: 3,
        title: 'Posterior Cranial Fossa & Foramen Magnum',
        description: 'Identify the internal acoustic meatus (CN VII, VIII), jugular foramen (CN IX, X, XI, internal jugular vein), hypoglossal canal (CN XII), and the foramen magnum transmitting the brainstem and vertebral arteries.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        caption: 'Superior view of the internal skull base demonstrating the anterior, middle, and posterior cranial fossae with prominent foraminal pathways.',
        magnification: 'Gross Specimen',
        stainOrView: 'Endocranial View'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Cribriform plate transmitting olfactory nerve fascicles.',
      'Optic canal medially in sphenoid lesser wing transmitting CN II and ophthalmic artery.',
      'Superior orbital fissure between sphenoid wings transmitting CN III, IV, V1, VI.',
      'Foramen rotundum transmitting maxillary nerve (CN V2).',
      'Foramen ovale transmitting mandibular nerve (CN V3) and accessory meningeal artery.',
      'Foramen spinosum transmitting middle meningeal artery.',
      'Jugular foramen transmitting CN IX, X, XI and sigmoid-to-IJV junction.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Foramen Ovale with Foramen Rotundum on endocranial view.',
        correction: 'Rotundum is located anteriorly and directs horizontally forward into pterygopalatine fossa; Ovale is posterolateral and directs vertically into infratemporal fossa.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Basilar Skull Fractures & Pterion Blow',
      diagnosticPearls: 'Blow to the temple at the pterion ruptures the anterior division of the middle meningeal artery lying deep to it, resulting in epidural (extradural) hematoma. Fractures of cribriform plate lead to CSF rhinorrhea.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Dry bone specimens must be supported with both hands; never place probes forcefully into narrow bony canals.']
    },
    references: [
      {
        title: "Gray's Anatomy for Students",
        authors: 'Drake, Vogl, Mitchell',
        editionOrYear: '4th Edition',
        pages: 'pp. 810–835'
      }
    ]
  },
  {
    id: 'prac_anat_03',
    courseId: 'anatomy',
    categoryId: 'anat_bones',
    practicalNumber: 3,
    title: 'Lower Limb Osteology — Femur, Tibia & Pelvic Girdle',
    subTitle: 'Weight-Bearing Architecture, Biomechanics & Palpable Bony Landmarks',
    estimatedTime: '45 mins',
    version: '1.9',
    lastUpdated: 'Aug 27, 2026',
    status: 'published',
    authorName: 'Prof. Marcus Brody, PhD',
    authorRole: 'Department of Anatomy',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 28, 2026',
    learningObjectives: [
      'Differentiate the anatomical features of the femur (head, fovea, neck, trochanters, condyles).',
      'Examine the angle of inclination of the femoral neck and identify coxa vara vs coxa valga.',
      'Identify proximal and distal tibial landmarks including tibial tuberosity and medial malleolus.',
      'Trace attachments of major hip and knee stabilizing ligaments (cruciates, collaterals).'
    ],
    beforeTheLab: {
      previousKnowledge: ['Basic skeletal classification of long bones.'],
      recommendedReading: ["Moore's Clinically Oriented Anatomy, Lower Limb Section, pp. 520-565."],
      preparationChecklist: [{ id: 'chk_a3_1', text: 'Review vascular supply to the femoral head (retinacular arteries)' }],
      preLabSummary: 'The pelvic girdle and femur form the primary load-bearing axis of the human body. Understanding the neck-shaft angle and vascular supply to the femoral head is essential for fracture management.'
    },
    equipment: [
      {
        id: 'eq_anat_femur',
        name: 'Dry Adult Human Femur & Tibia Specimens',
        description: 'Intact specimens showing muscular lines, intercondylar notches, and articular facets.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Femoral Head & Neck Orientation',
        description: 'Position femur with head directed medially and superiorly, and the smooth patellar groove facing anteriorly.'
      },
      {
        stepNumber: 2,
        title: 'Greater & Lesser Trochanters',
        description: 'Palpate greater trochanter laterally (abductor insertions) and lesser trochanter posteromedially (iliopsoas insertion).'
      },
      {
        stepNumber: 3,
        title: 'Distal Condylar & Intercondylar Geometry',
        description: 'Inspect medial and lateral condyles, adductor tubercle on medial epicondyle, and intercondylar fossa for cruciate ligament origins.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        caption: 'Anterior and posterior osteological views of the human right femur illustrating the femoral head, neck-shaft angle, and distal condyles.',
        magnification: 'Gross Specimen',
        stainOrView: 'Dry Bone Anatomy'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Femoral head with fovea capitis for ligamentum teres.',
      'Angle of inclination normally 125 degrees in adults.',
      'Linea aspera on posterior shaft showing medial and lateral lips.',
      'Tibial plateau with medial and lateral condyles and intercondylar eminence.'
    ],
    commonMistakes: [
      {
        mistake: 'Failing to orient anterior vs posterior surface of the femur.',
        correction: 'The linea aspera is always posterior; the smooth patellar groove is always anterior.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Femoral Neck Fracture & Avascular Necrosis (AVN)',
      diagnosticPearls: 'Subcapital fractures tear the medial circumflex femoral retinacular arteries supplying the head, predisposing to avascular necrosis. Affected limb presents shortened and externally rotated.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Support long bones over padded lab benches.']
    },
    references: [{ title: "Clinically Oriented Anatomy", authors: 'Moore & Dalley', editionOrYear: '9th Ed.', pages: 'pp. 520–550' }]
  },
  {
    id: 'prac_anat_04',
    courseId: 'anatomy',
    categoryId: 'anat_muscles',
    practicalNumber: 4,
    title: 'Pectoral Region & Brachial Plexus Dissection',
    subTitle: 'Muscular Layers, Axillary Artery Branches & Root-to-Branch Nerve Mapping',
    estimatedTime: '60 mins',
    version: '2.1',
    lastUpdated: 'Aug 29, 2026',
    status: 'published',
    authorName: 'Prof. Marcus Brody, PhD',
    authorRole: 'Department of Anatomy',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 30, 2026',
    learningObjectives: [
      'Dissect and identify pectoralis major and minor muscles, clavipectoral fascia, and subclavius.',
      'Map the roots (C5-T1), trunks, divisions, and cords of the brachial plexus in relation to the axillary artery.',
      'Identify terminal branches: Musculocutaneous, Axillary, Median, Radial, and Ulnar nerves.',
      'Correlate Erb-Duchenne palsy (upper trunk C5-C6) with characteristic waiter-tip deformity.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Spinal nerve root composition and anterior rami.'],
      recommendedReading: ["Grant's Dissector (17th Ed.), Chapter 6: Upper Limb & Axilla."],
      preparationChecklist: [{ id: 'chk_a4_1', text: 'Memorize the 5-stage schematic of the brachial plexus' }],
      preLabSummary: 'The axilla serves as the neurovascular gateway from the neck to the upper extremity. The brachial plexus cords are named strictly according to their relationship with the second part of the axillary artery.'
    },
    equipment: [
      {
        id: 'eq_anat_cadaver_axilla',
        name: 'Prosected Human Axilla Specimen',
        description: 'Cadaveric prosection displaying reflected pectoralis major and exposed axillary sheath.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Reflection of Pectoralis Major',
        description: 'Reflect the clavicular and sternocostal heads laterally to reveal the clavipectoral fascia and pectoralis minor.'
      },
      {
        stepNumber: 2,
        title: 'Axillary Sheath Exposure & Artery Stages',
        description: 'Incise the axillary sheath. Identify the 3 parts of the axillary artery relative to pectoralis minor.'
      },
      {
        stepNumber: 3,
        title: 'Trace Brachial Plexus "M" Pattern',
        description: 'Locate the lateral cord giving off musculocutaneous nerve, medial cord giving off ulnar nerve, and their converging contributions forming the median nerve over the axillary artery.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
        caption: 'Cadaveric prosection of the right axilla demonstrating the cords of the brachial plexus surrounding the axillary artery and terminal branches.',
        magnification: 'Gross Dissection',
        stainOrView: 'Cadaveric Specimen'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Pectoralis minor as the defining anatomical landmark dividing axillary artery into three parts.',
      'Musculocutaneous nerve piercing coracobrachialis.',
      'Median nerve formed by lateral and medial roots anterior to 3rd part of axillary artery.',
      'Radial nerve exiting posteriorly into radial groove with profunda brachii artery.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Ulnar nerve with Median nerve on cadaveric specimens.',
        correction: 'The median nerve has two roots forming an "M" shape over the artery; the ulnar nerve arises solely from the medial cord and descends medially without anterior crossover.'
      }
    ],
    clinicalCorrelation: {
      condition: "Erb's Palsy vs Klumpke's Palsy",
      diagnosticPearls: "Traction of upper trunk (C5-C6) leads to Erb's palsy (loss of abduction, external rotation, supination -> 'waiter tip' posture). Lower trunk traction (C8-T1) causes Klumpke claw hand.",
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'medium',
      mandatoryPPE: ['Lab Coat', 'Nitrile Gloves', 'Face Shield'],
      handlingRules: ['Keep cadaveric specimens moist with 2% phenoxyethanol moisturizing solution.']
    },
    references: [{ title: "Grant's Atlas of Anatomy", authors: 'Agur & Dalley', editionOrYear: '15th Ed.', pages: 'pp. 480–510' }]
  },
  {
    id: 'prac_anat_05',
    courseId: 'anatomy',
    categoryId: 'anat_structures',
    practicalNumber: 5,
    title: 'Thoracic Cavity & Cardiac Dissection',
    subTitle: 'Mediastinal Divisions, Heart Chambers, Coronary Circulation & Great Vessels',
    estimatedTime: '55 mins',
    version: '2.0',
    lastUpdated: 'Aug 30, 2026',
    status: 'published',
    authorName: 'Prof. Marcus Brody, PhD',
    authorRole: 'Department of Anatomy',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 31, 2026',
    learningObjectives: [
      'Define boundaries of superior and inferior (anterior, middle, posterior) mediastinum.',
      'Identify chambers, valves, and specialized conduction structures of the heart on gross specimens.',
      'Trace the coronary arterial tree (LAD, Circumflex, RCA, Posterior Descending Artery).',
      'Correlate surface anatomy of cardiac valves with optimal clinical auscultation landmarks.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Cardiovascular system physiology and pulmonary/systemic blood flow cycles.'],
      recommendedReading: ["Gray's Anatomy for Students, Thorax Chapter, pp. 120-175."],
      preparationChecklist: [{ id: 'chk_a5_1', text: 'Review cardiac auscultation points (Aortic, Pulmonic, Tricuspid, Mitral)' }],
      preLabSummary: 'The heart occupies the middle mediastinum encased within the fibroserous pericardium. The sternal angle of Louis (T4/T5 junction) is the key anatomical landmark dividing superior from inferior mediastinum.'
    },
    equipment: [
      {
        id: 'eq_anat_heart_plast',
        name: 'Plastinated Human Heart & Bovine Dissection Specimen',
        description: 'Plastinated human specimen displaying coronary vasculature, and freshly fixed dissection specimen for valve inspection.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Sternocostal Surface & Coronary Sulci',
        description: 'Orient the apex pointing inferiorly, anteriorly, and to the left. Trace the anterior interventricular sulcus and coronary groove.'
      },
      {
        stepNumber: 2,
        title: 'Right Atrium Interior Inspection',
        description: 'Open the right atrium. Identify the smooth sinus venarum, pectinate muscles of the atrium proper, crista terminalis, fossa ovalis, and coronary sinus orifice.'
      },
      {
        stepNumber: 3,
        title: 'Ventricular Cavities & Atrioventricular Valves',
        description: 'Examine the thick left ventricular wall (3x thicker than right) and identify papillary muscles and chordae tendineae attached to tricuspid and bicuspid (mitral) leaflets.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
        caption: 'Anterior gross anatomical view of human heart prosection demonstrating right ventricle, pulmonary trunk, ascending aorta, and left anterior descending artery.',
        magnification: 'Gross Specimen',
        stainOrView: 'Gross Prosection'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Sternal angle marking T4/T5 vertebral boundary and bifurcation of trachea.',
      'Left Anterior Descending (LAD) artery running in anterior interventricular groove.',
      'Fossa ovalis on interatrial septum marking remnant of fetal foramen ovale.',
      'Tricuspid valve on right; Bicuspid (Mitral) valve on left.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing the anatomical apex of the heart with the base.',
        correction: 'The apex is formed entirely by the inferolateral part of the left ventricle and points anteroinferiorly; the base is formed mainly by the left atrium and faces posteriorly.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Myocardial Infarction & Valvular Stenosis',
      diagnosticPearls: 'The LAD artery is the most commonly occluded vessel in acute coronary syndrome (the "widow maker"), causing anterior wall and apical infarction. Mitral stenosis produces an opening snap and diastolic murmur at apex.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'medium',
      mandatoryPPE: ['Lab Coat', 'Nitrile Gloves', 'Splash Goggles'],
      handlingRules: ['Rinse specimens before examination to minimize preservative vapor.']
    },
    references: [{ title: "Gray's Anatomy for Students", authors: 'Drake, Vogl, Mitchell', editionOrYear: '4th Ed.', pages: 'pp. 140–180' }]
  },
  {
    id: 'prac_anat_06',
    courseId: 'anatomy',
    categoryId: 'anat_structures',
    practicalNumber: 6,
    title: 'Abdominal Viscera & Peritoneal Reflections',
    subTitle: 'Greater and Lesser Omentum, Mesentery, Foramen of Winslow & Foregut/Midgut/Hindgut Organs',
    estimatedTime: '55 mins',
    version: '1.0',
    lastUpdated: 'Sep 02, 2026',
    status: 'draft',
    authorName: 'Prof. Marcus Brody, PhD',
    authorRole: 'Department of Anatomy',
    learningObjectives: [
      'Differentiate intraperitoneal from retroperitoneal abdominal organs.',
      'Locate the epiploic foramen of Winslow and identify structures within the free edge of the lesser omentum (portal triad).',
      'Trace blood supply of foregut (celiac trunk), midgut (SMA), and hindgut (IMA).',
      'Understand peritoneal recesses and pathways of fluid accumulation (Morison pouch).'
    ],
    beforeTheLab: {
      previousKnowledge: ['Embryological development of gut tube and rotation of stomach.'],
      recommendedReading: ["Moore's Clinically Oriented Anatomy, Abdomen Chapter."],
      preparationChecklist: [{ id: 'chk_a6_1', text: 'Review the 3 structures of the portal triad in hepatoduodenal ligament' }],
      preLabSummary: 'The peritoneal cavity is a complex potential space. The hepatoduodenal ligament contains the portal vein, proper hepatic artery, and common bile duct.'
    },
    equipment: [
      {
        id: 'eq_anat_cadaver_abdomen',
        name: 'Prosected Abdomen Cadaveric Specimen',
        description: 'Exposed peritoneal cavity with greater omentum reflected superiorly.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Reflection of Greater Omentum',
        description: 'Elevate greater omentum to display coils of jejunum and ileum, and identify the root of the mesentery.'
      },
      {
        stepNumber: 2,
        title: 'Inspection of the Lesser Omentum & Portal Triad',
        description: 'Insert index finger into the epiploic foramen (Winslow) behind the free edge of lesser omentum to palpate portal vein, hepatic artery, and bile duct.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80',
        caption: 'Cadaveric view of the upper abdominal cavity demonstrating liver, stomach, lesser omentum and the hepatoduodenal ligament.',
        magnification: 'Gross Specimen',
        stainOrView: 'Abdominal Prosection'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Portal triad: Common bile duct anterolateral, Hepatic artery anteromedial, Portal vein posterior.',
      'Celiac trunk branches: Left gastric, Splenic, Common hepatic arteries.',
      'Hepatorenal pouch (Morison pouch) as lowest point of peritoneal cavity in supine position.'
    ],
    commonMistakes: [
      {
        mistake: 'Failing to identify the orientation of structures in the portal triad.',
        correction: 'Remember: Duct is Right, Artery is Left, Vein is Posterior.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Pringle Maneuver & Peritoneal Abscess',
      diagnosticPearls: 'Clamping the hepatoduodenal ligament (Pringle maneuver) occludes hepatic arterial and portal venous inflow to control traumatic liver bleeding. Fluid in supine patients pools in Morison pouch.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'medium',
      mandatoryPPE: ['Lab Coat', 'Gloves', 'Eye Protection'],
      handlingRules: ['Handle preserved viscera gently to prevent tearing mesenteries.']
    },
    references: [{ title: "Clinically Oriented Anatomy", authors: 'Moore & Dalley', editionOrYear: '9th Ed.', pages: 'pp. 230–280' }]
  },

  // ==================== HISTOLOGY ====================
  {
    id: 'prac_hist_01',
    courseId: 'histology',
    categoryId: 'hist_microscope',
    practicalNumber: 1,
    title: 'Light Microscopy, Slide Handling & Staining Techniques',
    subTitle: 'Koehler Illumination, Resolving Power, H&E Chemistry & Specimen Care',
    estimatedTime: '40 mins',
    version: '2.2',
    lastUpdated: 'Aug 20, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Histology Faculty',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 21, 2026',
    learningObjectives: [
      'Master the optical setup of a binocular compound microscope and achieve Koehler illumination.',
      'Understand the principles of numerical aperture, magnification, and resolving limit (0.2 μm).',
      'Explain the biochemical mechanism of Hematoxylin (basic dye/basophilia) and Eosin (acidic dye/acidophilia).',
      'Recognize common histological artifacts (shrinkage, folding, precipitation, chatter).'
    ],
    beforeTheLab: {
      previousKnowledge: ['Elementary physics of optics, refraction, and wave theory of light.'],
      recommendedReading: ["Junqueira's Basic Histology, Chapter 1: Histology & Its Methods of Study."],
      preparationChecklist: [{ id: 'chk_h1_1', text: 'Read the safety manual on optical lens care and immersion oil usage' }],
      preLabSummary: 'Histological diagnosis depends on understanding stain chemistry. Hematoxylin stains acidic structures (DNA/RNA in nuclei) dark purple/blue, while Eosin stains basic structures (cytoplasmic proteins) pink/red.'
    },
    equipment: [
      {
        id: 'eq_hist_micro_cx23',
        name: 'Olympus CX23 Laboratory Microscope',
        description: 'Plan achromatic objectives (4x, 10x, 40x, 100x oil) with adjustable condenser.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Achieve Koehler Illumination',
        description: 'Focus specimen under 10x. Close field diaphragm, focus condenser until polygon edges are sharp, center with condenser centering screws, and reopen field diaphragm to field boundary.'
      },
      {
        stepNumber: 2,
        title: 'Compare Basophilic vs Acidophilic Structures',
        description: 'Examine an H&E section of human liver. Identify dark blue nuclei (basophilic) and uniformly pink cytoplasm (acidophilic).'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
        caption: 'Standard laboratory binocular compound light microscope setup configured for Koehler illumination and slide analysis.',
        magnification: 'Laboratory Apparatus',
        stainOrView: 'Optical Equipment'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Basophilic components: Nuclei, nucleoli, rough endoplasmic reticulum (stained blue/purple by Hematoxylin).',
      'Acidophilic components: Cytoplasm, collagen fibers, mitochondrial proteins (stained pink by Eosin).',
      'Field iris diaphragm controls glare; aperture diaphragm controls resolution and contrast.'
    ],
    commonMistakes: [
      {
        mistake: 'Using coarse focus adjustment knob at 40x or 100x magnification.',
        correction: 'Always establish focus at 4x/10x with coarse knob; at 40x and 100x, use fine focus knob ONLY to prevent crushing the slide.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Frozen Section Biopsy & Pathological Staining',
      diagnosticPearls: 'Rapid intraoperative frozen sections yield answers in 15 minutes but show more freezing artifacts than formalin-fixed paraffin-embedded (FFPE) sections. Periodic Acid-Schiff (PAS) is key for basement membranes.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Wipe oil immersion lens with lens tissue immediately after use.']
    },
    references: [{ title: "Junqueira's Basic Histology", authors: 'Mescher', editionOrYear: '16th Ed.', pages: 'pp. 1–22' }]
  },
  {
    id: 'prac_hist_02',
    courseId: 'histology',
    categoryId: 'hist_epithelial',
    practicalNumber: 2,
    title: 'Epithelial Tissue (Simple & Stratified Classification)',
    subTitle: 'Cellular Junctions, Basement Membrane, Cilia, Microvilli & Glandular Architecture',
    estimatedTime: '45 mins',
    version: '2.1',
    lastUpdated: 'Aug 22, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Histology Faculty',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 23, 2026',
    learningObjectives: [
      'Classify epithelia by cell shape (squamous, cuboidal, columnar) and layer count (simple, stratified, pseudostratified).',
      'Examine simple squamous epithelium in vascular endothelium and renal Bowman capsule.',
      'Differentiate keratinized vs non-keratinized stratified squamous epithelium.',
      'Identify transitional epithelium (urothelium) and pseudostratified ciliated columnar epithelium.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Concept of avascular tissue supported by vascular connective tissue bed.'],
      recommendedReading: ["Wheater's Functional Histology, Section 4: Epithelial Tissues."],
      preparationChecklist: [{ id: 'chk_h2_1', text: 'Review apical surface modifications: microvilli vs stereocilia vs cilia' }],
      preLabSummary: 'Epithelia cover external body surfaces and line internal closed cavities and body tubes. They are characterized by close cellular apposition, polarity (apical, lateral, basal), and attachment to a basal lamina.'
    },
    equipment: [
      {
        id: 'eq_hist_epith_slides',
        name: 'Slide Box E-02: Epithelial Tissues',
        description: 'Slides: Kidney cortex (simple cuboidal/squamous), Esophagus (stratified squamous non-keratinized), Skin (stratified squamous keratinized), Trachea (pseudostratified), Bladder (urothelium).'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Simple Epithelia (Kidney Slide)',
        description: 'Examine renal tubules. Identify simple cuboidal epithelium with central round nuclei lining distal and proximal convoluted tubules.'
      },
      {
        stepNumber: 2,
        title: 'Pseudostratified Ciliated Columnar (Trachea)',
        description: 'Observe that all cells rest on the basement membrane, but nuclei lie at variable heights. Locate apical cilia and goblet cells.'
      },
      {
        stepNumber: 3,
        title: 'Transitional Epithelium / Urothelium (Urinary Bladder)',
        description: 'Observe dome-shaped or umbrella cells on the surface layer, characteristic of relaxing and stretching bladder wall.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
        caption: 'High-power light micrograph of pseudostratified ciliated columnar epithelium of the trachea displaying prominent surface cilia and goblet cells (H&E, 400x).',
        magnification: '400x',
        stainOrView: 'H&E Stain'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Simple squamous: Single layer of flattened cells with bulging nuclei (endothelium, mesothelium).',
      'Pseudostratified: Single layer resting on basal lamina with staggered nuclei and surface cilia.',
      'Stratified squamous non-keratinized: Living nucleated cells retained up to the outermost surface layer (esophagus, vagina).',
      'Urothelium: Multi-layered with large dome-shaped superficial umbrella cells.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing pseudostratified epithelium with truly stratified columnar epithelium.',
        correction: 'True stratified columnar epithelium is extremely rare (conjunctiva fornix, large excretory ducts) and has no apical cilia.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Metaplasia & Carcinoma in Situ',
      diagnosticPearls: "In cigarette smokers, ciliated pseudostratified columnar epithelium of the respiratory tract undergoes squamous metaplasia to stratified squamous epithelium, losing mucosal clearance.",
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Standard glass slide handling protocols apply.']
    },
    references: [{ title: "Wheater's Functional Histology", authors: 'Young, O’Dowd, Woodford', editionOrYear: '7th Ed.', pages: 'pp. 75–102' }]
  },
  {
    id: 'prac_hist_03',
    courseId: 'histology',
    categoryId: 'hist_connective',
    practicalNumber: 3,
    title: 'Connective Tissue Proper & Cartilage',
    subTitle: 'Fibroblasts, Collagen, Elastic Fibers, Hyaline vs Elastic vs Fibrocartilage',
    estimatedTime: '45 mins',
    version: '2.0',
    lastUpdated: 'Aug 23, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Histology Faculty',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 24, 2026',
    learningObjectives: [
      'Differentiate loose (areolar) from dense regular and dense irregular connective tissue.',
      'Identify cellular components: Fibroblasts, macrophages, mast cells, plasma cells, and adipocytes.',
      'Compare histological features of Hyaline cartilage, Elastic cartilage, and Fibrocartilage.',
      'Identify chondrocytes situated in lacunae, isogenous groups, and territorial vs interterritorial matrix.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Extracellular matrix composition (glycosaminoglycans, proteoglycans, collagen types).'],
      recommendedReading: ["Junqueira's Basic Histology, Chapters 5 & 7: Connective Tissue and Cartilage."],
      preparationChecklist: [{ id: 'chk_h3_1', text: 'Compare Type I collagen (bone/tendon) with Type II collagen (hyaline cartilage)' }],
      preLabSummary: 'Connective tissue consists of cells separated by abundant extracellular matrix. Cartilage is an avascular specialized connective tissue with chondrocytes residing in lacunae surrounded by solid matrix.'
    },
    equipment: [
      {
        id: 'eq_hist_ct_slides',
        name: 'Slide Box C-03: Connective Tissues',
        description: 'Slides: Mesentery spread (areolar), Tendon (dense regular), Tracheal ring (hyaline cartilage), Epiglottis (elastic cartilage), Intervertebral disc (fibrocartilage).'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Hyaline Cartilage Examination (Trachea Slide)',
        description: 'Locate C-shaped cartilaginous ring. Identify perichondrium, subperichondrial chondroblasts, mature chondrocytes in lacunae, and glassy basophilic territorial matrix.'
      },
      {
        stepNumber: 2,
        title: 'Elastic Cartilage (Epiglottis / Weigert Stain)',
        description: 'Observe dense branched meshwork of dark elastic fibers surrounding chondrocytes.'
      },
      {
        stepNumber: 3,
        title: 'Fibrocartilage (Intervertebral Disc / Meniscus)',
        description: 'Observe rows of chondrocytes nestled between dense parallel bundles of Type I collagen fibers. Note absence of a distinct perichondrium.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80',
        caption: 'Histological field of hyaline cartilage from the tracheal wall showing chondrocytes in lacunae and glassy basophilic matrix (H&E, 200x).',
        magnification: '200x',
        stainOrView: 'H&E Stain'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Hyaline cartilage: Glassy, homogeneous matrix containing Type II collagen and basophilic chondroitin sulfate.',
      'Elastic cartilage: Chondrocytes plus dense dark elastic fibers (orcein or Weigert stain).',
      'Fibrocartilage: Alternating parallel dense Type I collagen bundles and chondrocyte rows (no perichondrium).'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing fibrocartilage with dense regular collagenous tendon tissue.',
        correction: 'Tendon contains flattened inactive fibroblast nuclei (tendinocytes) compressed between fibers; fibrocartilage contains distinct rounded chondrocytes within lacunae.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Osteoarthritis & Herniated Nucleus Pulposus',
      diagnosticPearls: 'Hyaline articular cartilage lacks a perichondrium, explaining its extremely limited repair capacity following wear or trauma. Fibrocartilage rings (anulus fibrosus) tear in lumbar disc herniation.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Standard microscope and slide handling.']
    },
    references: [{ title: "Junqueira's Basic Histology", authors: 'Mescher', editionOrYear: '16th Ed.', pages: 'pp. 120–145' }]
  },
  {
    id: 'prac_hist_04',
    courseId: 'histology',
    categoryId: 'hist_connective',
    practicalNumber: 4,
    title: 'Bone Histology & Compact Osteon System',
    subTitle: 'Haversian Canals, Volkmann Canals, Concentric Lamellae, Osteocytes & Canaliculi',
    estimatedTime: '45 mins',
    version: '1.2',
    lastUpdated: 'Aug 24, 2026',
    status: 'draft',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Histology Faculty',
    learningObjectives: [
      'Examine the microscopic structure of ground dry bone and decalcified bone.',
      'Identify osteons (Haversian systems), concentric lamellae, and central canals.',
      'Locate Volkmann (perforating) canals connecting adjacent Haversian systems.',
      'Observe osteocyte lacunae and branching canaliculi networks.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Inorganic hydroxyapatite and organic Type I collagen composition of bone matrix.'],
      recommendedReading: ["Junqueira's Basic Histology, Chapter 8: Bone."],
      preparationChecklist: [{ id: 'chk_h4_1', text: 'Review differences between intramembranous and endochondral ossification' }],
      preLabSummary: 'Compact bone is organized into cylindrical structural units termed osteons or Haversian systems. Canaliculi radiate between lacunae allowing osteocyte gap-junction communication.'
    },
    equipment: [
      {
        id: 'eq_hist_bone_slides',
        name: 'Slide Box B-04: Ground Bone Specimen',
        description: 'Unstained ground compact bone section (transverse section) displaying Haversian architecture.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Haversian System Identification (10x)',
        description: 'Locate circular osteons centered around dark Haversian canals transmitting vessels.'
      },
      {
        stepNumber: 2,
        title: 'Lamellae and Canaliculi (40x)',
        description: 'Inspect concentric lamellae, dark spider-like osteocyte lacunae, and delicate radiating canaliculi.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        caption: 'Ground transverse section of human compact bone demonstrating complete Haversian systems (osteons) with concentric lamellae and central canals (Unstained, 200x).',
        magnification: '200x',
        stainOrView: 'Ground Bone Section'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Central (Haversian) canal running longitudinally with blood vessels and nerves.',
      'Perforating (Volkmann) canals running perpendicularly across lamellae without concentric rings.',
      'Concentric lamellae arranged in 4 to 20 rings around central canal.',
      'Spider-like canaliculi facilitating metabolic exchange between osteocytes.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Haversian canals with Volkmann canals.',
        correction: 'Haversian canals are surrounded by concentric lamellae; Volkmann canals pierce perpendicularly without concentric lamellae.'
      }
    ],
    clinicalCorrelation: {
      condition: "Osteoporosis & Paget's Disease",
      diagnosticPearls: 'Imbalance between osteoclast bone resorption and osteoblast bone formation leads to thinned trabeculae and porous cortical bone in postmenopausal osteoporosis.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Ground bone slides are fragile; avoid excess pressure.']
    },
    references: [{ title: "Basic Histology", authors: 'Junqueira & Carneiro', editionOrYear: '16th Ed.', pages: 'pp. 150–175' }]
  },
  {
    id: 'prac_hist_06',
    courseId: 'histology',
    categoryId: 'hist_nervous',
    practicalNumber: 6,
    title: 'Nervous Tissue & Peripheral Ganglia Histology',
    subTitle: 'Multipolar Neurons, Nissl Substance, Myelinated Axons, Schwann Cells & Glial Cytology',
    estimatedTime: '45 mins',
    version: '2.0',
    lastUpdated: 'Aug 25, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Histology Faculty',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 26, 2026',
    learningObjectives: [
      'Identify the parts of a multipolar neuron (soma, axon hillock, dendrites, Nissl bodies) in spinal cord anterior horn.',
      'Differentiate sensory (dorsal root) ganglia from autonomic (sympathetic/parasympathetic) ganglia.',
      'Identify myelinated nerve fibers in cross-section (neurokeratin network, Schwann cell nuclei, nodes of Ranvier).',
      'Distinguish epineurium, perineurium, and endoneurium connective tissue sheaths.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Action potential conduction and synapse structure.'],
      recommendedReading: ["Wheater's Functional Histology, Section 7: Nervous Tissue."],
      preparationChecklist: [{ id: 'chk_h6_1', text: 'Review why Nissl substance is absent from the axon hillock' }],
      preLabSummary: 'Nervous tissue consists of excitable neurons and supportive neuroglia. Large anterior horn motor neurons show intense basophilic clumps of rough ER (Nissl substance) throughout the perikaryon, excluding the axon hillock.'
    },
    equipment: [
      {
        id: 'eq_hist_nerve_slides',
        name: 'Slide Box N-06: Nervous System',
        description: 'Slides: Spinal cord cross-section (cresyl violet / H&E), Peripheral nerve bundle (H&E / Osmium), Dorsal root ganglion (H&E).'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Spinal Cord Anterior Horn Motor Neurons',
        description: 'Focus on anterior gray horn under 40x. Observe large multipolar neuron cell bodies with pale euchromatic nucleus, prominent nucleolus, and intense purple Nissl bodies.'
      },
      {
        stepNumber: 2,
        title: 'Peripheral Nerve Bundle Cross-Section',
        description: 'Inspect nerve fascicles surrounded by perineurium. Inside, observe individual axons surrounded by pale lipid-washed myelin spaces and endoneurium.'
      },
      {
        stepNumber: 3,
        title: 'Sensory vs Autonomic Ganglion',
        description: 'Examine dorsal root ganglion: Pseudo-unipolar spherical neurons clustered peripherally with concentric satellite cells and centrally placed nuclei.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',
        caption: 'High-power histological view of spinal cord anterior horn motor neurons demonstrating prominent Nissl granules, pale nuclei, and dense nucleoli (Cresyl Violet, 400x).',
        magnification: '400x',
        stainOrView: 'Cresyl Violet / H&E'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Nissl substance (RER clumps) prominent in soma and dendrites, strictly absent at axon hillock.',
      'Dorsal root ganglion: Large pseudo-unipolar neurons with central nuclei surrounded by complete ring of satellite cells.',
      'Sympathetic ganglion: Smaller multipolar neurons with eccentric nuclei and scattered satellite cells.',
      'Connective tissue: Epineurium (entire nerve), Perineurium (fascicle with tight junctions), Endoneurium (individual fibers).'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing cross-sectioned peripheral nerve with smooth muscle or dense collagen.',
        correction: 'Cross-sectioned nerve shows empty circular spaces left by extracted myelin lipids and central dot-like axons, unlike dense muscle or tendon.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Multiple Sclerosis vs Guillain-Barré Syndrome',
      diagnosticPearls: 'Multiple sclerosis is an autoimmune demyelinating disease of CNS oligodendrocytes; Guillain-Barré syndrome attacks PNS Schwann cell myelin. Nissl bodies disperse in chromatolysis following axonal transection.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Standard laboratory microscope procedures.']
    },
    references: [{ title: "Functional Histology", authors: 'Wheater & Burkitt', editionOrYear: '7th Ed.', pages: 'pp. 140–165' }]
  },

  // ==================== BIOCHEMISTRY ====================
  {
    id: 'prac_bio_02',
    courseId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalNumber: 2,
    title: "Molisch's & Iodine Tests for Polysaccharides",
    subTitle: 'General Carbohydrate Detection via Furfural Condensation & Amylose Helix Complexation',
    estimatedTime: '40 mins',
    version: '2.0',
    lastUpdated: 'Aug 21, 2026',
    status: 'published',
    authorName: 'Dr. Soraya Al-Khatib, PhD',
    authorRole: 'Head of Clinical Biochemistry',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 22, 2026',
    learningObjectives: [
      "Explain the chemical mechanism of Molisch's test as a universal screen for carbohydrates.",
      'Perform acid layering with concentrated H2SO4 to generate a distinct purple/violet interfacial ring.',
      'Conduct the iodine test to distinguish starch (amylose) from glycogen and non-polysaccharide carbohydrates.',
      'Demonstrate the effect of heat on the starch-iodine blue complex and understand reversible thermal dissociation.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Acid dehydration of pentoses and hexoses to furfurals.'],
      recommendedReading: ["Harper's Illustrated Biochemistry, Carbohydrates Chapter."],
      preparationChecklist: [{ id: 'chk_b2_1', text: 'Wear chemical splash safety goggles before handling concentrated sulfuric acid' }],
      preLabSummary: 'Molisch test is a general test for all carbohydrates based on dehydration by conc. H2SO4 to form furfural derivatives which condense with alpha-naphthol. Iodine test forms an inclusion complex with starch helical coils.'
    },
    equipment: [
      {
        id: 'eq_bio_tubes_rack',
        name: 'Borosilicate Glass Test Tubes & Rack',
        description: 'Standard 15 mL glass tubes with chemical resistant drying rack.'
      },
      {
        id: 'eq_bio_reagents_molisch',
        name: "Molisch's Reagent & Conc. H2SO4",
        description: '5% alpha-naphthol in ethanol, and concentrated 98% sulfuric acid.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: "Molisch's Test Procedure",
        description: 'Add 2 mL of carbohydrate test solution into tube. Add 2 drops of Molisch reagent (alpha-naphthol) and mix thoroughly. Incline tube at 45 degrees and carefully trickle 1 mL conc. H2SO4 down the tube side without shaking. Observe violet ring at junction.'
      },
      {
        stepNumber: 2,
        title: 'Iodine Test Procedure',
        description: 'Add 2 mL of test solution (starch, glucose, water). Add 2 drops of iodine solution. Starch turns deep blue-black. Heat the tube: color disappears as helix expands. Cool under running water: deep blue color returns.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
        caption: "Positive Molisch reaction tube showing clear violet/purple condensation ring at the liquid-liquid interface between concentrated sulfuric acid and carbohydrate solution.",
        magnification: 'Macroscopic Colorimetric Reaction',
        stainOrView: 'Molisch Test Result'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Positive Molisch: Violet / purple ring at acid-water interface confirms presence of carbohydrate.',
      'Greenish ring with Molisch: Artifact caused by excess reagent, NOT a positive test.',
      'Positive Iodine: Deep blue / blue-black with starch; reddish-brown with glycogen; negative (yellow) with mono/disaccharides.'
    ],
    commonMistakes: [
      {
        mistake: 'Mixing or shaking the tube after adding concentrated sulfuric acid in Molisch test.',
        correction: 'Acid must be layered gently down the inside wall; shaking produces extreme heat, chars the sugar into brown-black sludge, and destroys the interface ring.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Glycogen Storage Diseases & Starch Digestion',
      diagnosticPearls: 'Iodine test principle is utilized clinically in Lugol staining of cervical epithelium (Schiller test) and assessing salivary/pancreatic amylase digestion kinetics.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'high',
      mandatoryPPE: ['Chemical Splash Goggles', 'Lab Coat', 'Acid-Resistant Nitrile Gloves'],
      handlingRules: ['Conc. H2SO4 is highly corrosive; always add acid to water/solution along wall; dispense under fume hood.']
    },
    references: [{ title: "Practical Clinical Biochemistry", authors: 'Harold Varley', editionOrYear: '4th Ed.', pages: 'pp. 60–75' }]
  },
  {
    id: 'prac_bio_03',
    courseId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalNumber: 3,
    title: "Benedict's & Fehling's Reducing Sugar Assays",
    subTitle: 'Reduction of Cupric Ions in Alkaline Medium & Semi-Quantitative Diagnostic Evaluation',
    estimatedTime: '45 mins',
    version: '2.1',
    lastUpdated: 'Aug 22, 2026',
    status: 'published',
    authorName: 'Dr. Soraya Al-Khatib, PhD',
    authorRole: 'Head of Clinical Biochemistry',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 23, 2026',
    learningObjectives: [
      'Differentiate reducing sugars (glucose, galactose, fructose, maltose, lactose) from non-reducing sugars (sucrose).',
      'Explain the alkaline reduction of cupric hydroxide (Cu2+) to insoluble cuprous oxide (Cu2O) precipitate upon boiling.',
      'Interpret the semi-quantitative color scale of Benedict reaction (Green -> Yellow -> Orange -> Brick Red).',
      'Explain why sucrose requires preliminary acid hydrolysis to yield positive Benedict test.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Free hemiacetal/hemiketal carbonyl groups in mutarotating sugars.'],
      recommendedReading: ["Lippincott Illustrated Reviews: Biochemistry, Chapter 7."],
      preparationChecklist: [{ id: 'chk_b3_1', text: 'Set up boiling water bath and ensure boiling chips are present' }],
      preLabSummary: 'Benedict reagent contains copper sulfate, sodium citrate, and sodium carbonate. Sugars with free aldehyde or ketone groups enolize in alkaline medium and reduce Cu2+ ions to cuprous oxide precipitate.'
    },
    equipment: [
      {
        id: 'eq_bio_water_bath',
        name: 'Thermostatic Boiling Water Bath',
        description: 'Maintained at 100 degrees Celsius with stainless steel tube rack.'
      },
      {
        id: 'eq_bio_benedict_reagent',
        name: "Benedict's Qualitative Reagent",
        description: 'Blue solution of CuSO4, Na2CO3, and sodium citrate.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: "Benedict's Test Execution",
        description: 'Pipette 5 mL of Benedict reagent into labelled test tubes. Add 8 drops (0.5 mL) of test solution (glucose, fructose, lactose, sucrose, water). Mix and place tubes in vigorously boiling water bath for 3 to 5 minutes.'
      },
      {
        stepNumber: 2,
        title: 'Colorimetric Interpretation',
        description: 'Remove tubes and allow cooling. Observe precipitate color: Blue = Negative (0 g%); Green = Trace (+1, <0.5 g%); Yellow = Moderate (+2, 0.5-1 g%); Orange = High (+3, 1-2 g%); Brick Red = Very High (+4, >2 g%).'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
        caption: 'Benedict test series showing color gradient: Blue (negative/sucrose) to Green, Orange, and Brick-Red (Cuprous oxide Cu2O precipitate).',
        magnification: 'Macroscopic Colorimetric Reaction',
        stainOrView: 'Benedict Reagent Reduction'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Sucrose is negative because glycosidic bond involves both reducing anomeric carbons (C1 of glucose and C2 of fructose).',
      'Fructose reduces Benedict reagent rapidly via enediol tautomerization in alkaline solution.',
      'Brick-red precipitate confirms high concentration of reducing carbohydrates.'
    ],
    commonMistakes: [
      {
        mistake: 'Heating tubes over direct open Bunsen flame without water bath.',
        correction: 'Direct flaming causes violent liquid bumping and spurting of hot alkaline copper reagent; always use boiling water bath.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Glucosuria, Diabetes Mellitus & Galactosemia',
      diagnosticPearls: 'Benedict test was historically the standard test for urine glucose. Unlike enzymatic dipsticks (glucose oxidase), Benedict detects all reducing sugars, critical for screening infants for inborn galactosemia.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'medium',
      mandatoryPPE: ['Lab Coat', 'Safety Glasses', 'Heat-Resistant Tube Clamps'],
      handlingRules: ['Always use test tube holder when transferring tubes from boiling water bath.']
    },
    references: [{ title: "Tietz Textbook of Clinical Chemistry", authors: 'Burtis & Ashwood', editionOrYear: '6th Ed.', pages: 'pp. 310–335' }]
  },
  {
    id: 'prac_bio_04',
    courseId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalNumber: 4,
    title: "Barfoed's & Seliwanoff's Differential Sugar Tests",
    subTitle: 'Distinguishing Monosaccharides from Disaccharides & Aldoses from Ketoses',
    estimatedTime: '45 mins',
    version: '1.5',
    lastUpdated: 'Aug 23, 2026',
    status: 'draft',
    authorName: 'Dr. Soraya Al-Khatib, PhD',
    authorRole: 'Head of Clinical Biochemistry',
    learningObjectives: [
      "Understand Barfoed's test principle (copper reduction in weakly acidic medium) to differentiate monosaccharides from reducing disaccharides.",
      "Conduct Seliwanoff's test to rapidly identify ketoses (fructose, sucrose) from aldoses.",
      'Correlate boiling duration strictly (2-3 min for Barfoed; 1 min for Seliwanoff) to avoid false-positive hydrolysis.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Acid catalysis and rate of condensation of resorcinol with 5-hydroxymethylfurfural.'],
      recommendedReading: ["Textbook of Biochemistry for Medical Students (DM Vasudevan), Chapter 5."],
      preparationChecklist: [{ id: 'chk_b4_1', text: 'Set digital timer: Barfoed boiling must not exceed 3 minutes' }],
      preLabSummary: 'Barfoed reagent contains cupric acetate in dilute acetic acid. Because acid is a weak reducing environment, only monosaccharides can reduce Cu2+ within 2-3 minutes. Seliwanoff test uses resorcinol in dilute HCl.'
    },
    equipment: [
      {
        id: 'eq_bio_timer',
        name: 'Digital Laboratory Precision Timer',
        description: 'Used for strict incubation interval control in boiling water bath.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: "Barfoed's Test",
        description: 'Add 2 mL Barfoed reagent to tubes. Add 1 mL test solution. Place in boiling water bath for exactly 2.5 minutes. Monosaccharides yield red cuprous oxide at tube bottom.'
      },
      {
        stepNumber: 2,
        title: "Seliwanoff's Test",
        description: 'Add 3 mL Seliwanoff reagent. Add 1 mL test solution. Boil for 1 minute. Ketoses (fructose) produce cherry-red solution.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
        caption: 'Seliwanoff test comparison: Cherry-red color development in ketose (fructose) versus pale faint aldose solution after 1 minute boiling.',
        magnification: 'Macroscopic Colorimetric Reaction',
        stainOrView: 'Seliwanoff Reaction Tube'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Barfoed positive in <3 min: Monosaccharide (glucose, fructose, galactose).',
      'Barfoed positive only after prolonged boiling (>10 min): Disaccharide underwent acid hydrolysis (false positive).',
      'Seliwanoff positive in 1 min: Ketose (cherry-red color).'
    ],
    commonMistakes: [
      {
        mistake: 'Boiling Seliwanoff tubes for more than 2 minutes.',
        correction: 'Overboiling converts aldoses into ketose intermediates by acid enolization, creating false-positive red tint.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Essential Fructosuria & Hereditary Fructose Intolerance',
      diagnosticPearls: 'Patients with fructokinase deficiency excrete fructose in urine; positive Seliwanoff and Benedict tests alongside negative glucose oxidase dipstick establishes diagnosis.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'medium',
      mandatoryPPE: ['Safety Goggles', 'Lab Coat', 'Gloves'],
      handlingRules: ['Seliwanoff reagent contains hydrochloric acid; handle with care.']
    },
    references: [{ title: "Biochemistry for Medical Students", authors: 'Vasudevan, Sreekumari, Vaidyanathan', editionOrYear: '9th Ed.', pages: 'pp. 45–58' }]
  },
  {
    id: 'prac_bio_05',
    courseId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalNumber: 5,
    title: 'Protein Precipitation & Biuret Color Reaction',
    subTitle: 'Peptide Bond Coordination with Cupric Ions & Isoelectric Denaturation',
    estimatedTime: '45 mins',
    version: '2.0',
    lastUpdated: 'Aug 24, 2026',
    status: 'published',
    authorName: 'Dr. Soraya Al-Khatib, PhD',
    authorRole: 'Head of Clinical Biochemistry',
    approvedBy: 'الدكتور ثابت الذيفاني',
    approvalDate: 'Aug 25, 2026',
    learningObjectives: [
      'Explain the chemical basis of Biuret reaction (coordination of Cu2+ with unshared electron pairs of 4 peptide bond nitrogens).',
      'Differentiate true protein reactions from single amino acid reactions.',
      'Demonstrate reversible vs irreversible protein precipitation by heavy metals, heat, and full saturation with ammonium sulfate.',
      'Understand how heat and acid coagulation underlies diagnostic detection of albuminuria.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Peptide bond structure, primary through quaternary protein conformation.'],
      recommendedReading: ["Harper's Illustrated Biochemistry, Chapter 3: Peptides & Proteins."],
      preparationChecklist: [{ id: 'chk_b5_1', text: 'Prepare 1% egg albumin and 1% gelatin stock solutions' }],
      preLabSummary: 'The Biuret reaction requires at least two peptide bonds (-CONH-). In alkaline medium, copper(II) forms a violet coordination complex. Proteins precipitate when their hydration shell is stripped or net charge reaches zero (pI).'
    },
    equipment: [
      {
        id: 'eq_bio_biuret_reagent',
        name: 'Biuret Reagent (Alkaline Copper Tartrate)',
        description: 'Blue solution containing copper sulfate, potassium sodium tartrate, and sodium hydroxide.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Biuret Test Procedure',
        description: 'Add 2 mL of protein solution (albumin/gelatin) into test tube. Add 2 mL of 10% NaOH. Add 2 to 3 drops of 0.5% CuSO4 solution and mix. Observe deep violet/purple color.'
      },
      {
        stepNumber: 2,
        title: 'Heat Coagulation Test',
        description: 'Fill test tube 2/3 with albumin solution. Heat only the upper 1/3 over Bunsen flame until turbid. Add 2 drops of 1% acetic acid. If cloudiness persists or intensifies, albumin is confirmed.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
        caption: 'Positive Biuret reaction showing deep purple/violet coordination complex between peptide bonds and alkaline cupric ions.',
        magnification: 'Macroscopic Colorimetric Reaction',
        stainOrView: 'Biuret Reaction Tube'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Positive Biuret: Violet / purple color indicates at least two peptide linkages.',
      'Free amino acids do NOT give positive Biuret (except histidine under specialized conditions).',
      'Precipitation by full saturation with (NH4)2SO4 precipitates albumin; half-saturation precipitates globulin.'
    ],
    commonMistakes: [
      {
        mistake: 'Adding excess copper sulfate in Biuret test.',
        correction: 'Adding too much CuSO4 creates a blue precipitate of cupric hydroxide Cu(OH)2 which obscures the violet coordination color.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Nephrotic Syndrome & Multiple Myeloma',
      diagnosticPearls: 'Proteinuria in nephrotic syndrome (>3.5 g/24h) causes frothy urine and dependent edema. Bence Jones proteins in myeloma precipitate at 50-60°C and redissolve on boiling at 100°C.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'medium',
      mandatoryPPE: ['Lab Coat', 'Safety Glasses', 'Nitrile Gloves'],
      handlingRules: ['Sodium hydroxide is caustic; wash skin immediately with water if exposed.']
    },
    references: [{ title: "Clinical Biochemistry", authors: 'Gaw, Murphy, Cowan', editionOrYear: '5th Ed.', pages: 'pp. 52–68' }]
  },
  {
    id: 'prac_bio_06',
    courseId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalNumber: 6,
    title: 'Enzymatic Hydrolysis of Starch by Salivary Amylase',
    subTitle: 'Enzyme Kinetics, Temperature/pH Optima, Achromic Point & Starch Digestion Stages',
    estimatedTime: '50 mins',
    version: '1.1',
    lastUpdated: 'Aug 25, 2026',
    status: 'draft',
    authorName: 'Dr. Soraya Al-Khatib, PhD',
    authorRole: 'Head of Clinical Biochemistry',
    learningObjectives: [
      'Measure salivary alpha-amylase activity by tracking the disappearance of starch and emergence of reducing sugars.',
      'Determine the achromic point (the exact time point where iodine produces zero color reaction).',
      'Demonstrate the effect of pH (optimum 6.8) and temperature (optimum 37°C) on salivary amylase rate.',
      'Demonstrate complete enzyme inactivation by boiling.'
    ],
    beforeTheLab: {
      previousKnowledge: ['Enzyme-substrate complexes, Michaelis-Menten kinetics, activation energy.'],
      recommendedReading: ["Harper's Illustrated Biochemistry, Enzymes: Mechanism of Action."],
      preparationChecklist: [{ id: 'chk_b6_1', text: 'Set water baths at 0°C (ice bath), 37°C (body temp), and 100°C (boiling)' }],
      preLabSummary: 'Salivary alpha-amylase is an endoamylase that hydrolyzes internal alpha-1,4-glucosidic bonds of starch to yield soluble starch, dextrins (erythrodextrin, achroodextrin), maltose, and isomaltose.'
    },
    equipment: [
      {
        id: 'eq_bio_spotting_tile',
        name: 'White Porcelain Cavity Spotting Tile',
        description: 'Used with iodine drops to sample reaction mixtures every 60 seconds.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Spotting Tile Preparation',
        description: 'Place 1 drop of dilute iodine solution in each depression of the porcelain spot plate.'
      },
      {
        stepNumber: 2,
        title: 'Digestive Reaction & Interval Sampling',
        description: 'Mix 5 mL of 1% starch with 1 mL of diluted saliva at 37°C. Immediately withdraw 1 drop and add to spot plate cavity (Time 0). Repeat every 60 seconds until color changes from Blue -> Purple -> Reddish-Brown -> Colorless (Achromic Point).'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
        caption: 'Enzyme digestion series on white porcelain spotting plate demonstrating progressive starch hydrolysis from blue-black to achromic point.',
        magnification: 'Macroscopic Enzymatic Assay',
        stainOrView: 'Spotting Plate Progression'
      }
    ],
    interactiveImages: [],
    identificationPoints: [
      'Amylodextrin produces violet/purple color with iodine.',
      'Erythrodextrin produces reddish-brown color with iodine.',
      'Achroodextrin and maltose produce no color with iodine (achromic point reached).',
      'Final digested mixture gives strongly positive Benedict test.'
    ],
    commonMistakes: [
      {
        mistake: 'Failing to maintain 37°C temperature during digestion.',
        correction: 'Amylase rate slows markedly at room temperature; keep test tube immersed in 37°C water bath throughout.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Acute Pancreatitis & Serum Amylase Elevation',
      diagnosticPearls: 'Pancreatic amylase is released into systemic circulation in acute pancreatitis, peaking within 12-24 hours. Urinary amylase remains elevated longer due to renal clearance.',
      clinicalImages: []
    },
    safety: {
      hazardLevel: 'low',
      mandatoryPPE: ['Lab Coat', 'Gloves'],
      handlingRules: ['Collect and dilute saliva using personal disposable tubes; dispose of biofluids in designated biohazard bins.']
    },
    references: [{ title: "Principles of Biochemistry", authors: 'Lehninger, Nelson, Cox', editionOrYear: '8th Ed.', pages: 'pp. 210–240' }]
  }
];
