/*
 * © LAB HUB · Developed by Sakina Asaad
 * Interactive Anatomy Atlas Data
 * Standard First-Year Medical Curriculum
 *
 * Real verified medical plates from:
 * - OpenStax Anatomy & Physiology (CC BY 4.0)
 * - Gray's Anatomy Classic Collection (Public Domain)
 * - NLM Visible Human Project
 */

export interface AtlasHotspot {
  id: string;
  pinNumber: number;
  nameEn: string;
  nameAr: string;
  posX: number; // percentage 0-100
  posY: number; // percentage 0-100
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  // Functional / Structural criteria (when applicable)
  originEn?: string;
  originAr?: string;
  insertionEn?: string;
  insertionAr?: string;
  innervationEn?: string;
  innervationAr?: string;
  actionEn?: string;
  actionAr?: string;
  clinicalPearlEn?: string;
  clinicalPearlAr?: string;
}

export interface AtlasView {
  id: string;
  labelEn: string; // e.g. "Anterior Gross View", "Posterior", "Bronchial Tree"
  labelAr: string;
  imageUrl: string;
  imageSource: string;
  imageLicense: string;
  imageCredit: string;
  descriptionEn: string;
  descriptionAr: string;
  hotspots: AtlasHotspot[];
}

export interface AtlasTopic {
  id: string;
  system: 'muscles' | 'respiratory' | 'cardiovascular' | 'skeletal' | 'joints' | 'nervous' | 'digestive' | 'urinary' | 'basics';
  systemLabelEn: string;
  systemLabelAr: string;
  region?: 'upper_limb' | 'lower_limb' | 'chest' | 'back' | 'abdomen' | 'face_neck' | 'eye' | 'other';
  regionLabelEn?: string;
  regionLabelAr?: string;
  titleEn: string;
  titleAr: string;
  shortOverviewEn: string;
  shortOverviewAr: string;
  defaultViewId: string;
  views: AtlasView[];
  youtubeVideoId?: string;
  videoTitleEn?: string;
  videoTitleAr?: string;
}

