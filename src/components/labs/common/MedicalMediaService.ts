// =======================================================================
// UNIFIED MEDICAL MEDIA & REFERENCE IMAGE SERVICE (ANATOMY + HISTOLOGY)
// =======================================================================
// Policy: USER-UPLOADED IMAGE = PRIMARY SOURCE.
// Whenever a user uploads an image, it is preserved exactly as-is,
// tagged as the Primary Reference Image for the selected topic/lesson,
// and stored persistently.
// =======================================================================

export interface MedicalImageHotspot {
  id: string;
  pinNumber: number;
  labelEn: string;
  labelAr: string;
  posX: number; // percentage (0-100)
  posY: number; // percentage (0-100)
  explanation: string;
  location: string;
  functionDesc: string;
  movementMechanics?: string; // e.g. for body movements
  stainAffinity?: string;     // e.g. for histology
  examTip?: string;
}

export interface MedicalImageRecord {
  id: string;
  subject: 'anatomy' | 'histology';
  topicOrLessonId: string;
  title: string;
  titleAr?: string;
  sourceType: 'user_upload' | 'primary_reference_atlas';
  referenceSource: string; // e.g. "Primary User Uploaded Reference", "Sana'a University Atlas", "Verified Anatomical Reference"
  isPrimarySource: boolean;
  dataUrl?: string; // For user uploaded base64 data URLs or relative asset paths
  svgGraphicId?: string; // Fallback pre-seeded vector visual if no external file yet
  hasLabels: boolean;
  uploadedAt: string;
  hotspots: MedicalImageHotspot[];
  notes?: string;
}

const STORAGE_KEY = 'labhub_medical_media_records_v1';

