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
  ShieldCheck,
  Upload,
  Link as LinkIcon,
  BookOpen,
  Layers,
  Copy,
  Check,
  Maximize2,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Grid,
  ListTree,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { User, LabSubjectId, ManagedImage, Practical } from '../../../types';
import { apiService } from '../../../services/apiService';
import { securityService } from '../../../services/securityService';
import { sortImagesCurriculum, sortPracticalsCurriculum } from '../../../utils/curriculumSort';
import { SUBJECT_HIERARCHY_SECTIONS, DEFAULT_MANAGED_IMAGES } from '../../../data/defaultManagedImages';
import { compressImageToMax200KB } from '../../../utils/imageCompressor';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

interface Props {
  currentUser: User;
}

type ViewMode = 'hierarchy' | 'grid';

export const AdminImagesTab: React.FC<Props> = ({ currentUser }) => {
  const [images, setImages] = useState<ManagedImage[]>(() => DEFAULT_MANAGED_IMAGES);
  const [practicals, setPracticals] = useState<Practical[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // View Mode: 'hierarchy' (المادة -> القسم -> الدرس -> الصورة) or 'grid'
  const [viewMode, setViewMode] = useState<ViewMode>('hierarchy');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | LabSubjectId>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');

  // Collapsible sections state (set of section IDs that are open)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'anat_bones': true,
    'anat_muscles': true,
    'hist_epithelial': true,
    'bio_carbohydrates': true
  });

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ManagedImage | null>(null); // null for new image
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [imageToReplace, setImageToReplace] = useState<ManagedImage | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [imageToAssign, setImageToAssign] = useState<ManagedImage | null>(null);
  const [targetLessonId, setTargetLessonId] = useState('');
  const [targetCaption, setTargetCaption] = useState('');
  const [deleteConfirmImage, setDeleteConfirmImage] = useState<ManagedImage | null>(null);
  const [previewModalUrl, setPreviewModalUrl] = useState<{ url: string; title: string; caption?: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for Add / Edit
  const [formImage, setFormImage] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formSubject, setFormSubject] = useState<LabSubjectId>('anatomy');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formLessonId, setFormLessonId] = useState('');
  const [formCategory, setFormCategory] = useState<'lesson' | 'spotter' | 'diagram' | 'general'>('lesson');
  const [formStainOrView, setFormStainOrView] = useState('');
  const [formMagnification, setFormMagnification] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Form state for Quick Replace Modal
  const [replaceNewImage, setReplaceNewImage] = useState('');
  const [replaceUploadMode, setReplaceUploadMode] = useState<'file' | 'url'>('file');

  // Permissions check
  const canManage = securityService.canPerformAction(currentUser.role, 'manage_images');

  // Load data from centralized Firebase collections
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedImages, fetchedPracticals] = await Promise.all([
        apiService.fetchImages(),
        apiService.fetchPracticals()
      ]);

      const sortedPracticals = sortPracticalsCurriculum(fetchedPracticals || []);
      const sortedImages = sortImagesCurriculum(
        fetchedImages && fetchedImages.length > 0 ? fetchedImages : DEFAULT_MANAGED_IMAGES,
        sortedPracticals
      );

      setPracticals(sortedPracticals);
      setImages(sortedImages);
    } catch (e) {
      console.error('Failed to load images tab data:', e);
      setFeedback({ type: 'error', message: 'تعذر تحميل بيانات الصور من الخادم المشترك.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Direct real-time sync with root collections: /slides and /lessons
  useEffect(() => {
    let isMounted = true;

    // Initial load
    loadData();

    // 1. Live listener for central /slides collection
    const unsubSlides = onSnapshot(
      collection(db, 'slides'),
      (snap) => {
        if (!isMounted) return;
        const list: ManagedImage[] = [];
        snap.forEach((d) => {
          const data = d.data();
          const resolvedUrl = data.url || data.image || data.imageUrl || '';
          list.push({
            id: d.id,
            ...data,
            url: resolvedUrl,
            image: resolvedUrl,
            imageUrl: resolvedUrl
          } as ManagedImage);
        });

        if (list.length > 0) {
          setImages(sortImagesCurriculum(list, practicals));
        } else {
          // If Firestore /slides is empty, use default verified catalog
          setImages(DEFAULT_MANAGED_IMAGES);
        }
        setIsLoading(false);
      },
      (err) => {
        console.warn('Realtime slides listener error:', err);
      }
    );

    // 2. Live listener for central /lessons collection
    const unsubLessons = onSnapshot(
      collection(db, 'lessons'),
      (snap) => {
        if (!isMounted) return;
        const list: Practical[] = [];
        snap.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as Practical);
        });
        if (list.length > 0) {
          const sorted = sortPracticalsCurriculum(list);
          setPracticals(sorted);
          setImages((prev) => sortImagesCurriculum(prev, sorted));
        }
      },
      (err) => {
        console.warn('Realtime lessons listener error:', err);
      }
    );

    return () => {
      isMounted = false;
      unsubSlides();
      unsubLessons();
    };
  }, []);

  // Subject sections helper
  const availableSectionsForForm = useMemo(() => {
    return SUBJECT_HIERARCHY_SECTIONS.filter(s => s.subject === formSubject);
  }, [formSubject]);

  // Lessons filtered for current form subject & section
  const availableLessonsForForm = useMemo(() => {
    let list = practicals.filter(p => p.courseId === formSubject);
    if (formCategoryId) {
      const byCat = list.filter(p => p.categoryId === formCategoryId);
      if (byCat.length > 0) list = byCat;
    }
    return sortPracticalsCurriculum(list);
  }, [practicals, formSubject, formCategoryId]);

  // Open Add Modal with optional pre-selection
  const handleOpenAddModal = (preset?: { subject?: LabSubjectId; categoryId?: string; lessonId?: string }) => {
    setEditingImage(null);
    setFormImage('');
    setFormTitle('');
    setFormCaption('');
    setFormSubject(preset?.subject || (selectedSubject !== 'all' ? selectedSubject : 'anatomy'));
    setFormCategoryId(preset?.categoryId || '');
    setFormLessonId(preset?.lessonId || '');
    setFormCategory('lesson');
    setFormStainOrView('');
    setFormMagnification('');
    setUploadMode('file');
    setIsEditModalOpen(true);
  };

  // Open Edit / Change Subject & Lesson Modal
  const handleOpenEditModal = (img: ManagedImage) => {
    setEditingImage(img);
    setFormImage(img.url);
    setFormTitle(img.title);
    setFormCaption(img.caption || '');
    setFormSubject(img.subject);
    setFormCategoryId(img.categoryId || '');
    setFormLessonId(img.lessonId || '');
    setFormCategory(img.category || 'lesson');
    setFormStainOrView(img.stainOrView || '');
    setFormMagnification(img.magnification || '');
    setUploadMode(img.url.startsWith('data:') ? 'file' : 'url');
    setIsEditModalOpen(true);
  };

  // Open Quick Replace Modal
  const handleOpenReplaceModal = (img: ManagedImage) => {
    setImageToReplace(img);
    setReplaceNewImage('');
    setReplaceUploadMode('file');
    setIsReplaceModalOpen(true);
  };

  // Handle file select for Add / Edit
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'يرجى اختيار ملف صورة صالح (PNG, JPG, WebP).' });
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setFeedback({ type: 'error', message: 'حجم الصورة يتجاوز الحد الأقصى المسموح (12 ميجابايت).' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        const compressed = await compressImageToMax200KB(base64);
        setFormImage(compressed);
      } catch {
        setFormImage(base64);
      }
      if (!formTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setFormTitle(cleanName);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle file select for Quick Replace
  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'يرجى اختيار ملف صورة صالح.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        const compressed = await compressImageToMax200KB(base64);
        setReplaceNewImage(compressed);
      } catch {
        setReplaceNewImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Add / Edit
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
      const targetLesson = practicals.find(p => p.id === formLessonId);
      const targetSection = SUBJECT_HIERARCHY_SECTIONS.find(s => s.id === formCategoryId);

      if (editingImage) {
        // Edit / Update
        const res = await apiService.updateImage(editingImage.id, {
          image: formImage,
          title: formTitle,
          caption: formCaption,
          subject: formSubject,
          categoryId: formCategoryId || targetLesson?.categoryId || undefined,
          categoryTitle: targetSection ? `${targetSection.titleAr} (${targetSection.titleEn})` : undefined,
          lessonId: formLessonId || undefined,
          lessonTitle: targetLesson?.title || undefined,
          category: formCategory,
          stainOrView: formStainOrView,
          magnification: formMagnification,
          updatedBy: `${currentUser.name} (${currentUser.role})`,
          userId: currentUser.id,
          userEmail: currentUser.email
        });

        if (res.success) {
          setFeedback({ type: 'success', message: 'تم تحديث بيانات الصورة ونقلها بنجاح ومزامنتها لجميع الطلاب.' });
          setIsEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'فشل تحديث الصورة.' });
        }
      } else {
        // Add new image
        const res = await apiService.addImage({
          image: formImage,
          title: formTitle,
          caption: formCaption,
          subject: formSubject,
          categoryId: formCategoryId || targetLesson?.categoryId || undefined,
          categoryTitle: targetSection ? `${targetSection.titleAr} (${targetSection.titleEn})` : undefined,
          lessonId: formLessonId || undefined,
          lessonTitle: targetLesson?.title || undefined,
          category: formCategory,
          stainOrView: formStainOrView,
          magnification: formMagnification,
          uploadedBy: `${currentUser.name} (${currentUser.role})`,
          userId: currentUser.id,
          userEmail: currentUser.email
        });

        if (res.success) {
          setFeedback({ type: 'success', message: 'تمت إضافة الصورة بنجاح وحفظها في Firestore لتظهر لجميع الطلاب فوراً.' });
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

  // Submit Quick Replace
  const handleConfirmReplace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageToReplace || !replaceNewImage.trim()) {
      setFeedback({ type: 'error', message: 'يرجى تحميل الصورة البديلة أو إدخال رابطها الجديد.' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await apiService.updateImage(imageToReplace.id, {
        image: replaceNewImage,
        title: imageToReplace.title,
        caption: imageToReplace.caption,
        subject: imageToReplace.subject,
        categoryId: imageToReplace.categoryId,
        categoryTitle: imageToReplace.categoryTitle,
        lessonId: imageToReplace.lessonId,
        lessonTitle: imageToReplace.lessonTitle,
        category: imageToReplace.category,
        stainOrView: imageToReplace.stainOrView,
        magnification: imageToReplace.magnification,
        updatedBy: `${currentUser.name} (استبدال فوري)`,
        userId: currentUser.id,
        userEmail: currentUser.email
      });

      if (res.success) {
        setFeedback({ type: 'success', message: `تم استبدال صورة "${imageToReplace.title}" بنجاح وتحديث الدرس والواجهات لجميع الطلاب.` });
        setIsReplaceModalOpen(false);
        setImageToReplace(null);
        setReplaceNewImage('');
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'فشل استبدال الصورة.' });
      }
    } catch (err: any) {
      console.error('Error replacing image:', err);
      setFeedback({ type: 'error', message: err.message || 'حدث خطأ أثناء استبدال الصورة.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Delete image
  const handleDeleteImage = async () => {
    if (!deleteConfirmImage) return;

    setIsSaving(true);
    try {
      const ok = await apiService.deleteImage(deleteConfirmImage.id, {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email
      });

      if (ok) {
        setFeedback({ type: 'success', message: `تم حذف الصورة "${deleteConfirmImage.title}" نهائياً من الخادم ومجموعات Firestore.` });
        setDeleteConfirmImage(null);
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

  // Toggle accordion section
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleAllSections = (open: boolean) => {
    const next: Record<string, boolean> = {};
    SUBJECT_HIERARCHY_SECTIONS.forEach(s => {
      next[s.id] = open;
    });
    setOpenSections(next);
  };

  // Filtered images list
  const filteredImages = useMemo(() => {
    const list = images.filter(img => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = img.title?.toLowerCase().includes(q);
        const matchesCaption = img.caption?.toLowerCase().includes(q);
        const matchesLesson = img.lessonTitle?.toLowerCase().includes(q);
        const matchesStain = img.stainOrView?.toLowerCase().includes(q);
        const matchesSection = img.categoryTitle?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCaption && !matchesLesson && !matchesStain && !matchesSection) {
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

  // Hierarchical Data Tree: Subject -> Section -> Lesson -> Images
  const hierarchicalTree = useMemo(() => {
    const subjects: {
      id: LabSubjectId;
      nameAr: string;
      nameEn: string;
      badgeColor: string;
      borderColor: string;
      bgLight: string;
      sections: {
        id: string;
        titleAr: string;
        titleEn: string;
        descriptionAr: string;
        iconName: string;
        lessons: {
          id: string;
          practicalNumber: number;
          title: string;
          images: ManagedImage[];
        }[];
        unassignedImages: ManagedImage[];
      }[];
      unassignedSectionImages: ManagedImage[];
    }[] = [
      {
        id: 'anatomy',
        nameAr: 'علم التشريح',
        nameEn: 'Anatomy Lab',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        borderColor: 'border-emerald-200',
        bgLight: 'bg-emerald-50/50',
        sections: [],
        unassignedSectionImages: []
      },
      {
        id: 'histology',
        nameAr: 'علم الأنسجة والبيولوجيا الخلوية',
        nameEn: 'Histology Lab',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        borderColor: 'border-purple-200',
        bgLight: 'bg-purple-50/50',
        sections: [],
        unassignedSectionImages: []
      },
      {
        id: 'biochemistry',
        nameAr: 'الكيمياء الحيوية السريرية',
        nameEn: 'Clinical Biochemistry',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        borderColor: 'border-cyan-200',
        bgLight: 'bg-cyan-50/50',
        sections: [],
        unassignedSectionImages: []
      }
    ];

    // Filter by selected subject tab if not 'all'
    const activeSubjects = selectedSubject === 'all'
      ? subjects
      : subjects.filter(s => s.id === selectedSubject);

    // Populate each subject's sections and lessons
    activeSubjects.forEach(subj => {
      const subjectSections = SUBJECT_HIERARCHY_SECTIONS.filter(s => s.subject === subj.id);
      const subjectPracticals = practicals.filter(p => p.courseId === subj.id);
      const subjectImages = filteredImages.filter(img => img.subject === subj.id);

      subjectSections.forEach(sec => {
        // Find lessons belonging to this section
        const secLessons = subjectPracticals.filter(p => p.categoryId === sec.id);

        const structuredLessons = secLessons.map(lesson => {
          const lessonImages = subjectImages.filter(img => img.lessonId === lesson.id);
          return {
            id: lesson.id,
            practicalNumber: lesson.practicalNumber,
            title: lesson.title,
            images: lessonImages
          };
        });

        // Images belonging to this section but without specific lesson
        const unassignedImages = subjectImages.filter(
          img => (img.categoryId === sec.id) && (!img.lessonId || !subjectPracticals.some(p => p.id === img.lessonId))
        );

        subj.sections.push({
          id: sec.id,
          titleAr: sec.titleAr,
          titleEn: sec.titleEn,
          descriptionAr: sec.descriptionAr,
          iconName: sec.iconName,
          lessons: structuredLessons,
          unassignedImages
        });
      });

      // Images in this subject with unmapped section
      subj.unassignedSectionImages = subjectImages.filter(
        img => !subjectSections.some(s => s.id === img.categoryId) && !img.lessonId
      );
    });

    return activeSubjects;
  }, [practicals, filteredImages, selectedSubject]);

  // Subject badge info
  const getSubjectBadge = (subject: LabSubjectId) => {
    switch (subject) {
      case 'anatomy':
        return { label: 'تشريح (Anatomy)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'histology':
        return { label: 'أنسجة (Histology)', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'biochemistry':
        return { label: 'كيمياء حيوية (Biochem)', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      default:
        return { label: subject, bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  // Image Card Component (Standardized across Hierarchy & Grid)
  const renderImageCard = (img: ManagedImage) => {
    const subjectInfo = getSubjectBadge(img.subject);
    return (
      <div
        key={img.id}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group relative"
      >
        {/* Thumbnail Container */}
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

          {/* Action Buttons: Replace, Edit, Delete, Copy */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 flex-wrap">
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

              {/* Quick Assign if unassigned */}
              {canManage && (
                <button
                  type="button"
                  onClick={() => handleOpenAssignModal(img)}
                  className="px-2 py-1 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                  title="تعيين لدرس عملي"
                >
                  <Layers className="w-3 h-3" />
                  <span>تعيين</span>
                </button>
              )}
            </div>

            {canManage && (
              <div className="flex items-center gap-1">
                {/* Direct Replace Button */}
                <button
                  type="button"
                  onClick={() => handleOpenReplaceModal(img)}
                  className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1 shadow-sm"
                  title="استبدال الصورة بملف أو رابط جديد"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>استبدال</span>
                </button>

                {/* Edit / Move Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(img)}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                  title="تعديل البيانات أو تغيير المادة/الدرس"
                >
                  <Edit className="w-3 h-3" />
                  <span>تعديل/نقل</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => setDeleteConfirmImage(img)}
                  className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                  title="حذف الصورة نهائياً"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-16" dir="rtl">
      {/* Top Banner & Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">
                  لوحة إدارة الصور والمزامنة الهرمية المركزية
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  مجموعة /slides المركزية
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                تنظيم هرمي متكامل لجميع مواد المنصة (المادة ← القسم ← الدرس ← الصورة)، مع إمكانية إضافة، استبدال، وحذف أي صورة مباشرة ومزامنتها لجميع الطلاب فوراً.
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
              <span>تحديث السحابة</span>
            </button>

            {canManage && (
              <button
                type="button"
                onClick={() => handleOpenAddModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة صورة جديدة</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Discipline Counts Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between">
            <span className="text-slate-500 font-bold">إجمالي الصور:</span>
            <span className="font-black text-slate-900 font-mono text-sm">{images.length}</span>
          </div>
          <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-200/80 flex items-center justify-between">
            <span className="text-emerald-800 font-bold">التشريح (Anatomy):</span>
            <span className="font-black text-emerald-900 font-mono text-sm">
              {images.filter(i => i.subject === 'anatomy').length}
            </span>
          </div>
          <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-200/80 flex items-center justify-between">
            <span className="text-purple-800 font-bold">الأنسجة (Histology):</span>
            <span className="font-black text-purple-900 font-mono text-sm">
              {images.filter(i => i.subject === 'histology').length}
            </span>
          </div>
          <div className="bg-cyan-50/60 rounded-xl p-3 border border-cyan-200/80 flex items-center justify-between">
            <span className="text-cyan-800 font-bold">الكيمياء الحيوية:</span>
            <span className="font-black text-cyan-900 font-mono text-sm">
              {images.filter(i => i.subject === 'biochemistry').length}
            </span>
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

      {/* Control Bar: View Switcher, Search, Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* View Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 w-full md:w-auto self-start">
            <button
              type="button"
              onClick={() => setViewMode('hierarchy')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListTree className="w-4 h-4 text-rose-600" />
              <span>الترتيب الهرمي (المادة ← القسم ← الدرس)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4 text-slate-600" />
              <span>شبكة الصور الشاملة</span>
            </button>
          </div>

          {/* Quick expand/collapse in hierarchy view */}
          {viewMode === 'hierarchy' && (
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => toggleAllSections(true)}
                className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
              >
                توسيع كل الأقسام
              </button>
              <button
                type="button"
                onClick={() => toggleAllSections(false)}
                className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
              >
                طي الأقسام
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المادة، القسم، الصبغة، أو اسم الدرس..."
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
              className="w-full md:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="all">كل المواد (3 مواد)</option>
              <option value="anatomy">التشريح (Anatomy)</option>
              <option value="histology">الأنسجة (Histology)</option>
              <option value="biochemistry">الكيمياء الحيوية (Biochem)</option>
            </select>

            {/* Assignment Filter */}
            <select
              value={selectedAssignment}
              onChange={e => setSelectedAssignment(e.target.value as any)}
              className="w-full md:w-36 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
          <RefreshCw className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-bold">جاري جلب الصور ومزامنة المجموعات من Firestore...</p>
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
              onClick={() => handleOpenAddModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة صورة الآن</span>
            </button>
          )}
        </div>
      ) : viewMode === 'hierarchy' ? (
        /* ==================== HIERARCHICAL TREE VIEW ==================== */
        <div className="space-y-8">
          {hierarchicalTree.map(subj => {
            const totalSubjImages = filteredImages.filter(i => i.subject === subj.id).length;
            return (
              <div
                key={subj.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Level 1: Subject Header */}
                <div className={`p-5 md:p-6 border-b ${subj.borderColor} ${subj.bgLight} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                      <Folder className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg md:text-xl font-black text-slate-900">{subj.nameAr}</h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${subj.badgeColor}`}>
                          {subj.nameEn}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {subj.sections.length} أقسام معتمدة • {totalSubjImages} صورة معملية نشطة
                      </p>
                    </div>
                  </div>

                  {canManage && (
                    <button
                      type="button"
                      onClick={() => handleOpenAddModal({ subject: subj.id })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-sm transition-all self-start md:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-rose-600" />
                      <span>إضافة صورة في {subj.nameAr}</span>
                    </button>
                  )}
                </div>

                {/* Level 2: Sections in this Subject */}
                <div className="p-4 md:p-6 space-y-4">
                  {subj.sections.map(section => {
                    const isOpen = openSections[section.id] ?? false;
                    const totalSecImages = section.lessons.reduce((acc, l) => acc + l.images.length, 0) + section.unassignedImages.length;

                    return (
                      <div
                        key={section.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                      >
                        {/* Section Header (Collapsible) */}
                        <div
                          onClick={() => toggleSection(section.id)}
                          className="p-4 bg-white hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-100 transition-colors select-none"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                            >
                              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                              <FolderOpen className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-900 text-sm">{section.titleAr}</h3>
                                <span className="text-[11px] font-mono text-slate-400">({section.titleEn})</span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{section.descriptionAr}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-xs font-bold text-slate-700">
                              {totalSecImages} {totalSecImages === 1 ? 'صورة' : 'صور'}
                            </span>
                            {canManage && (
                              <button
                                type="button"
                                onClick={() => handleOpenAddModal({ subject: subj.id, categoryId: section.id })}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                                title="إضافة صورة لهذا القسم"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">إضافة صورة بالقسم</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Collapsible Section Body */}
                        {isOpen && (
                          <div className="p-4 md:p-5 space-y-6">
                            {/* Level 3: Lessons inside Section */}
                            {section.lessons.map(lesson => (
                              <div
                                key={lesson.id}
                                className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm"
                              >
                                {/* Lesson Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                      #{lesson.practicalNumber || 1}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">{lesson.title}</h4>
                                      <span className="text-[10px] text-slate-400 font-mono">{lesson.id}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 self-start sm:self-auto">
                                    <span className="text-xs text-slate-500 font-semibold">
                                      {lesson.images.length} {lesson.images.length === 1 ? 'صورة معينة' : 'صور معينة'}
                                    </span>
                                    {canManage && (
                                      <button
                                        type="button"
                                        onClick={() => handleOpenAddModal({ subject: subj.id, categoryId: section.id, lessonId: lesson.id })}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                                      >
                                        <Plus className="w-3 h-3 text-rose-600" />
                                        <span>+ إضافة صورة لهذا الدرس</span>
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Level 4: Images under this Lesson */}
                                {lesson.images.length === 0 ? (
                                  <div className="py-6 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                    <p className="text-xs text-slate-400">لا توجد صور معينة لهذا الدرس حالياً.</p>
                                    {canManage && (
                                      <button
                                        type="button"
                                        onClick={() => handleOpenAddModal({ subject: subj.id, categoryId: section.id, lessonId: lesson.id })}
                                        className="text-xs font-bold text-rose-600 hover:text-rose-700 mt-1 inline-flex items-center gap-1"
                                      >
                                        <Plus className="w-3 h-3" />
                                        <span>إضافة أول صورة للدرس</span>
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {lesson.images.map(img => renderImageCard(img))}
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Unassigned images belonging to this section */}
                            {section.unassignedImages.length > 0 && (
                              <div className="bg-amber-50/40 rounded-xl border border-amber-200 p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-bold text-amber-900 text-xs">
                                    صور تابعة للقسم وغير مخصصة لدرس محدد ({section.unassignedImages.length})
                                  </h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                  {section.unassignedImages.map(img => renderImageCard(img))}
                                </div>
                              </div>
                            )}

                            {section.lessons.length === 0 && section.unassignedImages.length === 0 && (
                              <div className="py-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                                لا توجد دروس أو صور مسجلة في هذا القسم بعد.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* General / Unassigned section images in this subject */}
                  {subj.unassignedSectionImages.length > 0 && (
                    <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 space-y-3">
                      <h3 className="font-bold text-slate-800 text-xs">
                        صور عامة في مادة {subj.nameAr} ({subj.unassignedSectionImages.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {subj.unassignedSectionImages.map(img => renderImageCard(img))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ==================== FLAT GRID VIEW ==================== */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredImages.map(img => renderImageCard(img))}
        </div>
      )}

      {/* ==================== MODAL: ADD / EDIT IMAGE ==================== */}
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
                    {editingImage ? 'تعديل بيانات ونقل الصورة' : 'إضافة صورة معملية جديدة'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {editingImage
                      ? 'يمكنك تغيير المادة، القسم، الدرس، العنوان والبيانات التوضيحية.'
                      : 'سيتم حفظ الصورة في مجموعة /slides المركزية ومزامنتها فوراً لجميع الطلاب.'}
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
                    placeholder="https://images.unsplash.com/... أو /images/anatomy/..."
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
                    placeholder="مثال: Anterior View of the Skull"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المادة المعملية (Subject)</label>
                  <select
                    value={formSubject}
                    onChange={e => {
                      const newSub = e.target.value as LabSubjectId;
                      setFormSubject(newSub);
                      setFormCategoryId('');
                      setFormLessonId('');
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="anatomy">التشريح (Anatomy)</option>
                    <option value="histology">الأنسجة (Histology)</option>
                    <option value="biochemistry">الكيمياء الحيوية (Biochemistry)</option>
                  </select>
                </div>
              </div>

              {/* Section & Lesson Selection (Hierarchy Level 2 & 3) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القسم (Section / Module)</label>
                  <select
                    value={formCategoryId}
                    onChange={e => {
                      setFormCategoryId(e.target.value);
                      setFormLessonId('');
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="">-- اختر القسم الأكاديمي --</option>
                    {availableSectionsForForm.map(sec => (
                      <option key={sec.id} value={sec.id}>
                        {sec.titleAr} ({sec.titleEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الدرس العملي (Lesson / Practical)</label>
                  <select
                    value={formLessonId}
                    onChange={e => setFormLessonId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="">بدون تعيين لدرس حالياً</option>
                    {availableLessonsForForm.map(prac => (
                      <option key={prac.id} value={prac.id}>
                        #{prac.practicalNumber} {prac.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category & Technical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نوع الاستخدام</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option value="lesson">صورة شرح درس</option>
                    <option value="spotter">سؤال سبوتير (OSPE)</option>
                    <option value="diagram">مخطط توضيحي</option>
                    <option value="general">عامة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">زاوية الرؤية / الصبغة</label>
                  <input
                    type="text"
                    value={formStainOrView}
                    onChange={e => setFormStainOrView(e.target.value)}
                    placeholder="مثال: H&E أو Anterior"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">قوة التكبير</label>
                  <input
                    type="text"
                    value={formMagnification}
                    onChange={e => setFormMagnification(e.target.value)}
                    placeholder="مثال: 400x أو Gross"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                  <span>{editingImage ? 'حفظ التعديلات ونقل الصورة' : 'حفظ الصورة في المعرض المركزي'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: QUICK REPLACE IMAGE ==================== */}
      {isReplaceModalOpen && imageToReplace && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">استبدال الصورة مباشرة</h3>
                  <p className="text-[11px] text-slate-500">
                    استبدال ملف أو رابط الصورة الحالية مع الحفاظ على الربط بالدرس والبيانات.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReplaceModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReplace} className="space-y-4">
              {/* Current Image Display */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                <img
                  src={imageToReplace.url}
                  alt={imageToReplace.title}
                  className="w-16 h-16 object-cover rounded-xl shrink-0 border border-slate-300"
                />
                <div className="text-xs space-y-1 overflow-hidden">
                  <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">الصورة الحالية</span>
                  <p className="font-bold text-slate-900 truncate">{imageToReplace.title}</p>
                  <p className="text-slate-500 text-[11px] truncate">
                    {imageToReplace.lessonTitle || 'غير معينة لدرس'}
                  </p>
                </div>
              </div>

              {/* Mode switch for replacement */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setReplaceUploadMode('file')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    replaceUploadMode === 'file'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>رفع صورة بديلة من جهازك</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReplaceUploadMode('url')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    replaceUploadMode === 'url'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>رابط الصورة الجديد (URL)</span>
                </button>
              </div>

              {replaceUploadMode === 'file' ? (
                <div>
                  <input
                    type="file"
                    ref={replaceFileInputRef}
                    onChange={handleReplaceFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => replaceFileInputRef.current?.click()}
                    className="border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-rose-50/20 hover:bg-rose-50/40"
                  >
                    <Upload className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">اضغط لاختيار الصورة البديلة</p>
                    <p className="text-[11px] text-slate-400 mt-1">يدعم PNG, JPG, WebP حتى 12 ميجابايت</p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رابط الصورة البديلة الجديد</label>
                  <input
                    type="url"
                    value={replaceNewImage}
                    onChange={e => setReplaceNewImage(e.target.value)}
                    placeholder="https://... أو رابط الصورة المباشر"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              )}

              {/* Preview replacement image */}
              {replaceNewImage && (
                <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-emerald-300 flex items-center justify-center shadow-inner">
                  <img src={replaceNewImage} alt="Replacement Preview" className="w-full h-full object-contain" />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold">
                    معاينة الصورة البديلة
                  </div>
                </div>
              )}

              {/* Submit / Cancel */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReplaceModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !replaceNewImage.trim()}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>تأكيد الاستبدال الفوري</span>
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
                        #{p.practicalNumber} {p.title}
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
      {deleteConfirmImage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-right">
              <img
                src={deleteConfirmImage.url}
                alt={deleteConfirmImage.title}
                className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-300"
              />
              <div className="overflow-hidden text-xs">
                <p className="font-bold text-slate-900 truncate">{deleteConfirmImage.title}</p>
                <p className="text-slate-400 text-[11px] truncate">{deleteConfirmImage.subject}</p>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900">تأكيد حذف الصورة نهائياً؟</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                سيتم حذف الصورة من التخزين وقاعدة بيانات Firestore وإزالتها فوراً لجميع الطلاب والمسؤولين.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmImage(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                تراجع
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleDeleteImage}
                className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
              >
                {isSaving && <RefreshCw className="w-3 h-3 animate-spin" />}
                <span>نعم، احذف فوراً</span>
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

export default AdminImagesTab;
