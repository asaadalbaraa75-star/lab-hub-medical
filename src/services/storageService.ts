import {
  User,
  Practical,
  SpotterItem,
  Quiz,
  QuizAttempt,
  ScheduleItem,
  Announcement,
  NotificationItem,
  FileAsset,
  StudentProgress,
  PracticalStatus,
  LabSubjectId,
  MedicalExam,
  ExamQuestion,
  ExamAttempt,
  BiochemistryTestDetail
} from '../types';

import {
  DEMO_USERS,
  LAB_SUBJECTS,
  INITIAL_PRACTICALS,
  SPOTTER_ITEMS,
  INITIAL_QUIZZES,
  INITIAL_SCHEDULE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_FILES,
  INITIAL_STUDENT_PROGRESS
} from '../data/mockData';

import {
  MEDICAL_PRACTICAL_EXAMS,
  PRACTICAL_EXAM_QUESTIONS,
  BIOCHEMISTRY_DETAILED_TESTS
} from '../data/medicalExamData';

const STORAGE_KEYS = {
  CURRENT_USER: 'labhub_current_user',
  PRACTICALS: 'labhub_practicals',
  QUIZZES: 'labhub_quizzes',
  QUIZ_ATTEMPTS: 'labhub_quiz_attempts',
  SPOTTERS: 'labhub_spotters',
  SCHEDULE: 'labhub_schedule',
  ANNOUNCEMENTS: 'labhub_announcements',
  NOTIFICATIONS: 'labhub_notifications',
  FILES: 'labhub_files',
  PROGRESS: 'labhub_progress',
  MEDICAL_EXAMS: 'labhub_medical_exams',
  EXAM_QUESTIONS: 'labhub_exam_questions',
  EXAM_ATTEMPTS: 'labhub_exam_attempts'
};

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save to localStorage (${key}):`, e);
    }
  }

  // --- User Auth & Session ---
  getCurrentUser(): User {
    return this.get<User>(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0]);
  }

  setCurrentUser(user: User): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  getUsers(): User[] {
    return DEMO_USERS;
  }

  getAllDemoUsers(): User[] {
    return DEMO_USERS;
  }

  switchUserByRole(role: 'student' | 'instructor' | 'admin'): User {
    const target = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    this.setCurrentUser(target);
    return target;
  }

  setCurrentUserRole(role: 'student' | 'instructor' | 'admin'): User {
    return this.switchUserByRole(role);
  }

  // --- Practicals ---
  getPracticals(): Practical[] {
    return this.get<Practical[]>(STORAGE_KEYS.PRACTICALS, INITIAL_PRACTICALS);
  }

  getPracticalById(id: string): Practical | undefined {
    return this.getPracticals().find(p => p.id === id);
  }

  savePractical(practical: Practical): void {
    const list = this.getPracticals();
    const index = list.findIndex(p => p.id === practical.id);
    if (index >= 0) {
      list[index] = practical;
    } else {
      list.push(practical);
    }
    this.set(STORAGE_KEYS.PRACTICALS, list);
  }

  updatePracticalStatus(
    id: string,
    status: PracticalStatus,
    reviewerName?: string,
    feedback?: string
  ): Practical[] {
    const list = this.getPracticals();
    const target = list.find(p => p.id === id);
    if (target) {
      target.status = status;
      if (feedback !== undefined) target.reviewerFeedback = feedback;
      if (reviewerName) target.approvedBy = reviewerName;
      if (status === 'published' || status === 'approved') {
        target.approvalDate = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
      this.set(STORAGE_KEYS.PRACTICALS, list);

      // Create a notification for instructors and students
      this.addNotification({
        id: `notif_${Date.now()}`,
        title: `Practical Status Updated: ${target.title}`,
        message: `Status is now '${status.replace('_', ' ').toUpperCase()}'. ${feedback ? `Feedback: "${feedback}"` : ''}`,
        time: 'Just now',
        type: 'approval',
        linkTarget: { tab: 'practicals', labId: target.courseId, practicalId: target.id },
        isRead: false
      });
    }
    return list;
  }

  // --- Spotters ---
  getSpotters(): SpotterItem[] {
    return this.get<SpotterItem[]>(STORAGE_KEYS.SPOTTERS, SPOTTER_ITEMS);
  }

  getSpottersByLab(labId: LabSubjectId): SpotterItem[] {
    return this.getSpotters().filter(s => s.labId === labId);
  }

  // --- Quizzes & Attempts ---
  getQuizzes(): Quiz[] {
    return this.get<Quiz[]>(STORAGE_KEYS.QUIZZES, INITIAL_QUIZZES);
  }

  getQuizById(id: string): Quiz | undefined {
    return this.getQuizzes().find(q => q.id === id);
  }

  saveQuiz(quiz: Quiz): void {
    const list = this.getQuizzes();
    const index = list.findIndex(q => q.id === quiz.id);
    if (index >= 0) {
      list[index] = quiz;
    } else {
      list.push(quiz);
    }
    this.set(STORAGE_KEYS.QUIZZES, list);
  }

  recordQuizAttempt(attempt: QuizAttempt): StudentProgress {
    const attempts = this.get<QuizAttempt[]>(STORAGE_KEYS.QUIZ_ATTEMPTS, INITIAL_STUDENT_PROGRESS.completedQuizzes);
    attempts.unshift(attempt);
    this.set(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);

    // Update student progress metrics
    const progress = this.getProgress();
    if (!progress.completedQuizzes.some(q => q.id === attempt.id)) {
      progress.completedQuizzes.unshift(attempt);
    }
    const allPassedScores = attempts.map(a => a.percentage);
    const avg = allPassedScores.length > 0 
      ? Math.round(allPassedScores.reduce((a, b) => a + b, 0) / allPassedScores.length)
      : 0;
    progress.averageScore = avg;

    if (attempt.labId === 'histology' && progress.histologyPercent < 95) {
      progress.histologyPercent = Math.min(100, progress.histologyPercent + 8);
    } else if (attempt.labId === 'anatomy' && progress.anatomyPercent < 95) {
      progress.anatomyPercent = Math.min(100, progress.anatomyPercent + 8);
    } else if (attempt.labId === 'bacteriology' && progress.bacteriologyPercent < 95) {
      progress.bacteriologyPercent = Math.min(100, progress.bacteriologyPercent + 8);
    }

    this.saveProgress(progress);
    return progress;
  }

  saveQuizAttempt(attempt: QuizAttempt): StudentProgress {
    return this.recordQuizAttempt(attempt);
  }

  // --- Schedule & Checklists ---
  getSchedule(): ScheduleItem[] {
    return this.get<ScheduleItem[]>(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE);
  }

  toggleChecklistTask(scheduleId: string, taskId: string): ScheduleItem[] {
    const schedule = this.getSchedule();
    const item = schedule.find(s => s.id === scheduleId);
    if (item) {
      const task = item.preparationTasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.set(STORAGE_KEYS.SCHEDULE, schedule);

        const progress = this.getProgress();
        if (task.completed) {
          if (!progress.completedChecklistTasks.includes(taskId)) {
            progress.completedChecklistTasks.push(taskId);
          }
        } else {
          progress.completedChecklistTasks = progress.completedChecklistTasks.filter(id => id !== taskId);
        }
        this.saveProgress(progress);
      }
    }
    return schedule;
  }

  togglePreparationTask(scheduleId: string, taskId: string): ScheduleItem[] {
    return this.toggleChecklistTask(scheduleId, taskId);
  }

  // --- Announcements ---
  getAnnouncements(): Announcement[] {
    return this.get<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  createAnnouncement(announcement: Announcement): void {
    const list = this.getAnnouncements();
    list.unshift(announcement);
    this.set(STORAGE_KEYS.ANNOUNCEMENTS, list);

    this.addNotification({
      id: `notif_${Date.now()}`,
      title: announcement.title,
      message: announcement.content.substring(0, 100) + '...',
      time: 'Just now',
      type: 'announcement',
      linkTarget: { tab: 'announcements' },
      isRead: false
    });
  }

  // --- Notifications ---
  getNotifications(): NotificationItem[] {
    return this.get<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const notif = list.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      this.set(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }

  markAllNotificationsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, isRead: true }));
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  addNotification(notif: NotificationItem): void {
    const list = this.getNotifications();
    list.unshift(notif);
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // --- Files & Assets ---
  getFiles(): FileAsset[] {
    return this.get<FileAsset[]>(STORAGE_KEYS.FILES, INITIAL_FILES);
  }

  uploadFile(file: FileAsset): void {
    const list = this.getFiles();
    list.unshift(file);
    this.set(STORAGE_KEYS.FILES, list);
  }

  // --- Student Progress ---
  getProgress(): StudentProgress {
    return this.get<StudentProgress>(STORAGE_KEYS.PROGRESS, INITIAL_STUDENT_PROGRESS);
  }

  getStudentProgress(userId?: string): StudentProgress {
    return this.getProgress();
  }

  saveProgress(progress: StudentProgress): void {
    this.set(STORAGE_KEYS.PROGRESS, progress);
  }

  togglePracticalCompletion(userIdOrPracticalId: string, practicalIdParam?: string): StudentProgress {
    const practicalId = practicalIdParam || userIdOrPracticalId;
    const progress = this.getProgress();
    const isCompleted = progress.completedPracticals.includes(practicalId);
    if (isCompleted) {
      progress.completedPracticals = progress.completedPracticals.filter(id => id !== practicalId);
    } else {
      progress.completedPracticals.push(practicalId);
    }
    this.saveProgress(progress);
    return progress;
  }

  // --- Medical Practical Examination System ---
  getMedicalExams(): MedicalExam[] {
    const exams = this.get<MedicalExam[]>(STORAGE_KEYS.MEDICAL_EXAMS, MEDICAL_PRACTICAL_EXAMS);
    const questions = this.getExamQuestions();
    // Hydrate questions if not fully populated
    return exams.map(exam => ({
      ...exam,
      questions: exam.questions || questions.filter(q => exam.questionIds.includes(q.id))
    }));
  }

  getMedicalExamById(id: string): MedicalExam | undefined {
    const exams = this.getMedicalExams();
    return exams.find(e => e.id === id);
  }

  saveMedicalExam(exam: MedicalExam): void {
    const list = this.get<MedicalExam[]>(STORAGE_KEYS.MEDICAL_EXAMS, MEDICAL_PRACTICAL_EXAMS);
    const index = list.findIndex(e => e.id === exam.id);
    if (index >= 0) {
      list[index] = exam;
    } else {
      list.unshift(exam);
    }
    this.set(STORAGE_KEYS.MEDICAL_EXAMS, list);
  }

  deleteMedicalExam(id: string): void {
    const list = this.get<MedicalExam[]>(STORAGE_KEYS.MEDICAL_EXAMS, MEDICAL_PRACTICAL_EXAMS);
    const updated = list.filter(e => e.id !== id);
    this.set(STORAGE_KEYS.MEDICAL_EXAMS, updated);
  }

  // --- Exam Questions Bank (Teacher & System) ---
  getExamQuestions(labId?: LabSubjectId): ExamQuestion[] {
    const list = this.get<ExamQuestion[]>(STORAGE_KEYS.EXAM_QUESTIONS, PRACTICAL_EXAM_QUESTIONS);
    if (labId) {
      return list.filter(q => q.labId === labId);
    }
    return list;
  }

  getExamQuestionById(id: string): ExamQuestion | undefined {
    return this.getExamQuestions().find(q => q.id === id);
  }

  saveExamQuestion(question: ExamQuestion): void {
    const list = this.get<ExamQuestion[]>(STORAGE_KEYS.EXAM_QUESTIONS, PRACTICAL_EXAM_QUESTIONS);
    const index = list.findIndex(q => q.id === question.id);
    if (index >= 0) {
      list[index] = question;
    } else {
      list.unshift(question);
    }
    this.set(STORAGE_KEYS.EXAM_QUESTIONS, list);
  }

  deleteExamQuestion(id: string): void {
    const list = this.get<ExamQuestion[]>(STORAGE_KEYS.EXAM_QUESTIONS, PRACTICAL_EXAM_QUESTIONS);
    const updated = list.filter(q => q.id !== id);
    this.set(STORAGE_KEYS.EXAM_QUESTIONS, updated);
  }

  // --- Exam Attempts & Results History ---
  getExamAttempts(userId?: string): ExamAttempt[] {
    const list = this.get<ExamAttempt[]>(STORAGE_KEYS.EXAM_ATTEMPTS, []);
    if (userId) {
      return list.filter(a => a.userId === userId);
    }
    return list;
  }

  getExamAttemptById(id: string): ExamAttempt | undefined {
    return this.getExamAttempts().find(a => a.id === id);
  }

  recordExamAttempt(attempt: ExamAttempt): void {
    const list = this.get<ExamAttempt[]>(STORAGE_KEYS.EXAM_ATTEMPTS, []);
    list.unshift(attempt);
    this.set(STORAGE_KEYS.EXAM_ATTEMPTS, list);

    // Update student progress analytics
    const progress = this.getProgress();
    const allAttempts = this.getExamAttempts();
    if (allAttempts.length > 0) {
      const avg = Math.round(allAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / allAttempts.length);
      progress.averageScore = avg;

      // Update lab percentages based on exam performance
      const anatAttempts = allAttempts.filter(a => a.labId === 'anatomy');
      if (anatAttempts.length > 0) {
        progress.anatomyPercent = Math.min(100, Math.round(anatAttempts.reduce((a, c) => a + c.percentage, 0) / anatAttempts.length));
      }
      const histAttempts = allAttempts.filter(a => a.labId === 'histology');
      if (histAttempts.length > 0) {
        progress.histologyPercent = Math.min(100, Math.round(histAttempts.reduce((a, c) => a + c.percentage, 0) / histAttempts.length));
      }
      const biochemAttempts = allAttempts.filter(a => a.labId === 'biochemistry');
      if (biochemAttempts.length > 0) {
        progress.biochemistryPercent = Math.min(100, Math.round(biochemAttempts.reduce((a, c) => a + c.percentage, 0) / biochemAttempts.length));
      }
      this.saveProgress(progress);
    }
  }

  // --- Detailed Biochemistry Tests ---
  getBiochemistryTests(): BiochemistryTestDetail[] {
    return BIOCHEMISTRY_DETAILED_TESTS;
  }

  getBiochemistryTestById(id: string): BiochemistryTestDetail | undefined {
    return BIOCHEMISTRY_DETAILED_TESTS.find(t => t.id === id);
  }

  // Reset to default sample state
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.PRACTICALS);
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.SPOTTERS);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.FILES);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.MEDICAL_EXAMS);
    localStorage.removeItem(STORAGE_KEYS.EXAM_QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.EXAM_ATTEMPTS);
  }
}

export const storageService = new StorageService();
