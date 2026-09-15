import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Copy,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  X,
  Layers,
  Clock,
  Award,
  ChevronDown
} from 'lucide-react';
import { ExamQuestion, LabSubjectId, User } from '../../../types';
import { storageService } from '../../../services/storageService';
import { apiService } from '../../../services/apiService';

interface Props {
  currentUser: User;
}

export const AdminQuestionBankTab: React.FC<Props> = ({ currentUser }) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<ExamQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<ExamQuestion | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formLabId, setFormLabId] = useState<LabSubjectId>('anatomy');
  const [formTopic, setFormTopic] = useState('Bones');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formQuestionType, setFormQuestionType] = useState<'multiple_choice' | 'identification' | 'spotter' | 'write_in'>('multiple_choice');
  const [formQuestionText, setFormQuestionText] = useState('');
  const [formQuestionTextArabic, setFormQuestionTextArabic] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formSpecimenCategory, setFormSpecimenCategory] = useState('Osteology Specimen');
  const [formMagnification, setFormMagnification] = useState('Gross Specimen');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrectAnswer, setFormCorrectAnswer] = useState('');
  const [formAlternativeAnswers, setFormAlternativeAnswers] = useState('');
  const [formExplanation, setFormExplanation] = useState('');
  const [formClinicalNote, setFormClinicalNote] = useState('');
  const [formTimeSeconds, setFormTimeSeconds] = useState(30);
  const [formMarks, setFormMarks] = useState(1);
  const [formMarkerX, setFormMarkerX] = useState<number>(50);
  const [formMarkerY, setFormMarkerY] = useState<number>(50);
  const [formMarkerLabel, setFormMarkerLabel] = useState('①');

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      // First attempt server fetch
      const serverData = await apiService.fetchQuestions();
      if (serverData && serverData.length > 0) {
        setQuestions(serverData);
      } else {
        // Fallback to storageService local cache
        const localData = storageService.getExamQuestions();
        setQuestions(localData);
      }
    } catch (e) {
      const localData = storageService.getExamQuestions();
      setQuestions(localData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...questions];

    if (selectedLab !== 'all') {
      result = result.filter(q => q.labId === selectedLab);
    }

    if (selectedTopic !== 'all') {
      result = result.filter(q => q.topic?.toLowerCase() === selectedTopic.toLowerCase());
    }

    if (selectedDifficulty !== 'all') {
      result = result.filter(q => q.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        item.questionText?.toLowerCase().includes(q) ||
        item.questionTextArabic?.includes(q) ||
        item.correctAnswer?.toLowerCase().includes(q) ||
        item.specimenCategory?.toLowerCase().includes(q) ||
        item.topic?.toLowerCase().includes(q)
      );
    }

    setFilteredQuestions(result);
  }, [questions, selectedLab, selectedTopic, selectedDifficulty, searchQuery]);

  // Unique topics extracted from questions
  const availableTopics = Array.from(new Set(questions.map(q => q.topic).filter(Boolean))) as string[];

  const resetForm = () => {
    setEditingQuestion(null);
    setFormLabId('anatomy');
    setFormTopic('Bones');
    setFormDifficulty('medium');
    setFormQuestionType('multiple_choice');
    setFormQuestionText('');
    setFormQuestionTextArabic('');
    setFormImageUrl('');
    setFormSpecimenCategory('Osteology Specimen');
    setFormMagnification('Gross Specimen');
    setFormOptions(['', '', '', '']);
    setFormCorrectAnswer('');
    setFormAlternativeAnswers('');
    setFormExplanation('');
    setFormClinicalNote('');
    setFormTimeSeconds(30);
    setFormMarks(1);
    setFormMarkerX(50);
    setFormMarkerY(50);
    setFormMarkerLabel('①');
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (q: ExamQuestion) => {
    setEditingQuestion(q);
    setFormLabId(q.labId);
    setFormTopic(q.topic || 'General');
    setFormDifficulty(q.difficulty || 'medium');
    setFormQuestionType(q.questionType || 'multiple_choice');
    setFormQuestionText(q.questionText || '');
    setFormQuestionTextArabic(q.questionTextArabic || '');
    setFormImageUrl(q.imageUrl || '');
    setFormSpecimenCategory(q.specimenCategory || '');
    setFormMagnification(q.magnificationOrView || '');
    setFormOptions(q.options && q.options.length > 0 ? [...q.options] : ['', '', '', '']);
    setFormCorrectAnswer(q.correctAnswer || '');
    setFormAlternativeAnswers(q.alternativeAnswers ? q.alternativeAnswers.join(', ') : '');
    setFormExplanation(q.explanation || '');
    setFormClinicalNote(q.clinicalNote || '');
    setFormTimeSeconds(q.timeSeconds || 30);
    setFormMarks(q.marks || 1);
    setFormMarkerX(q.markerPosition?.x ?? 50);
    setFormMarkerY(q.markerPosition?.y ?? 50);
    setFormMarkerLabel(q.markerLabel || '①');
    setIsEditorOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestionText.trim() || !formCorrectAnswer.trim() || !formImageUrl.trim()) {
      alert('يرجى كتابة نص السؤال، الإجابة الصحيحة، ورابط صورة العينة.');
      return;
    }

    const cleanOptions = formOptions.map(o => o.trim()).filter(Boolean);
    if (formQuestionType === 'multiple_choice' && !cleanOptions.includes(formCorrectAnswer.trim())) {
      cleanOptions.unshift(formCorrectAnswer.trim());
    }

    const altAnswersList = formAlternativeAnswers
      ? formAlternativeAnswers.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    const questionData: ExamQuestion = {
      id: editingQuestion?.id || `q_bank_${Date.now()}`,
      labId: formLabId,
      topic: formTopic.trim() || 'General',
      difficulty: formDifficulty,
      questionType: formQuestionType,
      questionText: formQuestionText.trim(),
      questionTextArabic: formQuestionTextArabic.trim() || undefined,
      imageUrl: formImageUrl.trim(),
      specimenCategory: formSpecimenCategory.trim() || undefined,
      magnificationOrView: formMagnification.trim() || undefined,
      options: cleanOptions.length > 0 ? cleanOptions : [formCorrectAnswer.trim()],
      correctAnswer: formCorrectAnswer.trim(),
      alternativeAnswers: altAnswersList,
      explanation: formExplanation.trim() || undefined,
      clinicalNote: formClinicalNote.trim() || undefined,
      timeSeconds: Number(formTimeSeconds) || 30,
      marks: Number(formMarks) || 1,
      markerPosition: { x: Number(formMarkerX), y: Number(formMarkerY) },
      markerLabel: formMarkerLabel.trim() || '①'
    };

    // Save locally
    storageService.saveExamQuestion(questionData, currentUser);
    // Save to server
    await apiService.saveQuestion(questionData);

    setIsEditorOpen(false);
    resetForm();
    await loadQuestions();
  };

  const handleDeleteQuestion = async (id: string) => {
    storageService.deleteExamQuestion(id, currentUser);
    await apiService.deleteQuestion(id);
    setDeleteConfirmId(null);
    await loadQuestions();
  };

  const handleDuplicateQuestion = async (id: string) => {
    try {
      const duplicated = await apiService.duplicateQuestion(id);
      if (duplicated) {
        storageService.saveExamQuestion(duplicated, currentUser);
        await loadQuestions();
      }
    } catch {
      const target = questions.find(q => q.id === id);
      if (target) {
        const copy: ExamQuestion = {
          ...target,
          id: `${target.id}_copy_${Date.now()}`,
          questionText: `${target.questionText} (Copy)`
        };
        storageService.saveExamQuestion(copy, currentUser);
        await loadQuestions();
      }
    }
  };

  return (
    <div className="space-y-6" id="admin-question-bank-tab">
      {/* Top Banner & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono">
              OSPE Question Bank
            </span>
            <span className="text-xs text-slate-500 font-bold">
              إجمالي الأسئلة: <span className="font-mono text-indigo-600 font-black">{questions.length}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            بنك الأسئلة والمحطات العملية (OSPE Questions Bank)
          </h2>
          <p className="text-xs text-slate-500">
            إضافة وتعديل وحذف أسئلة المحطات العملية مع تحديد العلامات التشريحية ونقاط الارتكاز والصور المجهرية بدقة.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={loadQuestions}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            title="تحديث الأسئلة"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة سؤال عملي جديد</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث في نص السؤال، الإجابة، أو العينة..."
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

          {/* Topic Filter */}
          <div>
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">جميع المواضيع (All Topics)</option>
              <option value="Bones">Bones (العظام)</option>
              <option value="Muscles">Muscles (العضلات)</option>
              <option value="Movements">Movements (الحركات)</option>
              <option value="Joints">Joints (المفاصل)</option>
              <option value="Nerves">Nerves (الأعصاب)</option>
              <option value="OSPE">General OSPE</option>
              {availableTopics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">جميع المستويات (Difficulty)</option>
              <option value="easy">سهل (Easy)</option>
              <option value="medium">متوسط (Medium)</option>
              <option value="hard">متقدم (Hard)</option>
            </select>
          </div>
        </div>

        {/* Filter Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
          <span>
            يتم عرض <strong className="text-slate-800 font-bold font-mono">{filteredQuestions.length}</strong> من أصل <strong className="font-mono">{questions.length}</strong> سؤال
          </span>
          {(searchQuery || selectedLab !== 'all' || selectedTopic !== 'all' || selectedDifficulty !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedLab('all');
                setSelectedTopic('all');
                setSelectedDifficulty('all');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>
      </div>

      {/* Questions List Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">لا توجد أسئلة تطابق الفلتر المحدد</h3>
            <p className="text-xs text-slate-400">جرب تغيير معايير البحث أو إضافة سؤال جديد.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    onClick={() => setPreviewQuestion(q)}
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 cursor-pointer group shadow-2xs"
                  >
                    <img
                      src={q.imageUrl}
                      alt={q.questionText}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                    {q.markerPosition && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-mono font-black flex items-center justify-center">
                        {q.markerLabel || '●'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {q.labId}
                      </span>
                      {q.topic && (
                        <span className="font-semibold text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {q.topic}
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        q.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700' :
                        q.difficulty === 'hard' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {q.difficulty || 'medium'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {q.timeSeconds || 30}s | {q.marks || 1} mark
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.questionText}
                    </h4>

                    {q.questionTextArabic && (
                      <p className="text-xs text-slate-500">
                        {q.questionTextArabic}
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="text-slate-400">الإجابة الصحيحة:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono">
                        {q.correctAnswer}
                      </span>
                      {q.alternativeAnswers && q.alternativeAnswers.length > 0 && (
                        <span className="text-[11px] text-slate-500">
                          (+ {q.alternativeAnswers.length} بدائل مقبولة)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setPreviewQuestion(q)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                    title="معاينة محطة السؤال"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicateQuestion(q.id)}
                    className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                    title="نسخ السؤال (Duplicate)"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(q)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="تعديل السؤال"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(q.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="حذف السؤال"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question Editor / Add Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 my-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900">
                  {editingQuestion ? 'تعديل سؤال عملي' : 'إضافة سؤال جديد لبنك الأسئلة'}
                </h3>
                <p className="text-xs text-slate-500">
                  يرجى التأكد من دقة الصورة والمعالم التشريحية لضمان الاختبار الطبي المعتمد.
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

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Lab Subject */}
                <div>
                  <label className="block text-slate-700 mb-1">المعمل (Subject) *</label>
                  <select
                    value={formLabId}
                    onChange={e => setFormLabId(e.target.value as LabSubjectId)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-bold"
                  >
                    <option value="anatomy">Anatomy (تشريح)</option>
                    <option value="histology">Histology (أنسجة)</option>
                    <option value="biochemistry">Biochemistry (كيمياء حيوية)</option>
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-slate-700 mb-1">الموضوع (Topic) *</label>
                  <input
                    type="text"
                    value={formTopic}
                    onChange={e => setFormTopic(e.target.value)}
                    placeholder="مثال: Bones, Muscles, Movements"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                    required
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-slate-700 mb-1">مستوى الصعوبة</label>
                  <select
                    value={formDifficulty}
                    onChange={e => setFormDifficulty(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-bold"
                  >
                    <option value="easy">سهل (Easy)</option>
                    <option value="medium">متوسط (Medium)</option>
                    <option value="hard">متقدم (Hard)</option>
                  </select>
                </div>
              </div>

              {/* Question Text in English */}
              <div>
                <label className="block text-slate-700 mb-1">نص السؤال بالإنجليزية (Question Text - EN) *</label>
                <textarea
                  value={formQuestionText}
                  onChange={e => setFormQuestionText(e.target.value)}
                  placeholder="Identify the indicated bone structure / muscle / landmark..."
                  rows={2}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-medium"
                  required
                />
              </div>

              {/* Question Text in Arabic */}
              <div>
                <label className="block text-slate-700 mb-1">نص السؤال بالعربية (Question Text - AR)</label>
                <textarea
                  value={formQuestionTextArabic}
                  onChange={e => setFormQuestionTextArabic(e.target.value)}
                  placeholder="حدد المعلم التشريحي المشار إليه بالسهم..."
                  rows={2}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
              </div>

              {/* Image URL with instant preview */}
              <div>
                <label className="block text-slate-700 mb-1">رابط صورة العينة (Specimen Image URL) *</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... أو مسار صورة عينة موثقة"
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-mono"
                  required
                />
                {formImageUrl && (
                  <div className="mt-2 p-2 bg-slate-900 rounded-xl flex items-center justify-center max-h-40 overflow-hidden relative">
                    <img src={formImageUrl} alt="Preview" className="max-h-36 object-contain" />
                    {formMarkerX && formMarkerY && (
                      <div
                        className="absolute w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-black flex items-center justify-center border border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ left: `${formMarkerX}%`, top: `${formMarkerY}%` }}
                      >
                        {formMarkerLabel || '①'}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Marker Coordinates (X%, Y%) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">موضع العلامة أفقيًا (Marker X %)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formMarkerX}
                    onChange={e => setFormMarkerX(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">موضع العلامة رأسيًا (Marker Y %)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formMarkerY}
                    onChange={e => setFormMarkerY(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">رمز المؤشر (Marker Label)</label>
                  <input
                    type="text"
                    value={formMarkerLabel}
                    onChange={e => setFormMarkerLabel(e.target.value)}
                    placeholder="① أو A أو ●"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Specimen Category & Magnification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">فئة العينة (Specimen Category)</label>
                  <input
                    type="text"
                    value={formSpecimenCategory}
                    onChange={e => setFormSpecimenCategory(e.target.value)}
                    placeholder="Osteology Specimen, Muscle Dissection..."
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">التكبير / الزاوية (View / Magnification)</label>
                  <input
                    type="text"
                    value={formMagnification}
                    onChange={e => setFormMagnification(e.target.value)}
                    placeholder="Anterior View, 400x H&E, Superior Aspect..."
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="block text-slate-700">خيارات الإجابة (Options) *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => {
                          const next = [...formOptions];
                          next[idx] = e.target.value;
                          setFormOptions(next);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="w-full py-1.5 px-3 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct Answer & Alternative Answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">الإجابة الصحيحة (Correct Answer) *</label>
                  <input
                    type="text"
                    value={formCorrectAnswer}
                    onChange={e => setFormCorrectAnswer(e.target.value)}
                    placeholder="يجب أن تطابق أحد الخيارات أعلاه أو الإجابة النموذجية"
                    className="w-full py-2 px-3 rounded-xl border border-emerald-300 bg-emerald-50/50 text-emerald-950 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">بدائل مقبولة (مفصولة بفواصل)</label>
                  <input
                    type="text"
                    value={formAlternativeAnswers}
                    onChange={e => setFormAlternativeAnswers(e.target.value)}
                    placeholder="مثال: Femur bone, Right femur"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>
              </div>

              {/* Time & Marks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">زمن المحطة بالثواني (Seconds)</label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    value={formTimeSeconds}
                    onChange={e => setFormTimeSeconds(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">الدرجة المخصصة (Marks)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formMarks}
                    onChange={e => setFormMarks(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Explanation & Clinical Note */}
              <div>
                <label className="block text-slate-700 mb-1">الشرح والأهمية السريرية (Clinical Correlation)</label>
                <textarea
                  value={formExplanation}
                  onChange={e => setFormExplanation(e.target.value)}
                  placeholder="ملاحظات تشريحية أو سريرية تظهر للطالب بعد إنهاء الاختبار..."
                  rows={2}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
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
                  {editingQuestion ? 'حفظ التعديلات' : 'إضافة السؤال للبنك'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Specimen Preview Modal */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold font-mono">
                  {previewQuestion.labId.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {previewQuestion.specimenCategory || 'Specimen'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewQuestion(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-slate-950 rounded-2xl overflow-hidden min-h-[260px] max-h-[380px] flex items-center justify-center">
              <img
                src={previewQuestion.imageUrl}
                alt="Specimen preview"
                className="max-h-[380px] w-full object-contain"
              />
              {previewQuestion.markerPosition && (
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${previewQuestion.markerPosition.x}%`,
                    top: `${previewQuestion.markerPosition.y}%`
                  }}
                >
                  <div className="relative w-7 h-7 rounded-full bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white shadow-xl">
                    {previewQuestion.markerLabel || '①'}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">{previewQuestion.questionText}</h4>
              {previewQuestion.questionTextArabic && (
                <p className="text-xs text-slate-500">{previewQuestion.questionTextArabic}</p>
              )}
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-bold block">الخيارات:</span>
              <div className="grid grid-cols-2 gap-2">
                {previewQuestion.options.map((opt, i) => (
                  <div
                    key={opt}
                    className={`p-2 rounded-xl text-xs font-semibold border ${
                      opt === previewQuestion.correctAnswer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-mono font-bold mr-1">{String.fromCharCode(65 + i)}.</span> {opt}
                  </div>
                ))}
              </div>
            </div>
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
              <h4 className="text-base font-black text-slate-900">تأكيد حذف السؤال</h4>
              <p className="text-xs text-slate-500">
                هل أنت متأكد من رغبتك في حذف هذا السؤال من بنك الأسئلة؟ لا يمكن التراجع عن هذه الخطوة.
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
                onClick={() => handleDeleteQuestion(deleteConfirmId)}
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
