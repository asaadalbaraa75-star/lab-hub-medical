import { ExamQuestion, MedicalExam, NotificationItem } from '../types';

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

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('API error falling back to local curriculum response:', err);
    return {
      answer: `### High-Yield Medical Note\n\nRegarding **"${payload.question}"**:\n\n1. **Core Concept:** In medical laboratory training, accurate structural identification forms the basis of diagnostic reasoning.\n2. **Identification Features:** Observe key anatomical landmarks, tissue layers, or reagent color changes shown in the current module.\n3. **Clinical / Practical Pearl:** High-yield for OSCE examinations — always correlate morphology with physiological function.\n\n*Reference: University Medical Laboratory Curriculum Board (2026).*`,
      source: 'offline-curriculum'
    };
  }
}

// --- Exams API ---
export async function apiFetchExams(): Promise<MedicalExam[]> {
  try {
    const res = await fetch('/api/exams');
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Could not fetch exams from API, using local storage:', e);
  }
  return [];
}

export async function apiSaveExam(exam: MedicalExam): Promise<boolean> {
  try {
    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exam)
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to save exam to API:', e);
    return false;
  }
}

export async function apiDeleteExam(examId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/exams/${examId}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    console.error('Failed to delete exam via API:', e);
    return false;
  }
}

// --- Question Bank API ---
export async function apiFetchQuestions(): Promise<ExamQuestion[]> {
  try {
    const res = await fetch('/api/questions');
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Could not fetch questions from API, using local storage:', e);
  }
  return [];
}

export async function apiSaveQuestion(question: ExamQuestion): Promise<boolean> {
  try {
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question)
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to save question to API:', e);
    return false;
  }
}

export async function apiDeleteQuestion(questionId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/questions/${questionId}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    console.error('Failed to delete question via API:', e);
    return false;
  }
}

export async function apiDuplicateQuestion(questionId: string): Promise<ExamQuestion | null> {
  try {
    const res = await fetch(`/api/questions/duplicate/${questionId}`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Failed to duplicate question via API:', e);
  }
  return null;
}

// --- Notifications API ---
export async function apiFetchNotifications(): Promise<NotificationItem[]> {
  try {
    const res = await fetch('/api/notifications');
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Could not fetch notifications from API:', e);
  }
  return [];
}

export async function apiCreateNotification(item: Omit<NotificationItem, 'id' | 'createdAt'>): Promise<NotificationItem | null> {
  try {
    const res = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Failed to create notification via API:', e);
  }
  return null;
}

// --- Video Manager API ---
export async function apiFetchVideos(): Promise<any[]> {
  try {
    const res = await fetch('/api/videos');
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Could not fetch videos from API:', e);
  }
  return [];
}

export async function apiSaveVideo(video: any): Promise<boolean> {
  try {
    const res = await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video)
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to save video via API:', e);
    return false;
  }
}

export async function apiBatchSaveVideos(videos: any[]): Promise<boolean> {
  try {
    const res = await fetch('/api/videos/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videos })
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to batch save videos via API:', e);
    return false;
  }
}

export async function apiDeleteVideo(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/videos/${videoId}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    console.error('Failed to delete video via API:', e);
    return false;
  }
}

export async function apiCheckVideoLink(youtubeId: string): Promise<{ isValid: boolean; status: string; message?: string; title?: string }> {
  try {
    const res = await fetch('/api/videos/check-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtubeId })
    });
    if (res.ok) return await res.json();
  } catch (e: any) {
    console.error('Failed to check video link via API:', e);
  }
  return { isValid: false, status: 'error', message: 'Network check failed' };
}

export const apiService = {
  askAiTutor: askLabHubTutor,
  askLabHubTutor,
  fetchExams: apiFetchExams,
  saveExam: apiSaveExam,
  deleteExam: apiDeleteExam,
  fetchQuestions: apiFetchQuestions,
  saveQuestion: apiSaveQuestion,
  deleteQuestion: apiDeleteQuestion,
  duplicateQuestion: apiDuplicateQuestion,
  fetchNotifications: apiFetchNotifications,
  createNotification: apiCreateNotification,
  fetchVideos: apiFetchVideos,
  saveVideo: apiSaveVideo,
  batchSaveVideos: apiBatchSaveVideos,
  deleteVideo: apiDeleteVideo,
  checkVideoLink: apiCheckVideoLink
};