// Initial pre-seeded reference hotspots for Anatomy topics
export const DEFAULT_ANATOMY_HOTSPOTS: Record<string, MedicalImageHotspot[]> = {
  anat_planes: [
    {
      id: 'plane-1',
      pinNumber: 1,
      labelEn: 'Sagittal (Median / Midsagittal) Plane',
      labelAr: 'المستوى السهمي الناصف',
      posX: 25,
      posY: 35,
      explanation: 'A vertical longitudinal plane dividing the body into symmetrical right and left halves.',
      location: 'Runs right down the midline of the body through the sagittal suture.',
      functionDesc: 'Standard reference for brain MRI/CT slices and viewing sagittal movements (flexion/extension).',
      examTip: 'Midsagittal divides into EQUAL halves; Parasagittal divides into UNEQUAL right and left portions.'
    },
    {
      id: 'plane-2',
      pinNumber: 2,
      labelEn: 'Coronal (Frontal) Plane',
      labelAr: 'المستوى الإكليلي / الجبهي',
      posX: 50,
      posY: 35,
      explanation: 'A vertical longitudinal plane at right angles to the sagittal plane, dividing the body into anterior (front) and posterior (back) parts.',
      location: 'Parallel to the coronal suture of the skull across the shoulders.',
      functionDesc: 'Used to analyze abduction/adduction movements and coronal CT/X-ray views of the thorax and pelvis.',
      examTip: 'Named after the coronal suture of the skull.'
    },
    {
      id: 'plane-3',
      pinNumber: 3,
      labelEn: 'Transverse (Horizontal / Axial) Plane',
      labelAr: 'المستوى المستعرض / الأفقي',
      posX: 75,
      posY: 35,
      explanation: 'A horizontal plane passing horizontally through the body dividing it into superior (upper) and inferior (lower) portions.',
      location: 'Perpendicular to both sagittal and coronal planes at any given horizontal level.',
      functionDesc: 'The universal plane of axial CT cross-sections and viewing rotational body movements.',
      examTip: 'Cross-sectional imaging (CT/MRI) is viewed as if standing at the patient feet looking upwards.'
    }
  ],
  anat_directional_terms: [
    {
      id: 'dir-1',
      pinNumber: 1,
      labelEn: 'Superior (Cranial / Cephalic)',
      labelAr: 'علوي (باتجاه الرأس)',
      posX: 50,
      posY: 15,
      explanation: 'Toward the head or upper part of a structure.',
      location: 'Upper vertical pole of the human body.',
      functionDesc: 'Describes vertical orientation (e.g., The heart is superior to the diaphragm).',
      examTip: 'Opposite of Inferior (Caudal).'
    },
    {
      id: 'dir-2',
      pinNumber: 2,
      labelEn: 'Anterior (Ventral) vs Posterior (Dorsal)',
      labelAr: 'أمامي (بطني) مقابل خلفي (ظهري)',
      posX: 50,
      posY: 42,
      explanation: 'Anterior = toward the front of the body; Posterior = toward the back.',
      location: 'Front and rear aspects relative to the coronal plane.',
      functionDesc: 'Describes anteroposterior spatial relationships (e.g., The sternum is anterior to the heart).',
      examTip: 'In human anatomy, Ventral = Anterior and Dorsal = Posterior.'
    },
    {
      id: 'dir-3',
      pinNumber: 3,
      labelEn: 'Medial vs Lateral',
      labelAr: 'إنسي (نحو خط المنتصف) مقابل وحشي (بعيدًا عنه)',
      posX: 30,
      posY: 55,
      explanation: 'Medial = nearer to the midline; Lateral = further away from the midline.',
      location: 'Relative distance to the midsagittal plane.',
      functionDesc: 'In anatomical position, the thumb (pollex) is lateral; the little finger is medial.',
      examTip: 'The radius is lateral; the ulna is medial.'
    },
    {
      id: 'dir-4',
      pinNumber: 4,
      labelEn: 'Proximal vs Distal',
      labelAr: 'داني (قريب من المنشأ) مقابل قاصٍ (بعيد عن المنشأ)',
      posX: 72,
      posY: 70,
      explanation: 'Used exclusively for limbs: Proximal = nearer to the trunk attachment; Distal = farther away.',
      location: 'Appendicular extremities.',
      functionDesc: 'The elbow is proximal to the wrist; the ankle is distal to the knee.',
      examTip: 'Never use Superior/Inferior when describing limb landmarks relative to trunk origin!'
    }
  ],
  anat_movements: [
    {
      id: 'mov-1',
      pinNumber: 1,
      labelEn: 'Flexion & Extension',
      labelAr: 'عطف وبسط (الانثناء والمد)',
      posX: 20,
      posY: 30,
      explanation: 'Flexion decreases the angle between articulating bones; Extension increases the angle.',
      location: 'Occurs in the Sagittal plane around a transverse axis (e.g., Elbow, Knee, Shoulder, Spine).',
      functionDesc: 'Primary locomotion and grasping movement.',
      movementMechanics: 'Biceps brachii contracts during elbow flexion; Triceps brachii extends the elbow.',
      examTip: 'Knee flexion moves the leg posteriorly, unlike elbow flexion which moves the forearm anteriorly!'
    },
    {
      id: 'mov-2',
      pinNumber: 2,
      labelEn: 'Abduction & Adduction',
      labelAr: 'تبعيد وتقريب',
      posX: 48,
      posY: 30,
      explanation: 'Abduction moves a structure away from the midline; Adduction moves it toward the midline.',
      location: 'Occurs in the Coronal plane around an anteroposterior axis (e.g., Shoulder, Hip, Fingers).',
      functionDesc: 'Side-to-side extremity control.',
      movementMechanics: 'Deltoid abducts the arm (15°-90°); Pectoralis major and latissimus dorsi adduct.',
      examTip: 'For fingers, midline is the middle finger (3rd digit); for toes, midline is the 2nd toe.'
    },
    {
      id: 'mov-3',
      pinNumber: 3,
      labelEn: 'Medial & Lateral Rotation',
      labelAr: 'دوران إنسي (داخلي) ودوران وحشي (خارجي)',
      posX: 75,
      posY: 30,
      explanation: 'Movement of a bone around its own longitudinal axis toward or away from the midline.',
      location: 'Ball-and-socket joints (Glenohumeral and Hip joints).',
      functionDesc: 'Rotational orientation of limbs.',
      movementMechanics: 'Subscapularis medially rotates; Infraspinatus laterally rotates humerus.',
      examTip: 'Circumduction is a combination of flexion, abduction, extension, and adduction in sequence.'
    },
    {
      id: 'mov-4',
      pinNumber: 4,
      labelEn: 'Pronation & Supination',
      labelAr: 'كب وبسط الساعد',
      posX: 35,
      posY: 75,
      explanation: 'Pronation turns the palm backwards/downwards; Supination turns the palm forwards/upwards.',
      location: 'Radioulnar joints (proximal and distal).',
      functionDesc: 'Hand manipulation and eating.',
      movementMechanics: 'Radius crosses over the ulna during pronation like an X; bones are parallel in supination.',
      examTip: 'Anatomical position requires the forearm to be in full SUPINATION.'
    },
    {
      id: 'mov-5',
      pinNumber: 5,
      labelEn: 'Inversion & Eversion',
      labelAr: 'انقلاب القدم للداخل والخارج',
      posX: 65,
      posY: 75,
      explanation: 'Inversion turns the sole of the foot medially; Eversion turns the sole laterally.',
      location: 'Subtalar and transverse tarsal joints of the foot.',
      functionDesc: 'Adapts the foot to walking on uneven terrain.',
      movementMechanics: 'Tibialis anterior & posterior invert; Fibularis longus & brevis evert.',
      examTip: 'Most ankle sprains occur in excessive INVERSION injuring lateral collateral ligaments.'
    }
  ],
  anat_skeletal: [
    {
      id: 'skel-1',
      pinNumber: 1,
      labelEn: 'Skull & Facial Bones',
      labelAr: 'الجمجمة وعظام الوجه',
      posX: 50,
      posY: 12,
      explanation: 'Cranium (8 bones) protecting the brain + Facial skeleton (14 bones).',
      location: 'Axial skeleton superior pole.',
      functionDesc: 'Protects the encephalon, supports sensory organs (eyes, ears, olfaction), and anchors facial muscles.',
      examTip: 'Mandible is the only mobile bone of the facial skeleton.'
    },
    {
      id: 'skel-2',
      pinNumber: 2,
      labelEn: 'Vertebral Column & Thoracic Cage',
      labelAr: 'العمود الفقري والقفص الصدري',
      posX: 50,
      posY: 38,
      explanation: '7 Cervical, 12 Thoracic, 5 Lumbar vertebrae, Sacrum (5 fused), Coccyx (4 fused) + Sternum & 12 pairs of ribs.',
      location: 'Central axis of the torso.',
      functionDesc: 'Protects the spinal cord, heart, and lungs while bearing body weight.',
      examTip: 'Ribs 1-7 are True ribs; 8-10 are False ribs; 11-12 are Floating ribs.'
    },
    {
      id: 'skel-3',
      pinNumber: 3,
      labelEn: 'Pectoral Girdle & Upper Limb',
      labelAr: 'الحزام الصدري والطرف العلوي',
      posX: 25,
      posY: 45,
      explanation: 'Clavicle + Scapula, Humerus, Radius, Ulna, 8 Carpals, 5 Metacarpals, 14 Phalanges.',
      location: 'Upper appendicular skeleton.',
      functionDesc: 'Maximum mobility for tool manipulation and reaching.',
      examTip: 'The clavicle is the first bone to begin ossification and the last to complete.'
    },
    {
      id: 'skel-4',
      pinNumber: 4,
      labelEn: 'Pelvic Girdle & Lower Limb',
      labelAr: 'الحزام الحوضي والطرف السفلي',
      posX: 50,
      posY: 75,
      explanation: 'Pelvis (Ilium, Ischium, Pubis), Femur, Patella, Tibia, Fibula, 7 Tarsals, 5 Metatarsals, 14 Phalanges.',
      location: 'Lower appendicular skeleton.',
      functionDesc: 'Weight bearing, bipedal stability, and locomotion.',
      examTip: 'Femur is the longest, strongest, and heaviest bone in the human body.'
    }
  ],
  anat_joints: [
    {
      id: 'jnt-1',
      pinNumber: 1,
      labelEn: 'Synovial Joints (Diarthroses)',
      labelAr: 'المفاصل الزلالية (حرة الحركة)',
      posX: 30,
      posY: 35,
      explanation: 'Freely movable joints characterized by a joint cavity, synovial fluid, articular cartilage, and fibrous capsule.',
      location: 'Shoulder, Knee, Hip, Elbow, Wrist, Ankle.',
      functionDesc: 'Permit wide ranges of movement.',
      examTip: 'Shoulder is ball-and-socket (highest mobility, lowest stability); Hip is ball-and-socket (high stability).'
    },
    {
      id: 'jnt-2',
      pinNumber: 2,
      labelEn: 'Cartilaginous Joints (Amphiarthroses)',
      labelAr: 'المفاصل الغضروفية (محدودة الحركة)',
      posX: 50,
      posY: 55,
      explanation: 'Bones joined by fibrocartilage or hyaline cartilage without a synovial cavity.',
      location: 'Intervertebral discs, Pubic symphysis, Manubriosternal joint.',
      functionDesc: 'Shock absorption and limited resilience under compression.',
      examTip: 'Primary cartilaginous (Synchondroses) are temporary (epiphyseal plate); Secondary (Symphyses) are permanent in midline.'
    },
    {
      id: 'jnt-3',
      pinNumber: 3,
      labelEn: 'Fibrous Joints (Synarthroses)',
      labelAr: 'المفاصل الليفية (عديمة الحركة)',
      posX: 70,
      posY: 35,
      explanation: 'Bones held firmly together by dense fibrous connective tissue with no movement.',
      location: 'Sutures of skull, Syndesmosis (inferior tibiofibular), Gomphosis (teeth in dental alveoli).',
      functionDesc: 'Rigid protection and structural fixation.',
      examTip: 'Gomphosis is the peg-in-socket joint holding teeth via periodontal ligament.'
    }
  ],
  anat_muscles: [
    {
      id: 'mus-1',
      pinNumber: 1,
      labelEn: 'Pectoralis Major & Deltoid',
      labelAr: 'العضلة الصدرية الكبيرة والدالية',
      posX: 40,
      posY: 28,
      explanation: 'Pectoralis major flexes, adducts, and medially rotates the arm. Deltoid abducts the arm.',
      location: 'Anterior chest wall and shoulder cap.',
      functionDesc: 'Upper limb pushing, hugging, and elevation.',
      examTip: 'Deltoid is innervated by the Axillary nerve; Pectoralis major by Medial & Lateral pectoral nerves.'
    },
    {
      id: 'mus-2',
      pinNumber: 2,
      labelEn: 'Biceps Brachii & Rectus Abdominis',
      labelAr: 'العضلة ذات الرأسين العضدية والمستقيمة البطنية',
      posX: 50,
      posY: 45,
      explanation: 'Biceps brachii flexes and supinates forearm. Rectus abdominis flexes vertebral column.',
      location: 'Anterior compartment of arm and anterior abdominal wall.',
      functionDesc: 'Arm pulling and core trunk posture / abdominal compression.',
      examTip: 'Biceps is the most powerful SUPINATOR of the flexed forearm!'
    },
    {
      id: 'mus-3',
      pinNumber: 3,
      labelEn: 'Quadriceps Femoris & Hamstrings',
      labelAr: 'عضلة الفخذ رباعية الرؤوس وعضلات المأبض (الخلفية)',
      posX: 50,
      posY: 75,
      explanation: 'Quadriceps extends the knee. Hamstrings flex the knee and extend the hip.',
      location: 'Anterior and posterior compartments of the thigh.',
      functionDesc: 'Walking, running, jumping, and standing erect.',
      examTip: 'Quadriceps is innervated by the Femoral nerve; Hamstrings by the Sciatic nerve (Tibial division).'
    }
  ]
};

