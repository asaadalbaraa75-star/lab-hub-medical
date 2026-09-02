import React, { useState, useEffect } from 'react';
import {
  Video,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Search,
  Filter,
  Play,
  RefreshCw,
  Sparkles,
  X,
  Eye
} from 'lucide-react';
import { EducationalVideo, EDUCATIONAL_VIDEOS } from '../../../data/educationalVideosData';
import { User, LabSubjectId } from '../../../types';

const STORAGE_CUSTOM_VIDEOS_KEY = 'labhub_custom_educational_videos_v3';

interface Props {
  currentUser: User;
}

export const AdminVideosTab: React.FC<Props> = ({ currentUser }) => {
  const [videos, setVideos] = useState<EducationalVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<EducationalVideo | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<EducationalVideo | null>(null);

  // Form fields
  const [formSubject, setFormSubject] = useState<'anatomy' | 'histology' | 'bacteriology' | 'biochemistry'>('anatomy');
  const [formTopic, setFormTopic] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formInstructor, setFormInstructor] = useState('');
  const [formYoutubeInput, setFormYoutubeInput] = useState('');
  const [formDuration, setFormDuration] = useState('15:00');
  const [formRelevance, setFormRelevance] = useState(95);
  const [formDescription, setFormDescription] = useState('');
  const [formObjectives, setFormObjectives] = useState('');

  // Extract clean 11-character YouTube video ID
  const extractYoutubeId = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?')) {
      return trimmed;
    }
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : trimmed;
  };

  const loadVideos = () => {
    try {
      const stored = localStorage.getItem(STORAGE_CUSTOM_VIDEOS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVideos(parsed);
          return;
        }
      }
    } catch {}
    setVideos(EDUCATIONAL_VIDEOS);
  };

  const saveVideosList = (newList: EducationalVideo[]) => {
    setVideos(newList);
    try {
      localStorage.setItem(STORAGE_CUSTOM_VIDEOS_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save custom videos to storage:', e);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const filteredVideos = videos.filter(v => {
    const matchesSubject = selectedSubject === 'all' || v.subject === selectedSubject;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      v.title.toLowerCase().includes(q) ||
      (v.titleAr && v.titleAr.toLowerCase().includes(q)) ||
      v.instructor.toLowerCase().includes(q) ||
      v.topic.toLowerCase().includes(q);
    return matchesSubject && matchesSearch;
  });

  const handleTogglePublish = (vid: EducationalVideo) => {
    const newStatus = vid.status === 'active' ? 'unavailable' : 'active';
    const updated = videos.map(v => (v.id === vid.id ? { ...v, status: newStatus as any } : v));
    saveVideosList(updated);
  };

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setFormSubject(selectedSubject === 'all' ? 'anatomy' : (selectedSubject as any));
    setFormTopic('Clinical & Surgical Anatomy');
    setFormTitle('');
    setFormTitleAr('');
    setFormInstructor('Faculty Medical Educator');
    setFormYoutubeInput('');
    setFormDuration('14:30');
    setFormRelevance(96);
    setFormDescription('');
    setFormObjectives('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (vid: EducationalVideo) => {
    setEditingVideo(vid);
    setFormSubject(vid.subject);
    setFormTopic(vid.topic || vid.topicName || '');
    setFormTitle(vid.title);
    setFormTitleAr(vid.titleAr || '');
    setFormInstructor(vid.instructor);
    setFormYoutubeInput(vid.youtubeVideoId || vid.youtubeId || '');
    setFormDuration(vid.duration || '15:00');
    setFormRelevance(vid.relevanceScore || 95);
    setFormDescription(vid.description || '');
    setFormObjectives(vid.learningObjectives ? vid.learningObjectives.join('\n') : '');
    setIsAddModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYoutubeId(formYoutubeInput);
    if (!ytId || ytId.length !== 11) {
      alert('الرجاء إدخال رابط يوتيوب صحيح أو كود فيديو صالح مكون من 11 خانة.');
      return;
    }

    const objectivesList = formObjectives
      .split('\n')
      .map(o => o.trim())
      .filter(Boolean);

    if (editingVideo) {
      const updated: EducationalVideo = {
        ...editingVideo,
        subject: formSubject,
        subjectId: formSubject,
        topic: formTopic.trim() || editingVideo.topic,
        topicName: formTopic.trim() || editingVideo.topicName,
        title: formTitle.trim(),
        titleAr: formTitleAr.trim() || undefined,
        instructor: formInstructor.trim() || 'Medical Faculty Instructor',
        youtubeVideoId: ytId,
        youtubeId: ytId,
        youtubeUrl: `https://www.youtube.com/watch?v=${ytId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`,
        duration: formDuration.trim() || '15:00',
        relevanceScore: formRelevance,
        description: formDescription.trim() || editingVideo.description,
        learningObjectives: objectivesList.length > 0 ? objectivesList : editingVideo.learningObjectives
      };
      const newList = videos.map(v => (v.id === editingVideo.id ? updated : v));
      saveVideosList(newList);
    } else {
      const newVideo: EducationalVideo = {
        id: `vid-${formSubject}-${Date.now().toString(36)}`,
        subject: formSubject,
        subjectId: formSubject,
        topicId: `topic_${Date.now()}`,
        topicName: formTopic.trim() || `${formSubject} Core Lesson`,
        topic: formTopic.trim() || `${formSubject} Core Lesson`,
        title: formTitle.trim(),
        titleAr: formTitleAr.trim() || undefined,
        instructor: formInstructor.trim() || 'Medical Faculty Instructor',
        instructorTitle: 'Academic Clinical Specialist',
        channelTitle: 'Academic Medical Review',
        youtubeVideoId: ytId,
        youtubeId: ytId,
        youtubeUrl: `https://www.youtube.com/watch?v=${ytId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`,
        duration: formDuration.trim() || '15:00',
        relevanceScore: formRelevance,
        status: 'active',
        source: 'Faculty Verified YouTube',
        description: formDescription.trim() || 'Comprehensive medical lecture linked directly to curriculum objectives.',
        learningObjectives: objectivesList.length > 0 ? objectivesList : ['Master core diagnostic landmarks.'],
        highYieldTakeaways: ['High-yield exam review point.'],
        chapters: []
      };
      saveVideosList([newVideo, ...videos]);
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    saveVideosList(updated);
    setDeleteConfirmId(null);
  };

  const extractedPreviewId = extractYoutubeId(formYoutubeInput);
  const isValidYtId = extractedPreviewId.length === 11;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Add Button */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-rose-600" />
            إدارة المحاضرات والفيديوهات التعليمية (Educational Video Management)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            إضافة فيديوهات يوتيوب موثقة، استبدال الروابط المعطلة، والتحقق من صحة المعرفات وربطها بالمواد
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة محاضرة يوتيوب جديدة (Add Video)</span>
        </button>
      </div>

      {/* Discipline Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-[#E2E8F0]">
        {[
          { id: 'all', label: 'جميع المحاضرات' },
          { id: 'anatomy', label: '🫀 التشريح (Anatomy)' },
          { id: 'histology', label: '🔬 الأنسجة (Histology)' },
          { id: 'bacteriology', label: '🧫 البكتيريا (Bacteriology)' },
          { id: 'biochemistry', label: '🧪 الكيمياء الحيوية (Biochemistry)' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedSubject(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedSubject === tab.id
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="البحث في الفيديوهات بالعنوان، الموضوع، أو اسم المحاضر..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pr-10 pl-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
      </div>

      {/* Videos List Cards / Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-slate-700">
          <span>المحاضرات التعليمية المتاحة ({filteredVideos.length})</span>
          <span className="text-[11px] text-slate-400 font-normal">يتم التحقق من المعرفات وربطها بالمقرر الأكاديمي</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3.5">المحاضرة (Video Title)</th>
                <th className="px-4 py-3.5">المادة والموضوع</th>
                <th className="px-4 py-3.5">المحاضر</th>
                <th className="px-4 py-3.5">المدة</th>
                <th className="px-4 py-3.5 text-center">حالة النشر</th>
                <th className="px-4 py-3.5 text-center">إجراءات الإدارة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredVideos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    لا توجد فيديوهات مسجلة في هذا القسم.
                  </td>
                </tr>
              ) : (
                filteredVideos.map(vid => {
                  const isActive = vid.status === 'active';
                  const ytId = vid.youtubeVideoId || vid.youtubeId;

                  return (
                    <tr key={vid.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                            <img
                              src={vid.thumbnailUrl || `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                              alt={vid.title}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setPreviewVideo(vid)}
                              className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/10 transition-colors"
                            >
                              <Play className="w-3.5 h-3.5 text-white fill-white" />
                            </button>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1">{vid.title}</div>
                            {vid.titleAr && (
                              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{vid.titleAr}</div>
                            )}
                            <div className="text-[10px] text-slate-400 font-mono">ID: {ytId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          vid.subject === 'anatomy' ? 'bg-indigo-50 text-indigo-700' :
                          vid.subject === 'histology' ? 'bg-emerald-50 text-emerald-700' :
                          vid.subject === 'bacteriology' ? 'bg-amber-50 text-amber-700' :
                          'bg-cyan-50 text-cyan-700'
                        }`}>
                          {vid.subject.toUpperCase()}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1 max-w-[140px] truncate">
                          {vid.topic || vid.topicName}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">
                        {vid.instructor}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-500">
                        {vid.duration}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {isActive ? 'نشط (Active)' : 'معطل / غير متاح'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* Toggle Active / Unavailable */}
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(vid)}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border transition-colors ${
                              isActive
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            }`}
                            title={isActive ? 'تعطيل الفيديو' : 'تفعيل الفيديو'}
                          >
                            {isActive ? 'تعطيل' : 'تفعيل'}
                          </button>

                          {/* Preview modal */}
                          <button
                            type="button"
                            onClick={() => setPreviewVideo(vid)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                            title="معاينة الفيديو"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit / Replace URL */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(vid)}
                            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                            title="تعديل الفيديو أو استبدال الرابط"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(vid.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                            title="حذف المحاضرة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 text-right my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingVideo ? 'تعديل محاضرة يوتيوب واستبدال الرابط' : 'إضافة محاضرة يوتيوب موثقة جديدة'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الفرع الأكاديمي (Subject)</label>
                  <select
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800"
                  >
                    <option value="anatomy">Anatomy (التشريح)</option>
                    <option value="histology">Histology (الأنسجة)</option>
                    <option value="bacteriology">Bacteriology (البكتيريا)</option>
                    <option value="biochemistry">Biochemistry (الكيمياء الحيوية)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الموضوع السريري (Topic)</label>
                  <input
                    type="text"
                    value={formTopic}
                    onChange={e => setFormTopic(e.target.value)}
                    placeholder="e.g. Cardiovascular & Heart"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* YouTube URL / ID Field with live validator */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  رابط يوتيوب أو معرف الفيديو المكون من 11 خانة (YouTube URL or 11-char ID) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={formYoutubeInput}
                    onChange={e => setFormYoutubeInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=heSsAreO_y0 or heSsAreO_y0"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                  />
                </div>

                {/* Live validation feedback */}
                {formYoutubeInput && (
                  <div className={`mt-2 p-2.5 rounded-xl border text-[11px] flex items-center justify-between ${
                    isValidYtId
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    <span>
                      {isValidYtId
                        ? `✓ تم استخراج المعرف بنجاح (${extractedPreviewId}) وجاهز للتضمين.`
                        : '⚠️ يرجى التأكد من صحة الرابط، معرف الفيديو يجب أن يتكون من 11 خانة.'}
                    </span>
                    {isValidYtId && (
                      <img
                        src={`https://img.youtube.com/vi/${extractedPreviewId}/mqdefault.jpg`}
                        alt="Thumbnail test"
                        className="w-12 h-7 object-cover rounded border border-emerald-300"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">عنوان المحاضرة (English Title) *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Cranial Nerves Dissection & Clinical Exam"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">العنوان بالعربية (Arabic Title)</label>
                  <input
                    type="text"
                    value={formTitleAr}
                    onChange={e => setFormTitleAr(e.target.value)}
                    placeholder="e.g. تشريح الأعصاب القحفية والفحص السريري"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المحاضر / القناة</label>
                  <input
                    type="text"
                    value={formInstructor}
                    onChange={e => setFormInstructor(e.target.value)}
                    placeholder="e.g. The Noted Anatomist"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">المدة (Duration)</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={e => setFormDuration(e.target.value)}
                    placeholder="e.g. 14:20"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">معدل الملاءمة (Relevance %)</label>
                  <input
                    type="number"
                    min={70}
                    max={100}
                    value={formRelevance}
                    onChange={e => setFormRelevance(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الأهداف التعليمية (سجل هدفاً في كل سطر)</label>
                <textarea
                  rows={2}
                  value={formObjectives}
                  onChange={e => setFormObjectives(e.target.value)}
                  placeholder="Demonstrate anatomic landmarks&#10;Identify foramina structures"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الوصف العام والأهمية السريرية</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Medical lecture review focusing on exam preparation..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors shadow-sm"
                >
                  حفظ المحاضرة ونشرها
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{previewVideo.title}</h3>
                <div className="text-xs text-slate-500">{previewVideo.instructor} • {previewVideo.subject.toUpperCase()}</div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-md">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${previewVideo.youtubeVideoId || previewVideo.youtubeId}?autoplay=1`}
                title={previewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 text-right">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              تأكيد حذف الفيديو
            </h3>
            <p className="text-xs text-slate-600">
              هل أنت متأكد من رغبتك في إزالة هذا الفيديو من المنصة بشكل دائم؟
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors"
              >
                نعم، احذف الفيديو
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
