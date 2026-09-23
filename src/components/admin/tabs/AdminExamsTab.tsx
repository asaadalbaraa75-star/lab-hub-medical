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

  // الفلترة والبحث
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | LabSubjectId>('all');

  // النوافذ المنبثقة
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // حقول نموذج الاختبار
  const [formExamTitle, setFormExamTitle] = useState('');
  const [formExamTitleArabic, setFormExamTitleArabic] = useState('');
  const [formExamDescription, setFormExamDescription] = useState('');
  const [formExamSubject, setFormExamSubject] = useState<LabSubjectId>('anatomy');
  const [formExamLessonId, setFormExamLessonId] = useState('');
  const [formTimePerQuestionSeconds, setFormTimePerQuestionSeconds] = useState(30); // 30 ثانية افتراضياً لكل شريحة
  const [formPassingScorePercent, setFormPassingScorePercent] = useState(70);

  // حقول نموذج إضافة سؤال OPSE كتابي
  const [activeExamForQuestion, setActiveExamForQuestion] = useState<Exam | null>(null);
  const [qTextEn, setQTextEn] = useState('');
  const [qTextAr, setQTextAr] = useState('');
  const [qImageUrl, setQImageUrl] = useState('');
  const [qAcceptableAnswers, setQAcceptableAnswers] = useState(''); // الإجابات المقبولة مفصولة بفاصلة
  const [qMarks, setQMarks] = useState(1);
  const [qClinicalNotes, setQClinicalNotes] = useState('');
  const [qSelectedFile, setQSelectedFile] = useState<File | null>(null);
  const questionFileInputRef = useRef<HTMLInputElement>(null);

  const canManage = securityService.canPerformAction(currentUser.role, 'manage_exams');

  // المزامنة الفورية المباشرة مع Firestore
  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;

    // 1. مزامنة الاختبارات
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

    // 2. مزامنة بنك الأسئلة العملية
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

    // 3. مزامنة الدروس
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

  // فتح نموذج إضافة اختبار OPSE كتابي جديد
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

  // فتح نموذج تعديل اختبار
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

  // حفظ بيانات الاختبار
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
        type: 'opse', // جميع الاختبارات عملي كتابي
        timePerQuestionSeconds: Number(formTimePerQuestionSeconds),
        passingScorePercent: Number(formPassingScorePercent),
        updatedAt: new Date().toISOString(),
        createdBy: `${currentUser.name} (${currentUser.role})`,
        userId: currentUser.id
      };

      if (editingExam) {
        await updateDoc(doc(db, 'exams', editingExam.id), examData);
        setFeedback({ type: 'success', message: 'تم تحديث بيانات الاختبار العملي الكتابي بنجاح!' });
      } else {
        await addDoc(collection(db, 'exams'), {
          ...examData,
          questionIds: [],
          questionCount: 0,
          createdAt: serverTimestamp()
        });
        setFeedback({ type: 'success', message: 'تم إنشاء الاختبار العملي بنجاح! يمكنكِ الآن إضافة الأسئلة والشرائح له.' });
      }

      setIsExamModalOpen(false);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'حدث خطأ في الحفظ: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  // فتح نافذة إضافة سؤال كتابي شريحة/صورة للاختبار
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

  // اختيار صورة السؤال من الهاتف
  const handleQuestionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setQImageUrl(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  // حفظ السؤال الكتابي وتوصيله بالاختبار والتصحيح الآلي
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExamForQuestion) return;

    if (!qAcceptableAnswers.trim()) {
      setFeedback({ type: 'error', message: 'يرجى إدخال الإجابة المقبولة للطلاب حتى يستطيع النظام تصحيحها تلقائياً.' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      let finalImageUrl = qImageUrl.trim();

      // ضغط ورفع صورة الشريحة
      if (qSelectedFile) {
        const compressedBlob = await compressImageFile(qSelectedFile);
        const storageRef = ref(storage, `questions/${Date.now()}_${qSelectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
        const uploadResult = await uploadBytes(storageRef, compressedBlob);
        finalImageUrl = await getDownloadURL(uploadResult.ref);
      }

      // تحويل الإجابات المقبولة إلى مصفوفة نصوص للتصحيح التلقائي
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
        correctAnswer: answersArray[0] || '', // الإجابة النموذجية الأولى
        acceptableAnswers: answersArray, // كل الإجابات البديلة المقبولة
        marks: Number(qMarks),
        clinicalCorrelation: qClinicalNotes.trim(),
        createdAt: new Date().toISOString(),
        createdBy: currentUser.name
      };

      // إضافة السؤال لقاعدة الأسئلة
      const qDocRef = await addDoc(collection(db, 'questions'), questionData);

      // تحديث قائمة الأسئلة المربوطة بالاختبار
      const updatedQuestionIds = [...(activeExamForQuestion.questionIds || []), qDocRef.id];
      await updateDoc(doc(db, 'exams', activeExamForQuestion.id), {
        questionIds: updatedQuestionIds,
        questionCount: updatedQuestionIds.length,
        updatedAt: new Date().toISOString()
      });

      setFeedback({ type: 'success', message: 'تمت إضافة شريحة السؤال وسيتولى النظام تصحيحها للطلاب تلقائياً!' });
      setIsQuestionModalOpen(false);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'خطأ في حفظ السؤال: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  // حذف اختبار
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
      {/* الهيدر الرئيسي */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">إدارة الاختبارات العملية الكتابية (OPSE Spotters)</h1>
            <p className="text-xs text-slate-500">إنشاء اختبارات الشرائح التنازلية بالوقت والتصحيح الآلي لكتابة الطلاب</p>
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

      {/* التنبيهات */}
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

      {/* شريط البحث والفلترة */}
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

      {/* شبكة عرض الاختبارات */}
      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-bold">جاري تحميل الاختبارات العملية من السيرفر المركزي...</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500 font-bold">لا توجد اختبارات عملية مضافة بعد. اضغطي على إنشاء اختبار بالأعلى.</p>
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

      {/* نافذة إنشاء/تعديل الاختبار */}
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

      {/* نافذة إضافة سؤال/شريحة عملية كتابية مع الإجابة المقبولة */}
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
              {/* صورة الشريحة */}
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

              {/* نص السؤال */}
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

              {/* الإجابة النموذجية والإجابات المقبولة للتصحيح التلقائي */}
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
                <p className="text-[10px] text-slate-400 mt-1">
                  اكتبي جميع الصيغ المقبولة التي إذا كتبها الطالب تعتبر إجابته صحيحة ويأخذ الدرجة آلياً.
                </p>
              </div>

              {/* ملاحظات سريرية */}
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

      {/* نافذة تأكيد الحذف */}
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formTitleArabic, setFormTitleArabic] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSubject, setFormSubject] = useState<LabSubjectId>('anatomy');
  const [formLessonId, setFormLessonId] = useState('');
  const [formType, setFormType] = useState<'mcq' | 'opse'>('mcq');
  const [formDurationMinutes, setFormDurationMinutes] = useState(15);
  const [formPassingScorePercent, setFormPassingScorePercent] = useState(70);

  const canManage = securityService.canPerformAction(currentUser.role, 'manage_exams');

  // المزامنة المباشرة مع قاعدة البيانات بدون Server 405
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

    const unsubQuestions = onSnapshot(collection(db, 'questions'), (snap) => {
      if (!isMounted) return;
      const list: ExamQuestion[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as ExamQuestion));
      setQuestions(list);
    });

    const unsubLessons = onSnapshot(collection(db, 'lessons'), (snap) => {
      if (!isMounted) return;
      const list: Practical[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Practical));
      setPracticals(list);
    });

    return () => {
      isMounted = false;
      unsubExams();
      unsubQuestions();
      unsubLessons();
    };
  }, []);

  const availableLessons = useMemo(() => {
    return practicals.filter((p) => p.courseId === formSubject);
  }, [practicals, formSubject]);

  const handleOpenAddModal = () => {
    setEditingExam(null);
    setFormTitle('');
    setFormTitleArabic('');
    setFormDescription('');
    setFormSubject('anatomy');
    setFormLessonId('');
    setFormType('mcq');
    setFormDurationMinutes(15);
    setFormPassingScorePercent(70);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exam: Exam) => {
    setEditingExam(exam);
    setFormTitle(exam.title || '');
    setFormTitleArabic(exam.titleArabic || '');
    setFormDescription(exam.description || '');
    setFormSubject(exam.subject || (exam.courseId as LabSubjectId) || 'anatomy');
    setFormLessonId(exam.lessonId || '');
    setFormType((exam.type as 'mcq' | 'opse') || 'mcq');
    setFormDurationMinutes(exam.durationMinutes || 15);
    setFormPassingScorePercent(exam.passingScorePercent || 70);
    setIsModalOpen(true);
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFeedback({ type: 'error', message: 'يرجى إدخال عنوان الاختبار.' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      const selectedLesson = practicals.find((p) => p.id === formLessonId);

      const examData = {
        title: formTitle.trim(),
        titleArabic: formTitleArabic.trim(),
        description: formDescription.trim(),
        subject: formSubject,
        courseId: formSubject,
        lessonId: formLessonId || null,
        lessonTitle: selectedLesson?.title || null,
        type: formType,
        durationMinutes: Number(formDurationMinutes),
        passingScorePercent: Number(formPassingScorePercent),
        updatedAt: new Date().toISOString(),
        createdBy: `${currentUser.name} (${currentUser.role})`,
        userId: currentUser.id
      };

      if (editingExam) {
        await updateDoc(doc(db, 'exams', editingExam.id), examData);
        setFeedback({ type: 'success', message: 'تم تحديث الاختبار بنجاح ونشره للجميع!' });
      } else {
        await addDoc(collection(db, 'exams'), {
          ...examData,
          createdAt: serverTimestamp()
        });
        setFeedback({ type: 'success', message: 'تم إنشاء الاختبار ونشره في السيرفر المركزي!' });
      }

      setIsModalOpen(false);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'حدث خطأ في الحفظ: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteExam = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteDoc(doc(db, 'exams', id));
      setFeedback({ type: 'success', message: 'تم حذف الاختبار بنجاح.' });
      setDeleteConfirmId(null);
    } catch (e: any) {
      setFeedback({ type: 'error', message: 'خطأ في الحذف: ' + e.message });
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
            <h1 className="text-xl font-black text-slate-900">إدارة الاختبارات والـ OPSE (Exams Management)</h1>
            <p className="text-xs text-slate-500">نشر وتعديل الاختبارات التفاعلية لجميع حسابات الطلاب والمدراء</p>
          </div>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء اختبار جديد</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          <span>{feedback.message}</span>
          <button type="button" onClick={() => setFeedback(null)}><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <div className="bg-white rounded-2xl border p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الاختبار..."
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border rounded-xl text-xs"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value as any)}
          className="w-full md:w-44 px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
        >
          <option value="all">كل المواد</option>
          <option value="anatomy">Anatomy</option>
          <option value="histology">Histology</option>
          <option value="biochemistry">Biochemistry</option>
        </select>
      </div>

      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-3xl border"><RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" /><p className="text-xs text-slate-500 font-bold">جاري تحميل الاختبارات...</p></div>
      ) : filteredExams.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border"><p className="text-xs text-slate-500 font-bold">لا توجد اختبارات منشورة بعد.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-3xl border p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${exam.type === 'opse' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                  {exam.type === 'opse' ? 'اختبار كتابي عملي (OPSE)' : 'MCQ'}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{exam.title}</h3>
                {exam.titleArabic && <p className="text-xs text-slate-500">{exam.titleArabic}</p>}
              </div>

              <div className="pt-3 border-t flex items-center justify-between text-xs text-slate-500">
                <span>{exam.durationMinutes} دقيقة</span>
                {canManage && (
                  <div className="flex gap-1">
                    <button type="button" onClick={() => handleOpenEditModal(exam)} className="px-2 py-1 bg-slate-900 text-white rounded text-[10px] font-bold">تعديل</button>
                    <button type="button" onClick={() => setDeleteConfirmId(exam.id)} className="p-1 text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 my-8">
            <h3 className="font-black text-sm">{editingExam ? 'تعديل الاختبار' : 'إنشاء اختبار جديد'}</h3>
            <form onSubmit={handleSaveExam} className="space-y-3">
              <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title (EN) *" className="w-full text-xs p-2 border rounded-xl" />
              <input type="text" value={formTitleArabic} onChange={(e) => setFormTitleArabic(e.target.value)} placeholder="العنوان بالعربي" className="w-full text-xs p-2 border rounded-xl" />
              <select value={formSubject} onChange={(e) => setFormSubject(e.target.value as any)} className="w-full text-xs p-2 border rounded-xl font-bold">
                <option value="anatomy">Anatomy</option>
                <option value="histology">Histology</option>
                <option value="biochemistry">Biochemistry</option>
              </select>

              <select value={formType} onChange={(e) => setFormType(e.target.value as any)} className="w-full text-xs p-2 border rounded-xl font-bold">
                <option value="mcq">MCQ Exam</option>
                <option value="opse">OPSE Spotter Exam</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 text-xs font-bold">إلغاء</button>
                <button type="submit" disabled={isSaving} className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1">
                  {isSaving && <RefreshCw className="w-3 h-3 animate-spin" />} حفظ ونشر
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
            <p className="text-xs font-bold">تأكيد حذف الاختبار نهائياً؟</p>
            <div className="flex justify-center gap-2">
              <button type="button" onClick={() => setDeleteConfirmId(null)} className="px-3 py-1 text-xs font-bold">تراجع</button>
              <button type="button" onClick={() => handleDeleteExam(deleteConfirmId)} className="px-4 py-1 bg-rose-600 text-white rounded-xl text-xs font-bold">حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
  query,
  orderBy
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { User, LabSubjectId, MedicalExam, ExamQuestion, ExamType } from '../../../types';
import { storageService } from '../../../services/storageService';
import { securityService } from '../../../services/securityService';

// Official Academic Reviewers
export const OFFICIAL_MEDICAL_REVIEWERS = [
  { id: 'rev_thabet', name: 'د. ثابت الذيفاني', title: 'أستاذ التشريح والأجنة السريري' },
  { id: 'rev_jalal', name: 'د. عبدالله الجلال', title: 'استشاري التشريح وعلم الأنسجة' },
  { id: 'rev_wosabi', name: 'د. حمزه الوصابي', title: 'أخصائي علم الأمراض والأنسجة الطبية' },
  { id: 'rev_burti', name: 'د. ندى البرطي', title: 'أستاذة الكيمياء الحيوية الطبية والسريرية' },
  { id: 'rev_badr', name: 'د. محمد بدر محمد', title: 'استشاري تقييم الامتحانات الطبية والـ OSPE' }
];

interface Props {
  currentUser: User;
  onPreviewExam?: (exam: any) => void;
}

export const AdminExamsTab: React.FC<Props> = ({ currentUser, onPreviewExam }) => {
  // State
  const [exams, setExams] = useState<MedicalExam[]>([]);
  const [allQuestions, setAllQuestions] = useState<ExamQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'ospe' | 'mcq'>('all');

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isOspeQuestionModalOpen, setIsOspeQuestionModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<MedicalExam | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewExam, setPreviewExam] = useState<MedicalExam | null>(null);

  // Exam Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formTitleArabic, setFormTitleArabic] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formLabId, setFormLabId] = useState<LabSubjectId | 'mixed'>('anatomy');
  const [formExamType, setFormExamType] = useState<ExamType>('identification');
  const [formTimeLimitMinutes, setFormTimeLimitMinutes] = useState(15);
  const [formTimePerQuestionSeconds, setFormTimePerQuestionSeconds] = useState(30);
  const [formPassingScorePercent, setFormPassingScorePercent] = useState(70);
  const [formDifficulty, setFormDifficulty] = useState<'basic' | 'intermediate' | 'advanced' | 'university_ospe'>('university_ospe');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formRandomizeQuestions, setFormRandomizeQuestions] = useState(true);
  const [formRandomizeAnswers, setFormRandomizeAnswers] = useState(false);
  const [formAllowRetake, setFormAllowRetake] = useState(true);
  const [formShowAnswersAfterExam, setFormShowAnswersAfterExam] = useState(true);
  const [formSelectedReviewer, setFormSelectedReviewer] = useState(OFFICIAL_MEDICAL_REVIEWERS[0].name);
  const [formSelectedQuestionIds, setFormSelectedQuestionIds] = useState<string[]>([]);
  const [questionSearchQuery, setQuestionSearchQuery] = useState('');

  // OPSE Question Builder inside Exam Form
  const [ospeQuestionText, setOspeQuestionText] = useState('Identify the pointed structure / حدد المعلم المشار إليه');
  const [ospeQuestionTextArabic, setOspeQuestionTextArabic] = useState('ما هو التركيب التشريحي المشار إليه بالسهم؟');
  const [ospeImageUrl, setOspeImageUrl] = useState('');
  const [ospeCorrectAnswer, setOspeCorrectAnswer] = useState('');
  const [ospeAlternativeAnswers, setOspeAlternativeAnswers] = useState('');
  const [ospeStationCategory, setOspeStationCategory] = useState('Anatomy Practical Station');
  const [ospeExplanation, setOspeExplanation] = useState('');
  const [ospeTimeSeconds, setOspeTimeSeconds] = useState(30);
  const [ospeMarks, setOspeMarks] = useState(1);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOwner = currentUser.role === 'owner';
  const isEditor = currentUser.role === 'admin' || currentUser.role === 'editor' || currentUser.role === 'content_exams';
  const isExamEditor = currentUser.role === 'exam_editor' || currentUser.role === 'exams_only';
  const canManageExams = isOwner || isEditor || isExamEditor || securityService.hasPermission(currentUser.role, 'create_exams');

  // 1. Direct Firestore Real-Time Listener (No /api/ 405 errors)
  useEffect(() => {
    setIsLoading(true);
    let unsubscribeExams: (() => void) | null = null;
    let unsubscribeQuestions: (() => void) | null = null;

    try {
      // Shared Root Collection: /exams
      const examsQuery = query(collection(db, 'exams'), orderBy('createdAt', 'desc'));
      unsubscribeExams = onSnapshot(
        examsQuery,
        (snapshot) => {
          const fetched: MedicalExam[] = [];
          snapshot.forEach((docSnap) => {
            fetched.push({ id: docSnap.id, ...docSnap.data() } as MedicalExam);
          });
          const mergedExams = [...fetched];
          const existingExamIds = new Set(fetched.map((e) => e.id));
          const defaultExams = storageService.getMedicalExams();
          defaultExams.forEach((de) => {
            if (!existingExamIds.has(de.id)) {
              mergedExams.push(de);
              setDoc(doc(db, 'exams', de.id), de, { merge: true }).catch(() => {});
            }
          });
          setExams(mergedExams);
          try {
            localStorage.setItem('labhub_medical_exams', JSON.stringify(mergedExams));
          } catch {}
          setIsLoading(false);
        },
        (error) => {
          console.warn('[FIRESTORE] Realtime sync error for exams, using local cache:', error);
          setExams(storageService.getMedicalExams());
          setIsLoading(false);
        }
      );

      // Shared Root Collection: /questions
      const questionsQuery = query(collection(db, 'questions'));
      unsubscribeQuestions = onSnapshot(
        questionsQuery,
        (snapshot) => {
          const fetchedQ: ExamQuestion[] = [];
          snapshot.forEach((docSnap) => {
            fetchedQ.push({ id: docSnap.id, ...docSnap.data() } as ExamQuestion);
          });
          const mergedQ = [...fetchedQ];
          const existingQIds = new Set(fetchedQ.map((q) => q.id));
          const defaultQ = storageService.getExamQuestions();
          defaultQ.forEach((dq) => {
            if (!existingQIds.has(dq.id)) {
              mergedQ.push(dq);
              setDoc(doc(db, 'questions', dq.id), dq, { merge: true }).catch(() => {});
            }
          });
          setAllQuestions(mergedQ);
          try {
            localStorage.setItem('labhub_exam_questions', JSON.stringify(mergedQ));
          } catch {}
        },
        (error) => {
          console.warn('[FIRESTORE] Realtime sync error for questions, using local cache:', error);
          setAllQuestions(storageService.getExamQuestions());
        }
      );
    } catch (err) {
      console.warn('[FIRESTORE] Initialization fallback:', err);
      setExams(storageService.getMedicalExams());
      setAllQuestions(storageService.getExamQuestions());
      setIsLoading(false);
    }

    return () => {
      if (unsubscribeExams) unsubscribeExams();
      if (unsubscribeQuestions) unsubscribeQuestions();
    };
  }, []);

  // Form Reset
  const resetForm = () => {
    setEditingExam(null);
    setFormTitle('');
    setFormTitleArabic('');
    setFormDescription('');
    setFormLabId('anatomy');
    setFormExamType('identification');
    setFormTimeLimitMinutes(15);
    setFormTimePerQuestionSeconds(30);
    setFormPassingScorePercent(70);
    setFormDifficulty('university_ospe');
    setFormStatus('published');
    setFormRandomizeQuestions(true);
    setFormRandomizeAnswers(false);
    setFormAllowRetake(true);
    setFormShowAnswersAfterExam(true);
    setFormSelectedReviewer(OFFICIAL_MEDICAL_REVIEWERS[0].name);
    setFormSelectedQuestionIds([]);
    setQuestionSearchQuery('');
    setSaveError(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (exam: MedicalExam) => {
    setEditingExam(exam);
    setFormTitle(exam.title);
    setFormTitleArabic(exam.titleArabic || exam.title);
    setFormDescription(exam.description || '');
    setFormLabId(exam.labId);
    setFormExamType(exam.examType || 'identification');
    setFormTimeLimitMinutes(exam.timeLimitMinutes || 15);
    setFormTimePerQuestionSeconds(exam.timePerQuestionSeconds || 30);
    setFormPassingScorePercent(exam.passingScorePercent || 70);
    setFormDifficulty(exam.difficulty || 'university_ospe');
    setFormStatus(exam.isPublished ? 'published' : 'draft');
    setFormRandomizeQuestions(exam.randomizeQuestions ?? true);
    setFormRandomizeAnswers(exam.randomizeAnswers ?? false);
    setFormAllowRetake(exam.allowRetake ?? true);
    setFormShowAnswersAfterExam(exam.showAnswersAfterExam ?? true);
    setFormSelectedQuestionIds(exam.questionIds || []);
    setSaveError(null);
    setIsEditorOpen(true);
  };

  // Image Upload for OPSE Station
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (JPEG, PNG, WebP).');
      return;
    }

    setIsUploadingImage(true);
    try {
      // 1. Try Firebase Storage directly
      const fileId = `ospe_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const imgStorageRef = storageRef(storage, `exams/ospe/${fileId}`);
      await uploadBytes(imgStorageRef, file);
      const downloadUrl = await getDownloadURL(imgStorageRef);
      setOspeImageUrl(downloadUrl);
    } catch (storageErr) {
      console.warn('[STORAGE] Falling back to Data URL for image upload:', storageErr);
      // Fallback: Read as base64 data URL
      const reader = new FileReader();
      reader.onload = () => {
        setOspeImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Quick Save OPSE Written Station Question
  const handleSaveOspeQuestion = async () => {
    if (!ospeQuestionText.trim() || !ospeCorrectAnswer.trim() || !ospeImageUrl.trim()) {
      alert('يرجى إدخال صورة العينة العملية، ونص السؤال، والإجابة الصحيحة المقبولة.');
      return;
    }

    setIsSaving(true);
    try {
      const qId = `ospe_q_${Date.now()}`;
      const acceptedAnswers = ospeAlternativeAnswers
        .split(',')
        .map(a => a.trim())
        .filter(Boolean);

      if (!acceptedAnswers.includes(ospeCorrectAnswer.trim())) {
        acceptedAnswers.unshift(ospeCorrectAnswer.trim());
      }

      const newQ: ExamQuestion = {
        id: qId,
        labId: formLabId === 'mixed' ? 'anatomy' : formLabId,
        type: 'write_answer',
        questionType: 'write_answer',
        questionText: ospeQuestionText.trim(),
        questionTextArabic: ospeQuestionTextArabic.trim(),
        imageUrl: ospeImageUrl.trim(),
        specimenCategory: ospeStationCategory.trim() || 'Practical Station',
        options: [ospeCorrectAnswer.trim()],
        correctAnswer: ospeCorrectAnswer.trim(),
        alternativeAnswers: acceptedAnswers,
        explanation: ospeExplanation.trim() || 'إجابة نموذجية لمحطة الـ OSPE الكتابية',
        timeSeconds: Number(ospeTimeSeconds) || 30,
        marks: Number(ospeMarks) || 1,
        topic: 'OSPE Practical Station',
        status: 'published',
        authorId: currentUser.id,
        authorName: currentUser.name,
        submittedAt: new Date().toISOString()
      };

      // Direct write to shared Firestore collection: /questions
      await setDoc(doc(db, 'questions', qId), newQ, { merge: true });

      // Add to local state & select for current exam
      setAllQuestions(prev => [newQ, ...prev]);
      setFormSelectedQuestionIds(prev => [qId, ...prev]);

      // Reset OSPE modal form
      setOspeImageUrl('');
      setOspeCorrectAnswer('');
      setOspeAlternativeAnswers('');
      setOspeExplanation('');
      setIsOspeQuestionModalOpen(false);
      setSuccessMessage('تمت إضافة محطة الـ OSPE بنجاح وربطها بالاختبار!');
      setTimeout(() => setSuccessMessage(null), 3500);
    } catch (err: any) {
      console.error('[FIRESTORE] Failed to save OPSE question:', err);
      alert('حدث خطأ أثناء حفظ محطة السؤال: ' + (err.message || 'يرجى المحاولة مجدداً'));
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Direct Firestore Save Exam (Replaces /api/ 405 error)
  const handleSaveExam = async (statusOverride?: 'published' | 'draft') => {
    setSaveError(null);

    if (!formTitle.trim()) {
      setSaveError('يرجى إدخال عنوان الاختبار باللغة الإنجليزية.');
      return;
    }

    if (formSelectedQuestionIds.length === 0) {
      setSaveError('يرجى تحديد سؤال أو محطة واحدة على الأقل للاختبار.');
      return;
    }

    const currentStatus = statusOverride || formStatus;
    setIsSaving(true);

    try {
      const selectedQuestions = allQuestions.filter(q => formSelectedQuestionIds.includes(q.id));
      const examId = editingExam?.id || `exam_${formLabId}_${Date.now()}`;

      const examData: MedicalExam = {
        id: examId,
        title: formTitle.trim(),
        titleArabic: formTitleArabic.trim() || formTitle.trim(),
        description: formDescription.trim() || `Official practical exam under academic review by ${formSelectedReviewer}`,
        labId: formLabId,
        examType: formExamType,
        timeLimitMinutes: Number(formTimeLimitMinutes) || 15,
        timePerQuestionSeconds: Number(formTimePerQuestionSeconds) || 30,
        passingScorePercent: Number(formPassingScorePercent) || 70,
        totalMarks: selectedQuestions.reduce((acc, q) => acc + (q.marks || 1), 0),
        difficulty: formDifficulty,
        isPublished: currentStatus === 'published',
        questionIds: selectedQuestions.map(q => q.id),
        totalQuestions: selectedQuestions.length,
        questions: selectedQuestions,
        randomizeQuestions: formRandomizeQuestions,
        randomizeAnswers: formRandomizeAnswers,
        allowRetake: formAllowRetake,
        showAnswersAfterExam: formShowAnswersAfterExam,
        status: currentStatus,
        createdAt: editingExam?.createdAt || new Date().toISOString(),
        authorName: editingExam?.authorName || currentUser.name
      };

      // Direct write to shared production Firestore collection: /exams
      await setDoc(doc(db, 'exams', examId), examData, { merge: true });

      // Update local storage backup
      const currentList = storageService.getMedicalExams();
      const idx = currentList.findIndex(e => e.id === examId);
      if (idx >= 0) {
        currentList[idx] = examData;
      } else {
        currentList.unshift(examData);
      }
      try {
        localStorage.setItem('labhub_medical_exams', JSON.stringify(currentList));
      } catch {}

      // UI Success feedback
      setIsEditorOpen(false);
      resetForm();
      setSuccessMessage('تم حفظ الاختبار وتزامنه مباشرة في السحابة لجميع أجهزة الطلاب والمدراء!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('[FIRESTORE] Save Exam Error:', err);
      setSaveError(err.message || 'فشل حفظ الاختبار في قاعدة البيانات السحابية المشتركة.');
    } finally {
      // CRITICAL: Always reset isSaving so the button NEVER hangs
      setIsSaving(false);
    }
  };

  // 3. Direct Firestore Delete Exam
  const handleDeleteExam = async (id: string) => {
    if (!canManageExams) {
      alert('ليس لديك صلاحية لحذف الاختبار.');
      return;
    }

    setIsSaving(true);
    try {
      // Direct deletion from shared collection /exams
      await deleteDoc(doc(db, 'exams', id));

      // Remove from local storage
      const currentList = storageService.getMedicalExams().filter(e => e.id !== id);
      try {
        localStorage.setItem('labhub_medical_exams', JSON.stringify(currentList));
      } catch {}

      setDeleteConfirmId(null);
      setSuccessMessage('تم حذف الاختبار بنجاح من قاعدة البيانات المشتركة.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('[FIRESTORE] Delete Exam Error:', err);
      alert('حدث خطأ أثناء حذف الاختبار من الخادم: ' + (err.message || 'يرجى المحاولة ثانية'));
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered Questions for Selection in Exam Modal
  const availableQuestionsForForm = allQuestions
    .filter(q => {
      const matchesLab = formLabId === 'mixed' ? true : q.labId === formLabId;
      if (!questionSearchQuery.trim()) return matchesLab;
      const s = questionSearchQuery.toLowerCase();
      return matchesLab && (
        q.questionText?.toLowerCase().includes(s) ||
        q.questionTextArabic?.includes(s) ||
        q.correctAnswer?.toLowerCase().includes(s) ||
        q.specimenCategory?.toLowerCase().includes(s) ||
        q.topic?.toLowerCase().includes(s)
      );
    });

  // Filtered Exams for Table
  const filteredExams = exams.filter(e => {
    if (selectedLab !== 'all' && e.labId !== selectedLab) return false;
    if (selectedStatusFilter === 'published' && !e.isPublished) return false;
    if (selectedStatusFilter === 'draft' && e.isPublished) return false;
    if (selectedTypeFilter === 'ospe' && e.examType !== 'identification' && (e as any).difficulty !== 'university_ospe') return false;
    if (selectedTypeFilter === 'mcq' && e.examType !== 'mcq' && e.examType !== 'multiple_choice') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        e.title.toLowerCase().includes(q) ||
        e.titleArabic?.includes(q) ||
        e.authorName?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100" id="admin-exams-tab">
      {/* Top Banner & Header */}
      <div className="bg-[#0B132B]/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Realtime Cloud Sync • مزامنة فورية مشتركة</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-1">
              <Timer className="w-3.5 h-3.5 text-emerald-400" />
              <span>30-Second OPSE Engine</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            إدارة اختبارات الـ OSPE والمحطات العملية السريرية
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
            إنشاء وإدارة بنوك محطات الـ OSPE (عظام، عضلات، أنسجة، كيمياء حيوية)، مع مؤقت 30 ثانية لكل شريحة وتصحيح تلقائي للإجابات المقبولة مع حفظ سحابي فوري دون أي أخطاء 405.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {canManageExams && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء اختبار عملي / OSPE جديد</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="bg-emerald-950/80 border border-emerald-500/60 rounded-xl p-4 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#0B132B]/80 rounded-xl border border-slate-800 p-4">
          <div className="text-[11px] text-slate-400 font-medium">إجمالي الاختبارات</div>
          <div className="text-2xl font-black text-white mt-1 font-mono">{exams.length}</div>
        </div>
        <div className="bg-[#0B132B]/80 rounded-xl border border-slate-800 p-4">
          <div className="text-[11px] text-emerald-400 font-medium">الاختبارات المنشورة</div>
          <div className="text-2xl font-black text-emerald-300 mt-1 font-mono">
            {exams.filter(e => e.isPublished).length}
          </div>
        </div>
        <div className="bg-[#0B132B]/80 rounded-xl border border-slate-800 p-4">
          <div className="text-[11px] text-amber-400 font-medium">محطات الـ OSPE الجاهزة</div>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
            {allQuestions.filter(q => q.type === 'write_answer' || q.questionType === 'write_answer').length}
          </div>
        </div>
        <div className="bg-[#0B132B]/80 rounded-xl border border-slate-800 p-4">
          <div className="text-[11px] text-purple-400 font-medium">هيئة المراجعة الأكاديمية</div>
          <div className="text-2xl font-black text-purple-300 mt-1 font-mono">
            {OFFICIAL_MEDICAL_REVIEWERS.length} أطباء
          </div>
        </div>
      </div>

      {/* Official Academic Reviewers Badge Bar */}
      <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>قائمة المراجعين المعتمدين للامتحانات:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {OFFICIAL_MEDICAL_REVIEWERS.map(rev => (
            <span
              key={rev.id}
              className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700 text-[11px] font-medium"
              title={rev.title}
            >
              {rev.name}
            </span>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B132B]/80 rounded-xl border border-slate-800 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في الاختبارات، العناوين، المعلمين..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <select
            value={selectedLab}
            onChange={(e) => setSelectedLab(e.target.value)}
            className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">كل المعامل</option>
            <option value="anatomy">التشريح (Anatomy)</option>
            <option value="histology">علم الأنسجة (Histology)</option>
            <option value="biochemistry">الكيمياء الحيوية (Biochemistry)</option>
            <option value="mixed">امتحانات شاملة (Mixed OSPE)</option>
          </select>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">كل الحالات</option>
            <option value="published">منشور فقط (Published)</option>
            <option value="draft">مسودة فقط (Draft)</option>
          </select>

          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">كل الأنماط</option>
            <option value="ospe">محطات كتابية OSPE</option>
            <option value="mcq">اختيار من متعدد MCQ</option>
          </select>
        </div>
      </div>

      {/* Exams Table / Cards */}
      <div className="bg-[#0B132B]/80 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-xs font-semibold">جارٍ الاتصال بقاعدة البيانات السحابية ومزامنة الامتحانات...</p>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-white">لم يتم العثور على أي اختبار يطابق الفلتر الحالي</p>
            <p className="text-xs text-slate-500">انقر فوق "إنشاء اختبار عملي / OSPE جديد" للبدء مباشرة.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px] font-bold">
                  <th className="p-3.5">الاختبار / المحطة</th>
                  <th className="p-3.5">المعمل / التخصص</th>
                  <th className="p-3.5">النوع والتوقيت</th>
                  <th className="p-3.5">المحطات والدرجات</th>
                  <th className="p-3.5">حالة النشر</th>
                  <th className="p-3.5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{exam.title}</div>
                      {exam.titleArabic && (
                        <div className="text-[11px] text-indigo-400 font-arabic mt-0.5">
                          {exam.titleArabic}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center gap-2">
                        <span>ID: {exam.id}</span>
                        <span>•</span>
                        <span>بواسطة: {exam.authorName || 'الهيئة الأكاديمية'}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        exam.labId === 'anatomy' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        exam.labId === 'histology' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                        exam.labId === 'biochemistry' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                      }`}>
                        {exam.labId.toUpperCase()}
                      </span>
                    </td>

                    <td className="p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                        <Timer className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{exam.timePerQuestionSeconds || 30} ثانية / محطة</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>إجمالي: {exam.timeLimitMinutes || 15} دقيقة</span>
                      </div>
                    </td>

                    <td className="p-3.5 space-y-1">
                      <div className="font-mono font-bold text-indigo-300">
                        {exam.questionIds?.length || exam.questions?.length || 0} محطات
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        الدرجة الكلية: {exam.totalMarks || (exam.questionIds?.length || 0)}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...exam, isPublished: !exam.isPublished };
                          setDoc(doc(db, 'exams', exam.id), updated, { merge: true });
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                          exam.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${exam.isPublished ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span>{exam.isPublished ? 'منشور (Live)' : 'مسودة (Draft)'}</span>
                      </button>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewExam(exam);
                            if (onPreviewExam) onPreviewExam(exam);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="معاينة الاختبار"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {canManageExams && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(exam)}
                              className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 transition-colors cursor-pointer"
                              title="تعديل الاختبار والمحطات"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(exam.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                              title="حذف الاختبار"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Main Exam Creation / Edit Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0B132B] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {editingExam ? 'تعديل الاختبار العملي ومحطات الـ OSPE' : 'إنشاء اختبار عملي ومحطات OSPE جديدة'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    حفظ مباشر في قاعدة بيانات Firestore المشتركة لجميع الأجهزة بدون أي أخطاء 405.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {saveError && (
                <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-3.5 text-rose-200 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">عنوان الاختبار بالإنجليزية (Title) *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Upper Limb Bones & Muscles OSPE Exam"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">عنوان الاختبار بالعربية (Arabic Title)</label>
                  <input
                    type="text"
                    value={formTitleArabic}
                    onChange={(e) => setFormTitleArabic(e.target.value)}
                    placeholder="مثال: امتحان محطات الـ OSPE العملي لعظام وعضلات الطرف العلوي"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">الوصف والتعليمات للطلاب</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="تعليمات الاختبار العملي، طريقة كتابة الإجابة، التحذير من مغادرة الشاشة..."
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Lab & Timing Settings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">المعمل التابع له</label>
                  <select
                    value={formLabId}
                    onChange={(e) => setFormLabId(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-200"
                  >
                    <option value="anatomy">تشريح (Anatomy)</option>
                    <option value="histology">علم الأنسجة (Histology)</option>
                    <option value="biochemistry">كيمياء حيوية (Biochemistry)</option>
                    <option value="mixed">شامل OSPE Mixed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">مؤقت المحطة (ثوانٍ) *</label>
                  <input
                    type="number"
                    min={10}
                    max={300}
                    value={formTimePerQuestionSeconds}
                    onChange={(e) => setFormTimePerQuestionSeconds(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono"
                  />
                  <span className="text-[10px] text-emerald-400 font-mono">الافتراضي 30s للـ OSPE</span>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">الزمن الإجمالي (دقائق)</label>
                  <input
                    type="number"
                    min={1}
                    max={180}
                    value={formTimeLimitMinutes}
                    onChange={(e) => setFormTimeLimitMinutes(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">نسبة النجاح (%)</label>
                  <input
                    type="number"
                    min={40}
                    max={100}
                    value={formPassingScorePercent}
                    onChange={(e) => setFormPassingScorePercent(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono"
                  />
                </div>
              </div>

              {/* Reviewer & Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">الطبيب المراجع المعتمد للاختبار</label>
                  <select
                    value={formSelectedReviewer}
                    onChange={(e) => setFormSelectedReviewer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-white"
                  >
                    {OFFICIAL_MEDICAL_REVIEWERS.map(rev => (
                      <option key={rev.id} value={rev.name}>
                        {rev.name} ({rev.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">مستوى الاختبار</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="university_ospe">امتحان جامعة سريري معتمد (University OSPE)</option>
                    <option value="basic">مستوى أساسي (Basic)</option>
                    <option value="intermediate">مستوى متوسط (Intermediate)</option>
                    <option value="advanced">مستوى متقدم (Advanced)</option>
                  </select>
                </div>
              </div>

              {/* Options Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formRandomizeQuestions}
                    onChange={(e) => setFormRandomizeQuestions(e.target.checked)}
                    className="rounded accent-indigo-600"
                  />
                  <span className="text-slate-300">تبديل عشوائي للمحطات</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formAllowRetake}
                    onChange={(e) => setFormAllowRetake(e.target.checked)}
                    className="rounded accent-indigo-600"
                  />
                  <span className="text-slate-300">السماح بالإعادة للتدريب</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formShowAnswersAfterExam}
                    onChange={(e) => setFormShowAnswersAfterExam(e.target.checked)}
                    className="rounded accent-indigo-600"
                  />
                  <span className="text-slate-300">عرض الإجابات بعد التسليم</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formStatus === 'published'}
                    onChange={(e) => setFormStatus(e.target.checked ? 'published' : 'draft')}
                    className="rounded accent-emerald-600"
                  />
                  <span className="text-slate-300 font-bold">نشر فوري للطلاب</span>
                </label>
              </div>

              {/* Station & Question Selector with OPSE Quick Creator */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>اختيار محطات الاختبار ({formSelectedQuestionIds.length} محطة محددة)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      يمكنك تحديد محطات جاهزة أو رفع وإضافة محطة OSPE كتابية جديدة مباشرة بالصورة ومربع الإدخال.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOspeQuestionModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>+ إضافة محطة OSPE عملية جديدة</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={questionSearchQuery}
                    onChange={(e) => setQuestionSearchQuery(e.target.value)}
                    placeholder="تصفية المحطات المتاحة حسب الاسم أو العينة..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-slate-950/50 rounded-xl border border-slate-800">
                  {availableQuestionsForForm.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 text-xs">
                      لا توجد أسئلة أو محطات مطابقة. انقر فوق "+ إضافة محطة OSPE عملية جديدة" لإضافتها الآن.
                    </div>
                  ) : (
                    availableQuestionsForForm.map(q => {
                      const isSelected = formSelectedQuestionIds.includes(q.id);
                      return (
                        <div
                          key={q.id}
                          onClick={() => {
                            if (isSelected) {
                              setFormSelectedQuestionIds(prev => prev.filter(id => id !== q.id));
                            } else {
                              setFormSelectedQuestionIds(prev => [...prev, q.id]);
                            }
                          }}
                          className={`p-3 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-indigo-950/50 border-indigo-500/60 text-white'
                              : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {q.imageUrl && (
                              <img
                                src={q.imageUrl}
                                alt="Station"
                                className="w-12 h-12 rounded object-cover border border-slate-700 shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-xs truncate">
                                {q.questionTextArabic || q.questionText}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-indigo-400">
                                  {q.type === 'write_answer' ? 'محطة كتابية (Write Answer)' : 'MCQ'}
                                </span>
                                <span>•</span>
                                <span className="text-emerald-400">الإجابة: {q.correctAnswer}</span>
                                {q.alternativeAnswers && q.alternativeAnswers.length > 0 && (
                                  <span className="text-slate-500">({q.alternativeAnswers.length} مرادفات مقبولة)</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                            isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                المحطات المحددة: <span className="font-mono text-indigo-400 font-bold">{formSelectedQuestionIds.length}</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveExam('draft')}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>حفظ كمسودة</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveExam('published')}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جارٍ الحفظ السحابي...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>حفظ ونشر الاختبار الآن</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick OPSE Question Builder Modal */}
      {isOspeQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0A1128] border border-emerald-500/40 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    إنشاء محطة OSPE عملية كتابية (30 ثانية)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    رفع صورة العينة من الجوال، نص السؤال، ومصفوفة الإجابات المقبولة للتصحيح التلقائي.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOspeQuestionModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Image Upload Area */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">صورة العينة / السلايد العملي *</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {ospeImageUrl ? (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-emerald-500/50 group shrink-0">
                      <img src={ospeImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setOspeImageUrl('')}
                        className="absolute inset-0 bg-slate-950/70 flex items-center justify-center text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-48 h-32 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500 flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-950/40 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                    >
                      <Upload className="w-6 h-6" />
                      <span className="text-[11px] font-semibold">
                        {isUploadingImage ? 'جارٍ رفع الصورة...' : 'رفع صورة من الجوال/الكمبيوتر'}
                      </span>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={ospeImageUrl}
                      onChange={(e) => setOspeImageUrl(e.target.value)}
                      placeholder="أو الصق رابط الصورة المباشر هنا (URL)..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                    />
                    <p className="text-[10px] text-slate-500">
                      يدعم التخزين المباشر في Firebase Storage أو الروابط المباشرة لعينات التشريح والأنسجة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Question Texts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">نص السؤال (English Prompt) *</label>
                  <input
                    type="text"
                    value={ospeQuestionText}
                    onChange={(e) => setOspeQuestionText(e.target.value)}
                    placeholder="e.g. Identify the pointed landmark on this femur."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">نص السؤال بالعربية (Arabic Prompt)</label>
                  <input
                    type="text"
                    value={ospeQuestionTextArabic}
                    onChange={(e) => setOspeQuestionTextArabic(e.target.value)}
                    placeholder="مثال: حدد المعلم التشريحي المشار إليه بالسهم على عظم الفخذ."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Acceptable Answers & Auto-grading */}
              <div className="space-y-1.5 bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30">
                <label className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>الإجابة النموذجية المعتمدة (Primary Answer) *</span>
                </label>
                <input
                  type="text"
                  value={ospeCorrectAnswer}
                  onChange={(e) => setOspeCorrectAnswer(e.target.value)}
                  placeholder="مثال: Greater Trochanter"
                  className="w-full px-3 py-2 bg-slate-950 border border-emerald-500/50 rounded-lg text-white font-bold"
                />

                <label className="font-bold text-slate-300 mt-2 block">
                  مصفوفة الإجابات المقبولة الصحيحة (Acceptable Answers Array)
                </label>
                <input
                  type="text"
                  value={ospeAlternativeAnswers}
                  onChange={(e) => setOspeAlternativeAnswers(e.target.value)}
                  placeholder="افصل بفاصلة: Greater trochanter, Trochanter major, المدور الكبير"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
                <p className="text-[10px] text-slate-400">
                  أي إجابة يكتبها الطالب في مربع النص تطابق إحدى هذه الكلمات ستُعتبر صحيحة تلقائياً بنسبة 100%.
                </p>
              </div>

              {/* Timing & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">زمن المحطة (ثوانٍ)</label>
                  <input
                    type="number"
                    value={ospeTimeSeconds}
                    onChange={(e) => setOspeTimeSeconds(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">درجة السؤال</label>
                  <input
                    type="number"
                    value={ospeMarks}
                    onChange={(e) => setOspeMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsOspeQuestionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveOspeQuestion}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>حفظ وربط المحطة بالاختبار</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0B132B] border border-rose-500/50 rounded-2xl w-full max-w-md p-5 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">تأكيد حذف الاختبار العملي</h3>
              <p className="text-xs text-slate-400 mt-1">
                هل أنت متأكد من حذف هذا الاختبار من قاعدة البيانات المشتركة؟ سيتم حذفه من كافة أجهزة الطلاب.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer hover:bg-slate-700"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => handleDeleteExam(deleteConfirmId)}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                <span>نعم، حذف الاختبار</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Preview Modal */}
      {previewExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0B132B] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in zoom-in-95">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div>
                <h3 className="text-base font-bold text-white">{previewExam.title}</h3>
                <p className="text-xs text-indigo-400">{previewExam.titleArabic}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewExam(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">المحطات</div>
                  <div className="text-base font-black text-white font-mono mt-0.5">
                    {previewExam.questionIds?.length || 0}
                  </div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">زمن المحطة</div>
                  <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                    {previewExam.timePerQuestionSeconds || 30}s
                  </div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">نسبة النجاح</div>
                  <div className="text-base font-black text-amber-400 font-mono mt-0.5">
                    {previewExam.passingScorePercent || 70}%
                  </div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">الدرجة الكلية</div>
                  <div className="text-base font-black text-purple-400 font-mono mt-0.5">
                    {previewExam.totalMarks || (previewExam.questionIds?.length || 0)}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-slate-300">الوصف والتعليمات:</div>
                <p className="text-slate-400 leading-relaxed">
                  {previewExam.description || 'امتحان عملي سريري للمحطات العملية الطبية.'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-300">قائمة المحطات المرتبطة:</div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allQuestions
                    .filter(q => previewExam.questionIds?.includes(q.id))
                    .map((q, idx) => (
                      <div key={q.id} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {q.imageUrl && (
                          <img src={q.imageUrl} alt="Station" className="w-10 h-10 rounded object-cover border border-slate-700 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{q.questionTextArabic || q.questionText}</div>
                          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                            الإجابة الصحيحة: {q.correctAnswer}
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0">
                          {q.timeSeconds || 30}s
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewExam(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
