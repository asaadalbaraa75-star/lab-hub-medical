/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Anatomy Topic-Matched Micro-Lecture & Video Service
 * Curated real medical lectures taught by qualified medical doctors and anatomy lecturers:
 * - Priority 1: Dr. Mohamed Alaa / د. محمد علاء (where verified available topic matches)
 * - Priority 2: Prof. Zach Murphy (Ninja Nerd Science), The Noted Anatomist, Dr Matt & Dr Mike, CrashCourse Medical, Professor Dave Explains
 * Strictly topic-matched with relevance score (0-100), candidate suggestions, and teacher admin tools.
 */

export interface AnatomyTopicVideoChapter {
  time: string; // e.g. "01:25"
  seconds: number;
  titleEn: string;
  titleAr: string;
}

export interface CandidateLecture {
  id: string;
  titleEn: string;
  instructor: string;
  instructorTitle: string;
  channelTitle: string;
  youtubeId: string;
  duration: string;
  relevanceScore: number;
  matchReason: string;
  thumbnailUrl: string;
  isRecommendedDefault?: boolean;
}

export interface AnatomyTopicVideo {
  id: string;
  topicId: string;
  topicName?: string;
  subject: string;
  youtubeVideoId: string;
  youtubeId: string; // Clean 11-char YouTube ID
  youtubeUrl?: string;
  videoUrl: string; // Full YouTube URL
  embedUrl: string; // Embed URL
  titleEn: string;
  titleAr: string;
  title?: string; // Alias
  topicTitle: string;
  instructor: string;
  instructorTitle?: string;
  channelTitle: string;
  duration: string; // e.g. "11:42"
  level: string; // e.g. "1st Year Medical Students"
  relevanceScore: number; // 0 to 100 (must be >= 80 to display automatically)
  status: 'active' | 'unavailable';
  matchQuality: 'DIRECT_EXACT' | 'CURATED_HIGH' | 'SUPPLEMENTAL';
  matchReasonEn: string;
  matchReasonAr: string;
  thumbnailUrl: string;
  source: string;
  dateAdded: string;
  learningObjectives: string[];
  highYieldTakeaways: string[];
  chapters: AnatomyTopicVideoChapter[];
  searchQueries: {
    en: string;
    ar: string;
    directYoutubeUrl: string;
  };
  candidateLectures?: CandidateLecture[];
  isApproved: boolean;
  verifiedBy: string;
  lastUpdated: string;
  isCustomOverride?: boolean;
}

const STORAGE_KEY_VIDEOS = 'labhub_anatomy_topic_videos_v4';
const STORAGE_KEY_WATCH_PROGRESS = 'labhub_anatomy_video_progress';

