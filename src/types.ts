export type UserRole = 'student' | 'instructor' | 'admin';

export type LabSubjectId = 'anatomy' | 'histology' | 'biochemistry';

export type PracticalStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'approved' 
  | 'published' 
  | 'changes_requested'
  | 'revision_requested'
  | 'rejected';

export type ApprovalWorkflowState = PracticalStatus;

export interface User {
  id: string;
  userId?: string; // alias for id
  name: string;
  fullName?: string; // alias for name
  email: string;
  studentId: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  year?: string;
  enrolledLabs: LabSubjectId[];
  createdAt?: string;
  lastLoginAt?: string;
  lastActivityAt?: string;
  sessionCount?: number;
}

export interface UserActivityRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  activity: string;
  section: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  token: string;
  user: User;
  expiresAt: number;
}

export type AdminSubPage = 
  | 'overview' 
  | 'users' 
  | 'active_users'
  | 'activity' 
  | 'analytics' 
  | 'content' 
  | 'videos' 
  | 'security';

export interface AdminAnalyticsMetrics {
  totalUsers: number;
  activeNow?: number;
  todaysLogins: number;
  todaysLogouts?: number;
  activeRecently: number;
  newUsersThisWeek: number;
  totalActivities?: number;
}

export interface AdminAnalyticsBreakdown {
  totalUsers: number;
  todaysLogins: number;
  weeklyLogins: number;
  monthlyLogins: number;
  activeRecently: number;
  newUsersThisWeek: number;
  dailyLogins: { date: string; dayName: string; count: number }[];
  weeklyActivity: { week: string; count: number }[];
  subjectVisits: { subject: string; count: number; color: string }[];
  lessonActivity: { title: string; subject: string; opens: number }[];
  quizActivity: { totalAttempts: number; passed: number; failed: number };
  videoActivity: { totalViews: number; completedCount: number };
}

export interface AdminSecuritySession {
  id: string;
  tokenTimestamp: number;
  userId: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  lastActivityAt: string;
  revoked: boolean;
  isCurrent?: boolean;
  status?: string;
}

export interface AdminSecurityStatus {
  adminAccount: {
    name: string;
    email: string;
    studentId: string;
    role: string;
    department?: string;
    accountStatus: string;
    lastLoginAt?: string;
    sessionCount?: number;
    securityUpdateVersion?: string;
  };
  currentSession: AdminSecuritySession;
  sessions: AdminSecuritySession[];
  minAdminTokenTimestamp: number;
  securityEvents: UserActivityRecord[];
}

export interface LabCategory {
  id: string;
  labId: LabSubjectId;
  title: string;
  shortDesc: string;
  iconName: string;
  imageUrl: string;
  practicalCount: number;
  spotterCount: number;
  quizCount: number;
}

export interface LabSubjectInfo {
  id: LabSubjectId;
  name: string;
  code: string;
  tagline: string;
  description: string;
  heroImage: string;
  cardImage: string;
  icon: string;
  colorAccent: string;
  totalPracticals: number;
  completedPracticals: number;
  categories: LabCategory[];
}

export interface InteractivePin {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  structureName: string;
  histologicalFeatures: string;
  clinicalSignificance?: string;
  stain?: string;
}

