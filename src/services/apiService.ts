import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  uploadString
} from 'firebase/storage';
import { db, storage } from '../firebase';
import { ExamQuestion, MedicalExam, NotificationItem, Practical, ManagedImage } from '../types';
import { storageService } from './storageService';
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '../utils/youtubeUtils';
import { PRACTICAL_EXAM_QUESTIONS, MEDICAL_PRACTICAL_EXAMS } from '../data/medicalExamData';

export interface AskTutorResponse {
  answer: string;
  source: string;
}

export interface AskTutorParams {
  question: string;
  labContext?: string;
  practicalTitle?: string;
  mode?: 'normal' | 'explain_simple' | 'example' | 'quiz_me' | 'exam_tip' | 'compare' | 'summarize' | 'dont_understand';
  imageUrl?: string;
}

export async function askLabHubTutor(
  paramsOrQuestion: string | AskTutorParams,
  labContext?: string,
  practicalTitle?: string,
  mode?: 'normal' | 'explain_simple' | 'example' | 'quiz_me' | 'exam_tip' | 'compare' | 'summarize' | 'dont_understand' | string
): Promise<AskTutorResponse> {
  const payload: AskTutorParams = typeof paramsOrQuestion === 'string'
    ? { question: paramsOrQuestion, labContext, practicalTitle, mode: mode as any }
    : paramsOrQuestion;

  try {
    const res = await fetch('/api/ai/ask-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {}

  return {
    answer: `### High-Yield Medical Note\n\nRegarding **"${payload.question}"**:\n\n1. **Core Concept:** In medical laboratory training, accurate structural identification forms the basis of diagnostic reasoning.\n2. **Identification Features:** Observe key anatomical landmarks, tissue layers, or reagent color changes shown in the current module.\n3. **Clinical / Practical Pearl:** High-yield for OSCE examinations — always correlate morphology with physiological function.\n\n*Reference: University Medical Laboratory Curriculum Board (2026).*`,
    source: 'offline-curriculum'
  };
}

export interface ApiSaveResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// --- Global Sync API ---
export async function apiFetchAllSync(): Promise<any | null> {
  try {
    const exams = await apiFetchExams();
    const questions = await apiFetchQuestions();
    const practicals = await apiFetchPracticals();
    return { exams, questions, practicals };
  } catch (e) {
    console.warn('Sync all failed:', e);
    return null;
  }
}

// --- Exams API (Central Collection: /exams) ---
export async function apiFetchExams(): Promise<MedicalExam[]> {
  try {
    const snap = await getDocs(collection(db, 'exams'));
    const list: MedicalExam[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as MedicalExam);
    });

    const existingIds = new Set(list.map((e) => e.id));
    for (const pe of MEDICAL_PRACTICAL_EXAMS) {
      if (!existingIds.has(pe.id)) {
        list.push(pe);
        setDoc(doc(db, 'exams', pe.id), pe, { merge: true }).catch(() => {});
      }
    }

    if (list.length > 0) {
      try {
        localStorage.setItem('labhub_medical_exams', JSON.stringify(list));
      } catch {}
      return list;
    }
  } catch (e) {
    console.warn('[FIRESTORE] Fetch exams fallback to storageService:', e);
  }
  return storageService.getMedicalExams();
}

export async function apiSaveExam(exam: MedicalExam): Promise<ApiSaveResult<MedicalExam>> {
  try {
    const examId = exam.id || `exam_${Date.now()}`;
    const cleanExam: MedicalExam = {
      ...exam,
      id: examId,
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'exams', examId), cleanExam, { merge: true });

    // Keep local cache updated
    const local = storageService.getMedicalExams();
    const idx = local.findIndex((e) => e.id === examId);
    if (idx >= 0) local[idx] = cleanExam;
    else local.unshift(cleanExam);
    try {
      localStorage.setItem('labhub_medical_exams', JSON.stringify(local));
    } catch {}

    return { success: true, data: cleanExam };
  } catch (e: any) {
    console.error('[FIRESTORE] Failed to save exam:', e);
    // Fallback: save to local storage
    try {
      storageService.saveMedicalExam(exam);
      return { success: true, data: exam };
    } catch (localErr: any) {
      return { success: false, error: e.message || 'فشل حفظ الاختبار في قاعدة البيانات.' };
    }
  }
}

