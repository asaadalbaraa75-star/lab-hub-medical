/**
 * FIRST-YEAR MEDICAL ANATOMY & HISTOLOGY — COMPLETE VISUAL MAP
 * Comprehensive Scientific Curriculum Data for 1st-Year Medical Students
 * Conforms to Standard International Anatomical Terminology (Terminologia Anatomica & Terminologia Histologica)
 */

export interface AnatomyRegionDetail {
  id: string;
  name: string;
  latinName?: string;
  arabicName?: string;
  category: string;
  description: string;
  clinicalSignificance: string;
  examPearl: string;
}

export interface HistologyTissueDetail {
  id: string;
  name: string;
  category: 'Epithelium' | 'Connective Tissue' | 'Cartilage' | 'Bone' | 'Blood' | 'Muscle' | 'Nervous Tissue' | 'Glandular Tissue';
  stain: string;
  microscopicFeatures: string[];
  characteristicAppearance: string;
  typicalLocations: string[];
  diagnosticClue: string;
  highYieldExamPearl: string;
}

// ==========================================
// 1. ANATOMICAL POSITION & ORIENTATION
// ==========================================
export const ANATOMICAL_POSITION_DATA = {
  title: 'Anatomical Position & Orientation',
  description: 'The universal reference posture used for all anatomical descriptions and spatial relationships in medicine.',
  criteria: [
    'Body standing upright (erect posture) facing the observer directly.',
    'Head, gaze (eyes), and toes directed horizontally forward (anteriorly).',
    'Upper limbs hanging at the sides with palms turned forward (supinated) and thumbs pointing laterally away from the trunk.',
    'Lower limbs parallel, feet flat on the floor, pointing forward.'
  ],
  axes: [
    { name: 'Vertical (Longitudinal) Axis', description: 'Runs craniocaudally from vertex to perineum; perpendicular to the ground.' },
    { name: 'Sagittal (Anteroposterior) Axis', description: 'Passes horizontally from front to back (anterior to posterior).' },
    { name: 'Transverse (Horizontal) Axis', description: 'Passes horizontally from side to side (medial to lateral).' }
  ]
};

// ==========================================
// 2. ANATOMICAL PLANES
// ==========================================
export const ANATOMICAL_PLANES_DATA = [
  {
    id: 'median_midsagittal',
    name: 'Midsagittal (Median) Plane',
    definition: 'Vertical plane passing longitudinally through the midline of the body, dividing it into exactly equal right and left halves.',
    clinicalNote: 'Standard orientation for midline brain imaging (corpus callosum, pituitary gland, brainstem) and spinal cord visualization.',
    color: '#06b6d4'
  },
  {
    id: 'parasagittal',
    name: 'Parasagittal Plane',
    definition: 'Any vertical plane parallel to the median plane, dividing the body or an organ into unequal right and left parts.',
    clinicalNote: 'Commonly used in ultrasound scans of unilateral organs (e.g. longitudinal kidney, breast ultrasound).',
    color: '#0284c7'
  },
  {
    id: 'coronal_frontal',
    name: 'Frontal (Coronal) Plane',
    definition: 'Vertical plane oriented at a right angle to the median plane, dividing the body into anterior (front) and posterior (back) portions.',
    clinicalNote: 'Standard plane for thoracic CT and MRI evaluating lung fields, cardiac chambers, and paranasal sinuses.',
    color: '#8b5cf6'
  },
  {
    id: 'transverse_horizontal',
    name: 'Transverse (Horizontal / Axial) Plane',
    definition: 'Horizontal plane running perpendicular to both median and coronal planes, dividing the body into superior (upper) and inferior (lower) segments.',
    clinicalNote: 'The fundamental cross-sectional plane of abdominal CT, pelvic scans, and neuroaxial cross-sections.',
    color: '#10b981'
  }
];

// ==========================================
// 3. DIRECTIONAL TERMS
// ==========================================
export const DIRECTIONAL_TERMS_DATA = [
  { term: 'Superior (Cranial / Cephalic)', paired: 'Inferior (Caudal)', definition: 'Nearer to the head or higher in position; versus nearer to the feet or lower.', example: 'The heart is superior to the diaphragm; the stomach is inferior to the esophagus.' },
  { term: 'Anterior (Ventral)', paired: 'Posterior (Dorsal)', definition: 'Nearer to the front surface of the body; versus nearer to the back surface.', example: 'The sternum is anterior to the heart; the esophagus is posterior to the trachea.' },
  { term: 'Medial', paired: 'Lateral', definition: 'Nearer to the midsagittal line; versus farther away from the midline.', example: 'The ulna is medial to the radius in the forearm; the thumb is lateral to the pinky.' },
  { term: 'Proximal', paired: 'Distal', definition: 'Nearer to the trunk or point of origin of a limb; versus farther from the trunk.', example: 'The elbow is proximal to the wrist; the phalanges are distal to the metacarpals.' },
  { term: 'Superficial', paired: 'Deep', definition: 'Nearer to the skin surface; versus farther from the surface/interior.', example: 'The pectoralis major is superficial to the pectoralis minor.' },
  { term: 'Internal', paired: 'External', definition: 'Toward the interior of an organ or cavity; versus toward the exterior.', example: 'Internal carotid artery enters the cranium; external carotid supplies facial structures.' }
];

