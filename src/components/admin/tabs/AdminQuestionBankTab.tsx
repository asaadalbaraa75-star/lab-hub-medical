/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * OSPE Question Bank & Contributor Review Workflow Tab
 * Roles:
 * - Owner (سكينة أسعد) & Admins: Full control, Review, Approve, Reject, Publish
 * - Assistants (1, 2, 3): Add, Upload Images, Edit Own, Save Draft, Submit for Review
 */
import React, { useState, useEffect, useRef } from 'react';
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
  RefreshCw,
  X,
  Clock,
  ChevronDown,
  Upload,
  Send,
  Check,
  FileText,
  MessageSquare,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { ExamQuestion, LabSubjectId, User as UserType, ExamType, QuestionStatus } from '../../../types';
import { storageService } from '../../../services/storageService';
import { apiService } from '../../../services/apiService';
import { authService } from '../../../services/authService';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
  subject: string;
  currentUser: any;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, examId, subject, currentUser }) => {
  const [questionEn, setQuestionEn] = useState('Identify the indicated structure:');
  const [questionAr, setQuestionAr] = useState('تعرّف على التركيب المشار إليه:');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [acceptableAnswers, setAcceptableAnswers] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [marks, setMarks] = useState(1);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImageUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctAnswer.trim()) {
      setError('يرجى إدخال الإجابة الصحيحة المقبولة للتصحيح التلقائي.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      let finalUrl = imageUrl;
      if (selectedFile) {
        const storageRef = ref(storage, `questions/${Date.now()}_${selectedFile.name}`);
        const uploadRes = await uploadBytes(storageRef, selectedFile);
        finalUrl = await getDownloadURL(uploadRes.ref);
      }

      const answersArr = (acceptableAnswers ? `${correctAnswer}, ${acceptableAnswers}` : correctAnswer)
        .split(',')
        .map((a) => a.trim().toLowerCase())
        .filter((a) => a.length > 0);

      await addDoc(collection(db, 'questions'), {
        examId,
        subject,
        type: 'written_opse',
        questionEn,
        questionAr,
        imageUrl: finalUrl,
        correctAnswer: correctAnswer.trim(),
        acceptableAnswers: answersArr,
        timeSeconds: Number(seconds),
        marks: Number(marks),
        clinicalNotes,
        createdAt: serverTimestamp(),
        createdBy: currentUser?.name || 'Admin'
      });

      setIsSaving(false);
      onClose();
    } catch (err: any) {
      setError('حدث خطأ أثناء الحفظ: ' + err.message);
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-black text-slate-900">إضافة سؤال عملي كتابي (OPSE)</h3>
          <button type="button" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
        </div>

        {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold mb-1">صورة الشريحة / العينة *</label>
            <input type="file" ref={fileRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-indigo-200 rounded-2xl p-4 text-center cursor-pointer bg-indigo-50/50">
              <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-indigo-900">اضغطي لاختيار الصورة من جوالكِ</p>
            </div>
          </div>

          {imageUrl && (
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border">
              <img src={imageUrl} alt="Slide" className="w-full h-full object-contain" />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold mb-1">السؤال (English) *</label>
            <input type="text" required value={questionEn} onChange={(e) => setQuestionEn(e.target.value)} className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50" />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-emerald-700">الإجابة الصحيحة النموذجية *</label>
            <input type="text" required value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} placeholder="مثال: Femur" className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-xl bg-emerald-50 font-bold" />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">بدائل مقبولة أخرى (مفصولة بفاصلة)</label>
            <input type="text" value={acceptableAnswers} onChange={(e) => setAcceptableAnswers(e.target.value)} placeholder="مثال: Right femur, Femur bone, عظم الفخذ" className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold mb-1">زمن المحطة (ثواني)</label>
              <input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">الدرجة المخصصة</label>
              <input type="number" value={marks} onChange={(e) => setMarks(Number(e.target.value))} className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-bold" />
            </div>
          </div>

          <div className="pt-3 border-t flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600">إلغاء</button>
            <button type="submit" disabled={isSaving} className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1">
              {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>حفظ السؤال في الاختبار</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AdminQuestionBankTabProps {
  currentUser: UserType;
}

export const AdminQuestionBankTab: React.FC<AdminQuestionBankTabProps> = ({ currentUser }) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<ExamQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Role Checks
  const isOwner = currentUser.role === 'owner' || currentUser.role === 'admin';
  const isEditor = currentUser.role === 'content_exams' || currentUser.role === 'editor';
  const isExamEditor = currentUser.role === 'exams_only' || currentUser.role === 'exam_editor';
  const isAssistant = isEditor || isExamEditor || currentUser.id.startsWith('usr_assistant') || currentUser.id.startsWith('AST-');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<ExamQuestion | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Review Modal State (For Owner / Admin)
  const [reviewModalQuestion, setReviewModalQuestion] = useState<ExamQuestion | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Form State
  const [formLabId, setFormLabId] = useState<LabSubjectId>('anatomy');
  const [formTopic, setFormTopic] = useState('Bones');
  const [formUnit, setFormUnit] = useState('');
  const [formLessonTitle, setFormLessonTitle] = useState('');
  const [formExamTitle, setFormExamTitle] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formQuestionType, setFormQuestionType] = useState<ExamType>('multiple_choice');
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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const serverData = await apiService.fetchQuestions();
      if (Array.isArray(serverData) && serverData.length > 0) {
        setQuestions(serverData);
      } else {
        const localData = storageService.getExamQuestions();
        setQuestions(localData);
      }
    } catch {
      const localData = storageService.getExamQuestions();
      setQuestions(localData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();

    const handleSync = (e: any) => {
      if (!e.detail?.type || e.detail.type === 'questions' || e.detail.type === 'all') {
        loadQuestions();
      }
    };
    window.addEventListener('labhub_production_sync', handleSync);
    window.addEventListener('focus', loadQuestions);

    let bc: BroadcastChannel | null = null;
    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel('labhub_sync_channel');
        bc.onmessage = (msg) => {
          if (!msg.data?.type || msg.data.type === 'questions' || msg.data.type === 'all') {
            loadQuestions();
          }
        };
      }
    } catch {}

    return () => {
      window.removeEventListener('labhub_production_sync', handleSync);
      window.removeEventListener('focus', loadQuestions);
      if (bc) {
        try { bc.close(); } catch {}
      }
    };
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

    if (selectedStatus !== 'all') {
      if (selectedStatus === 'my_submissions') {
        result = result.filter(q => q.authorId === currentUser.id);
      } else {
        result = result.filter(q => (q.status || 'published') === selectedStatus);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        item.questionText?.toLowerCase().includes(q) ||
        item.questionTextArabic?.includes(q) ||
        item.correctAnswer?.toLowerCase().includes(q) ||
        item.specimenCategory?.toLowerCase().includes(q) ||
        item.topic?.toLowerCase().includes(q) ||
        item.unit?.toLowerCase().includes(q) ||
        item.lessonTitle?.toLowerCase().includes(q) ||
        item.examTitle?.toLowerCase().includes(q) ||
        item.authorName?.toLowerCase().includes(q)
      );
    }

    // Auto-sort questions hierarchically: Subject (anatomy -> histology -> biochemistry) -> Unit/Topic -> Question Text
    const subjectOrder: Record<string, number> = { anatomy: 1, histology: 2, biochemistry: 3 };
    result.sort((a, b) => {
      const subA = subjectOrder[a.labId] || 99;
      const subB = subjectOrder[b.labId] || 99;
      if (subA !== subB) return subA - subB;

      const unitA = (a.topic || a.specimenCategory || '').toLowerCase();
      const unitB = (b.topic || b.specimenCategory || '').toLowerCase();
      if (unitA !== unitB) return unitA.localeCompare(unitB, 'ar');

      const textA = (a.questionText || a.questionTextArabic || '').toLowerCase();
      const textB = (b.questionText || b.questionTextArabic || '').toLowerCase();
      return textA.localeCompare(textB, 'ar');
    });

    setFilteredQuestions(result);
  }, [questions, selectedLab, selectedTopic, selectedDifficulty, selectedStatus, searchQuery, currentUser.id]);

  // Counts for workflow metrics
  const pendingCount = questions.filter(q => q.status === 'pending_review').length;
  const approvedCount = questions.filter(q => q.status === 'approved').length;
  const publishedCount = questions.filter(q => !q.status || q.status === 'published').length;
  const draftCount = questions.filter(q => q.status === 'draft').length;
  const mySubmissionsCount = questions.filter(q => q.authorId === currentUser.id).length;

  const availableTopics = Array.from(new Set(questions.map(q => q.topic).filter(Boolean))) as string[];

  const resetForm = () => {
    setEditingQuestion(null);
    setFormLabId('anatomy');
    setFormTopic('Bones');
    setFormUnit('');
    setFormLessonTitle('');
    setFormExamTitle('');
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
    // Authorized staff (Owner, Admin, Editor, Exam Editor) can edit shared question bank items
    const canEdit = isOwner || isEditor || isExamEditor || (q.authorId === currentUser.id);
    if (!canEdit) {
      alert('ليس لديك صلاحية لتعديل هذا السؤال.');
      return;
    }

    setEditingQuestion(q);
    setFormLabId(q.labId);
    setFormTopic(q.topic || 'General');
    setFormUnit(q.unit || '');
    setFormLessonTitle(q.lessonTitle || '');
    setFormExamTitle(q.examTitle || '');
    const mappedDiff: 'easy' | 'medium' | 'hard' = 
      q.difficulty === 'basic' || q.difficulty === 'easy' ? 'easy' :
      q.difficulty === 'hard' || q.difficulty === 'advanced' ? 'hard' : 'medium';
    setFormDifficulty(mappedDiff);
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

  // Image Upload Handling
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (JPEG, PNG, WebP).');
      return;
    }

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const uploadedUrl = await apiService.uploadQuestionImage(base64Data);
      if (uploadedUrl) {
        setFormImageUrl(uploadedUrl);
      } else {
        setFormImageUrl(base64Data);
      }
      setIsUploadingImage(false);
    };
    reader.onerror = () => {
      alert('تعذر قراءة ملف الصورة.');
      setIsUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  // Save Question Handler with Target Status
  const handleSaveQuestionWithStatus = async (targetStatus: QuestionStatus) => {
    setSaveError(null);

    if (!formQuestionText.trim() || !formCorrectAnswer.trim() || !formImageUrl.trim()) {
      setSaveError('يرجى كتابة نص السؤال، الإجابة الصحيحة، وصورة العينة.');
      return;
    }

    setIsSaving(true);
    try {
      const cleanOptions = formOptions.map(o => o.trim()).filter(Boolean);
      if (formQuestionType === 'multiple_choice' && !cleanOptions.includes(formCorrectAnswer.trim())) {
        cleanOptions.unshift(formCorrectAnswer.trim());
      }

      const altAnswersList = formAlternativeAnswers
        ? formAlternativeAnswers.split(',').map(s => s.trim()).filter(Boolean)
        : undefined;

      const resolvedStatus: QuestionStatus = (isOwner || isEditor || isExamEditor)
        ? targetStatus
        : 'pending_review';

      const questionData: ExamQuestion = {
        id: editingQuestion?.id || `q_bank_${Date.now()}`,
        labId: formLabId,
        type: formQuestionType,
        topic: formTopic.trim() || 'General',
        unit: formUnit.trim() || undefined,
        lessonTitle: formLessonTitle.trim() || undefined,
        examTitle: formExamTitle.trim() || undefined,
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
        markerLabel: formMarkerLabel.trim() || '①',
        status: resolvedStatus,
        authorId: editingQuestion?.authorId || currentUser.id,
        authorName: editingQuestion?.authorName || currentUser.name,
        authorRole: editingQuestion?.authorRole || currentUser.role,
        submittedAt: editingQuestion?.submittedAt || new Date().toISOString()
      };

      // 1. Direct write to shared production database and await confirmation
      const saveRes = await storageService.saveExamQuestion(questionData, currentUser);
      if (!saveRes.success) {
        setSaveError(saveRes.error || 'فشل حفظ السؤال في قاعدة البيانات المركزية. يرجى إعادة المحاولة.');
        return;
      }

      // 2. Production save confirmed
      setIsEditorOpen(false);
      resetForm();
      await loadQuestions();
    } catch (e: any) {
      setSaveError(e.message || 'حدث خطأ أثناء حفظ السؤال في الخادم.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    const canDelete = isOwner || isEditor || isExamEditor;
    if (!canDelete) {
      alert('ليس لديك صلاحية لحذف هذا السؤال.');
      return;
    }

    try {
      const res = await storageService.deleteExamQuestion(id, currentUser);
      if (!res.success) {
        alert(res.error || 'فشل حذف السؤال من الخادم.');
        return;
      }
      setDeleteConfirmId(null);
      await loadQuestions();
    } catch (e: any) {
      alert(e.message || 'حدث خطأ أثناء حذف السؤال.');
    }
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
          questionText: `${target.questionText} (Copy)`,
          status: isOwner ? target.status : 'draft'
        };
        storageService.saveExamQuestion(copy, currentUser);
        await loadQuestions();
      }
    }
  };

  // Owner Review Action: Approve or Reject
  const handleReviewAction = async (status: QuestionStatus) => {
    if (!reviewModalQuestion) return;
    setIsSubmittingReview(true);

    try {
      const authSession = authService.getSession();
      const token = authSession?.token;

      const res = await apiService.updateQuestionStatus(
        reviewModalQuestion.id,
        status,
        reviewNotes.trim() || undefined,
        token
      );

      if (res.success) {
        await loadQuestions();
        setReviewModalQuestion(null);
        setReviewNotes('');
      } else {
        alert(res.error || 'تعذر تحديث حالة السؤال.');
      }
    } catch {
      alert('خطأ أثناء التواصل مع الخادم.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (status?: QuestionStatus) => {
    const s = status || 'published';
    switch (s) {
      case 'pending_review':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
            <Clock className="w-3 h-3 text-amber-600" />
            بانتظار مراجعة الإدارة (Pending Review)
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            معتمد من الإدارة (Approved)
          </span>
        );
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            منشور في الاختبارات (Published)
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            بحاجة لتعديل (Needs Revision)
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <FileText className="w-3 h-3 text-slate-500" />
            مسودة خاصة (Draft)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" id="admin-question-bank-tab">
      {/* Top Banner & Workflow Stats */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono">
              OSPE Question Bank
            </span>
            <span className="text-xs text-slate-500 font-bold">
              إجمالي الأسئلة: <span className="font-mono text-indigo-600 font-black">{questions.length}</span>
            </span>
            {pendingCount > 0 && isOwner && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold animate-pulse">
                {pendingCount} أسئلة بانتظار مراجعتك واعتمادك
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            بنك الأسئلة والمحطات العملية (Question Management Hub)
          </h2>
          <p className="text-xs text-slate-500">
            {isOwner
              ? 'مساحة المالك الكاملة — إضافة، مراجعة، اعتماد ونشر أسئلة المحطات العملية والمساعدين الـ 3'
              : 'مساحة مساعد إعداد الأسئلة — إضافة أسئلة، رفع الصور التوضيحية، حفظ مسودات، وإرسالها لمراجعة المالك'}
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

      {/* Workflow Tabs (Review Pipeline) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedStatus('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedStatus === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>جميع الأسئلة</span>
          <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">{questions.length}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('pending_review')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedStatus === 'pending_review'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-amber-700 hover:bg-amber-50/50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>بانتظار المراجعة (Pending)</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-md bg-amber-200 text-amber-900 text-[10px] font-bold">{pendingCount}</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('approved')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedStatus === 'approved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50/50'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          <span>معتمدة (Approved)</span>
          <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono">{approvedCount}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('published')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedStatus === 'published'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-indigo-700 hover:bg-indigo-50/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>منشورة في الامتحانات</span>
          <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono">{publishedCount}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('draft')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedStatus === 'draft'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>مسودات (Drafts)</span>
          <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono">{draftCount}</span>
        </button>

        {isAssistant && (
          <button
            type="button"
            onClick={() => setSelectedStatus('my_submissions')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              selectedStatus === 'my_submissions'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-purple-700 hover:bg-purple-50/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>أسئلتي المقدمة ({mySubmissionsCount})</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="البحث في نص السؤال، الإجابة، المساعد..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedLab}
              onChange={e => setSelectedLab(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">جميع المعامل (All Labs)</option>
              <option value="anatomy">Anatomy (تشريح)</option>
              <option value="histology">Histology (أنسجة)</option>
              <option value="biochemistry">Biochemistry (كيمياء حيوية)</option>
            </select>
          </div>

          {/* Topic Filter */}
          <div>
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">جميع المواضيع (All Topics)</option>
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
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">جميع المستويات</option>
              <option value="easy">سهل (Easy)</option>
              <option value="medium">متوسط (Medium)</option>
              <option value="hard">متقدم (Hard)</option>
            </select>
          </div>
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
            {filteredQuestions.map(q => (
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
                      {q.unit && (
                        <span className="font-semibold text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                          الوحدة: {q.unit}
                        </span>
                      )}
                      {q.lessonTitle && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                          الدرس: {q.lessonTitle}
                        </span>
                      )}
                      {q.examTitle && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                          الامتحان: {q.examTitle}
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

                      {/* Status Badge */}
                      {renderStatusBadge(q.status)}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.questionText}
                    </h4>

                    {q.questionTextArabic && (
                      <p className="text-xs text-slate-500">
                        {q.questionTextArabic}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-1 text-xs flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">الإجابة:</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono">
                          {q.correctAnswer}
                        </span>
                      </div>
                      {q.authorName && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>بواسطة: <strong>{q.authorName}</strong></span>
                        </span>
                      )}
                      {q.reviewNotes && (
                        <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-amber-600" />
                          <span>ملاحظة المراجعة: {q.reviewNotes}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                  {/* Owner Review / Approval Action */}
                  {isOwner && q.status === 'pending_review' && (
                    <button
                      type="button"
                      onClick={() => {
                        setReviewModalQuestion(q);
                        setReviewNotes(q.reviewNotes || '');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>مراجعة واعتماد</span>
                    </button>
                  )}

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

                  {/* Edit: Owner can edit all; Assistant can edit own */}
                  {(isOwner || q.authorId === currentUser.id) && (
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(q)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      title="تعديل السؤال"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Delete: Owner can delete all; Assistant can delete own draft */}
                  {(isOwner || (q.authorId === currentUser.id && q.status === 'draft')) && (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(q.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="حذف السؤال"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 my-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900">
                  {editingQuestion ? 'تعديل سؤال عملي' : 'إضافة سؤال جديد لبنك الأسئلة'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isOwner
                    ? 'إضافة أو تعديل السؤال مع النشر الفوري للامتحانات العملية'
                    : 'يمكنك حفظ السؤال كمسودة أو تقديمه لمراجعة مالكة المنصة (سكينة أسعد)'}
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

            <div className="space-y-4 text-xs font-semibold">
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

              {/* Hierarchy: Unit, Lesson, Exam */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div>
                  <label className="block text-indigo-900 mb-1 font-bold">الوحدة (Unit)</label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={e => setFormUnit(e.target.value)}
                    placeholder="مثال: Upper Limb, Thorax..."
                    className="w-full py-2 px-3 rounded-xl border border-indigo-200 bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-indigo-900 mb-1 font-bold">الدرس العملي المرتبط (Lesson)</label>
                  <input
                    type="text"
                    value={formLessonTitle}
                    onChange={e => setFormLessonTitle(e.target.value)}
                    placeholder="مثال: Practical 1 - Bones of Arm"
                    className="w-full py-2 px-3 rounded-xl border border-indigo-200 bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-indigo-900 mb-1 font-bold">الامتحان المرتبط (Exam)</label>
                  <input
                    type="text"
                    value={formExamTitle}
                    onChange={e => setFormExamTitle(e.target.value)}
                    placeholder="مثال: Midterm Spotter Exam"
                    className="w-full py-2 px-3 rounded-xl border border-indigo-200 bg-white text-slate-800"
                  />
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

              {/* Image Upload or URL */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-700 font-bold">
                    صورة العينة التوضيحية (Specimen Diagram / Image) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="px-3 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-600 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingImage ? 'جاري الرفع...' : 'رفع صورة من الجهاز'}</span>
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  placeholder="أو الصق رابط الصورة: https://... أو مسار صورة عينة موثقة"
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-mono text-xs bg-white"
                  required
                />

                {formImageUrl && (
                  <div className="mt-2 p-2 bg-slate-900 rounded-xl flex items-center justify-center max-h-44 overflow-hidden relative">
                    <img src={formImageUrl} alt="Preview" className="max-h-40 object-contain rounded" />
                    {formMarkerX !== undefined && formMarkerY !== undefined && (
                      <div
                        className="absolute w-6 h-6 rounded-full bg-rose-600 text-white font-mono text-[10px] font-black flex items-center justify-center border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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

              {/* OPSE Written Spotter Station - Answers */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-900">
                  <span>محطة كتابية عملية (OPSE Written Spotter) — تم إلغاء الخيارات المتعددة (A, B, C, D)</span>
                  <span className="font-mono text-indigo-700">30 ثانية لكل شريحة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 text-xs font-bold">الإجابة النموذجية (Canonical Answer) *</label>
                    <input
                      type="text"
                      value={formCorrectAnswer}
                      onChange={e => setFormCorrectAnswer(e.target.value)}
                      placeholder="مثال: Femur"
                      className="w-full py-2 px-3 rounded-xl border-2 border-emerald-400 bg-emerald-50/40 text-emerald-950 font-bold text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 text-xs font-bold">مصفوفة الإجابات المقبولة (acceptableAnswers - مفصولة بفواصل)</label>
                    <input
                      type="text"
                      value={formAlternativeAnswers}
                      onChange={e => setFormAlternativeAnswers(e.target.value)}
                      placeholder="مثال: Femur, Os femoris, عظم الفخذ, فخذ"
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-medium"
                    />
                  </div>
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

              {/* Save Error Feedback Alert */}
              {saveError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="flex-1">{saveError}</span>
                </div>
              )}

              {/* Role-Specific Submission Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsEditorOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  إلغاء
                </button>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Assistant Actions */}
                  {isAssistant && !isOwner && (
                    <>
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleSaveQuestionWithStatus('draft')}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin text-slate-600" /> : <FileText className="w-4 h-4" />}
                        <span>حفظ كمسودة (Save Draft)</span>
                      </button>
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleSaveQuestionWithStatus('pending_review')}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        <span>إرسال للمراجعة والاعتماد (Submit)</span>
                      </button>
                    </>
                  )}

                  {/* Owner Actions */}
                  {isOwner && (
                    <>
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleSaveQuestionWithStatus('draft')}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5"
                      >
                        {isSaving && <RefreshCw className="w-4 h-4 animate-spin text-slate-600" />}
                        <span>حفظ كمسودة</span>
                      </button>
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleSaveQuestionWithStatus('approved')}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span>حفظ كمعتمد</span>
                      </button>
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleSaveQuestionWithStatus('published')}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        <span>حفظ ونشر في الاختبارات</span>
                      </button>
                    </>
                  )}

                  {/* Fallback for other authorized roles */}
                  {!isOwner && !isAssistant && (
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSaveQuestionWithStatus('approved')}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      <span>حفظ السؤال في بنك الأسئلة</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal (Owner Action for Assistant Submissions) */}
      {reviewModalQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-slate-900">مراجعة واعتماد سؤال المساعد</h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalQuestion(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">مقدم السؤال:</span>
                <span className="font-bold text-slate-800">{reviewModalQuestion.authorName || 'مساعد إعداد الأسئلة'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">نص السؤال:</span>
                <p className="font-bold text-slate-900 mt-0.5">{reviewModalQuestion.questionText}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">الإجابة الصحيحة:</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {reviewModalQuestion.correctAnswer}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ملاحظات المراجعة أو التوجيهات للمساعد (Review Notes)
              </label>
              <textarea
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
                placeholder="أضف ملاحظاتك أو أسباب طلب التعديل إن وجدت..."
                rows={2}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                disabled={isSubmittingReview}
                onClick={() => handleReviewAction('rejected')}
                className="flex-1 py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition"
              >
                طلب تعديل / رفض
              </button>
              <button
                type="button"
                disabled={isSubmittingReview}
                onClick={() => handleReviewAction('approved')}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs"
              >
                اعتماد (Approve)
              </button>
              <button
                type="button"
                disabled={isSubmittingReview}
                onClick={() => handleReviewAction('published')}
                className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md"
              >
                نشر مباشر (Publish)
              </button>
            </div>
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
                {renderStatusBadge(previewQuestion.status)}
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

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">نوع السؤال:</span>
                <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  محطة كتابية عملية (OPSE Written Spotter - 30s)
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                <div>
                  <span className="font-bold text-slate-600">الإجابة النموذجية: </span>
                  <span className="font-black text-emerald-700">{previewQuestion.correctAnswer}</span>
                </div>
                {previewQuestion.acceptableAnswers && previewQuestion.acceptableAnswers.length > 0 && (
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-400">الإجابات المقبولة: </span>
                    <span>{previewQuestion.acceptableAnswers.join(' • ')}</span>
                  </div>
                )}
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
