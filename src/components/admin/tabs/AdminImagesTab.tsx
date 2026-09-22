import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  X,
  Eye,
  ShieldCheck,
  Upload,
  Link as LinkIcon,
  BookOpen,
  Layers,
  Copy,
  ExternalLink,
  Check,
  Maximize2
} from 'lucide-react';
import { User, LabSubjectId, ManagedImage, Practical } from '../../../types';
import { apiService } from '../../../services/apiService';
import { securityService } from '../../../services/securityService';
import { sortImagesCurriculum, sortPracticalsCurriculum } from '../../../utils/curriculumSort';

interface Props {
  currentUser: User;
}

export const AdminImagesTab: React.FC<Props> = ({ currentUser }) => {
  const [images, setImages] = useState<ManagedImage[]>([]);
  const [practicals, setPracticals] = useState<Practical[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | LabSubjectId>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ManagedImage | null>(null); // null for new image
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [imageToAssign, setImageToAssign] = useState<ManagedImage | null>(null);
  const [targetLessonId, setTargetLessonId] = useState('');
  const [targetCaption, setTargetCaption] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewModalUrl, setPreviewModalUrl] = useState<{ url: string; title: string; caption?: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for Add / Replace / Edit
  const [formImage, setFormImage] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formSubject, setFormSubject] = useState<LabSubjectId>('anatomy');
  const [formLessonId, setFormLessonId] = useState('');
  const [formCategory, setFormCategory] = useState<'lesson' | 'spotter' | 'diagram' | 'general'>('lesson');
  const [formStainOrView, setFormStainOrView] = useState('');
  const [formMagnification, setFormMagnification] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Permissions check
  const canManage = securityService.canPerformAction(currentUser.role, 'manage_images');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedImages, fetchedPracticals] = await Promise.all([
        apiService.fetchImages(),
        apiService.fetchPracticals()
      ]);
      const sortedPracticals = sortPracticalsCurriculum(fetchedPracticals || []);
      const sortedImages = sortImagesCurriculum(fetchedImages || [], sortedPracticals);
      setPracticals(sortedPracticals);
      setImages(sortedImages);
    } catch (e) {
      console.error('Failed to load images tab data:', e);
      setFeedback({ type: 'error', message: 'تعذر تحميل بيانات الصور من الخادم المشترك.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered practicals according to form subject
  const availableLessonsForForm = useMemo(() => {
    return sortPracticalsCurriculum(practicals.filter(p => p.courseId === formSubject));
  }, [practicals, formSubject]);

  // Handle open Add Modal
  const handleOpenAddModal = () => {
    setEditingImage(null);
    setFormImage('');
    setFormTitle('');
    setFormCaption('');
    setFormSubject('anatomy');
    setFormLessonId('');
    setFormCategory('lesson');
    setFormStainOrView('');
    setFormMagnification('');
    setUploadMode('file');
    setIsEditModalOpen(true);
  };

  // Handle open Edit / Replace Modal
  const handleOpenEditModal = (img: ManagedImage) => {
    setEditingImage(img);
    setFormImage(img.url);
    setFormTitle(img.title);
    setFormCaption(img.caption || '');
    setFormSubject(img.subject);
    setFormLessonId(img.lessonId || '');
    setFormCategory(img.category || 'lesson');
    setFormStainOrView(img.stainOrView || '');
    setFormMagnification(img.magnification || '');
    setUploadMode(img.url.startsWith('data:') || img.url.startsWith('/uploads/') ? 'file' : 'url');
    setIsEditModalOpen(true);
  };

  // Handle file select (Drag & drop or input)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'يرجى اختيار ملف صورة صالح (PNG, JPG, WebP).' });
      return;
    }

    // Check size limit: max 12MB
    if (file.size > 12 * 1024 * 1024) {
      setFeedback({ type: 'error', message: 'حجم الصورة يتجاوز الحد الأقصى المسموح (12 ميجابايت).' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormImage(base64);
      if (!formTitle) {
        // Auto populate title from file name without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setFormTitle(cleanName);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Add or Replace
  const handleSaveImageForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImage.trim()) {
      setFeedback({ type: 'error', message: 'يرجى تحميل صورة أو إدخال رابط صالح.' });
      return;
    }
    if (!formTitle.trim()) {
      setFeedback({ type: 'error', message: 'يرجى إدخال عنوان وصفي للصورة.' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (editingImage) {
        // Edit / Replace
        const res = await apiService.updateImage(editingImage.id, {
          image: formImage,
          title: formTitle,
          caption: formCaption,
          subject: formSubject,
          lessonId: formLessonId || undefined,
          category: formCategory,
          stainOrView: formStainOrView,
          magnification: formMagnification,
          updatedBy: `${currentUser.name} (${currentUser.role})`,
          userId: currentUser.id,
          userEmail: currentUser.email
        });

        if (res.success) {
          setFeedback({ type: 'success', message: 'تم تحديث/استبدال الصورة بنجاح وتحديث الدروس المرتبطة.' });
          setIsEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'فشل تحديث الصورة.' });
        }
      } else {
        // Add new
        const res = await apiService.addImage({
          image: formImage,
          title: formTitle,
          caption: formCaption,
          subject: formSubject,
          lessonId: formLessonId || undefined,
          category: formCategory,
          stainOrView: formStainOrView,
          magnification: formMagnification,
          uploadedBy: `${currentUser.name} (${currentUser.role})`,
          userId: currentUser.id,
          userEmail: currentUser.email
        });

        if (res.success) {
          setFeedback({ type: 'success', message: 'تمت إضافة الصورة بنجاح وتخزينها في قاعدة البيانات المشتركة.' });
          setIsEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'فشل حفظ الصورة.' });
        }
      }
    } catch (err: any) {
      console.error('Error saving image:', err);
      setFeedback({ type: 'error', message: err.message || 'حدث خطأ أثناء حفظ الصورة.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Delete image
  const handleDeleteImage = async (id: string) => {
    setIsSaving(true);
    try {
      const ok = await apiService.deleteImage(id, {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email
      });
      if (ok) {
        setFeedback({ type: 'success', message: 'تم حذف الصورة بنجاح من المعرض والدروس المرتبطة.' });
        setDeleteConfirmId(null);
        await loadData();
      } else {
        setFeedback({ type: 'error', message: 'فشل حذف الصورة من الخادم.' });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', message: e.message || 'حدث خطأ أثناء الحذف.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Quick Assign
  const handleOpenAssignModal = (img: ManagedImage) => {
    setImageToAssign(img);
    setTargetLessonId(img.lessonId || '');
    setTargetCaption(img.caption || img.title);
    setIsAssignModalOpen(true);
  };

  const handleSaveAssign = async () => {
    if (!imageToAssign || !targetLessonId) {
      setFeedback({ type: 'error', message: 'يرجى اختيار الدرس المراد ربط الصورة به.' });
      return;
    }

    setIsSaving(true);
    try {
      const targetPrac = practicals.find(p => p.id === targetLessonId);
      const res = await apiService.assignImage({
        imageId: imageToAssign.id,
        lessonId: targetLessonId,
        subject: targetPrac?.courseId || imageToAssign.subject,
        caption: targetCaption
      });

      if (res.success) {
        setFeedback({ type: 'success', message: `تم تعيين الصورة للدرس "${targetPrac?.title || targetLessonId}" بنجاح.` });
        setIsAssignModalOpen(false);
        setImageToAssign(null);
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'فشل تعيين الصورة.' });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', message: e.message || 'حدث خطأ أثناء تعيين الصورة.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Copy link
  const handleCopyUrl = (img: ManagedImage) => {
    const fullUrl = img.url.startsWith('http') ? img.url : `${window.location.origin}${img.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered images
  const filteredImages = useMemo(() => {
    const list = images.filter(img => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = img.title?.toLowerCase().includes(q);
        const matchesCaption = img.caption?.toLowerCase().includes(q);
        const matchesLesson = img.lessonTitle?.toLowerCase().includes(q);
        const matchesStain = img.stainOrView?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCaption && !matchesLesson && !matchesStain) {
          return false;
        }
      }

      // Subject
      if (selectedSubject !== 'all' && img.subject !== selectedSubject) {
        return false;
      }

      // Assignment
      if (selectedAssignment === 'assigned' && !img.lessonId) return false;
      if (selectedAssignment === 'unassigned' && img.lessonId) return false;

      // Category
      if (selectedCategory !== 'all' && img.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    return sortImagesCurriculum(list, practicals);
  }, [images, practicals, searchQuery, selectedSubject, selectedAssignment, selectedCategory]);

  // Subject colors helper
  const getSubjectBadge = (subject: LabSubjectId) => {
    switch (subject) {
      case 'anatomy':
        return { label: 'تشريح (Anatomy)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'histology':
        return { label: 'أنسجة (Histology)', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'biochemistry':
        return { label: 'كيمياء حيوية (Biochemistry)', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      default:
        return { label: subject, bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Top Banner & Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">إدارة الصور المعملية (Image Management)</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  قاعدة البيانات والتخزين المشترك
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                إضافة واستبدال وتعيين وحذف الصور المعملية للدروس والمواد لجميع الحسابات الإدارية المعتمدة (الحساب المشترك وحسابات المساعدين).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors disabled:opacity-50"
              title="تحديث البيانات من السيرفر"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>تحديث</span>
            </button>

            {canManage && (
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة صورة جديدة</span>
              </button>
            )}
          </div>
        </div>

        {/* User Role Indicator Banner */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>الحساب الحالي: <strong>{currentUser.name}</strong> ({currentUser.email})</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] text-slate-700 font-bold">
              {currentUser.role}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              التخزين السحابي نشط ومشترك
            </span>
            <span>•</span>
            <span>إجمالي الصور: <strong>{images.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-black/5 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، التعليق، الصبغة، أو اسم الدرس..."
              className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value as any)}
              className="w-full md:w-44 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="all">كل المواد (All Subjects)</option>
              <option value="anatomy">التشريح (Anatomy)</option>
              <option value="histology">الأنسجة (Histology)</option>
              <option value="biochemistry">الكيمياء الحيوية (Biochem)</option>
            </select>

            {/* Assignment Filter */}
            <select
              value={selectedAssignment}
              onChange={e => setSelectedAssignment(e.target.value as any)}
              className="w-full md:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="all">كل الحالات</option>
              <option value="assigned">معينة لدرس</option>
              <option value="unassigned">غير معينة لدرس</option>
            </select>
          </div>
        </div>

        {/* Quick category pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] font-bold">التصنيف:</span>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'lesson', label: 'صور الدروس المعملية' },
            { id: 'spotter', label: 'صور أسئلة السبوتير (OSPE)' },
            { id: 'diagram', label: 'مخططات توضيحية' },
            { id: 'general', label: 'عامة' }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-slate-400 mr-auto text-[11px]">
            عرض {filteredImages.length} من {images.length} صورة
          </span>
        </div>
      </div>

      {/* Main Image Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
          <RefreshCw className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-bold">جاري تحميل الصور من قاعدة البيانات المشتركة...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-800">لا توجد صور مطابقة لبحثك</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              يمكنك تغيير معايير البحث أو إضافة صورة جديدة بالضغط على زر "إضافة صورة جديدة" بالأعلى.
            </p>
          </div>
          {canManage && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة أول صورة</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredImages.map(img => {
            const subjectInfo = getSubjectBadge(img.subject);
            return (
              <div
                key={img.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
              >
                {/* Image Container with Hover Overlay */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e: any) => {
                      e.target.src = 'https://placehold.co/600x400/0f172a/ffffff?text=Medical+Specimen';
                    }}
                  />

                  {/* Badges on image */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end pointer-events-none">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shadow-sm ${subjectInfo.bg}`}>
                      {subjectInfo.label}
                    </span>
                    {img.magnification && (
                      <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white font-mono text-[10px]">
                        {img.magnification}
                      </span>
                    )}
                  </div>

                  {/* Top left action: Quick preview */}
                  <button
                    type="button"
                    onClick={() => setPreviewModalUrl({ url: img.url, title: img.title, caption: img.caption })}
                    className="absolute top-2.5 left-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                    title="معاينة كبيرة (Lightbox)"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Stain or View tag */}
                  {img.stainOrView && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-slate-200 text-[10px] font-medium max-w-[90%] truncate">
                      {img.stainOrView}
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-rose-600 transition-colors" title={img.title}>
                      {img.title}
                    </h4>

                    {img.caption ? (
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed" title={img.caption}>
                        {img.caption}
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">بدون تعليق توضيحي</p>
                    )}
                  </div>

                  {/* Assigned Lesson Badge */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      {img.lessonId ? (
                        <span className="text-indigo-700 font-bold line-clamp-1" title={img.lessonTitle || img.lessonId}>
                          {img.lessonTitle || img.lessonId}
                        </span>
                      ) : (
                        <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                          غير معينة لدرس
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>بواسطة: {img.uploadedBy || 'مسؤول'}</span>
                      <span>{new Date(img.updatedAt || img.uploadedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      {/* Copy URL */}
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(img)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] transition-colors"
                        title="نسخ رابط الصورة"
                      >
                        {copiedId === img.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Quick Assign to Lesson */}
                      {canManage && (
                        <button
                          type="button"
                          onClick={() => handleOpenAssignModal(img)}
                          className="px-2 py-1 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                          title="تعيين الصورة لدرس"
                        >
                          <Layers className="w-3 h-3" />
                          <span>تعيين</span>
                        </button>
                      )}
                    </div>

                    {canManage && (
                      <div className="flex items-center gap-1">
                        {/* Replace / Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(img)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                          title="استبدال أو تعديل بيانات الصورة"
                        >
                          <Edit className="w-3 h-3" />
                          <span>تعديل/استبدال</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(img.id)}
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                          title="حذف الصورة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==================== MODAL: ADD / REPLACE / EDIT IMAGE ==================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {editingImage ? 'استبدال أو تعديل الصورة المعملية' : 'إضافة صورة معملية جديدة'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {editingImage
                      ? 'يمكنك استبدال ملف الصورة أو تحديث العنوان والدرس المعين لها.'
                      : 'سيتم حفظ الصورة في التخزين ومشاركتها مع جميع المسؤولين المعتمدين.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveImageForm} className="space-y-4">
              {/* Upload Mode Switch */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    uploadMode === 'file'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>رفع ملف من جهازك</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    uploadMode === 'url'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>رابط صورة مباشر (URL)</span>
                </button>
              </div>

              {/* Upload File Input / Drop Area */}
              {uploadMode === 'file' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-rose-50/30"
                  >
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">اضغط لاختيار صورة من جهازك</p>
                    <p className="text-[11px] text-slate-400 mt-1">يدعم صيغ PNG, JPG, WebP حتى 12 ميجابايت</p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رابط الصورة (URL)</label>
                  <input
                    type="url"
                    value={formImage}
                    onChange={e => setFormImage(e.target.value)}
                    placeholder="https://example.com/specimen.jpg"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              )}

              {/* Preview Thumbnail */}
              {formImage && (
                <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-slate-200 flex items-center justify-center">
                  <img src={formImage} alt="Preview" className="w-full h-full object-contain" />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-[10px] font-bold">
                    معاينة حية
                  </div>
                </div>
              )}

              {/* Title & Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    عنوان الصورة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="مثال: Anterior View of the Heart"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المادة المعملية</label>
                  <select
                    value={formSubject}
                    onChange={e => {
                      setFormSubject(e.target.value as LabSubjectId);
                      setFormLessonId(''); // reset lesson when subject changes
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="anatomy">التشريح (Anatomy)</option>
                    <option value="histology">الأنسجة (Histology)</option>
                    <option value="biochemistry">الكيمياء الحيوية (Biochemistry)</option>
                  </select>
                </div>
              </div>

              {/* Assign to Lesson & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    تعيين لدرس محدد (اختياري)
                  </label>
                  <select
                    value={formLessonId}
                    onChange={e => setFormLessonId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="">بدون تعيين لدرس حالياً</option>
                    {availableLessonsForForm.map(prac => (
                      <option key={prac.id} value={prac.id}>
                        {prac.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نوع الاستخدام</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="lesson">صورة شرح درس عملي (Lesson Media)</option>
                    <option value="spotter">سؤال سبوتير (OSPE Exam)</option>
                    <option value="diagram">مخطط أو رسم تخطيطي (Diagram)</option>
                    <option value="general">صورة عامة (General)</option>
                  </select>
                </div>
              </div>

              {/* Technical Details: Stain/View and Magnification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">زاوية الرؤية أو الصبغة</label>
                  <input
                    type="text"
                    value={formStainOrView}
                    onChange={e => setFormStainOrView(e.target.value)}
                    placeholder="مثال: H&E Stain أو Anterior View"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">قوة التكبير (للمجهر)</label>
                  <input
                    type="text"
                    value={formMagnification}
                    onChange={e => setFormMagnification(e.target.value)}
                    placeholder="مثال: 40x أو 100x أو Gross Specimen"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">شرح أو تعليق سريري (Caption)</label>
                <textarea
                  rows={2}
                  value={formCaption}
                  onChange={e => setFormCaption(e.target.value)}
                  placeholder="ملاحظات تشريحية أو علامات فارقة تظهر في هذه العينة..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingImage ? 'حفظ التعديلات والاستبدال' : 'حفظ الصورة في المعرض'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: QUICK ASSIGN TO LESSON ==================== */}
      {isAssignModalOpen && imageToAssign && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900">تعيين الصورة لدرس معملي</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <img
                src={imageToAssign.url}
                alt={imageToAssign.title}
                className="w-14 h-14 object-cover rounded-lg shrink-0 border border-slate-300"
              />
              <div className="overflow-hidden text-xs">
                <p className="font-bold text-slate-900 truncate">{imageToAssign.title}</p>
                <p className="text-slate-500 text-[11px] truncate">{imageToAssign.subject}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اختر الدرس المعملي</label>
                <select
                  value={targetLessonId}
                  onChange={e => setTargetLessonId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">-- اختر الدرس --</option>
                  {practicals
                    .filter(p => p.courseId === imageToAssign.subject)
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التعليق المرفق داخل الدرس</label>
                <input
                  type="text"
                  value={targetCaption}
                  onChange={e => setTargetCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="وصف الصورة داخل الدرس"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                إلغاء
              </button>
              <button
                type="button"
                disabled={isSaving || !targetLessonId}
                onClick={handleSaveAssign}
                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                {isSaving && <RefreshCw className="w-3 h-3 animate-spin" />}
                <span>تأكيد التعيين</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: DELETE CONFIRMATION ==================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900">تأكيد حذف الصورة نهائياً؟</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                سيتم حذف الصورة من التخزين وقاعدة البيانات وإزالتها من أي دروس مرتبطة بها. هذا الإجراء سيتم تطبيقه على جميع حسابات المسؤولين.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                تراجع
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleDeleteImage(deleteConfirmId)}
                className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all"
              >
                {isSaving ? 'جاري الحذف...' : 'نعم، احذف'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: LIGHTBOX PREVIEW ==================== */}
      {previewModalUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          dir="rtl"
          onClick={() => setPreviewModalUrl(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewModalUrl(null)}
              className="absolute -top-12 left-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewModalUrl.url}
              alt={previewModalUrl.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="mt-3 text-center text-white space-y-1">
              <h3 className="text-sm font-bold">{previewModalUrl.title}</h3>
              {previewModalUrl.caption && (
                <p className="text-xs text-white/70 max-w-xl mx-auto">{previewModalUrl.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
