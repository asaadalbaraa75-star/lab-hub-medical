import { AnatomicalLayerConfig, AnatomicalStructure, CameraViewPreset } from './Anatomy3DTypes';

export const ANATOMICAL_LAYERS: AnatomicalLayerConfig[] = [
  {
    id: 'skin',
    nameEn: 'Skin (Integument)',
    nameAr: 'الجلد والغطاء الخارجي',
    color: '#D4A373',
    defaultVisible: true,
    defaultOpacity: 0.35, // semi-translucent by default so deeper layers are visible
    iconName: 'User',
    description: 'Epidermis and dermis covering the entire human body contour'
  },
  {
    id: 'fascia',
    nameEn: 'Fascia & Aponeuroses',
    nameAr: 'اللفافات والأوتار العريضة',
    color: '#CBD5E1',
    defaultVisible: true,
    defaultOpacity: 0.65,
    iconName: 'Layers',
    description: 'Deep investing fascia, iliotibial tract, and rectus sheath'
  },
  {
    id: 'superficial_muscles',
    nameEn: 'Superficial Muscles',
    nameAr: 'العضلات السطحية',
    color: '#E11D48',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'Flame',
    description: 'Pectoralis major, Deltoids, Biceps brachii, Rectus abdominis, Quadriceps'
  },
  {
    id: 'deep_muscles',
    nameEn: 'Deep Muscles',
    nameAr: 'العضلات العميقة',
    color: '#9F1239',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'Activity',
    description: 'Pectoralis minor, Transversus abdominis, Intercostals, Psoas major'
  },
  {
    id: 'bones',
    nameEn: 'Skeletal Bones',
    nameAr: 'الهيكل العظمي',
    color: '#F8FAFC',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'Bone',
    description: 'Skull, vertebral column, thoracic ribcage, pelvis, and limb bones'
  },
  {
    id: 'joints',
    nameEn: 'Joints & Ligaments',
    nameAr: 'المفاصل والأربطة الزلالية',
    color: '#38BDF8',
    defaultVisible: true,
    defaultOpacity: 0.9,
    iconName: 'Link',
    description: 'Glenohumeral shoulder, elbow hinge, hip ball-and-socket, knee cruciate ligaments'
  },
  {
    id: 'organs',
    nameEn: 'Internal Organs (Viscera)',
    nameAr: 'الأعضاء الحشوية',
    color: '#F43F5E',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'Heart',
    description: 'Heart, lungs, liver, stomach, intestines, kidneys, spleen, bladder'
  },
  {
    id: 'arteries',
    nameEn: 'Arterial System',
    nameAr: 'الجهاز الشرياني',
    color: '#EF4444',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'GitBranch',
    description: 'Aorta, carotids, subclavian, brachial, celiac trunk, iliac, and femoral arteries'
  },
  {
    id: 'veins',
    nameEn: 'Venous System',
    nameAr: 'الجهاز الوريدي',
    color: '#0284C7',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'GitMerge',
    description: 'Superior and inferior vena cava, jugulars, renal veins, great saphenous vein'
  },
  {
    id: 'nerves',
    nameEn: 'Nervous System',
    nameAr: 'الجهاز العصبي والأعصاب',
    color: '#F59E0B',
    defaultVisible: true,
    defaultOpacity: 1.0,
    iconName: 'Zap',
    description: 'Brachial plexus, median, radial, ulnar, phrenic, vagus, sciatic, and femoral nerves'
  }
];