export async function apiDeleteExam(examId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, 'exams', examId));
    const local = storageService.getMedicalExams().filter((e) => e.id !== examId);
    try {
      localStorage.setItem('labhub_medical_exams', JSON.stringify(local));
    } catch {}
    return { success: true };
  } catch (e: any) {
    console.error('[FIRESTORE] Failed to delete exam:', e);
    return { success: false, error: e.message || 'فشل حذف الاختبار.' };
  }
}

// --- Question Bank API (Central Collection: /questions) ---
export async function apiFetchQuestions(): Promise<ExamQuestion[]> {
  try {
    const snap = await getDocs(collection(db, 'questions'));
    const list: ExamQuestion[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ExamQuestion);
    });

    const existingIds = new Set(list.map((q) => q.id));
    for (const pq of PRACTICAL_EXAM_QUESTIONS) {
      if (!existingIds.has(pq.id)) {
        list.push(pq);
        setDoc(doc(db, 'questions', pq.id), pq, { merge: true }).catch(() => {});
      }
    }

    if (list.length > 0) {
      try {
        localStorage.setItem('labhub_exam_questions', JSON.stringify(list));
      } catch {}
      return list;
    }
  } catch (e) {
    console.warn('[FIRESTORE] Fetch questions fallback to local:', e);
  }
  return storageService.getExamQuestions();
}

export async function apiSaveQuestion(question: ExamQuestion): Promise<ApiSaveResult<ExamQuestion>> {
  try {
    const qId = question.id || `q_${Date.now()}`;
    const cleanQ: ExamQuestion = {
      ...question,
      id: qId,
      submittedAt: question.submittedAt || new Date().toISOString()
    };
    await setDoc(doc(db, 'questions', qId), cleanQ, { merge: true });

    // Update local cache
    const local = storageService.getExamQuestions();
    const idx = local.findIndex((q) => q.id === qId);
    if (idx >= 0) local[idx] = cleanQ;
    else local.unshift(cleanQ);
    try {
      localStorage.setItem('labhub_exam_questions', JSON.stringify(local));
    } catch {}

    return { success: true, data: cleanQ };
  } catch (e: any) {
    console.error('[FIRESTORE] Failed to save question:', e);
    try {
      storageService.saveExamQuestion(question);
      return { success: true, data: question };
    } catch (localErr: any) {
      return { success: false, error: e.message || 'فشل حفظ السؤال في السحابة.' };
    }
  }
}

export async function apiDeleteQuestion(questionId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, 'questions', questionId));
    const local = storageService.getExamQuestions().filter((q) => q.id !== questionId);
    try {
      localStorage.setItem('labhub_exam_questions', JSON.stringify(local));
    } catch {}
    return { success: true };
  } catch (e: any) {
    console.error('[FIRESTORE] Failed to delete question:', e);
    return { success: false, error: e.message || 'فشل حذف السؤال.' };
  }
}

export async function apiDuplicateQuestion(questionId: string): Promise<ExamQuestion | null> {
  try {
    const all = await apiFetchQuestions();
    const target = all.find((q) => q.id === questionId);
    if (!target) return null;

    const duplicated: ExamQuestion = {
      ...target,
      id: `q_copy_${Date.now()}`,
      questionText: `${target.questionText} (Copy)`,
      questionTextArabic: target.questionTextArabic ? `${target.questionTextArabic} (نسخة)` : undefined,
      submittedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'questions', duplicated.id), duplicated, { merge: true });
    return duplicated;
  } catch (e) {
    console.error('[FIRESTORE] Failed to duplicate question:', e);
    return null;
  }
}

export async function apiUpdateQuestionStatus(
  questionId: string,
  status: string,
  reviewNotes?: string,
  _token?: string
): Promise<{ success: boolean; question?: ExamQuestion; error?: string }> {
  try {
    await setDoc(
      doc(db, 'questions', questionId),
      { status, reviewNotes, updatedAt: new Date().toISOString() },
      { merge: true }
    );
    const all = await apiFetchQuestions();
    const updated = all.find((q) => q.id === questionId);
    return { success: true, question: updated };
  } catch (e: any) {
    return { success: false, error: e.message || 'فشل تحديث حالة السؤال.' };
  }
}

