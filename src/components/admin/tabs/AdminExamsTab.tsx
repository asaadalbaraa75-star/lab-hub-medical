import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Award,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  X,
  ShieldCheck,
  Clock,
  HelpCircle,
  Upload,
  Image as ImageIcon,
  Check,
  FileText,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { User, LabSubjectId, Exam, ExamQuestion, Practical } from '../../../types';
import { securityService } from '../../../services/securityService';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';

interface Props {
  currentUser: User;
}

// ضغط صور الأسئلة والشرائح آلياً من الهاتف
const compressImageFile = (file: File, maxWidth = 1000, quality = 0.75): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('فشل ضغط الصورة'));
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const AdminExamsTab: React.FC<Props> = ({ currentUser }) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [practicals, setPracticals] = useState<Practical[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | LabSubjectId>('all');

  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formExamTitle, setFormExamTitle] = useState('');
  const [formExamTitleArabic, setFormExamTitleArabic] = useState('');
  const [formExamDescription, setFormExamDescription] = useState('');
  const [formExamSubject, setFormExamSubject] = useState<LabSubjectId>('anatomy');
  const [formExamLessonId, setFormExamLessonId] = useState('');
  const [formTimePerQuestionSeconds, setFormTimePerQuestionSeconds] = useState(30);
  const [formPassingScorePercent, setFormPassingScorePercent] = useState(70);

  const [activeExamForQuestion, setActiveExamForQuestion] = useState<Exam | null>(null);
  const [qTextEn, setQTextEn] = useState('');
  const [qTextAr, setQTextAr] = useState('');
  const [qImageUrl, setQImageUrl] = useState('');
  const [qAcceptableAnswers, setQAcceptableAnswers] = useState('');
  const [qMarks, setQMarks] = useState(1);
  const [qClinicalNotes, setQClinicalNotes] = useState('');
  const [qSelectedFile, setQSelectedFile] = useState<File | null>(null);
  const questionFileInputRef = useRef<HTMLInputElement>(null);

  const canManage = securityService.canPerformAction(currentUser.role, 'manage_exams');

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;

    const unsubExams = onSnapshot(
      collection(db, 'exams'),
      (snap) => {
        if (!isMounted) return;
        const list: Exam[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Exam));
        setExams(list);
        setIsLoading(false);
      },
      (err) => {
        console.error('Exams sync error:', err);
        setIsLoading(false);
      }
    );

    const unsubQuestions = onSnapshot(
      collection(db, 'questions'),
      (snap) => {
        if (!isMounted) return;
        const list: ExamQuestion[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as ExamQuestion));
        setQuestions(list);
      },
      (err) => console.warn('Questions sync error:', err)
    );

    const unsubLessons = onSnapshot(
      collection(db, 'lessons'),
      (snap) => {
        if (!isMounted) return;
        const list: Practical[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Practical));
        setPracticals(list);
      },
      (err) => console.warn('Lessons sync error:', err)
    );

    return () => {
      isMounted = false;
      unsubExams();
      unsubQuestions();
      unsubLessons();
    };
  }, []);

  const availableLessons = useMemo(() => {
    return practicals.filter((p) => p.courseId === formExamSubject);
  }, [practicals, formExamSubject]);

  const handleOpenAddExamModal = () => {
    setEditingExam(null);
    setFormExamTitle('');
    setFormExamTitleArabic('');
    setFormExamDescription('');
    setFormExamSubject('anatomy');
    setFormExamLessonId('');
    setFormTimePerQuestionSeconds(30);
    setFormPassingScorePercent(70);
    setIsExamModalOpen(true);
  };

  const handleOpenEditExamModal = (exam: Exam) => {
    setEditingExam(exam);
    setFormExamTitle(exam.title || '');
    setFormExamTitleArabic(exam.titleArabic || '');
    setFormExamDescription(exam.description || '');
    setFormExamSubject((exam.subject || exam.courseId) as LabSubjectId || 'anatomy');
    setFormExamLessonId(exam.lessonId || '');
    setFormTimePerQuestionSeconds(exam.timePerQuestionSeconds || 30);
    setFormPassingScorePercent(exam.passingScorePercent || 70);
    setIsExamModalOpen(true);
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formExamTitle.trim()) {
      setFeedback({ type: 'error', message: 'يرجى إدخال عنوان الاختبار.' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      const selectedLesson = practicals.find((p) => p.id === formExamLessonId);

      const examData = {
        title: formExamTitle.trim(),
        titleArabic: formExamTitleArabic.trim(),
        description: formExamDescription.trim(),
        subject: formExamSubject,
        courseId: formExamSubject,
        lessonId: formExamLessonId || null,
        lessonTitle: selectedLesson?.title || null,
        type: 'opse',
        timePerQuestionSeconds: Number(formTimePerQuestionSeconds),
        passingScorePercent: Number(formPassingScorePercent),
        updatedAt: new Date().toISOString(),
        createdBy: `${currentUser.name} (${currentUser.role})`,
        userId: currentUser.id
      };

      if (editingExam) {
        await updateDoc(doc(db, 'exams', editingExam.id), examData);
        setFeedback({ type: 'success', message: 'تم تحديث بيانات الاختبار بنجاح!' });
      } else {
        await addDoc(collection(db, 'exams'), {
          ...examData,
          questionIds: [],
          questionCount: 0,
          createdAt: serverTimestamp()
        });
        setFeedback({ type: 'success', message: 'تم إنشاء الاختبار بنجاح!' });
      }

      setIsExamModalOpen(false);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'حدث خطأ في الحفظ: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddQuestionModal = (exam: Exam) => {
    setActiveExamForQuestion(exam);
    setQTextEn('Identify the highlighted structure:');
    setQTextAr('تعرّف على التركيب المشار إليه:');
    setQImageUrl('');
    setQAcceptableAnswers('');
    setQMarks(1);
    setQClinicalNotes('');
    setQSelectedFile(null);
    setIsQuestionModalOpen(true);
  };

  const handleQuestionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setQImageUrl(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExamForQuestion) return;

    if (!qAcceptableAnswers.trim()) {
      setFeedback({ type: 'error', message: 'يرجى إدخال الإجابة المقبولة للتصحيح التلقائي.' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      let finalImageUrl = qImageUrl.trim();

      if (qSelectedFile) {
        const compressedBlob = await compressImageFile(qSelectedFile);
        const storageRef = ref(storage, `questions/${Date.now()}_${qSelectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
        const uploadResult = await uploadBytes(storageRef, compressedBlob);
        finalImageUrl = await getDownloadURL(uploadResult.ref);
      }

      const answersArray = qAcceptableAnswers
        .split(',')
        .map((a) => a.trim().toLowerCase())
        .filter((a) => a.length > 0);

      const questionData = {
        examId: activeExamForQuestion.id,
        subject: activeExamForQuestion.subject,
        questionEn: qTextEn.trim(),
        questionAr: qTextAr.trim(),
        imageUrl: finalImageUrl,
        correctAnswer: answersArray[0] || '',
        acceptableAnswers: answersArray,
        marks: Number(qMarks),
        clinicalCorrelation: qClinicalNotes.trim(),
        createdAt: new Date().toISOString(),
        createdBy: currentUser.name
      };

      const qDocRef = await addDoc(collection(db, 'questions'), questionData);

      const updatedQuestionIds = [...(activeExamForQuestion.questionIds || []), qDocRef.id];
      await updateDoc(doc(db, 'exams', activeExamForQuestion.id), {
        questionIds: updatedQuestionIds,
        questionCount: updatedQuestionIds.length,
        updatedAt: new Date().toISOString()
      });

      setFeedback({ type: 'success', message: 'تمت إضافة شريحة السؤال بنجاح!' });
      setIsQuestionModalOpen(false);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'خطأ في حفظ السؤال: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteExam = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteDoc(doc(db, 'exams', id));
      setFeedback({ type: 'success', message: 'تم حذف الاختبار العملي بنجاح.' });
      setDeleteConfirmId(null);
    } catch (e: any) {
      setFeedback({ type: 'error', message: 'خطأ أثناء الحذف: ' + e.message });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!exam.title?.toLowerCase().includes(q) && !exam.titleArabic?.toLowerCase().includes(q)) return false;
      }
      if (selectedSubject !== 'all' && exam.subject !== selectedSubject && exam.courseId !== selectedSubject) return false;
      return true;
    });
  }, [exams, searchQuery, selectedSubject]);

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">إدارة الاختبارات العملية الكتابية (OPSE Spotters)</h1>
            <p className="text-xs text-slate-500">إنشاء اختبارات الشرائح بالوقت والتصحيح الآلي لكتابة الطلاب</p>
          </div>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={handleOpenAddExamModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء اختبار عملي كتابي</span>
          </button>
        )}
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold ${
            feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{feedback.message}</span>
          </div>
          <button type="button" onClick={() => setFeedback(null)}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الاختبار العملي..."
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value as any)}
          className="w-full md:w-44 px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold text-slate-700"
        >
          <option value="all">كل المواد</option>
          <option value="anatomy">Anatomy</option>
          <option value="histology">Histology</option>
          <option value="biochemistry">Biochemistry</option>
        </select>
      </div>

      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-bold">جاري تحميل الاختبارات العملية...</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500 font-bold">لا توجد اختبارات مضافة. اضغطي على إنشاء اختبار بالأعلى.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => {
            const examQs = questions.filter((q) => q.examId === exam.id || exam.questionIds?.includes(q.id));
            return (
              <div
                key={exam.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      اختبار كتابي عملي (OPSE)
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      {exam.timePerQuestionSeconds || 30} ثانية / شريحة
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{exam.title}</h3>
                    {exam.titleArabic && <p className="text-xs text-slate-500 font-medium mt-0.5">{exam.titleArabic}</p>}
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span>عدد الأسئلة: <strong>{examQs.length} شرائح</strong></span>
                    <span>نسبة النجاح: <strong>{exam.passingScorePercent}%</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                  {canManage && (
                    <button
                      type="button"
                      onClick={() => handleOpenAddQuestionModal(exam)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-[11px] font-bold border border-indigo-200 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة سؤال/شريحة</span>
                    </button>
                  )}

                  {canManage && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditExamModal(exam)}
                        className="px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(exam.id)}
                        className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-black text-slate-900">
                {editingExam ? 'تعديل الاختبار العملي' : 'إنشاء اختبار عملي كتابي (OPSE)'}
              </h3>
              <button type="button" onClick={() => setIsExamModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">عنوان الاختبار بالإنجليزية *</label>
                <input
                  type="text"
                  required
                  value={formExamTitle}
                  onChange={(e) => setFormExamTitle(e.target.value)}
                  placeholder="e.g. Histology Spotter Exam"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">عنوان الاختبار بالعربي</label>
                <input
                  type="text"
                  value={formExamTitleArabic}
                  onChange={(e) => setFormExamTitleArabic(e.target.value)}
                  placeholder="مثال: اختبار الأنسجة العملي"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">المادة *</label>
                  <select
                    value={formExamSubject}
                    onChange={(e) => setFormExamSubject(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-bold"
                  >
                    <option value="anatomy">Anatomy</option>
                    <option value="histology">Histology</option>
                    <option value="biochemistry">Biochemistry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">وقت الشريحة (ثانية) *</label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={formTimePerQuestionSeconds}
                    onChange={(e) => setFormTimePerQuestionSeconds(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-bold text-indigo-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">ربط بالدرس العملي</label>
                <select
                  value={formExamLessonId}
                  onChange={(e) => setFormExamLessonId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                >
                  <option value="">-- اختبار شامل للمادة --</option>
                  {availableLessons.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsExamModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingExam ? 'حفظ التعديلات' : 'حفظ ونشر الاختبار'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isQuestionModalOpen && activeExamForQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">إضافة شريحة كتابية لاختبار: {activeExamForQuestion.title}</h3>
                <p className="text-[11px] text-slate-500">سيقوم الطالب بكتابة اسم العينة وسيقوم النظام بتصحيحها فوراً</p>
              </div>
              <button type="button" onClick={() => setIsQuestionModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">صورة الشريحة/العينة *</label>
                <input type="file" ref={questionFileInputRef} onChange={handleQuestionFileChange} accept="image/*" className="hidden" />
                <div
                  onClick={() => questionFileInputRef.current?.click()}
                  className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-4 text-center cursor-pointer bg-indigo-50/50"
                >
                  <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-indigo-900">اضغطي لاختيار صورة الشريحة من جوالكِ</p>
                  {qSelectedFile && <p className="text-[10px] text-emerald-600 font-bold mt-1">المحدد: {qSelectedFile.name}</p>}
                </div>
              </div>

              {qImageUrl && (
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border">
                  <img src={qImageUrl} alt="Slide Preview" className="w-full h-full object-contain" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">السؤال (English) *</label>
                  <input
                    type="text"
                    required
                    value={qTextEn}
                    onChange={(e) => setQTextEn(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">السؤال (بالعربي)</label>
                  <input
                    type="text"
                    value={qTextAr}
                    onChange={(e) => setQTextAr(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-emerald-700">
                  الإجابات المقبولة للتصحيح التلقائي (مفصولة بفاصلة) *
                </label>
                <input
                  type="text"
                  required
                  value={qAcceptableAnswers}
                  onChange={(e) => setQAcceptableAnswers(e.target.value)}
                  placeholder="مثال: Femur, Right femur, Femur bone"
                  className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-xl bg-emerald-50/50 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">الشرح التوضيحي بعد الإجابة (Clinical Notes)</label>
                <textarea
                  rows={2}
                  value={qClinicalNotes}
                  onChange={(e) => setQClinicalNotes(e.target.value)}
                  placeholder="تظهر للطالب بعد إنهاء الشريحة..."
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 resize-none"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsQuestionModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>حفظ الشريحة في الاختبار</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-3xl max-w-xs w-full p-5 text-center space-y-3">
            <Trash2 className="w-8 h-8 text-rose-600 mx-auto" />
            <p className="text-xs font-bold">تأكيد حذف الاختبار العملي نهائياً؟</p>
            <div className="flex justify-center gap-2">
              <button type="button" onClick={() => setDeleteConfirmId(null)} className="px-3 py-1 text-xs font-bold">تراجع</button>
              <button type="button" disabled={isSaving} onClick={() => handleDeleteExam(deleteConfirmId)} className="px-4 py-1 bg-rose-600 text-white rounded-xl text-xs font-bold">
                {isSaving ? 'جاري الحذف...' : 'حذف'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
