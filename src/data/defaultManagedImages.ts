import { ManagedImage, LabSubjectId } from '../types';

export interface SubjectHierarchySection {
  id: string;
  subject: LabSubjectId;
  titleAr: string;
  titleEn: string;
  iconName: string;
  descriptionAr: string;
}

export const SUBJECT_HIERARCHY_SECTIONS: SubjectHierarchySection[] = [
  // --- ANATOMY SECTIONS ---
  {
    id: 'anat_bones',
    subject: 'anatomy',
    titleAr: 'العظام ومعالم الهيكل العظمي',
    titleEn: 'Bones & Osteology',
    iconName: 'Bone',
    descriptionAr: 'معالم القحف وعظام الأطراف والهيكل العظمي المحوري والطرفي'
  },
  {
    id: 'anat_muscles',
    subject: 'anatomy',
    titleAr: 'العضلات والحجرات العضلية',
    titleEn: 'Muscles & Compartments',
    iconName: 'Activity',
    descriptionAr: 'عضلات الأطراف العلوية والسفلية وجدار الصدر والبطن وتفرعاتها'
  },
  {
    id: 'anat_joints',
    subject: 'anatomy',
    titleAr: 'المفاصل والأربطة المفصلية',
    titleEn: 'Joints & Ligaments',
    iconName: 'Move3d',
    descriptionAr: 'المفاصل الزليلية والأربطة المتصالبة والهلالات المفصلية والمحفظة'
  },
  {
    id: 'anat_structures',
    subject: 'anatomy',
    titleAr: 'التراكيب التشريحية والحزم العصبية',
    titleEn: 'Anatomical Structures & Nerves',
    iconName: 'GitMerge',
    descriptionAr: 'عضلات العين وحجاجها، مثلثات العنق، والحزم الوعائية العصبية'
  },
  {
    id: 'anat_organs',
    subject: 'anatomy',
    titleAr: 'الأعضاء والأجهزة الحشوية',
    titleEn: 'Visceral Organs & Systems',
    iconName: 'Heart',
    descriptionAr: 'تشريح القلب والصمامات، مقاطع الدماغ، الرئتين والكلى'
  },

  // --- HISTOLOGY SECTIONS ---
  {
    id: 'hist_microscope',
    subject: 'histology',
    titleAr: 'المجهر الضوئي وتقنيات التحضير',
    titleEn: 'Microscopy & Slide Prep',
    iconName: 'Microscope',
    descriptionAr: 'أجزاء المجهر، التكبير، وضبط الإضاءة وتحضير الشرائح الزجاجية'
  },
  {
    id: 'hist_cells',
    subject: 'histology',
    titleAr: 'الخلية وعضيات السيتوبلازم',
    titleEn: 'Cytology & Organelles',
    iconName: 'CircleDot',
    descriptionAr: 'عضيات الخلية كجهاز غولجي والمتقدرات وحبيبات نيسل بالصبغات الخاصة'
  },
  {
    id: 'hist_epithelial',
    subject: 'histology',
    titleAr: 'النسيج الطلائي والظهاري',
    titleEn: 'Epithelial Tissue',
    iconName: 'Layers',
    descriptionAr: 'الطلائي البسيط (حرشفي، مكعبي، عمودي) والطلائي المطبق والمتحول'
  },
  {
    id: 'hist_connective',
    subject: 'histology',
    titleAr: 'النسيج الضام والغضاريف والعظام',
    titleEn: 'Connective Tissue & Bone',
    iconName: 'Share2',
    descriptionAr: 'النسيج الضام الكثيف والرخو والشحمي، والغضروف الزجاجي والعظم المكتنز'
  },
  {
    id: 'hist_muscle',
    subject: 'histology',
    titleAr: 'النسيج العضلي (هيكلي، قلبي، أملس)',
    titleEn: 'Muscle Tissue',
    iconName: 'Zap',
    descriptionAr: 'الألياف العضلية الهيكلية المخططة، العضلة القلبية، والعضلات الملساء'
  },
  {
    id: 'hist_nerve',
    subject: 'histology',
    titleAr: 'النسيج العصبي والعقد المحيطية',
    titleEn: 'Nervous Tissue',
    iconName: 'Cpu',
    descriptionAr: 'العصبونات متعددة الأقطاب، المادة الرمادية والبيضاء، والألياف الميالينية'
  },

  // --- BIOCHEMISTRY SECTIONS ---
  {
    id: 'bio_carbohydrates',
    subject: 'biochemistry',
    titleAr: 'اختبارات الكربوهيدرات والسكريات',
    titleEn: 'Carbohydrates & Sugars',
    iconName: 'FlaskConical',
    descriptionAr: 'اختبار مولش، بندكت، بارفويد، سيلوانوف، واليود للنشويات'
  },
  {
    id: 'bio_proteins',
    subject: 'biochemistry',
    titleAr: 'اختبارات البروتينات والأحماض الأمينية',
    titleEn: 'Proteins & Amino Acids',
    iconName: 'TestTube',
    descriptionAr: 'تفاعل البيوريت، النينهيدرين، التخثر الحراري والترسيب بالأملاح'
  },
  {
    id: 'bio_enzymes',
    subject: 'biochemistry',
    titleAr: 'حركية وتفاعلات الإنزيمات',
    titleEn: 'Enzyme Kinetics',
    iconName: 'Gauge',
    descriptionAr: 'نشاط إنزيم الأميلاز اللعابي وتأثير درجة الحرارة والرقم الهيدروجيني pH'
  },
  {
    id: 'bio_urine',
    subject: 'biochemistry',
    titleAr: 'فحوصات البول والتحاليل السريرية',
    titleEn: 'Clinical Urinalysis',
    iconName: 'ActivitySquare',
    descriptionAr: 'شرائط الكشف اللونية، الكيتونات باختبار روثيرا، والبروتين السكري'
  }
];