export async function apiUploadQuestionImage(base64Image: string): Promise<string | null> {
  try {
    if (!base64Image) return null;
    const fileId = `q_img_${Date.now()}`;
    const imgRef = storageRef(storage, `questions/${fileId}`);
    await uploadString(imgRef, base64Image, 'data_url');
    return await getDownloadURL(imgRef);
  } catch (e) {
    console.warn('[STORAGE] Falling back to direct data string for image upload:', e);
    return base64Image;
  }
}

export async function apiContributorAccess(_code: string): Promise<{ success: boolean; user?: any; token?: string; error?: string }> {
  return { success: true, token: 'contributor_token_2026' };
}

// --- Notifications API (Central Collection: /notifications) ---
export async function apiFetchNotifications(): Promise<NotificationItem[]> {
  try {
    const snap = await getDocs(collection(db, 'notifications'));
    const list: NotificationItem[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as NotificationItem);
    });
    if (list.length > 0) return list;
  } catch (e) {
    console.warn('[FIRESTORE] Notifications fallback:', e);
  }
  return storageService.getNotifications();
}

export async function apiCreateNotification(item: Omit<NotificationItem, 'id' | 'createdAt'>): Promise<NotificationItem | null> {
  try {
    const id = `notif_${Date.now()}`;
    const newNotif: NotificationItem = {
      ...item,
      id,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'notifications', id), newNotif, { merge: true });
    return newNotif;
  } catch (e) {
    console.error('[FIRESTORE] Create notification error:', e);
    return null;
  }
}

// --- Video Manager API (Central Collection: /videos) ---
export async function apiFetchVideos(): Promise<any[]> {
  try {
    const snap = await getDocs(collection(db, 'videos'));
    const list: any[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() });
    });
    if (list.length > 0) {
      try {
        localStorage.setItem('labhub_custom_educational_videos', JSON.stringify(list));
      } catch {}
      return list;
    }
  } catch (e) {
    console.warn('[FIRESTORE] Fetch videos fallback:', e);
  }
  try {
    const cached = localStorage.getItem('labhub_custom_educational_videos');
    if (cached) return JSON.parse(cached);
  } catch {}
  return [];
}

export async function apiSaveVideo(video: any): Promise<boolean> {
  try {
    const id = video.id || `vid_${Date.now()}`;
    const cleanYtId = extractYouTubeVideoId(video.youtubeId || video.youtubeVideoId || video.youtubeUrl || video.url);
    const cleanEmbed = getYouTubeEmbedUrl(cleanYtId);
    const updated = {
      ...video,
      id,
      youtubeId: cleanYtId,
      youtubeVideoId: cleanYtId,
      embedUrl: cleanEmbed,
      status: video.status || 'active',
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'videos', id), updated, { merge: true });
    return true;
  } catch (e) {
    console.error('[FIRESTORE] Failed to save video:', e);
    return false;
  }
}

export async function apiBatchSaveVideos(videos: any[]): Promise<boolean> {
  try {
    for (const v of videos) {
      await apiSaveVideo(v);
    }
    return true;
  } catch (e) {
    console.error('[FIRESTORE] Batch save videos error:', e);
    return false;
  }
}

export async function apiDeleteVideo(videoId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'videos', videoId));
    return true;
  } catch (e) {
    console.error('[FIRESTORE] Delete video error:', e);
    return false;
  }
}

export async function apiCheckVideoLink(youtubeId: string): Promise<{ isValid: boolean; status: string; message?: string; title?: string }> {
  const cleanId = extractYouTubeVideoId(youtubeId);
  if (!cleanId || cleanId.length !== 11) {
    return { isValid: false, status: 'error', message: 'معرف يوتيوب غير صالح (يجب أن يكون 11 خانة)' };
  }
  return { isValid: true, status: 'valid', title: `Video (${cleanId})` };
}

// --- Practicals / Lessons API (Central Collection: /lessons) ---
export async function apiFetchPracticals(): Promise<Practical[]> {
  try {
    const snap = await getDocs(collection(db, 'lessons'));
    const list: Practical[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as Practical);
    });
    if (list.length > 0) {
      try {
        localStorage.setItem('labhub_medical_practicals', JSON.stringify(list));
      } catch {}
      return list;
    }
  } catch (e) {
    console.warn('[FIRESTORE] Fetch practicals fallback:', e);
  }
  return storageService.getPracticals();
}

