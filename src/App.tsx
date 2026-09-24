/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Main Application Orchestrator & View Controller
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  LabSubjectId,
  Practical,
  Quiz,
  QuizAttempt,
  ApprovalWorkflowState,
  ScheduleItem,
  MedicalExam,
  ExamAttempt
} from './types';
import { storageService } from './services/storageService';
import { authService } from './services/authService';
import { securityService } from './services/securityService';
import { LAB_SUBJECTS } from './data/mockData';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { PlatformFooter } from './components/common/PlatformFooter';

// View Components
import { DashboardView } from './components/dashboard/DashboardView';
import { LabSubjectPage } from './components/labs/LabSubjectPage';
import { LaboratoriesHubPage } from './components/labs/LaboratoriesHubPage';
import { PracticalDetailPage } from './components/practicals/PracticalDetailPage';
import { PracticalsListPage } from './components/practicals/PracticalsListPage';
import { SpotterView } from './components/spotter/SpotterView';
import { QuizzesOverviewPage } from './components/quiz/QuizzesOverviewPage';
import { QuizRunner } from './components/quiz/QuizRunner';
import { ProgressPage } from './components/progress/ProgressPage';
import { StudentProfilePage } from './components/profile/StudentProfilePage';
import { SchedulePage } from './components/schedule/SchedulePage';
import { AcademicApprovalHub } from './components/academic/AcademicApprovalHub';

// Exam System Components
import { AvailableExamsPage } from './components/exam/AvailableExamsPage';
import { PracticalExamRunner } from './components/exam/PracticalExamRunner';
import { ExamResultReviewPage } from './components/exam/ExamResultReviewPage';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { BiochemistryDetailsModal } from './components/labs/biochemistry/BiochemistryDetailsModal';

// Interactive Modules
import { VirtualHistologyViewer } from './components/interactive/VirtualHistologyViewer';
import { McqQuestionBank } from './components/quiz/McqQuestionBank';
import { EducationalVideosSection } from './components/video/EducationalVideosSection';
import { AnatomicalPlanesInteractiveView } from './components/labs/anatomy/AnatomicalPlanesInteractiveView';
import { AnatomyMovementsAndJointsViewer } from './components/labs/anatomy/AnatomyMovementsAndJointsViewer';
import { BiochemistryPathwaysViewer } from './components/labs/biochemistry/BiochemistryPathwaysViewer';
import { FirstYearMedicalVisualMap } from './components/visualMap/FirstYearMedicalVisualMap';

// Mandatory Account System & Administration
import { AuthPage } from './components/auth/AuthPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals & Security
import { AiLabTutorModal } from './components/ai/AiLabTutorModal';
import { AnnouncementsModal } from './components/announcements/AnnouncementsModal';
import { StudentPortalModal } from './components/share/StudentPortalModal';
import { AboutPlatformModal } from './components/about/AboutPlatformModal';
import { SecurityAuditModal } from './components/security/SecurityAuditModal';
import { WelcomeExperienceModal } from './components/common/WelcomeExperienceModal';

// Interactive Study Companion ("لبيب" / Labeeb)
import { LabHubCompanion } from './components/companion/LabHubCompanion';
import { companionService } from './components/companion/companionStore';