export const DEFAULT_MANAGED_IMAGES: ManagedImage[] = [
  // =========================================================================
  // 1. ANATOMY (التشريح) — Organized by Section -> Lesson -> Image
  // =========================================================================
  // Section: anat_bones (Bones & Osteology)
  {
    id: 'slide_anat_skull_01',
    url: '/images/anatomy/skull_anterior_osteology.png',
    image: '/images/anatomy/skull_anterior_osteology.png',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    title: 'Human Skull & Cranial Bones (Anterior Osteology)',
    caption: 'المظهر الأمامي للجمجمة يوضح محجري العين، الفتحة الكمثرية، الدروز القحفية والفكين العلوي والسفلي.',
    subject: 'anatomy',
    categoryId: 'anat_bones',
    categoryTitle: 'العظام ومعالم الهيكل العظمي (Bones & Osteology)',
    lessonId: 'prac_anat_01',
    lessonTitle: 'Cranial Osteology & Skull Base Foramina',
    category: 'lesson',
    stainOrView: 'Anterior Norma View',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_femur_01',
    url: '/images/anatomy/femur_anterior_osteology.png',
    image: '/images/anatomy/femur_anterior_osteology.png',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',
    title: 'Femur Anterior Osteology & Major Landmarks',
    caption: 'أطول عظام الجسم موضحاً الرأس المفصلي، العنق التشريحي، المدور الأكبر والأصغر واللقمتين المفصليتين.',
    subject: 'anatomy',
    categoryId: 'anat_bones',
    categoryTitle: 'العظام ومعالم الهيكل العظمي (Bones & Osteology)',
    lessonId: 'prac_anat_01',
    lessonTitle: 'Cranial Osteology & Skull Base Foramina',
    category: 'lesson',
    stainOrView: 'Anterior Aspect',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_humerus_01',
    url: '/images/anatomy/humerus_anterior_osteology.png',
    image: '/images/anatomy/humerus_anterior_osteology.png',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    title: 'Humerus Osteology & Epiphysial Landmarks',
    caption: 'عظم العضد مبيناً الرأس الكروي، الحديبتين الكبيرة والصغيرة، والميزاب بين الحديبتين والبكرة.',
    subject: 'anatomy',
    categoryId: 'anat_bones',
    categoryTitle: 'العظام ومعالم الهيكل العظمي (Bones & Osteology)',
    lessonId: 'prac_anat_01',
    lessonTitle: 'Cranial Osteology & Skull Base Foramina',
    category: 'lesson',
    stainOrView: 'Anterior View',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: anat_muscles (Muscles & Compartments)
  {
    id: 'slide_anat_biceps_01',
    url: '/images/anatomy/biceps_brachii_anterior_arm.png',
    image: '/images/anatomy/biceps_brachii_anterior_arm.png',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',
    title: 'Biceps Brachii & Anterior Arm Compartment',
    caption: 'تشريح العضلة ذات الرأسين العضدية مع الرأسين الطويل والقصير وارتكازهما على الأحدوبة الكعبرية.',
    subject: 'anatomy',
    categoryId: 'anat_muscles',
    categoryTitle: 'العضلات والحجرات العضلية (Muscles & Compartments)',
    lessonId: 'prac_anat_02',
    lessonTitle: 'Upper Limb Muscle Architecture',
    category: 'lesson',
    stainOrView: 'Anterior Dissection',
    magnification: 'Gross Cadaveric',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_triceps_01',
    url: '/images/anatomy/triceps_brachii_posterior_arm.png',
    image: '/images/anatomy/triceps_brachii_posterior_arm.png',
    imageUrl: '/images/anatomy/triceps_brachii_posterior_arm.png',
    title: 'Triceps Brachii Posterior Compartment & Olecranon',
    caption: 'العضلة ثلاثية الرؤوس العضدية برؤوسها الثلاثة (الطويل، الوحشي، والإنسي) المرتكزة على الناتئ الزجي.',
    subject: 'anatomy',
    categoryId: 'anat_muscles',
    categoryTitle: 'العضلات والحجرات العضلية (Muscles & Compartments)',
    lessonId: 'prac_anat_02',
    lessonTitle: 'Upper Limb Muscle Architecture',
    category: 'lesson',
    stainOrView: 'Posterior Dissection',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_deltoid_01',
    url: '/images/anatomy/deltoid_shoulder_trapezius.png',
    image: '/images/anatomy/deltoid_shoulder_trapezius.png',
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',
    title: 'Deltoid Muscle & Shoulder Trapezius Contour',
    caption: 'العضلة الدالية المغطية لقمة الكتف بأليافها الأمامية والوسطية والخلفية المسؤولة عن تبعيد الذراع.',
    subject: 'anatomy',
    categoryId: 'anat_muscles',
    categoryTitle: 'العضلات والحجرات العضلية (Muscles & Compartments)',
    lessonId: 'prac_anat_02',
    lessonTitle: 'Upper Limb Muscle Architecture',
    category: 'lesson',
    stainOrView: 'Lateral Shoulder View',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_quadriceps_01',
    url: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',
    image: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',
    imageUrl: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',
    title: 'Quadriceps Femoris Group & Patellar Tendon',
    caption: 'عضلات الفخذ الأمامية الأربعة مع وتر الرضفة المرتكز على أحدوبة عظم الظنبوب.',
    subject: 'anatomy',
    categoryId: 'anat_muscles',
    categoryTitle: 'العضلات والحجرات العضلية (Muscles & Compartments)',
    lessonId: 'prac_anat_02',
    lessonTitle: 'Upper Limb Muscle Architecture',
    category: 'lesson',
    stainOrView: 'Anterior Thigh',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_pectoralis_01',
    url: '/images/anatomy/pectoralis_major_anterior_chest.png',
    image: '/images/anatomy/pectoralis_major_anterior_chest.png',
    imageUrl: '/images/anatomy/pectoralis_major_anterior_chest.png',
    title: 'Pectoralis Major & Anterior Thoracic Wall',
    caption: 'العضلة الصدرية الكبيرة وجدار الصدر الأمامي مبيناً الرأس الترقوي والقصي الضلعي.',
    subject: 'anatomy',
    categoryId: 'anat_muscles',
    categoryTitle: 'العضلات والحجرات العضلية (Muscles & Compartments)',
    lessonId: 'prac_anat_02',
    lessonTitle: 'Upper Limb Muscle Architecture',
    category: 'diagram',
    stainOrView: 'Anterior Thorax',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: anat_joints (Joints & Ligaments)
  {
    id: 'slide_anat_knee_01',
    url: '/images/anatomy/knee_joint_interior_ligaments.png',
    image: '/images/anatomy/knee_joint_interior_ligaments.png',
    imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',
    title: 'Knee Joint Interior Ligaments & Cruciate Anatomy',
    caption: 'تشريح مفصل الركبة الداخلي يوضح الرباط الصليبي الأمامي (ACL) والخلفي والغضروفين الهلاليين.',
    subject: 'anatomy',
    categoryId: 'anat_joints',
    categoryTitle: 'المفاصل والأربطة المفصلية (Joints & Ligaments)',
    lessonId: 'prac_anat_03',
    lessonTitle: 'Synovial Joint Mechanics & Ligamentous Stability',
    category: 'lesson',
    stainOrView: 'Articular Dissection',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: anat_structures (Anatomical Structures & Nerves)
  {
    id: 'slide_anat_orbit_01',
    url: '/images/anatomy/extraocular_eye_muscles_orbit.png',
    image: '/images/anatomy/extraocular_eye_muscles_orbit.png',
    imageUrl: '/images/anatomy/extraocular_eye_muscles_orbit.png',
    title: 'Extraocular Eye Muscles & Orbital Neurovascular Ring',
    caption: 'عضلات العين المحركة الستة (المستقيمات الأربعة والمائلتان) مع الحلقة الوترية الشائعة.',
    subject: 'anatomy',
    categoryId: 'anat_structures',
    categoryTitle: 'التراكيب التشريحية والحزم العصبية (Anatomical Structures & Nerves)',
    lessonId: 'prac_anat_04',
    lessonTitle: 'Neurovascular Bundles of the Cubital & Popliteal Fossae',
    category: 'lesson',
    stainOrView: 'Lateral Orbital View',
    magnification: 'Detailed Atlas',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_scm_01',
    url: '/images/anatomy/sternocleidomastoid_neck.png',
    image: '/images/anatomy/sternocleidomastoid_neck.png',
    imageUrl: '/images/anatomy/sternocleidomastoid_neck.png',
    title: 'Sternocleidomastoid Muscle (SCM) & Neck Triangles',
    caption: 'العضلة القصية الترقوية الخشائية ومثلثات العنق الأمامية والخلفية مع العصب القحفي الحادي عشر.',
    subject: 'anatomy',
    categoryId: 'anat_structures',
    categoryTitle: 'التراكيب التشريحية والحزم العصبية (Anatomical Structures & Nerves)',
    lessonId: 'prac_anat_04',
    lessonTitle: 'Neurovascular Bundles of the Cubital & Popliteal Fossae',
    category: 'lesson',
    stainOrView: 'Anterolateral Neck',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: anat_organs (Visceral Organs & Systems)
  {
    id: 'slide_anat_heart_01',
    url: '/images/anatomy/heart_anterior_anatomy.png',
    image: '/images/anatomy/heart_anterior_anatomy.png',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    title: 'Internal Cardiac Chambers & Great Vessels Dissection',
    caption: 'مقطع إكليلي للقلب يوضح الأذينين والبطينين والصمامات الثلاثي والشرفات والأبهري وجذع الرئوي.',
    subject: 'anatomy',
    categoryId: 'anat_organs',
    categoryTitle: 'الأعضاء والأجهزة الحشوية (Visceral Organs & Systems)',
    lessonId: 'prac_anat_05',
    lessonTitle: 'Thoracic Viscera & Mediastinum Dissection',
    category: 'lesson',
    stainOrView: 'Coronal Section',
    magnification: 'Gross Organ',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_anat_brain_01',
    url: '/images/anatomy/brain_midsagittal_section.png',
    image: '/images/anatomy/brain_midsagittal_section.png',
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',
    title: 'Human Brain Median Sagittal Neuroanatomy',
    caption: 'المقطع السهمي المنصف للدماغ يوضح الجسم الثفني، المهاد، تحت المهاد، جذع الدماغ والمخيخ.',
    subject: 'anatomy',
    categoryId: 'anat_organs',
    categoryTitle: 'الأعضاء والأجهزة الحشوية (Visceral Organs & Systems)',
    lessonId: 'prac_anat_05',
    lessonTitle: 'Thoracic Viscera & Mediastinum Dissection',
    category: 'lesson',
    stainOrView: 'Midsagittal Slice',
    magnification: 'Gross Specimen',
    uploadedBy: 'الإدارة المركزية (Medical Board)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // =========================================================================
  // 2. HISTOLOGY (علم الأنسجة) — Organized by Section -> Lesson -> Image
  // =========================================================================
  // Section: hist_microscope (Microscopy & Slide Prep)
  {
    id: 'slide_hist_mic_01',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop&q=80',
    title: 'Compound Light Microscope Optical Alignment & Slide Mount',
    caption: 'المجهر الضوئي المركب مع العدسات العينية والشيئية وضابط الإضاءة المحوري لفحص الشرائح النسيجية.',
    subject: 'histology',
    categoryId: 'hist_microscope',
    categoryTitle: 'المجهر الضوئي وتقنيات التحضير (Microscopy & Slide Prep)',
    lessonId: 'prac_hist_01',
    lessonTitle: 'Light Microscopy & Cytological Organelles',
    category: 'lesson',
    stainOrView: 'Brightfield Optical System',
    magnification: 'Equipment 100x Oil',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: hist_cells (Cytology & Organelles)
  {
    id: 'slide_hist_cells_01',
    url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    title: 'Cytological Organelles & Golgi Apparatus (Silver Stain)',
    caption: 'عضيات الخلية وجهاز غولجي مصبوغاً بالفضة (Silver Staining) مظهراً الشبكة الكروية حول النواة.',
    subject: 'histology',
    categoryId: 'hist_cells',
    categoryTitle: 'الخلية وعضيات السيتوبلازم (Cytology & Organelles)',
    lessonId: 'prac_hist_01',
    lessonTitle: 'Light Microscopy & Cytological Organelles',
    category: 'lesson',
    stainOrView: 'Silver Impregnation Stain',
    magnification: '1000x Oil Immersion',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: hist_epithelial (Epithelial Tissue)
  {
    id: 'slide_hist_epith_01',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    title: 'Simple Squamous Epithelium (Bowman Capsule & Endothelium)',
    caption: 'النسيج الطلائي الحرشفي البسيط في محفظة بومان الكلوية وأوعية الدم، أنوية مسطحة مغزلية تبرز في التجويف.',
    subject: 'histology',
    categoryId: 'hist_epithelial',
    categoryTitle: 'النسيج الطلائي والظهاري (Epithelial Tissue)',
    lessonId: 'prac_hist_02',
    lessonTitle: 'Epithelial Tissues: Simple & Stratified',
    category: 'lesson',
    stainOrView: 'Hematoxylin & Eosin (H&E)',
    magnification: '400x High Power',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_hist_epith_02',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    title: 'Simple Cuboidal Epithelium (Renal Tubules & Ducts)',
    caption: 'خلايا ظهارية مكعبة متساوية الطول والعرض مع أنوية كروية مركزية بارزة تبطن الأنيبيبات الكلوية.',
    subject: 'histology',
    categoryId: 'hist_epithelial',
    categoryTitle: 'النسيج الطلائي والظهاري (Epithelial Tissue)',
    lessonId: 'prac_hist_02',
    lessonTitle: 'Epithelial Tissues: Simple & Stratified',
    category: 'lesson',
    stainOrView: 'Hematoxylin & Eosin (H&E)',
    magnification: '400x High Power',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_hist_epith_03',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    title: 'Stratified Squamous Non-Keratinized Epithelium (Esophagus)',
    caption: 'النسيج الظهاري المطبق الحرشفي غير المتقرن في المريء، طبقات متعددة تحمي من الاحتكاك الميكانيكي.',
    subject: 'histology',
    categoryId: 'hist_epithelial',
    categoryTitle: 'النسيج الطلائي والظهاري (Epithelial Tissue)',
    lessonId: 'prac_hist_02',
    lessonTitle: 'Epithelial Tissues: Simple & Stratified',
    category: 'spotter',
    stainOrView: 'H&E Slide Section',
    magnification: '200x Intermediate',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: hist_muscle (Muscle Tissue)
  {
    id: 'slide_hist_musc_01',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    title: 'Skeletal Muscle Fibers (Cross-Striations & Peripheral Nuclei)',
    caption: 'ألياف عضلية هيكلية أسطوانية غير متفرعة تظهر تخطيطات مستعرضة واضحة مع أنوية محيطية عديدة.',
    subject: 'histology',
    categoryId: 'hist_muscle',
    categoryTitle: 'النسيج العضلي (هيكلي، قلبي، أملس) (Muscle Tissue)',
    lessonId: 'prac_hist_05',
    lessonTitle: 'Muscle Tissue',
    category: 'lesson',
    stainOrView: 'H&E Longitudinal Section',
    magnification: '400x High Power',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_hist_musc_02',
    url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=80',
    title: 'Cardiac Muscle Tissue (Intercalated Discs & Central Nuclei)',
    caption: 'خلايا العضلة القلبية المتفرعة مع الأقراص البينية الداكنة (Intercalated Discs) والأنوية البيضاوية المركزية.',
    subject: 'histology',
    categoryId: 'hist_muscle',
    categoryTitle: 'النسيج العضلي (هيكلي، قلبي، أملس) (Muscle Tissue)',
    lessonId: 'prac_hist_05',
    lessonTitle: 'Muscle Tissue',
    category: 'lesson',
    stainOrView: 'Iron Hematoxylin Stain',
    magnification: '400x High Power',
    uploadedBy: 'د. رقية يحيى شرف الدين (قسم الأنسجة)',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // =========================================================================
  // 3. BIOCHEMISTRY (الكيمياء الحيوية السريرية) — Section -> Lesson -> Image
  // =========================================================================
  // Section: bio_carbohydrates (Carbohydrates & Sugars)
  {
    id: 'slide_bio_benedict_01',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    title: 'Benedict Qualitative Test for Reducing Sugars',
    caption: 'اختبار بندكت النوعي: إرجاع شوارد النحاسيك الزرقاء إلى راسب أكسيد النحاسوز الأحمر القرميدي دلالة على سكر مختزل.',
    subject: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    categoryTitle: 'اختبارات الكربوهيدرات والسكريات (Carbohydrates & Sugars)',
    lessonId: 'prac_bio_01',
    lessonTitle: 'Qualitative Analysis of Carbohydrates',
    category: 'lesson',
    stainOrView: 'Test Tube Color Assay',
    magnification: 'Direct Tube Specimen',
    uploadedBy: 'أ.د. الكيمياء الحيوية الطبية',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_bio_iodine_01',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    title: 'Iodine / Lugol Test for Polysaccharides (Starch Amylose)',
    caption: 'اختبار اليود للنشويات: تشكل المعقد الحلزوني الأزرق الداكن الفوري مع الأميلوز والذي يختفي بالحرارة.',
    subject: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    categoryTitle: 'اختبارات الكربوهيدرات والسكريات (Carbohydrates & Sugars)',
    lessonId: 'prac_bio_01',
    lessonTitle: 'Qualitative Analysis of Carbohydrates',
    category: 'lesson',
    stainOrView: 'Lugol Reagent Tube',
    magnification: 'Direct Tube Specimen',
    uploadedBy: 'أ.د. الكيمياء الحيوية الطبية',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },
  {
    id: 'slide_bio_barfoed_01',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1000&auto=format&fit=crop&q=80',
    title: 'Barfoed Test Differentiating Monosaccharides vs Disaccharides',
    caption: 'اختبار بارفويد في وسط حمضي ضعيف: السكريات الأحادية تختزل كاشف بارفويد في غضون 3 دقائق بينما الثنائية تحتاج وقتاً أطول.',
    subject: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    categoryTitle: 'اختبارات الكربوهيدرات والسكريات (Carbohydrates & Sugars)',
    lessonId: 'prac_bio_01',
    lessonTitle: 'Qualitative Analysis of Carbohydrates',
    category: 'lesson',
    stainOrView: 'Acidic Copper Acetate',
    magnification: 'Direct Tube Specimen',
    uploadedBy: 'أ.د. الكيمياء الحيوية الطبية',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: bio_proteins (Proteins & Amino Acids)
  {
    id: 'slide_bio_biuret_01',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
    title: 'Biuret Color Reaction for Peptide Bonds (Violet Chelate)',
    caption: 'تفاعل البيوريت النوعي للكشف عن الروابط الببتيدية (اثنتين فأكثر) بتشكل معقد تنسيقي بنفسجي مميز مع شوارد النحاس.',
    subject: 'biochemistry',
    categoryId: 'bio_proteins',
    categoryTitle: 'اختبارات البروتينات والأحماض الأمينية (Proteins & Amino Acids)',
    lessonId: 'prac_bio_02',
    lessonTitle: 'Protein Precipitation & Color Reactions',
    category: 'lesson',
    stainOrView: 'Alkaline Copper Sulfate',
    magnification: 'Direct Colorimetry',
    uploadedBy: 'أ.د. الكيمياء الحيوية الطبية',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  },

  // Section: bio_urine (Clinical Urinalysis)
  {
    id: 'slide_bio_urine_01',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
    title: 'Multistix Reagent Strip Diagnostic Urinalysis',
    caption: 'شرائط الغمس التشخيصية المتعددة للتحليل الكيميائي السريري الفوري للكشف عن البروتين، السكر، الكيتون، والبيليروبين في البول.',
    subject: 'biochemistry',
    categoryId: 'bio_urine',
    categoryTitle: 'فحوصات البول والتحاليل السريرية (Clinical Urinalysis)',
    lessonId: 'prac_bio_04',
    lessonTitle: 'Clinical Urinalysis & Pathological Constituents',
    category: 'lesson',
    stainOrView: 'Colorimetric Reagent Pad',
    magnification: 'Clinical Diagnostic Strip',
    uploadedBy: 'أ.د. الكيمياء الحيوية الطبية',
    uploadedAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T00:00:00.000Z'
  }
];
