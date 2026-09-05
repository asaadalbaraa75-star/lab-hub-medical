export interface BankMcqQuestion {
  id: string;
  subjectId: 'anatomy' | 'histology' | 'biochemistry';
  topic: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  keyPoints: string[];
  clinicalPearl?: string;
  imageUrl?: string;
}

// 100 ANATOMY QUESTIONS (High-yield first-year medical curriculum)
export const ANATOMY_MCQ_BANK: BankMcqQuestion[] = [
  // Anatomical Planes & Terminology (1-10)
  {
    id: 'anat-001',
    subjectId: 'anatomy',
    topic: 'Anatomical Planes',
    difficulty: 'basic',
    question: 'Which anatomical plane divides the body into equal right and left halves?',
    options: ['Coronal plane', 'Median (Mid-sagittal) plane', 'Transverse plane', 'Parasagittal plane'],
    correctIndex: 1,
    explanation: 'The median (or mid-sagittal) plane is a vertical plane passing longitudinally through the midline of the body, dividing it into equal right and left halves.',
    keyPoints: ['Mid-sagittal = equal right/left', 'Coronal/Frontal = anterior/posterior', 'Transverse = superior/inferior']
  },
  {
    id: 'anat-002',
    subjectId: 'anatomy',
    topic: 'Directional Terms',
    difficulty: 'basic',
    question: 'In the standard anatomical position, the thumb (pollex) is described as being _____ to the little finger (digitus minimus).',
    options: ['Medial', 'Lateral', 'Proximal', 'Distal'],
    correctIndex: 1,
    explanation: 'In the anatomical position, the palms face forward (anteriorly) with the thumbs directed away from the midline, making the thumb lateral to the little finger.',
    keyPoints: ['Anatomical position = palms forward (supinated)', 'Thumb = lateral', 'Little finger = medial']
  },
  {
    id: 'anat-003',
    subjectId: 'anatomy',
    topic: 'Body Movements',
    difficulty: 'basic',
    question: 'Moving a limb away from the median plane in the coronal plane is termed:',
    options: ['Adduction', 'Abduction', 'Flexion', 'Extension'],
    correctIndex: 1,
    explanation: 'Abduction means movement away from the central axis/median plane of the body (Latin: ab = away from).',
    keyPoints: ['Abduction = away from midline', 'Adduction = towards midline', 'Flexion = decreasing joint angle']
  },
  {
    id: 'anat-004',
    subjectId: 'anatomy',
    topic: 'Body Movements',
    difficulty: 'basic',
    question: 'Rotation of the forearm so that the palm faces posteriorly or downward is called:',
    options: ['Supination', 'Pronation', 'Inversion', 'Eversion'],
    correctIndex: 1,
    explanation: 'Pronation is the medial rotation of the radius over the ulna, resulting in the palm facing posteriorly or downward.',
    keyPoints: ['Supination = palm up/anterior ("holding a bowl of soup")', 'Pronation = palm down/posterior']
  },
  {
    id: 'anat-005',
    subjectId: 'anatomy',
    topic: 'Directional Terms',
    difficulty: 'basic',
    question: 'The elbow is _____ to the wrist.',
    options: ['Distal', 'Proximal', 'Superficial', 'Inferior'],
    correctIndex: 1,
    explanation: 'Proximal indicates closer to the attachment point of a limb to the trunk. The elbow is closer to the shoulder than the wrist, hence proximal.',
    keyPoints: ['Proximal = closer to trunk', 'Distal = further from trunk']
  },
  {
    id: 'anat-006',
    subjectId: 'anatomy',
    topic: 'Anatomical Planes',
    difficulty: 'intermediate',
    question: 'A CT scan displaying cross-sectional slices perpendicular to the long axis of the body represents which plane?',
    options: ['Sagittal', 'Coronal', 'Transverse (Axial)', 'Oblique'],
    correctIndex: 2,
    explanation: 'Axial or transverse CT images slice horizontally across the body perpendicular to the craniocaudal axis.',
    keyPoints: ['Axial CT = Transverse plane', 'Perpendicular to long axis']
  },
  {
    id: 'anat-007',
    subjectId: 'anatomy',
    topic: 'Body Movements',
    difficulty: 'intermediate',
    question: 'Turning the sole of the foot inward toward the median plane is called:',
    options: ['Eversion', 'Inversion', 'Dorsiflexion', 'Plantarflexion'],
    correctIndex: 1,
    explanation: 'Inversion moves the sole of the foot toward the median plane, while eversion turns the sole outward away from the median plane.',
    keyPoints: ['Inversion = sole inward (subtalar joint)', 'Eversion = sole outward']
  },
  {
    id: 'anat-008',
    subjectId: 'anatomy',
    topic: 'Directional Terms',
    difficulty: 'basic',
    question: 'Which term describes a structure situated closer to the back surface of the human body?',
    options: ['Ventral', 'Anterior', 'Dorsal / Posterior', 'Rostral'],
    correctIndex: 2,
    explanation: 'Posterior (or dorsal) describes the back or rear surface of the human body.',
    keyPoints: ['Dorsal/Posterior = back', 'Ventral/Anterior = front']
  },
  {
    id: 'anat-009',
    subjectId: 'anatomy',
    topic: 'Anatomical Planes',
    difficulty: 'basic',
    question: 'The coronal plane is also widely known as the:',
    options: ['Frontal plane', 'Horizontal plane', 'Axial plane', 'Sagittal plane'],
    correctIndex: 0,
    explanation: 'The coronal plane runs vertically from side to side, dividing the body into front (anterior) and back (posterior) sections, and is also called the frontal plane.',
    keyPoints: ['Coronal = Frontal plane', 'Named after coronal cranial suture']
  },
  {
    id: 'anat-010',
    subjectId: 'anatomy',
    topic: 'Body Movements',
    difficulty: 'intermediate',
    question: 'A circular movement combining flexion, extension, abduction, and adduction in sequence is:',
    options: ['Rotation', 'Circumduction', 'Opposition', 'Protraction'],
    correctIndex: 1,
    explanation: 'Circumduction is a conical movement produced by the continuous sequential combination of flexion, abduction, extension, and adduction (e.g. at the shoulder or hip joint).',
    keyPoints: ['Circumduction = conical movement', 'Requires multi-axial ball-and-socket or condyloid joint']
  },

  // Osteology & Skeletal System (11-30)
  {
    id: 'anat-011',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'How many bones are typically found in the adult human skeleton?',
    options: ['186', '206', '226', '246'],
    correctIndex: 1,
    explanation: 'The typical adult human skeleton consists of 206 named bones: 80 in the axial skeleton and 126 in the appendicular skeleton.',
    keyPoints: ['Total adult bones = 206', 'Axial = 80', 'Appendicular = 126']
  },
  {
    id: 'anat-012',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'Which of the following bones belongs to the axial skeleton?',
    options: ['Clavicle', 'Scapula', 'Sternum', 'Femur'],
    correctIndex: 2,
    explanation: 'The sternum, along with the skull, vertebral column, and ribs, forms the axial skeleton supporting the central axis of the body.',
    keyPoints: ['Axial: Skull, Vertebrae, Ribs, Sternum', 'Appendicular: Girdles and Limbs']
  },
  {
    id: 'anat-013',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'Which bone contains the sella turcica, housing the pituitary gland (hypophysis)?',
    options: ['Ethmoid bone', 'Sphenoid bone', 'Frontal bone', 'Occipital bone'],
    correctIndex: 1,
    explanation: 'The sphenoid bone in the cranial base contains the sella turcica ("Turkish saddle"), whose hypophyseal fossa shelters the pituitary gland.',
    keyPoints: ['Sphenoid bone = Sella turcica', 'Protects pituitary gland (hypophysis cerebri)'],
    clinicalPearl: 'Pituitary adenomas can expand the sella turcica and compress the optic chiasm, causing bitemporal hemianopia.'
  },
  {
    id: 'anat-014',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'How many cervical vertebrae are present in the normal human vertebral column?',
    options: ['5', '7', '12', '4'],
    correctIndex: 1,
    explanation: 'There are 7 cervical vertebrae (C1-C7), 12 thoracic vertebrae (T1-T12), 5 lumbar vertebrae (L1-L5), 5 fused sacral vertebrae, and 4 fused coccygeal vertebrae.',
    keyPoints: ['Cervical = 7', 'Thoracic = 12', 'Lumbar = 5', 'Sacral = 5 (fused)', 'Coccygeal = 4 (fused)']
  },
  {
    id: 'anat-015',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'The first cervical vertebra (C1) is uniquely named the:',
    options: ['Axis', 'Atlas', 'Vertebra prominens', 'Dens'],
    correctIndex: 1,
    explanation: 'C1 is named the Atlas (supporting the globe of the head). It lacks a vertebral body and spinous process. C2 is the Axis.',
    keyPoints: ['C1 = Atlas (no body, ring-like)', 'C2 = Axis (contains odontoid process / dens)']
  },
  {
    id: 'anat-016',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'The dens (odontoid process) is a prominent characteristic feature of which vertebra?',
    options: ['Atlas (C1)', 'Axis (C2)', 'C7 (Vertebra prominens)', 'T1'],
    correctIndex: 1,
    explanation: 'The dens (odontoid process) projects superiorly from the body of C2 (Axis) and serves as a pivot around which C1 rotates.',
    keyPoints: ['Dens on C2', 'Atlanto-axial joint allows head rotation ("No" movement)']
  },
  {
    id: 'anat-017',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'Which bone is the longest and strongest bone in the human body?',
    options: ['Tibia', 'Humerus', 'Femur', 'Fibula'],
    correctIndex: 2,
    explanation: 'The femur (thigh bone) is the longest, heaviest, and strongest tubular bone in the human body.',
    keyPoints: ['Femur = longest bone', 'Transmits body weight from pelvis to tibia']
  },
  {
    id: 'anat-018',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'The anatomical landmark located on the distal lateral aspect of the fibula is the:',
    options: ['Medial malleolus', 'Lateral malleolus', 'Tibial tuberosity', 'Greater trochanter'],
    correctIndex: 1,
    explanation: 'The lateral malleolus is the expanded distal end of the fibula forming the lateral prominence of the ankle joint.',
    keyPoints: ['Lateral malleolus = Fibula', 'Medial malleolus = Tibia']
  },
  {
    id: 'anat-019',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'The patella is anatomically classified as a:',
    options: ['Long bone', 'Flat bone', 'Sesamoid bone', 'Pneumatic bone'],
    correctIndex: 2,
    explanation: 'The patella is the largest sesamoid bone in the body, embedded within the tendon of the quadriceps femoris muscle.',
    keyPoints: ['Patella = largest sesamoid bone', 'Increases quadriceps mechanical leverage']
  },
  {
    id: 'anat-020',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'Which carpal bone is the most frequently fractured during a fall on an outstretched hand (FOOSH)?',
    options: ['Hamate', 'Scaphoid', 'Lunate', 'Pisiform'],
    correctIndex: 1,
    explanation: 'The scaphoid is the most commonly fractured carpal bone. Tenderness in the anatomical snuffbox is a classic diagnostic sign.',
    keyPoints: ['Scaphoid = most fractured carpal bone', 'Vulnerable to avascular necrosis due to retrograde blood supply'],
    clinicalPearl: 'Avascular necrosis of the proximal scaphoid pole occurs due to retrograde intraosseous arterial supply entering distally.'
  },
  {
    id: 'anat-021',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'Which cranial nerve passes through the cribriform plate of the ethmoid bone?',
    options: ['Optic nerve (CN II)', 'Olfactory nerve fibers (CN I)', 'Oculomotor nerve (CN III)', 'Facial nerve (CN VII)'],
    correctIndex: 1,
    explanation: 'The olfactory nerve filaments (CN I) pass from the olfactory epithelium in the nasal cavity through the foramina of the cribriform plate into the anterior cranial fossa.',
    keyPoints: ['Cribriform plate = CN I (Olfactory)', 'Damage causes anosmia']
  },
  {
    id: 'anat-022',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'Which bone forms the prominence of the cheek?',
    options: ['Maxilla', 'Zygomatic bone', 'Temporal bone', 'Mandible'],
    correctIndex: 1,
    explanation: 'The zygomatic bone (malar bone) forms the cheek prominence and contributes to the lateral wall and floor of the orbit.',
    keyPoints: ['Zygomatic bone = cheek bone', 'Articulates with frontal, temporal, and maxilla']
  },
  {
    id: 'anat-023',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'How many true ribs (vertebrocostal ribs) attach directly to the sternum via their own costal cartilages?',
    options: ['5 pairs', '7 pairs', '10 pairs', '12 pairs'],
    correctIndex: 1,
    explanation: 'Ribs 1-7 are true ribs (attach directly to the sternum). Ribs 8-10 are false ribs (attach to the cartilage of rib above). Ribs 11-12 are floating ribs.',
    keyPoints: ['True ribs = 1-7 (7 pairs)', 'False ribs = 8-10 (3 pairs)', 'Floating ribs = 11-12 (2 pairs)']
  },
  {
    id: 'anat-024',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'advanced',
    question: 'The pterion, a H-shaped bony junction in the temporal fossa, overlies which important blood vessel?',
    options: ['Internal carotid artery', 'Middle meningeal artery', 'Vertebral artery', 'Superior cerebral vein'],
    correctIndex: 1,
    explanation: 'The pterion overlies the anterior division of the middle meningeal artery. Fractures at this point frequently cause epidural (extradural) hematoma.',
    keyPoints: ['Pterion = junction of frontal, parietal, temporal, and sphenoid', 'Overlies anterior branch of middle meningeal artery'],
    clinicalPearl: 'Epidural hematoma presents with a classic "lucid interval" followed by rapid neurological deterioration.'
  },
  {
    id: 'anat-025',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'The olecranon process, which forms the bony point of the elbow, is part of the:',
    options: ['Humerus', 'Radius', 'Ulna', 'Scapula'],
    correctIndex: 2,
    explanation: 'The olecranon process is the prominent proximal posterior projection of the ulna where the triceps brachii tendon inserts.',
    keyPoints: ['Olecranon = proximal Ulna', 'Point of insertion for Triceps brachii']
  },
  {
    id: 'anat-026',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'The clavicle articulates laterally with the:',
    options: ['Manubrium', 'Coracoid process', 'Acromion of the scapula', 'Glenoid fossa'],
    correctIndex: 2,
    explanation: 'The lateral (acromial) end of the clavicle articulates with the acromion of the scapula to form the acromioclavicular (AC) joint.',
    keyPoints: ['Clavicle medial end = sternoclavicular joint', 'Clavicle lateral end = acromioclavicular joint']
  },
  {
    id: 'anat-027',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'Which structure passes through the foramen magnum of the occipital bone?',
    options: ['Internal carotid artery', 'Medulla oblongata / Spinal cord', 'Optic nerve', 'Maxillary nerve'],
    correctIndex: 1,
    explanation: 'The foramen magnum transmits the transition of the medulla oblongata to the spinal cord, along with the vertebral arteries and spinal accessory nerve (CN XI).',
    keyPoints: ['Foramen magnum = largest foramen in skull base', 'Transmits spinal cord, vertebral arteries, CN XI']
  },
  {
    id: 'anat-028',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'intermediate',
    question: 'The obturator foramen is an opening bounded by which pelvic bones?',
    options: ['Ilium and Sacrum', 'Ischium and Pubis', 'Ilium and Ischium', 'Pubis and Sacrum'],
    correctIndex: 1,
    explanation: 'The obturator foramen is a large opening bounded by the ischium and pubis bones of the pelvis, almost closed by the obturator membrane.',
    keyPoints: ['Obturator foramen bounded by Ischium & Pubis', 'Transmits obturator vessels & nerve via small canal']
  },
  {
    id: 'anat-029',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'advanced',
    question: 'The greater sciatic foramen is converted from the greater sciatic notch by which ligament?',
    options: ['Inguinal ligament', 'Sacrospinous ligament and Sacrotuberous ligament', 'Iliofemoral ligament', 'Pubofemoral ligament'],
    correctIndex: 1,
    explanation: 'The sacrospinous and sacrotuberous ligaments convert the sciatic notches of the pelvis into the greater and lesser sciatic foramina.',
    keyPoints: ['Greater sciatic foramen transmits Piriformis, Sciatic nerve, Pudendal bundle']
  },
  {
    id: 'anat-030',
    subjectId: 'anatomy',
    topic: 'Skeletal System',
    difficulty: 'basic',
    question: 'The anatomical socket in the pelvic bone that receives the head of the femur is the:',
    options: ['Glenoid cavity', 'Acetabulum', 'Iliac fossa', 'Sciatic notch'],
    correctIndex: 1,
    explanation: 'The acetabulum is the deep cup-shaped socket on the lateral pelvis formed by the fusion of the ilium, ischium, and pubis.',
    keyPoints: ['Acetabulum = hip socket (ilium + ischium + pubis)', 'Glenoid cavity = shoulder socket (scapula)']
  },

  // Joints & Articulations (31-45)
  {
    id: 'anat-031',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'basic',
    question: 'The shoulder (glenohumeral) joint is structurally classified as a:',
    options: ['Hinge joint', 'Pivot joint', 'Ball-and-socket (spheroidal) joint', 'Saddle joint'],
    correctIndex: 2,
    explanation: 'The glenohumeral joint is a multi-axial ball-and-socket synovial joint providing high mobility at the expense of inherent bony stability.',
    keyPoints: ['Glenohumeral = Ball-and-socket synovial joint', 'Multi-axial movement (flex/ext, abd/add, rot, circumduction)']
  },
  {
    id: 'anat-032',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'basic',
    question: 'The elbow humero-ulnar joint is classified as a:',
    options: ['Hinge (ginglymus) joint', 'Ball-and-socket joint', 'Plane joint', 'Condyloid joint'],
    correctIndex: 0,
    explanation: 'The humero-ulnar joint is a uniaxial hinge joint permitting only flexion and extension in the sagittal plane.',
    keyPoints: ['Humero-ulnar = Hinge joint (uniaxial)', 'Allows flexion and extension only']
  },
  {
    id: 'anat-033',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'intermediate',
    question: 'The atlanto-axial joint (between C1 and C2 dens) is an example of a:',
    options: ['Pivot (trochoid) joint', 'Saddle joint', 'Symphysis', 'Gomphosis'],
    correctIndex: 0,
    explanation: 'The median atlanto-axial joint is a uniaxial pivot joint allowing rotational movement of the head ("saying no").',
    keyPoints: ['Pivot joint = rotation around central axis', 'C1 rotates on C2 dens']
  },
  {
    id: 'anat-034',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'intermediate',
    question: 'The first carpometacarpal joint of the thumb is classified as a:',
    options: ['Saddle (sellar) joint', 'Hinge joint', 'Pivot joint', 'Ball-and-socket joint'],
    correctIndex: 0,
    explanation: 'The 1st carpometacarpal joint (between trapezium and 1st metacarpal) is a classic biaxial saddle joint allowing opposition.',
    keyPoints: ['1st CMC joint = Saddle joint', 'Enables opposition of thumb']
  },
  {
    id: 'anat-035',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'basic',
    question: 'Sutures of the skull are structurally classified as:',
    options: ['Synovial joints', 'Fibrous joints (synarthroses)', 'Primary cartilaginous joints', 'Secondary cartilaginous joints'],
    correctIndex: 1,
    explanation: 'Skull sutures are immovable fibrous joints (synarthroses) united by a dense layer of collagenous fibers.',
    keyPoints: ['Sutures = Fibrous joints', 'Immovable in adults (synarthroses)']
  },
  {
    id: 'anat-036',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'intermediate',
    question: 'Intervertebral discs and the pubic symphysis are examples of:',
    options: ['Synovial joints', 'Primary cartilaginous (synchondroses)', 'Secondary cartilaginous (symphyses)', 'Gomphoses'],
    correctIndex: 2,
    explanation: 'Symphyses are secondary cartilaginous joints where bones are united by fibrocartilage, located strictly in the midline of the body.',
    keyPoints: ['Secondary cartilaginous = Symphysis (fibrocartilage disc)', 'Always in midline (IV discs, pubic symphysis, manubriosternal)']
  },
  {
    id: 'anat-037',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'intermediate',
    question: 'Which cruciate ligament of the knee prevents anterior displacement of the tibia relative to the femur?',
    options: ['Posterior cruciate ligament (PCL)', 'Anterior cruciate ligament (ACL)', 'Medial collateral ligament (MCL)', 'Lateral collateral ligament (LCL)'],
    correctIndex: 1,
    explanation: 'The Anterior Cruciate Ligament (ACL) originates from the anterior intercondylar tibia and inserts into the lateral femoral condyle, preventing anterior tibial translation.',
    keyPoints: ['ACL = prevents anterior tibial slide', 'Tested with Anterior Drawer & Lachman tests'],
    clinicalPearl: 'A positive Lachman test with lack of a firm endpoint is the most sensitive physical exam sign for an acute ACL rupture.'
  },
  {
    id: 'anat-038',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'intermediate',
    question: 'The "Unhappy Triad" (O\'Donoghue triad) of knee injuries classically involves injury to the:',
    options: ['ACL, PCL, and LCL', 'ACL, MCL, and Medial Meniscus', 'PCL, LCL, and Lateral Meniscus', 'Patellar tendon, ACL, and MCL'],
    correctIndex: 1,
    explanation: 'The classic Unhappy Triad results from a lateral blow to the knee (valgus stress + rotation) injuring the ACL, MCL, and medial meniscus.',
    keyPoints: ['Unhappy Triad: ACL + MCL + Medial Meniscus', 'Common in contact sports (valgus force on planted foot)']
  },
  {
    id: 'anat-039',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'advanced',
    question: 'What fibrocartilaginous structure deepens the shallow glenoid cavity of the scapula?',
    options: ['Glenoid labrum', 'Acetabular labrum', 'Coracohumeral ligament', 'Subacromial bursa'],
    correctIndex: 0,
    explanation: 'The glenoid labrum is a fibrocartilaginous rim that attaches around the margins of the glenoid cavity, deepening the socket for the humeral head.',
    keyPoints: ['Glenoid labrum deepens socket', 'Site of SLAP tears (Superior Labrum Anterior to Posterior)']
  },
  {
    id: 'anat-040',
    subjectId: 'anatomy',
    topic: 'Joints & Articulations',
    difficulty: 'basic',
    question: 'Synovial fluid is secreted by which structure within a joint capsule?',
    options: ['Fibrous capsule', 'Articular cartilage', 'Synovial membrane', 'Periosteum'],
    correctIndex: 2,
    explanation: 'The inner vascular layer of the articular capsule, the synovial membrane, secretes viscous synovial fluid rich in hyaluronic acid to lubricate and nourish the cartilage.',
    keyPoints: ['Synovial membrane lines joint capsule (except over articular cartilage)', 'Secretes lubricating synovial fluid']
  },

  // Muscular System (41-65)
  {
    id: 'anat-041',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'basic',
    question: 'Which muscle is the primary abductor of the arm from 15° to 90°?',
    options: ['Supraspinatus', 'Deltoid', 'Pectoralis major', 'Latissimus dorsi'],
    correctIndex: 1,
    explanation: 'The deltoid muscle (axillary nerve) is the main abductor of the arm from 15° to 90°. Supraspinatus initiates abduction (0-15°).',
    keyPoints: ['0-15° abduction = Supraspinatus', '15-90° abduction = Deltoid', '>90° abduction = Trapezius & Serratus anterior']
  },
  {
    id: 'anat-042',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'intermediate',
    question: 'Which of the following is NOT one of the four rotator cuff muscles (SITS)?',
    options: ['Supraspinatus', 'Infraspinatus', 'Teres minor', 'Teres major'],
    correctIndex: 3,
    explanation: 'The rotator cuff (SITS) consists of Supraspinatus, Infraspinatus, Teres minor, and Subscapularis. Teres major is NOT a rotator cuff muscle.',
    keyPoints: ['Rotator cuff = SITS (Supraspinatus, Infraspinatus, Teres minor, Subscapularis)', 'Teres major is NOT in rotator cuff']
  },
  {
    id: 'anat-043',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'intermediate',
    question: 'Winged scapula results from injury to the long thoracic nerve, which paralyzes which muscle?',
    options: ['Trapezius', 'Latissimus dorsi', 'Serratus anterior', 'Rhomboid major'],
    correctIndex: 2,
    explanation: 'The long thoracic nerve (C5, C6, C7) innervates the serratus anterior muscle. Paralysis prevents the medial border of the scapula from holding flat against the thoracic wall.',
    keyPoints: ['Long thoracic nerve = Serratus anterior ("C5,6,7 wings to heaven")', 'Presents with medial scapular winging'],
    clinicalPearl: 'Often injured during radical mastectomy, axillary lymph node dissection, or stab wounds to the lateral chest wall.'
  },
  {
    id: 'anat-044',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'basic',
    question: 'Which muscle is the primary flexor of the forearm at the elbow joint and a powerful supinator when the elbow is flexed?',
    options: ['Brachialis', 'Biceps brachii', 'Triceps brachii', 'Coracobrachialis'],
    correctIndex: 1,
    explanation: 'Biceps brachii (musculocutaneous nerve) flexes the supinated forearm and acts as the most powerful supinator of the flexed elbow.',
    keyPoints: ['Biceps brachii = flexor & powerful supinator', 'Innervated by Musculocutaneous nerve']
  },
  {
    id: 'anat-045',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'basic',
    question: 'The triceps brachii muscle is innervated by which nerve?',
    options: ['Median nerve', 'Ulnar nerve', 'Radial nerve', 'Musculocutaneous nerve'],
    correctIndex: 2,
    explanation: 'The radial nerve innervates all three heads of the triceps brachii muscle, which is the primary extensor of the elbow.',
    keyPoints: ['Radial nerve innervates all posterior arm/forearm extensors', 'Damage causes wrist drop']
  },
  {
    id: 'anat-046',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'intermediate',
    question: 'Compression of the median nerve in the carpal tunnel leads to weakness in which muscle group?',
    options: ['Hypothenar muscles', 'Thenar muscles (LOAF)', 'Dorsal interossei', 'Extensor pollicis longus'],
    correctIndex: 1,
    explanation: 'The median nerve supplies the thenar muscles (Abductor pollicis brevis, Flexor pollicis brevis, Opponens pollicis) and lateral two lumbricals (LOAF).',
    keyPoints: ['Median nerve supplies LOAF muscles in hand', 'Thenar atrophy occurs in chronic Carpal Tunnel Syndrome']
  },
  {
    id: 'anat-047',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'basic',
    question: 'Which large muscle forms the primary bulk of the buttock and is the principal extensor of the thigh at the hip?',
    options: ['Gluteus medius', 'Gluteus minimus', 'Gluteus maximus', 'Piriformis'],
    correctIndex: 2,
    explanation: 'Gluteus maximus (inferior gluteal nerve) is the largest muscle in the gluteal region and the most powerful extensor and lateral rotator of the hip (vital for rising from a chair and climbing stairs).',
    keyPoints: ['Gluteus maximus = Hip extensor (Inferior gluteal nerve)', 'Gluteus medius/minimus = Hip abductor (Superior gluteal nerve)']
  },
  {
    id: 'anat-048',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'intermediate',
    question: 'A positive Trendelenburg sign (pelvic drop on unsupported side during walking) indicates weakness of:',
    options: ['Gluteus maximus', 'Gluteus medius and minimus (Superior gluteal nerve)', 'Iliopsoas', 'Hamstrings'],
    correctIndex: 1,
    explanation: 'Gluteus medius and minimus, innervated by the superior gluteal nerve, stabilize the pelvis during the stance phase of walking.',
    keyPoints: ['Trendelenburg sign = Superior gluteal nerve / Gluteus medius lesion', 'Pelvis sags toward unsupported side']
  },
  {
    id: 'anat-049',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'basic',
    question: 'Which muscle group occupies the anterior compartment of the thigh and extends the leg at the knee joint?',
    options: ['Hamstrings', 'Quadriceps femoris', 'Adductor group', 'Iliopsoas'],
    correctIndex: 1,
    explanation: 'The quadriceps femoris (Rectus femoris, Vastus lateralis, Vastus medialis, Vastus intermedius), innervated by the femoral nerve, is the sole extensor of the knee.',
    keyPoints: ['Quadriceps femoris = Femoral nerve (knee extension)', 'Hamstrings = Sciatic nerve (knee flexion)']
  },
  {
    id: 'anat-050',
    subjectId: 'anatomy',
    topic: 'Muscular System',
    difficulty: 'intermediate',
    question: 'The Achilles tendon (calcaneal tendon) is formed by the conjoined tendons of which muscles?',
    options: ['Gastrocnemius and Soleus (Triceps surae)', 'Tibialis anterior and Extensor digitorum', 'Peroneus longus and brevis', 'Tibialis posterior and Flexor hallucis'],
    correctIndex: 0,
    explanation: 'The calcaneal tendon (Achilles tendon) is the thickest and strongest tendon in the body, formed by the gastrocnemius, soleus, and plantaris muscles.',
    keyPoints: ['Achilles tendon = Gastrocnemius + Soleus', 'Inserts on calcaneal tuberosity', 'Performs plantarflexion (Tibial nerve)']
  },

  // Organ Systems (66-100)
  {
    id: 'anat-051',
    subjectId: 'anatomy',
    topic: 'Cardiovascular System',
    difficulty: 'basic',
    question: 'Which chamber of the heart possesses the thickest muscular wall due to the high systemic resistance it overcomes?',
    options: ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'],
    correctIndex: 3,
    explanation: 'The left ventricle has a myocardium approximately 3 times thicker than the right ventricle because it pumps against high systemic vascular resistance.',
    keyPoints: ['Left ventricle = thickest myocardium', 'Pumps into high-pressure systemic circuit via Aorta']
  },
  {
    id: 'anat-052',
    subjectId: 'anatomy',
    topic: 'Cardiovascular System',
    difficulty: 'basic',
    question: 'The pacemaker of the normal human heart, located at the junction of the superior vena cava and right atrium, is the:',
    options: ['Atrioventricular (AV) node', 'Sinoatrial (SA) node', 'Bundle of His', 'Purkinje fibers'],
    correctIndex: 1,
    explanation: 'The Sinoatrial (SA) node is the primary physiological pacemaker, initiating rhythmic action potentials at 60-100 bpm.',
    keyPoints: ['SA node = primary pacemaker (crista terminalis)', 'Supplied by SA nodal artery (branch of RCA in 60%)']
  },
  {
    id: 'anat-053',
    subjectId: 'anatomy',
    topic: 'Cardiovascular System',
    difficulty: 'intermediate',
    question: 'The tricuspid atrioventricular valve is situated between which chambers?',
    options: ['Left atrium and left ventricle', 'Right atrium and right ventricle', 'Left ventricle and aorta', 'Right ventricle and pulmonary trunk'],
    correctIndex: 1,
    explanation: 'The tricuspid valve has 3 cusps (anterior, posterior, septal) guarding the right atrioventricular orifice. The bicuspid (mitral) valve guards the left AV orifice.',
    keyPoints: ['Tricuspid = Right AV valve', 'Bicuspid/Mitral = Left AV valve (2 cusps)']
  },
  {
    id: 'anat-054',
    subjectId: 'anatomy',
    topic: 'Respiratory System',
    difficulty: 'basic',
    question: 'The primary muscle of resting quiet inspiration, accounting for ~75% of airflow, is the:',
    options: ['External intercostal muscles', 'Diaphragm', 'Sternocleidomastoid', 'Pectoralis minor'],
    correctIndex: 1,
    explanation: 'The thoracic diaphragm (innervated by the phrenic nerve C3, C4, C5) is the primary inspiratory muscle. Contraction flattens the dome, increasing thoracic volume.',
    keyPoints: ['Diaphragm = primary inspiratory muscle', 'Innervated by Phrenic nerve (C3, 4, 5 keep the diaphragm alive)']
  },
  {
    id: 'anat-055',
    subjectId: 'anatomy',
    topic: 'Respiratory System',
    difficulty: 'intermediate',
    question: 'How many lobes are present in the normal right lung versus the left lung?',
    options: ['Right has 2 lobes; Left has 3 lobes', 'Right has 3 lobes; Left has 2 lobes', 'Both have 3 lobes', 'Both have 2 lobes'],
    correctIndex: 1,
    explanation: 'The right lung has 3 lobes (Superior, Middle, Inferior) separated by horizontal and oblique fissures. The left lung has 2 lobes and a cardiac notch.',
    keyPoints: ['Right lung = 3 lobes (2 fissures: horizontal & oblique)', 'Left lung = 2 lobes (1 oblique fissure + lingula)']
  },
  {
    id: 'anat-056',
    subjectId: 'anatomy',
    topic: 'Respiratory System',
    difficulty: 'intermediate',
    question: 'Inhaled foreign bodies most commonly lodge in which bronchus due to its wider, shorter, and more vertical course?',
    options: ['Right main (principal) bronchus', 'Left main (principal) bronchus', 'Trachea', 'Larynx'],
    correctIndex: 0,
    explanation: 'The right main bronchus is wider, shorter (~2.5 cm), and runs more vertically than the left main bronchus, making foreign body aspiration into the right bronchial tree far more common.',
    keyPoints: ['Right bronchus = wider, shorter, more vertical', 'Aspirated objects most likely lodge in right lower lobe']
  },
  {
    id: 'anat-057',
    subjectId: 'anatomy',
    topic: 'Digestive System',
    difficulty: 'basic',
    question: 'The first and shortest part of the small intestine is the:',
    options: ['Duodenum', 'Jejunum', 'Ileum', 'Cecum'],
    correctIndex: 0,
    explanation: 'The duodenum is the C-shaped initial 25 cm (10 inches) of the small intestine, surrounding the head of the pancreas.',
    keyPoints: ['Duodenum (25 cm) -> Jejunum (2.5 m) -> Ileum (3.5 m)', 'Bile and pancreatic juice enter at the major duodenal papilla']
  },
  {
    id: 'anat-058',
    subjectId: 'anatomy',
    topic: 'Digestive System',
    difficulty: 'intermediate',
    question: 'The vermiform appendix is anatomically attached to which portion of the large intestine?',
    options: ['Ascending colon', 'Transverse colon', 'Cecum', 'Sigmoid colon'],
    correctIndex: 2,
    explanation: 'The vermiform appendix arises from the posteromedial surface of the cecum, approximately 2-3 cm inferior to the ileocecal junction.',
    keyPoints: ['Appendix attached to Cecum', 'Base identified at the confluence of the three teniae coli']
  },
  {
    id: 'anat-059',
    subjectId: 'anatomy',
    topic: 'Digestive System',
    difficulty: 'intermediate',
    question: 'McBurney\'s point, the site of maximal tenderness in acute appendicitis, is located:',
    options: [
      'One-third the distance from the anterior superior iliac spine (ASIS) to the umbilicus',
      'Midway between the xiphoid process and umbilicus',
      'In the left lower quadrant',
      'Over the pubic tubercle'
    ],
    correctIndex: 0,
    explanation: 'McBurney\'s point lies one-third of the distance along a line drawn from the right Anterior Superior Iliac Spine (ASIS) to the umbilicus.',
    keyPoints: ['McBurney\'s point = 1/3 from right ASIS to umbilicus', 'Corresponds to base of appendix'],
    clinicalPearl: 'Maximal tenderness and rebound tenderness at McBurney\'s point signify localized peritoneal inflammation from acute appendicitis.'
  },
  {
    id: 'anat-060',
    subjectId: 'anatomy',
    topic: 'Digestive System',
    difficulty: 'intermediate',
    question: 'The hepatic portal vein is formed by the union of which two major vessels behind the neck of the pancreas?',
    options: [
      'Superior mesenteric vein and Splenic vein',
      'Inferior vena cava and Renal vein',
      'Hepatic vein and Celiac trunk',
      'Left gastric vein and Inferior mesenteric vein'
    ],
    correctIndex: 0,
    explanation: 'The hepatic portal vein is formed by the union of the Superior Mesenteric Vein (SMV) and Splenic Vein posterior to the neck of the pancreas.',
    keyPoints: ['Portal vein = SMV + Splenic vein', 'Transmits nutrient-rich blood from GI tract to liver']
  },
  {
    id: 'anat-061',
    subjectId: 'anatomy',
    topic: 'Urinary System',
    difficulty: 'basic',
    question: 'The functional microscopic filtration and excretory unit of the kidney is the:',
    options: ['Nephron', 'Renal pyramid', 'Major calyx', 'Renal pelvis'],
    correctIndex: 0,
    explanation: 'Each human kidney contains approximately 1-1.2 million nephrons, consisting of a renal corpuscle (glomerulus + Bowman\'s capsule) and renal tubule system.',
    keyPoints: ['Nephron = functional unit (~1 million per kidney)', 'Glomerulus + PCT + Loop of Henle + DCT']
  },
  {
    id: 'anat-062',
    subjectId: 'anatomy',
    topic: 'Urinary System',
    difficulty: 'intermediate',
    question: 'Why is the right kidney positioned slightly lower (inferior) than the left kidney in the abdominal cavity?',
    options: [
      'Due to the presence of the large right lobe of the liver',
      'Due to the stomach position',
      'Due to the spleen',
      'Due to the inferior vena cava'
    ],
    correctIndex: 0,
    explanation: 'The large right lobe of the liver displaces the right kidney downward, making it sit approximately 1-2 cm lower than the left kidney.',
    keyPoints: ['Right kidney lower than left kidney due to liver', 'Left kidney extends from T12 to L3']
  },
  {
    id: 'anat-063',
    subjectId: 'anatomy',
    topic: 'Urinary System',
    difficulty: 'advanced',
    question: 'At which three anatomical sites are ureteric calculi (kidney stones) most commonly arrested?',
    options: [
      'Ureteropelvic junction, pelvic brim crossing, and ureterovesical junction',
      'Renal cortex, loop of Henle, and bladder dome',
      'Major calyx, minor calyx, and urethra',
      'Prostatic urethra, membranous urethra, and penile bulb'
    ],
    correctIndex: 0,
    explanation: 'The ureter has 3 natural anatomical constrictions: (1) Ureteropelvic junction (UPJ), (2) Crossing the iliac vessels at the pelvic brim, and (3) Ureterovesical junction (UVJ) entering the bladder wall.',
    keyPoints: ['3 ureteral constrictions: UPJ, Pelvic brim, UVJ', 'UVJ is the narrowest point']
  },
  {
    id: 'anat-064',
    subjectId: 'anatomy',
    topic: 'Nervous System',
    difficulty: 'basic',
    question: 'The spinal cord in an adult human typically terminates at which vertebral level as the conus medullaris?',
    options: ['T10-T11', 'L1-L2', 'L4-L5', 'S2-S3'],
    correctIndex: 1,
    explanation: 'In adults, the spinal cord tapers to form the conus medullaris at the lower border of L1 or upper border of L2 vertebra. In newborns, it ends at L3.',
    keyPoints: ['Adult spinal cord ends at L1-L2 (conus medullaris)', 'Lumbar puncture performed safely at L3-L4 or L4-L5']
  },
  {
    id: 'anat-065',
    subjectId: 'anatomy',
    topic: 'Nervous System',
    difficulty: 'basic',
    question: 'Cerebrospinal fluid (CSF) is primarily produced by which specialized vascular structure within the brain ventricles?',
    options: ['Arachnoid villi', 'Choroid plexus', 'Corpus callosum', 'Basal ganglia'],
    correctIndex: 1,
    explanation: 'The choroid plexus, located in the lateral, third, and fourth ventricles, secretes CSF at a rate of approximately 500 mL/day.',
    keyPoints: ['Choroid plexus produces CSF', 'Arachnoid granulations reabsorb CSF into dural venous sinuses']
  },
  {
    id: 'anat-066',
    subjectId: 'anatomy',
    topic: 'Nervous System',
    difficulty: 'intermediate',
    question: 'The Circle of Willis (cerebral arterial circle) is located within which meningeal space?',
    options: ['Epidural space', 'Subdural space', 'Subarachnoid space', 'Ventricular cavity'],
    correctIndex: 2,
    explanation: 'The major cerebral arteries and the Circle of Willis lie within the subarachnoid space, surrounded by CSF. Rupture of a berry aneurysm here causes subarachnoid hemorrhage.',
    keyPoints: ['Circle of Willis in Subarachnoid space', 'Rupture causes "worst headache of life" (thunderclap)']
  },
  {
    id: 'anat-067',
    subjectId: 'anatomy',
    topic: 'Nervous System',
    difficulty: 'intermediate',
    question: 'Which cranial nerve supplies the muscles of facial expression and conveys taste from the anterior two-thirds of the tongue?',
    options: ['Trigeminal nerve (CN V)', 'Facial nerve (CN VII)', 'Glossopharyngeal nerve (CN IX)', 'Vagus nerve (CN X)'],
    correctIndex: 1,
    explanation: 'CN VII (Facial nerve) innervates muscles of facial expression (motor) and supplies taste sensation from the anterior 2/3 of the tongue via the chorda tympani.',
    keyPoints: ['CN VII = muscles of facial expression + taste anterior 2/3 tongue', 'CN V3 = general somatic sensation to anterior 2/3 tongue', 'CN IX = taste & general sensation to posterior 1/3 tongue']
  },
  {
    id: 'anat-068',
    subjectId: 'anatomy',
    topic: 'Nervous System',
    difficulty: 'intermediate',
    question: 'Which cranial nerve is the longest and provides parasympathetic innervation to thoracic and most abdominal viscera?',
    options: ['CN III (Oculomotor)', 'CN VII (Facial)', 'CN IX (Glossopharyngeal)', 'CN X (Vagus)'],
    correctIndex: 3,
    explanation: 'The Vagus nerve (CN X, "wanderer") provides extensive parasympathetic supply to the heart, lungs, and gut tube up to the splenic flexure of the colon.',
    keyPoints: ['Vagus nerve (CN X) = primary parasympathetic nerve of thorax & abdomen', 'Exits skull via jugular foramen']
  },
  {
    id: 'anat-069',
    subjectId: 'anatomy',
    topic: 'Endocrine & Reproductive',
    difficulty: 'basic',
    question: 'In males, spermatozoa are produced in the _____ and mature and stored in the _____.',
    options: [
      'Seminiferous tubules; Epididymis',
      'Epididymis; Prostate',
      'Seminal vesicles; Vas deferens',
      'Vas deferens; Bulbourethral glands'
    ],
    correctIndex: 0,
    explanation: 'Spermatogenesis occurs in the seminiferous tubules of the testes. Immature spermatozoa then travel to the epididymis where they undergo maturation and gain motility.',
    keyPoints: ['Production = Seminiferous tubules', 'Maturation & storage = Epididymis']
  },
  {
    id: 'anat-070',
    subjectId: 'anatomy',
    topic: 'Endocrine & Reproductive',
    difficulty: 'intermediate',
    question: 'Fertilization of the ovum by a spermatozoon most commonly occurs in which region of the uterine (Fallopian) tube?',
    options: ['Infundibulum', 'Ampulla', 'Isthmus', 'Intramural/Uterine part'],
    correctIndex: 1,
    explanation: 'The ampulla is the widest and longest portion of the uterine tube and is the most common site of normal fertilization and ectopic pregnancy.',
    keyPoints: ['Ampulla = site of fertilization (>90%)', 'Most common site of ectopic tubal pregnancy']
  }
];