// ==========================================
// 4. BODY MOVEMENTS
// ==========================================
export const BODY_MOVEMENTS_DATA = [
  { name: 'Flexion', opposite: 'Extension', plane: 'Sagittal', description: 'Decreasing the angle between bones or articulating parts (bending).', visual: 'Forearm bending at elbow, knee bending backward.' },
  { name: 'Extension', opposite: 'Flexion', plane: 'Sagittal', description: 'Increasing the angle between articulating elements (straightening).', visual: 'Straightening elbow or knee.' },
  { name: 'Hyperextension', opposite: 'Normal alignment', plane: 'Sagittal', description: 'Extension of a limb or body part beyond normal anatomical limit.', visual: 'Tilting head backward to look at the ceiling.' },
  { name: 'Abduction', opposite: 'Adduction', plane: 'Coronal', description: 'Moving a limb or digit away from the median plane.', visual: 'Raising arms laterally away from body.' },
  { name: 'Adduction', opposite: 'Abduction', plane: 'Coronal', description: 'Moving a limb or digit toward the median plane.', visual: 'Bringing arms back down to sides.' },
  { name: 'Medial (Internal) Rotation', opposite: 'Lateral Rotation', plane: 'Transverse', description: 'Rotating anterior surface of a limb inward toward the midline.', visual: 'Forearm swung across chest toward abdomen.' },
  { name: 'Lateral (External) Rotation', opposite: 'Medial Rotation', plane: 'Transverse', description: 'Rotating anterior surface of a limb outward away from the midline.', visual: 'Forearm swung outward away from body.' },
  { name: 'Circumduction', opposite: 'Complex movement', plane: 'Multiplanar', description: 'Sequential combination of flexion, abduction, extension, and adduction creating a cone-like sweep.', visual: 'Arm windmill circle at shoulder joint.' },
  { name: 'Pronation', opposite: 'Supination', plane: 'Forearm', description: 'Medial rotation of forearm causing palm to face posteriorly or downward.', visual: 'Radius crosses over ulna.' },
  { name: 'Supination', opposite: 'Pronation', plane: 'Forearm', description: 'Lateral rotation of forearm returning palm to face anteriorly (anatomical position).', visual: 'Radius and ulna parallel; holding soup bowl.' },
  { name: 'Dorsiflexion', opposite: 'Plantarflexion', plane: 'Ankle', description: 'Lifting foot toward shin (standing on heels).', visual: 'Toes pointing upward.' },
  { name: 'Plantarflexion', opposite: 'Dorsiflexion', plane: 'Ankle', description: 'Depressing foot downward toward sole (tiptoe standing).', visual: 'Toes pointing downward.' },
  { name: 'Inversion', opposite: 'Eversion', plane: 'Subtalar', description: 'Turning sole of foot inward toward the median plane.', visual: 'Sole faces medially; common sprain direction.' },
  { name: 'Eversion', opposite: 'Inversion', plane: 'Subtalar', description: 'Turning sole of foot outward away from the median plane.', visual: 'Sole faces laterally.' }
];

// ==========================================
// 5. SKELETAL SYSTEM (MAJOR BONES)
// ==========================================
export const SKELETAL_BONES_DATA = [
  { id: 'skull', name: 'Skull (Cranium)', region: 'Axial Skeleton', note: '22 bones (8 cranial enclosing brain, 14 facial bones).' },
  { id: 'mandible', name: 'Mandible', region: 'Axial Skeleton', note: 'Only movable bone of the skull; articulates at temporomandibular joint (TMJ).' },
  { id: 'cervical_vertebrae', name: 'Cervical Vertebrae (C1-C7)', region: 'Axial Skeleton', note: '7 vertebrae; C1 (Atlas, no body) and C2 (Axis, dens/odontoid process).' },
  { id: 'thoracic_vertebrae', name: 'Thoracic Vertebrae (T1-T12)', region: 'Axial Skeleton', note: '12 vertebrae; possess costal facets for rib articulations; long downward spines.' },
  { id: 'lumbar_vertebrae', name: 'Lumbar Vertebrae (L1-L5)', region: 'Axial Skeleton', note: '5 large vertebrae with massive kidney-shaped bodies supporting body weight.' },
  { id: 'sacrum', name: 'Sacrum (S1-S5)', region: 'Axial Skeleton', note: '5 fused triangular vertebrae wedged between iliac bones at sacroiliac joints.' },
  { id: 'coccyx', name: 'Coccyx (Co1-Co4)', region: 'Axial Skeleton', note: '3-5 fused rudimentary vertebrae forming the terminal tailbone.' },
  { id: 'ribs', name: 'Ribs (12 Pairs)', region: 'Axial Skeleton', note: 'True ribs (1-7), False ribs (8-10), Floating ribs (11-12).' },
  { id: 'sternum', name: 'Sternum (Breastbone)', region: 'Axial Skeleton', note: 'Manubrium (sternal angle of Louis at T4/T5), Body, and Xiphoid process.' },
  { id: 'clavicle', name: 'Clavicle (Collarbone)', region: 'Appendicular Skeleton', note: 'S-shaped strut connecting sternum (sternoclavicular) to scapula (acromioclavicular).' },
  { id: 'scapula', name: 'Scapula (Shoulder Blade)', region: 'Appendicular Skeleton', note: 'Spine, acromion, coracoid process, and glenoid fossa.' },
  { id: 'humerus', name: 'Humerus', region: 'Upper Limb', note: 'Brachial bone; articulates with glenoid cavity proximally and radius/ulna distally.' },
  { id: 'radius', name: 'Radius', region: 'Upper Limb', note: 'Lateral forearm bone; disc-shaped head, styloid process, and radial tuberosity.' },
  { id: 'ulna', name: 'Ulna', region: 'Upper Limb', note: 'Medial forearm bone; olecranon process (elbow point), trochlear notch, coronoid process.' },
  { id: 'carpals', name: 'Carpals (8 Bones)', region: 'Upper Limb', note: 'Proximal: Scaphoid, Lunate, Triquetrum, Pisiform. Distal: Trapezium, Trapezoid, Capitate, Hamate.' },
  { id: 'metacarpals', name: 'Metacarpals (I-V)', region: 'Upper Limb', note: '5 cylindrical palm bones numbered from thumb (I) to little finger (V).' },
  { id: 'phalanges_hand', name: 'Phalanges (Hand: 14)', region: 'Upper Limb', note: 'Proximal, middle, distal (thumb has only proximal and distal).' },
  { id: 'pelvis', name: 'Pelvic Girdle (Hip Bone / Coxal)', region: 'Appendicular Skeleton', note: 'Formed by fusion of Ilium (iliac crest), Ischium (ischial tuberosity), and Pubis.' },
  { id: 'femur', name: 'Femur (Thigh Bone)', region: 'Lower Limb', note: 'Longest, strongest bone in human body; greater/lesser trochanters, condyles.' },
  { id: 'patella', name: 'Patella (Kneecap)', region: 'Lower Limb', note: 'Largest sesamoid bone in the body, embedded in quadriceps tendon.' },
  { id: 'tibia', name: 'Tibia (Shinbone)', region: 'Lower Limb', note: 'Medial weight-bearing leg bone; tibial tuberosity, medial malleolus.' },
  { id: 'fibula', name: 'Fibula', region: 'Lower Limb', note: 'Slender lateral non-weight-bearing leg bone; lateral malleolus stabilizes ankle.' },
  { id: 'tarsals', name: 'Tarsals (7 Bones)', region: 'Lower Limb', note: 'Talus (articulates with tibia/fibula), Calcaneus (heel bone), Navicular, Cuboid, 3 Cuneiforms.' },
  { id: 'metatarsals', name: 'Metatarsals (I-V)', region: 'Lower Limb', note: '5 longitudinal foot bones numbered medially from great toe (I) to little toe (V).' },
  { id: 'phalanges_foot', name: 'Phalanges (Foot: 14)', region: 'Lower Limb', note: '14 toe bones; hallux (big toe) has only proximal and distal.' }
];