export interface InteractiveImage {
  id: string;
  title: string;
  baseImage: string;
  magnification: string;
  stainOrView: string;
  description: string;
  pins: InteractivePin[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  image: string;
  description: string;
  safetyNotes?: string;
}

export interface ProcedureStep {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoTimestamp?: string;
  cautionNote?: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  whyItMatters: string;
}

export interface ClinicalCorrelation {
  condition: string;
  pathophysiology: string;
  clinicalPresentation: string;
  diagnosticPearls: string;
}

export interface SafetyProtocol {
  biosafetyLevel: string;
  hazards: string[];
  ppeRequired: string[];
  emergencyProtocol: string;
}

export interface AcademicReference {
  title: string;
  authors: string;
  editionOrYear: string;
  pages?: string;
}

export interface PracticalMedia {
  url: string;
  caption: string;
  magnification?: string;
  stainOrView?: string;
}

export interface VideoLecture {
  title: string;
  duration: string;
  videoUrl?: string;
  thumbnail: string;
  instructorName: string;
  chapters: { time: string; title: string }[];
}

export interface Practical {
  id: string;
  courseId: LabSubjectId;
  categoryId: string;
  practicalNumber: number;
  title: string;
  subTitle: string;
  estimatedTime: string;
  version: string;
  lastUpdated: string;
  status: PracticalStatus;
  authorName: string;
  authorRole: string;
  reviewerFeedback?: string;
  learningObjectives: string[];
  beforeTheLab: {
    previousKnowledge: string[];
    recommendedReading: string[];
    preparationChecklist: { id: string; text: string }[];
    preLabSummary: string;
  };
  equipment: EquipmentItem[];
  procedure: ProcedureStep[];
  images: PracticalMedia[];
  interactiveImages: InteractiveImage[];
  videoLecture?: VideoLecture;
  identificationPoints: string[];
  commonMistakes: CommonMistake[];
  clinicalCorrelation: ClinicalCorrelation;
  safety: SafetyProtocol;
  references: AcademicReference[];
  quizId?: string;
  spotterIds?: string[];
  approvedBy?: string;
  approvalDate?: string;
}

export interface SpotterItem {
  id: string;
  labId: LabSubjectId;
  categoryId: string;
  practicalId?: string;
  title: string;
  image: string;
  question: string;
  pointerX?: number; // % on image where pointer is pointing
  pointerY?: number;
  options: string[];
  correctIndex: number;
  explanation: string;
  identificationKeyPoints: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'true_false' | 'image_id';
  imageUrl?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  labId: LabSubjectId;
  practicalId?: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  labId: LabSubjectId;
  userId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  answers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
  completedAt: string;
}

export interface ScheduleItem {
  id: string;
  date: string;
  day: string;
  time: string;
  courseId: LabSubjectId;
  courseName: string;
  practicalNumber: number;
  practicalId: string;
  practicalTitle: string;
  instructorName: string;
  room: string;
  isToday: boolean;
  isTomorrow: boolean;
  preparationTasks: { id: string; label: string; completed: boolean }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  labId?: LabSubjectId;
  author: string;
  authorRole: string;
  priority: 'normal' | 'important' | 'urgent';
  isRead?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'practical' | 'quiz' | 'schedule' | 'approval' | 'announcement';
  linkTarget?: { tab: string; labId?: LabSubjectId; practicalId?: string };
  isRead: boolean;
}

export interface FileAsset {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'jpg' | 'png' | 'mp4';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  courseId: LabSubjectId;
  practicalId?: string;
  version: string;
  approvalStatus: PracticalStatus;
  downloadUrl?: string;
}

export interface StudentProgress {
  userId: string;
  anatomyPercent: number;
  histologyPercent: number;
  biochemistryPercent: number;
  completedPracticals: string[]; // practical IDs
  completedQuizzes: QuizAttempt[];
  completedSpotters: string[]; // spotter IDs
  averageScore: number;
  studyTimeMinutes: number;
  completedChecklistTasks: string[]; // task IDs
}

export interface BiochemistryTestDetail {
  id: string;
  testNumber: number;
  testNameEnglish: string;
  titleArabic: string;
  category: 'carbohydrates' | 'proteins_aminoacids' | 'lipids' | 'enzymes';
  objective: string;
  principle: string;
  reagents: string[];
  procedure: string[];
  positiveResult: {
    appearance: string;
    colorHex: string;
    explanation: string;
    samplePositiveList: string[];
  };
  negativeResult: {
    appearance: string;
    colorHex: string;
    explanation: string;
    sampleNegativeList: string[];
  };
  interpretation: string;
  clinicalSignificance: string;
  imageUrl?: string;
  testTubeState: {
    positiveColor: string;
    negativeColor: string;
    hasPrecipitate?: boolean;
    hasRing?: boolean;
    ringColor?: string;
  };
}

export type ExamType = 'identification' | 'mcq' | 'image_recognition' | 'practical_interpretation' | 'mixed';

export interface ExamQuestion {
  id: string;
  labId: LabSubjectId;
  type: ExamType;
  questionText: string;
  questionTextArabic?: string;
  specimenCategory: string; // e.g. "Osteology", "Epithelia", "Carbohydrate Tests"
  imageUrl: string;
  magnificationOrView?: string;
  options: string[];
  correctAnswer: string; // matches one option or typed text
  correctIndex?: number;
  explanation: string;
  clinicalNote?: string;
  timeSeconds: number; // e.g. 30, 45, 60
  marks: number; // e.g. 1, 2
}

export interface MedicalExam {
  id: string;
  title: string;
  titleArabic: string;
  labId: LabSubjectId | 'mixed';
  examType: ExamType;
  description: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  totalMarks: number;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'university_ospe';
  isPublished: boolean;
  questionIds: string[];
  questions?: ExamQuestion[];
  createdAt: string;
  authorName: string;
}

export interface ExamAnswerRecord {
  questionId: string;
  studentAnswer: string;
  selectedIndex?: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  labId: LabSubjectId | 'mixed';
  userId: string;
  userName: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  performanceLevel: 'ممتاز' | 'جيد جداً' | 'جيد' | 'يحتاج مراجعة';
  timeUsedSeconds: number;
  totalTimeSeconds: number;
  answers: ExamAnswerRecord[];
  completedAt: string;
}

export interface BiochemistryTestItem {
  id: string;
  testNumber: number;
  title: string;
  reagents: string[];
  principle: string;
  positive: string;
  negative: string;
}