export default function App() {
  // Application State - Strictly Enforced Authentication & Loading Guard
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      return authService.getCurrentUser();
    } catch {
      return null;
    }
  });
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>(() => storageService.getUsers());
  const [progress, setProgress] = useState(() => storageService.getStudentProgress(currentUser?.id));
  const [schedule, setSchedule] = useState(() => storageService.getSchedule());
  const [practicals, setPracticals] = useState<Practical[]>(() => storageService.getPracticals());
  const [spotters, setSpotters] = useState(() => storageService.getSpotters());
  const [quizzes, setQuizzes] = useState(() => storageService.getQuizzes());
  const [announcements, setAnnouncements] = useState(() => storageService.getAnnouncements());
  const [notifications, setNotifications] = useState(() => storageService.getNotifications());

  // Resolve session and synchronize with shared production database
  useEffect(() => {
    let isMounted = true;

    const performSync = async () => {
      try {
        await storageService.syncDataWithServer();
        if (isMounted) {
          setPracticals(storageService.getPracticals());
          setNotifications(storageService.getNotifications());
        }
      } catch (err) {
        console.warn('Sync attempt failed:', err);
      }
    };

    try {
      const user = authService.getCurrentUser();
      setCurrentUser(user);
      if (user?.id) {
        setProgress(storageService.getStudentProgress(user.id));
      }
      performSync();
    } catch (e) {
      console.warn('Session verification fallback:', e);
      setCurrentUser(null);
    } finally {
      setIsAuthLoading(false);
    }

    // High-responsiveness sync for live cross-device and multi-account updates
    const interval = setInterval(performSync, 10000);
    const handleFocus = () => { performSync(); };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        performSync();
      }
    };
    const handleProductionSync = () => {
      if (isMounted) {
        setPracticals(storageService.getPracticals());
        setNotifications(storageService.getNotifications());
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('labhub_production_sync', handleProductionSync);

    let bc: BroadcastChannel | null = null;
    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel('labhub_sync_channel');
        bc.onmessage = () => {
          if (isMounted) {
            setPracticals(storageService.getPracticals());
            setNotifications(storageService.getNotifications());
          }
        };
      }
    } catch {}

    // Real-time Firestore sync with central collections (/lessons, /slides)
    let unsubLessons: (() => void) | null = null;
    let unsubSlides: (() => void) | null = null;
    try {
      unsubLessons = onSnapshot(collection(db, 'lessons'), (snap) => {
        if (!isMounted) return;
        const list: Practical[] = [];
        snap.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as Practical);
        });
        if (list.length > 0) {
          setPracticals(list);
          try {
            localStorage.setItem('labhub_medical_practicals', JSON.stringify(list));
          } catch {}
        }
      }, (err) => {
        console.warn('Realtime lessons listener error:', err);
      });

      unsubSlides = onSnapshot(collection(db, 'slides'), (snap) => {
        if (!isMounted) return;
        const slidesList: any[] = [];
        snap.forEach((d) => {
          slidesList.push({ id: d.id, ...d.data() });
        });
        if (slidesList.length > 0) {
          try {
            localStorage.setItem('labhub_managed_images', JSON.stringify(slidesList));
          } catch {}
          // Update practicals to reflect any slide updates
          setPracticals(storageService.getPracticals());
        }
      }, (err) => {
        console.warn('Realtime slides listener error:', err);
      });
    } catch (e) {
      console.warn('Could not attach Firestore realtime listeners:', e);
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (unsubLessons) unsubLessons();
      if (unsubSlides) unsubSlides();
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('labhub_production_sync', handleProductionSync);
      if (bc) {
        try { bc.close(); } catch {}
      }
    };
  }, []);

  // Parse initial tab from URL hash or path
  const getInitialTabState = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      const path = window.location.pathname.replace('/', '').trim().toLowerCase();
      const target = hash || path;

      if (target.startsWith('admin/') || target === 'admin' || target === 'admin_dashboard') {
        return 'admin';
      }

      const validTabs = [
        'dashboard',
        'laboratories',
        'anatomy',
        'histology',
        'biochemistry',
        'medical_exams',
        'teacher_dashboard',
        'biochemistry_guide',
        'practicals',
        'spotters',
        'quizzes',
        'schedule',
        'progress',
        'profile',
        'academic_approval',
        'histology_microscope',
        'mcq_bank',
        'educational_videos',
        'interactive_planes',
        'anatomy_movements',
        'biochemistry_pathways',
        'visual_map',
        'anatomy_histology_map',
        'visual_atlas',
        'admin',
        'admin_dashboard'
      ];
      if (validTabs.includes(target)) {
        return target;
      }
    } catch {
      // Fallback
    }
    return 'dashboard';
  };

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>(getInitialTabState);
  const [selectedLabId, setSelectedLabId] = useState<LabSubjectId | null>(() => {
    const initial = getInitialTabState();
    if (['anatomy', 'histology', 'biochemistry'].includes(initial)) {
      return initial as LabSubjectId;
    }
    return null;
  });
  const [selectedPracticalId, setSelectedPracticalId] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Medical Exam System State
  const [activeMedicalExam, setActiveMedicalExam] = useState<MedicalExam | null>(null);
  const [completedExamAttempt, setCompletedExamAttempt] = useState<ExamAttempt | null>(null);

  // Biochemistry Guide Modal State
  const [isBiochemistryModalOpen, setIsBiochemistryModalOpen] = useState(false);
  const [selectedBiochemistryTestId, setSelectedBiochemistryTestId] = useState<string | undefined>(undefined);

  // Modals & Security System State
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSecurityAuditOpen, setIsSecurityAuditOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const target = getInitialTabState();
      if (['anatomy', 'histology', 'biochemistry'].includes(target)) {
        setSelectedLabId(target as LabSubjectId);
      }
      setSelectedPracticalId(null);
      setActiveQuiz(null);
      setCurrentTab(target);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Update hash when tab changes
  const updateTabWithHash = (newTab: string) => {
    try {
      if (window.location.hash.replace('#', '') !== newTab) {
        window.history.replaceState(null, '', `#${newTab}`);
      }
    } catch {
      // Ignore in restricted environments
    }
  };

  // Sync user progress whenever currentUser changes
  useEffect(() => {
    if (currentUser?.id) {
      setProgress(storageService.getStudentProgress(currentUser.id));
    }
  }, [currentUser?.id]);

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setCurrentTab('dashboard');
    window.location.hash = '';
  };

  const handleUserChange = (newUser: User) => {
    storageService.setCurrentUser(newUser);
    setCurrentUser(newUser);
    setProgress(storageService.getStudentProgress(newUser.id));
  };

  const handleMarkNotificationRead = (id: string) => {
    storageService.markNotificationRead(id);
    setNotifications(storageService.getNotifications());
  };

  const handleMarkAllNotificationsRead = () => {
    storageService.markAllNotificationsRead();
    setNotifications(storageService.getNotifications());
  };

  const handleSelectLab = (labId: LabSubjectId) => {
    if (currentUser) {
      authService.trackActivity(`فتح مختبر: ${labId.toUpperCase()}`, labId);
    }
    setSelectedLabId(labId);
    setSelectedPracticalId(null);
    setActiveQuiz(null);
    setCurrentTab(labId);
    updateTabWithHash(labId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPractical = (labId: string, practicalId: string) => {
    if (currentUser) {
      authService.trackActivity(`فتح الدرس العملي: ${practicalId}`, labId);
    }
    companionService.enterLesson();
    setSelectedLabId(labId as LabSubjectId);
    setSelectedPracticalId(practicalId);
    setActiveQuiz(null);
    setCurrentTab('practical_detail');
    updateTabWithHash('practical_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSpotter = (labId: LabSubjectId) => {
    if (currentUser) {
      authService.trackActivity(`بدء فحص الشرائح (Spotters): ${labId}`, labId);
    }
    companionService.say('ركزي في تفاصيل الشريحة... أنتِ قادرة!', 'thinking', 5000);
    setSelectedLabId(labId);
    setCurrentTab('spotters');
    updateTabWithHash('spotters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuiz = (labId: LabSubjectId, practicalId?: string) => {
    if (currentUser) {
      authService.trackActivity(`بدء اختبار قصير: ${labId}`, labId);
    }
    companionService.startExam();
    let targetQuiz: Quiz | undefined;
    if (practicalId) {
      targetQuiz = quizzes.find(q => q.practicalId === practicalId);
    }
    if (!targetQuiz) {
      targetQuiz = quizzes.find(q => q.labId === labId) || quizzes[0];
    }

    if (targetQuiz) {
      setActiveQuiz(targetQuiz);
      setCurrentTab('quiz_runner');
      updateTabWithHash('quiz_runner');
    } else {
      setCurrentTab('quizzes');
      updateTabWithHash('quizzes');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePracticalComplete = (practicalId: string) => {
    if (!currentUser) return;
    const isNowCompleted = !progress.completedPracticals.includes(practicalId);
    const updated = storageService.togglePracticalCompletion(currentUser.id, practicalId);
    setProgress(updated);
    if (isNowCompleted) {
      companionService.completeLesson();
    }
    authService.trackActivity(`تحديث إنجاز عملي: ${practicalId}`, 'Practicals');
  };

  const handleTogglePreparationTask = (scheduleId: string, taskId: string) => {
    const updatedSchedule = storageService.togglePreparationTask(scheduleId, taskId);
    setSchedule(updatedSchedule);
  };

  const handleCompleteQuizAttempt = (attempt: QuizAttempt) => {
    const updatedProgress = storageService.saveQuizAttempt(attempt);
    setProgress(updatedProgress);
    if (attempt.percentage >= 70) {
      companionService.completeExam(attempt.percentage);
    } else {
      companionService.incorrectAnswer();
    }
    if (currentUser) {
      authService.trackActivity(
        `إكمال اختبار قصير: ${attempt.labId}`,
        attempt.labId,
        `النتيجة: ${attempt.percentage}%`
      );
    }
  };

  const handleUpdatePracticalStatus = (
    practicalId: string,
    status: ApprovalWorkflowState,
    comment?: string
  ) => {
    if (!currentUser) return;
    const updated = storageService.updatePracticalStatus(
      practicalId,
      status,
      currentUser.name,
      comment,
      currentUser
    );
    setPracticals(updated);
  };

  const handleStartMedicalExam = (exam: MedicalExam) => {
    if (currentUser) {
      authService.trackActivity(`بدء امتحان OSPE عملي: ${exam.title}`, 'OSPE', `Exam: ${exam.id}`);
    }
    setActiveMedicalExam(exam);
    setCompletedExamAttempt(null);
    setCurrentTab('exam_runner');
    updateTabWithHash('exam_runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLabExam = (labId: LabSubjectId) => {
    const exams = storageService.getMedicalExams();
    const labExam = exams.find(e => e.labId === labId) || exams[0];
    handleStartMedicalExam(labExam);
  };

  const handleCompleteMedicalExam = (attempt: ExamAttempt) => {
    setCompletedExamAttempt(attempt);
    if (currentUser) {
      setProgress(storageService.getStudentProgress(currentUser.id));
      authService.trackActivity(
        `تسليم امتحان OSPE: ${attempt.examTitle}`,
        'OSPE',
        `النتيجة: ${attempt.percentage}% (${attempt.passed ? 'ناجح' : 'راسب'})`
      );
    }
    setCurrentTab('exam_result');
    updateTabWithHash('exam_result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBiochemistryGuide = (testId?: string) => {
    setSelectedBiochemistryTestId(testId);
    setIsBiochemistryModalOpen(true);
    if (currentUser) {
      authService.trackActivity('فتح دليل الفحوصات الكيميائية', 'biochemistry');
    }
  };

  const handleTabSelect = (tab: string) => {
    if (currentUser) {
      authService.trackActivity(`تصفح قسم: ${tab}`, tab);
    }
    if (['anatomy', 'histology', 'biochemistry'].includes(tab)) {
      handleSelectLab(tab as LabSubjectId);
      return;
    }

    if (tab === 'biochemistry_guide') {
      setIsBiochemistryModalOpen(true);
      return;
    }

    // Role-based route guard: Students are never routed to admin panel
    if (tab.startsWith('admin') && currentUser && !securityService.isStaff(currentUser)) {
      setCurrentTab('dashboard');
      updateTabWithHash('dashboard');
      return;
    }

    setSelectedPracticalId(null);
    setActiveQuiz(null);
    setCurrentTab(tab);
    updateTabWithHash(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSelect = (result: { type: string; id: string; labId?: string }) => {
    if (result.type === 'lab' && result.labId) {
      handleSelectLab(result.labId as LabSubjectId);
    } else if (result.type === 'practical' && result.labId) {
      handleOpenPractical(result.labId, result.id);
    } else if (result.type === 'quiz') {
      const q = quizzes.find(item => item.id === result.id);
      if (q) {
        setActiveQuiz(q);
        setCurrentTab('quiz_runner');
      }
    }
  };

  // Find currently selected practical if in practical_detail view
  const currentPractical = selectedPracticalId
    ? practicals.find(p => p.id === selectedPracticalId)
    : undefined;

  // View routing
  const renderCurrentView = () => {
    // 1. Specific Lab Subjects
    if (['anatomy', 'histology', 'biochemistry'].includes(currentTab)) {
      const labInfo = LAB_SUBJECTS.find(l => l.id === currentTab) || LAB_SUBJECTS[0];
      const labPracticals = practicals.filter(p => p.courseId === currentTab);

      return (
        <LabSubjectPage
          labInfo={labInfo}
          practicals={labPracticals}
          onOpenPractical={handleOpenPractical}
          onOpenSpotter={handleOpenSpotter}
          onOpenQuiz={handleOpenQuiz}
          onBackToDashboard={() => handleTabSelect('dashboard')}
        />
      );
    }

    // 2. Practical Detail View
    if (currentTab === 'practical_detail' && currentPractical) {
      return (
        <PracticalDetailPage
          practical={currentPractical}
          progress={progress}
          onToggleComplete={handleTogglePracticalComplete}
          onOpenQuiz={handleOpenQuiz}
          onOpenSpotter={handleOpenSpotter}
          onBack={() => {
            if (selectedLabId) {
              handleSelectLab(selectedLabId);
            } else {
              setCurrentTab('practicals');
            }
          }}
        />
      );
    }

    // 3. Quiz Runner View
    if (currentTab === 'quiz_runner' && activeQuiz) {
      return (
        <QuizRunner
          quiz={activeQuiz}
          userId={currentUser?.id || 'guest_student'}
          onCompleteQuiz={handleCompleteQuizAttempt}
          onBack={() => {
            if (selectedLabId) {
              handleSelectLab(selectedLabId);
            } else {
              setCurrentTab('quizzes');
            }
          }}
        />
      );
    }

    // 4. Primary Tabs
    switch (currentTab) {
      case 'medical_exams':
        return (
          <AvailableExamsPage
            onStartExam={handleStartMedicalExam}
            onOpenLab={handleSelectLab}
            onOpenTeacherDashboard={() => handleTabSelect('teacher_dashboard')}
          />
        );

      case 'exam_runner':
        if (!activeMedicalExam) {
          return (
            <AvailableExamsPage
              onStartExam={handleStartMedicalExam}
              onOpenLab={handleSelectLab}
              onOpenTeacherDashboard={() => handleTabSelect('teacher_dashboard')}
            />
          );
        }
        return (
          <PracticalExamRunner
            exam={activeMedicalExam}
            currentUser={currentUser}
            onComplete={handleCompleteMedicalExam}
            onExit={() => handleTabSelect('medical_exams')}
          />
        );

      case 'exam_result':
        if (!completedExamAttempt) {
          return (
            <AvailableExamsPage
              onStartExam={handleStartMedicalExam}
              onOpenLab={handleSelectLab}
              onOpenTeacherDashboard={() => handleTabSelect('teacher_dashboard')}
            />
          );
        }
        return (
          <ExamResultReviewPage
            attempt={completedExamAttempt}
            onRetakeExam={() => {
              const exam = storageService.getMedicalExams().find(e => e.id === completedExamAttempt.examId) || storageService.getMedicalExams()[0];
              handleStartMedicalExam(exam);
            }}
            onBackToExams={() => handleTabSelect('medical_exams')}
            onReturnDashboard={() => handleTabSelect('dashboard')}
          />
        );

      case 'teacher_dashboard':
        return (
          <TeacherDashboard
            currentUser={currentUser}
            onPreviewExam={handleStartMedicalExam}
          />
        );

      case 'laboratories':
        return (
          <LaboratoriesHubPage
            onSelectLab={handleSelectLab}
            practicals={practicals}
            progress={progress}
          />
        );

      case 'practicals':
        return (
          <PracticalsListPage
            practicals={practicals}
            progress={progress}
            onOpenPractical={handleOpenPractical}
          />
        );

      case 'spotters':
        return (
          <SpotterView
            spotters={spotters}
            selectedLabId={selectedLabId || undefined}
            onBack={() => setCurrentTab('dashboard')}
          />
        );

      case 'quizzes':
        return (
          <QuizzesOverviewPage
            quizzes={quizzes}
            progress={progress}
            onStartQuiz={quiz => {
              setActiveQuiz(quiz);
              setCurrentTab('quiz_runner');
            }}
          />
        );

      case 'schedule':
        return (
          <SchedulePage
            schedule={schedule}
            onOpenPractical={handleOpenPractical}
          />
        );

      case 'progress':
        return (
          <ProgressPage
            progress={progress}
            currentUser={currentUser}
            onOpenPractical={handleOpenPractical}
          />
        );

      case 'profile':
        return (
          <StudentProfilePage
            currentUser={currentUser}
            progress={progress}
            onSelectLab={handleSelectLab}
            onSelectTab={handleTabSelect}
          />
        );

      case 'academic_approval':
        return (
          <AcademicApprovalHub
            currentUser={currentUser}
            practicals={practicals}
            onUpdatePracticalStatus={handleUpdatePracticalStatus}
            onViewPractical={handleOpenPractical}
          />
        );

      case 'histology_microscope':
        return (
          <div className="animate-in fade-in duration-300">
            <VirtualHistologyViewer />
          </div>
        );

      case 'mcq_bank':
        return (
          <div className="animate-in fade-in duration-300">
            <McqQuestionBank onBackToHub={() => handleTabSelect('dashboard')} />
          </div>
        );

      case 'educational_videos':
        return (
          <div className="animate-in fade-in duration-300">
            <EducationalVideosSection />
          </div>
        );

      case 'interactive_planes':
        return (
          <div className="animate-in fade-in duration-300">
            <AnatomicalPlanesInteractiveView onBack={() => handleTabSelect('dashboard')} />
          </div>
        );

      case 'anatomy_movements':
        return (
          <div className="animate-in fade-in duration-300">
            <AnatomyMovementsAndJointsViewer onBack={() => handleTabSelect('dashboard')} />
          </div>
        );

      case 'biochemistry_pathways':
        return (
          <div className="animate-in fade-in duration-300">
            <BiochemistryPathwaysViewer onBack={() => handleTabSelect('dashboard')} />
          </div>
        );

      case 'visual_map':
      case 'anatomy_histology_map':
      case 'visual_atlas':
        return (
          <div className="animate-in fade-in duration-300">
            <FirstYearMedicalVisualMap onBack={() => handleTabSelect('dashboard')} />
          </div>
        );

      case 'admin':
      case 'admin_dashboard': {
        const isAuthorizedAdmin = securityService.isStaff(currentUser);

        if (process.env.NODE_ENV !== 'production') {
          console.log('[AUTH DIAGNOSTIC]', {
            authenticatedUID: currentUser?.id,
            authenticatedEmail: currentUser?.email,
            detectedRole: currentUser?.role,
            authorizationResult: isAuthorizedAdmin ? 'AUTHORIZED_ADMIN' : 'DENIED',
            source: 'securityService.isStaff'
          });
        }

        if (!isAuthorizedAdmin) {
          return (
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center space-y-4 max-w-lg mx-auto my-12">
              <h2 className="text-xl font-bold text-amber-900">غير مصرح بالدخول</h2>
              <p className="text-sm text-amber-700">هذا القسم مخصص لإدارة الكلية والعمادة فقط (Admin Role).</p>
              <button
                type="button"
                onClick={() => handleTabSelect('dashboard')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                العودة للرئيسية
              </button>
            </div>
          );
        }
        return (
          <div className="animate-in fade-in duration-300">
            <AdminDashboard
              currentUser={currentUser}
              onSelectLab={handleSelectLab}
              onOpenPractical={handleOpenPractical}
              onReturnToStudent={() => handleTabSelect('dashboard')}
            />
          </div>
        );
      }

      case 'dashboard':
      default:
        return (
          <DashboardView
            currentUser={currentUser}
            progress={progress}
            schedule={schedule}
            announcements={announcements}
            onSelectLab={handleSelectLab}
            onStartLabExam={handleStartLabExam}
            onOpenPractical={handleOpenPractical}
            onSelectTab={handleTabSelect}
            onToggleTask={handleTogglePreparationTask}
            onOpenAnnouncements={() => setIsAnnouncementsOpen(true)}
            onOpenAiTutor={() => setIsAiTutorOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
          />
        );
    }
  };

  // Staff authorization check
  const isStaff = securityService.isStaff(currentUser);

  // Authentication Loading Screen
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center text-slate-100 p-4">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
            LH
          </div>
        </div>
        <div className="text-base font-bold text-slate-200 tracking-wide">LAB HUB • Medical Sciences</div>
        <div className="text-xs text-slate-400 mt-1 font-mono">التحقق من الجلسة الطبية والأمان...</div>
      </div>
    );
  }

  // If visitor is attempting to access Admin/Contributor portal without staff session:
  if (currentTab.startsWith('admin') && !isStaff) {
    return (
      <AuthPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          storageService.setCurrentUser(user);
          setProgress(storageService.getStudentProgress(user.id));
          authService.trackActivity('تسجيل الدخول للمنصة', 'Authentication', 'تم تسجيل الدخول بنجاح');
          if (securityService.isStaff(user)) {
            setCurrentTab('admin');
            updateTabWithHash('admin');
          } else {
            setCurrentTab('dashboard');
            updateTabWithHash('dashboard');
          }
        }}
        onCancel={() => {
          setCurrentTab('dashboard');
          updateTabWithHash('dashboard');
        }}
        initialReturnTab="admin"
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white relative overflow-x-hidden medical-grid-bg">
      {/* Ambient Futuristic Medical Aurora Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-indigo-600/12 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] rounded-full bg-violet-800/10 blur-[160px]" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-cyan-600/10 blur-[130px]" />
      </div>

      {/* Top Main Navigation */}
      <div className="relative z-30">
        <Navbar
          currentUser={currentUser}
          activeTab={currentTab}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
          onOpenAskAI={() => setIsAiTutorOpen(true)}
          onOpenAnnouncements={() => setIsAnnouncementsOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          unreadAnnouncementsCount={announcements.length}
          onSelectSearchResult={handleSearchSelect}
          onSelectTab={handleTabSelect}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onLogout={handleLogout}
        />
      </div>

      {/* Main App Layout Grid */}
      <div className="relative z-10 flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Desktop Sidebar: Available for tabular and administrative pages */}
        {!['dashboard', 'laboratories', 'interactive_planes', 'anatomy_movements', 'biochemistry_pathways'].includes(currentTab) && (
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <Sidebar
                activeTab={currentTab}
                activeLabId={selectedLabId || undefined}
                onSelectTab={handleTabSelect}
                currentUser={currentUser}
                userRole={currentUser?.role || 'student'}
                onOpenAiTutor={() => setIsAiTutorOpen(true)}
                onOpenAboutModal={() => setIsAboutModalOpen(true)}
                onLogout={handleLogout}
              />
            </div>
          </aside>
        )}

        {/* Center Main Stage Content */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-10">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Platform Footer with Mandated Ownership Notice */}
      <PlatformFooter
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
        onSelectTab={handleTabSelect}
      />

      {/* Original Interactive Cartoon Study Companion ("لبيب" / Labeeb) */}
      <LabHubCompanion />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={currentTab}
        onSelectTab={handleTabSelect}
        onOpenAiTutor={() => setIsAiTutorOpen(true)}
      />

      {/* AI Medical Lab Tutor Interactive Dialog */}
      <AiLabTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        currentSubject={selectedLabId || undefined}
        currentTopic={currentPractical?.title}
      />

      {/* Laboratory Announcements Modal */}
      <AnnouncementsModal
        isOpen={isAnnouncementsOpen}
        onClose={() => setIsAnnouncementsOpen(false)}
        announcements={announcements}
      />

      {/* Student Portal Share Link Modal */}
      <StudentPortalModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* About Platform & Creator Modal (سكينة أسعد) */}
      <AboutPlatformModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenShareModal={() => {
          setIsAboutModalOpen(false);
          setIsShareModalOpen(true);
        }}
      />

      {/* Production Security Audit Live Matrix Modal */}
      <SecurityAuditModal
        isOpen={isSecurityAuditOpen}
        onClose={() => setIsSecurityAuditOpen(false)}
      />

      {/* Role-Based Authentication & Contributor/Staff Portal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E081A]">
          <AuthPage
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              storageService.setCurrentUser(user);
              setIsAuthModalOpen(false);
              const isStaffMember = securityService.isStaff(user) || user.role === 'owner' || user.role === 'admin';
              const targetTab = isStaffMember ? 'admin' : 'dashboard';
              setCurrentTab(targetTab);
              updateTabWithHash(targetTab);
            }}
            onCancel={() => setIsAuthModalOpen(false)}
            initialReturnTab="admin"
          />
        </div>
      )}

      {/* Biochemistry Detailed Tests Guide (9 Core Qualitative Tests) */}
      <BiochemistryDetailsModal
        isOpen={isBiochemistryModalOpen}
        initialTestId={selectedBiochemistryTestId}
        onClose={() => setIsBiochemistryModalOpen(false)}
      />

      {/* Personalized Welcome Experience Modal Upon Login */}
      <WelcomeExperienceModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        currentUser={currentUser}
        progress={progress}
        onNavigate={handleTabSelect}
      />
    </div>
  );
}