// ==========================================
// 6. JOINTS & ARTICULATIONS
// ==========================================
export const JOINTS_DATA = [
  {
    category: 'Fibrous Joints (Synarthroses)',
    description: 'Bones joined by dense fibrous connective tissue; minimal or no movement.',
    examples: 'Sutures of the skull (coronal, sagittal), Syndesmoses (interosseous membrane), Gomphoses (teeth in alveolar sockets).'
  },
  {
    category: 'Cartilaginous Joints (Amphiarthroses)',
    description: 'Bones joined by hyaline cartilage or fibrocartilage; slight movement.',
    examples: 'Primary (Synchondroses, hyaline, e.g. epiphyseal growth plates) & Secondary (Symphyses, fibrocartilage, e.g. pubic symphysis, intervertebral discs).'
  },
  {
    category: 'Synovial Joints (Diarthroses)',
    description: 'Freely movable joints characterized by articular cartilage, fibrous capsule, synovial membrane, and joint cavity with lubricating synovial fluid.',
    examples: 'Ball-and-socket, hinge, pivot, saddle, condyloid, and plane joints.'
  },
  {
    joint: 'Shoulder Joint (Glenohumeral)',
    type: 'Ball-and-socket synovial joint',
    articulation: 'Head of humerus with glenoid fossa of scapula (deepened by glenoid labrum).',
    movements: 'Flexion, extension, abduction, adduction, medial/lateral rotation, circumduction (most mobile joint, prone to anterior dislocation).'
  },
  {
    joint: 'Elbow Joint',
    type: 'Compound hinge synovial joint',
    articulation: 'Humeroulnar (trochlea with trochlear notch) and humeroradial (capitulum with head of radius).',
    movements: 'Flexion and extension (reinforced by ulnar and radial collateral ligaments).'
  },
  {
    joint: 'Hip Joint (Coxofemoral)',
    type: 'Ball-and-socket synovial joint',
    articulation: 'Head of femur with deep acetabulum of hip bone (deepened by fibrocartilaginous acetabular labrum).',
    movements: 'Multiaxial movement, built for stability and weight bearing (iliofemoral ligament of Bigelow prevents hyperextension).'
  },
  {
    joint: 'Knee Joint (Tibiofemoral & Patellofemoral)',
    type: 'Modified hinge (bicondylar) synovial joint',
    articulation: 'Femoral condyles with tibial plateau and patellar surface.',
    movements: 'Flexion, extension, slight terminal rotation ("screw-home" mechanism by popliteus); stabilized by ACL, PCL, MCL, LCL, and medial/lateral menisci.'
  },
  {
    joint: 'Ankle Joint (Talocrural)',
    type: 'Hinge synovial joint',
    articulation: 'Mortise formed by distal tibia and fibula with trochlea of talus.',
    movements: 'Dorsiflexion and plantarflexion (deltoid ligament medially; anterior talofibular, posterior talofibular, calcaneofibular laterally).'
  }
];

// ==========================================
// 7. MUSCULAR SYSTEM (MAJOR MUSCLES)
// ==========================================
export const MUSCLES_DATA = [
  { name: 'Deltoid', region: 'Shoulder', origin: 'Lateral clavicle, acromion, scapular spine', insertion: 'Deltoid tuberosity of humerus', action: 'Principal abductor of arm (beyond 15°); anterior fibers flex/medially rotate, posterior fibers extend/laterally rotate.', innervation: 'Axillary nerve (C5, C6)' },
  { name: 'Pectoralis Major', region: 'Chest', origin: 'Medial clavicle, sternum, costal cartilages 1-6', insertion: 'Lateral lip of bicipital groove of humerus', action: 'Adduction, medial rotation, and flexion of the arm at shoulder.', innervation: 'Lateral and medial pectoral nerves' },
  { name: 'Biceps Brachii', region: 'Anterior Arm', origin: 'Long head: supraglenoid tubercle; Short head: coracoid process', insertion: 'Radial tuberosity and bicipital aponeurosis', action: 'Powerful flexor and principal supinator of forearm; weak shoulder flexor.', innervation: 'Musculocutaneous nerve (C5, C6)' },
  { name: 'Triceps Brachii', region: 'Posterior Arm', origin: 'Long head: infraglenoid tubercle; Lateral/Medial heads: posterior humerus', insertion: 'Olecranon process of ulna', action: 'Chief extensor of forearm at elbow joint; long head stabilizes abducted shoulder.', innervation: 'Radial nerve (C6, C7, C8)' },
  { name: 'Rectus Abdominis', region: 'Anterior Abdomen', origin: 'Pubic crest and pubic symphysis', insertion: 'Xiphoid process and costal cartilages 5-7', action: 'Flexes vertebral column, compresses abdominal viscera, stabilizes pelvis.', innervation: 'Thoracoabdominal nerves (T7-T11) & subcostal nerve (T12)' },
  { name: 'External Oblique', region: 'Lateral Abdomen', origin: 'External surfaces of ribs 5-12', insertion: 'Linea alba, pubic tubercle, anterior half of iliac crest', action: 'Compresses abdomen, flexes and rotates vertebral column to opposite side.', innervation: 'Intercostal nerves (T7-T11) & subcostal (T12)' },
  { name: 'Latissimus Dorsi', region: 'Posterior Trunk', origin: 'Spines of T7-L5, thoracolumbar fascia, iliac crest, lower 3-4 ribs', insertion: 'Floor of intertubercular groove of humerus', action: 'Extends, adducts, and medially rotates humerus ("climbing muscle").', innervation: 'Thoracodorsal nerve (C6, C7, C8)' },
  { name: 'Gluteus Maximus', region: 'Gluteal Region', origin: 'Ilium behind posterior gluteal line, sacrum, coccyx, sacrotuberous ligament', insertion: 'Iliotibial tract and gluteal tuberosity of femur', action: 'Most powerful extensor of thigh at hip; lateral rotator, vital for rising from seated position.', innervation: 'Inferior gluteal nerve (L5, S1, S2)' },
  { name: 'Quadriceps Femoris', region: 'Anterior Thigh', origin: 'Rectus femoris (AIIS), Vastus medialis, lateralis, intermedius (femoral shaft)', insertion: 'Tibial tuberosity via patellar ligament', action: 'Great extensor of leg at knee; rectus femoris also flexes thigh at hip.', innervation: 'Femoral nerve (L2, L3, L4)' },
  { name: 'Hamstrings', region: 'Posterior Thigh', origin: 'Ischial tuberosity (Biceps femoris, Semitendinosus, Semimembranosus)', insertion: 'Head of fibula (biceps) and medial tibia/pes anserinus (semi-T/M)', action: 'Flex leg at knee joint and extend thigh at hip joint.', innervation: 'Sciatic nerve (tibial division, except short head of biceps = common fibular)' },
  { name: 'Gastrocnemius', region: 'Posterior Leg', origin: 'Medial and lateral condyles of femur', insertion: 'Posterior surface of calcaneus via Achilles (calcaneal) tendon', action: 'Plantarflexes foot at ankle; flexes leg at knee joint.', innervation: 'Tibial nerve (S1, S2)' }
];

