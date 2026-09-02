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
import { LAB_SUBJECTS } from './data/mockData';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { PlatformFooter } from './components/common/PlatformFooter';

// View Components
import { DashboardView } from './components/dashboard/DashboardView';
import { LabSubjectPage } from './components/labs/LabSubjectPage';
import { PracticalDetailPage } from './components/practicals/PracticalDetailPage';
import { PracticalsListPage } from './components/practicals/PracticalsListPage';
import { SpotterView } from './components/spotter/SpotterView';
import { QuizzesOverviewPage } from './components/quiz/QuizzesOverviewPage';
import { QuizRunner } from './components/quiz/QuizRunner';
import { ProgressPage } from './components/progress/ProgressPage';
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
import { BacteriologyConceptMap } from './components/interactive/BacteriologyConceptMap';
import { BacteriologyOrganismDetailPage } from './components/labs/bacteriology/BacteriologyOrganismDetailPage';
import { EducationalVideosSection } from './components/video/EducationalVideosSection';

// Mandatory Account System & Administration
import { AuthPage } from './components/auth/AuthPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals & Security
import { AiLabTutorModal } from './components/ai/AiLabTutorModal';
import { AnnouncementsModal } from './components/announcements/AnnouncementsModal';
import { StudentPortalModal } from './components/share/StudentPortalModal';
import { AboutPlatformModal } from './components/about/AboutPlatformModal';
import { SecurityAuditModal } from './components/security/SecurityAuditModal';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  // Application State - Strictly Enforced Authentication
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => storageService.getUsers());
  const [progress, setProgress] = useState(() => storageService.getStudentProgress(currentUser?.id));
  const [schedule, setSchedule] = useState(() => storageService.getSchedule());
  const [practicals, setPracticals] = useState<Practical[]>(() => storageService.getPracticals());
  const [spotters, setSpotters] = useState(() => storageService.getSpotters());
  const [quizzes, setQuizzes] = useState(() => storageService.getQuizzes());
  const [announcements, setAnnouncements] = useState(() => storageService.getAnnouncements());
  const [notifications, setNotifications] = useState(() => storageService.getNotifications());

  // Parse initial tab from URL hash or path
  const getInitialTabState = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      const path = window.location.pathname.replace('/', '').trim().toLowerCase();
      const target = hash || path;

      if (target.startsWith('organism/') || target.startsWith('bacteriology/')) {
        return 'organism_detail';
      }

      if (target.startsWith('admin/') || target === 'admin' || target === 'admin_dashboard') {
        return 'admin';
      }

      const validTabs = [
        'dashboard',
        'laboratories',
        'anatomy',
        'histology',
        'bacteriology',
        'biochemistry',
        'medical_exams',
        'teacher_dashboard',
        'biochemistry_guide',
        'practicals',
        'spotters',
        'quizzes',
        'schedule',
        'progress',
        'academic_approval',
        'histology_microscope',
        'mcq_bank',
        'bacteriology_concept_map',
        'educational_videos',
        'organism_detail',
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

  // Parse initial organism ID if any
  const getInitialOrganismId = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (hash.startsWith('organism/')) {
        return hash.split('/')[1] || 'staph-aureus';
      }
      if (hash.startsWith('bacteriology/')) {
        return hash.split('/')[1] || 'staph-aureus';
      }
    } catch {
      // Fallback
    }
    return 'staph-aureus';
  };

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>(getInitialTabState);
  const [selectedOrganismId, setSelectedOrganismId] = useState<string>(getInitialOrganismId);
  const [selectedLabId, setSelectedLabId] = useState<LabSubjectId | null>(() => {
    const initial = getInitialTabState();
    if (['anatomy', 'histology', 'bacteriology', 'biochemistry'].includes(initial)) {
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
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (hash.startsWith('organism/') || hash.startsWith('bacteriology/')) {
        const orgId = hash.split('/')[1] || 'staph-aureus';
        setSelectedOrganismId(orgId);
        setCurrentTab('organism_detail');
        setSelectedPracticalId(null);
        setActiveQuiz(null);
        return;
      }

      const target = getInitialTabState();
      if (['anatomy', 'histology', 'bacteriology', 'biochemistry'].includes(target)) {
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
    setSelectedLabId(labId);
    setCurrentTab('spotters');
    updateTabWithHash('spotters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuiz = (labId: LabSubjectId, practicalId?: string) => {
    if (currentUser) {
      authService.trackActivity(`بدء اختبار قصير: ${labId}`, labId);
    }
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
    const updated = storageService.togglePracticalCompletion(currentUser.id, practicalId);
    setProgress(updated);
    authService.trackActivity(`تحديث إنجاز عملي: ${practicalId}`, 'Practicals');
  };

  const handleTogglePreparationTask = (scheduleId: string, taskId: string) => {
    const updatedSchedule = storageService.togglePreparationTask(scheduleId, taskId);
    setSchedule(updatedSchedule);
  };

  const handleCompleteQuizAttempt = (attempt: QuizAttempt) => {
    const updatedProgress = storageService.saveQuizAttempt(attempt);
    setProgress(updatedProgress);
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

  const handleOpenOrganismDetail = (organismId: string) => {
    if (currentUser) {
      authService.trackActivity(`استكشاف الكائن الدقيق: ${organismId}`, 'bacteriology');
    }
    setSelectedOrganismId(organismId);
    setCurrentTab('organism_detail');
    updateTabWithHash(`organism/${organismId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabSelect = (tab: string) => {
    if (currentUser) {
      authService.trackActivity(`تصفح قسم: ${tab}`, tab);
    }
    if (['anatomy', 'histology', 'bacteriology', 'biochemistry'].includes(tab)) {
      handleSelectLab(tab as LabSubjectId);
      return;
    }

    if (tab === 'biochemistry_guide') {
      setIsBiochemistryModalOpen(true);
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
    if (['anatomy', 'histology', 'bacteriology', 'biochemistry'].includes(currentTab)) {
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
          onOpenOrganism={handleOpenOrganismDetail}
          onOpenConceptMap={() => {
            setCurrentTab('bacteriology_concept_map');
            updateTabWithHash('bacteriology_concept_map');
          }}
        />
      );
    }

    // 2. Organism Detail View (Bacteriology Pathogens)
    if (currentTab === 'organism_detail' && selectedOrganismId) {
      return (
        <BacteriologyOrganismDetailPage
          organismId={selectedOrganismId}
          onBack={() => {
            if (selectedLabId === 'bacteriology') {
              handleSelectLab('bacteriology');
            } else {
              setCurrentTab('bacteriology_concept_map');
              updateTabWithHash('bacteriology_concept_map');
            }
          }}
          onSelectOrganism={handleOpenOrganismDetail}
          onOpenQuiz={() => handleOpenQuiz('bacteriology')}
          onOpenSpotter={() => handleOpenSpotter('bacteriology')}
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
          userId={currentUser.id}
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
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                MEDICAL LABORATORIES
              </h1>
              <p className="text-sm text-[#64748B]">
                Select a discipline to access slides, models, cultures, and practical protocols.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LAB_SUBJECTS.map(lab => (
                <div
                  key={lab.id}
                  onClick={() => handleSelectLab(lab.id)}
                  className="bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-indigo-500/60 rounded-3xl overflow-hidden cursor-pointer transition-all shadow-md group"
                >
                  <div className="h-44 bg-slate-900 relative">
                    <img
                      src={lab.cardImage}
                      alt={lab.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-lg font-bold text-white">
                      {lab.name}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                      {lab.description}
                    </p>
                    <div className="text-xs text-indigo-600 font-bold">
                      Explore {lab.name} →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      case 'bacteriology_concept_map':
        return (
          <div className="animate-in fade-in duration-300">
            <BacteriologyConceptMap
              onOpenOrganism={handleOpenOrganismDetail}
              initialOrganismId={selectedOrganismId || undefined}
            />
          </div>
        );

      case 'educational_videos':
        return (
          <div className="animate-in fade-in duration-300">
            <EducationalVideosSection />
          </div>
        );

      case 'admin':
      case 'admin_dashboard':
        if (currentUser.role !== 'admin') {
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

  // MANDATORY ACCOUNT SYSTEM ENFORCEMENT:
  // If not authenticated, visitor CANNOT access any educational content or dashboard
  if (!currentUser || !authService.isAuthenticated()) {
    return (
      <AuthPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          storageService.setCurrentUser(user);
          setProgress(storageService.getStudentProgress(user.id));
          authService.trackActivity('تسجيل الدخول للمنصة', 'Authentication', 'تم تسجيل الدخول بنجاح');
          if (currentTab && currentTab !== 'dashboard' && currentTab !== 'login' && (!currentTab.startsWith('admin') || user.role === 'admin')) {
            updateTabWithHash(currentTab);
          } else {
            setCurrentTab('dashboard');
            updateTabWithHash('dashboard');
          }
        }}
        initialReturnTab={currentTab}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation */}
      <Navbar
        currentUser={currentUser}
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

      {/* Main App Layout Grid */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Sidebar
              activeTab={currentTab}
              activeLabId={selectedLabId || undefined}
              onSelectTab={handleTabSelect}
              currentUser={currentUser}
              userRole={currentUser.role}
              onOpenAiTutor={() => setIsAiTutorOpen(true)}
              onOpenAboutModal={() => setIsAboutModalOpen(true)}
              onLogout={handleLogout}
            />
          </div>
        </aside>

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

      {/* Role-Based Authentication & Switch Portal Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={handleUserChange}
      />

      {/* Biochemistry Detailed Tests Guide (9 Core Qualitative Tests) */}
      <BiochemistryDetailsModal
        isOpen={isBiochemistryModalOpen}
        initialTestId={selectedBiochemistryTestId}
        onClose={() => setIsBiochemistryModalOpen(false)}
      />
    </div>
  );
}
