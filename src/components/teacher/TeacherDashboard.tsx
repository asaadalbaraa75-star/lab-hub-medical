import React, { useState } from 'react';
import {
  ExamQuestion,
  MedicalExam,
  ExamAttempt,
  LabSubjectId,
  ExamType,
  User
} from '../../types';
import { storageService } from '../../services/storageService';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Layers,
  GraduationCap,
  Bone,
  Microscope,
  FlaskConical,
  Award,
  CheckCircle2,
  XCircle,
  FilePlus,
  Settings,
  Eye,
  Clock,
  HelpCircle,
  Save,
  X,
  Sparkles,
  BarChart3,
  Users
} from 'lucide-react';

interface TeacherDashboardProps {
  currentUser: User;
  onPreviewExam?: (exam: MedicalExam) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentUser,
  onPreviewExam
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'exams' | 'students'>('questions');
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => storageService.getExamQuestions());
  const [exams, setExams] = useState<MedicalExam[]>(() => storageService.getMedicalExams());
  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => storageService.getExamAttempts());

  const [selectedLabFilter, setSelectedLabFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add/Edit Question Modal State
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);

  // Question Form state
  const [formLabId, setFormLabId] = useState<LabSubjectId>('anatomy');
  const [formType, setFormType] = useState<ExamType>('identification');
  const [formQuestionText, setFormQuestionText] = useState('');
  const [formQuestionTextArabic, setFormQuestionTextArabic] = useState('');
  const [formCategory, setFormCategory] = useState('Osteology');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formMagnification, setFormMagnification] = useState('400x H&E Stain');
  const [formOptionA, setFormOptionA] = useState('');
  const [formOptionB, setFormOptionB] = useState('');
  const [formOptionC, setFormOptionC] = useState('');
  const [formOptionD, setFormOptionD] = useState('');
  const [formCorrectAnswer, setFormCorrectAnswer] = useState('');
  const [formExplanation, setFormExplanation] = useState('');
  const [formClinicalNote, setFormClinicalNote] = useState('');
  const [formTimeSeconds, setFormTimeSeconds] = useState(30);
  const [formMarks, setFormMarks] = useState(1);

  // New Exam Builder Modal State
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examFormTitle, setExamFormTitle] = useState('');
  const [examFormTitleArabic, setExamFormTitleArabic] = useState('');
  const [examFormLabId, setExamFormLabId] = useState<LabSubjectId | 'mixed'>('anatomy');
  const [examFormDescription, setExamFormDescription] = useState('');
  const [examFormTimeLimit, setExamFormTimeLimit] = useState(10);
  const [examFormPassingScore, setExamFormPassingScore] = useState(70);
  const [examSelectedQuestionIds, setExamSelectedQuestionIds] = useState<string[]>([]);

  // Preset medical image library for quick question creation
  const PRESET_IMAGES = [
    { label: 'Human Femur (Dry Bone)', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80', lab: 'anatomy' },
    { label: 'Tibia / Lower Limb Specimen', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', lab: 'anatomy' },
    { label: 'Arm Dissection / Biceps', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80', lab: 'anatomy' },
    { label: 'Epithelium 400x (Bowman Capsule)', url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80', lab: 'histology' },
    { label: 'Compact Bone Osteon 100x', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80', lab: 'histology' },
    { label: 'Blood Smear Leishman 1000x', url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80', lab: 'histology' },
    { label: "Benedict's Test Tube Reaction", url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', lab: 'biochemistry' },
    { label: 'Biuret Violet Color Reaction', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80', lab: 'biochemistry' },
    { label: 'Sudan IV Red Floating Layer', url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80', lab: 'biochemistry' }
  ];

  const handleOpenAddQuestion = () => {
    setEditingQuestion(null);
    setFormLabId('anatomy');
    setFormType('identification');
    setFormQuestionText('');
    setFormQuestionTextArabic('');
    setFormCategory('Osteology');
    setFormImageUrl(PRESET_IMAGES[0].url);
    setFormMagnification('Gross Specimen');
    setFormOptionA('');
    setFormOptionB('');
    setFormOptionC('');
    setFormOptionD('');
    setFormCorrectAnswer('');
    setFormExplanation('');
    setFormClinicalNote('');
    setFormTimeSeconds(30);
    setFormMarks(1);
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: ExamQuestion) => {
    setEditingQuestion(q);
    setFormLabId(q.labId);
    setFormType(q.type);
    setFormQuestionText(q.questionText);
    setFormQuestionTextArabic(q.questionTextArabic || '');
    setFormCategory(q.specimenCategory);
    setFormImageUrl(q.imageUrl);
    setFormMagnification(q.magnificationOrView || '');
    setFormOptionA(q.options[0] || '');
    setFormOptionB(q.options[1] || '');
    setFormOptionC(q.options[2] || '');
    setFormOptionD(q.options[3] || '');
    setFormCorrectAnswer(q.correctAnswer);
    setFormExplanation(q.explanation);
    setFormClinicalNote(q.clinicalNote || '');
    setFormTimeSeconds(q.timeSeconds || 30);
    setFormMarks(q.marks || 1);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const options = [formOptionA, formOptionB, formOptionC, formOptionD].filter(o => o.trim().length > 0);
    if (options.length === 0) {
      options.push(formCorrectAnswer);
    }

    const questionToSave: ExamQuestion = {
      id: editingQuestion ? editingQuestion.id : `q_${Date.now()}`,
      labId: formLabId,
      type: formType,
      questionText: formQuestionText,
      questionTextArabic: formQuestionTextArabic,
      specimenCategory: formCategory,
      imageUrl: formImageUrl || PRESET_IMAGES[0].url,
      magnificationOrView: formMagnification,
      options,
      correctAnswer: formCorrectAnswer || options[0],
      explanation: formExplanation,
      clinicalNote: formClinicalNote,
      timeSeconds: Number(formTimeSeconds) || 30,
      marks: Number(formMarks) || 1
    };

    storageService.saveExamQuestion(questionToSave);
    setQuestions(storageService.getExamQuestions());
    setIsQuestionModalOpen(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السؤال من بنك الأسئلة؟')) {
      storageService.deleteExamQuestion(id);
      setQuestions(storageService.getExamQuestions());
    }
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (examSelectedQuestionIds.length === 0) {
      alert('الرجاء اختيار سؤال واحد على الأقل للاختبار.');
      return;
    }

    const newExam: MedicalExam = {
      id: `exam_${Date.now()}`,
      title: examFormTitle,
      titleArabic: examFormTitleArabic || examFormTitle,
      labId: examFormLabId,
      examType: 'mixed',
      description: examFormDescription,
      timeLimitMinutes: Number(examFormTimeLimit) || 10,
      passingScorePercent: Number(examFormPassingScore) || 70,
      totalMarks: examSelectedQuestionIds.length,
      difficulty: 'university_ospe',
      isPublished: true,
      questionIds: examSelectedQuestionIds,
      createdAt: new Date().toISOString().split('T')[0],
      authorName: currentUser.name || 'Medical Faculty Staff'
    };

    storageService.saveMedicalExam(newExam);
    setExams(storageService.getMedicalExams());
    setIsExamModalOpen(false);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesLab = selectedLabFilter === 'all' || q.labId === selectedLabFilter;
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.questionTextArabic && q.questionTextArabic.includes(searchQuery)) ||
      q.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.specimenCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLab && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="teacher-dashboard">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty & Instructor Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
            لوحة تحكم الأستاذ الجامعي وبنك الأسئلة الطبية
          </h1>
          <p className="text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
            إدارة شاملة لأسئلة محطات الـ OSPE لمعامل التشريح، الأنسجة، والكيمياء الحيوية مع إمكانية إضافة وتعديل وحذف الأسئلة وإنشاء اختبارات معتمدة للطلاب.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAddQuestion}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة سؤال عملي جديد</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'questions'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>بنك الأسئلة والمحطات ({questions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'exams'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>إدارة الامتحانات المعتمدة ({exams.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'students'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>نتائج وتقييمات الطلاب ({attempts.length})</span>
        </button>
      </div>

      {/* TAB 1: QUESTION MANAGEMENT TABLE */}
      {activeTab === 'questions' && (
        <div className="space-y-5">
          {/* Filter and Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedLabFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedLabFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                جميع المعامل
              </button>
              <button
                type="button"
                onClick={() => setSelectedLabFilter('anatomy')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                  selectedLabFilter === 'anatomy' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bone className="w-3 h-3" />
                <span>Anatomy</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLabFilter('histology')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                  selectedLabFilter === 'histology' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Microscope className="w-3 h-3" />
                <span>Histology</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLabFilter('biochemistry')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                  selectedLabFilter === 'biochemistry' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FlaskConical className="w-3 h-3" />
                <span>Biochemistry</span>
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="بحث في نص السؤال أو الإجابة..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          {/* Questions Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">العينة / الصورة</th>
                    <th className="p-4">المعمل والنوع</th>
                    <th className="p-4">نص السؤال العملي</th>
                    <th className="p-4">الإجابة النموذجية</th>
                    <th className="p-4">الزمن / الدرجة</th>
                    <th className="p-4 text-right">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuestions.map(q => (
                    <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-900 overflow-hidden border border-slate-200 shrink-0">
                          <img
                            src={q.imageUrl}
                            alt="Question specimen"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              q.labId === 'anatomy'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : q.labId === 'histology'
                                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {q.labId}
                          </span>
                          <div className="text-slate-500 text-[11px] font-medium">{q.specimenCategory}</div>
                        </div>
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-slate-900 line-clamp-2">{q.questionText}</div>
                        {q.questionTextArabic && (
                          <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                            {q.questionTextArabic}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                          {q.correctAnswer}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-600">
                        <div>{q.timeSeconds || 30}s</div>
                        <div className="text-[10px] text-slate-400">{q.marks || 1} mark</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditQuestion(q)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors"
                            title="تعديل السؤال"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors"
                            title="حذف السؤال"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXAMS MANAGEMENT */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">قائمة الامتحانات العملية المصممة</h2>
            <button
              type="button"
              onClick={() => {
                setExamFormTitle('');
                setExamFormTitleArabic('');
                setExamFormLabId('anatomy');
                setExamFormDescription('');
                setExamFormTimeLimit(10);
                setExamFormPassingScore(70);
                setExamSelectedQuestionIds([]);
                setIsExamModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <FilePlus className="w-4 h-4" />
              <span>إنشاء امتحان OSPE جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {exams.map(exam => (
              <div key={exam.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {exam.labId}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{exam.timeLimitMinutes} mins</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{exam.titleArabic || exam.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{exam.title}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{exam.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600">
                    {exam.questionIds.length} محطات معتمدة
                  </span>
                  {onPreviewExam && (
                    <button
                      type="button"
                      onClick={() => onPreviewExam(exam)}
                      className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة كطالب</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT RESULTS OVERVIEW */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 mb-4">سجل درجات الطلاب في المحطات العملية</h2>
            {attempts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                لم يتم تسجيل أي محاولات اختبار بعد. ستظهر هنا درجات الطلاب بمجرد خوض الامتحانات.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3">الطالب</th>
                      <th className="p-3">الامتحان</th>
                      <th className="p-3">الدرجة</th>
                      <th className="p-3">النسبة</th>
                      <th className="p-3">التقييم</th>
                      <th className="p-3">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attempts.map(att => (
                      <tr key={att.id}>
                        <td className="p-3 font-bold text-slate-900">{att.userName}</td>
                        <td className="p-3 text-slate-700">{att.examTitle}</td>
                        <td className="p-3 font-mono font-bold">{att.score} / {att.maxScore}</td>
                        <td className="p-3 font-mono text-indigo-600 font-bold">{att.percentage}%</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {att.performanceLevel}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 font-mono">{new Date(att.completedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD / EDIT QUESTION MODAL */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingQuestion ? 'تعديل السؤال العملي' : 'إضافة سؤال عملي جديد إلى بنك الأسئلة'}
              </h3>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              {/* Lab & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المعمل الطبي</label>
                  <select
                    value={formLabId}
                    onChange={e => setFormLabId(e.target.value as LabSubjectId)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-bold"
                  >
                    <option value="anatomy">Anatomy Lab (معمل التشريح)</option>
                    <option value="histology">Histology Lab (معمل الأنسجة)</option>
                    <option value="biochemistry">Biochemistry Lab (معمل الكيمياء الحيوية)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">نوع السؤال</label>
                  <select
                    value={formType}
                    onChange={e => setFormType(e.target.value as ExamType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-bold"
                  >
                    <option value="identification">Identification (تعرف على العينة)</option>
                    <option value="mcq">MCQ (اختيار من متعدد)</option>
                    <option value="practical_interpretation">Practical Interpretation (تفسير التفاعل)</option>
                    <option value="image_recognition">Image Recognition (فحص مجهري)</option>
                  </select>
                </div>
              </div>

              {/* Question Text in English & Arabic */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">نص السؤال بالإنجليزية (Required)</label>
                <input
                  type="text"
                  required
                  value={formQuestionText}
                  onChange={e => setFormQuestionText(e.target.value)}
                  placeholder="e.g. Identify the bone shown in the anatomical specimen."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">نص السؤال بالعربية (Optional)</label>
                <input
                  type="text"
                  value={formQuestionTextArabic}
                  onChange={e => setFormQuestionTextArabic(e.target.value)}
                  placeholder="مثال: تعرّف على العظمة الموضحة في الصورة التشريحية."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                />
              </div>

              {/* Specimen Category & Image URL */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">تصنيف العينة (Specimen Category)</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    placeholder="e.g. Osteology, Epithelia, Benedict's"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">المظهر / التكبير (Magnification)</label>
                  <input
                    type="text"
                    value={formMagnification}
                    onChange={e => setFormMagnification(e.target.value)}
                    placeholder="e.g. 400x H&E Stain, Gross Specimen"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">رابط صورة العينة (Image URL)</label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs"
                />
                {/* Preset quick picker */}
                <div className="flex items-center gap-2 overflow-x-auto mt-2 pb-1">
                  <span className="text-[10px] text-slate-400 font-bold shrink-0">نماذج جاهزة:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormImageUrl(preset.url)}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[10px] text-slate-600 whitespace-nowrap border border-slate-200 shrink-0"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-700">خيارات الإجابة (Options A, B, C, D)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formOptionA}
                    onChange={e => setFormOptionA(e.target.value)}
                    placeholder="Option A (e.g. Femur)"
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                  <input
                    type="text"
                    value={formOptionB}
                    onChange={e => setFormOptionB(e.target.value)}
                    placeholder="Option B (e.g. Tibia)"
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                  <input
                    type="text"
                    value={formOptionC}
                    onChange={e => setFormOptionC(e.target.value)}
                    placeholder="Option C (e.g. Fibula)"
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                  <input
                    type="text"
                    value={formOptionD}
                    onChange={e => setFormOptionD(e.target.value)}
                    placeholder="Option D (e.g. Humerus)"
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              {/* Correct Answer */}
              <div>
                <label className="block font-bold text-emerald-800 mb-1">الإجابة الصحيحة المعتمدة (Exact Correct Answer)</label>
                <input
                  type="text"
                  required
                  value={formCorrectAnswer}
                  onChange={e => setFormCorrectAnswer(e.target.value)}
                  placeholder="e.g. Femur"
                  className="w-full p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/60 text-emerald-950 font-bold"
                />
              </div>

              {/* Explanation & Clinical Note */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">التفسير العلمي للشريحة (Explanation)</label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={e => setFormExplanation(e.target.value)}
                  placeholder="Detailed anatomical/histological reasoning..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                />
              </div>

              {/* Time & Marks */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الوقت المخصص للمحطة (ثواني)</label>
                  <input
                    type="number"
                    min={15}
                    max={120}
                    value={formTimeSeconds}
                    onChange={e => setFormTimeSeconds(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الدرجات (Marks)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formMarks}
                    onChange={e => setFormMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition-all active:scale-95"
                >
                  حفظ السؤال في بنك الأسئلة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW EXAM MODAL */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">إنشاء وتكويد امتحان عملي (OSPE Exam Builder)</h3>
              <button
                type="button"
                onClick={() => setIsExamModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم الامتحان بالإنجليزية</label>
                  <input
                    type="text"
                    required
                    value={examFormTitle}
                    onChange={e => setExamFormTitle(e.target.value)}
                    placeholder="e.g. Midterm Histology Practical OSPE"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم الامتحان بالعربية</label>
                  <input
                    type="text"
                    value={examFormTitleArabic}
                    onChange={e => setExamFormTitleArabic(e.target.value)}
                    placeholder="مثال: الاختبار العملي النصفي لمعمل الأنسجة"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المعمل</label>
                  <select
                    value={examFormLabId}
                    onChange={e => setExamFormLabId(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-bold"
                  >
                    <option value="anatomy">Anatomy Lab</option>
                    <option value="histology">Histology Lab</option>
                    <option value="biochemistry">Biochemistry Lab</option>
                    <option value="mixed">Mixed OSPE (شامل)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">زمن الامتحان الإجمالي (دقائق)</label>
                  <input
                    type="number"
                    min={3}
                    max={60}
                    value={examFormTimeLimit}
                    onChange={e => setExamFormTimeLimit(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">نسبة النجاح (%)</label>
                  <input
                    type="number"
                    min={50}
                    max={90}
                    value={examFormPassingScore}
                    onChange={e => setExamFormPassingScore(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">وصف تعليمات الامتحان</label>
                <textarea
                  rows={2}
                  value={examFormDescription}
                  onChange={e => setExamFormDescription(e.target.value)}
                  placeholder="تعليمات المحطات وزمن كل محطة..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                />
              </div>

              {/* Select Questions From Bank */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-900">
                    اختر المحطات من بنك الأسئلة ({examSelectedQuestionIds.length} محددة)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const allIds = questions.map(q => q.id);
                      setExamSelectedQuestionIds(examSelectedQuestionIds.length === allIds.length ? [] : allIds);
                    }}
                    className="text-indigo-600 font-bold hover:underline text-[11px]"
                  >
                    {examSelectedQuestionIds.length === questions.length ? 'إلغاء تحديد الكل' : 'تحديد جميع الأسئلة'}
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                  {questions.map(q => {
                    const isChecked = examSelectedQuestionIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                          isChecked ? 'bg-indigo-50 border-indigo-300 text-indigo-950' : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setExamSelectedQuestionIds(prev => prev.filter(id => id !== q.id));
                              } else {
                                setExamSelectedQuestionIds(prev => [...prev, q.id]);
                              }
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                          />
                          <span className="font-bold text-slate-900 truncate max-w-md">{q.questionText}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          {q.labId}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsExamModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition-all active:scale-95"
                >
                  نشر واعتماد الامتحان للطلاب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