export const INTERACTIVE_ATLAS_TOPICS: AtlasTopic[] = [
  // =========================================================================
  // 1. RESPIRATORY SYSTEM: LUNGS (PRIMARY GROSS ANATOMY + SECONDARY BRONCHIAL TREE)
  // =========================================================================
  {
    id: 'respiratory_lungs',
    system: 'respiratory',
    systemLabelEn: 'Respiratory System',
    systemLabelAr: 'الجهاز التنفسي',
    titleEn: 'Lungs & Lower Airway Gross Anatomy',
    titleAr: 'التشريح العياني للرئتين والشجرة القصبية',
    shortOverviewEn: 'Paired cone-shaped organs of respiration occupying the thoracic cavity on either side of the mediastinum.',
    shortOverviewAr: 'عضوان مخروطيان للتنفس يقعان في التجويف الصدري على جانبي المنصف.',
    defaultViewId: 'anterior_gross',
    youtubeVideoId: 'b_7i0E4wH0I',
    videoTitleEn: 'Lungs Lobes and Fissures Anatomy',
    videoTitleAr: 'تشريح فصوص وشقوق الرئتين',
    views: [
      {
        id: 'anterior_gross',
        labelEn: 'Anterior Gross Anatomy (Primary View)',
        labelAr: 'المظهر العياني الأمامي (المنظر الأساسي)',
        imageUrl: '/images/anatomy/gross_anatomy_lungs_anterior.jpg',
        imageSource: 'OpenStax Anatomy & Physiology (Plate 2312)',
        imageLicense: 'CC BY 4.0',
        imageCredit: 'Gross anatomy of right and left lungs, lobes, fissures, and trachea (OpenStax / Rice University)',
        descriptionEn: 'Anterior view displaying the trachea, carina, right lung with 3 lobes and 2 fissures, and left lung with 2 lobes, cardiac notch, and lingula.',
        descriptionAr: 'منظر أمامي يوضح الرغامي، الجؤجؤ، الرئة اليمنى بثلاثة فصوص وشقين، والرئة اليسرى بفصين والثلمة القلبية واللسينة.',
        hotspots: [
          {
            id: 'lung-trachea',
            pinNumber: 1,
            nameEn: 'Trachea',
            nameAr: 'الرغامي (القصبة الهوائية)',
            posX: 49.5,
            posY: 10,
            shortDescriptionEn: 'Fibrocartilaginous tube composed of 16-20 C-shaped hyaline cartilage rings extending from larynx (C6) to carina (T4/T5).',
            shortDescriptionAr: 'أنبوب ليفي غضروفي يتكون من 16-20 حلقة غضروفية زجاجية على شكل حرف C تمتد من الحنجرة إلى الجؤجؤ.',
            clinicalPearlEn: 'Deficient posteriorly (trachealis muscle) allowing smooth bolus passage through the esophagus directly behind it.',
            clinicalPearlAr: 'الجزء الخلفي غير غضروفي (العضلة الرغامية) للسماح بتمدد المريء الواقع خلفها مباشرة أثناء البلع.'
          },
          {
            id: 'lung-carina',
            pinNumber: 2,
            nameEn: 'Carina & Main Bronchi Bifurcation',
            nameAr: 'جؤجؤ الرغامي وتفرع القصبات الرئيسية',
            posX: 49.5,
            posY: 24,
            shortDescriptionEn: 'Internal cartilaginous ridge at the tracheal bifurcation dividing into right and left main bronchi.',
            shortDescriptionAr: 'عرف غضروفي داخلي عند نقطة تشعب الرغامي إلى القصبتين الهوائيتين الرئيسيتين اليمنى واليسرى.',
            clinicalPearlEn: 'Right main bronchus is wider, shorter, and more vertical; inhaled foreign bodies lodge here far more frequently.',
            clinicalPearlAr: 'القصبة الرئيسية اليمنى أوسع وأقصر وأكثر استقامة عمودياً، ولذا تستقر الأجسام الأجنبية المستنشقة فيها أكثر بكثير.'
          },
          {
            id: 'lung-r-sup-lobe',
            pinNumber: 3,
            nameEn: 'Right Superior Lobe',
            nameAr: 'الفص العلوي للرئة اليمنى',
            posX: 28,
            posY: 26,
            shortDescriptionEn: 'Upper lobe of the right lung, separated from the middle lobe by the horizontal fissure.',
            shortDescriptionAr: 'الفص العلوي من الرئة اليمنى، ينفصل عن الفص المتوسط بالشق الأفقي.',
            clinicalPearlEn: 'Apex extends about 2-3 cm superior to the medial third of the clavicle into the root of the neck.',
            clinicalPearlAr: 'قمة الرئة تمتد حوالي 2-3 سم فوق الثلث الإنسي للترقوة في قاعدة العنق.'
          },
          {
            id: 'lung-r-horiz-fissure',
            pinNumber: 4,
            nameEn: 'Horizontal Fissure (Right Lung)',
            nameAr: 'الشق الأفقي (خاص بالرئة اليمنى)',
            posX: 26,
            posY: 43,
            shortDescriptionEn: 'Unique to the right lung; follows the 4th costal cartilage horizontally from anterior border to oblique fissure.',
            shortDescriptionAr: 'موجود فقط في الرئة اليمنى؛ يمتد بمحاذاة الغضروف الضلعي الرابع من الحافة الأمامية حتى يلتقي بالشق المائل.',
            clinicalPearlEn: 'Separates the superior lobe above from the middle lobe below.',
            clinicalPearlAr: 'يفصل بين الفص العلوي في الأعلى والفص المتوسط في الأسفل.'
          },
          {
            id: 'lung-r-mid-lobe',
            pinNumber: 5,
            nameEn: 'Right Middle Lobe',
            nameAr: 'الفص المتوسط للرئة اليمنى',
            posX: 24,
            posY: 56,
            shortDescriptionEn: 'Wedge-shaped lobe of the right lung bounded superiorly by horizontal fissure and inferiorly by oblique fissure.',
            shortDescriptionAr: 'فص إسفيني الشكل يحده من الأعلى الشق الأفقي ومن الأسفل الشق المائل.',
            clinicalPearlEn: 'Auscultated anteriorly between the 4th and 6th ribs on the right midclavicular line.',
            clinicalPearlAr: 'يتم تسمعه سريرياً على الجدار الأمامي للصدر بين الضلعين الرابع والسادس على خط منتصف الترقوة.'
          },
          {
            id: 'lung-r-inf-lobe',
            pinNumber: 6,
            nameEn: 'Right Inferior Lobe',
            nameAr: 'الفص السفلي للرئة اليمنى',
            posX: 25,
            posY: 76,
            shortDescriptionEn: 'Largest lobe of the right lung; rests on the dome of the diaphragm.',
            shortDescriptionAr: 'أكبر فصوص الرئة اليمنى؛ يستند على قبة الحجاب الحاجز.',
            clinicalPearlEn: 'Separated from middle and superior lobes by the oblique fissure; best auscultated on the posterior chest wall.',
            clinicalPearlAr: 'يفصله الشق المائل، ويكون تسمعه السريري الأفضل على جدار الصدر الخلفي.'
          },
          {
            id: 'lung-l-sup-lobe',
            pinNumber: 7,
            nameEn: 'Left Superior Lobe',
            nameAr: 'الفص العلوي للرئة اليسرى',
            posX: 74,
            posY: 30,
            shortDescriptionEn: 'Forms the upper half of the left lung; includes the apex and accommodates the cardiac notch.',
            shortDescriptionAr: 'يشكل النصف العلوي من الرئة اليسرى ويشمل قمة الرئة وتجويف الثلمة القلبية.',
            clinicalPearlEn: 'Only 2 lobes exist in the left lung because the heart occupies left mediastinal space.',
            clinicalPearlAr: 'تحتوي الرئة اليسرى على فصين فقط لأن القلب يحتل حيزاً كبيراً في الجانب الأيسر من المنصف.'
          },
          {
            id: 'lung-l-cardiac-notch',
            pinNumber: 8,
            nameEn: 'Cardiac Notch (Left Lung)',
            nameAr: 'الثلمة القلبية (الرئة اليسرى)',
            posX: 63,
            posY: 56,
            shortDescriptionEn: 'Prominent anterior indentation on the left lung accommodating the apex of the heart.',
            shortDescriptionAr: 'انخفاض أمامي واضح في الرئة اليسرى ليتسع لقمة القلب المنحرفة نحو اليسار.',
            clinicalPearlEn: 'Important landmark differentiating the anterior border of left lung from right lung.',
            clinicalPearlAr: 'علامة تشريحية فارقة تميز الحافة الأمامية للرئة اليسرى عن الرئة اليمنى.'
          },
          {
            id: 'lung-l-lingula',
            pinNumber: 9,
            nameEn: 'Lingula of Left Lung',
            nameAr: 'اللسينة (لسين الرئة اليسرى)',
            posX: 65,
            posY: 66,
            shortDescriptionEn: 'Tongue-like medially projecting projection of the left superior lobe below the cardiac notch.',
            shortDescriptionAr: 'بروز لسان الشكل يمتد من الفص العلوي للرئة اليسرى أسفل الثلمة القلبية مباشرة.',
            clinicalPearlEn: 'Embryologically and functionally homologous to the middle lobe of the right lung.',
            clinicalPearlAr: 'يقابل جنينياً ووظيفياً الفص المتوسط من الرئة اليمنى.'
          },
          {
            id: 'lung-l-inf-lobe',
            pinNumber: 10,
            nameEn: 'Left Inferior Lobe',
            nameAr: 'الفص السفلي للرئة اليسرى',
            posX: 76,
            posY: 76,
            shortDescriptionEn: 'Forms the posteroinferior bulk of the left lung, separated by the oblique fissure.',
            shortDescriptionAr: 'يشكل الكتلة الخلفية السفلية من الرئة اليسرى، مفصولاً بالشق المائل.',
            clinicalPearlEn: 'Extensively accessible to physical exam via posterior chest auscultation.',
            clinicalPearlAr: 'يمكن فحصه وتسمع أصواته التنفسية عبر جدار الصدر الخلفي.'
          }
        ]
      },
      {
        id: 'bronchial_tree',
        labelEn: 'Tracheobronchial Tree (Secondary View)',
        labelAr: 'الشجرة الرغامية القصبية (منظر تعليمي ثانوي)',
        imageUrl: '/images/anatomy/lungs_bronchial_tree.png',
        imageSource: "Gray's Anatomy Plate 961 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: "Trachea and bronchial ramifications into lobes and segments (Henry Gray, 1918)",
        descriptionEn: 'Detailed drawing of the branching bronchial tree from trachea down to lobar and segmental bronchi.',
        descriptionAr: 'رسم تشريحي مفصل لتفرعات الشجرة القصبية من الرغامي إلى القصبات الفصية والقطعية.',
        hotspots: [
          {
            id: 'tree-trachea',
            pinNumber: 1,
            nameEn: 'Trachea & Cartilaginous Rings',
            nameAr: 'الرغامي وحلقاتها الغضروفية',
            posX: 50,
            posY: 12,
            shortDescriptionEn: 'Conducts air directly from subglottic larynx to pulmonary tree.',
            shortDescriptionAr: 'يوصل الهواء مباشرة من الحنجرة إلى تفرعات الرئة.'
          },
          {
            id: 'tree-r-bronchus',
            pinNumber: 2,
            nameEn: 'Right Main Bronchus',
            nameAr: 'القصبة الهوائية الرئيسية اليمنى',
            posX: 34,
            posY: 38,
            shortDescriptionEn: 'Gives off eparterial bronchus to superior lobe before entering lung substance.',
            shortDescriptionAr: 'تتفرع إلى قصبة فوق الشريان للفص العلوي قبل دخولها نسيج الرئة.'
          },
          {
            id: 'tree-l-bronchus',
            pinNumber: 3,
            nameEn: 'Left Main Bronchus',
            nameAr: 'القصبة الهوائية الرئيسية اليسرى',
            posX: 66,
            posY: 42,
            shortDescriptionEn: 'Passes beneath aortic arch and anterior to esophagus and thoracic aorta.',
            shortDescriptionAr: 'تمر أسفل قوس الأبهر وأمام المريء والأبهر الصدري.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. MUSCLES — UPPER LIMB: BICEPS BRACHII
  // =========================================================================
  {
    id: 'muscle_biceps_brachii',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb',
    regionLabelAr: 'الطرف العلوي',
    titleEn: 'Biceps Brachii Muscle',
    titleAr: 'العضلة ذات الرأسين العضدية (البايسبس)',
    shortOverviewEn: 'Prominent two-headed flexor muscle of the anterior arm compartment.',
    shortOverviewAr: 'عضلة قابضة رئيسية ذات رأسين تحتل الحجرة الأمامية للذراع.',
    defaultViewId: 'anterior_dissection',
    youtubeVideoId: 'V933PuhbN3U',
    videoTitleEn: 'Biceps Brachii Anatomy & Biomechanics',
    videoTitleAr: 'تشريح عضلة البايسبس والحركات الوظيفية',
    views: [
      {
        id: 'anterior_dissection',
        labelEn: 'Anterior Arm Deep Dissection',
        labelAr: 'تشريح الحجرة الأمامية للذراع',
        imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',
        imageSource: "Gray's Anatomy Plate 411 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Deep dissection of anterior arm muscles and musculocutaneous nerve (Henry Gray, 1918)',
        descriptionEn: 'Deep dissection demonstrating both long and short heads of Biceps Brachii and their common insertion into the radial tuberosity.',
        descriptionAr: 'تشريح عميق يوضح الرأسين الطويل والقصير لعضلة البايسبس وارتكازهما المشترك على الأحدوبة الكعبرية.',
        hotspots: [
          {
            id: 'biceps-long-head',
            pinNumber: 1,
            nameEn: 'Long Head of Biceps Brachii',
            nameAr: 'الرأس الطويل للبايسبس',
            posX: 38,
            posY: 22,
            shortDescriptionEn: 'Arises inside the shoulder capsule and runs along the bicipital groove.',
            shortDescriptionAr: 'ينشأ داخل محفظة مفصل الكتف ويمر عبر الثلم بين حديبتي العضد.',
            originEn: 'Supraglenoid tubercle of the scapula.',
            originAr: 'الحديبة فوق الحقية للكتف.',
            innervationEn: 'Musculocutaneous nerve (C5, C6).',
            innervationAr: 'العصب العضلي الجلدي (C5, C6).'
          },
          {
            id: 'biceps-short-head',
            pinNumber: 2,
            nameEn: 'Short Head of Biceps Brachii',
            nameAr: 'الرأس القصير للبايسبس',
            posX: 58,
            posY: 26,
            shortDescriptionEn: 'Arises conjointly with coracobrachialis from the shoulder girdle.',
            shortDescriptionAr: 'ينشأ برباط مشترك مع العضلة الغرابية العضدية من الحزام الصدري.',
            originEn: 'Apex of coracoid process of the scapula.',
            originAr: 'قمة الناتئ الغرابي لعظم الكتف.',
            innervationEn: 'Musculocutaneous nerve (C5, C6).',
            innervationAr: 'العصب العضلي الجلدي (C5, C6).'
          },
          {
            id: 'biceps-muscle-belly',
            pinNumber: 3,
            nameEn: 'Biceps Muscle Belly',
            nameAr: 'جسم (بطن) عضلة البايسبس',
            posX: 48,
            posY: 52,
            shortDescriptionEn: 'Fusiform contractile belly formed by the merging of long and short heads.',
            shortDescriptionAr: 'جسم مغزلي متقلص يتكون من اندماج الرأسين الطويل والقصير.',
            actionEn: 'Powerful supinator of flexed forearm; primary flexor of the elbow joint.',
            actionAr: 'أقوى كابّة/باطحة للساعد عند انثنائه، وقابض رئيسي لمفصل المرفق.'
          },
          {
            id: 'biceps-insertion',
            pinNumber: 4,
            nameEn: 'Tendon Insertion & Bicipital Aponeurosis',
            nameAr: 'وتر الارتكاز والصفاق العضدي',
            posX: 44,
            posY: 84,
            shortDescriptionEn: 'Distal tendon inserts into the radius, and aponeurosis shields brachial artery.',
            shortDescriptionAr: 'الوتر البعيد يرتكز على عظم الكعبرة، والصفاق يحمي الشريان العضدي والعصب المتوسط.',
            insertionEn: 'Radial tuberosity of radius and deep fascia of forearm.',
            insertionAr: 'الأحدوبة الكعبرية واللفافة العميقة للساعد.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. MUSCLES — UPPER LIMB: TRICEPS BRACHII
  // =========================================================================
  {
    id: 'muscle_triceps_brachii',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb',
    regionLabelAr: 'الطرف العلوي',
    titleEn: 'Triceps Brachii Muscle',
    titleAr: 'العضلة ثلاثية الرؤوس العضدية (الترايسبس)',
    shortOverviewEn: 'Sole extensor muscle occupying the posterior compartment of the arm.',
    shortOverviewAr: 'العضلة الباسطة الوحيدة في الحجرة الخلفية للذراع.',
    defaultViewId: 'posterior_dissection',
    youtubeVideoId: 'fI5xTz1d0_I',
    videoTitleEn: 'Triceps Brachii Functional Anatomy',
    videoTitleAr: 'تشريح عضلة الترايسبس العضدية',
    views: [
      {
        id: 'posterior_dissection',
        labelEn: 'Posterior Arm Dissection',
        labelAr: 'تشريح الحجرة الخلفية للذراع',
        imageUrl: '/images/anatomy/triceps_brachii_posterior_arm.png',
        imageSource: "Gray's Anatomy Plate 412 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Posterior view of brachium displaying long, lateral, and medial heads of triceps (Henry Gray, 1918)',
        descriptionEn: 'Posterior view of the arm showing long head, lateral head, medial head, and common olecranon tendon.',
        descriptionAr: 'منظر خلفي للذراع يوضح الرأس الطويل، والرأس الوحشي، والرأس الإنسي، ووتر الارتكاز المشترك على الناتئ الزجي.',
        hotspots: [
          {
            id: 'triceps-long-head',
            pinNumber: 1,
            nameEn: 'Long Head of Triceps',
            nameAr: 'الرأس الطويل للترايسبس',
            posX: 40,
            posY: 28,
            shortDescriptionEn: 'The only head crossing the shoulder joint.',
            shortDescriptionAr: 'الرأس الوحيد الذي يعبر مفصل الكتف ويثبت رأس العضد.',
            originEn: 'Infraglenoid tubercle of scapula.',
            originAr: 'الحديبة تحت الحقية لعظم الكتف.'
          },
          {
            id: 'triceps-lateral-head',
            pinNumber: 2,
            nameEn: 'Lateral Head of Triceps',
            nameAr: 'الرأس الوحشي للترايسبس',
            posX: 64,
            posY: 42,
            shortDescriptionEn: 'Strongest head, visible on the outer profile of the upper arm.',
            shortDescriptionAr: 'أقوى الرؤوس، يشكل المنحنى الخارجي للذراع.',
            originEn: 'Posterior surface of humerus, superior to radial groove.',
            originAr: 'الوجه الخلفي لعظم العضد، فوق الثلم الكعبري.'
          },
          {
            id: 'triceps-olecranon-insertion',
            pinNumber: 3,
            nameEn: 'Olecranon Insertion Tendon',
            nameAr: 'وتر الارتكاز على زج الزند',
            posX: 52,
            posY: 84,
            shortDescriptionEn: 'Broad tendon inserting into the olecranon process of the ulna.',
            shortDescriptionAr: 'وتر عريض يرتكز على الناتئ الزجي لعظم الزند في المرفق.',
            insertionEn: 'Posterior surface of olecranon process of ulna.',
            insertionAr: 'السطح الخلفي لناتئ الزج بعظم الزند.',
            innervationEn: 'Radial nerve (C6, C7, C8).',
            innervationAr: 'العصب الكعبري (C6, C7, C8).',
            actionEn: 'Chief extensor of the forearm at the elbow joint.',
            actionAr: 'الباسط الرئيسي للساعد عند مفصل المرفق.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. MUSCLES — UPPER LIMB: DELTOID
  // =========================================================================
  {
    id: 'muscle_deltoid',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb',
    regionLabelAr: 'الطرف العلوي',
    titleEn: 'Deltoid Muscle',
    titleAr: 'العضلة الدالية (عضلة الكتف)',
    shortOverviewEn: 'Large, triangular muscle forming the rounded contour of the human shoulder.',
    shortOverviewAr: 'عضلة مثلثة ضخمة تشكل الاستدارة الطبيعية لكتف الإنسان.',
    defaultViewId: 'shoulder_contour',
    youtubeVideoId: 'U2XbL4mX7rM',
    videoTitleEn: 'Deltoid Muscle Anatomy & Axillary Nerve',
    videoTitleAr: 'تشريح العضلة الدالية والعصب الإبطي',
    views: [
      {
        id: 'shoulder_contour',
        labelEn: 'Shoulder & Arm Contour',
        labelAr: 'تضاريس الكتف والذراع',
        imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',
        imageSource: "Gray's Anatomy Plate 409 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Deltoid muscle origin along clavicle, acromion, and spine of scapula (Henry Gray, 1918)',
        descriptionEn: 'Lateral and posterior anatomical plate of the shoulder displaying clavicular, acromial, and spinous parts.',
        descriptionAr: 'لوحة تشريحية للكتف توضح الأجزاء الترقوية والأخرمية والشوكية للعضلة الدالية.',
        hotspots: [
          {
            id: 'deltoid-clavicular',
            pinNumber: 1,
            nameEn: 'Clavicular (Anterior) Fibers',
            nameAr: 'الألياف الترقوية (الأمامية)',
            posX: 38,
            posY: 22,
            shortDescriptionEn: 'Flexes and medially rotates the arm at the shoulder.',
            shortDescriptionAr: 'تعطف الذراع وتدوره للإنسي عند مفصل الكتف.',
            originEn: 'Lateral third of anterior clavicle.',
            originAr: 'الثلث الوحشي للترقوة.'
          },
          {
            id: 'deltoid-acromial',
            pinNumber: 2,
            nameEn: 'Acromial (Middle) Fibers',
            nameAr: 'الألياف الأخرمية (المتوسطة)',
            posX: 52,
            posY: 38,
            shortDescriptionEn: 'Multipennate powerful fibers; prime abductor of the arm from 15° to 90°.',
            shortDescriptionAr: 'ألياف قوية متعددة الريش؛ المبعد الرئيسي للذراع من 15 إلى 90 درجة.',
            originEn: 'Lateral border of acromion of scapula.',
            originAr: 'الحافة الوحشية لأخرم الكتف.',
            actionEn: 'Powerful arm abduction from 15° to 90° (supraspinatus initiates first 15°).',
            actionAr: 'تبعيد الذراع بقوة من 15° إلى 90° (فوق الشوكة تبدأ أول 15°).'
          },
          {
            id: 'deltoid-tuberosity',
            pinNumber: 3,
            nameEn: 'Deltoid Tuberosity Insertion',
            nameAr: 'أحدوبة العضلة الدالية (الارتكاز)',
            posX: 56,
            posY: 70,
            shortDescriptionEn: 'V-shaped roughened ridge on lateral mid-shaft of the humerus.',
            shortDescriptionAr: 'ارتفاع خشن على شكل حرف V في منتصف السطح الوحشي لعظم العضد.',
            insertionEn: 'Deltoid tuberosity of humerus.',
            insertionAr: 'الأحدوبة الدالية لعظم العضد.',
            innervationEn: 'Axillary nerve (C5, C6).',
            innervationAr: 'العصب الإبطي (C5, C6).'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. MUSCLES — CHEST: PECTORALIS MAJOR
  // =========================================================================
  {
    id: 'muscle_pectoralis_major',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'chest',
    regionLabelEn: 'Chest',
    regionLabelAr: 'الصدر',
    titleEn: 'Pectoralis Major Muscle',
    titleAr: 'العضلة الصدرية الكبيرة',
    shortOverviewEn: 'Thick, fan-shaped muscle covering the superior anterior chest wall.',
    shortOverviewAr: 'عضلة سميكة مروحية الشكل تغطي الجزء العلوي من الجدار الأمامي للصدر.',
    defaultViewId: 'anterior_chest',
    youtubeVideoId: 'n0_hK_kR2yY',
    videoTitleEn: 'Pectoralis Major Anatomy & Functions',
    videoTitleAr: 'تشريح العضلة الصدرية الكبيرة وأفعالها',
    views: [
      {
        id: 'anterior_chest',
        labelEn: 'Anterior Thoracic Wall',
        labelAr: 'الجدار الصدري الأمامي',
        imageUrl: '/images/anatomy/pectoralis_major_anterior_chest.png',
        imageSource: "Gray's Anatomy Plate 410 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Superficial dissection of anterior chest showing clavicular and sternocostal heads (Henry Gray, 1918)',
        descriptionEn: 'Superficial thoracic dissection demonstrating clavicular and sternocostal heads inserting into the humerus.',
        descriptionAr: 'تشريح سطحي للصدر يوضح الرأسين الترقوي والقصي الضلعي وارتكازهما على عظم العضد.',
        hotspots: [
          {
            id: 'pec-clavicular',
            pinNumber: 1,
            nameEn: 'Clavicular Head',
            nameAr: 'الرأس الترقوي للصدرية الكبيرة',
            posX: 38,
            posY: 25,
            shortDescriptionEn: 'Arises from medial half of clavicle; flexes extended arm.',
            shortDescriptionAr: 'ينشأ من النصف الإنسي للترقوة؛ يعطف الذراع الممدودة.',
            originEn: 'Medial half of anterior border of clavicle.',
            originAr: 'النصف الإنسي للترقوة.'
          },
          {
            id: 'pec-sternocostal',
            pinNumber: 2,
            nameEn: 'Sternocostal Head',
            nameAr: 'الرأس القصي الضلعي',
            posX: 44,
            posY: 52,
            shortDescriptionEn: 'Broad origin from sternum and costal cartilages of ribs 1-6.',
            shortDescriptionAr: 'منشأ عريض من عظم القص والغضاريف الضلعية 1-6.',
            originEn: 'Sternum, upper six costal cartilages, and aponeurosis of external oblique.',
            originAr: 'عظم القص، الغضاريف الضلعية الستة الأولى، وصفاق المنحرفة الخارجية.'
          },
          {
            id: 'pec-insertion',
            pinNumber: 3,
            nameEn: 'Insertion into Humerus (Bicipital Crest)',
            nameAr: 'الارتكاز على عظم العضد (عرف الأحدوبة الكبيرة)',
            posX: 80,
            posY: 42,
            shortDescriptionEn: 'Flat bilaminar tendon inserts into lateral lip of intertubercular sulcus.',
            shortDescriptionAr: 'وتر مسطح يرتكز على الشفة الوحشية للثلم بين حديبتي العضد.',
            insertionEn: 'Lateral lip of bicipital groove of humerus.',
            insertionAr: 'الشفة الوحشية للميزاب بين الحديبتين بعظم العضد.',
            innervationEn: 'Medial and lateral pectoral nerves (C5, C6, C7, C8, T1).',
            innervationAr: 'العصبان الصدريان الإنسي والوحشي.',
            actionEn: 'Adducts and medially rotates the humerus; draws scapula anteriorly.',
            actionAr: 'تقريب وتدوير عظم العضد نحو الإنسي وسحب الكتف للأمام.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. MUSCLES — BACK: TRAPEZIUS & LATISSIMUS DORSI
  // =========================================================================
  {
    id: 'muscle_trapezius_back',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'back',
    regionLabelEn: 'Back',
    regionLabelAr: 'الظهر',
    titleEn: 'Trapezius & Latissimus Dorsi',
    titleAr: 'عضلات الظهر السطحية (شبه المنحرفة والعريضة الظهرية)',
    shortOverviewEn: 'Superficial musculature connecting the upper limb to the vertebral column.',
    shortOverviewAr: 'العضلات السطحية التي تربط الطرف العلوي بالعمود الفقري.',
    defaultViewId: 'posterior_back',
    youtubeVideoId: 'kP6fKqYh01I',
    videoTitleEn: 'Superficial Back Muscles Anatomy',
    videoTitleAr: 'تشريح عضلات الظهر السطحية',
    views: [
      {
        id: 'posterior_back',
        labelEn: 'Superficial Posterior Dissection',
        labelAr: 'تشريح الظهر السطحي',
        imageUrl: '/images/anatomy/trapezius_latissimus_back.png',
        imageSource: "Gray's Anatomy Plate 409 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Muscles connecting upper extremity to the vertebral column (Henry Gray, 1918)',
        descriptionEn: 'Posterior anatomical plate highlighting the kite-shaped Trapezius and broad Latissimus Dorsi.',
        descriptionAr: 'لوحة تشريحية خلفية توضح عضلة شبه المنحرفة والعريضة الظهرية وامتدادهما.',
        hotspots: [
          {
            id: 'trap-upper',
            pinNumber: 1,
            nameEn: 'Trapezius Muscle (Superior Fibers)',
            nameAr: 'العضلة شبه المنحرفة (الألياف العلوية)',
            posX: 46,
            posY: 22,
            shortDescriptionEn: 'Elevates scapula and shrugs shoulders; extends head.',
            shortDescriptionAr: 'ترفع لوح الكتف وتهز الكتفين للأعلى وتبسط الرأس.',
            originEn: 'External occipital protuberance and nuchal ligament.',
            originAr: 'الناشزة القذالية الخارجية والرباط القفوي.',
            innervationEn: 'Spinal accessory nerve (Cranial Nerve XI) + C3/C4 sensory.',
            innervationAr: 'العصب القحفي الحادي عشر (العصب الشوكي الإضافي XI).'
          },
          {
            id: 'trap-middle',
            pinNumber: 2,
            nameEn: 'Trapezius (Middle / Transverse Fibers)',
            nameAr: 'شبه المنحرفة (الألياف المتوسطة)',
            posX: 38,
            posY: 38,
            shortDescriptionEn: 'Retracts (adducts) the scapula toward midline.',
            shortDescriptionAr: 'تقرب لوح الكتف نحو خط منتصف العمود الفقري.',
            insertionEn: 'Acromion and superior lip of spine of scapula.',
            originEn: 'Spinous processes of C7-T4.',
            actionEn: 'Scapular retraction and stabilization of shoulder girdle.',
            actionAr: 'تقريب لوح الكتف وتثبيت الحزام الصدري.'
          },
          {
            id: 'latissimus-dorsi',
            pinNumber: 3,
            nameEn: 'Latissimus Dorsi Muscle',
            nameAr: 'العضلة العريضة الظهرية',
            posX: 42,
            posY: 68,
            shortDescriptionEn: 'Broadest muscle of the back; powers climbing and pulling motions.',
            shortDescriptionAr: 'أعرض عضلة في الظهر؛ مسؤولة عن حركات التسلق والسحب.',
            originEn: 'Spinous processes of T7-L5, thoracolumbar fascia, and iliac crest.',
            originAr: 'النواتئ الشوكية من T7 إلى L5، واللفافة القطنية، وعرف الحرقفة.',
            insertionEn: 'Floor of intertubercular groove of humerus.',
            insertionAr: 'أرضية الميزاب بين الحديبتين لعظم العضد.',
            innervationEn: 'Thoracodorsal nerve (C6, C7, C8).',
            innervationAr: 'العصب الصدري الظهري (C6, C7, C8).',
            actionEn: 'Extends, adducts, and medially rotates the humerus.',
            actionAr: 'بسط وتقريب وتدوير عظم العضد نحو الإنسي.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. MUSCLES — ABDOMEN: RECTUS ABDOMINIS & SHEATH
  // =========================================================================
  {
    id: 'muscle_rectus_abdominis',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'abdomen',
    regionLabelEn: 'Abdomen',
    regionLabelAr: 'البطن',
    titleEn: 'Rectus Abdominis & Rectus Sheath',
    titleAr: 'العضلة المستقيمة البطنية والغمد الليفي',
    shortOverviewEn: 'Long, paired vertical strap muscle of the anterior abdominal wall.',
    shortOverviewAr: 'عضلة شريطية عمودية مزدوجة تمتد على طول الجدار الأمامي للبطن.',
    defaultViewId: 'anterior_wall',
    youtubeVideoId: 'Hj-sC1v55sM',
    videoTitleEn: 'Anterior Abdominal Wall & Rectus Sheath',
    videoTitleAr: 'تشريح جدار البطن الأمامي وغمد المستقيمة',
    views: [
      {
        id: 'anterior_wall',
        labelEn: 'Anterior Abdominal Wall Dissection',
        labelAr: 'تشريح جدار البطن الأمامي',
        imageUrl: '/images/anatomy/rectus_abdominis_sheath.png',
        imageSource: "Gray's Anatomy Plate 392 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'The rectus abdominis muscle, tendinous intersections, and linea alba (Henry Gray, 1918)',
        descriptionEn: 'Detailed dissection showing the vertical rectus abdominis, tendinous intersections, and midline linea alba.',
        descriptionAr: 'تشريح مفصل يوضح العضلة المستقيمة البطنية والتقاطعات الوترية والخط الأبيض في المنتصف.',
        hotspots: [
          {
            id: 'linea-alba',
            pinNumber: 1,
            nameEn: 'Linea Alba',
            nameAr: 'الخط الأبيض (Linea Alba)',
            posX: 50,
            posY: 45,
            shortDescriptionEn: 'Fibrous midline raphe formed by intersecting aponeuroses from xiphoid to pubic symphysis.',
            shortDescriptionAr: 'شريط ليفي متين على خط المنتصف يتكون من تقاطع صفاقات عضلات البطن من الرهابة حتى الارتفاق العاني.',
            clinicalPearlEn: 'Relatively avascular plane; classic surgical entry site for exploratory laparotomy.',
            clinicalPearlAr: 'قليل الأوعية الدموية نسبياً؛ لذا يعد المدخل الجراحي الكلاسيكي لعمليات فتح البطن الاستقصائية.'
          },
          {
            id: 'rectus-belly',
            pinNumber: 2,
            nameEn: 'Rectus Abdominis Muscle Belly',
            nameAr: 'جسم العضلة المستقيمة البطنية',
            posX: 38,
            posY: 52,
            shortDescriptionEn: 'Enclosed by rectus sheath, segmentally divided by 3-4 tendinous intersections.',
            shortDescriptionAr: 'محاطة بغمد المستقيمة، ومقسمة قطعياً بواسطة 3 إلى 4 تقاطعات وترية.',
            originEn: 'Pubic crest and pubic symphysis.',
            originAr: 'عرف العانة والارتفاق العاني.',
            insertionEn: 'Xiphoid process and costal cartilages of ribs 5-7.',
            insertionAr: 'الناتئ الرهابي والغضاريف الضلعية 5-7.',
            innervationEn: 'Thoracoabdominal nerves (Anterior rami of T7-T11) and subcostal nerve (T12).',
            innervationAr: 'الأعصاب الصدرية البطنية (T7-T11) والعصب تحت الضلعي (T12).',
            actionEn: 'Flexes trunk (lumbar spine) and compresses abdominal viscera.',
            actionAr: 'عطف الجذع وضغط أحشاء البطن أثناء الزفير الإجباري والسعال.'
          },
          {
            id: 'tendinous-intersection',
            pinNumber: 3,
            nameEn: 'Tendinous Intersections (Inscriptiones Tendineae)',
            nameAr: 'التقاطعات الوترية (الخطوط المعترضة)',
            posX: 40,
            posY: 38,
            shortDescriptionEn: 'Transverse fibrous bands firmly adherent to the anterior wall of the rectus sheath.',
            shortDescriptionAr: 'حزم ليفية معترضة تلتصق بقوة بالجدار الأمامي لغمد المستقيمة وتشكل الست كتل الشهيرة.',
            clinicalPearlEn: 'Adherent anteriorly, free posteriorly, preventing muscle belly shortening from buckling the sheath.',
            clinicalPearlAr: 'تلتصق بالأمام فقط وتبقى حرة من الخلف لمنع انثناء الغمد أثناء التقلص.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. MUSCLES — LOWER LIMB: QUADRICEPS FEMORIS
  // =========================================================================
  {
    id: 'muscle_quadriceps_femoris',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb',
    regionLabelAr: 'الطرف السفلي',
    titleEn: 'Quadriceps Femoris Muscle Group',
    titleAr: 'عضلة الفخذ رباعية الرؤوس (الكوادريسيبس)',
    shortOverviewEn: 'Massive four-headed muscle group dominating the anterior compartment of the thigh.',
    shortOverviewAr: 'مجموعة عضلية ضخمة بأربعة رؤوس تحتل الحجرة الأمامية للفخذ.',
    defaultViewId: 'anterior_thigh',
    youtubeVideoId: 'QZq5Xk8zVJw',
    videoTitleEn: 'Quadriceps Femoris Anatomy & Femoral Nerve',
    videoTitleAr: 'تشريح رباعية الرؤوس الفخذية والعصب الفخذي',
    views: [
      {
        id: 'anterior_thigh',
        labelEn: 'Anterior Thigh Dissection',
        labelAr: 'تشريح الحجرة الأمامية للفخذ',
        imageUrl: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',
        imageSource: "Gray's Anatomy Plate 430 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Deep dissection of anterior thigh showing rectus femoris, vastus lateralis, and vastus medialis (Henry Gray, 1918)',
        descriptionEn: 'Deep anatomical dissection showing rectus femoris, vastus lateralis, vastus medialis, and common patellar tendon insertion.',
        descriptionAr: 'تشريح عميق يوضح المستقيمة الفخذية، والمتسعة الوحشية، والمتسعة الإنسية، ووتر الداغصة المشترك.',
        hotspots: [
          {
            id: 'rectus-femoris',
            pinNumber: 1,
            nameEn: 'Rectus Femoris Muscle',
            nameAr: 'العضلة المستقيمة الفخذية',
            posX: 48,
            posY: 35,
            shortDescriptionEn: 'Bipennate central muscle crossing both hip and knee joints.',
            shortDescriptionAr: 'عضلة ريشية مركزية تعبر مفصلي الورك والركبة معاً.',
            originEn: 'Anterior inferior iliac spine (AIIS) and superior groove of acetabulum.',
            originAr: 'الشوكة الحرقفية الأمامية السفلية (AIIS) وأعلى الحُق.',
            actionEn: 'Flexes hip joint and extends knee joint.',
            actionAr: 'تعطف مفصل الورك وتبسط مفصل الركبة.'
          },
          {
            id: 'vastus-lateralis',
            pinNumber: 2,
            nameEn: 'Vastus Lateralis Muscle',
            nameAr: 'العضلة المتسعة الوحشية',
            posX: 32,
            posY: 52,
            shortDescriptionEn: 'Largest component of quadriceps, forming the outer bulk of the thigh.',
            shortDescriptionAr: 'أكبر مكونات رباعية الرؤوس، وتشكل الكتلة الخارجية للفخذ.',
            originEn: 'Greater trochanter and lateral lip of linea aspera of femur.',
            originAr: 'المدور الكبير والشفة الوحشية للخط الخشن بعظم الفخذ.'
          },
          {
            id: 'vastus-medialis',
            pinNumber: 3,
            nameEn: 'Vastus Medialis Muscle',
            nameAr: 'العضلة المتسعة الإنسية',
            posX: 66,
            posY: 62,
            shortDescriptionEn: 'Distal teardrop bulk (VMO) crucial for patellar tracking during terminal extension.',
            shortDescriptionAr: 'الكتلة السفلية بشكل قطرة دمعية الحيوية لاستقامة الرضفة في درجات البسط الأخيرة.',
            originEn: 'Intertrochanteric line and medial lip of linea aspera.',
            originAr: 'الخط بين المدورين والشفة الإنسية للخط الخشن.'
          },
          {
            id: 'patellar-tendon',
            pinNumber: 4,
            nameEn: 'Patellar Tendon / Ligament Insertion',
            nameAr: 'وتر الرضفة والارتكاز على أحدوبة الظنبوب',
            posX: 52,
            posY: 88,
            shortDescriptionEn: 'Inserts into the tibial tuberosity, containing the patella (largest sesamoid bone).',
            shortDescriptionAr: 'يرتكز على أحدوبة الظنبوب، ويحتوي على الرضفة (أكبر عظم سمسمي في الجسم).',
            insertionEn: 'Tibial tuberosity via the patellar ligament.',
            insertionAr: 'أحدوبة عظم الظنبوب عبر الرباط الرضفي.',
            innervationEn: 'Femoral nerve (L2, L3, L4).',
            innervationAr: 'العصب الفخذي (L2, L3, L4).',
            actionEn: 'Sole powerful extensor of the leg at the knee joint.',
            actionAr: 'الباسط القوي الوحيد للساق عند مفصل الركبة.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 9. MUSCLES — LOWER LIMB: GASTROCNEMIUS & ACHILLES TENDON
  // =========================================================================
  {
    id: 'muscle_gastrocnemius_calf',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb',
    regionLabelAr: 'الطرف السفلي',
    titleEn: 'Gastrocnemius & Achilles Tendon',
    titleAr: 'عضلة بطن الساق (الساق الخلفية) ووتر أشيل',
    shortOverviewEn: 'Superficial two-headed plantarflexor of the posterior leg compartment.',
    shortOverviewAr: 'عضلة سطحية ذات رأسين مسؤولة عن القبض الأخمصي في الحجرة الخلفية للساق.',
    defaultViewId: 'posterior_calf',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Calf Muscles & Calcaneal Tendon',
    videoTitleAr: 'تشريح عضلات الساق الخلفية ووتر العرقوب',
    views: [
      {
        id: 'posterior_calf',
        labelEn: 'Posterior Leg Dissection',
        labelAr: 'تشريح الساق الخلفي',
        imageUrl: '/images/anatomy/gastrocnemius_calf_achilles.png',
        imageSource: "Gray's Anatomy Plate 438 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Superficial dissection of calf demonstrating medial and lateral heads and Achilles tendon (Henry Gray, 1918)',
        descriptionEn: 'Posterior leg view highlighting the medial and lateral heads of gastrocnemius merging into the massive calcaneal (Achilles) tendon.',
        descriptionAr: 'منظر خلفي للساق يوضح الرأسين الإنسي والوحشي لعضلة بطن الساق واندماجهما في وتر العرقوب (أشيل).',
        hotspots: [
          {
            id: 'gastroc-medial',
            pinNumber: 1,
            nameEn: 'Medial Head of Gastrocnemius',
            nameAr: 'الرأس الإنسي لعضلة بطن الساق',
            posX: 38,
            posY: 24,
            shortDescriptionEn: 'Larger and extends lower than the lateral head.',
            shortDescriptionAr: 'أكبر حجماً ويمتد لمستوى أكثر انخفاضاً من الرأس الوحشي.',
            originEn: 'Popliteal surface of femur, superior to medial condyle.',
            originAr: 'الوجه المأبضي لعظم الفخذ، فوق اللقمة الإنسية.'
          },
          {
            id: 'gastroc-lateral',
            pinNumber: 2,
            nameEn: 'Lateral Head of Gastrocnemius',
            nameAr: 'الرأس الوحشي لعضلة بطن الساق',
            posX: 64,
            posY: 28,
            shortDescriptionEn: 'Originates above the lateral condyle of the femur.',
            shortDescriptionAr: 'ينشأ فوق اللقمة الوحشية لعظم الفخذ.',
            originEn: 'Lateral aspect of lateral condyle of femur.',
            originAr: 'الوجه الوحشي للقمة الوحشية لعظم الفخذ.'
          },
          {
            id: 'achilles-tendon',
            pinNumber: 3,
            nameEn: 'Calcaneal (Achilles) Tendon',
            nameAr: 'وتر العقب (وتر أشيل / العرقوب)',
            posX: 52,
            posY: 80,
            shortDescriptionEn: 'Thickest and strongest tendon in the human body, inserting into calcaneus.',
            shortDescriptionAr: 'أسمك وأقوى وتر في جسم الإنسان، يرتكز على عظم العقب.',
            insertionEn: 'Posterior surface of calcaneus bone.',
            insertionAr: 'السطح الخلفي لعظم العقب في القدم.',
            innervationEn: 'Tibial nerve (S1, S2).',
            innervationAr: 'العصب الظنبوبي (S1, S2).',
            actionEn: 'Powerful plantarflexor of the foot at the ankle joint (crucial for walking, running, and jumping).',
            actionAr: 'أقوى قابض أخمصي للقدم عند مفصل الكاحل (أساسي للمشي والجري والقفز).'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 10. MUSCLES — FACE & NECK: STERNOCLEIDOMASTOID (SCM)
  // =========================================================================
  {
    id: 'muscle_sternocleidomastoid',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'face_neck',
    regionLabelEn: 'Face & Neck',
    regionLabelAr: 'الوجه والعنق',
    titleEn: 'Sternocleidomastoid Muscle (SCM)',
    titleAr: 'العضلة القصية الترقوية الخشائية (SCM)',
    shortOverviewEn: 'Key muscular landmark dividing the neck into anterior and posterior cervical triangles.',
    shortOverviewAr: 'العلامة العضلية الفارقة التي تقسم العنق إلى مثلثين أمامي وخلفي.',
    defaultViewId: 'lateral_neck',
    youtubeVideoId: 'B7g2U5w1u9o',
    videoTitleEn: 'SCM Muscle Anatomy & Cervical Triangles',
    videoTitleAr: 'تشريح العضلة القصية الترقوية الخشائية ومثلثات العنق',
    views: [
      {
        id: 'lateral_neck',
        labelEn: 'Lateral Cervical Dissection',
        labelAr: 'تشريح العنق الجانبي',
        imageUrl: '/images/anatomy/sternocleidomastoid_neck.png',
        imageSource: "Gray's Anatomy Plate 385 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Muscles of the neck displaying sternal and clavicular heads of SCM (Henry Gray, 1918)',
        descriptionEn: 'Lateral dissection of the neck showing sternal and clavicular origins and mastoid process insertion.',
        descriptionAr: 'تشريح جانبي للعنق يوضح المنشأين القصي والترقوي والارتكاز على الناتئ الخشائي.',
        hotspots: [
          {
            id: 'scm-mastoid',
            pinNumber: 1,
            nameEn: 'Mastoid Process Insertion',
            nameAr: 'الارتكاز على الناتئ الخشائي',
            posX: 42,
            posY: 22,
            shortDescriptionEn: 'Inserts into the mastoid process of the temporal bone behind the ear.',
            shortDescriptionAr: 'ترتكز على الناتئ الخشائي للعظم الصدغي خلف الأذن مباشرة.',
            insertionEn: 'Lateral surface of mastoid process of temporal bone and superior nuchal line.',
            insertionAr: 'السطح الوحشي للناتئ الخشائي والخط القفوي العلوي.'
          },
          {
            id: 'scm-belly',
            pinNumber: 2,
            nameEn: 'SCM Muscle Belly',
            nameAr: 'جسم العضلة القصية الترقوية الخشائية',
            posX: 48,
            posY: 50,
            shortDescriptionEn: 'Oblique muscular band crossing the side of the neck.',
            shortDescriptionAr: 'شريط عضلي مائل يعبر جانب العنق ويحمي الشريان السباتي.',
            innervationEn: 'Spinal accessory nerve (Cranial Nerve XI) for motor; C2/C3 for pain & proprioception.',
            innervationAr: 'العصب القحفي الحادي عشر (XI) للحركة؛ والأعصاب الرقبية C2/C3 للإحساس.',
            actionEn: 'Unilateral: Rotates head to opposite side and tilts head upward. Bilateral: Flexes neck.',
            actionAr: 'تقلص جهة واحدة: تدوير الرأس للجهة المعاكسة؛ تقلص الجهتين: عطف الرقبة للأمام.'
          },
          {
            id: 'scm-origins',
            pinNumber: 3,
            nameEn: 'Sternal & Clavicular Heads',
            nameAr: 'الرأسان القصي والترقوي',
            posX: 58,
            posY: 82,
            shortDescriptionEn: 'Sternal head arises from manubrium; clavicular head from medial clavicle.',
            shortDescriptionAr: 'الرأس القصي ينشأ من قبضة القص؛ والرأس الترقوي من إنسي الترقوة.',
            originEn: 'Sternal head: Anterior manubrium sterni; Clavicular head: Superior medial third of clavicle.',
            originAr: 'الرأس القصي: قبضة القص؛ الرأس الترقوي: الثلث الإنسي للترقوة.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 11. MUSCLES — EYE: EXTRAOCULAR EYE MUSCLES & ORBIT
  // =========================================================================
  {
    id: 'muscle_extraocular_eye',
    system: 'muscles',
    systemLabelEn: 'Muscular System',
    systemLabelAr: 'الجهاز العضلي',
    region: 'eye',
    regionLabelEn: 'Eye Muscles',
    regionLabelAr: 'عضلات العين',
    titleEn: 'Extraocular Eye Muscles & Orbit',
    titleAr: 'عضلات العين الخارجية وجوف الحجاج',
    shortOverviewEn: 'Six extrinsic muscles controlling precise voluntary movements of the eyeball.',
    shortOverviewAr: 'ست عضلات خارجية تتحكم بالحركات الإرادية الدقيقة لمقلة العين.',
    defaultViewId: 'orbital_lateral',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Extraocular Muscles Innervation & LR6-SO4-R3',
    videoTitleAr: 'تشريح وتعصيب عضلات العين الخارجية',
    views: [
      {
        id: 'orbital_lateral',
        labelEn: 'Orbital Cavity Dissection',
        labelAr: 'تشريح جوف الحجاج والعضلات العينية',
        imageUrl: '/images/anatomy/extraocular_eye_muscles_orbit.png',
        imageSource: "Gray's Anatomy Plate 885 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Dissection of right orbit showing recti and oblique muscles arising from annulus of Zinn (Henry Gray, 1918)',
        descriptionEn: 'Lateral view of the right orbit showing Superior, Inferior, Medial, Lateral Recti, and Oblique muscles.',
        descriptionAr: 'منظر جانبي لحجاج العين الأيمن يوضح العضلات المستقيمة الأربعة والعضلتين المائلتين وحلقة زن المشتركة.',
        hotspots: [
          {
            id: 'rectus-superior',
            pinNumber: 1,
            nameEn: 'Superior Rectus Muscle',
            nameAr: 'العضلة المستقيمة العلوية',
            posX: 48,
            posY: 24,
            shortDescriptionEn: 'Elevates eyeball, adducts and medially rotates.',
            shortDescriptionAr: 'ترفع مقلة العين للأعلى وتقربها للإنسي.',
            innervationEn: 'Oculomotor nerve (CN III).',
            innervationAr: 'العصب المحرك للعين (العصب القحفي الثالث CN III).'
          },
          {
            id: 'rectus-lateral',
            pinNumber: 2,
            nameEn: 'Lateral Rectus Muscle',
            nameAr: 'العضلة المستقيمة الوحشية',
            posX: 38,
            posY: 52,
            shortDescriptionEn: 'Abducts eyeball laterally (turns gaze outward).',
            shortDescriptionAr: 'تبعد مقلة العين نحو الوحشي (توجه النظر للخارج).',
            innervationEn: 'Abducens nerve (CN VI) — (Rule: LR6).',
            innervationAr: 'العصب المبعد (العصب القحفي السادس CN VI).'
          },
          {
            id: 'rectus-inferior',
            pinNumber: 3,
            nameEn: 'Inferior Rectus Muscle',
            nameAr: 'العضلة المستقيمة السفلية',
            posX: 52,
            posY: 78,
            shortDescriptionEn: 'Depresses eyeball downward.',
            shortDescriptionAr: 'تخفض مقلة العين للأسفل.',
            innervationEn: 'Oculomotor nerve (CN III).',
            innervationAr: 'العصب المحرك للعين (CN III).'
          },
          {
            id: 'annulus-zinn',
            pinNumber: 4,
            nameEn: 'Common Tendinous Ring (Annulus of Zinn)',
            nameAr: 'الحلقة الوترية المشتركة (حلقة زن)',
            posX: 82,
            posY: 56,
            shortDescriptionEn: 'Fibrous ring encircling the optic canal and central superior orbital fissure.',
            shortDescriptionAr: 'حلقة ليفية تحيط بالقناة البصرية والشق الحجاجي العلوي، وتنشأ منها العضلات المستقيمة الأربع.',
            clinicalPearlEn: 'Optic nerve (CN II), Ophthalmic artery, CN III, CN VI, and Nasociliary nerve pass inside it.',
            clinicalPearlAr: 'يمر من خلالها العصب البصري والشريان العيني والأعصاب القحفية III و VI.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 12. CARDIOVASCULAR SYSTEM: HEART GROSS ANATOMY
  // =========================================================================
  {
    id: 'cardio_heart',
    system: 'cardiovascular',
    systemLabelEn: 'Cardiovascular System',
    systemLabelAr: 'الجهاز القلبي الوعائي',
    titleEn: 'Heart Gross Anatomy & Great Vessels',
    titleAr: 'التشريح العياني للقلب والأوعية الدموية الكبرى',
    shortOverviewEn: 'Muscular four-chambered double pump propelling blood through the pulmonary and systemic circulations.',
    shortOverviewAr: 'مضخة عضلية مزدوجة بأربع حجرات تدفع الدم عبر الدورتين الرئوية والجهازية.',
    defaultViewId: 'anterior_sternocostal',
    youtubeVideoId: '3_PYnWVoUzM',
    videoTitleEn: 'Heart Anterior Surface & Great Vessels',
    videoTitleAr: 'تشريح الوجه الأمامي للقلب والأوعية الكبرى',
    views: [
      {
        id: 'anterior_sternocostal',
        labelEn: 'Anterior (Sternocostal) Surface',
        labelAr: 'الوجه الأمامي (القصي الضلعي)',
        imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
        imageSource: "Gray's Anatomy Plate 490 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Anterior view of the human heart and pericardial great vessels (Henry Gray, 1918)',
        descriptionEn: 'Anterior anatomical plate highlighting aorta, pulmonary trunk, right atrium, right ventricle, left ventricle, and anterior interventricular sulcus.',
        descriptionAr: 'لوحة تشريحية أمامية توضح الأبهر، الجذع الرئوي، الأذين الأيمن، البطين الأيمن، البطين الأيسر، والثلم بين البطينين.',
        hotspots: [
          {
            id: 'heart-aorta',
            pinNumber: 1,
            nameEn: 'Ascending Aorta & Arch',
            nameAr: 'الأبهر الصاعد وقوس الأبهر',
            posX: 48,
            posY: 12,
            shortDescriptionEn: 'Main arterial trunk conveying oxygenated blood from left ventricle to systemic tree.',
            shortDescriptionAr: 'الجذع الشرياني الرئيسي الذي ينقل الدم المؤكسج من البطين الأيسر إلى كامل أنحاء الجسم.'
          },
          {
            id: 'heart-pulm-trunk',
            pinNumber: 2,
            nameEn: 'Pulmonary Trunk',
            nameAr: 'الجذع الرئوي',
            posX: 58,
            posY: 26,
            shortDescriptionEn: 'Carries deoxygenated blood from right ventricle to lungs; bifurcates into right and left pulmonary arteries.',
            shortDescriptionAr: 'يحمل الدم غير المؤكسج من البطين الأيمن إلى الرئتين ويتفرع إلى شريانين رئويين أيمن وأيسر.'
          },
          {
            id: 'heart-r-atrium',
            pinNumber: 3,
            nameEn: 'Right Atrium & Auricle',
            nameAr: 'الأذين الأيمن والأذينة',
            posX: 32,
            posY: 42,
            shortDescriptionEn: 'Receives systemic venous return from superior and inferior venae cavae and coronary sinus.',
            shortDescriptionAr: 'يستقبل العود الوريدي من الوريدين الأجوفين العلوي والسفلي والجيب الإكليلي.'
          },
          {
            id: 'heart-r-ventricle',
            pinNumber: 4,
            nameEn: 'Right Ventricle',
            nameAr: 'البطين الأيمن',
            posX: 48,
            posY: 58,
            shortDescriptionEn: 'Forms the largest portion of the anterior sternocostal surface; pumps blood into low-pressure pulmonary circuit.',
            shortDescriptionAr: 'يشكل الجزء الأكبر من الوجه الأمامي القصي الضلعي؛ يضخ الدم نحو الدورة الرئوية منخفضة الضغط.'
          },
          {
            id: 'heart-l-ventricle',
            pinNumber: 5,
            nameEn: 'Left Ventricle & Apex',
            nameAr: 'البطين الأيسر وقمة القلب',
            posX: 68,
            posY: 68,
            shortDescriptionEn: 'Thick muscular wall (3x thicker than right); forms the apex pointing to the 5th left intercostal space.',
            shortDescriptionAr: 'جدار عضلي سميك (3 أضعاف سماكة الأيمن) يشكل قمة القلب الواقعة في الورب الخامس الأيسر على خط منتصف الترقوة.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 13. JOINTS: KNEE JOINT INTERIOR & LIGAMENTS
  // =========================================================================
  {
    id: 'joints_knee',
    system: 'joints',
    systemLabelEn: 'Articular System',
    systemLabelAr: 'جهاز المفاصل',
    titleEn: 'Knee Joint Synovial Capsule & Cruciate Ligaments',
    titleAr: 'مفصل الركبة والمحفظة الزليلية والأربطة المتصالبة',
    shortOverviewEn: 'Largest and most complex synovial hinge joint of the human body.',
    shortOverviewAr: 'أكبر وأعقد مفصل زليلي بكري في جسم الإنسان.',
    defaultViewId: 'interior_ligaments',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Knee Joint Interior Dissection & Ligaments',
    videoTitleAr: 'تشريح أربطة الركبة المتصالبة والهلالات المفصلية',
    views: [
      {
        id: 'interior_ligaments',
        labelEn: 'Interior Flexed Knee Dissection',
        labelAr: 'تشريح الركبة المنثنية من الداخل',
        imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',
        imageSource: "Gray's Anatomy Plate 348 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Right knee joint interior, cruciate ligaments, and menisci (Henry Gray, 1918)',
        descriptionEn: 'Interior view of the flexed knee joint displaying ACL, PCL, and medial and lateral menisci.',
        descriptionAr: 'تشريح داخلي للركبة المنثنية يوضح الرباطين المتصالبين الأمامي والخلفي والغضروفين الهلاليين الإنسي والوحشي.',
        hotspots: [
          {
            id: 'knee-acl',
            pinNumber: 1,
            nameEn: 'Anterior Cruciate Ligament (ACL)',
            nameAr: 'الرباط المتصالب الأمامي (ACL)',
            posX: 44,
            posY: 42,
            shortDescriptionEn: 'Taut in extension; prevents anterior displacement of the tibia relative to the femur.',
            shortDescriptionAr: 'ينشد أثناء بسط الركبة؛ يمنع انزلاق الظنبوب للأمام بالنسبة للفخذ.',
            clinicalPearlEn: 'Lachman test & Anterior Drawer test assess its clinical integrity after sports injuries.',
            clinicalPearlAr: 'اختبار لاخمان واختبار الجرار الأمامي هما الفحص السريري المعياري لتقييم تمزقه.'
          },
          {
            id: 'knee-pcl',
            pinNumber: 2,
            nameEn: 'Posterior Cruciate Ligament (PCL)',
            nameAr: 'الرباط المتصالب الخلفي (PCL)',
            posX: 56,
            posY: 38,
            shortDescriptionEn: 'Stronger than ACL; prevents posterior displacement of tibia relative to femur.',
            shortDescriptionAr: 'أقوى من الرباط الأمامي؛ يمنع انزلاق الظنبوب للخلف أثناء انثناء الركبة.',
            clinicalPearlEn: 'Main stabilizer when walking downstairs or descending a steep incline.',
            clinicalPearlAr: 'المثبت الرئيسي للركبة أثناء نزول السلالم والمنحدرات.'
          },
          {
            id: 'knee-med-meniscus',
            pinNumber: 3,
            nameEn: 'Medial Meniscus',
            nameAr: 'الغضروف الهلالي الإنسي',
            posX: 28,
            posY: 62,
            shortDescriptionEn: 'C-shaped fibrocartilage firmly attached to tibial collateral ligament (MCL).',
            shortDescriptionAr: 'غضروف ليفي على شكل حرف C ملتصق بقوة بالرباط الجانبي الإنسي (MCL).',
            clinicalPearlEn: 'Less mobile and injured 20 times more often than lateral meniscus (part of unhappy triad).',
            clinicalPearlAr: 'أقل حركة وأكثر عرضة للتمزق بعشرين ضعفاً مقارنة بالهلالي الوحشي.'
          },
          {
            id: 'knee-lat-meniscus',
            pinNumber: 4,
            nameEn: 'Lateral Meniscus',
            nameAr: 'الغضروف الهلالي الوحشي',
            posX: 72,
            posY: 62,
            shortDescriptionEn: 'Nearly circular fibrocartilage, more mobile, not attached to fibular collateral ligament.',
            shortDescriptionAr: 'غضروف ليفي دائري تقريباً، أكثر مرونة وحركة، غير ملتصق بالرباط الجانبي الشظوي.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 14. SKELETAL SYSTEM: CRANIAL OSTEOLOGY
  // =========================================================================
  {
    id: 'skeletal_skull',
    system: 'skeletal',
    systemLabelEn: 'Skeletal System',
    systemLabelAr: 'الجهاز الهيكلي',
    titleEn: 'Skull Anterior & Facial Osteology',
    titleAr: 'عظام الجمجمة والوجه (المظهر الأمامي)',
    shortOverviewEn: 'Bony framework supporting the brain, facial structures, and sensory orbits.',
    shortOverviewAr: 'الهيكل العظمي الذي يحمي الدماغ ويدعم تضاريس الوجه والمحاجر الحسية.',
    defaultViewId: 'anterior_skull',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Skull Osteology & Cranial Bones',
    videoTitleAr: 'تشريح عظام الجمجمة والوجه والمفاصل الدرزية',
    views: [
      {
        id: 'anterior_skull',
        labelEn: 'Anterior (Norma Frontalis)',
        labelAr: 'المظهر الأمامي (الوجهي)',
        imageUrl: '/images/anatomy/skull_anterior_osteology.png',
        imageSource: "Gray's Anatomy Plate 188 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Norma frontalis displaying frontal bone, orbits, maxillae, and mandible (Henry Gray, 1918)',
        descriptionEn: 'Anterior cranial osteology displaying frontal bone, orbits, zygomatic arches, maxilla, and mandible.',
        descriptionAr: 'دراسة عظمية أمامية للجمجمة توضح العظم الجبهي، المحجرين، الوجنتين، الفك العلوي، والفك السفلي.',
        hotspots: [
          {
            id: 'skull-frontal',
            pinNumber: 1,
            nameEn: 'Frontal Bone',
            nameAr: 'العظم الجبهي',
            posX: 50,
            posY: 18,
            shortDescriptionEn: 'Forms the forehead and superior rim of both orbits.',
            shortDescriptionAr: 'يشكل الجبهة والحافة العلوية لكلا المحجرين ويحتوي على الجيبين الجبهيين.'
          },
          {
            id: 'skull-orbit',
            pinNumber: 2,
            nameEn: 'Orbital Cavity',
            nameAr: 'جوف المحجر (الحجاج)',
            posX: 34,
            posY: 38,
            shortDescriptionEn: 'Pyramidal cavity housing the eyeball, extraocular muscles, and optic nerve.',
            shortDescriptionAr: 'تجويف هرمي الشكل يضم مقلة العين وعضلاتها المحركة والعصب البصري.'
          },
          {
            id: 'skull-maxilla',
            pinNumber: 3,
            nameEn: 'Maxilla',
            nameAr: 'عظم الفك العلوي',
            posX: 44,
            posY: 60,
            shortDescriptionEn: 'Forms upper jaw, holds upper teeth, and contains large maxillary sinus.',
            shortDescriptionAr: 'يشكل الفك العلوي ويثبت الأسنان العلوية ويحتوي على الجيب الفكي الكبير.'
          },
          {
            id: 'skull-mandible',
            pinNumber: 4,
            nameEn: 'Mandible',
            nameAr: 'عظم الفك السفلي',
            posX: 50,
            posY: 84,
            shortDescriptionEn: 'Largest and only mobile bone of the facial skeleton.',
            shortDescriptionAr: 'أكبر عظام الوجه والعظم الوحيد المتحرك فيه؛ يتمفصل عند المفصل الفكي الصدغي (TMJ).'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 15. SKELETAL SYSTEM: FEMUR OSTEOLOGY
  // =========================================================================
  {
    id: 'skeletal_femur',
    system: 'skeletal',
    systemLabelEn: 'Skeletal System',
    systemLabelAr: 'الجهاز الهيكلي',
    titleEn: 'Femur Osteology & Articular Landmarks',
    titleAr: 'تشريح عظم الفخذ والمعالم المفصلية',
    shortOverviewEn: 'Longest, heaviest, and strongest bone in the human body.',
    shortOverviewAr: 'أطول وأثقل وأقوى عظم في جسم الإنسان.',
    defaultViewId: 'anterior_femur',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Femur Osteology & Hip Joint Anatomy',
    videoTitleAr: 'تشريح عظم الفخذ ومفصل الورك',
    views: [
      {
        id: 'anterior_femur',
        labelEn: 'Anterior Aspect',
        labelAr: 'الوجه الأمامي',
        imageUrl: '/images/anatomy/femur_anterior_osteology.png',
        imageSource: "Gray's Anatomy Plate 244 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Right femur anterior aspect displaying head, neck, trochanters, and condyles (Henry Gray, 1918)',
        descriptionEn: 'Anterior osteology of the femur showing spherical head, neck, greater and lesser trochanters, and distal condyles.',
        descriptionAr: 'معالم عظم الفخذ الأمامية توضح الرأس الكروي، العنق، المدورين الكبير والصغير، واللقمتين البعيدتين.',
        hotspots: [
          {
            id: 'femur-head',
            pinNumber: 1,
            nameEn: 'Head of Femur (Caput Femoris)',
            nameAr: 'رأس عظم الفخذ',
            posX: 38,
            posY: 10,
            shortDescriptionEn: 'Smooth globular articular surface fitting deeply into the acetabulum.',
            shortDescriptionAr: 'سطح كروي أملس يتمفصل بعمق داخل حُق الحوض ليشكل مفصل الورك.'
          },
          {
            id: 'femur-neck',
            pinNumber: 2,
            nameEn: 'Neck of Femur (Collum Femoris)',
            nameAr: 'عنق عظم الفخذ',
            posX: 46,
            posY: 16,
            shortDescriptionEn: 'Constricted pyramidal strut connecting head to shaft at ~125° angle.',
            shortDescriptionAr: 'جزء هرمي يصل الرأس بجسم العظم بزاوية ميلان تبلغ حوالي 125 درجة.',
            clinicalPearlEn: 'Common fracture site in osteoporotic elderly, risking avascular necrosis of the femoral head.',
            clinicalPearlAr: 'موقع شائع لكسور عنق الفخذ عند المسنين مما يهدد بنقص التروية الدموية وتموت رأس الفخذ.'
          },
          {
            id: 'femur-gt',
            pinNumber: 3,
            nameEn: 'Greater Trochanter',
            nameAr: 'المدور الكبير',
            posX: 66,
            posY: 20,
            shortDescriptionEn: 'Large lateral prominence providing insertion for gluteus medius and minimus.',
            shortDescriptionAr: 'بارزة عظمية وحشية ضخمة ترتكز عليها العضلتان الألويتان المتوسطة والصغرى.'
          },
          {
            id: 'femur-condyles',
            pinNumber: 4,
            nameEn: 'Medial & Lateral Condyles',
            nameAr: 'اللقمتان الإنسية والوحشية',
            posX: 52,
            posY: 88,
            shortDescriptionEn: 'Distal articular condyles articulating with the tibial plateau at the knee joint.',
            shortDescriptionAr: 'لقمتان مفصليتان تتمفصلان مع هضبة عظم الظنبوب لتشكيل مفصل الركبة.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 16. NERVOUS SYSTEM: BRAIN MIDSAGITTAL
  // =========================================================================
  {
    id: 'nervous_brain',
    system: 'nervous',
    systemLabelEn: 'Nervous System',
    systemLabelAr: 'الجهاز العصبي',
    titleEn: 'Brain Midsagittal Section & Brainstem',
    titleAr: 'المقطع السهمي الناصف للدماغ وجذع المخ',
    shortOverviewEn: 'Central nervous system master organ shown in median longitudinal section.',
    shortOverviewAr: 'العضو المركزي للجهاز العصبي موضحاً في مقطع طولي ناصف عبر الشق بين نصفي الكرة المخية.',
    defaultViewId: 'midsagittal_brain',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Brain Midsagittal Section Anatomy',
    videoTitleAr: 'تشريح الدماغ في المقطع السهمي',
    views: [
      {
        id: 'midsagittal_brain',
        labelEn: 'Midsagittal Longitudinal Section',
        labelAr: 'المقطع السهمي الطولي',
        imageUrl: '/images/anatomy/brain_midsagittal_section.png',
        imageSource: "Gray's Anatomy Plate 720 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Midsagittal view of the cerebrum, brainstem, ventricles, and cerebellum (Henry Gray, 1918)',
        descriptionEn: 'Midsagittal section revealing corpus callosum, thalamus, pons, medulla oblongata, and cerebellum.',
        descriptionAr: 'مقطع سهمي يكشف الجسم الثفني، المهاد، الجسر، البصلة السيسائية، والمخيخ.',
        hotspots: [
          {
            id: 'brain-corpus-callosum',
            pinNumber: 1,
            nameEn: 'Corpus Callosum',
            nameAr: 'الجسم الثفني',
            posX: 50,
            posY: 32,
            shortDescriptionEn: 'Massive C-shaped commissural nerve fiber tract connecting right and left cerebral hemispheres.',
            shortDescriptionAr: 'حزمة ضخمة من الألياف العصبية الصوارية تصل بين نصفي الكرة المخية الأيمن والأيسر.'
          },
          {
            id: 'brain-thalamus',
            pinNumber: 2,
            nameEn: 'Thalamus & 3rd Ventricle',
            nameAr: 'المهاد والبطين الثالث',
            posX: 52,
            posY: 46,
            shortDescriptionEn: 'Master sensory relay center funneling almost all sensory modalities to cerebral cortex.',
            shortDescriptionAr: 'محطة الترحيل الحسي الرئيسية التي تعبر من خلالها كل الإحساسات إلى القشرة المخية.'
          },
          {
            id: 'brain-pons',
            pinNumber: 3,
            nameEn: 'Pons',
            nameAr: 'الجسر (قنطرة فارول)',
            posX: 52,
            posY: 68,
            shortDescriptionEn: 'Prominent bulge of the brainstem containing transverse pontine fibers and cranial nerve nuclei (V, VI, VII, VIII).',
            shortDescriptionAr: 'بروز واضح في جذع المخ يحتوي على نوى الأعصاب القحفية الخامس والسادس والسابع والثامن.'
          },
          {
            id: 'brain-cerebellum',
            pinNumber: 4,
            nameEn: 'Cerebellum (Arbor Vitae)',
            nameAr: 'المخيخ وشجرة الحياة (Arbor Vitae)',
            posX: 76,
            posY: 68,
            shortDescriptionEn: 'Coordinates motor movement, maintains balance, posture, and motor learning.',
            shortDescriptionAr: 'ينسق الحركات الإرادية ويحافظ على توازن الجسم والوضعية والتناسق الحركي.'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 17. URINARY SYSTEM: KIDNEY CORONAL SECTION
  // =========================================================================
  {
    id: 'urinary_kidney',
    system: 'urinary',
    systemLabelEn: 'Urinary System',
    systemLabelAr: 'الجهاز البولي',
    titleEn: 'Kidney Coronal Section & Renal Hilum',
    titleAr: 'مقطع الكلية وسرة الكلية والأهرامات الكلوية',
    shortOverviewEn: 'Bean-shaped retroperitoneal organ responsible for filtration, urine formation, and homeostasis.',
    shortOverviewAr: 'عضو خلف بريتواني على شكل حبة فاصولياء مسؤول عن ترشيح الدم وتكوين البول وضبط التوازن الداخلي.',
    defaultViewId: 'coronal_kidney',
    youtubeVideoId: 'U_5kPq31fRk',
    videoTitleEn: 'Kidney Internal Gross Anatomy & Pyramids',
    videoTitleAr: 'تشريح الكلية الداخلي والأهرامات الكلوية وحويضة الكلية',
    views: [
      {
        id: 'coronal_kidney',
        labelEn: 'Coronal Section',
        labelAr: 'المقطع الإكليلي',
        imageUrl: '/images/anatomy/kidney_coronal_section.png',
        imageSource: "Gray's Anatomy Plate 1120 / Wikimedia Commons",
        imageLicense: 'Public Domain',
        imageCredit: 'Coronal section of the kidney displaying cortex, pyramids, calyces, and renal pelvis (Henry Gray, 1918)',
        descriptionEn: 'Coronal section highlighting outer renal cortex, medullary pyramids, minor and major calyces, and renal pelvis.',
        descriptionAr: 'مقطع إكليلي يوضح القشرة الكلوية، الأهرامات النخاعية، الكؤوس الكلوية الصغرى والكبرى، وحويضة الكلية.',
        hotspots: [
          {
            id: 'kidney-cortex',
            pinNumber: 1,
            nameEn: 'Renal Cortex',
            nameAr: 'القشرة الكلوية',
            posX: 22,
            posY: 38,
            shortDescriptionEn: 'Outer granular zone containing glomeruli, convoluted tubules, and cortical columns.',
            shortDescriptionAr: 'المنطقة الحبيبية الخارجية التي تحتوي على الكبيبات الكلوية والأنابيب الملتفة.'
          },
          {
            id: 'kidney-pyramid',
            pinNumber: 2,
            nameEn: 'Renal Medullary Pyramid',
            nameAr: 'الهرم الكلوي (النخاعي)',
            posX: 44,
            posY: 46,
            shortDescriptionEn: 'Cone-shaped tissue mass containing Henle loops and collecting ducts terminating at the papilla.',
            shortDescriptionAr: 'كتلة مخروطية الشكل تحتوي على عرى هانلي والأنابيب الجامعة التي تصب في الحليمة الكلوية.'
          },
          {
            id: 'kidney-pelvis',
            pinNumber: 3,
            nameEn: 'Renal Pelvis & Hilum',
            nameAr: 'حويضة الكلية وسرة الكلية',
            posX: 68,
            posY: 52,
            shortDescriptionEn: 'Funnel-shaped basin collecting urine from major calyces and leading into the ureter.',
            shortDescriptionAr: 'حوض قمعي يجمع البول من الكؤوس الكبيرة ويقود مباشرة إلى الحالب متجهاً للمثانة.'
          }
        ]
      }
    ]
  }
];