// ==========================================
// 8-13. ORGAN SYSTEMS
// ==========================================
export const ORGAN_SYSTEMS_DATA = [
  {
    id: 'nervous',
    name: 'Nervous System',
    keyComponents: [
      { name: 'Brain (Cerebrum)', note: 'Two cerebral hemispheres, cerebral cortex (frontal, parietal, temporal, occipital lobes), basal ganglia.' },
      { name: 'Cerebellum', note: 'Coordinates voluntary motor movements, posture, balance, and muscular tone.' },
      { name: 'Brainstem', note: 'Midbrain, Pons, and Medulla oblongata; houses cranial nerve nuclei (III-XII) and vital autonomic respiratory/cardiovascular centers.' },
      { name: 'Spinal Cord', note: 'Extends from foramen magnum to conus medullaris (L1/L2 in adults); gives rise to 31 pairs of spinal nerves.' },
      { name: 'Peripheral Nerves', note: 'Somatic and autonomic nerves (cranial nerves, cervical/brachial/lumbosacral plexuses).' }
    ]
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    keyComponents: [
      { name: 'Heart', note: 'Four-chambered muscular pump in middle mediastinum (Right/Left Atria, Right/Left Ventricles).' },
      { name: 'Ascending Aorta & Arch', note: 'Emerges from LV; arch branches into Brachiocephalic trunk, Left common carotid, Left subclavian artery.' },
      { name: 'Pulmonary Artery & Trunk', note: 'Carries deoxygenated blood from right ventricle to lungs for oxygenation.' },
      { name: 'Pulmonary Veins (4)', note: 'Carry oxygenated blood from pulmonary capillary beds into left atrium.' },
      { name: 'Venae Cavae', note: 'Superior Vena Cava (drains head, neck, upper limbs) and Inferior Vena Cava (drains abdomen, pelvis, lower limbs) into right atrium.' }
    ]
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    keyComponents: [
      { name: 'Nasal Cavity & Paranasal Sinuses', note: 'Filters, warms, and humidifies inspired air; olfactory mucosa.' },
      { name: 'Pharynx', note: 'Muscular tube divided into nasopharynx, oropharynx, and laryngopharynx.' },
      { name: 'Larynx (Voice Box)', note: 'Thyroid, cricoid, epiglottic, arytenoid cartilages; vocal cords.' },
      { name: 'Trachea & Bronchial Tree', note: '16-20 C-shaped hyaline cartilage rings; bifurcates at carina (T4/T5) into right and left main bronchi.' },
      { name: 'Lungs', note: 'Right lung (3 lobes: superior, middle, inferior; 2 fissures) and Left lung (2 lobes: superior, inferior; cardiac notch).' },
      { name: 'Diaphragm', note: 'Chief muscle of inspiration; innervated by phrenic nerve (C3, C4, C5 keep the diaphragm alive!).' }
    ]
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    keyComponents: [
      { name: 'Oral Cavity & Pharynx', note: 'Mechanical mastication, salivary amylase, deglutition.' },
      { name: 'Esophagus', note: '25 cm muscular tube extending from C6 (cricoid) to T11 (cardia of stomach).' },
      { name: 'Stomach', note: 'Cardia, fundus, body, pyloric antrum, pylorus; secretes HCl and intrinsic factor.' },
      { name: 'Liver & Gallbladder', note: 'Liver (largest visceral organ, synthesizes bile and proteins); gallbladder stores and concentrates bile.' },
      { name: 'Pancreas', note: 'Retroperitoneal dual organ; exocrine acini (digestive enzymes) and endocrine islets of Langerhans (insulin/glucagon).' },
      { name: 'Small Intestine', note: 'Duodenum (C-loop), Jejunum (thick wall, plicae circulares), Ileum (Peyer patches).' },
      { name: 'Large Intestine', note: 'Cecum with vermiform appendix, ascending, transverse, descending, and sigmoid colon with taeniae coli, haustra, and epiploic appendages.' },
      { name: 'Rectum & Anal Canal', note: 'Fecal storage and evacuation controlled by internal (involuntary) and external (voluntary) anal sphincters.' }
    ]
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    keyComponents: [
      { name: 'Kidneys (Renal Organs)', note: 'Retroperitoneal bean-shaped organs (T12-L3); outer renal cortex containing glomeruli, inner renal medulla with renal pyramids and columns.' },
      { name: 'Ureters', note: '25 cm muscular conduits with transitional epithelium; 3 physiological constrictions (pelviureteric junction, pelvic brim, vesicoureteric junction).' },
      { name: 'Urinary Bladder', note: 'Muscular reservoir with thick detrusor muscle; smooth trigone between ureteric orifices and internal urethral orifice.' },
      { name: 'Urethra', note: 'Female (4 cm, susceptible to UTIs); Male (20 cm: prostatic, membranous, spongy).' }
    ]
  },
  {
    id: 'reproductive',
    name: 'Reproductive System',
    keyComponents: [
      { name: 'Male Reproductive System', note: 'Testes (seminiferous tubules, Leydig cells), Epididymis, Ductus (Vas) deferens, Seminal vesicles, Prostate gland, Bulbourethral glands, Penis.' },
      { name: 'Female Reproductive System', note: 'Ovaries (oogenesis, estrogen/progesterone), Fallopian (uterine) tubes with infundibulum/ampulla/isthmus, Uterus (fundus, body, cervix), Vagina.' }
    ]
  }
];