// Initial pre-seeded reference hotspots for Histology topics
export const DEFAULT_HISTOLOGY_HOTSPOTS: Record<string, MedicalImageHotspot[]> = {
  lesson_05: [
    {
      id: 'stain-1',
      pinNumber: 1,
      labelEn: 'Hematoxylin & Eosin (H&E)',
      labelAr: 'صبغة الهيماتوكسيلين والإيوسين',
      posX: 22,
      posY: 30,
      explanation: 'The universal gold-standard routine histological stain.',
      location: 'All standard tissue biopsies.',
      functionDesc: 'Hematoxylin (basic) stains nuclei purple/blue. Eosin (acidic) stains cytoplasm and collagen pink/red.',
      stainAffinity: 'Nuclei = Basophilic (blue); Cytoplasm/ECM = Acidophilic (pink).',
      examTip: 'If a slide is pink/purple, your first diagnostic guess is always routine H&E.'
    },
    {
      id: 'stain-2',
      pinNumber: 2,
      labelEn: 'Periodic Acid-Schiff (PAS)',
      labelAr: 'صبغة حمض البيروديك - شيف (PAS)',
      posX: 50,
      posY: 30,
      explanation: 'Special carbohydrate & glycoprotein stain.',
      location: 'Basement membranes, brush borders, and mucin in goblet cells.',
      functionDesc: 'Oxidizes glycols to aldehydes reacting with Schiff reagent to produce intense magenta/pink color.',
      stainAffinity: 'Glycogen, mucus, basement membranes = Bright Magenta.',
      examTip: 'Differentiates Goblet cells and clearly highlights the renal/intestinal basement membrane.'
    },
    {
      id: 'stain-3',
      pinNumber: 3,
      labelEn: 'Silver Impregnation (Ag)',
      labelAr: 'الترسيب الفضي (Silver Impregnation)',
      posX: 78,
      posY: 30,
      explanation: 'Argyrophilic reduction of metallic silver onto delicate fibers and cell processes.',
      location: 'Reticular fibers (Type III collagen), Golgi complex, and neuron axons/dendrites.',
      functionDesc: 'Black/brown fibers against a golden-yellow or pale background.',
      stainAffinity: 'Reticular fibers & neurofilaments = Pitch Black.',
      examTip: 'Reticular fibers in lymph nodes or spleen are INVISIBLE on H&E and ONLY visible with Silver!'
    }
  ],
  lesson_08: [
    {
      id: 'epi-1',
      pinNumber: 1,
      labelEn: 'Simple Squamous Epithelium (Alveoli / Mesothelium)',
      labelAr: 'ظهارة حرشفية بسيطة',
      posX: 20,
      posY: 40,
      explanation: 'Single layer of flattened pancake-like cells with bulging oval/flat nuclei.',
      location: 'Lung alveoli, vascular endothelium, peritoneal mesothelium, Bowman’s capsule parietal layer.',
      functionDesc: 'Rapid gas exchange, filtration, and ultra-smooth fluid transport.',
      stainAffinity: 'H&E: Flattened elongated dark blue nuclei along thin eosinophilic cytoplasm.',
      examTip: 'Look for air spaces in lung alveoli lined by single-cell-thick flat nuclei.'
    },
    {
      id: 'epi-2',
      pinNumber: 2,
      labelEn: 'Simple Cuboidal Epithelium (Renal Tubules)',
      labelAr: 'ظهارة مكعبة بسيطة (النبيبات الكلوية)',
      posX: 50,
      posY: 40,
      explanation: 'Single layer of cells as tall as they are wide, with perfectly round, central nuclei.',
      location: 'Kidney collecting ducts and proximal/distal convoluted tubules, thyroid follicles.',
      functionDesc: 'Active secretion and selective ion absorption.',
      stainAffinity: 'H&E: Regular rings of cuboidal cells with dark spherical central nuclei.',
      examTip: 'Central round nucleus = Cuboidal; basal elongated nucleus = Columnar.'
    },
    {
      id: 'epi-3',
      pinNumber: 3,
      labelEn: 'Pseudostratified Ciliated Columnar (Trachea)',
      labelAr: 'ظهارة عمادية مهدبة مطبقة كاذبة (الرغامي)',
      posX: 80,
      posY: 40,
      explanation: 'All cells contact the basement membrane, but nuclei lie at different heights giving a false stratified appearance.',
      location: 'Respiratory tract: Trachea and main bronchi.',
      functionDesc: 'Mucociliary escalator sweeping dust and debris toward the oropharynx.',
      stainAffinity: 'H&E: Prominent apical cilia + scattered clear goblet cells.',
      examTip: 'Look for the combination: Multi-tiered nuclei + Apical Cilia + Goblet cells = Respiratory lining.'
    }
  ],
  lesson_09: [
    {
      id: 'ct-1',
      pinNumber: 1,
      labelEn: 'White Adipose Tissue (Unilocular)',
      labelAr: 'نسيج دهني أبيض (وحيد الفجوة)',
      posX: 35,
      posY: 45,
      explanation: 'Large empty-appearing polygonal cells each containing one huge lipid droplet.',
      location: 'Hypodermis of skin, surrounding kidneys, omentum.',
      functionDesc: 'Energy storage, thermal insulation, and mechanical cushioning.',
      stainAffinity: 'H&E: Chicken-wire appearance (fat dissolves during standard preparation leaving empty white spaces) with compressed peripheral crescent nuclei.',
      examTip: 'Signet-ring appearance: Peripheral nucleus flattened by large central lipid droplet.'
    },
    {
      id: 'ct-2',
      pinNumber: 2,
      labelEn: 'Plasma Cell (Clock-Face / Cartwheel Nucleus)',
      labelAr: 'الخلية البلازمية (نواة وجه الساعة)',
      posX: 70,
      posY: 45,
      explanation: 'Activated B-lymphocyte specialized for large-scale antibody (immunoglobulin) synthesis.',
      location: 'Connective tissue lamina propria, spleen, lymph nodes.',
      functionDesc: 'Produces and secretes humoral antibodies.',
      stainAffinity: 'Intensely basophilic cytoplasm (dense RER) with a pale negative Golgi zone next to eccentric nucleus with radiating heterochromatin blocks.',
      examTip: 'Clock-face / Cartwheel nucleus + Pale Golgi hof = Plasma Cell.'
    }
  ],
  lesson_06: [
    {
      id: 'org-1',
      pinNumber: 1,
      labelEn: 'Mitochondria (Cristae)',
      labelAr: 'الميتوكوندريا (الأعراف)',
      posX: 30,
      posY: 30,
      explanation: 'Double-membrane powerhouse organelle with folded inner membrane cristae.',
      location: 'Abundant in metabolically active cells (kidney tubule cells, hepatocytes, cardiac muscle).',
      functionDesc: 'ATP synthesis via oxidative phosphorylation.',
      stainAffinity: 'TEM: Distinct inner cristae folds. LM: Iron hematoxylin.',
      examTip: 'Outer smooth membrane + Inner folded cristae containing ATP synthase.'
    },
    {
      id: 'org-2',
      pinNumber: 2,
      labelEn: 'Rough Endoplasmic Reticulum (RER)',
      labelAr: 'الشبكة الإندوبلازمية الخشنة',
      posX: 70,
      posY: 30,
      explanation: 'Flattened membranous cisternae studded with ribosomes on cytosolic surface.',
      location: 'Perinuclear cytoplasm in secretory cells.',
      functionDesc: 'Synthesis and folding of membrane-bound and export proteins.',
      stainAffinity: 'TEM: Parallel ribosome-studded membranes. LM: Basophilic cytoplasm (Nissl bodies, ergastoplasm).',
      examTip: 'Ribosomes impart strong basophilia (affinity for hematoxylin/methylene blue).'
    }
  ]
};