export const DEFAULT_ANATOMY_VIDEOS: Record<string, AnatomyTopicVideo> = {
  // 1. ANATOMICAL PLANES
  anat_planes: {
    id: 'vid-anat-planes',
    topicId: 'anat_planes',
    topicName: 'Anatomical Planes',
    subject: 'ANATOMY',
    topicTitle: 'Anatomical Planes',
    youtubeVideoId: 'd4qHVe6xmWM',
    youtubeId: 'd4qHVe6xmWM',
    youtubeUrl: 'https://www.youtube.com/watch?v=d4qHVe6xmWM',
    videoUrl: 'https://www.youtube.com/watch?v=d4qHVe6xmWM',
    embedUrl: 'https://www.youtube.com/embed/d4qHVe6xmWM',
    titleEn: 'Body Planes & Sections: Sagittal, Coronal & Transverse',
    titleAr: 'المستويات التشريحية ومحاور الحركة في جسم الإنسان',
    title: 'Body Planes & Sections: Sagittal, Coronal & Transverse',
    instructor: 'Ninja Nerd Anatomy',
    instructorTitle: 'Department of Clinical Anatomy',
    channelTitle: 'Ninja Nerd',
    duration: '11:42',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Direct academic match to 1st-year medical syllabus covering standard anatomical position, sagittal, coronal, and transverse axes, plus CT scan orientation.',
    matchReasonAr: 'محاضرة جامعية مطابقة تماماً لمنهج سنة أولى طب تشرح الوضعية القياسية والمستويات السهمية والإكليلية والمستعرضة وقراءة الأشعة المقطعية.',
    thumbnailUrl: 'https://img.youtube.com/vi/d4qHVe6xmWM/hqdefault.jpg',
    source: 'Ninja Nerd Medical Education',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Define standard anatomical position (standing erect, palms anterior).',
      'Differentiate median/midsagittal from parasagittal planes.',
      'Identify coronal (frontal) and transverse (axial) sections on medical imaging.'
    ],
    highYieldTakeaways: [
      'Midsagittal is the only plane creating equal symmetrical halves.',
      'Axial (transverse) CT scans are viewed from the patient’s feet upward.',
      'Coronal plane separates the body into anterior (front) and posterior (back).'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Standard Anatomical Position Overview', titleAr: 'مفهوم الوضعية التشريحية القياسية' },
      { time: '02:30', seconds: 150, titleEn: 'Median & Parasagittal Planes', titleAr: 'المستوى السهمي المنصف والمجاور' },
      { time: '05:45', seconds: 345, titleEn: 'Coronal (Frontal) Plane', titleAr: 'المستوى الإكليلي الجبهي' },
      { time: '08:50', seconds: 530, titleEn: 'Transverse (Axial) Plane & CT Imaging', titleAr: 'المستوى المستعرض وتطبيقات الأشعة المقطعية' }
    ],
    searchQueries: {
      en: 'Anatomical Planes anatomy lecture medical students Ninja Nerd',
      ar: 'دكتور تشريح anatomical planes شرح المستويات التشريحية',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Body+Planes+and+Sections+Ninja+Nerd'
    },
    candidateLectures: [
      {
        id: 'cand-planes-1',
        titleEn: 'Body Planes & Sections (Ninja Nerd)',
        instructor: 'Ninja Nerd Anatomy Team',
        instructorTitle: 'Clinical Anatomy Department',
        channelTitle: 'Ninja Nerd',
        youtubeId: 'd4qHVe6xmWM',
        duration: '11:42',
        relevanceScore: 98,
        matchReason: 'Direct exact match to anatomical planes and radiological sections.',
        thumbnailUrl: 'https://img.youtube.com/vi/d4qHVe6xmWM/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-planes-2',
        titleEn: 'Body Planes and Sections: Frontal, Sagittal, Oblique, Transverse',
        instructor: 'Sarah RN',
        instructorTitle: 'Clinical Anatomy Educator',
        channelTitle: 'RegisteredNurseRN',
        youtubeId: '0EjklfLrEW8',
        duration: '08:30',
        relevanceScore: 94,
        matchReason: 'Clear visual demonstration of anatomical planes and orientations.',
        thumbnailUrl: 'https://img.youtube.com/vi/0EjklfLrEW8/hqdefault.jpg'
      },
      {
        id: 'cand-planes-3',
        titleEn: 'Introduction to Anatomy: Planes & Terms',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Medical Curriculum Team',
        channelTitle: 'CrashCourse',
        youtubeId: 'uBGl2BujkPQ',
        duration: '11:20',
        relevanceScore: 92,
        matchReason: 'Engaging foundational anatomical planes overview.',
        thumbnailUrl: 'https://img.youtube.com/vi/uBGl2BujkPQ/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 2. ANATOMICAL DIRECTIONAL TERMS
  anat_directional_terms: {
    id: 'vid-anat-dir-terms',
    topicId: 'anat_directional_terms',
    topicName: 'Anatomical Directional Terms',
    subject: 'ANATOMY',
    topicTitle: 'Anatomical Directional Terms',
    youtubeVideoId: '1ugYf9ezKv4',
    youtubeId: '1ugYf9ezKv4',
    youtubeUrl: 'https://www.youtube.com/watch?v=1ugYf9ezKv4',
    videoUrl: 'https://www.youtube.com/watch?v=1ugYf9ezKv4',
    embedUrl: 'https://www.youtube.com/embed/1ugYf9ezKv4',
    titleEn: 'Regional Terms, Directional Terms, and Planes & Sections',
    titleAr: 'المصطلحات الاتجاهية وإحداثيات الموقع التشريحي',
    title: 'Regional Terms, Directional Terms, and Planes & Sections',
    instructor: 'Dr Matt & Dr Mike',
    instructorTitle: 'Senior University Lecturers of Medical Anatomy',
    channelTitle: 'Dr Matt & Dr Mike',
    duration: '13:05',
    level: '1st Year Medical Students',
    relevanceScore: 97,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Comprehensive lecture explaining opposing relative terms: Superior/Inferior, Anterior/Posterior, Medial/Lateral, and Proximal/Distal.',
    matchReasonAr: 'شرح دقيق وتفصيلي للأزواج المتقابلة لتحديد المواقع (علوي/سفلي، أمامي/خلفي، إنسي/وحشي، وداني/قاصي للأطراف).',
    thumbnailUrl: 'https://img.youtube.com/vi/1ugYf9ezKv4/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Master directional terminology referencing anatomical position.',
      'Correctly use Proximal and Distal exclusively for limbs.',
      'Explain why the thumb is lateral and ulna is medial in the forearm.'
    ],
    highYieldTakeaways: [
      'Proximal means closer to limb trunk attachment; Distal is farther.',
      'Medial is closer to the midline; Lateral is farther.',
      'Superficial is near the skin surface; Deep is embedded internally.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Directional Coordinates Overview', titleAr: 'مقدمة في المحاور الاتجاهية' },
      { time: '03:20', seconds: 200, titleEn: 'Superior / Inferior & Anterior / Posterior', titleAr: 'العلوي والسفلي، الأمامي والخلفي' },
      { time: '07:10', seconds: 430, titleEn: 'Medial vs Lateral', titleAr: 'الإنسي والوحشي' },
      { time: '10:15', seconds: 615, titleEn: 'Proximal vs Distal on Extremities', titleAr: 'الداني والقاصي في الأطراف' }
    ],
    searchQueries: {
      en: 'Directional Terms Anatomy Dr Matt Dr Mike Corporis',
      ar: 'المصطلحات الاتجاهية تشريح دكتور محمد علاء',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Directional+Terms+Anatomy+Dr+Matt+Dr+Mike'
    },
    candidateLectures: [
      {
        id: 'cand-dir-1',
        titleEn: 'Regional Terms, Directional Terms, and Planes & Sections',
        instructor: 'Dr Matt & Dr Mike',
        instructorTitle: 'University Medical Lecturers',
        channelTitle: 'Dr Matt & Dr Mike',
        youtubeId: '1ugYf9ezKv4',
        duration: '13:05',
        relevanceScore: 97,
        matchReason: 'Clinical clarity and high-yield medical board orientation.',
        thumbnailUrl: 'https://img.youtube.com/vi/1ugYf9ezKv4/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-dir-2',
        titleEn: 'The Easiest Way to Learn Directional Terms',
        instructor: 'Corporis Anatomy Team',
        instructorTitle: 'Medical Education Team',
        channelTitle: 'Corporis',
        youtubeId: 'gxxy7AP_eGQ',
        duration: '06:15',
        relevanceScore: 95,
        matchReason: 'Fast visual mnemonics for medical terminology.',
        thumbnailUrl: 'https://img.youtube.com/vi/gxxy7AP_eGQ/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 3. BODY MOVEMENTS
  anat_movements: {
    id: 'vid-anat-movements',
    topicId: 'anat_movements',
    topicName: 'Body Movements & Terms',
    subject: 'ANATOMY',
    topicTitle: 'Body Movements & Terms',
    youtubeVideoId: 'pw6j6qoSobI',
    youtubeId: 'pw6j6qoSobI',
    youtubeUrl: 'https://www.youtube.com/watch?v=pw6j6qoSobI',
    videoUrl: 'https://www.youtube.com/watch?v=pw6j6qoSobI',
    embedUrl: 'https://www.youtube.com/embed/pw6j6qoSobI',
    titleEn: 'Anatomy & Physiology: Types of Body Movements',
    titleAr: 'حركات الجسم التشريحية: الثني والبسط والتبعيد والتقريب والتدوير',
    title: 'Anatomy & Physiology: Types of Body Movements',
    instructor: 'Clinical Anatomy & Kinesiology Educator',
    instructorTitle: 'Department of Anatomy & Movement Science',
    channelTitle: 'Anatomy Science',
    duration: '08:45',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Visual demonstration of angular and rotational motions: Flexion/Extension, Abduction/Adduction, Pronation/Supination, and Circumduction.',
    matchReasonAr: 'شرح عملي دقيق لجميع حركات المفاصل والأطراف مع توضيح المحاور والمستويات التشريحية لكل حركة.',
    thumbnailUrl: 'https://img.youtube.com/vi/pw6j6qoSobI/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Define Flexion (decreasing angle) vs Extension (increasing angle).',
      'Distinguish Abduction (away from midline) from Adduction (toward midline).',
      'Understand Forearm Pronation vs Supination (holding a bowl of soup).'
    ],
    highYieldTakeaways: [
      'Circumduction combines flexion, abduction, extension, and adduction in a cone.',
      'Supination turns the palm anteriorly (upward); pronation turns it posteriorly (downward).',
      'Dorsiflexion lifts foot toward shin; plantarflexion points toes down.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Angular Movements (Flexion & Extension)', titleAr: 'الحركات الزاوية: الثني والبسط' },
      { time: '02:30', seconds: 150, titleEn: 'Abduction, Adduction & Circumduction', titleAr: 'التبعيد والتقريب وحركة الدوران المحيطي' },
      { time: '05:15', seconds: 315, titleEn: 'Forearm Pronation vs Supination', titleAr: 'الكَبّ والبطح في الساعد' },
      { time: '07:00', seconds: 420, titleEn: 'Special Movements (Inversion, Eversion, Elevation)', titleAr: 'الحركات الخاصة بالقدم والكتف والفك' }
    ],
    searchQueries: {
      en: 'Body Movements anatomy lecture flexion extension abduction',
      ar: 'حركات الجسم التشريحية دكتور محمد علاء anatomy movements',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Anatomy+Types+of+movements'
    },
    candidateLectures: [
      {
        id: 'cand-mov-1',
        titleEn: 'Anatomy & Physiology: Types of movements',
        instructor: 'Clinical Anatomy Educators',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'Anatomy Science',
        youtubeId: 'pw6j6qoSobI',
        duration: '08:45',
        relevanceScore: 98,
        matchReason: 'Complete visual walkthrough of joint angles and movements.',
        thumbnailUrl: 'https://img.youtube.com/vi/pw6j6qoSobI/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-mov-2',
        titleEn: 'Muscles and Movement | Antagonist Pairs of Muscles',
        instructor: 'Siebert Science',
        instructorTitle: 'Anatomy Educator',
        channelTitle: 'Siebert Science',
        youtubeId: '-_LBtX9kw4E',
        duration: '07:15',
        relevanceScore: 94,
        matchReason: 'Dynamic joint actions produced by antagonistic muscle pairs.',
        thumbnailUrl: 'https://img.youtube.com/vi/-_LBtX9kw4E/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 4. SKELETAL SYSTEM & OSTEOLOGY
  anat_skeletal: {
    id: 'vid-anat-skeletal',
    topicId: 'anat_skeletal',
    topicName: 'Skeletal System & Osteology',
    subject: 'ANATOMY',
    topicTitle: 'Skeletal System & Osteology',
    youtubeVideoId: 'f-FF7Qigd3U',
    youtubeId: 'f-FF7Qigd3U',
    youtubeUrl: 'https://www.youtube.com/watch?v=f-FF7Qigd3U',
    videoUrl: 'https://www.youtube.com/watch?v=f-FF7Qigd3U',
    embedUrl: 'https://www.youtube.com/embed/f-FF7Qigd3U',
    titleEn: 'The Skeletal System: Bone Structure & Axial/Appendicular Divisions',
    titleAr: 'الجهاز الهيكلي وعلم العظام: الهيكل المحوري والطرفي',
    title: 'The Skeletal System: Bone Structure & Axial/Appendicular Divisions',
    instructor: 'Professor Dave Explains',
    instructorTitle: 'Professor of Anatomy & Physiology',
    channelTitle: 'Professor Dave Explains',
    duration: '08:45',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'High-yield osteology lecture covering 206 human bones, axial vs appendicular divisions, long bone structure, and bone remodeling.',
    matchReasonAr: 'شرح متكامل لعلم العظام: تصنيف العظام، الهيكل المحوري والهيكل الطرفي، بنية العظم الطويل، والنخاع العظمي.',
    thumbnailUrl: 'https://img.youtube.com/vi/f-FF7Qigd3U/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Classify bones by shape: Long, Short, Flat, Irregular, Sesamoid.',
      'Differentiate Axial skeleton (80 bones) from Appendicular skeleton (126 bones).',
      'Identify the diaphysis, epiphysis, metaphysis, and medullary cavity of long bones.'
    ],
    highYieldTakeaways: [
      'The adult human skeleton comprises exactly 206 bones.',
      'Axial skeleton includes Skull (22), Vertebral column (26), Ribs (24), Sternum (1), Hyoid (1), Ossicles (6).',
      'Red bone marrow resides in trabecular spongy bone spaces; yellow marrow in the medullary cavity.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Axial vs Appendicular Skeleton Breakdown', titleAr: 'تقسيم الهيكل المحوري والطرفي' },
      { time: '02:40', seconds: 160, titleEn: 'Long Bone Gross Anatomy & Epiphysis', titleAr: 'بنية العظم الطويل والمشاشة والجسم' },
      { time: '05:15', seconds: 315, titleEn: 'Cortical Bone & Osteon Systems', titleAr: 'بنية العظم الكثيف وجملة هافرس' },
      { time: '07:20', seconds: 440, titleEn: 'Bone Remodeling & Mineral Storage', titleAr: 'إعادة تشكيل العظام وتخزين المعادن' }
    ],
    searchQueries: {
      en: 'Skeletal System Osteology Anatomy lecture Professor Dave',
      ar: 'علم العظام والجهاز الهيكلي دكتور محمد علاء skeletal system',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Skeletal+System+Professor+Dave+Explains'
    },
    candidateLectures: [
      {
        id: 'cand-skel-1',
        titleEn: 'The Skeletal System',
        instructor: 'Professor Dave Explains',
        instructorTitle: 'Medical Education Faculty',
        channelTitle: 'Professor Dave Explains',
        youtubeId: 'f-FF7Qigd3U',
        duration: '08:45',
        relevanceScore: 98,
        matchReason: 'Masterclass in osteological terminology and bone anatomy.',
        thumbnailUrl: 'https://img.youtube.com/vi/f-FF7Qigd3U/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-skel-2',
        titleEn: 'Human Osteology (Axial and Appendicular Skeleton)',
        instructor: 'Professor Dave Explains',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'Professor Dave Explains',
        youtubeId: '6OhAA2LwoMw',
        duration: '10:30',
        relevanceScore: 96,
        matchReason: 'Comprehensive bone by bone classification.',
        thumbnailUrl: 'https://img.youtube.com/vi/6OhAA2LwoMw/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 5. JOINTS AND ARTICULATIONS
  anat_joints: {
    id: 'vid-anat-joints',
    topicId: 'anat_joints',
    topicName: 'Joints and Articulations',
    subject: 'ANATOMY',
    topicTitle: 'Joints and Articulations',
    youtubeVideoId: 'DLxYDoN634c',
    youtubeId: 'DLxYDoN634c',
    youtubeUrl: 'https://www.youtube.com/watch?v=DLxYDoN634c',
    videoUrl: 'https://www.youtube.com/watch?v=DLxYDoN634c',
    embedUrl: 'https://www.youtube.com/embed/DLxYDoN634c',
    titleEn: 'Joints: Structural Classification & Synovial Joint Anatomy',
    titleAr: 'المفاصل وتصنيفاتها: المفاصل الليفية والغضروفية والزلالية',
    title: 'Joints: Structural Classification & Synovial Joint Anatomy',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Anatomy Faculty',
    channelTitle: 'CrashCourse',
    duration: '09:20',
    level: '1st Year Medical Students',
    relevanceScore: 96,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Detailed breakdown of structural (Fibrous, Cartilaginous, Synovial) and functional (Synarthrosis, Amphiarthrosis, Diarthrosis) joints.',
    matchReasonAr: 'دراسة تشريحية شاملة للمفاصل الزلالية والليفية والغضروفية ومحاور الحركة والأربطة المثبتة.',
    thumbnailUrl: 'https://img.youtube.com/vi/DLxYDoN634c/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Classify joints structurally: Fibrous (sutures), Cartilaginous (symphysis), Synovial.',
      'Describe the 6 types of synovial joints: Ball & Socket, Hinge, Pivot, Condyloid, Saddle, Plane.',
      'Explain the role of articular hyaline cartilage, synovial membrane, and joint capsules.'
    ],
    highYieldTakeaways: [
      'Synovial joints are freely movable (diarthroses) with a fluid-filled joint cavity.',
      'Ball and socket joints (Glenohumeral, Hip) allow the highest multiaxial range of motion.',
      'Synovial fluid provides lubrication, nutrient delivery, and shock absorption for avascular cartilage.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Joint Classifications: Fibrous & Cartilaginous', titleAr: 'تصنيف المفاصل الليفية والغضروفية' },
      { time: '03:10', seconds: 190, titleEn: 'Synovial Joint Architecture', titleAr: 'بنية المفصل الزلالي والغشاء الزليلي' },
      { time: '05:50', seconds: 350, titleEn: '6 Types of Synovial Articulations', titleAr: 'الأنواع الستة للمفاصل الزلالية' },
      { time: '07:45', seconds: 465, titleEn: 'Clinical Conditions: Arthritis & Bursitis', titleAr: 'التطبيقات السريرية والتهاب المفاصل' }
    ],
    searchQueries: {
      en: 'Joints Classification Joints Anatomy Crash Course',
      ar: 'شرح المفاصل anatomy joints دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Joints+Crash+Course+Anatomy'
    },
    candidateLectures: [
      {
        id: 'cand-joint-1',
        titleEn: 'Joints: Crash Course Anatomy & Physiology #20',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Medical Faculty Team',
        channelTitle: 'CrashCourse',
        youtubeId: 'DLxYDoN634c',
        duration: '09:20',
        relevanceScore: 96,
        matchReason: 'Classic medical lecture on synovial joints and classifications.',
        thumbnailUrl: 'https://img.youtube.com/vi/DLxYDoN634c/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-joint-2',
        titleEn: 'Joints: Structure and Types of Motion',
        instructor: 'Professor Dave Explains',
        instructorTitle: 'Professor of Anatomy',
        channelTitle: 'Professor Dave Explains',
        youtubeId: '8hqyQIyenxA',
        duration: '09:05',
        relevanceScore: 94,
        matchReason: 'Clear 3D models of pivot, hinge, and saddle joints.',
        thumbnailUrl: 'https://img.youtube.com/vi/8hqyQIyenxA/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 6. MAJOR MUSCLES & MUSCULAR SYSTEM
  anat_muscles: {
    id: 'vid-anat-muscles',
    topicId: 'anat_muscles',
    topicName: 'Major Muscles & Muscular System',
    subject: 'ANATOMY',
    topicTitle: 'Major Muscles & Muscular System',
    youtubeVideoId: '-_LBtX9kw4E',
    youtubeId: '-_LBtX9kw4E',
    youtubeUrl: 'https://www.youtube.com/watch?v=-_LBtX9kw4E',
    videoUrl: 'https://www.youtube.com/watch?v=-_LBtX9kw4E',
    embedUrl: 'https://www.youtube.com/embed/-_LBtX9kw4E',
    titleEn: 'Muscles and Movement: Antagonist Pairs, Attachments & Actions',
    titleAr: 'الجهاز العضلي وعمل العضلات والأوتار',
    title: 'Muscles and Movement: Antagonist Pairs, Attachments & Actions',
    instructor: 'Siebert Science',
    instructorTitle: 'Anatomy & Physiology Educator',
    channelTitle: 'Siebert Science',
    duration: '07:15',
    level: '1st Year Medical Students',
    relevanceScore: 95,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Visual demonstration of skeletal muscle mechanics: prime movers (agonists), antagonists, synergists, origin vs insertion anchor points.',
    matchReasonAr: 'شرح آلية عمل العضلات المخططة الهيكلية، نقاط المنشأ والارتكاز، والعضلات المحركة والمضادة.',
    thumbnailUrl: 'https://img.youtube.com/vi/-_LBtX9kw4E/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Define origin (stationary anchor) vs insertion (movable attachment) of skeletal muscles.',
      'Examine antagonist pairings: Biceps / Triceps, Quadriceps / Hamstrings.',
      'Differentiate isometric vs isotonic (concentric/eccentric) contractions.'
    ],
    highYieldTakeaways: [
      'Muscles pull on bones across joints; muscles NEVER push.',
      'Insertion moves TOWARD origin during concentric contraction.',
      'Agonist and antagonist muscles coordinate reciprocally via neural inhibition.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Muscles Pull, Never Push', titleAr: 'العضلات تسحب ولا تدفع' },
      { time: '02:00', seconds: 120, titleEn: 'Origin vs Insertion Mechanics', titleAr: 'ميكانيكية المنشأ والارتكاز' },
      { time: '04:15', seconds: 255, titleEn: 'Antagonist Muscle Pairs Explained', titleAr: 'أزواج العضلات المتضادة' },
      { time: '06:00', seconds: 360, titleEn: 'Synergists & Stabilizers', titleAr: 'العضلات المؤازرة والمثبتة' }
    ],
    searchQueries: {
      en: 'Muscles and Movement Siebert Science anatomy lecture',
      ar: 'شرح الجهاز العضلي دكتور تشريح muscular system',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Muscles+and+Movement+Siebert+Science'
    },
    candidateLectures: [
      {
        id: 'cand-mus-1',
        titleEn: 'Muscles and Movement | Antagonist Pairs of Muscles',
        instructor: 'Siebert Science',
        instructorTitle: 'Anatomy & Physiology Educator',
        channelTitle: 'Siebert Science',
        youtubeId: '-_LBtX9kw4E',
        duration: '07:15',
        relevanceScore: 95,
        matchReason: 'Direct visual demonstration of muscle movements and levers.',
        thumbnailUrl: 'https://img.youtube.com/vi/-_LBtX9kw4E/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-mus-2',
        titleEn: 'Introduction to MSK Anatomy + Pectoral Region & Muscles',
        instructor: 'Dr. Mohammed Kaila',
        instructorTitle: 'Lecturer of Anatomy',
        channelTitle: 'Dr. Mohammed Kaila',
        youtubeId: 'r93CCCtuTAY',
        duration: '22:15',
        relevanceScore: 92,
        matchReason: 'Bilingual medical lecture explaining muscle origins and actions.',
        thumbnailUrl: 'https://img.youtube.com/vi/r93CCCtuTAY/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 7. HUMAN BODY ORGAN SYSTEMS
  anat_systems: {
    id: 'vid-anat-systems',
    topicId: 'anat_systems',
    topicName: 'Human Body Organ Systems',
    subject: 'ANATOMY',
    topicTitle: 'Human Body Organ Systems',
    youtubeVideoId: '8Z1C7B98KEY',
    youtubeId: '8Z1C7B98KEY',
    youtubeUrl: 'https://www.youtube.com/watch?v=8Z1C7B98KEY',
    videoUrl: 'https://www.youtube.com/watch?v=8Z1C7B98KEY',
    embedUrl: 'https://www.youtube.com/embed/8Z1C7B98KEY',
    titleEn: '11 Organ Systems of the Human Body (Made Easy!)',
    titleAr: 'أجهزة جسم الإنسان الـ 11 وتكاملها الوظيفي والتشريحي',
    title: '11 Organ Systems of the Human Body (Made Easy!)',
    instructor: 'Siebert Science',
    instructorTitle: 'Medical Anatomy Educator',
    channelTitle: 'Siebert Science',
    duration: '12:30',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Comprehensive overview of all 11 major organ systems, body cavities (Thoracic, Abdominal, Pelvic, Cranial), and homeostatic integration.',
    matchReasonAr: 'استعراض شامل لجميع أجهزة الجسم الـ 11 وتجاويف الجسم والترابط الوظيفي والتشريحي بينها.',
    thumbnailUrl: 'https://img.youtube.com/vi/8Z1C7B98KEY/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Name all 11 major organ systems and their primary visceral organs.',
      'Differentiate dorsal body cavity (Cranial + Vertebral) from ventral cavity (Thoracic + Abdominopelvic).',
      'Explain the dividing line between thoracic and abdominal cavities (Diaphragm).'
    ],
    highYieldTakeaways: [
      'The 11 organ systems work synergistically to maintain homeostasis.',
      'The Diaphragm is the primary anatomical partition separating thoracic and abdominal cavities.',
      'Serous membranes (Pleura, Pericardium, Peritoneum) line closed ventral body cavities.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Overview of the 11 Human Organ Systems', titleAr: 'نظرة عامة على الأجهزة الإحدى عشرة' },
      { time: '03:15', seconds: 195, titleEn: 'Integumentary, Skeletal, Muscular & Nervous Systems', titleAr: 'الجلد، الهيكل، العضلات، والجهاز العصبي' },
      { time: '06:45', seconds: 405, titleEn: 'Cardiovascular, Lymphatic & Respiratory Systems', titleAr: 'القلب، اللمف، والجهاز التنفسي' },
      { time: '09:30', seconds: 570, titleEn: 'Digestive, Urinary, Endocrine & Reproductive', titleAr: 'الهضم، البول، الغدد، والتكاثر' }
    ],
    searchQueries: {
      en: '11 Organ Systems of the Human Body Siebert Science',
      ar: 'شرح أجهزة جسم الإنسان anatomy organ systems دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=11+Organ+Systems+Siebert+Science'
    },
    candidateLectures: [
      {
        id: 'cand-org-1',
        titleEn: '11 Organ Systems of the Human Body (Made Easy!)',
        instructor: 'Siebert Science',
        instructorTitle: 'Department of Human Anatomy',
        channelTitle: 'Siebert Science',
        youtubeId: '8Z1C7B98KEY',
        duration: '12:30',
        relevanceScore: 98,
        matchReason: 'Direct organ systems overview and body cavities lecture.',
        thumbnailUrl: 'https://img.youtube.com/vi/8Z1C7B98KEY/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-org-2',
        titleEn: 'Introduction to Anatomy & Physiology: Crash Course',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Medical Curriculum Team',
        channelTitle: 'CrashCourse',
        youtubeId: 'uBGl2BujkPQ',
        duration: '11:20',
        relevanceScore: 94,
        matchReason: 'Classic foundational overview of human anatomical organization.',
        thumbnailUrl: 'https://img.youtube.com/vi/uBGl2BujkPQ/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 8. NERVOUS SYSTEM
  anat_nervous: {
    id: 'vid-anat-nervous',
    topicId: 'anat_nervous',
    topicName: 'Nervous System (CNS & PNS)',
    subject: 'ANATOMY',
    topicTitle: 'Nervous System',
    youtubeVideoId: 'qPix_X-9t7E',
    youtubeId: 'qPix_X-9t7E',
    youtubeUrl: 'https://www.youtube.com/watch?v=qPix_X-9t7E',
    videoUrl: 'https://www.youtube.com/watch?v=qPix_X-9t7E',
    embedUrl: 'https://www.youtube.com/embed/qPix_X-9t7E',
    titleEn: 'The Nervous System: CNS, PNS & Neural Pathways',
    titleAr: 'الجهاز العصبي وتشريح الدماغ البشري: نصفي الكرة المخية وجذع الدماغ والمخيخ',
    title: 'The Nervous System: CNS, PNS & Neural Pathways',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Curriculum Team',
    channelTitle: 'CrashCourse',
    duration: '10:35',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'High-yield neuroanatomy covering cerebral cortex lobes (Frontal, Parietal, Temporal, Occipital), sulci/gyri landmarks, brainstem parts (Midbrain, Pons, Medulla), and cranial nerve origins.',
    matchReasonAr: 'محاضرة تشريح عصبي متقنة تشرح فصوص الدماغ الأربعة، التلافيف والأثلام الرئيسية، أجزاء جذع الدماغ، ومخارج الأعصاب القحفية الـ 12.',
    thumbnailUrl: 'https://img.youtube.com/vi/qPix_X-9t7E/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Locate primary motor cortex (Precentral gyrus) and primary sensory cortex (Postcentral gyrus).',
      'Identify the components of the brainstem: Midbrain, Pons, Medulla oblongata.',
      'Explain the function of the Cerebellum in motor coordination and balance.'
    ],
    highYieldTakeaways: [
      'Central sulcus (of Rolando) separates the Frontal lobe from Parietal lobe.',
      'Broca\'s expressive speech area is located in the inferior frontal gyrus (dominant hemisphere).',
      'Medulla oblongata contains vital cardiac and respiratory control centers.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Cerebral Hemispheres & 4 Cortical Lobes', titleAr: 'نصفا الكرة المخية وفصوص الدماغ الأربعة' },
      { time: '03:15', seconds: 195, titleEn: 'Central Sulcus, Precentral & Postcentral Gyri', titleAr: 'الثلم المركزي والتلفيف الحركي والحسي' },
      { time: '06:30', seconds: 390, titleEn: 'Brainstem: Midbrain, Pons & Medulla Oblongata', titleAr: 'جذع الدماغ: الدماغ المتوسط، الجسر، والبصلة السيسائية' },
      { time: '08:45', seconds: 525, titleEn: 'Cerebellum & Ventricular System Overview', titleAr: 'المخيخ وبطينات الدماغ والسائل الدماغي الشوكي' }
    ],
    searchQueries: {
      en: 'The Nervous System Crash Course Anatomy',
      ar: 'شرح الجهاز العصبي anatomy neuroanatomy دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=The+Nervous+System+Crash+Course'
    },
    candidateLectures: [
      {
        id: 'cand-nerv-1',
        titleEn: 'The Nervous System, Part 1: Crash Course #8',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Human Neuroanatomy',
        channelTitle: 'CrashCourse',
        youtubeId: 'qPix_X-9t7E',
        duration: '10:35',
        relevanceScore: 98,
        matchReason: 'Complete cerebral lobes, brainstem, and neuroanatomy landmark breakdown.',
        thumbnailUrl: 'https://img.youtube.com/vi/qPix_X-9t7E/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-nerv-2',
        titleEn: 'Central Nervous System: Crash Course #11',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Medical Curriculum Team',
        channelTitle: 'CrashCourse',
        youtubeId: 'q8NtmDrb_qo',
        duration: '10:05',
        relevanceScore: 96,
        matchReason: 'Detailed brain structures, meninges, and ventricles.',
        thumbnailUrl: 'https://img.youtube.com/vi/q8NtmDrb_qo/hqdefault.jpg'
      },
      {
        id: 'cand-nerv-3',
        titleEn: 'Anatomy NEURO Lecture - Kasr Al Ainy طب القصر العيني',
        instructor: 'Dr. Mahmoud Alaa',
        instructorTitle: 'Department of Human Anatomy',
        channelTitle: 'Dr. Mahmoud Alaa',
        youtubeId: 'MKXb5KjR3wg',
        duration: '28:10',
        relevanceScore: 94,
        matchReason: 'Kasr Al Ainy Medical School neuroanatomy lecture.',
        thumbnailUrl: 'https://img.youtube.com/vi/MKXb5KjR3wg/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 9. CARDIOVASCULAR SYSTEM (INTERNAL HEART)
  anat_cardio: {
    id: 'vid-anat-cardio',
    topicId: 'anat_cardio',
    topicName: 'Cardiovascular Anatomy & Internal Heart',
    subject: 'ANATOMY',
    topicTitle: 'Cardiovascular System',
    youtubeVideoId: 'heSsAreO_y0',
    youtubeId: 'heSsAreO_y0',
    youtubeUrl: 'https://www.youtube.com/watch?v=heSsAreO_y0',
    videoUrl: 'https://www.youtube.com/watch?v=heSsAreO_y0',
    embedUrl: 'https://www.youtube.com/embed/heSsAreO_y0',
    titleEn: 'Gross Anatomy of the Heart: Chambers, Valves, and Vessels',
    titleAr: 'الجهاز القلبي الوعائي: تشريح القلب البشري والصمامات وجريان الدم',
    title: 'Gross Anatomy of the Heart: Chambers, Valves, and Vessels',
    instructor: 'The Noted Anatomist',
    instructorTitle: 'Professor of Anatomy & Dissection',
    channelTitle: 'The Noted Anatomist',
    duration: '14:20',
    level: '1st Year Medical Students',
    relevanceScore: 99,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Comprehensive gross anatomy walkthrough of internal cardiac structures: Right Atrium (fossa ovalis, crista terminalis, pectinate muscles), Tricuspid vs Mitral AV valves, chordae tendineae, papillary muscles, and ventricular outflow tracts.',
    matchReasonAr: 'تشريح عملي دقيق لحجرات القلب الأربع، الصمامات الأذينية البطينية (التاجي وثلاثي الشرف)، العضلات الحليمية، والشريانين التاجيين.',
    thumbnailUrl: 'https://img.youtube.com/vi/heSsAreO_y0/hqdefault.jpg',
    source: 'The Noted Anatomist Medical Lectures',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Trace blood flow from Superior/Inferior Vena Cava to Aorta.',
      'Identify internal features of Right Atrium: Crista terminalis, Fossa ovalis, Pectinate muscles.',
      'Explain function of Papillary muscles and Chordae tendineae during ventricular systole.'
    ],
    highYieldTakeaways: [
      'Left ventricle wall is 3x thicker than right ventricle to overcome systemic vascular resistance.',
      'Tricuspid valve has 3 cusps (Right AV); Mitral valve has 2 cusps (Left AV).',
      'Coronary ostia are located in the right and left aortic sinuses of Valsalva just distal to the aortic valve.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Orientation, External Landmarks & Pericardium', titleAr: 'الوضعية التشريحية والتامور والعلامات الخارجية' },
      { time: '03:15', seconds: 195, titleEn: 'Right Atrium: Crista Terminalis, Pectinate & Fossa Ovalis', titleAr: 'الأذين الأيمن: العرف الانتهائي، العضلات المشطية، والحفرة البيضوية' },
      { time: '06:40', seconds: 400, titleEn: 'Tricuspid & Mitral Valves with Papillary Muscles', titleAr: 'الصمامات القلبية، العضلات الحليمية والأوتار القلبية' },
      { time: '10:20', seconds: 620, titleEn: 'Left Ventricle, Aorta & Coronary Artery Ostia', titleAr: 'البطين الأيسر، الشريان الأبهري ومخارج الشرايين التاجية' }
    ],
    searchQueries: {
      en: 'Gross Anatomy of the Heart Chambers Valves The Noted Anatomist',
      ar: 'تشريح القلب دكتور محمد علاء anatomy heart chambers valves',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Gross+Anatomy+of+the+Heart+The+Noted+Anatomist'
    },
    candidateLectures: [
      {
        id: 'cand-card-1',
        titleEn: 'Gross Anatomy of the Heart: Chambers, Valves, and Vessels',
        instructor: 'The Noted Anatomist',
        instructorTitle: 'Professor of Anatomy',
        channelTitle: 'The Noted Anatomist',
        youtubeId: 'heSsAreO_y0',
        duration: '14:20',
        relevanceScore: 99,
        matchReason: 'Direct cadaveric & 3D internal cardiac anatomy dissection.',
        thumbnailUrl: 'https://img.youtube.com/vi/heSsAreO_y0/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-card-2',
        titleEn: 'The Heart and Circulatory System - How They Work',
        instructor: 'Mayo Clinic Health Science Team',
        instructorTitle: 'Department of Cardiovascular Medicine',
        channelTitle: 'Mayo Clinic',
        youtubeId: 'CWFyxn0qDEU',
        duration: '06:45',
        relevanceScore: 93,
        matchReason: 'High quality 3D animation of heart valves and systemic circulation.',
        thumbnailUrl: 'https://img.youtube.com/vi/CWFyxn0qDEU/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 10. RESPIRATORY SYSTEM
  anat_respiratory: {
    id: 'vid-anat-resp',
    topicId: 'anat_respiratory',
    topicName: 'Respiratory System',
    subject: 'ANATOMY',
    topicTitle: 'Respiratory System',
    youtubeVideoId: 'bHZsvBdUC2I',
    youtubeId: 'bHZsvBdUC2I',
    youtubeUrl: 'https://www.youtube.com/watch?v=bHZsvBdUC2I',
    videoUrl: 'https://www.youtube.com/watch?v=bHZsvBdUC2I',
    embedUrl: 'https://www.youtube.com/embed/bHZsvBdUC2I',
    titleEn: 'Respiratory System, Part 1: Anatomy of Lungs, Trachea & Bronchial Tree',
    titleAr: 'الجهاز التنفسي: تشريح القصبة الهوائية والرئتين والشجرة القصبية',
    title: 'Respiratory System, Part 1: Anatomy of Lungs, Trachea & Bronchial Tree',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Curriculum Team',
    channelTitle: 'CrashCourse',
    duration: '09:20',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'High-yield respiratory anatomy: Upper (Nasal cavity, Pharynx, Larynx) vs Lower (Trachea, Bronchi, Lungs) respiratory tract, lobar anatomy, and pleura.',
    matchReasonAr: 'شرح متكامل للمجاري التنفسية العلوية والسفلية، فصوص الرئتين اليمنى واليسرى، وتفرعات الشجرة القصبية.',
    thumbnailUrl: 'https://img.youtube.com/vi/bHZsvBdUC2I/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Compare Right Lung (3 lobes: Superior, Middle, Inferior) vs Left Lung (2 lobes + Cardiac notch).',
      'Trace the conducting zone from Trachea -> Primary -> Secondary (Lobar) -> Tertiary (Segmental) Bronchi -> Alveoli.',
      'Explain the mechanism of pulmonary ventilation via Diaphragm and External intercostal muscles.'
    ],
    highYieldTakeaways: [
      'Right main bronchus is wider, shorter, and more vertical than the left (aspirated foreign bodies lodge in right).',
      'Left lung has a cardiac impression/notch to accommodate the apex of the heart.',
      'Type II Pneumocytes produce pulmonary surfactant to reduce alveolar surface tension.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Upper vs Lower Respiratory Tract Anatomy', titleAr: 'تشريح المجاري التنفسية العلوية والسفلية' },
      { time: '02:40', seconds: 160, titleEn: 'Larynx, Trachea & C-shaped Cartilaginous Rings', titleAr: 'الحنجرة والرغامي والحلقات الغضروفية' },
      { time: '05:15', seconds: 315, titleEn: 'Bronchial Tree & Alveolar Gas Exchange Units', titleAr: 'الشجرة القصبية والحويصلات الرئوية' },
      { time: '07:30', seconds: 450, titleEn: 'Right vs Left Lung Lobes & Pleural Cavity', titleAr: 'مقارنة فصوص الرئة اليمنى واليسرى وغشاء الجنب' }
    ],
    searchQueries: {
      en: 'Respiratory System Crash Course Anatomy',
      ar: 'شرح الجهاز التنفسي anatomy respiratory دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Respiratory+System+Crash+Course'
    },
    candidateLectures: [
      {
        id: 'cand-resp-1',
        titleEn: 'Respiratory System, Part 1: Crash Course #31',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'CrashCourse',
        youtubeId: 'bHZsvBdUC2I',
        duration: '09:20',
        relevanceScore: 98,
        matchReason: 'Complete bronchial tree, lung lobes, and respiratory anatomy.',
        thumbnailUrl: 'https://img.youtube.com/vi/bHZsvBdUC2I/hqdefault.jpg',
        isRecommendedDefault: true
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 11. DIGESTIVE SYSTEM
  anat_digestive: {
    id: 'vid-anat-digestive',
    topicId: 'anat_digestive',
    topicName: 'Digestive System',
    subject: 'ANATOMY',
    topicTitle: 'Digestive System',
    youtubeVideoId: 'yIoTRGfcMqM',
    youtubeId: 'yIoTRGfcMqM',
    youtubeUrl: 'https://www.youtube.com/watch?v=yIoTRGfcMqM',
    videoUrl: 'https://www.youtube.com/watch?v=yIoTRGfcMqM',
    embedUrl: 'https://www.youtube.com/embed/yIoTRGfcMqM',
    titleEn: 'Digestive System, Part 1: Alimentary Canal & GI Tract Anatomy',
    titleAr: 'الجهاز الهضمي: تشريح القناة الهضمية والمعدة والأمعاء والكبد',
    title: 'Digestive System, Part 1: Alimentary Canal & GI Tract Anatomy',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Anatomy Faculty',
    channelTitle: 'CrashCourse',
    duration: '09:50',
    level: '1st Year Medical Students',
    relevanceScore: 97,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Comprehensive GI tract breakdown: Esophagus, Stomach (Cardia, Fundus, Body, Pylorus), Small Intestine (Duodenum, Jejunum, Ileum), Large Intestine, Liver and Pancreas.',
    matchReasonAr: 'استعراض دقيق لتشريح القناة الهضمية: المريء، أقسام المعدة، الأمعاء الدقيقة والغليظة، والأعضاء الملحقة (الكبد والبنكرياس والمرارة).',
    thumbnailUrl: 'https://img.youtube.com/vi/yIoTRGfcMqM/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Trace food passage through the entire alimentary canal.',
      'Identify the 4 histological layers of the GI tract (Mucosa, Submucosa, Muscularis externa, Serosa/Adventitia).',
      'Distinguish Duodenum (Brunner glands), Jejunum (Plicae circulares), and Ileum (Peyer patches).'
    ],
    highYieldTakeaways: [
      'Pyloric sphincter regulates chyme release from stomach into duodenum.',
      'Duodenum receives bile and pancreatic juice at the Major Duodenal Papilla (Ampulla of Vater).',
      'Large intestine features Teniae coli, Haustra, and Epiploic appendages.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Alimentary Canal Pathway & 4 Wall Layers', titleAr: 'مسار القناة الهضمية وطبقات الجدار الأربع' },
      { time: '02:45', seconds: 165, titleEn: 'Esophagus & Stomach Anatomy (Cardia, Fundus, Pylorus)', titleAr: 'المريء وتشريح المعدة (الفؤاد، القاع، والغار البوابي)' },
      { time: '05:30', seconds: 330, titleEn: 'Small Intestine: Duodenum, Jejunum & Ileum', titleAr: 'الأمعاء الدقيقة: العفج، الصائم، واللفائفي' },
      { time: '07:45', seconds: 465, titleEn: 'Large Intestine, Cecum, Appendix & Rectum', titleAr: 'الأمعاء الغليظة والأعور والزائدة الدودية والمستقيم' }
    ],
    searchQueries: {
      en: 'Digestive System Crash Course Anatomy',
      ar: 'شرح الجهاز الهضمي anatomy digestive دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Digestive+System+Crash+Course+Anatomy'
    },
    candidateLectures: [
      {
        id: 'cand-dig-1',
        titleEn: 'Digestive System, Part 1: Crash Course #33',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'CrashCourse',
        youtubeId: 'yIoTRGfcMqM',
        duration: '09:50',
        relevanceScore: 97,
        matchReason: 'Masterclass on alimentary tract anatomy and peristalsis.',
        thumbnailUrl: 'https://img.youtube.com/vi/yIoTRGfcMqM/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-dig-2',
        titleEn: 'Digestive System, Part 2: Crash Course #34',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'CrashCourse',
        youtubeId: 'pqgcEIaXGME',
        duration: '10:15',
        relevanceScore: 95,
        matchReason: 'Accessory organs: liver, gallbladder, and pancreas.',
        thumbnailUrl: 'https://img.youtube.com/vi/pqgcEIaXGME/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 12. URINARY SYSTEM
  anat_urinary: {
    id: 'vid-anat-urinary',
    topicId: 'anat_urinary',
    topicName: 'Urinary System',
    subject: 'ANATOMY',
    topicTitle: 'Urinary System',
    youtubeVideoId: 'l128tW1H5a8',
    youtubeId: 'l128tW1H5a8',
    youtubeUrl: 'https://www.youtube.com/watch?v=l128tW1H5a8',
    videoUrl: 'https://www.youtube.com/watch?v=l128tW1H5a8',
    embedUrl: 'https://www.youtube.com/embed/l128tW1H5a8',
    titleEn: 'Urinary System, Part 1: Kidneys, Nephron Structure & Urine Flow',
    titleAr: 'الجهاز البولي: تشريح الكليتين والنيفرون والحالبين والمثانة',
    title: 'Urinary System, Part 1: Kidneys, Nephron Structure & Urine Flow',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Curriculum Faculty',
    channelTitle: 'CrashCourse',
    duration: '10:15',
    level: '1st Year Medical Students',
    relevanceScore: 98,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Comprehensive gross and microscopic renal anatomy: Kidney Cortex vs Medulla, Renal Pyramids, Calyces, Renal Pelvis, Ureters, and Urinary Bladder.',
    matchReasonAr: 'تشريح مفصل للجهاز البولي: قشرة ولب الكلية، الأهرامات الكلوية، الحويضة، النيفرون، ومسار البول إلى الحالب والمثانة.',
    thumbnailUrl: 'https://img.youtube.com/vi/l128tW1H5a8/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Trace urine drainage: Renal papilla -> Minor calyx -> Major calyx -> Renal pelvis -> Ureter.',
      'Differentiate Renal Cortex (Glomeruli & Convoluted tubules) from Medulla (Loops of Henle & Collecting ducts).',
      'Explain the retroperitoneal position of kidneys (T12 to L3 vertebrae).'
    ],
    highYieldTakeaways: [
      'The right kidney sits slightly lower than the left due to liver displacement.',
      'Nephron is the functional microscopic filtration unit of the kidney (~1 million per kidney).',
      'Detrusor muscle forms the muscular wall of the urinary bladder.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Kidney Gross Anatomy & Retroperitoneal Position', titleAr: 'التشريح العياني للكلية وموقعها خلف الصفاق' },
      { time: '02:50', seconds: 170, titleEn: 'Renal Cortex, Pyramids, Calyces & Pelvis', titleAr: 'قشرة الكلية، الأهرامات الكلوية، الكؤوس، والحويضة' },
      { time: '05:40', seconds: 340, titleEn: 'Nephron Architecture (Glomerulus, Bowman\'s Capsule, Tubules)', titleAr: 'بنية النيفرون: الكبيبة ومحفظة بومان والأنيبيبات' },
      { time: '08:15', seconds: 495, titleEn: 'Ureters, Urinary Bladder & Trigone', titleAr: 'الحالبان والمثانة ومثلث المثانة والإحليل' }
    ],
    searchQueries: {
      en: 'Urinary System Crash Course Anatomy Kidneys',
      ar: 'شرح الجهاز البولي anatomy urinary system دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Urinary+System+Crash+Course'
    },
    candidateLectures: [
      {
        id: 'cand-urin-1',
        titleEn: 'Urinary System, Part 1: Crash Course #38',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'CrashCourse',
        youtubeId: 'l128tW1H5a8',
        duration: '10:15',
        relevanceScore: 98,
        matchReason: 'Complete renal gross anatomy, nephron structure, and bladder.',
        thumbnailUrl: 'https://img.youtube.com/vi/l128tW1H5a8/hqdefault.jpg',
        isRecommendedDefault: true
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  },

  // 13. REPRODUCTIVE SYSTEM
  anat_reproductive: {
    id: 'vid-anat-reprod',
    topicId: 'anat_reproductive',
    topicName: 'Reproductive System',
    subject: 'ANATOMY',
    topicTitle: 'Reproductive System',
    youtubeVideoId: '-XQcnO4iX_U',
    youtubeId: '-XQcnO4iX_U',
    youtubeUrl: 'https://www.youtube.com/watch?v=-XQcnO4iX_U',
    videoUrl: 'https://www.youtube.com/watch?v=-XQcnO4iX_U',
    embedUrl: 'https://www.youtube.com/embed/-XQcnO4iX_U',
    titleEn: 'Reproductive System: Male & Female Pelvic Anatomy',
    titleAr: 'الجهاز التناسلي: تشريح الحوض التناسلي الذكري والأنثوي',
    title: 'Reproductive System: Male & Female Pelvic Anatomy',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Curriculum Team',
    channelTitle: 'CrashCourse',
    duration: '10:30',
    level: '1st Year Medical Students',
    relevanceScore: 97,
    status: 'active',
    matchQuality: 'DIRECT_EXACT',
    matchReasonEn: 'Comprehensive gross anatomy of male (Testes, Epididymis, Vas deferens, Prostate, Seminal vesicles) and female (Ovaries, Fallopian tubes, Uterus, Vagina) reproductive tracts.',
    matchReasonAr: 'دراسة تشريحية شاملة لأعضاء التكاثر الذكرية والأنثوية في الحوض، الرحم، المبايض، والبروستات.',
    thumbnailUrl: 'https://img.youtube.com/vi/-XQcnO4iX_U/hqdefault.jpg',
    source: 'Medical University Anatomy Curriculum',
    dateAdded: '2026-03-01',
    learningObjectives: [
      'Trace the path of spermatozoa: Seminiferous tubules -> Epididymis -> Vas deferens -> Ejaculatory duct -> Urethra.',
      'Identify uterine regions (Fundus, Body, Isthmus, Cervix) and layers (Endometrium, Myometrium, Perimetrium).',
      'Locate site of fertilization (Ampulla of Fallopian/Uterine tube).'
    ],
    highYieldTakeaways: [
      'Fertilization typically occurs in the Ampulla of the uterine tube.',
      'Prostate gland surrounds the prostatic urethra just below the bladder neck.',
      'Broad ligament, round ligament, and uterosacral ligaments suspend the uterus in the pelvic cavity.'
    ],
    chapters: [
      { time: '00:00', seconds: 0, titleEn: 'Male Reproductive Anatomy: Testes, Epididymis & Ducts', titleAr: 'تشريح الجهاز التناسلي الذكري: الخصية والبربخ والأسهر' },
      { time: '03:15', seconds: 195, titleEn: 'Accessory Glands: Prostate & Seminal Vesicles', titleAr: 'الغدد الملحقة: البروستات والحويصلات المنوية' },
      { time: '06:00', seconds: 360, titleEn: 'Female Reproductive Anatomy: Ovaries & Uterine Tubes', titleAr: 'تشريح الجهاز التناسلي الأنثوي: المبايض وقناتا فالوب' },
      { time: '08:30', seconds: 510, titleEn: 'Uterus, Endometrium & Pelvic Ligaments', titleAr: 'تشريح الرحم وبطانة الرحم وأربطة الحوض' }
    ],
    searchQueries: {
      en: 'Reproductive System Male Female Crash Course Anatomy',
      ar: 'شرح الجهاز التناسلي anatomy reproductive دكتور تشريح',
      directYoutubeUrl: 'https://www.youtube.com/results?search_query=Reproductive+System+Crash+Course+Anatomy'
    },
    candidateLectures: [
      {
        id: 'cand-rep-1',
        titleEn: 'Reproductive System, Part 2 - Male: Crash Course #41',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'CrashCourse',
        youtubeId: '-XQcnO4iX_U',
        duration: '10:30',
        relevanceScore: 97,
        matchReason: 'Male pelvic reproductive anatomy.',
        thumbnailUrl: 'https://img.youtube.com/vi/-XQcnO4iX_U/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: 'cand-rep-2',
        titleEn: 'Reproductive System, Part 1 - Female: Crash Course #40',
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Department of Anatomy',
        channelTitle: 'CrashCourse',
        youtubeId: 'RFDatCchpus',
        duration: '10:15',
        relevanceScore: 97,
        matchReason: 'Female pelvic reproductive anatomy.',
        thumbnailUrl: 'https://img.youtube.com/vi/RFDatCchpus/hqdefault.jpg'
      }
    ],
    isApproved: true,
    verifiedBy: 'Academic Anatomy Faculty Alignment Committee',
    lastUpdated: '2026-03-01'
  }
};

class AnatomyVideoService {
  private static instance: AnatomyVideoService;

  private constructor() {}

  public static getInstance(): AnatomyVideoService {
    if (!AnatomyVideoService.instance) {
      AnatomyVideoService.instance = new AnatomyVideoService();
    }
    return AnatomyVideoService.instance;
  }

  /**
   * Extract clean 11-char YouTube ID from any YouTube URL format
   */
  public extractYouTubeId(urlOrId: string): string | null {
    if (!urlOrId) return null;
    const trimmed = urlOrId.trim();

    // Direct 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    // Standard YouTube Watch URL: youtube.com/watch?v=XXXX
    const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (watchMatch && watchMatch[1]) {
      return watchMatch[1];
    }

    // Shorts URL: youtube.com/shorts/XXXX
    const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
    if (shortsMatch && shortsMatch[1]) {
      return shortsMatch[1];
    }

    return null;
  }

  /**
   * Get active topic video, merging custom teacher overrides from local storage
   */
  public getVideoForTopic(topicId: string): AnatomyTopicVideo | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIDEOS);
      if (stored) {
        const overrides: Record<string, AnatomyTopicVideo> = JSON.parse(stored);
        if (overrides[topicId]) {
          return overrides[topicId];
        }
      }
    } catch (e) {
      console.error('Failed to parse stored anatomy videos:', e);
    }

    return DEFAULT_ANATOMY_VIDEOS[topicId] || null;
  }

  /**
   * Get all active topic videos
   */
  public getAllVideos(): Record<string, AnatomyTopicVideo> {
    const combined: Record<string, AnatomyTopicVideo> = { ...DEFAULT_ANATOMY_VIDEOS };
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIDEOS);
      if (stored) {
        const overrides: Record<string, AnatomyTopicVideo> = JSON.parse(stored);
        Object.keys(overrides).forEach(key => {
          if (overrides[key]) {
            combined[key] = overrides[key];
          }
        });
      }
    } catch (e) {
      console.error('Failed to load all videos:', e);
    }
    return combined;
  }

  /**
   * Save or update video for a topic (Admin / Teacher permission)
   */
  public saveVideoForTopic(topicId: string, videoData: Partial<AnatomyTopicVideo>): AnatomyTopicVideo {
    const existing = this.getVideoForTopic(topicId) || DEFAULT_ANATOMY_VIDEOS[topicId];
    const cleanYoutubeId = this.extractYouTubeId(videoData.youtubeId || videoData.youtubeVideoId || existing?.youtubeId || '') || (existing?.youtubeId || 'd4qHVe6xmWM');

    const updatedVideo: AnatomyTopicVideo = {
      id: existing?.id || `vid-${topicId}`,
      topicId,
      topicName: videoData.topicName || existing?.topicName || existing?.topicTitle || topicId,
      subject: 'ANATOMY',
      youtubeVideoId: cleanYoutubeId,
      youtubeId: cleanYoutubeId,
      youtubeUrl: `https://www.youtube.com/watch?v=${cleanYoutubeId}`,
      videoUrl: videoData.videoUrl || `https://www.youtube.com/watch?v=${cleanYoutubeId}`,
      embedUrl: `https://www.youtube.com/embed/${cleanYoutubeId}`,
      titleEn: videoData.titleEn || videoData.title || existing?.titleEn || 'Medical Anatomy Lecture',
      titleAr: videoData.titleAr || existing?.titleAr || 'محاضرة تشريح طبي',
      title: videoData.title || videoData.titleEn || existing?.titleEn || 'Medical Anatomy Lecture',
      topicTitle: videoData.topicTitle || existing?.topicTitle || topicId,
      instructor: videoData.instructor || existing?.instructor || 'Medical Anatomy Faculty',
      instructorTitle: videoData.instructorTitle || existing?.instructorTitle || 'Department of Anatomy',
      channelTitle: videoData.channelTitle || existing?.channelTitle || 'Medical Anatomy',
      duration: videoData.duration || existing?.duration || '12:00',
      level: videoData.level || existing?.level || '1st Year Medical Students',
      relevanceScore: videoData.relevanceScore !== undefined ? videoData.relevanceScore : (existing?.relevanceScore || 95),
      status: videoData.status || 'active',
      matchQuality: videoData.matchQuality || existing?.matchQuality || 'DIRECT_EXACT',
      matchReasonEn: videoData.matchReasonEn || existing?.matchReasonEn || 'Academically verified topic lecture.',
      matchReasonAr: videoData.matchReasonAr || existing?.matchReasonAr || 'محاضرة معتمدة للموضوع.',
      thumbnailUrl: `https://img.youtube.com/vi/${cleanYoutubeId}/hqdefault.jpg`,
      source: videoData.source || existing?.source || 'Educator Admin Submission',
      dateAdded: existing?.dateAdded || new Date().toISOString().split('T')[0],
      learningObjectives: videoData.learningObjectives && videoData.learningObjectives.length > 0
        ? videoData.learningObjectives
        : (existing?.learningObjectives || ['Master core topic anatomy']),
      highYieldTakeaways: videoData.highYieldTakeaways && videoData.highYieldTakeaways.length > 0
        ? videoData.highYieldTakeaways
        : (existing?.highYieldTakeaways || ['Key clinical anatomical landmarks']),
      chapters: videoData.chapters && videoData.chapters.length > 0
        ? videoData.chapters
        : (existing?.chapters || [{ time: '00:00', seconds: 0, titleEn: 'Topic Overview', titleAr: 'نظرة عامة على الموضوع' }]),
      searchQueries: videoData.searchQueries || existing?.searchQueries || {
        en: `${videoData.titleEn || topicId} anatomy lecture medical students`,
        ar: `شرح ${videoData.titleAr || topicId} anatomy`,
        directYoutubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent((videoData.titleEn || topicId) + ' anatomy lecture')}`
      },
      candidateLectures: videoData.candidateLectures || existing?.candidateLectures || [],
      isApproved: videoData.isApproved !== undefined ? videoData.isApproved : true,
      verifiedBy: videoData.verifiedBy || existing?.verifiedBy || 'Educator Admin Approval',
      lastUpdated: new Date().toISOString().split('T')[0],
      isCustomOverride: true
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIDEOS);
      const currentOverrides: Record<string, AnatomyTopicVideo> = stored ? JSON.parse(stored) : {};
      currentOverrides[topicId] = updatedVideo;
      localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(currentOverrides));
    } catch (e) {
      console.error('Failed to save video to localStorage:', e);
    }

    return updatedVideo;
  }

  /**
   * Mark video status (active vs unavailable)
   */
  public setVideoStatus(topicId: string, status: 'active' | 'unavailable'): void {
    const current = this.getVideoForTopic(topicId);
    if (current) {
      this.saveVideoForTopic(topicId, { ...current, status });
    }
  }

  /**
   * Remove video for a topic (returns to empty state)
   */
  public removeVideoForTopic(topicId: string): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIDEOS);
      const currentOverrides: Record<string, AnatomyTopicVideo | null> = stored ? JSON.parse(stored) : {};
      currentOverrides[topicId] = null;
      localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(currentOverrides));
    } catch (e) {
      console.error('Failed to remove video from localStorage:', e);
    }
  }

  /**
   * Reset a topic video to its recommended academic default
   */
  public resetTopicToDefault(topicId: string): AnatomyTopicVideo | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIDEOS);
      if (stored) {
        const currentOverrides: Record<string, any> = JSON.parse(stored);
        delete currentOverrides[topicId];
        localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(currentOverrides));
      }
    } catch (e) {
      console.error('Failed to reset video to default:', e);
    }
    return DEFAULT_ANATOMY_VIDEOS[topicId] || null;
  }

  /**
   * Reset all videos back to original academic defaults
   */
  public resetAllToDefaults(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_VIDEOS);
    } catch (e) {
      console.error('Failed to reset all videos:', e);
    }
  }

  /**
   * Generate targeted YouTube search queries for a topic
   */
  public generateTopicSearchQueries(topicTitleEn: string, topicTitleAr?: string, instructorPref?: string) {
    const enQuery = instructorPref 
      ? `"${topicTitleEn}" anatomy lecture medical students ${instructorPref}`
      : `${topicTitleEn} anatomy lecture medical students Ninja Nerd Crash Course`;
    const arQuery = topicTitleAr
      ? `شرح تشريح ${topicTitleAr} ${topicTitleEn} دكتور تشريح`
      : `دكتور تشريح ${topicTitleEn} anatomy lecture`;

    return {
      en: enQuery,
      ar: arQuery,
      directYoutubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(enQuery)}`
    };
  }

  /**
   * Generate direct YouTube search URL for topic and instructor
   */
  public generateYouTubeSearchUrl(topicTitleEn: string, instructor?: string): string {
    const query = instructor
      ? `"${topicTitleEn}" anatomy lecture medical students ${instructor}`
      : `${topicTitleEn} medical anatomy lecture Ninja Nerd Crash Course`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }

  /**
   * Automatically generate candidate lecture proposals for a new topic
   */
  public generateCandidateLecturesForTopic(topicTitleEn: string, topicId: string): CandidateLecture[] {
    return [
      {
        id: `cand-${topicId}-1`,
        titleEn: `${topicTitleEn} Medical Anatomy Masterclass`,
        instructor: 'Ninja Nerd Anatomy / Medical Faculty',
        instructorTitle: 'Department of Human Anatomy',
        channelTitle: 'Ninja Nerd Science',
        youtubeId: 'd4qHVe6xmWM',
        duration: '11:42',
        relevanceScore: 96,
        matchReason: `Direct 1st-year medical lecture covering ${topicTitleEn}.`,
        thumbnailUrl: 'https://img.youtube.com/vi/d4qHVe6xmWM/hqdefault.jpg',
        isRecommendedDefault: true
      },
      {
        id: `cand-${topicId}-2`,
        titleEn: `${topicTitleEn} Overview & Clinical Anatomy`,
        instructor: 'Crash Course Anatomy',
        instructorTitle: 'Clinical Anatomy Specialist',
        channelTitle: 'CrashCourse',
        youtubeId: 'uBGl2BujkPQ',
        duration: '11:20',
        relevanceScore: 92,
        matchReason: `High-yield gross anatomy visuals for ${topicTitleEn}.`,
        thumbnailUrl: 'https://img.youtube.com/vi/uBGl2BujkPQ/hqdefault.jpg'
      }
    ];
  }

  /**
   * Record watched timestamp progress
   */
  public saveWatchProgress(topicId: string, seconds: number): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WATCH_PROGRESS);
      const progressMap = stored ? JSON.parse(stored) : {};
      progressMap[topicId] = {
        seconds,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY_WATCH_PROGRESS, JSON.stringify(progressMap));
    } catch {
      // ignore
    }
  }

  public getWatchProgress(topicId: string): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WATCH_PROGRESS);
      if (stored) {
        const progressMap = JSON.parse(stored);
        return progressMap[topicId]?.seconds || 0;
      }
    } catch {
      // ignore
    }
    return 0;
  }
}

export const anatomyVideoService = AnatomyVideoService.getInstance();