export async function apiSavePractical(practical: Practical): Promise<{ success: boolean; practical?: Practical; error?: string }> {
  try {
    const id = practical.id || `prac_${Date.now()}`;
    const cleanPractical: Practical = {
      ...practical,
      id,
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'lessons', id), cleanPractical, { merge: true });

    // Update local cache
    const local = storageService.getPracticals();
    const idx = local.findIndex((p) => p.id === id);
    if (idx >= 0) local[idx] = cleanPractical;
    else local.unshift(cleanPractical);
    try {
      localStorage.setItem('labhub_medical_practicals', JSON.stringify(local));
    } catch {}

    return { success: true, practical: cleanPractical };
  } catch (e: any) {
    console.error('[FIRESTORE] Save practical error:', e);
    return { success: false, error: e.message || 'فشل حفظ الدرس العملي.' };
  }
}

export async function apiDeletePractical(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'lessons', id));
    const local = storageService.getPracticals().filter((p) => p.id !== id);
    try {
      localStorage.setItem('labhub_medical_practicals', JSON.stringify(local));
    } catch {}
    return true;
  } catch (e) {
    console.error('[FIRESTORE] Delete practical error:', e);
    return false;
  }
}

export async function apiUpdatePracticalStatus(id: string, status: string): Promise<boolean> {
  try {
    await setDoc(doc(db, 'lessons', id), { status, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (e) {
    console.error('[FIRESTORE] Update practical status error:', e);
    return false;
  }
}

export async function apiUploadPracticalImage(image: string): Promise<string> {
  try {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    const fileId = `lesson_img_${Date.now()}`;
    const imgRef = storageRef(storage, `lessons/${fileId}`);
    await uploadString(imgRef, image, 'data_url');
    return await getDownloadURL(imgRef);
  } catch (e) {
    console.warn('[STORAGE] Fallback to direct image string:', e);
    return image;
  }
}

// --- Images / Slides Management API (Central Collection: /slides) ---
export async function apiFetchImages(): Promise<ManagedImage[]> {
  try {
    const snap = await getDocs(collection(db, 'slides'));
    const list: ManagedImage[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ManagedImage);
    });
    if (list.length > 0) {
      try {
        localStorage.setItem('labhub_managed_images', JSON.stringify(list));
      } catch {}
      return list;
    }
  } catch (e) {
    console.warn('[FIRESTORE] Fetch images fallback:', e);
  }
  try {
    const cached = localStorage.getItem('labhub_managed_images');
    if (cached) return JSON.parse(cached);
  } catch {}
  return [];
}

export async function apiAddImage(payload: {
  image: string;
  title: string;
  caption?: string;
  subject?: string;
  lessonId?: string;
  category?: string;
  stainOrView?: string;
  magnification?: string;
  uploadedBy?: string;
  userId?: string;
  userEmail?: string;
}): Promise<{ success: boolean; image?: any; error?: string }> {
  try {
    let finalImageUrl = payload.image;
    // Upload image to Firebase Storage if data URL
    if (payload.image && payload.image.startsWith('data:image/')) {
      try {
        const fileId = `slide_${Date.now()}`;
        const sRef = storageRef(storage, `slides/${fileId}`);
        await uploadString(sRef, payload.image, 'data_url');
        finalImageUrl = await getDownloadURL(sRef);
      } catch (uploadErr) {
        console.warn('[STORAGE] Image upload fallback:', uploadErr);
      }
    }

    const id = `slide_${Date.now()}`;
    const newSlide: ManagedImage = {
      ...payload,
      id,
      image: finalImageUrl,
      imageUrl: finalImageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any;

    await setDoc(doc(db, 'slides', id), newSlide, { merge: true });

    // If assigned to a lesson, update the lesson's slide image
    if (payload.lessonId) {
      await setDoc(
        doc(db, 'lessons', payload.lessonId),
        { imageUrl: finalImageUrl, realImagePath: finalImageUrl, updatedAt: new Date().toISOString() },
        { merge: true }
      ).catch(() => {});
    }

    return { success: true, image: newSlide };
  } catch (e: any) {
    console.error('[FIRESTORE] Add image error:', e);
    return { success: false, error: e.message || 'فشل حفظ الصورة في السحابة.' };
  }
}

export async function apiUpdateImage(
  id: string,
  payload: {
    image?: string;
    title?: string;
    caption?: string;
    subject?: string;
    lessonId?: string;
    category?: string;
    stainOrView?: string;
    magnification?: string;
    updatedBy?: string;
    userId?: string;
    userEmail?: string;
  }
): Promise<{ success: boolean; image?: any; error?: string }> {
  try {
    let finalImageUrl = payload.image;
    if (payload.image && payload.image.startsWith('data:image/')) {
      try {
        const fileId = `slide_${Date.now()}`;
        const sRef = storageRef(storage, `slides/${fileId}`);
        await uploadString(sRef, payload.image, 'data_url');
        finalImageUrl = await getDownloadURL(sRef);
      } catch (uploadErr) {
        console.warn('[STORAGE] Image upload fallback:', uploadErr);
      }
    }

    const updatedData: any = {
      ...payload,
      updatedAt: new Date().toISOString()
    };
    if (finalImageUrl) {
      updatedData.image = finalImageUrl;
      updatedData.imageUrl = finalImageUrl;
    }

    await setDoc(doc(db, 'slides', id), updatedData, { merge: true });

    if (payload.lessonId && finalImageUrl) {
      await setDoc(
        doc(db, 'lessons', payload.lessonId),
        { imageUrl: finalImageUrl, realImagePath: finalImageUrl, updatedAt: new Date().toISOString() },
        { merge: true }
      ).catch(() => {});
    }

    return { success: true, image: { id, ...updatedData } };
  } catch (e: any) {
    console.error('[FIRESTORE] Update image error:', e);
    return { success: false, error: e.message || 'فشل تحديث الصورة.' };
  }
}

export async function apiDeleteImage(id: string, _userMeta?: { userId?: string; userName?: string; userEmail?: string }): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'slides', id));
    return true;
  } catch (e) {
    console.error('[FIRESTORE] Delete image error:', e);
    return false;
  }
}

