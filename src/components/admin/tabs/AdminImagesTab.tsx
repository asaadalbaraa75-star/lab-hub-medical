import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, CheckCircle2, AlertTriangle, Plus, Search, Filter, X } from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../firebase';

interface AdminImagesTabProps {
  currentUser: any;
}

// دالة ضغط الصور آلياً من الجوال لرفعها في ثانية واحدة
const compressImage = (file: File, maxWidth = 1000, quality = 0.7): Promise<Blob> => {
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

export const AdminImagesTab: React.FC<AdminImagesTabProps> = ({ currentUser }) => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // حقول إضافة صورة جديدة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('anatomy');
  const [lessonTitle, setLessonTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // الفلترة
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // جلب الصور بلمحة حية من السيرفر المركزي
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, 'images'),
      (snap) => {
        const list: any[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
        setImages(list);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching images:', err);
        setFeedback({ type: 'error', message: 'خطأ في جلب الصور من السيرفر: ' + err.message });
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('يرجى تحديد صورة من الجوال أولاً.');
      return;
    }

    if (!title.trim()) {
      alert('يرجى إدخال عنوان الصورة.');
      return;
    }

    setIsUploading(true);
    setFeedback(null);

    try {
      // 1. ضغط الصورة لتسريع الرفع
      const compressedBlob = await compressImage(selectedFile);

      // 2. رفع الصورة لـ Firebase Storage
      const fileName = `lab_hub_${Date.now()}_${selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      const uploadTask = await uploadBytes(storageRef, compressedBlob);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      // 3. حفظ بيانات الصورة في Firestore المباشر
      await addDoc(collection(db, 'images'), {
        title: title.trim(),
        subject,
        lessonTitle: lessonTitle.trim() || 'عام',
        url: downloadURL,
        storagePath: `gallery/${fileName}`,
        createdAt: serverTimestamp(),
        uploadedBy: currentUser?.name || 'Admin'
      });

      setFeedback({ type: 'success', message: 'تم رفع الصورة وحفظها بنجاح وستظهر للجميع فوراً!' });
      setIsModalOpen(false);
      setTitle('');
      setLessonTitle('');
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (err: any) {
      console.error('Upload Error:', err);
      alert('حدث خطأ أثناء الرفع: ' + (err.message || 'يرجى التحقق من الاتصال'));
      setFeedback({ type: 'error', message: 'فشل رفع الصورة: ' + err.message });
    } finally {
      // إجبار فك تعليق الزر مهما حدث
      setIsUploading(false);
    }
  };

  const handleDelete = async (img: any) => {
    if (!window.confirm('هل أنتِ متأكدة من حذف هذه الصورة؟')) return;

    try {
      if (img.storagePath) {
        const fileRef = ref(storage, img.storagePath);
        await deleteObject(fileRef).catch(() => {});
      }
      await deleteDoc(doc(db, 'images', img.id));
      setFeedback({ type: 'success', message: 'تم حذف الصورة بنجاح.' });
    } catch (err: any) {
      alert('خطأ أثناء الحذف: ' + err.message);
    }
  };

  const filteredImages = images.filter((img) => {
    if (filterSubject !== 'all' && img.subject !== filterSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return img.title?.toLowerCase().includes(q) || img.lessonTitle?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* الهيدر */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black text-slate-900">إدارة الصور والمخططات العملية</h1>
          <p className="text-xs text-slate-500">رفع وتعديل صور الدروس والسلايدات لجميع الطلاب</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة صورة جديدة</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold ${
            feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <span>{feedback.message}</span>
          <button type="button" onClick={() => setFeedback(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* شريط البحث والفلترة */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث باسم الصورة أو الدرس..."
          className="w-full md:flex-1 px-4 py-2 bg-slate-50 border rounded-xl text-xs"
        />
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="w-full md:w-44 px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
        >
          <option value="all">كل المواد (الكل)</option>
          <option value="anatomy">Anatomy</option>
          <option value="histology">Histology</option>
          <option value="biochemistry">Biochemistry</option>
        </select>
      </div>

      {/* العرض الشبكي للصور */}
      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-3xl border">
          <RefreshCw className="w-8 h-8 text-rose-500 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-bold">جاري تحميل معرض الصور من السيرفر...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border space-y-3">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500 font-bold">لا توجد صور مطابقة لفلتر البحث حالياً.</p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold inline-block"
          >
            + إضافة أول صورة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl border p-3 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 border relative group">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 truncate">{img.title}</h4>
                <p className="text-[10px] text-slate-400 truncate">{img.lessonTitle || 'عام'} • {img.subject}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(img)}
                className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف الصورة</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* نافذة رفع الصورة المنبثقة */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-black text-slate-900">إضافة صورة عملية جديدة</h3>
              <button type="button" onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">تحديد الصورة من الجوال *</label>
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-rose-200 hover:border-rose-500 rounded-2xl p-4 text-center cursor-pointer bg-rose-50/40"
                >
                  <Upload className="w-6 h-6 text-rose-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-900">اضغطي لاختيار صورة من الاستوديو</p>
                  {selectedFile && <p className="text-[10px] text-emerald-600 font-bold mt-1">المحدد: {selectedFile.name}</p>}
                </div>
              </div>

              {previewUrl && (
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1">اسم / عنوان الصورة *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: Kidney Tubules Histology"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">المادة *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-bold"
                  >
                    <option value="anatomy">Anatomy</option>
                    <option value="histology">Histology</option>
                    <option value="biochemistry">Biochemistry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">اسم الدرس / المعمل</label>
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="مثال: Epithelial Tissue"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl flex items-center gap-1 shadow-md"
                >
                  {isUploading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isUploading ? 'جاري الضغط والرفع...' : 'رفع الصورة للمنصة'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
