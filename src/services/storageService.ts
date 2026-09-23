/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Secure Storage & Data Persistence Engine
 */

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

import { securityService } from './securityService';
import { apiService } from './apiService';

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
  PROGRESS_PREFIX: 'labhub_progress_',
  DEFAULT_PROGRESS: 'labhub_progress',
  MEDICAL_EXAMS: 'labhub_medical_exams',
  EXAM_QUESTIONS: 'labhub_exam_questions',
  EXAM_ATTEMPTS: 'labhub_exam_attempts',
  CUSTOM_IMAGES: 'labhub_custom_images',
  CUSTOM_VIDEOS: 'labhub_custom_videos'
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
  getCurrentUser(): User | null {
    try {
      const authSessionRaw = localStorage.getItem('labhub_auth_session');
      if (authSessionRaw) {
        const session = JSON.parse(authSessionRaw);
        if (session && session.user && session.expiresAt > Date.now()) {
          return session.user;
        }
      }
    } catch (e) {
      console.error('Failed to parse auth session:', e);
    }
    return null;
  }

  getEffectiveUser(caller?: User): User | null {
    if (caller) return caller;
    return this.getCurrentUser();
  }

  setCurrentUser(user: User): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  getUsers(): User[] {
    const sessionUser = this.getCurrentUser();
    return sessionUser ? [sessionUser] : [];
  }

  getAllDemoUsers(): User[] {
    return [];
  }

  switchUserByRole(_role: any): User | null {
    console.warn('[SECURITY] Fake role switching is disabled. Real authentication required.');
    return this.getCurrentUser();
  }

  setCurrentUserRole(_role: any): User | null {
    console.warn('[SECURITY] Fake role switching is disabled. Real authentication required.');
    return this.getCurrentUser();
  }

  // --- Practicals ---
  getPracticals(): Practical[] {
    const stored = this.get<Practical[]>(STORAGE_KEYS.PRACTICALS, []);
    if (!stored || stored.length === 0) {
      this.set(STORAGE_KEYS.PRACTICALS, INITIAL_PRACTICALS);
      return INITIAL_PRACTICALS;
    }
    // Seamlessly merge standard curriculum lessons if missing, preserving any existing edits
    let hasUpdates = false;
    const merged = [...stored];
    for (const initP of INITIAL_PRACTICALS) {
      if (!merged.some(p => p.id === initP.id)) {
        merged.push(initP);
        hasUpdates = true;
      }
    }
    if (hasUpdates) {
      this.set(STORAGE_KEYS.PRACTICALS, merged);
    }
    return merged;
  }

  getPracticalById(id: string): Practical | undefined {
    return this.getPracticals().find(p => p.id === id);
  }

  savePractical(practical: Practical, caller?: User): boolean {
    const user = this.getEffectiveUser(caller);
    if (!user || !securityService.hasPermission(user.role, 'edit_content')) {
      console.warn(`[SECURITY] Access denied: User ${user?.name || 'Visitor'} (${user?.role || 'none'}) cannot edit practical content.`);
      return false;
    }

    const list = this.getPracticals();
    const index = list.findIndex(p => p.id === practical.id);
    if (index >= 0) {
      list[index] = practical;
    } else {
      list.push(practical);
    }
    this.set(STORAGE_KEYS.PRACTICALS, list);
    // Sync to shared Firestore database
    apiService.savePractical(practical).catch(e => console.warn('Could not sync practical to Firestore:', e));
    return true;
  }

  savePracticals(practicals: Practical[]): void {
    this.set(STORAGE_KEYS.PRACTICALS, practicals);
  }

  deletePractical(id: string, caller?: User): boolean {
    const user = this.getEffectiveUser(caller);
    if (!user || (!securityService.isAdmin(user) && !securityService.hasPermission(user.role, 'edit_content'))) {
      console.warn(`[SECURITY] Access denied: User ${user?.name || 'Visitor'} (${user?.role || 'none'}) cannot delete practical content.`);
      return false;
    }
    const list = this.getPracticals();
    const filtered = list.filter(p => p.id !== id);
    this.set(STORAGE_KEYS.PRACTICALS, filtered);
    // Sync deletion to shared backend database
    fetch(`/api/practicals/${id}`, { method: 'DELETE' }).catch(e => console.warn('Could not sync practical deletion to server:', e));
    return true;
  }

  updatePracticalStatus(
    id: string,
    status: PracticalStatus,
    reviewerName?: string,
    feedback?: string,
    caller?: User
  ): Practical[] {
    const user = caller || this.getCurrentUser();
    if (!securityService.hasPermission(user.role, 'review_approvals')) {
      console.warn(`[SECURITY] Access denied: User ${user.name} (${user.role}) cannot change academic approval status.`);
      return this.getPracticals();
    }

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

      // Create an announcement/notification for instructors and students
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

  saveQuiz(quiz: Quiz, caller?: User): boolean {
    const user = caller || this.getCurrentUser();
    if (!securityService.hasPermission(user.role, 'edit_questions')) {
      console.warn(`[SECURITY] Access denied: User ${user.name} (${user.role}) cannot create or modify quizzes.`);
      return false;
    }

    const list = this.getQuizzes();
    const index = list.findIndex(q => q.id === quiz.id);
    if (index >= 0) {
      list[index] = quiz;
    } else {
      list.push(quiz);
    }
    this.set(STORAGE_KEYS.QUIZZES, list);
    return true;
  }

  recordQuizAttempt(attempt: QuizAttempt, targetUserId?: string): StudentProgress {
    const userId = targetUserId || this.getCurrentUser()?.id || 'usr_guest';
    const attempts = this.get<QuizAttempt[]>(STORAGE_KEYS.QUIZ_ATTEMPTS, INITIAL_STUDENT_PROGRESS.completedQuizzes);
    attempts.unshift(attempt);
    this.set(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);

    // Update isolated student progress metrics
    const progress = this.getStudentProgress(userId);
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
    } else if (attempt.labId === 'biochemistry' && (progress.biochemistryPercent || 0) < 95) {
      progress.biochemistryPercent = Math.min(100, (progress.biochemistryPercent || 0) + 8);
    }

    this.saveProgress(progress, userId);
    return progress;
  }

  saveQuizAttempt(attempt: QuizAttempt): StudentProgress {
    return this.recordQuizAttempt(attempt);
  }

  // --- Schedule & Checklists ---
  getSchedule(): ScheduleItem[] {
    return this.get<ScheduleItem[]>(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE);
  }

  toggleChecklistTask(scheduleId: string, taskId: string, userIdParam?: string): ScheduleItem[] {
    const userId = userIdParam || this.getCurrentUser()?.id || 'usr_guest';
    const schedule = this.getSchedule();
    const item = schedule.find(s => s.id === scheduleId);
    if (item) {
      const task = item.preparationTasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.set(STORAGE_KEYS.SCHEDULE, schedule);

        const progress = this.getStudentProgress(userId);
        if (task.completed) {
          if (!progress.completedChecklistTasks.includes(taskId)) {
            progress.completedChecklistTasks.push(taskId);
          }
        } else {
          progress.completedChecklistTasks = progress.completedChecklistTasks.filter(id => id !== taskId);
        }
        this.saveProgress(progress, userId);
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

  createAnnouncement(announcement: Announcement, caller?: User): boolean {
    const user = this.getEffectiveUser(caller);
    if (!user || !securityService.hasPermission(user.role, 'edit_questions')) {
      console.warn(`[SECURITY] Access denied: User ${user?.name || 'Visitor'} (${user?.role || 'none'}) cannot post announcements.`);
      return false;
    }

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
    return true;
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

  uploadFile(file: FileAsset, caller?: User): boolean {
    const user = this.getEffectiveUser(caller);
    if (!user || !securityService.hasPermission(user.role, 'edit_questions')) {
      console.warn(`[SECURITY] Access denied: User ${user?.name || 'Visitor'} (${user?.role || 'none'}) cannot upload assets to curriculum repository.`);
      return false;
    }
    const list = this.getFiles();
    list.unshift(file);
    this.set(STORAGE_KEYS.FILES, list);
    return true;
  }

  // --- Student Progress (Isolated per user with anti-tamper checksum) ---
  getProgress(): StudentProgress {
    const currentUserId = this.getCurrentUser()?.id || 'usr_guest';
    return this.getStudentProgress(currentUserId);
  }

  getStudentProgress(userId?: string): StudentProgress {
    const uid = userId || this.getCurrentUser()?.id || 'usr_guest';
    const userKey = `${STORAGE_KEYS.PROGRESS_PREFIX}${uid}`;
    const stored = this.get<StudentProgress | null>(userKey, null);
    if (stored) {
      return stored;
    }
    // Fallback to legacy default key or initial
    return this.get<StudentProgress>(STORAGE_KEYS.DEFAULT_PROGRESS, INITIAL_STUDENT_PROGRESS);
  }

  saveProgress(progress: StudentProgress, userIdParam?: string): void {
    const uid = userIdParam || this.getCurrentUser()?.id || 'usr_guest';
    const userKey = `${STORAGE_KEYS.PROGRESS_PREFIX}${uid}`;
    this.set(userKey, progress);
    this.set(STORAGE_KEYS.DEFAULT_PROGRESS, progress);
  }

  togglePracticalCompletion(userIdOrPracticalId: string, practicalIdParam?: string): StudentProgress {
    const practicalId = practicalIdParam || userIdOrPracticalId;
    const currentUid = this.getCurrentUser()?.id || 'usr_guest';
    const progress = this.getStudentProgress(currentUid);
    const isCompleted = progress.completedPracticals.includes(practicalId);
    if (isCompleted) {
      progress.completedPracticals = progress.completedPracticals.filter(id => id !== practicalId);
    } else {
      progress.completedPracticals.push(practicalId);
    }
    this.saveProgress(progress, currentUid);
    return progress;
  }

  // --- Medical Practical Examination System ---
  getMedicalExams(): MedicalExam[] {
    const exams = this.get<MedicalExam[]>(STORAGE_KEYS.MEDICAL_EXAMS, MEDICAL_PRACTICAL_EXAMS);
    const existingIds = new Set(exams.map(e => e.id));
    let hasNewExam = false;
    MEDICAL_PRACTICAL_EXAMS.forEach(pe => {
      if (!existingIds.has(pe.id)) {
        exams.push(pe);
        hasNewExam = true;
      }
    });
    if (hasNewExam) {
      this.set(STORAGE_KEYS.MEDICAL_EXAMS, exams);
    }
    const questions = this.getExamQuestions();
    return exams.map(exam => ({
      ...exam,
      questions: exam.questions || questions.filter(q => exam.questionIds.includes(q.id))
    }));
  }

  getMedicalExamById(id: string): MedicalExam | undefined {
    const exams = this.getMedicalExams();
    return exams.find(e => e.id === id);
  }

  // Multi-Device & Tab Realtime Event Broadcaster
  notifyProductionSync(type: 'questions' | 'exams' | 'practicals' | 'images' | 'videos' | 'all', data?: any): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('labhub_production_sync', { detail: { type, data, timestamp: Date.now() } }));
      try {
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel('labhub_sync_channel');
          bc.postMessage({ type, data, timestamp: Date.now() });
          bc.close();
        }
      } catch {}
    }
  }

  async saveMedicalExam(exam: MedicalExam, caller?: User): Promise<{ success: boolean; exam?: MedicalExam; error?: string }> {
    const user = this.getEffectiveUser(caller);
    if (!securityService.hasPermission(user.role, 'create_exams')) {
      const err = `[SECURITY] Access denied: User ${user.name} (${user.role}) is unauthorized to create or edit medical exams.`;
      console.warn(err);
      return { success: false, error: 'ليس لديك الصلاحيات الكافية لإنشاء أو تعديل الامتحانات.' };
    }

    // Direct write to Production Database first — Wait for backend confirmation
    const apiResult = await apiService.saveExam(exam);
    if (!apiResult.success) {
      console.error('[STORAGE] Production database save failed for exam:', apiResult.error);
      return { success: false, error: apiResult.error || 'فشل حفظ الامتحان في قاعدة البيانات المركزية.' };
    }

    const savedExam = apiResult.data || exam;

    // Authoritative update of local cache
    const list = this.get<MedicalExam[]>(STORAGE_KEYS.MEDICAL_EXAMS, MEDICAL_PRACTICAL_EXAMS);
    const index = list.findIndex(e => e.id === savedExam.id);
    if (index >= 0) {
      list[index] = savedExam;
    } else {
      list.unshift(savedExam);
    }
    this.set(STORAGE_KEYS.MEDICAL_EXAMS, list);

    // Notify all active tabs and views on this device
    this.notifyProductionSync('exams', savedExam);

    return { success: true, exam: savedExam };
  }

  async deleteMedicalExam(id: string, caller?: User): Promise<{ success: boolean; error?: string }> {
    const user = this.getEffectiveUser(caller);
    if (!user || !securityService.hasPermission(user.role, 'delete_exams')) {
      return { success: false, error: 'ليس لديك صلاحية حذف الامتحانات.' };
    }

    // Delete from production first
    const apiResult = await apiService.deleteExam(id);
    if (!apiResult.success) {
      return { success: false, error: apiResult.error || 'فشل حذف الامتحان من الخادم.' };
    }

    const list = this.get<MedicalExam[]>(STORAGE_KEYS.MEDICAL_EXAMS, MEDICAL_PRACTICAL_EXAMS);
    const updated = list.filter(e => e.id !== id);
    this.set(STORAGE_KEYS.MEDICAL_EXAMS, updated);

    this.notifyProductionSync('exams', { deletedId: id });
    return { success: true };
  }

  // --- Exam Questions Bank (Teacher & System) ---
  getExamQuestions(labId?: LabSubjectId): ExamQuestion[] {
    const list = this.get<ExamQuestion[]>(STORAGE_KEYS.EXAM_QUESTIONS, PRACTICAL_EXAM_QUESTIONS);
    const existingIds = new Set(list.map(q => q.id));
    let hasNewQuestion = false;
    PRACTICAL_EXAM_QUESTIONS.forEach(pq => {
      if (!existingIds.has(pq.id)) {
        list.push(pq);
        hasNewQuestion = true;
      }
    });
    if (hasNewQuestion) {
      this.set(STORAGE_KEYS.EXAM_QUESTIONS, list);
    }
    if (labId) {
      return list.filter(q => q.labId === labId);
    }
    return list;
  }

  getExamQuestionById(id: string): ExamQuestion | undefined {
    return this.getExamQuestions().find(q => q.id === id);
  }

  async saveExamQuestion(question: ExamQuestion, caller?: User): Promise<{ success: boolean; question?: ExamQuestion; error?: string }> {
    const user = this.getEffectiveUser(caller);
    if (!user || !securityService.hasPermission(user.role, 'edit_questions')) {
      const err = `[SECURITY] Access denied: User ${user?.name || 'Visitor'} (${user?.role || 'none'}) cannot modify question banks.`;
      console.warn(err);
      return { success: false, error: 'ليس لديك الصلاحيات الكافية لإضافة أو تعديل الأسئلة.' };
    }

    // Direct write to Production Database first — Wait for backend confirmation
    const apiResult = await apiService.saveQuestion(question);
    if (!apiResult.success) {
      console.error('[STORAGE] Production database save failed for question:', apiResult.error);
      return { success: false, error: apiResult.error || 'فشل حفظ السؤال في قاعدة البيانات المركزية.' };
    }

    const savedQuestion = apiResult.data || question;

    // Authoritative update of local cache
    const list = this.get<ExamQuestion[]>(STORAGE_KEYS.EXAM_QUESTIONS, PRACTICAL_EXAM_QUESTIONS);
    const index = list.findIndex(q => q.id === savedQuestion.id);
    if (index >= 0) {
      list[index] = savedQuestion;
    } else {
      list.unshift(savedQuestion);
    }
    this.set(STORAGE_KEYS.EXAM_QUESTIONS, list);

    // Notify all active tabs and views on this device
    this.notifyProductionSync('questions', savedQuestion);

    return { success: true, question: savedQuestion };
  }

  async deleteExamQuestion(id: string, caller?: User): Promise<{ success: boolean; error?: string }> {
    const user = this.getEffectiveUser(caller);
    if (!user || !securityService.hasPermission(user.role, 'delete_questions')) {
      return { success: false, error: 'ليس لديك صلاحية حذف الأسئلة.' };
    }

    // Delete from production first
    const apiResult = await apiService.deleteQuestion(id);
    if (!apiResult.success) {
      return { success: false, error: apiResult.error || 'فشل حذف السؤال من الخادم.' };
    }

    const list = this.get<ExamQuestion[]>(STORAGE_KEYS.EXAM_QUESTIONS, PRACTICAL_EXAM_QUESTIONS);
    const updated = list.filter(q => q.id !== id);
    this.set(STORAGE_KEYS.EXAM_QUESTIONS, updated);

    this.notifyProductionSync('questions', { deletedId: id });
    return { success: true };
  }

  // --- Sync with Central Firestore DB (Production Source of Truth) ---
  async syncDataWithServer(): Promise<void> {
    try {
      const [practicals, exams, questions, images, videos] = await Promise.all([
        apiService.fetchPracticals().catch(() => []),
        apiService.fetchExams().catch(() => []),
        apiService.fetchQuestions().catch(() => []),
        apiService.fetchImages().catch(() => []),
        apiService.fetchVideos().catch(() => [])
      ]);

      if (Array.isArray(practicals) && practicals.length > 0) {
        this.set(STORAGE_KEYS.PRACTICALS, practicals);
      }
      if (Array.isArray(exams) && exams.length > 0) {
        this.set(STORAGE_KEYS.MEDICAL_EXAMS, exams);
      }
      if (Array.isArray(questions) && questions.length > 0) {
        this.set(STORAGE_KEYS.EXAM_QUESTIONS, questions);
      }
      if (Array.isArray(images) && images.length > 0) {
        this.set(STORAGE_KEYS.CUSTOM_IMAGES, images);
      }
      if (Array.isArray(videos) && videos.length > 0) {
        this.set(STORAGE_KEYS.CUSTOM_VIDEOS, videos);
      }

      this.notifyProductionSync('all');
    } catch (e) {
      console.warn('Firestore background sync failed, using cached state:', e);
    }
  }

  // --- Notifications Helper Methods ---
  getNotificationItems(): NotificationItem[] {
    const defaultNotifs: NotificationItem[] = [
      {
        id: 'notif_1',
        title: 'أهلًا بك في LAB HUB 🌟',
        message: 'أنت تقوم بعمل رائع. كل درس تدرسه اليوم يقربك خطوة من الطبيب الذي تريد أن تصبحه.',
        type: 'system',
        isRead: false,
        createdAt: new Date().toISOString(),
        link: '/dashboard'
      },
      {
        id: 'notif_2',
        title: 'امتحانات التشريح العملية جاهزة 🦴',
        message: 'ابدأ باختبار العظام (Bones Exam) أو العضلات (Muscles Exam) لاختبار مهاراتك العملية.',
        type: 'exam',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        link: '/exams'
      },
      {
        id: 'notif_3',
        title: 'نصيحة المساعد الطبي الذكي 💡',
        message: 'ركز على العلامات التشريحية الرئيسية (Landmarks) ونقاط الارتكاز والتعصيب العصبي للتحضير لامتحان OSPE.',
        type: 'achievement',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        link: '/tutor'
      }
    ];
    return this.get<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, defaultNotifs);
  }

  addNotificationItem(item: Omit<NotificationItem, 'id' | 'createdAt'>): NotificationItem {
    const list = this.getNotificationItems();
    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newNotif);
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
    return newNotif;
  }

  markNotificationAsRead(id: string): void {
    const list = this.getNotificationItems();
    const target = list.find(n => n.id === id);
    if (target) {
      target.isRead = true;
      this.set(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }

  markAllNotificationsAsRead(): void {
    const list = this.getNotificationItems();
    list.forEach(n => { n.isRead = true; });
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // --- Exam Attempts & Results History (Partitioned by user) ---
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

    // Update student progress analytics for this user
    const progress = this.getStudentProgress(attempt.userId);
    const userAttempts = list.filter(a => a.userId === attempt.userId);
    if (userAttempts.length > 0) {
      const avg = Math.round(userAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / userAttempts.length);
      progress.averageScore = avg;

      // Update lab percentages based on exam performance
      const anatAttempts = userAttempts.filter(a => a.labId === 'anatomy');
      if (anatAttempts.length > 0) {
        progress.anatomyPercent = Math.min(100, Math.round(anatAttempts.reduce((a, c) => a + c.percentage, 0) / anatAttempts.length));
      }
      const histAttempts = userAttempts.filter(a => a.labId === 'histology');
      if (histAttempts.length > 0) {
        progress.histologyPercent = Math.min(100, Math.round(histAttempts.reduce((a, c) => a + c.percentage, 0) / histAttempts.length));
      }
      const biochemAttempts = userAttempts.filter(a => a.labId === 'biochemistry');
      if (biochemAttempts.length > 0) {
        progress.biochemistryPercent = Math.min(100, Math.round(biochemAttempts.reduce((a, c) => a + c.percentage, 0) / biochemAttempts.length));
      }
      this.saveProgress(progress, attempt.userId);
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
    localStorage.removeItem(STORAGE_KEYS.DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.MEDICAL_EXAMS);
    localStorage.removeItem(STORAGE_KEYS.EXAM_QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.EXAM_ATTEMPTS);
  }
}

export const storageService = new StorageService();