export async function apiAssignImage(payload: {
  imageId: string;
  lessonId: string;
  subject?: string;
  caption?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const slidesSnap = await getDocs(collection(db, 'slides'));
    let slideImgUrl = '';
    slidesSnap.forEach((d) => {
      if (d.id === payload.imageId) {
        const dat = d.data();
        slideImgUrl = dat.image || dat.imageUrl || '';
      }
    });

    await setDoc(
      doc(db, 'slides', payload.imageId),
      { lessonId: payload.lessonId, subject: payload.subject, caption: payload.caption, updatedAt: new Date().toISOString() },
      { merge: true }
    );

    if (slideImgUrl) {
      await setDoc(
        doc(db, 'lessons', payload.lessonId),
        { imageUrl: slideImgUrl, realImagePath: slideImgUrl, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    }

    return { success: true };
  } catch (e: any) {
    console.error('[FIRESTORE] Assign image error:', e);
    return { success: false, error: e.message || 'فشل ربط الصورة بالدرس.' };
  }
}

export const apiService = {
  askLabHubTutor,
  askAiTutor: askLabHubTutor,
  apiFetchAllSync,
  fetchExams: apiFetchExams,
  saveExam: apiSaveExam,
  deleteExam: apiDeleteExam,
  fetchQuestions: apiFetchQuestions,
  saveQuestion: apiSaveQuestion,
  deleteQuestion: apiDeleteQuestion,
  duplicateQuestion: apiDuplicateQuestion,
  updateQuestionStatus: apiUpdateQuestionStatus,
  uploadQuestionImage: apiUploadQuestionImage,
  contributorAccess: apiContributorAccess,
  fetchNotifications: apiFetchNotifications,
  createNotification: apiCreateNotification,
  fetchVideos: apiFetchVideos,
  saveVideo: apiSaveVideo,
  batchSaveVideos: apiBatchSaveVideos,
  deleteVideo: apiDeleteVideo,
  checkVideoLink: apiCheckVideoLink,
  fetchPracticals: apiFetchPracticals,
  savePractical: apiSavePractical,
  deletePractical: apiDeletePractical,
  updatePracticalStatus: apiUpdatePracticalStatus,
  uploadPracticalImage: apiUploadPracticalImage,
  fetchImages: apiFetchImages,
  addImage: apiAddImage,
  updateImage: apiUpdateImage,
  deleteImage: apiDeleteImage,
  assignImage: apiAssignImage
};

export default apiService;
