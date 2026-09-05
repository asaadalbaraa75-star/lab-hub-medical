import React, { useState } from 'react';
import {
  ChevronLeft,
  Info,
  Tag,
  Eye,
  EyeOff,
  HelpCircle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  CheckCircle2,
  Share2,
  Stethoscope,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { MEDICAL_ASSETS } from '../../../assets/medicalImages';

interface MuscleData {
  id: string;
  region: string;
  regionAr: string;
  nameEn: string;
  nameAr: string;
  latinName: string;
  origin: string[];
  insertion: string[];
  action: string[];
  actionAr: string;
  innervation: string;
  bloodSupply: string;
  clinicalPoint: string;
  examTrap: string;
  labels: {
    title: string;
    description: string;
    x: number; // percentage
    y: number; // percentage
  }[];
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const MUSCLE_DATABASE: Record<string, MuscleData> = {
  biceps_brachii: {
    id: 'biceps_brachii',
    region: 'Muscles of the Upper Limb',
    regionAr: 'عضلات الطرف العلوي • العضد',
    nameEn: 'Biceps Brachii',
    nameAr: 'العضلة ذات الرأسين العضدية',
    latinName: 'Musculus biceps brachii',
    origin: [
      'Short Head: Apex of Coracoid process of scapula',
      'Long Head: Supraglenoid tubercle of scapula'
    ],
    insertion: [
      'Radial tuberosity of radius',
      'Bicipital aponeurosis into deep fascia of medial forearm'
    ],
    action: [
      'Powerful supinator of forearm (especially when elbow is flexed)',
      'Flexor of elbow joint',
      'Weak flexor of shoulder joint'
    ],
    actionAr: 'الباسطة القوية للساعد (Supinator) خاصة عند ثني المرفق، وثني مفصل المرفق.',
    innervation: 'Musculocutaneous Nerve (C5, C6)',
    bloodSupply: 'Brachial Artery branches',
    clinicalPoint: 'Biceps Tendon Reflex tests spinal cord segments C5 and C6. Rupture of long head tendon leads to characteristic "Popeye muscle" deformity.',
    examTrap: 'Students often forget that Biceps Brachii is the primary SUPINATOR of the forearm, not just a flexor!',
    labels: [
      {
        title: 'Origin (Short Head)',
        description: 'Coracoid process of scapula',
        x: 25,
        y: 20
      },
      {
        title: 'Origin (Long Head)',
        description: 'Supraglenoid tubercle of scapula',
        x: 22,
        y: 36
      },
      {
        title: 'Insertion',
        description: 'Radial tuberosity of radius',
        x: 25,
        y: 68
      }
    ],
    quickQuiz: {
      question: 'Which nerve innervates the Biceps Brachii muscle?',
      options: ['Musculocutaneous nerve', 'Radial nerve', 'Median nerve', 'Axillary nerve'],
      correctIndex: 0,
      explanation: 'Musculocutaneous nerve (C5, C6) pierces coracobrachialis and innervates all three anterior arm muscles (biceps, coracobrachialis, brachialis).'
    }
  },
  deltoid: {
    id: 'deltoid',
    region: 'Muscles of the Shoulder Girdle',
    regionAr: 'عضلات زنار الكتف',
    nameEn: 'Deltoid',
    nameAr: 'العضلة الدالية',
    latinName: 'Musculus deltoideus',
    origin: [
      'Anterior (Clavicular): Lateral 1/3 of clavicle',
      'Middle (Acromial): Acromion process',
      'Posterior (Spinal): Spine of scapula'
    ],
    insertion: ['Deltoid tuberosity on lateral aspect of humerus'],
    action: [
      'Multipennate Middle fibers: Powerful Abduction of arm (15° to 90°)',
      'Anterior fibers: Flexion & medial rotation',
      'Posterior fibers: Extension & lateral rotation'
    ],
    actionAr: 'إبعاد الذراع من 15 إلى 90 درجة (Multipennate acromial fibers).',
    innervation: 'Axillary Nerve (C5, C6)',
    bloodSupply: 'Posterior circumflex humeral artery',
    clinicalPoint: 'Axillary nerve injury (common in surgical neck of humerus fractures) paralyzes deltoid, causing loss of rounded shoulder contour.',
    examTrap: 'Supraspinatus initiates abduction (0-15°); Deltoid takes over from 15° to 90°!',
    labels: [
      {
        title: 'Acromial Origin',
        description: 'Multipennate powerful fibers',
        x: 30,
        y: 22
      },
      {
        title: 'Deltoid Tuberosity',
        description: 'Midshaft humerus insertion',
        x: 32,
        y: 65
      }
    ],
    quickQuiz: {
      question: 'Which muscle initiates abduction of the shoulder for the first 15 degrees?',
      options: ['Supraspinatus', 'Deltoid', 'Infraspinatus', 'Teres minor'],
      correctIndex: 0,
      explanation: 'Supraspinatus initiates abduction (0-15°); Deltoid conducts abduction from 15° to 90°.'
    }
  },
  quadriceps: {
    id: 'quadriceps',
    region: 'Muscles of the Anterior Thigh',
    regionAr: 'عضلات الفخذ الأمامية',
    nameEn: 'Quadriceps Femoris',
    nameAr: 'العضلة رباعية الرؤوس الفخذية',
    latinName: 'Musculus quadriceps femoris',
    origin: [
      'Rectus Femoris: Anterior inferior iliac spine (AIIS)',
      'Vastus Lateralis, Medialis, Intermedius: Femoral shaft'
    ],
    insertion: ['Tibial tuberosity via Patellar Ligament'],
    action: ['Great extensor of the knee joint', 'Rectus femoris also assists in hip flexion'],
    actionAr: 'الباسطة الرئيسية لمفصل الركبة.',
    innervation: 'Femoral Nerve (L2, L3, L4)',
    bloodSupply: 'Profunda femoris artery branches',
    clinicalPoint: 'Patellar tendon reflex (knee jerk) evaluates integrity of femoral nerve and L2-L4 spinal cord segments.',
    examTrap: 'Vastus medialis oblique (VMO) fibers are critical for preventing lateral dislocation of the patella!',
    labels: [
      {
        title: 'Origin (AIIS)',
        description: 'Rectus femoris head',
        x: 28,
        y: 20
      },
      {
        title: 'Insertion',
        description: 'Tibial tuberosity via patella',
        x: 30,
        y: 75
      }
    ],
    quickQuiz: {
      question: 'What is the root value for the Patellar (Knee Jerk) tendon reflex?',
      options: ['L2, L3, L4', 'L5, S1', 'C5, C6', 'S1, S2'],
      correctIndex: 0,
      explanation: 'Knee jerk reflex tests Femoral nerve and spinal segments L2, L3, L4 (Predominantly L3, L4).'
    }
  }
};

interface AnatomyInteractive3DViewerProps {
  initialMuscleId?: string;
  onBack?: () => void;
  onOpenQuiz?: () => void;
}

export const AnatomyInteractive3DViewer: React.FC<AnatomyInteractive3DViewerProps> = ({
  initialMuscleId = 'biceps_brachii',
  onBack,
  onOpenQuiz
}) => {
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>(initialMuscleId);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(false);

  const muscle = MUSCLE_DATABASE[selectedMuscleId] || MUSCLE_DATABASE.biceps_brachii;

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(0.8, prev + delta), 1.8));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setRotationAngle(0);
    setIsIsolated(false);
    setShowLabels(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300 select-none pb-12" id="anatomy-interactive-3d-viewer">
      {/* Top Header Bar (Matching Reference Screenshot) */}
      <div className="flex items-center justify-between p-3.5 px-4 rounded-2xl bg-[#090D1A]/90 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="text-[11px] text-purple-400 font-medium">Anatomy</div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
              {muscle.nameEn}
              <span className="text-xs text-slate-400 font-sans hidden sm:inline">({muscle.nameAr})</span>
            </h2>
          </div>
        </div>

        {/* Muscle Selector Dropdown & Quick Info */}
        <div className="flex items-center gap-2">
          <select
            value={selectedMuscleId}
            onChange={e => {
              setSelectedMuscleId(e.target.value);
              setSelectedOption(null);
              setHasSubmittedQuiz(false);
            }}
            className="bg-[#0F172A] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-purple-500"
          >
            <option value="biceps_brachii">Biceps Brachii (Arm)</option>
            <option value="deltoid">Deltoid (Shoulder)</option>
            <option value="quadriceps">Quadriceps Femoris (Thigh)</option>
          </select>

          <button
            onClick={() => setShowInfoModal(true)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Muscle Information"
          >
            <Info className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Container (Matching Reference Top-Right Screen) */}
      <div className="relative w-full h-[580px] sm:h-[640px] rounded-3xl bg-gradient-to-b from-[#0B1124] via-[#070B16] to-[#04070F] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute -top-20 right-10 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl" />

        {/* Top Breadcrumb Overlay */}
        <div className="relative z-10">
          <div className="text-xs text-slate-400 font-medium">{muscle.region}</div>
          <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {muscle.nameEn}
            <span className="text-xs font-mono text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-500/30">
              {muscle.latinName}
            </span>
          </div>
        </div>

        {/* Center 3D Stage with Interactive Render & Callout Labels */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-2">
          {/* Main Visual Image with Zoom & Rotation */}
          <div
            className="relative transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing max-h-[460px]"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`
            }}
          >
            <img
              src={MEDICAL_ASSETS.bicepsBrachiiMuscle}
              alt={muscle.nameEn}
              className={`max-h-[420px] object-contain rounded-2xl filter drop-shadow(0 0 35px rgba(168,85,247,0.3)) transition-opacity duration-300 ${
                isIsolated ? 'brightness-110 contrast-125' : 'brightness-100'
              }`}
            />

            {/* Interactive Callout Labels (Matching Reference Screenshot) */}
            {showLabels &&
              muscle.labels.map((lbl, idx) => (
                <div
                  key={idx}
                  className="absolute pointer-events-auto transition-all animate-in fade-in duration-300"
                  style={{ top: `${lbl.y}%`, left: `${lbl.x}%` }}
                >
                  {/* Glowing Connection Line & Dot */}
                  <div className="relative group">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] border-2 border-white animate-pulse" />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#090D1A]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-3 py-1.5 shadow-2xl whitespace-nowrap min-w-[140px]">
                      <div className="text-[11px] font-bold text-cyan-300 tracking-tight">{lbl.title}</div>
                      <div className="text-[10px] text-slate-300 font-medium">{lbl.description}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Floating Action Sidebar on the Right (Info, Labels, Hide, Quiz) */}
          <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
            <button
              onClick={() => setShowInfoModal(true)}
              className="flex flex-col items-center justify-center w-11 h-11 rounded-2xl bg-[#090D1A]/90 hover:bg-purple-950/80 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all shadow-xl group"
              title="Clinical Info"
            >
              <Info className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] text-slate-400 mt-0.5">Info</span>
            </button>

            <button
              onClick={() => setShowLabels(prev => !prev)}
              className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl border transition-all shadow-xl group ${
                showLabels
                  ? 'bg-purple-950/80 border-purple-500/60 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#090D1A]/90 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle Anatomical Labels"
            >
              <Tag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] mt-0.5">Labels</span>
            </button>

            <button
              onClick={() => setIsIsolated(prev => !prev)}
              className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl border transition-all shadow-xl group ${
                isIsolated
                  ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-[#090D1A]/90 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Isolate Muscle"
            >
              {isIsolated ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-[9px] mt-0.5">Hide</span>
            </button>

            <button
              onClick={() => setShowQuizModal(true)}
              className="flex flex-col items-center justify-center w-11 h-11 rounded-2xl bg-[#090D1A]/90 hover:bg-amber-950/80 border border-white/10 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 transition-all shadow-xl group"
              title="Spotter Quiz"
            >
              <HelpCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] text-amber-300 mt-0.5">Quiz</span>
            </button>
          </div>
        </div>

        {/* Bottom Floating Control Bar (Rotate, Zoom, Select, AR / Reset) */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 bg-[#070B14]/80 backdrop-blur-md rounded-2xl p-2.5 px-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRotationAngle(prev => prev - 15)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
              <span>Rotate</span>
            </button>

            <button
              onClick={() => handleZoom(0.15)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleZoom(-0.15)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-cyan-300 hover:text-white transition-colors"
            >
              Reset
            </button>

            <button
              onClick={() => setShowInfoModal(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              View Origin & Insertion
            </button>
          </div>
        </div>
      </div>

      {/* Info & Clinical Details Modal Drawer */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#090D1A] border border-purple-500/40 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">Gray's Anatomy Atlas</span>
                <h3 className="text-lg font-extrabold text-white">{muscle.nameEn} ({muscle.nameAr})</h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="font-bold text-cyan-300">Anatomical Origin (الأصل)</span>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {muscle.origin.map((org, i) => (
                    <li key={i}>{org}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="font-bold text-purple-300">Insertion (الارتكاز)</span>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {muscle.insertion.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-emerald-300">Primary Actions (الوظائف الحركية)</span>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                {muscle.action.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
              <p className="text-slate-400 text-[11px] font-sans pt-1">{muscle.actionAr}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                <span className="font-bold text-purple-300">Nerve Supply</span>
                <p className="text-slate-200">{muscle.innervation}</p>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                <span className="font-bold text-cyan-300">Arterial Supply</span>
                <p className="text-slate-200">{muscle.bloodSupply}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Stethoscope className="w-4 h-4 text-amber-400" />
                <span>Clinical & Exam High-Yield</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{muscle.clinicalPoint}</p>
              <p className="text-amber-300/90 text-[11px] font-semibold pt-1">⚠️ {muscle.examTrap}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090D1A] border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Anatomy Spotter MCQ</h3>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-200">
              {muscle.quickQuiz.question}
            </p>

            <div className="space-y-2">
              {muscle.quickQuiz.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === muscle.quickQuiz.correctIndex;
                let btnStyle = 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300';
                if (hasSubmittedQuiz) {
                  if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
                  else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                } else if (isSelected) {
                  btnStyle = 'bg-purple-950/80 border-purple-500 text-purple-300';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!hasSubmittedQuiz) setSelectedOption(idx);
                    }}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasSubmittedQuiz && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {hasSubmittedQuiz && (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs text-slate-200">
                <strong>Explanation:</strong> {muscle.quickQuiz.explanation}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              {!hasSubmittedQuiz ? (
                <button
                  disabled={selectedOption === null}
                  onClick={() => setHasSubmittedQuiz(true)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-xs font-bold text-white disabled:opacity-40 transition-all shadow-lg"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowQuizModal(false);
                    setSelectedOption(null);
                    setHasSubmittedQuiz(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
