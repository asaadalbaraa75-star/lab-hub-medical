export interface AnatomyExamScoreRecord {
  highScore: number;
  totalAttempts: number;
  lastScore: number;
  lastDate: string;
  examTitleAr?: string;
  examTitleEn?: string;
}

export interface AnatomyStudentProgress {
  completedTopicIds: string[];
  bookmarkedTopicIds: string[];
  studiedStructuresCount: number;
  totalStudyMinutes: number;
  lastStudiedTopicId?: string;
  lastStudiedAt?: string;
  examScores: Record<string, AnatomyExamScoreRecord>;
}

const STORAGE_KEY = 'labhub_anatomy_student_progress';

export const anatomyProgressService = {
  getProgress: (): AnatomyStudentProgress => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      completedTopicIds: ['anat_planes'],
      bookmarkedTopicIds: [],
      studiedStructuresCount: 18,
      totalStudyMinutes: 55,
      lastStudiedTopicId: 'anat_skeletal',
      lastStudiedAt: new Date().toISOString(),
      examScores: {
        exam_comprehensive: {
          highScore: 85,
          totalAttempts: 2,
          lastScore: 85,
          lastDate: new Date(Date.now() - 3600000 * 4).toISOString(),
          examTitleAr: 'الاختبار العملي الشامل',
          examTitleEn: 'Comprehensive OSPE Exam'
        }
      }
    };
  },

  saveProgress: (progress: AnatomyStudentProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  },

  markTopicComplete: (topicId: string) => {
    const current = anatomyProgressService.getProgress();
    if (!current.completedTopicIds.includes(topicId)) {
      current.completedTopicIds.push(topicId);
    }
    current.lastStudiedTopicId = topicId;
    current.lastStudiedAt = new Date().toISOString();
    current.studiedStructuresCount += 3;
    current.totalStudyMinutes += 5;
    anatomyProgressService.saveProgress(current);
    return current;
  },

  toggleBookmark: (topicId: string): boolean => {
    const current = anatomyProgressService.getProgress();
    const index = current.bookmarkedTopicIds.indexOf(topicId);
    let isBookmarked = false;
    if (index > -1) {
      current.bookmarkedTopicIds.splice(index, 1);
      isBookmarked = false;
    } else {
      current.bookmarkedTopicIds.push(topicId);
      isBookmarked = true;
    }
    anatomyProgressService.saveProgress(current);
    return isBookmarked;
  },

  recordExamScore: (examId: string, score: number, totalQuestions: number, examTitleAr?: string, examTitleEn?: string) => {
    const current = anatomyProgressService.getProgress();
    const percentage = Math.round((score / totalQuestions) * 100);
    const existing = current.examScores[examId] || {
      highScore: 0,
      totalAttempts: 0,
      lastScore: 0,
      lastDate: ''
    };

    current.examScores[examId] = {
      highScore: Math.max(existing.highScore, percentage),
      totalAttempts: existing.totalAttempts + 1,
      lastScore: percentage,
      lastDate: new Date().toISOString(),
      examTitleAr: examTitleAr || existing.examTitleAr,
      examTitleEn: examTitleEn || existing.examTitleEn
    };

    current.totalStudyMinutes += 10;
    anatomyProgressService.saveProgress(current);
    return current;
  },

  getOverallProgressPercent: (totalTopicsCount: number = 12): number => {
    const progress = anatomyProgressService.getProgress();
    const topicPercent = Math.min(100, Math.round((progress.completedTopicIds.length / totalTopicsCount) * 70));
    const examAttempts = Object.values(progress.examScores).reduce((sum, e) => sum + e.totalAttempts, 0);
    const examBonus = Math.min(30, examAttempts * 10);
    return Math.min(100, topicPercent + examBonus);
  },

  getBestScore: (): number => {
    const progress = anatomyProgressService.getProgress();
    const scores = Object.values(progress.examScores).map(e => e.highScore);
    if (scores.length === 0) return 0;
    return Math.max(...scores);
  }
};