export const CAMERA_PRESETS: CameraViewPreset[] = [
  {
    id: 'anterior',
    nameEn: 'Anterior (AP) View',
    nameAr: 'المنظر الأمامي الكامل',
    position: [0, 0, 7.2],
    target: [0, 0, 0]
  },
  {
    id: 'head_neck',
    nameEn: 'Head & Neck',
    nameAr: 'الرأس والعنق والجمجمة',
    position: [0, 2.3, 3.2],
    target: [0, 2.2, 0]
  },
  {
    id: 'thorax',
    nameEn: 'Thorax (Heart & Lungs)',
    nameAr: 'الصدر (القلب والرئتان)',
    position: [0, 1.1, 3.5],
    target: [0, 1.1, 0]
  },
  {
    id: 'abdomen',
    nameEn: 'Abdomen & Viscera',
    nameAr: 'البطن والأعضاء الهضمية',
    position: [0, -0.1, 3.5],
    target: [0, -0.1, 0]
  },
  {
    id: 'pelvis_lower',
    nameEn: 'Pelvis & Lower Limbs',
    nameAr: 'الحوض والأطراف السفلية',
    position: [0, -1.8, 4.2],
    target: [0, -1.6, 0]
  },
  {
    id: 'posterior',
    nameEn: 'Posterior View',
    nameAr: 'المنظر الخلفي والعمود الفقري',
    position: [0, 0, -7.2],
    target: [0, 0, 0]
  }
];

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  // 1. ORGANS - HEART
  {
    id: 'heart_ventricles',
    nameEn: 'Heart (Cor)',
    nameAr: 'القلب (البطينان والأذينان)',
    latinName: 'Cor humanum',
    layer: 'organs',
    region: 'thorax',
    regionAr: 'القفص الصدري • المنصف الأوسط',
    location: 'Middle mediastinum, resting on the central tendon of the diaphragm, tilted obliquely with apex directed anteroinferiorly to the left (5th intercostal space midclavicular line).',
    function: 'Muscular double pump: right side pumps deoxygenated blood to pulmonary circulation; left side pumps oxygenated blood systemically via aorta.',
    relations: {
      anterior: 'Sternum, costal cartilages (3rd-6th), left lung and pleura anterior border',
      posterior: 'Esophagus, descending thoracic aorta, thoracic duct, azygos vein, T5-T8 vertebrae',
      lateral: 'Phrenic nerves, pericardiophrenic vessels, mediastinal pleura and lungs',
      inferior: 'Central tendon of diaphragm',
      superior: 'Great vessels (Aortic arch, Superior Vena Cava, Pulmonary trunk bifurcation)'
    },
    highYieldExamInfo: 'Cardiac apex beat is palpated in the 5th left intercostal space, 9 cm from midsternal line. The base of the heart is formed predominantly by the left atrium.',
    clinicalCorrelates: 'Pericardial tamponade (Beck triad: hypotension, JVD, muffled heart sounds). Myocardial infarction commonly affects LAD (Left Anterior Descending) artery ("widow maker").',
    innervationOrSupply: 'Cardiac plexus (Sympathetic T1-T4, Parasympathetic CN X Vagus). Blood: Right & Left Coronary Arteries.',
    pinPosition: [-0.15, 0.98, 0.42],
    meshTargetName: 'mesh_organ_heart',
    quickSpotterQuiz: {
      question: 'Where is the anatomical apex of the adult human heart typically located on surface anatomy?',
      questionAr: 'أين تقع قمة القلب تشريحياً على السطح الخارجي لجدار الصدر؟',
      options: [
        '5th left intercostal space, in the midclavicular line (~9 cm from midsternal line)',
        '2nd right intercostal space, next to the sternal border',
        '3rd left intercostal space, parasternal line',
        '6th right intercostal space, midaxillary line'
      ],
      correctIndex: 0,
      explanation: 'The apex of the heart is directed downwards, forwards, and to the left, lying at the 5th left intercostal space in the midclavicular line.'
    }
  },

  // 2. ORGANS - RIGHT LUNG
  {
    id: 'lung_right',
    nameEn: 'Right Lung (Pulmo Dexter)',
    nameAr: 'الرئة اليمنى (ثلاثة فصوص)',
    latinName: 'Pulmo dexter',
    layer: 'organs',
    region: 'thorax',
    regionAr: 'الصدر • التجويف الجنبي الأيمن',
    location: 'Right hemithorax, separated from left lung by the mediastinum. Has 3 lobes (superior, middle, inferior) divided by horizontal and oblique fissures.',
    function: 'External respiration: oxygenation of deoxygenated blood and clearance of metabolic carbon dioxide across the alveolar-capillary barrier.',
    relations: {
      medial: 'Right atrium, superior & inferior vena cava, azygos vein arch, esophagus, trachea',
      anterior: 'Anterior thoracic wall, internal thoracic vessels',
      posterior: 'Sympathetic trunk, vertebral bodies T1-T12, rib necks',
      inferior: 'Right dome of diaphragm (separating it from the right lobe of liver)'
    },
    highYieldExamInfo: 'The right main bronchus is wider, shorter, and runs more vertically (~25°) than the left (~45°), making it the most common site for foreign body aspiration.',
    clinicalCorrelates: 'Aspirated objects lodge predominantly into the right middle or lower lobe bronchus (bronchopulmonary segment 6 / superior segment of lower lobe).',
    innervationOrSupply: 'Pulmonary plexus (CN X + sympathetic T2-T5). Blood: Right bronchial artery and pulmonary arteries.',
    pinPosition: [0.55, 1.05, 0.28],
    meshTargetName: 'mesh_organ_lung_right',
    quickSpotterQuiz: {
      question: 'Why are aspirated foreign bodies statistically much more likely to enter the right lung?',
      questionAr: 'لماذا تدخل الأجسام الغريبة المستنشقة في الغالب إلى الرئة اليمنى مقارنة باليسرى؟',
      options: [
        'The right main bronchus is wider, shorter, and more vertically oriented',
        'The right lung has only two lobes, creating lower pressure',
        'The right pulmonary artery is located anteriorly',
        'The left lung is protected by the carina flap'
      ],
      correctIndex: 0,
      explanation: 'The right main bronchus is wider, shorter, and descends more vertically than the left, providing an almost direct linear continuation of the trachea.'
    }
  },

  // 3. ORGANS - LEFT LUNG
  {
    id: 'lung_left',
    nameEn: 'Left Lung (Pulmo Sinister)',
    nameAr: 'الرئة اليسرى (فصان مع التلم القلبي واللسين)',
    latinName: 'Pulmo sinister',
    layer: 'organs',
    region: 'thorax',
    regionAr: 'الصدر • التجويف الجنبي الأيسر',
    location: 'Left hemithorax. Smaller than the right lung due to the cardiac impression; possesses 2 lobes (superior and inferior) divided by a single oblique fissure, with the lingula and cardiac notch.',
    function: 'Gas exchange and pulmonary vascular resistance reservoir.',
    relations: {
      medial: 'Left ventricle, arch of aorta, thoracic descending aorta, left subclavian artery, esophagus',
      inferior: 'Left dome of diaphragm (separating lung from stomach fundus and spleen)',
      superior: 'Subclavian vessels and brachial plexus roots'
    },
    highYieldExamInfo: 'Features the Cardiac Notch along its anterior border and the Lingula (homologue to right middle lobe) projecting from the anteroinferior part of the superior lobe.',
    clinicalCorrelates: 'Left pleural effusion blunts the left costodiaphragmatic recess seen on upright chest radiography.',
    pinPosition: [-0.55, 1.05, 0.28],
    meshTargetName: 'mesh_organ_lung_left',
    quickSpotterQuiz: {
      question: 'Which anatomical feature of the left lung represents the embryological homologue of the right lung middle lobe?',
      questionAr: 'أي تركيب تشريحي في الرئة اليسرى يمثل النظير الجنيني للفص الأوسط من الرئة اليمنى؟',
      options: [
        'Lingula of the left lung',
        'Cardiac notch',
        'Oblique fissure',
        'Apex of the lung'
      ],
      correctIndex: 0,
      explanation: 'The lingula (a tongue-like projection at the anteroinferior border of the upper left lobe) is the developmental counterpart of the right lung middle lobe.'
    }
  },

  // 4. ORGANS - LIVER
  {
    id: 'liver_hepatic',
    nameEn: 'Liver (Hepar)',
    nameAr: 'الكبد (الفص الأيمن والأيسر)',
    latinName: 'Hepar',
    layer: 'organs',
    region: 'abdomen_pelvis',
    regionAr: 'البطن • المراق الأيمن والشرسوف',
    location: 'Right hypochondrium and epigastrium, extending into the left hypochondrium, shielded by ribs 7-11.',
    function: 'Metabolic hub: bile synthesis, glycogen storage, plasma protein production (albumin, clotting factors), urea synthesis, and drug detoxification.',
    relations: {
      superior: 'Diaphragm (separated by subphrenic spaces)',
      posterior: 'Inferior Vena Cava, gallbladder, esophagus, T10-T11 vertebrae',
      inferior: 'Stomach, duodenum, hepatic flexure of colon, right kidney and suprarenal gland'
    },
    highYieldExamInfo: 'Porta Hepatis contents from anterior to posterior: Bile duct (anterolateral), Hepatic artery proper (anteromedial), Hepatic Portal Vein (posterior).',
    clinicalCorrelates: 'Cirrhosis causes portal hypertension leading to esophageal varices, caput medusae, and splenomegaly. Biopsy is done at 9th or 10th intercostal space in midaxillary line during full expiration.',
    innervationOrSupply: 'Celiac plexus and Vagus. Dual blood supply: 75% Portal vein (nutrient-rich), 25% Hepatic artery proper (oxygen-rich).',
    pinPosition: [0.38, 0.35, 0.36],
    meshTargetName: 'mesh_organ_liver',
    quickSpotterQuiz: {
      question: 'What is the relative anatomical arrangement of structures in the free edge of the lesser omentum at the Porta Hepatis (anterior to posterior)?',
      questionAr: 'ما هو الترتيب التشريحي للتراكيب عند باب الكبد (Porta Hepatis) من الأمام إلى الخلف؟',
      options: [
        'Duct anterior-right, Artery anterior-left, Portal Vein posterior',
        'Portal Vein anterior, Bile Duct posterior, Artery medial',
        'Hepatic Artery anterior, Portal vein middle, Bile duct posterior',
        'Inferior Vena Cava anterior, Hepatic duct posterior'
      ],
      correctIndex: 0,
      explanation: 'D-A-V mnemonic: Common Bile Duct is anterolateral, Hepatic Artery proper is anteromedial, and Hepatic Portal Vein lies posteriorly.'
    }
  },

  // 5. ORGANS - STOMACH
  {
    id: 'stomach_gastric',
    nameEn: 'Stomach (Gaster)',
    nameAr: 'المعدة (القاع والجسم والبواب)',
    latinName: 'Gaster / Ventriculus',
    layer: 'organs',
    region: 'abdomen_pelvis',
    regionAr: 'البطن • الشرسوف والمراق الأيسر',
    location: 'Epigastric, umbilical, and left hypochondriac regions, continuous with esophagus at cardia (T11) and duodenum at pylorus (L1 transpyloric plane).',
    function: 'Mechanical churning, acid (HCl) secretion, pepsinogen activation, intrinsic factor production for vitamin B12 absorption.',
    relations: {
      anterior: 'Anterior abdominal wall, left costal margin, left lobe of liver, diaphragm',
      posterior: 'Stomach bed: Pancreas, spleen, left kidney and suprarenal gland, splenic artery, transverse mesocolon',
      superior: 'Diaphragm, gastroesophageal junction',
      inferior: 'Transverse colon, greater omentum'
    },
    highYieldExamInfo: 'The Pyloric sphincter lies at the transpyloric plane (L1 vertebra), 1.2 cm right of midline. Gastric ulcers on posterior wall can erode the splenic artery, causing fatal hemorrhage.',
    clinicalCorrelates: 'Pernicious anemia results from autoimmune destruction of parietal cells (loss of intrinsic factor). Pyloric stenosis in infants manifests with non-bilious projectile vomiting.',
    pinPosition: [-0.32, 0.32, 0.34],
    meshTargetName: 'mesh_organ_stomach',
    quickSpotterQuiz: {
      question: 'A penetrating ulcer on the posterior wall of the stomach body is most likely to erode which major blood vessel, causing severe hemorrhage?',
      questionAr: 'قرحة نافذة في الجدار الخلفي للمعدة قد تؤدي إلى تآكل أي وعاء دموي رئيسي مسببة نزيفاً حاداً؟',
      options: [
        'Splenic artery (running along the superior border of pancreas)',
        'Left gastric vein',
        'Inferior mesenteric artery',
        'Right renal artery'
      ],
      correctIndex: 0,
      explanation: 'The splenic artery runs tortuously along the superior border of the pancreas in the stomach bed immediately posterior to the stomach.'
    }
  },

  // 6. ORGANS - KIDNEYS
  {
    id: 'kidneys_renal',
    nameEn: 'Kidneys (Renes)',
    nameAr: 'الكليتان (اليمنى واليسرى خلف الصفاق)',
    latinName: 'Renes (Ren dexter et sinister)',
    layer: 'organs',
    region: 'abdomen_pelvis',
    regionAr: 'البطن • خلف البريتون (Retroperitoneal)',
    location: 'Retroperitoneal on posterior abdominal wall (T12-L3 levels). Right kidney is ~2 cm lower than left due to the right lobe of liver.',
    function: 'Filtration of blood, electrolyte and fluid homeostasis, renin-angiotensin blood pressure regulation, erythropoietin production, calcitriol activation.',
    relations: {
      posterior: 'Diaphragm, psoas major, quadratus lumborum, transversus abdominis, subcostal, iliohypogastric, and ilioinguinal nerves',
      anterior_right: 'Liver, 2nd part of duodenum, hepatic flexure of colon',
      anterior_left: 'Stomach, spleen, pancreas tail, jejunum, splenic flexure of colon',
      superior: 'Suprarenal (adrenal) glands capped atop upper poles'
    },
    highYieldExamInfo: 'Renal hilum contents from anterior to posterior: Renal Vein, Renal Artery, Renal Pelvis (V-A-P mnemonic).',
    clinicalCorrelates: 'Renal colic radiates from "loin to groin" following sensory pathways of T11-L2 (ilioinguinal & genitofemoral nerves) as ureter stone passes.',
    pinPosition: [0.42, 0.12, -0.18],
    meshTargetName: 'mesh_organ_kidney_right',
    quickSpotterQuiz: {
      question: 'What is the correct anterior-to-posterior arrangement of neurovascular and collecting structures entering the renal hilum?',
      questionAr: 'ما هو الترتيب التشريحي الصحيح من الأمام إلى الخلف للتراكيب الداخلة لسرة الكلية (Renal Hilum)؟',
      options: [
        'Renal Vein anterior, Renal Artery middle, Renal Pelvis posterior (V-A-P)',
        'Renal Artery anterior, Renal Vein middle, Ureter posterior',
        'Renal Pelvis anterior, Renal Vein middle, Renal Artery posterior',
        'Ureter anterior, Renal Artery middle, Renal Vein posterior'
      ],
      correctIndex: 0,
      explanation: 'Remember V-A-P: Renal Vein is most anterior, Renal Artery is intermediate, and Renal Pelvis (ureteric continuation) is most posterior.'
    }
  },

  // 7. BONES - SKULL
  {
    id: 'skull_cranium',
    nameEn: 'Skull & Cranium',
    nameAr: 'الجمجمة (القحف العصبي والوجهي)',
    latinName: 'Cranium',
    layer: 'bones',
    region: 'head_neck',
    regionAr: 'الرأس • القحف العصبي وعظام الوجه',
    location: 'Superior pole of axial skeleton, articulating inferiorly with C1 vertebra (Atlas) at atlanto-occipital condylar joints.',
    function: 'Protects the brain and cerebral meninges, encases sensory organs (eyes, inner ear, olfactory bulbs), houses masticatory apparatus.',
    relations: {
      superior: 'Scalp (5 layers: SCALP - Skin, Connective tissue, Aponeurosis, Loose areolar, Pericranium)',
      interior: 'Dura mater, dural venous sinuses, brain, cranial nerves I-XII',
      inferior: 'Atlas (C1), hyoid bone, stylomandibular and temporomandibular joints'
    },
    highYieldExamInfo: 'Pterion is an H-shaped suture junction where Frontal, Parietal, Temporal, and Sphenoid (greater wing) bones meet. Directly beneath lies the anterior branch of Middle Meningeal Artery.',
    clinicalCorrelates: 'Trauma to pterion causes fracture and laceration of the middle meningeal artery leading to an Epidural Hematoma (biconvex/lenticular shape on CT scan, lucid interval).',
    pinPosition: [0, 2.45, 0.15],
    meshTargetName: 'mesh_bone_skull',
    quickSpotterQuiz: {
      question: 'A fracture at the pterion region of the lateral skull wall is most notorious for tearing which critical vascular structure?',
      questionAr: 'كسر في منطقة الـ Pterion على الجدار الجانبي للجمجمة يشتهر بتمزيق أي وعاء دموي مهدد للحياة؟',
      options: [
        'Anterior branch of the Middle Meningeal Artery (causing epidural hematoma)',
        'Internal Carotid Artery (causing cavernous fistula)',
        'Facial Artery (causing superficial bruising)',
        'Superficial Temporal Artery only'
      ],
      correctIndex: 0,
      explanation: 'The thin bone at the pterion overlies the groove for the anterior division of the middle meningeal artery; fractures here lead to rapidly expanding epidural hematomas.'
    }
  },

  // 8. BONES - STERNUM & RIBCAGE
  {
    id: 'ribcage_sternum',
    nameEn: 'Thoracic Cage (Sternum & Ribs)',
    nameAr: 'القفص الصدري (عظم القص والأضلاع)',
    latinName: 'Cavea thoracis & Sternum',
    layer: 'bones',
    region: 'thorax',
    regionAr: 'الصدر • الجدار الصدري العظمي',
    location: 'Thoracic skeleton: 12 thoracic vertebrae posteriorly, 12 pairs of ribs laterally, and sternum (manubrium, body, xiphoid) anteriorly.',
    function: 'Protects thoracic viscera (heart, lungs, great vessels), participates in respiratory mechanics through pump-handle and bucket-handle movements.',
    relations: {
      posterior: 'Heart, pericardium, lungs, internal thoracic vessels, thymus remnant',
      superior: 'Thoracic inlet / superior thoracic aperture',
      inferior: 'Thoracic outlet / inferior thoracic aperture closed by the diaphragm'
    },
    highYieldExamInfo: 'Sternal Angle of Louis (Manubriosternal joint at T4/T5 level) marks: 2nd costal cartilage articulation, tracheal bifurcation (carina), aortic arch origin and termination, and azygos vein draining into SVC.',
    clinicalCorrelates: 'Rib fractures can lacerate intercostal neurovascular bundles (running in the costal groove along the INFERIOR border of each rib) or puncture lung tissue, causing hemothorax/pneumothorax.',
    pinPosition: [0, 1.15, 0.48],
    meshTargetName: 'mesh_bone_sternum',
    quickSpotterQuiz: {
      question: 'Which anatomical landmark lies precisely at the vertebral level of T4/T5 and serves as the counting point for the 2nd rib?',
      questionAr: 'أي معلم تشريحي يقع تماماً عند مستوى الفقرات T4/T5 ويُستخدم كنقطة مرجعية لعد الضلع الثاني؟',
      options: [
        'Sternal Angle of Louis (Manubriosternal joint)',
        'Xiphisternal joint',
        'Jugular / Suprasternal notch',
        'Clavicular notch'
      ],
      correctIndex: 0,
      explanation: 'The Sternal Angle (Angle of Louis) lies at the T4/T5 intervertebral disc plane and provides continuous palpable access to the 2nd costal cartilage.'
    }
  },

  // 9. BONES - FEMUR
  {
    id: 'femur_thigh',
    nameEn: 'Femur (Thigh Bone)',
    nameAr: 'عظم الفخذ (أطول وأقوى عظم بالجسم)',
    latinName: 'Os femoris',
    layer: 'bones',
    region: 'lower_limb',
    regionAr: 'الطرف السفلي • الفخذ',
    location: 'Thigh region, articulating proximally with the acetabulum of the pelvis and distally with patella and tibia at the knee joint.',
    function: 'Weight transmission from pelvic girdle to leg; lever arm for powerful hip and knee musculature.',
    relations: {
      proximal: 'Acetabulum, femoral artery and nerve anteriorly, sciatic nerve posteriorly',
      distal: 'Patella, tibial plateau, cruciate and collateral ligaments',
      shaft: 'Surrounded by anterior, medial, and posterior muscle compartments of thigh'
    },
    highYieldExamInfo: 'Femoral neck fracture (especially intracapsular) disrupts the retinacular branches of the Medial Circumflex Femoral Artery, leading to Avascular Necrosis (AVN) of the femoral head.',
    clinicalCorrelates: 'Fractured neck of femur classically presents with a shortened, externally rotated lower extremity in elderly patients with osteoporosis.',
    pinPosition: [0.38, -1.25, 0.05],
    meshTargetName: 'mesh_bone_femur_right',
    quickSpotterQuiz: {
      question: 'What is the most serious ischemic complication of an intracapsular femoral neck fracture in adults?',
      questionAr: 'ما هو أخطر مضاعف إقفاري لكسور عنق عظم الفخذ داخل المحفظة (Intracapsular) لدى البالغين؟',
      options: [
        'Avascular necrosis (AVN) of the femoral head due to medial circumflex femoral artery rupture',
        'Compartment syndrome of the deep calf',
        'Femoral nerve avulsion',
        'Patellar dislocation'
      ],
      correctIndex: 0,
      explanation: 'The blood supply to the femoral head runs retrograde through retinacular arteries originating from the medial circumflex femoral artery; intracapsular fractures sever these vessels.'
    }
  },

  // 10. SUPERFICIAL MUSCLES - BICEPS BRACHII
  {
    id: 'muscle_biceps',
    nameEn: 'Biceps Brachii',
    nameAr: 'العضلة ذات الرأسين العضدية',
    latinName: 'Musculus biceps brachii',
    layer: 'superficial_muscles',
    region: 'upper_limb',
    regionAr: 'الطرف العلوي • العضد الأمامي',
    location: 'Anterior compartment of the arm. Has two heads: Short head (from coracoid process) and Long head (from supraglenoid tubercle, tendon running through intertubercular sulcus).',
    function: 'Primary powerful supinator of the flexed forearm; flexor of the elbow joint; accessory stabilizer/flexor of glenohumeral joint.',
    relations: {
      anterior: 'Deep investing fascia of arm, skin',
      posterior: 'Brachialis, Coracobrachialis, Musculocutaneous nerve (running between biceps and brachialis)',
      medial: 'Brachial artery, Basilic vein, Median nerve in the medial bicipital groove',
      distal: 'Bicipital aponeurosis protecting brachial artery and median nerve in cubital fossa'
    },
    highYieldExamInfo: 'Innervated by Musculocutaneous nerve (C5, C6). Its tendon inserts into the radial tuberosity and its aponeurosis fans into the deep fascia of the medial forearm.',
    clinicalCorrelates: 'Biceps reflex tests C5/C6 nerve roots. Long head tendon rupture creates a distinctive bulging muscle belly known as the "Popeye" deformity.',
    pinPosition: [-0.98, 0.85, 0.18],
    meshTargetName: 'mesh_muscle_biceps_left',
    quickSpotterQuiz: {
      question: 'Which action is the Biceps Brachii most mechanically powerful at performing when the elbow is already semi-flexed?',
      questionAr: 'أي حركة تكون العضلة ذات الرأسين العضدية هي الأقوى ميكانيكياً في أدائها عندما يكون المرفق مثنياً؟',
      options: [
        'Supination of the forearm (like turning a corkscrew)',
        'Pronation of the forearm',
        'Pure extension of the shoulder joint',
        'Adduction of the wrist'
      ],
      correctIndex: 0,
      explanation: 'Because it inserts into the radial tuberosity, the biceps brachii functions as the body’s strongest supinator when the elbow is flexed to 90 degrees.'
    }
  },

  // 11. SUPERFICIAL MUSCLES - PECTORALIS MAJOR
  {
    id: 'muscle_pectoralis_major',
    nameEn: 'Pectoralis Major',
    nameAr: 'العضلة الصدرية الكبيرة',
    latinName: 'Musculus pectoralis major',
    layer: 'superficial_muscles',
    region: 'thorax',
    regionAr: 'الصدر • الجدار الأمامي',
    location: 'Anterior thoracic wall. Has two heads: Clavicular head (medial half of clavicle) and Sternocostal head (anterior sternum and upper 6 costal cartilages). Inserts into lateral lip of bicipital groove of humerus.',
    function: 'Adducts and medially rotates the humerus; clavicular head flexes the humerus, sternocostal head extends flexed humerus.',
    relations: {
      anterior: 'Subcutaneous tissue, deep fascia, female breast (mammary gland)',
      posterior: 'Pectoralis minor, subclavius, clavipectoral fascia, ribs, intercostal muscles, axillary vessels and cords of brachial plexus',
      superolateral: 'Deltopectoral groove with cephalic vein'
    },
    highYieldExamInfo: 'Innervated by BOTH Lateral Pectoral Nerve (C5, C6, C7) and Medial Pectoral Nerve (C8, T1).',
    clinicalCorrelates: 'Forms the anterior axillary fold. Absence in Poland syndrome is accompanied by hypoplasia of the ipsilateral breast and syndactyly.',
    pinPosition: [0.42, 1.25, 0.42],
    meshTargetName: 'mesh_muscle_pectoralis_right',
    quickSpotterQuiz: {
      question: 'Which anatomical structure travels within the deltopectoral groove between Pectoralis Major and Deltoid muscles?',
      questionAr: 'أي تركيب تشريحي يسير داخل التلم الدالي الصدري (Deltopectoral groove)؟',
      options: [
        'Cephalic vein and deltoid branch of thoracoacromial artery',
        'Basilic vein',
        'Brachial artery',
        'Musculocutaneous nerve'
      ],
      correctIndex: 0,
      explanation: 'The cephalic vein ascends along the lateral aspect of the upper limb and traverses the deltopectoral groove before piercing the clavipectoral fascia to drain into the axillary vein.'
    }
  },

  // 12. ARTERIES - AORTA
  {
    id: 'artery_aorta',
    nameEn: 'Aorta (Ascending, Arch, Descending)',
    nameAr: 'الشريان الأبهر (الصاعد، القوس، النازل)',
    latinName: 'Aorta',
    layer: 'arteries',
    region: 'thorax',
    regionAr: 'الصدر والبطن • الجذع الشرياني الرئيسي',
    location: 'Arises from left ventricle at aortic valve, arches over right pulmonary artery and left main bronchus at T4 level, then descends through posterior mediastinum and retroperitoneum to bifurcate at L4 into common iliac arteries.',
    function: 'Primary systemic conduit delivering oxygenated blood under pulsatile systolic pressure to the entire systemic circulation.',
    relations: {
      ascending_aorta: 'Anterior: Sternum, right atrium; Posterior: Left atrium, right pulmonary artery',
      aortic_arch: 'Anterior/Left: Left phrenic & vagus nerves, cardiac nerves; Posterior/Right: Trachea, esophagus, left recurrent laryngeal nerve hooking beneath it',
      abdominal_aorta: 'Right: Inferior Vena Cava; Left: Sympathetic trunk; Anterior: Pancreas body, 3rd part of duodenum'
    },
    highYieldExamInfo: 'Three major branches of the Aortic Arch (from right to left): 1. Brachiocephalic trunk, 2. Left Common Carotid artery, 3. Left Subclavian artery.',
    clinicalCorrelates: 'Aortic dissection (intimal tear creating a false lumen; presents with severe, sudden "tearing" chest pain radiating to the interscapular back). Coarctation of aorta causes upper extremity hypertension with delayed/diminished femoral pulses.',
    pinPosition: [-0.08, 1.22, 0.28],
    meshTargetName: 'mesh_artery_aorta',
    quickSpotterQuiz: {
      question: 'Which recurrent nerve loops directly underneath the aortic arch, lateral to the ligamentum arteriosum, before ascending back to the larynx?',
      questionAr: 'أي عصب حنجري يلتف مباشرة أسفل قوس الأبهر قبل أن يصعد مجدداً إلى الحنجرة؟',
      options: [
        'Left Recurrent Laryngeal Nerve (branch of Left Vagus CN X)',
        'Right Recurrent Laryngeal Nerve',
        'Left Phrenic Nerve',
        'Right Greater Splanchnic Nerve'
      ],
      correctIndex: 0,
      explanation: 'The Left Recurrent Laryngeal nerve loops under the aortic arch (around the ligamentum arteriosum), while the Right Recurrent Laryngeal loops under the right subclavian artery.'
    }
  },

  // 13. VEINS - INFERIOR VENA CAVA
  {
    id: 'vein_ivc',
    nameEn: 'Inferior Vena Cava (IVC)',
    nameAr: 'الوريد الأجوف السفلي',
    latinName: 'Vena cava inferior',
    layer: 'veins',
    region: 'abdomen_pelvis',
    regionAr: 'البطن • خلف البريتون على يمين الأبهر',
    location: 'Formed at L5 by the confluence of the common iliac veins; ascends retroperitoneally to the right of the abdominal aorta, pierces the central tendon of diaphragm at T8, and enters the right atrium.',
    function: 'Collects and drains deoxygenated blood from all structures below the respiratory diaphragm back to the right atrium of the heart.',
    relations: {
      anterior: 'Liver, 1st and 3rd parts of duodenum, head of pancreas, right gonadal and right colic vessels',
      posterior: 'Right sympathetic trunk, lumbar arteries, right renal artery, right crus of diaphragm',
      left: 'Abdominal aorta'
    },
    highYieldExamInfo: 'Pierces the diaphragm at T8 (Caval opening in the central tendon) alongside the terminal branches of the right phrenic nerve. (Mnemonic: I8 10EGGs At12 = IVC T8, Esophagus T10, Aorta T12).',
    clinicalCorrelates: 'IVC filter placement in infrarenal segment prevents recurrent pulmonary embolism in patients with lower limb deep vein thrombosis (DVT) who cannot receive anticoagulants.',
    pinPosition: [0.15, 0.18, 0.15],
    meshTargetName: 'mesh_vein_ivc',
    quickSpotterQuiz: {
      question: 'At which precise thoracic vertebral level does the Inferior Vena Cava pierce the respiratory diaphragm?',
      questionAr: 'عند أي مستوى فقري يخترق الوريد الأجوف السفلي الحجاب الحاجز؟',
      options: [
        'T8 vertebra (through the central tendon)',
        'T10 vertebra (through muscular right crus)',
        'T12 vertebra (behind median arcuate ligament)',
        'L1 transpyloric plane'
      ],
      correctIndex: 0,
      explanation: 'Remember the classic rule: IVC pierces at T8, Esophagus at T10, and Aorta at T12.'
    }
  },

  // 14. NERVES - SCIATIC NERVE
  {
    id: 'nerve_sciatic',
    nameEn: 'Sciatic Nerve (Ischiadicus)',
    nameAr: 'العصب الوركي (عرق النسا - أثخن عصب بالجسم)',
    latinName: 'Nervus ischiadicus',
    layer: 'nerves',
    region: 'lower_limb',
    regionAr: 'الطرف السفلي • الألوية والفخذ الخلفي',
    location: 'Originates from Sacral Plexus (L4, L5, S1, S2, S3). Exits pelvis via greater sciatic foramen INFERIOR to piriformis muscle, travels down posterior thigh, and bifurcates at popliteal fossa apex into Tibial and Common Fibular nerves.',
    function: 'Innervates hamstring muscles (semitendinosus, semimembranosus, biceps femoris), ischial part of adductor magnus, and all sensory/motor distribution to leg and foot via terminal branches.',
    relations: {
      posterior: 'Gluteus maximus muscle',
      anterior: 'Superior gemellus, obturator internus, inferior gemellus, quadratus femoris, adductor magnus',
      medial: 'Inferior gluteal nerve and vessels, posterior femoral cutaneous nerve'
    },
    highYieldExamInfo: 'To avoid damaging the sciatic nerve during intramuscular (IM) gluteal injections, inject strictly into the UPPER OUTER (Superolateral) quadrant of the gluteal region.',
    clinicalCorrelates: 'Sciatica is radicular pain radiating down posterior leg. Posterior hip dislocation drives femoral head backward, frequently injuring the sciatic nerve resulting in "Foot Drop" (loss of common fibular innervation to anterior leg).',
    pinPosition: [0.32, -0.65, -0.22],
    meshTargetName: 'mesh_nerve_sciatic_right',
    quickSpotterQuiz: {
      question: 'Into which quadrant of the gluteal region must intramuscular injections be administered to prevent catastrophic injury to the sciatic nerve?',
      questionAr: 'في أي ربع من المنطقة الألوية يجب إعطاء الحقن العضلية لتجنب إصابة العصب الوركي؟',
      options: [
        'Upper-outer (Superolateral) quadrant',
        'Upper-inner (Superomedial) quadrant',
        'Lower-outer (Inferolateral) quadrant',
        'Lower-inner (Inferomedial) quadrant'
      ],
      correctIndex: 0,
      explanation: 'Intramuscular injections are safely delivered into the upper outer quadrant (gluteus medius) to completely avoid the sciatic nerve traversing the lower quadrants.'
    }
  },

  // 15. JOINTS - KNEE JOINT
  {
    id: 'joint_knee',
    nameEn: 'Knee Joint Complex & Ligaments',
    nameAr: 'مفصل الركبة والأربطة الصليبية والغضاريف',
    latinName: 'Articulatio genus',
    layer: 'joints',
    region: 'lower_limb',
    regionAr: 'الطرف السفلي • الركبة',
    location: 'Synovial hinge joint between femoral condyles, patella, and tibial plateau. Contains intra-articular structures (ACL, PCL, medial and lateral fibrocartilaginous menisci).',
    function: 'Weight-bearing articulation facilitating flexion (0°–140°), extension (0°), with subtle internal/external rotation during terminal extension ("Screw-Home Mechanism").',
    relations: {
      anterior: 'Quadriceps tendon, patella, patellar ligament, prepatellar bursa',
      posterior: 'Popliteal fossa contents (Popliteal artery, Popliteal vein, Tibial nerve)',
      medial: 'Medial Collateral Ligament (MCL), pes anserinus tendons (Sartorius, Gracilis, Semitendinosus)',
      lateral: 'Lateral Collateral Ligament (LCL), Iliotibial tract, biceps femoris tendon'
    },
    highYieldExamInfo: 'The "Unhappy Triad" (O’Donoghue triad) of knee injury caused by lateral impact to flexed knee consists of tears in: 1. ACL (Anterior Cruciate Ligament), 2. MCL (Medial Collateral Ligament), and 3. Medial Meniscus.',
    clinicalCorrelates: 'Anterior Drawer Test & Lachman Test evaluate ACL integrity. Posterior Drawer Test evaluates PCL integrity. McMurray test checks for torn menisci.',
    pinPosition: [0.38, -1.95, 0.12],
    meshTargetName: 'mesh_joint_knee_right',
    quickSpotterQuiz: {
      question: 'Which three anatomical structures are classically torn in the notorious "Unhappy Triad" knee injury?',
      questionAr: 'ما هي التراكيب التشريحية الثلاثة التي تتمزق في إصابة الركبة المعروفة باسم الثالوث المشؤوم (Unhappy Triad)؟',
      options: [
        'Anterior Cruciate Ligament (ACL), Medial Collateral Ligament (MCL), and Medial Meniscus',
        'Posterior Cruciate Ligament (PCL), LCL, and Lateral Meniscus',
        'Patellar tendon, Quadriceps tendon, and Prepatellar bursa',
        'Sciatic nerve, Femoral artery, and Tibial tuberosity'
      ],
      correctIndex: 0,
      explanation: 'The classic Unhappy Triad consists of rupture of the ACL, MCL, and the Medial Meniscus (often due to strong lateral/valgus stress while the foot is planted).'
    }
  }
];