class MedicalMediaService {
  private inMemoryRecords: MedicalImageRecord[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.inMemoryRecords = JSON.parse(raw);
      }
    } catch {
      this.inMemoryRecords = [];
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.inMemoryRecords));
    } catch {
      // Quota exceeded: prune oldest non-primary uploads or handle gracefully
    }
  }

  // Get active image for a specific subject and topic/lesson
  public getPrimaryImage(subject: 'anatomy' | 'histology', topicOrLessonId: string): MedicalImageRecord {
    // 1. Check for user uploaded image (HIGHEST PRIORITY)
    const userImg = this.inMemoryRecords.find(
      r => r.subject === subject && r.topicOrLessonId === topicOrLessonId && r.isPrimarySource
    );
    if (userImg) {
      return userImg;
    }

    // 2. Return the official built-in Primary Reference Atlas image
    return this.createDefaultAtlasRecord(subject, topicOrLessonId);
  }

  // Alias for getPrimaryImage
  public getImage(subject: 'anatomy' | 'histology', topicOrLessonId: string): MedicalImageRecord {
    return this.getPrimaryImage(subject, topicOrLessonId);
  }

  // Get all images for a specific topic (user uploads + reference atlas)
  public getImagesForTopic(subject: 'anatomy' | 'histology', topicOrLessonId: string): MedicalImageRecord[] {
    const userImgs = this.inMemoryRecords.filter(
      r => r.subject === subject && r.topicOrLessonId === topicOrLessonId
    );
    const defaultImg = this.createDefaultAtlasRecord(subject, topicOrLessonId);
    return [...userImgs, defaultImg];
  }

  // Save new user uploaded image (Becomes Primary Source for this topic)
  public saveUserUploadedImage(params: {
    subject: 'anatomy' | 'histology';
    topicOrLessonId: string;
    title: string;
    titleAr?: string;
    dataUrl: string;
    referenceSource?: string;
    hasLabels?: boolean;
    notes?: string;
  }): MedicalImageRecord {
    // Demote any existing primary source for this topic
    this.inMemoryRecords.forEach(r => {
      if (r.subject === params.subject && r.topicOrLessonId === params.topicOrLessonId) {
        r.isPrimarySource = false;
      }
    });

    const defaultHotspots =
      params.subject === 'anatomy'
        ? DEFAULT_ANATOMY_HOTSPOTS[params.topicOrLessonId] || []
        : DEFAULT_HISTOLOGY_HOTSPOTS[params.topicOrLessonId] || [];

    const newRecord: MedicalImageRecord = {
      id: `usr_img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      subject: params.subject,
      topicOrLessonId: params.topicOrLessonId,
      title: params.title,
      titleAr: params.titleAr,
      sourceType: 'user_upload',
      referenceSource: params.referenceSource || 'User Uploaded Original Reference (Primary Source)',
      isPrimarySource: true,
      dataUrl: params.dataUrl,
      hasLabels: params.hasLabels ?? true,
      uploadedAt: new Date().toISOString(),
      hotspots: defaultHotspots,
      notes: params.notes
    };

    this.inMemoryRecords.unshift(newRecord);
    this.persist();
    return newRecord;
  }

  // Update hotspots for an image
  public updateHotspots(recordId: string, hotspots: MedicalImageHotspot[]): void {
    const rec = this.inMemoryRecords.find(r => r.id === recordId);
    if (rec) {
      rec.hotspots = hotspots;
      this.persist();
    }
  }

  // Delete user image and restore default primary
  public deleteUserImage(recordId: string): void {
    this.inMemoryRecords = this.inMemoryRecords.filter(r => r.id !== recordId);
    this.persist();
  }

  // Default Atlas Factory (Builds structured pre-seeded reference representation)
  private createDefaultAtlasRecord(subject: 'anatomy' | 'histology', topicOrLessonId: string): MedicalImageRecord {
    if (subject === 'anatomy') {
      const hotspots = DEFAULT_ANATOMY_HOTSPOTS[topicOrLessonId] || [
        {
          id: 'def-1',
          pinNumber: 1,
          labelEn: 'Anatomical Reference Structure',
          labelAr: 'تركيب تشريحي مرجعي',
          posX: 50,
          posY: 50,
          explanation: 'Standard medical anatomical reference landmark.',
          location: 'Body in anatomical position.',
          functionDesc: 'Standard reference alignment.'
        }
      ];

      return {
        id: `atlas_anat_${topicOrLessonId}`,
        subject: 'anatomy',
        topicOrLessonId,
        title: 'First-Year Human Anatomy — Complete Anatomical Map',
        titleAr: 'خريطة التشريح البشري المعتمدة — السنة الأولى',
        sourceType: 'primary_reference_atlas',
        referenceSource: 'LAB HUB Official First-Year Medical Atlas',
        isPrimarySource: true,
        svgGraphicId: `anat_${topicOrLessonId}`,
        hasLabels: true,
        uploadedAt: '2026-09-10T00:00:00.000Z',
        hotspots
      };
    } else {
      const hotspots = DEFAULT_HISTOLOGY_HOTSPOTS[topicOrLessonId] || [
        {
          id: 'def-hist-1',
          pinNumber: 1,
          labelEn: 'Diagnostic Histological Criteria',
          labelAr: 'المعايير النسيجية التشخيصية',
          posX: 50,
          posY: 50,
          explanation: 'Microscopic identification criteria under high power.',
          location: 'Diagnostic field of view.',
          functionDesc: 'Tissue architecture and staining pattern.'
        }
      ];

      return {
        id: `atlas_hist_${topicOrLessonId}`,
        subject: 'histology',
        topicOrLessonId,
        title: 'Comprehensive Medical Histology Visual Map Poster',
        titleAr: 'الملصق المرجعي الشامل لعلم الأنسجة الطبي',
        sourceType: 'primary_reference_atlas',
        referenceSource: 'Sana’a University Medical Practical Guide & LAB HUB Atlas',
        isPrimarySource: true,
        svgGraphicId: `hist_${topicOrLessonId}`,
        hasLabels: true,
        uploadedAt: '2026-09-10T00:00:00.000Z',
        hotspots
      };
    }
  }
}

export const medicalMediaService = new MedicalMediaService();
