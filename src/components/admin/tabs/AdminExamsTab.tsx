import React, { useState, useEffect } from 'react';
import {
  Award,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Play,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shuffle,
  ShieldCheck,
  RefreshCw,
  X,
  Layers,
  Settings,
  BookOpen
} from 'lucide-react';
import { MedicalExam, ExamQuestion, LabSubjectId, User } from '../../../types';
import { storageService } from '../../../services/storageService';
import { apiService } from '../../../services/apiService';

interface Props {
  currentUser: User;
  onPreviewExam?: (exam: MedicalExam) => void;
}

export const AdminExamsTab: React.FC<Props> = ({ currentUser, onPreviewExam }) => {
  const [exams, setExams] = useState<MedicalExam[]>([]);
  const [allQuestions, setAllQuestions] = useState<ExamQuestion[]>([]);
  const [filteredExams, setFilteredExams] = useState<MedicalExam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<MedicalExam | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formTitleArabic, setFormTitleArabic] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formLabId, setFormLabId] = useState<LabSubjectId | 'mixed'>('anatomy');
  const [formTimeLimitMinutes, setFormTimeLimitMinutes] = useState(15);
  const [formPassingScorePercent, setFormPassingScorePercent] = useState(70);
  const [formRandomizeQuestions, setFormRandomizeQuestions] = useState(false);
  const [formRandomizeAnswers, setFormRandomizeAnswers] = useState(false);
  const [formAllowRetake, setFormAllowRetake] = useState(true);
  const [formShowAnswersAfterExam, setFormShowAnswersAfterExam] = useState(true);
  const [formStatus, setFormStatus] = useState<'available' | 'completed' | 'locked' | 'draft' | 'published' | 'archived'>('published');
  const [formSelectedQuestionIds, setFormSelectedQuestionIds] = useState<string[]>([]);
  const [questionSearchQuery, setQuestionSearchQuery] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedExams, fetchedQuestions] = await Promise.all([
        apiService.fetchExams(),
        apiService.fetchQuestions()
      ]);

      if (fetchedExams && fetchedExams.length > 0) {
        setExams(fetchedExams);
      } else {
        setExams(storageService.getMedicalExams());
      }

      if (fetchedQuestions && fetchedQuestions.length > 0) {
        setAllQuestions(fetchedQuestions);
      } else {
        setAllQuestions(storageService.getExamQuestions());
      }
    } catch {
      setExams(storageService.getMedicalExams());
      setAllQuestions(storageService.getExamQuestions());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter exams
  useEffect(() => {
    let result = [...exams];

    if (selectedLab !== 'all') {
      result = result.filter(e => e.labId === selectedLab);
    }

    if (selectedStatus !== 'all') {
      result = result.filter(e => (e.status || 'published') === selectedStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        (e.titleArabic && e.titleArabic.includes(q)) ||
        e.description?.toLowerCase().includes(q)
      );
    }

    setFilteredExams(result);
  }, [exams, selectedLab, selectedStatus, searchQuery]);

  const resetForm = () => {
    setEditingExam(null);
    setFormTitle('');
    setFormTitleArabic('');
    setFormDescription('');
    setFormLabId('anatomy');
    setFormTimeLimitMinutes(15);
    setFormPassingScorePercent(70);
    setFormRandomizeQuestions(false);
    setFormRandomizeAnswers(false);
    setFormAllowRetake(true);
    setFormShowAnswersAfterExam(true);
    setFormStatus('published');
    setFormSelectedQuestionIds([]);
    setQuestionSearchQuery('');
  };

  const handleOpenAddModal = () => {
    resetForm();
    // Default select questions matching anatomy
    const matching = allQuestions.filter(q => q.labId === 'anatomy').map(q => q.id);
    setFormSelectedQuestionIds(matching.slice(0, 5));
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (exam: MedicalExam) => {
    setEditingExam(exam);
    setFormTitle(exam.title);
    setFormTitleArabic(exam.titleArabic || '');
    setFormDescription(exam.description || '');
    setFormLabId(exam.labId);
    setFormTimeLimitMinutes(exam.timeLimitMinutes || 15);
    setFormPassingScorePercent(exam.passingScorePercent || 70);
    setFormRandomizeQuestions(exam.randomizeQuestions ?? false);
    setFormRandomizeAnswers(exam.randomizeAnswers ?? false);
    setFormAllowRetake(exam.allowRetake ?? true);
    setFormShowAnswersAfterExam(exam.showAnswersAfterExam ?? true);
    setFormStatus(exam.status || 'published');
    setFormSelectedQuestionIds(exam.questions ? exam.questions.map(q => q.id) : []);
    setIsEditorOpen(true);
  };

  const handleToggleQuestionSelection = (qId: string) => {
    setFormSelectedQuestionIds(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('يرجى إدخال عنوان الاختبار.');
      return;
    }

    if (formSelectedQuestionIds.length === 0) {
      alert('يرجى تحديد سؤال واحد على الأقل للاختبار.');
      return;
    }

    // Assemble questions
    const selectedQuestions = allQuestions.filter(q => formSelectedQuestionIds.includes(q.id));

    const examData: MedicalExam = {
      id: editingExam?.id || `exam_${formLabId}_${Date.now()}`,
      title: formTitle.trim(),
      titleArabic: formTitleArabic.trim() || formTitle.trim(),
      description: formDescription.trim() || '',
      labId: formLabId,
      examType: editingExam?.examType || 'identification',
      timeLimitMinutes: Number(formTimeLimitMinutes) || 15,
      passingScorePercent: Number(formPassingScorePercent) || 70,
      totalMarks: selectedQuestions.reduce((acc, q) => acc + (q.marks || 1), 0),
      difficulty: editingExam?.difficulty || 'intermediate',
      isPublished: formStatus === 'published' || formStatus === 'available',
      questionIds: selectedQuestions.map(q => q.id),
      totalQuestions: selectedQuestions.length,
      questions: selectedQuestions,
      randomizeQuestions: formRandomizeQuestions,
      randomizeAnswers: formRandomizeAnswers,
      allowRetake: formAllowRetake,
      showAnswersAfterExam: formShowAnswersAfterExam,
      status: formStatus,
      createdAt: editingExam?.createdAt || new Date().toISOString(),
      authorName: editingExam?.authorName || currentUser.name
    };

    // Save locally
    storageService.saveMedicalExam(examData, currentUser);
    // Save to server
    await apiService.saveExam(examData);

    setIsEditorOpen(false);
    resetForm();
    await loadData();
  };

  const handleDeleteExam = async (id: string) => {
    storageService.deleteMedicalExam(id, currentUser);
    await apiService.deleteExam(id);
    setDeleteConfirmId(null);
    await loadData();
  };

  const availableQuestionsForForm = allQuestions.filter(q => {
    const matchesLab = q.labId === formLabId;
    if (!questionSearchQuery.trim()) return matchesLab;
    const s = questionSearchQuery.toLowerCase();
    return matchesLab && (
      q.questionText?.toLowerCase().includes(s) ||
      q.questionTextArabic?.includes(s) ||
      q.correctAnswer?.toLowerCase().includes(s) ||
      q.topic?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6" id="admin-exams-tab">
      {/* Top Banner & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold font-mono">
              Exam Governance
            </span>
            <span className="text-xs text-slate-500 font-bold">
              الاختبارات المسجلة: <span className="font-mono text-indigo-600 font-black">{exams.length}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            إدارة امتحانات التشريح والمحطات العملية (Exam Management)
          </h2>
          <p className="text-xs text-slate-500">
            إنشاء واختيار محطات الاختبارات (Bones, Muscles, Movements, OSPE) وضبط وقت المحطة ونسب النجاح والتبديل العشوائي.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            title="تحديث قائمة الامتحانات"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء امتحان عملي جديد</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث في عنوان الاختبار..."
              className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedLab}
              onChange={e => setSelectedLab(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">جميع المعامل (All Labs)</option>
              <option value="anatomy">Anatomy (التشريح)</option>
              <option value="histology">Histology (الأنسجة)</option>
              <option value="biochemistry">Biochemistry (الكيمياء الحيوية)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">جميع الحالات (All Status)</option>
              <option value="published">منشور للطلاب (Published)</option>
              <option value="draft">مسودة (Draft)</option>
              <option value="archived">مؤرشف (Archived)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExams.map(exam => {
          const qCount = exam.questions?.length || exam.totalQuestions || 0;
          const status = exam.status || 'published';

          return (
            <div
              key={exam.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {exam.labId.toUpperCase()}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    status === 'published' || status === 'available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    status === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {status === 'published' || status === 'available' ? 'منشور' : status === 'draft' ? 'مسودة' : 'مؤرشف'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {exam.titleArabic || exam.title}
                  </h3>
                  {exam.titleArabic && exam.title && (
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{exam.title}</p>
                  )}
                </div>

                {exam.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>
                )}

                {/* Badges strip */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">الأسئلة</span>
                    <span className="font-black font-mono text-slate-800">{qCount}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">المدة</span>
                    <span className="font-black font-mono text-slate-800">{exam.timeLimitMinutes}m</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">النجاح</span>
                    <span className="font-black font-mono text-emerald-600">{exam.passingScorePercent}%</span>
                  </div>
                </div>

                {/* Extra settings indicators */}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                  {exam.randomizeQuestions && (
                    <span className="flex items-center gap-1" title="ترتيب الأسئلة عشوائي">
                      <Shuffle className="w-3 h-3 text-indigo-500" /> عشوائي
                    </span>
                  )}
                  {exam.allowRetake && (
                    <span className="flex items-center gap-1" title="متاح إعادة الاختبار">
                      <RefreshCw className="w-3 h-3 text-emerald-500" /> إعادة المحاولة
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(exam)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                    title="تعديل الامتحان"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(exam.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="حذف الامتحان"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {onPreviewExam && (
                  <button
                    type="button"
                    onClick={() => onPreviewExam(exam)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>تجربة الامتحان</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam Edit / Add Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-200 my-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900">
                  {editingExam ? 'تعديل الاختبار العملي' : 'إنشاء اختبار عملي جديد'}
                </h3>
                <p className="text-xs text-slate-500">
                  حدد معايير الاختبار واربطه بالأسئلة المعتمدة من بنك الأسئلة.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">عنوان الاختبار بالإنجليزية (Title - EN) *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Bones Practical Examination"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">عنوان الاختبار بالعربية (Title - AR)</label>
                  <input
                    type="text"
                    value={formTitleArabic}
                    onChange={e => setFormTitleArabic(e.target.value)}
                    placeholder="مثال: اختبار العظام العملي"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">الوصف والتعليمات (Description)</label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="وصف مختصر لأهداف الاختبار والمحطات المستهدفة..."
                  rows={2}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">المعمل (Subject)</label>
                  <select
                    value={formLabId}
                    onChange={e => setFormLabId(e.target.value as LabSubjectId)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-bold"
                  >
                    <option value="anatomy">Anatomy (تشريح)</option>
                    <option value="histology">Histology (أنسجة)</option>
                    <option value="biochemistry">Biochemistry (كيمياء)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">المدة بالدقائق (Time Limit)</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={formTimeLimitMinutes}
                    onChange={e => setFormTimeLimitMinutes(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">نسبة النجاح % (Passing %)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={formPassingScorePercent}
                    onChange={e => setFormPassingScorePercent(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">حالة الاختبار (Status)</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-bold"
                  >
                    <option value="published">منشور (Published)</option>
                    <option value="draft">مسودة (Draft)</option>
                    <option value="archived">مؤرشف (Archived)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formRandomizeQuestions}
                    onChange={e => setFormRandomizeQuestions(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>ترتيب الأسئلة عشوائيًا لكل طالب (Randomize Questions)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formRandomizeAnswers}
                    onChange={e => setFormRandomizeAnswers(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>ترتيب خيارات الإجابة عشوائيًا (Randomize Options)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formAllowRetake}
                    onChange={e => setFormAllowRetake(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>السماح للطالب بإعادة المحاولة (Allow Retake)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formShowAnswersAfterExam}
                    onChange={e => setFormShowAnswersAfterExam(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>إظهار الإجابات النموذجية بعد الإنهاء (Show Model Answers)</span>
                </label>
              </div>

              {/* Attach Questions From Bank Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-900 font-bold">
                    اختيار الأسئلة من بنك الأسئلة ({formSelectedQuestionIds.length} محددة) *
                  </label>
                  <input
                    type="text"
                    value={questionSearchQuery}
                    onChange={e => setQuestionSearchQuery(e.target.value)}
                    placeholder="تصفية الأسئلة بالاسم أو الموضوع..."
                    className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 w-48"
                  />
                </div>

                <div className="border border-slate-200 rounded-2xl max-h-56 overflow-y-auto divide-y divide-slate-100">
                  {availableQuestionsForForm.length === 0 ? (
                    <div className="p-4 text-center text-slate-400">
                      لا توجد أسئلة متطابقة في معمل {formLabId}. أضف أسئلة في بنك الأسئلة أولاً.
                    </div>
                  ) : (
                    availableQuestionsForForm.map(q => {
                      const isSelected = formSelectedQuestionIds.includes(q.id);
                      return (
                        <div
                          key={q.id}
                          onClick={() => handleToggleQuestionSelection(q.id)}
                          className={`p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${
                            isSelected ? 'bg-indigo-50/70' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded text-indigo-600"
                            />
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                              <img src={q.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="text-slate-900 font-bold text-xs">{q.questionText}</div>
                              <div className="text-[11px] text-slate-500">{q.topic || 'General'} | {q.correctAnswer}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {q.timeSeconds || 30}s
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition-all active:scale-95"
                >
                  {editingExam ? 'حفظ تعديلات الامتحان' : 'إنشاء الامتحان'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-black text-slate-900">تأكيد حذف الاختبار</h4>
              <p className="text-xs text-slate-500">
                هل أنت متأكد من رغبتك في حذف هذا الاختبار العملي نهائيًا؟
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => handleDeleteExam(deleteConfirmId)}
                className="flex-1 py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