// ==========================================
// 14. HISTOLOGY — FIRST YEAR COMPREHENSIVE ATLAS
// REAL, ACCURATE 1ST-YEAR MEDICAL HISTOLOGY TOPICS
// ==========================================
export const HISTOLOGY_FIRST_YEAR_TOPICS: HistologyTissueDetail[] = [
  // EPITHELIAL TISSUE
  {
    id: 'simple_squamous',
    name: 'Simple Squamous Epithelium',
    category: 'Epithelium',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Single continuous monolayer of extremely thin, attenuated, scale-like cells resting on a delicate basement membrane.',
      'Centrally located, bulging, flattened elliptical/spindle-shaped dark basophilic nuclei.',
      'Cell height is microscopic compared to cellular breadth; borders interlock seamlessly like paving stones.'
    ],
    characteristicAppearance: 'Tile-like pavement appearance with protruding oval nuclei and ultra-thin cytoplasm.',
    typicalLocations: [
      'Endothelium (lining blood vessels & heart chambers)',
      'Mesothelium (pericardium, pleura, peritoneum)',
      'Bowman\'s capsule parietal layer (kidney)',
      'Alveoli of lungs (type I pneumocytes for gas diffusion)'
    ],
    diagnosticClue: 'Single layer of flattened cells with flattened bulging nuclei lining a vascular or serous lumen.',
    highYieldExamPearl: 'Optimal for rapid passive filtration and diffusion; lines capillaries as endothelium and body cavities as mesothelium.'
  },
  {
    id: 'simple_cuboidal',
    name: 'Simple Cuboidal Epithelium',
    category: 'Epithelium',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Single layer of cells with roughly equal height, width, and depth (box-shaped/cuboidal).',
      'Perfect, large, centrally situated spherical dark purple basophilic nuclei.',
      'Forms circular tubule rings on cross-section with a distinct central open lumen.'
    ],
    characteristicAppearance: 'Rings of cube-shaped cells with central round ball-like nuclei surrounding a circular tubular lumen.',
    typicalLocations: [
      'Proximal & distal convoluted tubules of kidney',
      'Thyroid gland follicles (surrounding pink colloid)',
      'Surface covering of ovary (germinal epithelium)',
      'Small ducts of exocrine glands'
    ],
    diagnosticClue: 'Monolayer of square cells with perfectly round, central nuclei arranged around a central tubule lumen.',
    highYieldExamPearl: 'Classic finding in renal tubules and thyroid follicles; functions in active secretion and selective tubular absorption.'
  },
  {
    id: 'simple_columnar',
    name: 'Simple Columnar Epithelium',
    category: 'Epithelium',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Single layer of tall rectangular cells whose height exceeds their width by 2 to 3 times.',
      'Ovoid or elongated nuclei located in the basal third of the cytoplasm, all aligned at the same uniform level.',
      'Apical surface frequently displays a refractile brush border (microvilli) or cilia; interspersed with goblet cells.'
    ],
    characteristicAppearance: 'Tall upright columns with neat basally aligned oval nuclei and apical microvillar border.',
    typicalLocations: [
      'Lining of gastrointestinal tract from stomach to rectum',
      'Gallbladder lining (tallest columnar cells, no goblet cells)',
      'Uterine tubes (ciliated simple columnar)'
    ],
    diagnosticClue: 'Tall columnar cells with uniform basal oval nuclei; intestinal sections show clear mucous goblet cells and brush borders.',
    highYieldExamPearl: 'Lining of intestine exhibits apical microvilli (striated border) to maximize nutrient absorption area.'
  },
  {
    id: 'stratified_squamous',
    name: 'Stratified Squamous Epithelium',
    category: 'Epithelium',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Multilayered epithelium with basal cuboidal/columnar stem cells on basement membrane, polygonal intermediate cells, and flattened squamous cells at the superficial free surface.',
      'Non-keratinized: surface squamous cells retain visible flattened viable nuclei (moist surfaces).',
      'Keratinized: superficial layers lose nuclei, transforming into dead, acidophilic anucleate keratin scales (skin epidermis).'
    ],
    characteristicAppearance: 'Thick multicellular stratified sheet transitioning from dark proliferative basal cells to flat surface squamous cells.',
    typicalLocations: [
      'Non-keratinized: Esophagus, oral cavity, pharynx, vocal cords, vagina',
      'Keratinized: Epidermis of skin'
    ],
    diagnosticClue: 'Multiple cell layers where only the top apical layers are flattened squamous; non-keratinized has nuclei in all layers.',
    highYieldExamPearl: 'Built specifically for mechanical abrasion resistance and chemical barrier protection.'
  },
  {
    id: 'pseudostratified_columnar',
    name: 'Pseudostratified Ciliated Columnar Epithelium',
    category: 'Epithelium',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Appears multi-layered because cell nuclei are positioned at different vertical levels/tiers.',
      'CRITICAL: ALL cells rest directly upon the underlying thick basement membrane, but only tall cells reach the lumen.',
      'Luminal apical border is heavily ciliated with prominent motile cilia and interspersed flask-shaped goblet cells.'
    ],
    characteristicAppearance: 'Staggered multilevel nuclei with a carpet of apical hair-like cilia and pale mucin-filled goblet cells.',
    typicalLocations: [
      'Respiratory tract: Trachea, primary bronchi, nasal cavity ("Respiratory Epithelium")',
      'Non-ciliated with stereocilia: Epididymis and ductus deferens'
    ],
    diagnosticClue: 'Nuclei at multiple depths in a single-layered tissue bearing distinct apical cilia and goblet cells.',
    highYieldExamPearl: 'Forms the "mucociliary escalator" of the respiratory tract to clear trapped debris and microbes.'
  },
  {
    id: 'transitional_epithelium',
    name: 'Transitional Epithelium (Urothelium)',
    category: 'Epithelium',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Specialized stratified epithelium capable of extreme distension without cellular detachment.',
      'Superficial layer characterized by large, dome-shaped "umbrella cells", often binucleated, with eosinophilic apical crust.',
      'Intermediate layers contain pear-shaped polygonal cells; relaxed state displays 5-7 layers; stretched state shows 2-3 layers.'
    ],
    characteristicAppearance: 'Scalloped luminal border crowned by large dome-shaped umbrella cells resting over pear-shaped intermediate cells.',
    typicalLocations: [
      'Renal calyces and pelvis',
      'Ureter (lumen has star-shaped stellate appearance)',
      'Urinary bladder',
      'Proximal urethra'
    ],
    diagnosticClue: 'Dome-shaped / umbrella cells protruding into lumen with scalloped surface and binucleated cells.',
    highYieldExamPearl: 'Exclusively found in the urinary conducting passages (Urothelium); impermeable barrier against toxic hypertonic urine.'
  },

  // CONNECTIVE TISSUE
  {
    id: 'loose_connective',
    name: 'Loose (Areolar) Connective Tissue',
    category: 'Connective Tissue',
    stain: 'H&E / Verhoeff Elastic',
    microscopicFeatures: [
      'Loose, irregular meshwork with abundant gelatinous ground substance and relatively sparse fibers.',
      'Broad, wavy, pink eosinophilic type I collagen fiber bundles running randomly in all directions.',
      'Delicate, thin, dark purple/black branching elastic fibers.',
      'Diverse cellular population: spindle fibroblasts, mast cells with metachromatic granules, macrophages, and lymphocytes.'
    ],
    characteristicAppearance: 'Airy, open meshwork of pink wavy collagen bands and thin dark elastic threads peppered with fibroblast nuclei.',
    typicalLocations: [
      'Lamina propria beneath epithelial linings',
      'Submucosa of hollow digestive organs',
      'Papillary layer of dermis',
      'Stroma surrounding blood vessels and nerves'
    ],
    diagnosticClue: 'Spacious ground substance with criss-crossing pink collagen bundles and fine dark elastic threads.',
    highYieldExamPearl: 'Primary site of inflammatory and immune reactions; high volume of ground substance allows interstitial fluid diffusion.'
  },
  {
    id: 'dense_connective',
    name: 'Dense Connective Tissue',
    category: 'Connective Tissue',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Predominance of tightly packed, thick type I collagen fiber bundles with minimal ground substance.',
      'Dense Regular: parallel, straight, tightly organized collagen fibers with flattened fibroblast nuclei squeezed between bundles (tendons, ligaments).',
      'Dense Irregular: thick interwoven bundles arranged randomly in 3D to resist multidirectional mechanical stress (reticular dermis, organ capsules).'
    ],
    characteristicAppearance: 'Wave-like parallel pink ribbons of collagen with dark compressed cigar-shaped nuclei in rows.',
    typicalLocations: [
      'Dense regular: Tendons, aponeuroses, ligaments',
      'Dense irregular: Reticular dermis of skin, submucosa of GI tract, fibrous capsules of liver, spleen, testes'
    ],
    diagnosticClue: 'Massive parallel eosinophilic collagen bundles with flattened inactive fibroblast (tendinocyte) nuclei squeezed in rows.',
    highYieldExamPearl: 'Tendon has enormous tensile strength along its longitudinal axis due to regular parallel collagen packing.'
  },
  {
    id: 'adipose_tissue',
    name: 'Adipose Tissue (White Adipose)',
    category: 'Connective Tissue',
    stain: 'Hematoxylin & Eosin (H&E) / Sudan Black',
    microscopicFeatures: [
      'Large, rounded to polygonal cells (100+ μm) packed together in lobules separated by thin connective tissue septa.',
      'Cytoplasm occupied by a single huge unilocular lipid droplet that dissolves during standard xylene/alcohol prep, leaving a large clear empty space.',
      'Nucleus is compressed, flattened, and pushed against the peripheral plasma membrane, producing a "signet-ring" appearance.'
    ],
    characteristicAppearance: 'Chicken-wire / honeycomb lattice of delicate cell borders enclosing empty white spaces with peripheral flat nuclei.',
    typicalLocations: [
      'Hypodermis (subcutaneous tissue / superficial fascia)',
      'Greater omentum and mesenteries',
      'Perirenal fat pad (retroperitoneum)',
      'Yellow bone marrow'
    ],
    diagnosticClue: 'Honeycomb of empty round cells with peripheral flat dark nuclei; "signet-ring" cellular appearance.',
    highYieldExamPearl: 'Standard H&E dissolves lipid (leaving empty rings); frozen section with Oil Red O or Sudan Black stains triglycerides black/orange.'
  },

  // CARTILAGE
  {
    id: 'hyaline_cartilage',
    name: 'Hyaline Cartilage',
    category: 'Cartilage',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Homogeneous, smooth, semi-translucent, glassy (hyalos) basophilic extracellular matrix rich in type II collagen and aggrecan.',
      'Chondrocytes are housed inside clear cavities called lacunae.',
      'Chondrocytes often occur in small clusters of 2 to 8 cells termed "isogenous groups" resulting from recent mitotic division.',
      'Territorial matrix immediately surrounding lacunae stains intensely basophilic (darker violet); surrounded by outer vascular perichondrium.'
    ],
    characteristicAppearance: 'Glassy, smooth lavender matrix dotted with lacunae containing chondrocytes grouped in isogenous nests of 2-4.',
    typicalLocations: [
      'C-shaped rings and plates of trachea and bronchi',
      'Articular surfaces of movable synovial joints (lacks perichondrium)',
      'Costal cartilages connecting ribs to sternum',
      'Nasal septum, embryonic cartilaginous skeletal model'
    ],
    diagnosticClue: 'Glassy homogeneous basophilic matrix with isogenous groups of chondrocytes in lacunae and perichondrium.',
    highYieldExamPearl: 'Articular hyaline cartilage lacks a perichondrium; relies entirely on synovial fluid for nutrition, explaining poor repair.'
  },
  {
    id: 'elastic_cartilage',
    name: 'Elastic Cartilage',
    category: 'Cartilage',
    stain: 'Verhoeff / Orcein / Weigert Stain',
    microscopicFeatures: [
      'Similar histological architecture to hyaline cartilage, but extracellular matrix contains an abundant, dense network of branched elastic fibers.',
      'Chondrocytes inside lacunae are more numerous, larger, and more closely packed together than in hyaline cartilage.',
      'Stains intensely with specific elastic stains (dark brown/black with orcein/Verhoeff; dark purple with aldehyde fuchsin).',
      'Always enclosed by a well-defined perichondrium.'
    ],
    characteristicAppearance: 'Dark, dense network of branching elastic fiber threads crowding around large chondrocytes in lacunae.',
    typicalLocations: [
      'Auricle (pinna) of external ear',
      'External acoustic meatus',
      'Auditory (Eustachian) tube',
      'Epiglottis and cuneiform/corniculate cartilages of larynx'
    ],
    diagnosticClue: 'Dense, dark meshwork of elastic fibers in matrix surrounding packed chondrocytes in lacunae.',
    highYieldExamPearl: 'Provides exceptional flexibility and elastic recoil; does not undergo physiological calcification with aging unlike hyaline.'
  },
  {
    id: 'fibrocartilage',
    name: 'Fibrocartilage',
    category: 'Cartilage',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Combination of dense regular connective tissue and hyaline cartilage.',
      'Features coarse, thick, dense parallel bundles of acidophilic type I collagen fibers filling the matrix.',
      'Chondrocytes within distinct lacunae are arranged in neat, single-file longitudinal parallel rows/chains between collagen bundles.',
      'CRITICAL: Has NO perichondrium (blends imperceptibly with adjacent bone or ligament).'
    ],
    characteristicAppearance: 'Alternating linear rows of chondrocytes in lacunae sandwiched between thick, wavy parallel pink collagen bundles.',
    typicalLocations: [
      'Annulus fibrosus of intervertebral discs',
      'Pubic symphysis',
      'Articular discs of temporomandibular (TMJ) and sternoclavicular joints',
      'Menisci of knee joint'
    ],
    diagnosticClue: 'Chondrocytes in lacunae aligned in neat parallel rows between dense wavy pink collagen fibers; NO perichondrium.',
    highYieldExamPearl: 'Intermediate tissue between tendon and cartilage; engineered to resist intense compressive and tensile shearing forces.'
  },

  // BONE
  {
    id: 'compact_bone',
    name: 'Compact Bone (Ground Bone)',
    category: 'Bone',
    stain: 'Ground Bone (unstained Indian Ink) / Decalcified H&E',
    microscopicFeatures: [
      'Organized into cylindrical structural units called Osteons (Haversian Systems) oriented parallel to the long axis of the bone.',
      'Central Haversian Canal contains neurovascular bundle (artery, vein, nerve, lymphatics).',
      'Concentric Lamellae (4-20 rings of calcified bone matrix) arranged circularly around the central canal.',
      'Osteocytes reside inside small oval cavities called lacunae situated between adjacent lamellae.',
      'Radiating spider-leg-like micro-tunnels called Canaliculi connect adjacent lacunae to each other and to the Haversian canal for nutrient exchange.',
      'Volkmann (perforating) canals run perpendicularly to connect Haversian canals with periosteum.'
    ],
    characteristicAppearance: 'Concentric tree-trunk growth rings (osteons) with dark central canals and radiating spider-like osteocyte lacunae.',
    typicalLocations: [
      'Diaphysis (shaft) of long bones (femur, humerus, tibia)',
      'Outer cortical shell of all flat and irregular bones'
    ],
    diagnosticClue: 'Classic bullseye Haversian systems with concentric lamellae, central canal, and spider-like radiating canaliculi.',
    highYieldExamPearl: 'Canaliculi contain cytoplasmic processes of osteocytes with gap junctions; essential because calcified matrix prevents diffusion.'
  },
  {
    id: 'spongy_bone',
    name: 'Spongy (Cancellous / Trabecular) Bone',
    category: 'Bone',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Lacks typical Haversian systems; composed of a 3D branching latticework of bony plates and spicules called Trabeculae.',
      'Trabeculae consist of irregularly arranged lamellae containing osteocytes in lacunae.',
      'Surfaced by endosteum lined with inactive bone-lining cells, active osteoblasts, and multinucleated bone-resorbing osteoclasts in Howship lacunae.',
      'Intertrabecular spaces are filled with vascularized hematopoietic Red Bone Marrow.'
    ],
    characteristicAppearance: 'Branching pink bony trabecular network enclosing large cavernous vascular marrow cavities filled with hematopoietic cells.',
    typicalLocations: [
      'Epiphyses and metaphyses of long bones',
      'Interior of vertebrae, ribs, sternum, and pelvic bones',
      'Diploe of cranial bones'
    ],
    diagnosticClue: 'Irregular pink bony trabeculae containing osteocytes, surrounded by cellular red marrow containing megakaryocytes.',
    highYieldExamPearl: 'Major site of hematopoiesis in adults (sternum, iliac crest); trabecular alignment mirrors principal biomechanical stress lines.'
  },

  // BLOOD
  {
    id: 'blood_smear',
    name: 'Peripheral Blood Smear',
    category: 'Blood',
    stain: 'Wright-Giemsa / Leishman Stain',
    microscopicFeatures: [
      'Erythrocytes (RBCs): millions of uniform (7.5 μm) anucleate, biconcave circular discs with a pale central one-third (central pallor).',
      'Neutrophils (60-70% WBCs): 12-15 μm with characteristic 3 to 5 lobed nucleus connected by chromatin threads; pale lilac-pink granules.',
      'Lymphocytes (20-30% WBCs): 6-9 μm small spherical cell with intensely dark, dense, condensed round nucleus and a very thin rim of pale blue cytoplasm.',
      'Monocytes (3-8% WBCs): largest leukocyte (15-20 μm) with indented kidney/horseshoe-shaped nucleus and frosted-glass grey-blue cytoplasm.',
      'Eosinophils (2-4%): bilobed spectacled nucleus with packed bright red/orange refractive eosinophilic granules.',
      'Basophils (0.5-1%): S-shaped nucleus obscured by coarse dark blue-black granules containing histamine and heparin.',
      'Platelets (Thrombocytes): tiny anucleate purple cytoplasmic fragments (2-4 μm) clustered in small groups.'
    ],
    characteristicAppearance: 'Sea of pink biconcave RBCs interspersed with multi-lobed neutrophils, round dark lymphocytes, and tiny platelet specks.',
    typicalLocations: [
      'Peripheral venous / capillary blood circulation'
    ],
    diagnosticClue: 'Anucleate circular red cells; multi-lobed neutrophil with 3-5 segments; small lymphocyte with dark round nucleus.',
    highYieldExamPearl: 'Neutrophil is first responder to acute bacterial infection; lymphocyte is chief mediator of adaptive cellular/humoral immunity.'
  },

  // MUSCLE TISSUE
  {
    id: 'skeletal_muscle',
    name: 'Skeletal Muscle',
    category: 'Muscle',
    stain: 'Hematoxylin & Eosin (H&E) / Phosphotungstic Acid',
    microscopicFeatures: [
      'Huge, long, non-branching cylindrical fibers arranged in parallel bundles (fascicles).',
      'Prominent transverse cross-striations of alternating dark anisotropic (A-bands) and light isotropic (I-bands).',
      'Multinucleated syncytium: multiple elongated oval nuclei situated exclusively at the periphery of the fiber just beneath the sarcolemma.',
      'Cross-section shows polygonal/rounded fiber profiles with peripheral nuclei and perimysium/endomysium.'
    ],
    characteristicAppearance: 'Long parallel non-branching cylinders with crisp cross-striations and multiple peripheral flattened nuclei.',
    typicalLocations: [
      'Somatic muscles attached to skeleton (biceps, quadriceps, deltoid)',
      'Tongue, pharynx, upper third of esophagus',
      'Diaphragm, extrinsic eye muscles'
    ],
    diagnosticClue: 'Crisp parallel transverse striations and multiple nuclei situated strictly at the periphery of the cell membrane.',
    highYieldExamPearl: 'Peripheral multinucleation is the gold-standard diagnostic feature distinguishing skeletal from cardiac and smooth muscle.'
  },
  {
    id: 'cardiac_muscle',
    name: 'Cardiac Muscle (Myocardium)',
    category: 'Muscle',
    stain: 'Hematoxylin & Eosin (H&E) / Iron Hematoxylin',
    microscopicFeatures: [
      'Elongated, branching and anastomosing muscular fibers forming a 3D contractile network.',
      'Contains cross-striations, but less prominent than in skeletal muscle.',
      'Each cardiomyocyte possesses 1 or 2 centrally located, pale, oval/quadrangular euchromatic nuclei surrounded by a pale perinuclear halo.',
      'HALLMARK: Intercalated Discs — heavily stained transverse dark stepped lines representing junctional complexes (fascia adherens, macula adherens/desmosomes, and gap junctions for electrical coupling).'
    ],
    characteristicAppearance: 'Branching striated fibers with single central oval nuclei and dark stepped transverse lines (intercalated discs).',
    typicalLocations: [
      'Myocardium of the heart',
      'Roots of the great vessels (superior vena cava, pulmonary veins)'
    ],
    diagnosticClue: 'Branching fibers with single central nuclei and prominent dark transverse intercalated discs.',
    highYieldExamPearl: 'Intercalated discs contain gap junctions that provide ionic continuity, allowing the myocardium to act as a functional syncytium.'
  },
  {
    id: 'smooth_muscle',
    name: 'Smooth Muscle (Involuntary Muscle)',
    category: 'Muscle',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Individual cells are elongated, fusiform (spindle-shaped) with tapered ends and broad middle.',
      'Completely devoid of cross-striations (myofilaments are criss-crossed, anchoring into dense bodies).',
      'Single centrally placed, elongated, blunt-ended "cigar-shaped" or corkscrew nucleus (when contracted).',
      'Tightly packed sheets; in cross-section, cells show varying diameters and only some sections cut through the central nucleus.'
    ],
    characteristicAppearance: 'Sheets of tapered spindle cells with central elongated cigar-shaped nuclei; lacking any cross-striations.',
    typicalLocations: [
      'Muscularis externa of gastrointestinal tract',
      'Tunica media of muscular arteries and veins',
      'Wall of urinary bladder, ureters, uterus, and respiratory bronchioles'
    ],
    diagnosticClue: 'Non-striated spindle-shaped cells with central cigar-shaped nuclei; cross-section shows varied diameters.',
    highYieldExamPearl: 'Slow, sustained, involuntary, rhythmic contractions without fatigue; regulated by autonomic nervous system and hormones.'
  },

  // NERVOUS TISSUE
  {
    id: 'neuron_smear',
    name: 'Multipolar Motor Neuron',
    category: 'Nervous Tissue',
    stain: 'Toluidine Blue / Silver Impregnation / Cresyl Violet',
    microscopicFeatures: [
      'Large, star-shaped (stellate) or polygonal cell body (Perikaryon / Soma).',
      'Large, spherical, central, pale vesicular (euchromatic) nucleus with a very prominent, dark, eye-like nucleolus ("owl-eye" appearance).',
      'Cytoplasm packed with prominent, coarse, intensely basophilic clumps termed Nissl Bodies (chromatophilic substance = rough ER and polyribosomes).',
      'Multiple branching Dendrites receive impulses.',
      'Single long, slender Axon arising from a pale conical zone completely devoid of Nissl bodies called the Axon Hillock.',
      'Surrounded by small, dark supporting nuclei of Neuroglial cells (astrocytes, oligodendrocytes, microglia).'
    ],
    characteristicAppearance: 'Stellate soma with prominent owl-eye nucleolus, coarse blue Nissl flakes, and a pale cone-shaped axon hillock.',
    typicalLocations: [
      'Ventral (anterior) gray horn of the spinal cord',
      'Motor nuclei of cranial nerves in the brainstem',
      'Pyramidal cells of cerebral cortex, Purkinje cells of cerebellum'
    ],
    diagnosticClue: 'Large stellate cell body with coarse blue Nissl bodies, vesicular nucleus with prominent nucleolus, and clear axon hillock.',
    highYieldExamPearl: 'Axon hillock contains NO Nissl granules; site of summation where the action potential is generated.'
  },

  // GLANDULAR TISSUE
  {
    id: 'glandular_acini',
    name: 'Basic Exocrine Glandular Tissue (Serous vs Mucous Acini)',
    category: 'Glandular Tissue',
    stain: 'Hematoxylin & Eosin (H&E)',
    microscopicFeatures: [
      'Serous Acini: round clusters of pyramidal cells with intensely basophilic basal cytoplasm (ergastoplasm / rER) and apical eosinophilic zymogen granules; central round spherical nuclei; small distinct central lumen (parotid gland, exocrine pancreas).',
      'Mucous Acini: larger tubular/alveolar units filled with light-staining, pale, bubbly, foamy cytoplasm (mucin droplets); nuclei are dark, flattened, and pushed against the basal cell membrane (sublingual gland).',
      'Serous Demilunes (Crescents of Giannuzzi): crescent-shaped caps of serous cells capping mucous acini in mixed seromucous glands (submandibular gland).',
      'Excretory ducts: lined by simple cuboidal (intercalated) or simple columnar (striated) epithelium with basal mitochondrial invaginations.'
    ],
    characteristicAppearance: 'Dark purple spherical serous acini with round basal nuclei vs pale foamy mucous acini with flattened basal nuclei.',
    typicalLocations: [
      'Salivary glands (Parotid = 100% serous; Submandibular = mixed 80% serous; Sublingual = mixed 80% mucous)',
      'Exocrine pancreas (pure serous acini with centroacinar cells, no striated ducts)'
    ],
    diagnosticClue: 'Contrast between dark basophilic serous acini with round nuclei and pale, clear mucous acini with flat basal nuclei.',
    highYieldExamPearl: 'Parotid gland is purely serous; sublingual is predominantly mucous; submandibular is mixed with serous demilunes.'
  }
];
