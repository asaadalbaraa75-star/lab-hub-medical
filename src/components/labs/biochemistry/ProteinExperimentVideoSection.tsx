import React, { useState, useEffect } from 'react';
import {
  Video,
  Play,
  ExternalLink,
  Edit3,
  RotateCcw,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '../../../utils/youtubeUtils';

export interface ProteinVideoData {
  testId: string;
  defaultEmbedUrl: string;
  titleEn: string;
  titleAr: string;
  duration: string;
  doctorName?: string;
  doctorTitle?: string;
  objectives: string[];
  highYieldPoints: string[];
}

export const PROTEIN_VIDEOS: Record<string, ProteinVideoData> = {
  test_biuret: {
    testId: 'test_biuret',
    defaultEmbedUrl: 'https://www.youtube.com/embed/xzbAlwXDgJs',
    titleEn: 'Biuret Test for Protein Identification & Peptide Bonds',
    titleAr: 'فيديو الشرح العملي: اختبار البيوريت للكشف عن البروتينات والروابط الببتيدية',
    duration: '05:10',
    doctorName: 'Faculty of Medical Biochemistry',
    doctorTitle: 'Medical Biochemistry & Clinical Pathology',
    objectives: [
      'Alkalinize protein sample using 10% NaOH solution',
      'Add dilute 0.5% copper sulfate dropwise and observe color coordination',
      'Understand the requirement of ≥ 2 peptide bonds to coordinate Cu²⁺ ions'
    ],
    highYieldPoints: [
      'Positive result: Royal Violet / Purple coordination complex',
      'Free amino acids and dipeptides give a negative result (lack adjacent peptide bonds)',
      'Excess copper sulfate must be avoided to prevent blue Cu(OH)₂ precipitation'
    ]
  },
  test_isoelectric: {
    testId: 'test_isoelectric',
    defaultEmbedUrl: 'https://www.youtube.com/embed/JpU4T1rR4sU',
    titleEn: 'Isoelectric Precipitation of Casein from Milk (pI Test)',
    titleAr: 'فيديو الشرح العملي: اختبار نقطة التعادل الكهربائي وترسيب الكازين',
    duration: '06:30',
    doctorName: 'Faculty of Medical Biochemistry',
    doctorTitle: 'Department of Clinical Chemistry',
    objectives: [
      'Titrate casein solution with dilute acetic acid towards its isoelectric point',
      'Observe flocculent curds forming at minimum electrostatic repulsion',
      'Identify green precipitate accumulation at the bottom of the tube'
    ],
    highYieldPoints: [
      'Casein isoelectric point ≈ pH 4.6–4.9 (Zwitterion state)',
      'Green precipitate settles at the bottom of the tube = Casein detected',
      'Zero net charge leads to minimum solubility and maximum precipitation'
    ]
  },
  test_heat_acetic: {
    testId: 'test_heat_acetic',
    defaultEmbedUrl: 'https://www.youtube.com/embed/WjZ5L5D2l_g',
    titleEn: 'Heat and Acetic Acid Coagulation Test for Albumin (Proteinuria)',
    titleAr: 'فيديو الشرح العملي: اختبار الحرارة وحمض الخليك للكشف عن الألبومين',
    duration: '04:45',
    doctorName: 'Clinical Pathology Unit',
    doctorTitle: 'Urinalysis & Laboratory Medicine',
    objectives: [
      'Induce thermal coagulation of urine albumin in boiling water bath (3 minutes)',
      'Add 3 drops of dilute acetic acid after cooling to room temperature',
      'Differentiate true protein coagulate from non-protein phosphate precipitates'
    ],
    highYieldPoints: [
      'Heating causes irreversible denaturation and coagulation of Albumin',
      'Phosphates dissolve in acetic acid; persistent coagulate = Albumin positive',
      'Essential bedside screening test for Nephrotic syndrome and clinical proteinuria'
    ]
  },
  test_hopkins_cole: {
    testId: 'test_hopkins_cole',
    defaultEmbedUrl: 'https://www.youtube.com/embed/Qc3iQk2qUeY',
    titleEn: 'Hopkins–Cole Test for Tryptophan & Indole Ring (Violet Ring Reaction)',
    titleAr: 'فيديو الشرح العملي: اختبار هوبكنز-كول للكشف عن التربتوفان وحلقة الإندول',
    duration: '05:20',
    doctorName: 'Faculty of Medical Biochemistry',
    doctorTitle: 'Practical Biochemistry Education',
    objectives: [
      'Mix unknown protein sample with Hopkins-Cole glyoxylic acid reagent',
      'Slowly add concentrated H₂SO₄ down the side of the inclined test tube',
      'Observe the emergence of a sharp violet/purple ring at the liquid interface'
    ],
    highYieldPoints: [
      'Condensation of indole ring with glyoxylic acid catalyzed by concentrated H₂SO₄',
      'Violet / purple ring at interface = Tryptophan present',
      'Peptone gives positive control; Gelatin gives negative control (lacks tryptophan)'
    ]
  }
};

interface ProteinExperimentVideoSectionProps {
  testId: string;
}

export const ProteinExperimentVideoSection: React.FC<ProteinExperimentVideoSectionProps> = ({
  testId
}) => {
  const videoConfig = PROTEIN_VIDEOS[testId] || PROTEIN_VIDEOS['test_biuret'];
  const storageKey = `protein_video_custom_url_${testId}`;

  const [videoUrl, setVideoUrl] = useState<string>(videoConfig.defaultEmbedUrl);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && saved.trim()) {
        setVideoUrl(saved.trim());
      } else {
        setVideoUrl(videoConfig.defaultEmbedUrl);
      }
    } catch {
      setVideoUrl(videoConfig.defaultEmbedUrl);
    }
    setHasError(false);
    setIsEditing(false);
  }, [testId, videoConfig.defaultEmbedUrl, storageKey]);

  // Convert raw URL to valid iframe embed URL
  const getCleanEmbedUrl = (raw: string): string => {
    if (!raw) return '';
    if (raw.includes('youtube.com/embed/')) return raw;
    const extractedId = extractYouTubeVideoId(raw);
    if (extractedId) {
      return `https://www.youtube.com/embed/${extractedId}`;
    }
    return raw;
  };

  const currentEmbedUrl = getCleanEmbedUrl(videoUrl);

  const handleSaveCustomUrl = () => {
    if (!customInput.trim()) return;
    const cleanUrl = getCleanEmbedUrl(customInput.trim());
    try {
      localStorage.setItem(storageKey, cleanUrl);
    } catch (e) {
      console.warn(e);
    }
    setVideoUrl(cleanUrl);
    setIsEditing(false);
    setHasError(false);
  };

  const handleResetDefault = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn(e);
    }
    setVideoUrl(videoConfig.defaultEmbedUrl);
    setCustomInput('');
    setIsEditing(false);
    setHasError(false);
  };

  return (
    <div
      className="bg-[#0B132B]/95 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 text-slate-100 transition-all"
      id={`protein-video-section-${testId}`}
    >
      {/* Top Banner Header: Doctor Explanation Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>🎥 DOCTOR PRACTICAL DEMONSTRATION • الشرح العملي المعتمد</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{videoConfig.duration}</span>
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
              {videoConfig.titleEn}
            </h4>
            <p className="text-xs text-amber-400 font-arabic font-medium">
              {videoConfig.titleAr}
            </p>
          </div>
        </div>

        {/* Video Actions & Edit Link */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => {
              setIsEditing(!isEditing);
              setCustomInput(videoUrl);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition"
            title="تعديل رابط الفيديو أو تحديثه"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>تعديل الرابط</span>
          </button>

          {videoUrl !== videoConfig.defaultEmbedUrl && (
            <button
              type="button"
              onClick={handleResetDefault}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-semibold transition"
              title="استعادة الفيديو الافتراضي"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة</span>
            </button>
          )}

          <a
            href={videoUrl.replace('/embed/', '/watch?v=')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 border border-slate-700 transition"
            title="فتح الفيديو على YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Optional Editor Form */}
      {isEditing && (
        <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
            <span>تحديث رابط فيديو شرح التجربة (YouTube Link or Embed):</span>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-white"
            >
              إلغاء
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... أو https://youtu.be/..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleSaveCustomUrl}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>حفظ</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            يقوم النظام تلقائياً بتحويل الرابط لصيغة التضمين المباشرة (Embed) وحفظها على جهازك لتشغيل الفيديو بدون أخطاء.
          </p>
        </div>
      )}

      {/* The Embedded YouTube Player */}
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-slate-800 relative group">
        {!hasError ? (
          <iframe
            src={currentEmbedUrl}
            title={videoConfig.titleEn}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onError={() => setHasError(true)}
            className="w-full h-full border-0"
          />
        ) : (
          /* Elegant Medical Fallback UI */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">فيديو التجربة قيد التحديث ومتاح للمشاهدة</h5>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                يمكنك فتح الفيديو مباشرة عبر رابط اليوتيوب الخارجي أو إدخال رابط معتمد بديل من جامعك.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={videoUrl.replace('/embed/', '/watch?v=')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>مشاهدة على YouTube</span>
              </a>
              <button
                type="button"
                onClick={() => setHasError(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructor info, Objectives & High-Yield Pearls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-bold uppercase font-mono tracking-wider text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Learning Objectives (أهداف التجربة العملية)</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            {videoConfig.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-indigo-400 shrink-0 font-bold">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-bold uppercase font-mono tracking-wider text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Yield Exam Pearls (نقاط الامتحان العملي)</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            {videoConfig.highYieldPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-400 shrink-0 font-bold">✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