// 100 HISTOLOGY QUESTIONS (First-Year Core Medical Microscopic Anatomy)
export const HISTOLOGY_MCQ_BANK: BankMcqQuestion[] = [
  // Epithelial Tissue (1-25)
  {
    id: 'hist-001',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'basic',
    question: 'The vascular endothelium lining blood vessels and the mesothelium of serous membranes are classified as:',
    options: [
      'Simple squamous epithelium',
      'Simple cuboidal epithelium',
      'Stratified squamous non-keratinized',
      'Pseudostratified columnar'
    ],
    correctIndex: 0,
    explanation: 'Simple squamous epithelium consists of a single layer of flattened, scale-like cells with flattened central nuclei, optimized for passive diffusion and filtration.',
    keyPoints: ['Endothelium (blood vessels) = Simple squamous', 'Mesothelium (pleura, pericardium, peritoneum) = Simple squamous', 'Bowman\'s capsule parietal layer = Simple squamous']
  },
  {
    id: 'hist-002',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'basic',
    question: 'The epithelium lining the proximal and distal convoluted tubules of the kidney is:',
    options: [
      'Simple squamous epithelium',
      'Simple cuboidal epithelium',
      'Stratified cuboidal epithelium',
      'Transitional epithelium'
    ],
    correctIndex: 1,
    explanation: 'Renal tubules and thyroid follicles are lined by simple cuboidal epithelium with spherical, centrally located nuclei.',
    keyPoints: ['Simple cuboidal = Renal tubules, Thyroid follicles', 'PCT has a prominent microvillar brush border']
  },
  {
    id: 'hist-003',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'basic',
    question: 'The luminal lining of the stomach and small intestine is composed of:',
    options: [
      'Simple columnar epithelium',
      'Stratified squamous epithelium',
      'Pseudostratified ciliated epithelium',
      'Transitional epithelium'
    ],
    correctIndex: 0,
    explanation: 'The GI tract from the stomach through the rectum is lined by simple columnar epithelium with oval nuclei aligned near the basement membrane.',
    keyPoints: ['Simple columnar = Stomach, Small intestine, Large intestine', 'Small intestine features microvilli (striated border) & Goblet cells']
  },
  {
    id: 'hist-004',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'intermediate',
    question: 'The respiratory epithelium lining the trachea and primary bronchi is classified as:',
    options: [
      'Simple ciliated columnar',
      'Pseudostratified ciliated columnar epithelium with goblet cells',
      'Stratified columnar epithelium',
      'Transitional epithelium'
    ],
    correctIndex: 1,
    explanation: 'Respiratory epithelium is pseudostratified ciliated columnar epithelium with goblet cells. All cells contact the basement membrane, but nuclei lie at variable heights.',
    keyPoints: ['Trachea & Bronchi = Pseudostratified ciliated columnar', 'Contains motile 9+2 cilia & mucus-secreting goblet cells']
  },
  {
    id: 'hist-005',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'basic',
    question: 'The luminal lining of the esophagus and vagina is protected against mechanical abrasion by:',
    options: [
      'Stratified squamous non-keratinized epithelium',
      'Stratified squamous keratinized epithelium',
      'Simple columnar epithelium',
      'Transitional epithelium'
    ],
    correctIndex: 0,
    explanation: 'Moist internal surfaces exposed to friction (oral cavity, esophagus, vagina) are lined by stratified squamous non-keratinized epithelium with viable nucleated surface cells.',
    keyPoints: ['Esophagus/Vagina/Oral cavity = Stratified squamous non-keratinized', 'Retains nuclei in all superficial cell layers']
  },
  {
    id: 'hist-006',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'basic',
    question: 'The epidermis of thick skin is characterized histologically as:',
    options: [
      'Stratified squamous keratinized epithelium',
      'Stratified cuboidal epithelium',
      'Transitional epithelium',
      'Simple columnar epithelium'
    ],
    correctIndex: 0,
    explanation: 'The epidermis is a stratified squamous keratinized epithelium where superficial cells lose their nuclei and fill with dense protective keratin.',
    keyPoints: ['Epidermis = Stratified squamous keratinized', 'Layers: Stratum basale, spinosum, granulosum, lucidum (thick skin only), corneum']
  },
  {
    id: 'hist-007',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'intermediate',
    question: 'Transitional epithelium (urothelium) with distinctive dome-shaped "umbrella cells" lines the:',
    options: [
      'Urinary bladder and ureters',
      'Gallbladder',
      'Trachea',
      'Small intestine'
    ],
    correctIndex: 0,
    explanation: 'Transitional epithelium (urothelium) lines the urinary tract from renal calyces to proximal urethra, capable of changing shape upon distension.',
    keyPoints: ['Urothelium = Urinary bladder, Ureter, Renal pelvis', 'Superficial dome/umbrella cells with plaques', 'Transitions from 5-6 layers to 2-3 layers when stretched']
  },
  {
    id: 'hist-008',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    difficulty: 'advanced',
    question: 'Which intercellular junction provides strong mechanical adhesion by anchoring intermediate filaments (keratins) across neighboring epithelial cells?',
    options: [
      'Tight junction (Zonula occludens)',
      'Adherens junction (Zonula adherens)',
      'Desmosome (Macula adherens)',
      'Gap junction (Nexus)'
    ],
    correctIndex: 2,
    explanation: 'Desmosomes (maculae adherentes) utilize cadherins (desmoglein/desmocollin) linked to intracellular intermediate filaments (keratin) to resist shear stress.',
    keyPoints: ['Desmosome = Spot weld (intermediate filaments / keratin)', 'Tight junction = Paracellular seal (claudin/occludin)', 'Gap junction = Electrical/metabolic communication (connexins)']
  },

  // Connective Tissue & Cartilage & Bone (26-50)
  {
    id: 'hist-009',
    subjectId: 'histology',
    topic: 'Connective Tissue',
    difficulty: 'basic',
    question: 'The predominant cell type responsible for synthesizing and secreting the extracellular matrix fibers and ground substance in ordinary connective tissue is the:',
    options: ['Macrophage', 'Fibroblast', 'Mast cell', 'Plasma cell'],
    correctIndex: 1,
    explanation: 'Fibroblasts are the primary connective tissue cells, with active euchromatic nuclei and abundant rough ER synthesizing procollagen, elastin, and glycosaminoglycans.',
    keyPoints: ['Fibroblast = synthesizes collagen, elastic, reticular fibers', 'Quiescent form = fibrocyte (heterochromatic, spindle nucleus)']
  },
  {
    id: 'hist-010',
    subjectId: 'histology',
    topic: 'Connective Tissue',
    difficulty: 'intermediate',
    question: 'Which immune cell in connective tissue features a "clock-face" or "cartwheel" heterochromatin pattern in an eccentric nucleus and intensely basophilic cytoplasm?',
    options: ['Mast cell', 'Plasma cell', 'Neutrophil', 'Eosinophil'],
    correctIndex: 1,
    explanation: 'Plasma cells (differentiated B lymphocytes) secrete antibodies, featuring a clock-face eccentric nucleus, abundant rough ER (basophilia), and a prominent pale negative Golgi zone.',
    keyPoints: ['Plasma cell = "Clock-face / Cartwheel" nucleus', 'Eccentric nucleus + perinuclear pale Golgi clearing', 'Produces immunoglobulins']
  },
  {
    id: 'hist-011',
    subjectId: 'histology',
    topic: 'Cartilage & Bone',
    difficulty: 'basic',
    question: 'Hyaline cartilage is characterized by which type of collagen in its glassy, basophilic extracellular matrix?',
    options: ['Type I collagen', 'Type II collagen', 'Type III collagen', 'Type IV collagen'],
    correctIndex: 1,
    explanation: 'Hyaline cartilage matrix contains thin fibrils of Type II collagen embedded in an amorphous proteoglycan ground substance (chondroitin sulfate and aggrecan).',
    keyPoints: ['Type II collagen = Hyaline and Elastic cartilage ("carTWOlage")', 'Type I collagen = Bone, tendon, fibrocartilage', 'Type IV = Basement membrane']
  },
  {
    id: 'hist-012',
    subjectId: 'histology',
    topic: 'Cartilage & Bone',
    difficulty: 'intermediate',
    question: 'Fibrocartilage differs from hyaline cartilage primarily by containing prominent bundles of which collagen type and lacking a perichondrium?',
    options: ['Type I collagen', 'Type II collagen', 'Type IV collagen', 'Type VII collagen'],
    correctIndex: 0,
    explanation: 'Fibrocartilage (intervertebral discs, pubic symphysis, menisci) contains thick parallel bundles of Type I collagen and alternating rows of chondrocytes in lacunae, lacking a perichondrium.',
    keyPoints: ['Fibrocartilage = Type I collagen + no perichondrium', 'Resists heavy compressive and tensile forces']
  },
  {
    id: 'hist-013',
    subjectId: 'histology',
    topic: 'Cartilage & Bone',
    difficulty: 'basic',
    question: 'The structural and functional unit of mature compact (cortical) bone is the:',
    options: ['Trabecula', 'Osteon (Haversian system)', 'Canaliculus', 'Howship\'s lacuna'],
    correctIndex: 1,
    explanation: 'The osteon (Haversian system) is the cylindrical microscopic unit of compact bone, featuring concentric lamellae of calcified matrix surrounding a central Haversian canal.',
    keyPoints: ['Osteon = Haversian canal + concentric lamellae + osteocytes in lacunae', 'Volkmann\'s canals connect Haversian canals perpendicularly']
  },
  {
    id: 'hist-014',
    subjectId: 'histology',
    topic: 'Cartilage & Bone',
    difficulty: 'intermediate',
    question: 'Osteocytes maintain communication and nutrient exchange with each other and the central canal through microscopic radiating channels called:',
    options: ['Volkmann canals', 'Canaliculi', 'Howship lacunae', 'Intercalated ducts'],
    correctIndex: 1,
    explanation: 'Canaliculi are tiny channels radiating from lacunae that contain cytoplasmic processes of osteocytes connected by gap junctions.',
    keyPoints: ['Canaliculi house osteocyte dendritic processes', 'Gap junctions facilitate calcium and metabolic transfer']
  },
  {
    id: 'hist-015',
    subjectId: 'histology',
    topic: 'Cartilage & Bone',
    difficulty: 'intermediate',
    question: 'Large, multinucleated bone-resorbing cells derived from the monocyte-macrophage lineage that occupy shallow resorption depressions (Howship\'s lacunae) are:',
    options: ['Osteoblasts', 'Osteocytes', 'Osteoclasts', 'Chondroblasts'],
    correctIndex: 2,
    explanation: 'Osteoclasts are giant multinucleated cells (5-50 nuclei) with a ruffled border that secrete acid and cathepsin K to degrade bone mineral and collagen in Howship\'s lacunae.',
    keyPoints: ['Osteoclast = multinucleated bone resorption cell', 'Occupies Howship\'s lacunae', 'Stimulated by PTH via RANKL']
  },

  // Muscle Tissue (51-75)
  {
    id: 'hist-016',
    subjectId: 'histology',
    topic: 'Muscle Tissue',
    difficulty: 'basic',
    question: 'Under light microscopy with H&E stain, skeletal muscle fibers are identified by:',
    options: [
      'Single central round nuclei and non-striated cytoplasm',
      'Multiple elongated peripheral nuclei and distinct transverse striations',
      'Branching fibers with intercalated discs and single central nuclei',
      'Fusiform shape with corkscrew nuclei'
    ],
    correctIndex: 1,
    explanation: 'Skeletal muscle fibers are long, cylindrical multinucleated syncytia with prominent peripheral nuclei situated immediately beneath the sarcolemma and repeating cross-striations.',
    keyPoints: ['Skeletal muscle = Multinucleated, PERIPHERAL nuclei, non-branching', 'Cross-striated (A-bands and I-bands)']
  },
  {
    id: 'hist-017',
    subjectId: 'histology',
    topic: 'Muscle Tissue',
    difficulty: 'basic',
    question: 'Cardiac myocytes are uniquely distinguished from skeletal muscle fibers by the presence of:',
    options: [
      'Intercalated discs, branching fibers, and 1-2 centrally located nuclei',
      'Multiple peripheral nuclei and absence of striations',
      'Absence of T-tubules and lack of sarcomeres',
      'Perichondrium and lacunae'
    ],
    correctIndex: 0,
    explanation: 'Cardiac muscle cells are short, branching cylinders with 1-2 centrally positioned oval nuclei, cross-striations, and prominent transverse step-like intercalated discs.',
    keyPoints: ['Cardiac muscle = Branching, central nuclei, Intercalated discs', 'Intercalated discs contain desmosomes, fascia adherens & gap junctions']
  },
  {
    id: 'hist-018',
    subjectId: 'histology',
    topic: 'Muscle Tissue',
    difficulty: 'intermediate',
    question: 'In the microscopic architecture of cardiac intercalated discs, which junctional component provides ionic and electrical coupling between adjacent myocytes?',
    options: [
      'Fascia adherens',
      'Macula adherens (desmosome)',
      'Gap junctions (nexuses)',
      'Zonula occludens'
    ],
    correctIndex: 2,
    explanation: 'Gap junctions located in the longitudinal portions of intercalated discs provide low-resistance electrical pathways, allowing the myocardium to act as a coordinated functional syncytium.',
    keyPoints: ['Gap junctions = Electrical continuity / ion flow', 'Fascia adherens & Desmosomes = Mechanical anchoring']
  },
  {
    id: 'hist-019',
    subjectId: 'histology',
    topic: 'Muscle Tissue',
    difficulty: 'basic',
    question: 'Smooth muscle cells are microscopically described as:',
    options: [
      'Fusiform (spindle-shaped) cells with a single central "cigar-shaped" nucleus and no cross-striations',
      'Cylindrical branching cells with peripheral nuclei',
      'Multinucleated syncytia with transverse discs',
      'Polygonal cells with basophilic granules'
    ],
    correctIndex: 0,
    explanation: 'Smooth muscle cells are non-striated, elongated, spindle-shaped (fusiform) cells with a single central nucleus that appears cigar-shaped or corkscrew-shaped when contracted.',
    keyPoints: ['Smooth muscle = Fusiform, single central nucleus, NO striations', 'Contains dense bodies instead of Z-discs']
  },

  // Nervous & Organ Histology (76-100)
  {
    id: 'hist-020',
    subjectId: 'histology',
    topic: 'Nervous Tissue',
    difficulty: 'basic',
    question: 'In the peripheral nervous system (PNS), the myelin sheath surrounding axons is produced by:',
    options: ['Oligodendrocytes', 'Schwann cells (Neurolemmocytes)', 'Astrocytes', 'Microglia'],
    correctIndex: 1,
    explanation: 'Schwann cells myelinate individual axons in the PNS. In contrast, oligodendrocytes myelinate multiple axons simultaneously in the Central Nervous System (CNS).',
    keyPoints: ['PNS Myelin = Schwann cells (1 axon per cell)', 'CNS Myelin = Oligodendrocytes (multiple axons per cell)']
  },
  {
    id: 'hist-021',
    subjectId: 'histology',
    topic: 'Nervous Tissue',
    difficulty: 'intermediate',
    question: 'Nissl substance (Nissl bodies) seen in the cytoplasm of neuronal cell bodies (soma) corresponds ultrastructurally to:',
    options: [
      'Rough endoplasmic reticulum and free polyribosomes',
      'Smooth endoplasmic reticulum and lipid droplets',
      'Aggregates of mitochondria and lysosomes',
      'Golgi apparatus cisternae'
    ],
    correctIndex: 0,
    explanation: 'Nissl bodies appear as intensely basophilic granular clumps representing abundant rough ER and polyribosomes dedicated to high-rate neurotransmitter and protein synthesis.',
    keyPoints: ['Nissl bodies = Rough ER + Ribosomes (Basophilic)', 'Absent in the axon hillock and axon']
  },
  {
    id: 'hist-022',
    subjectId: 'histology',
    topic: 'Organ Histology',
    difficulty: 'intermediate',
    question: 'The renal corpuscle in the kidney cortex consists of:',
    options: [
      'Glomerulus (capillary tuft) enclosed within Bowman\'s capsule',
      'Loop of Henle and collecting duct',
      'Proximal and distal tubules only',
      'Renal pelvis and calyx'
    ],
    correctIndex: 0,
    explanation: 'The renal corpuscle is the filtration apparatus comprising the fenestrated glomerular capillary tuft surrounded by the visceral layer (podocytes) and parietal layer of Bowman\'s capsule.',
    keyPoints: ['Renal corpuscle = Glomerulus + Bowman\'s capsule', 'Visceral layer = Podocytes with pedicels', 'Parietal layer = Simple squamous epithelium']
  },
  {
    id: 'hist-023',
    subjectId: 'histology',
    topic: 'Organ Histology',
    difficulty: 'intermediate',
    question: 'Peyer\'s patches (aggregated lymphoid follicles in the lamina propria and submucosa) are a distinctive histological landmark of which GI segment?',
    options: ['Stomach fundus', 'Duodenum', 'Jejunum', 'Ileum'],
    correctIndex: 3,
    explanation: 'Peyer\'s patches are prominent aggregates of lymphoid follicles located in the antimesenteric border of the ileum, serving as crucial Gut-Associated Lymphoid Tissue (GALT).',
    keyPoints: ['Duodenum = Brunner\'s submucosal glands', 'Jejunum = Tall plicae circulares & no Brunner glands/Peyer patches', 'Ileum = Peyer\'s patches']
  },
  {
    id: 'hist-024',
    subjectId: 'histology',
    topic: 'Organ Histology',
    difficulty: 'intermediate',
    question: 'The classic hepatic lobule is structurally centered around which vessel?',
    options: ['Central vein', 'Portal vein branch', 'Hepatic artery branch', 'Interlobular bile duct'],
    correctIndex: 0,
    explanation: 'The classic liver lobule is a hexagonal prism of radiating hepatocyte cords centered around a Central Vein, with Portal Triads at the periphery.',
    keyPoints: ['Classic lobule = Central vein in center', 'Portal triad = Hepatic artery + Portal vein + Bile ductule']
  },
  {
    id: 'hist-025',
    subjectId: 'histology',
    topic: 'Organ Histology',
    difficulty: 'intermediate',
    question: 'The endocrine component of the pancreas, appearing as pale-staining spherical nests among dark exocrine acini, is the:',
    options: [
      'Islets of Langerhans',
      'Pancreatic acini',
      'Centrobacinar cells',
      'Intercalated ducts'
    ],
    correctIndex: 0,
    explanation: 'The Islets of Langerhans are lightly stained vascular clusters scattered throughout the pancreas containing alpha cells (glucagon), beta cells (insulin), and delta cells (somatostatin).',
    keyPoints: ['Islets of Langerhans = Endocrine (Beta cells insulin, Alpha cells glucagon)', 'Exocrine = Dark serous acini with zymogen granules']
  }
];

// BIOCHEMISTRY QUESTIONS
export const BIOCHEMISTRY_MCQ_BANK: BankMcqQuestion[] = [
  {
    id: 'bioc-001',
    subjectId: 'biochemistry',
    topic: 'Carbohydrate Tests',
    difficulty: 'basic',
    question: 'Which general qualitative test gives a purple/violet ring at the interface of two liquids for ALL carbohydrates?',
    options: ['Molisch\'s Test', 'Benedict\'s Test', 'Barfoed\'s Test', 'Iodine Test'],
    correctIndex: 0,
    explanation: 'Molisch\'s test is a general test for all carbohydrates. Concentrated H2SO4 dehydrates sugars to form furfural derivatives, which condense with alpha-naphthol to produce a purple ring.',
    keyPoints: ['Molisch\'s Test = General carbohydrate test', 'Reagents: Alpha-naphthol in ethanol + Conc. H2SO4', 'Positive = Purple/violet ring at interface']
  },
  {
    id: 'bioc-002',
    subjectId: 'biochemistry',
    topic: 'Carbohydrate Tests',
    difficulty: 'basic',
    question: 'The Iodine test produces an intense deep blue-black color specifically in the presence of:',
    options: ['Starch (Amylose)', 'Glucose', 'Fructose', 'Sucrose'],
    correctIndex: 0,
    explanation: 'Iodine slips into the helical coils of amylose (starch), forming a polyiodide charge-transfer complex with an intense deep blue-black color.',
    keyPoints: ['Iodine test = Polysaccharides', 'Starch = Deep blue-black', 'Glycogen = Red-brown', 'Mono/Disaccharides = Negative (yellow/brown)']
  },
  {
    id: 'bioc-003',
    subjectId: 'biochemistry',
    topic: 'Carbohydrate Tests',
    difficulty: 'intermediate',
    question: 'Which test differentiates reducing monosaccharides from reducing disaccharides based on the rate of reduction in an acidic medium within 3 minutes?',
    options: ['Barfoed\'s Test', 'Benedict\'s Test', 'Fehling\'s Test', 'Seliwanoff\'s Test'],
    correctIndex: 0,
    explanation: 'Barfoed\'s test uses copper acetate in weak acetic acid. Reducing monosaccharides reduce Cu2+ rapidly (red Cu2O precipitate in < 3 minutes), whereas disaccharides require prolonged boiling (> 10 mins).',
    keyPoints: ['Barfoed\'s test = Monosaccharides vs Disaccharides', 'Acidic medium (copper acetate + acetic acid)', 'Monosaccharide = Red Cu2O precipitate within 3 min']
  },
  {
    id: 'bioc-004',
    subjectId: 'biochemistry',
    topic: 'Carbohydrate Tests',
    difficulty: 'intermediate',
    question: 'Seliwanoff\'s test produces a rapid cherry-red color within 1 minute specifically for which type of carbohydrate?',
    options: ['Ketohexoses (e.g. Fructose)', 'Aldohexoses (e.g. Glucose)', 'Polysaccharides (e.g. Starch)', 'Pentoses (e.g. Ribose)'],
    correctIndex: 0,
    explanation: 'Seliwanoff\'s test uses resorcinol in concentrated HCl. Ketohexoses (fructose) are rapidly dehydrated to 4-hydroxymethylfurfural, which reacts with resorcinol to yield a cherry-red condensation product.',
    keyPoints: ['Seliwanoff\'s test = Ketoses vs Aldoses', 'Fructose = Cherry-red color within 1 minute', 'Glucose (aldose) = Faint pink only after prolonged heating']
  },
  {
    id: 'bioc-005',
    subjectId: 'biochemistry',
    topic: 'Carbohydrate Tests',
    difficulty: 'basic',
    question: 'Benedict\'s reagent is reduced by reducing sugars (such as glucose) to form a brick-red precipitate of:',
    options: ['Cuprous oxide (Cu2O)', 'Cupric hydroxide (Cu(OH)2)', 'Copper sulfate (CuSO4)', 'Silver oxide'],
    correctIndex: 0,
    explanation: 'Reducing sugars contain free aldehyde or ketone groups that reduce blue alkaline cupric ions (Cu2+) to red insoluble cuprous oxide (Cu2O) precipitate.',
    keyPoints: ['Benedict\'s test = Reducing sugars', 'Blue -> Green (+) -> Yellow (++) -> Orange (+++) -> Brick-Red (++++)', 'Precipitate is Cuprous oxide (Cu2O)']
  }
];

export const ALL_MCQ_BANK: BankMcqQuestion[] = [
  ...ANATOMY_MCQ_BANK,
  ...HISTOLOGY_MCQ_BANK,
  ...BIOCHEMISTRY_MCQ_BANK
];
