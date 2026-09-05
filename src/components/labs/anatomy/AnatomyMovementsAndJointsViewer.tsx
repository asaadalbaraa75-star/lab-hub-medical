import React, { useState } from 'react';
import {
  ArrowLeft,
  Activity,
  Move3d,
  Zap,
  RotateCcw,
  Info,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface MovementData {
  id: string;
  nameEn: string;
  nameAr: string;
  plane: string;
  axis: string;
  primeMover: string;
  description: string;
  clinicalNote: string;
  degrees: string;
  diagramSvgType: 'flexion' | 'abduction' | 'rotation' | 'foot';
}

const MOVEMENTS_CATALOG: MovementData[] = [
  {
    id: 'flexion',
    nameEn: 'Flexion',
    nameAr: 'الثني (Flexion)',
    plane: 'Sagittal Plane (المستوى السهمي)',
    axis: 'Transverse Axis',
    primeMover: 'Biceps Brachii & Brachialis (Elbow) / Pectoralis Major (Shoulder)',
    description: 'Bending movement that decreases the angle between two body segments, bringing ventral surfaces closer.',
    clinicalNote: 'Tested in biceps tendon reflex (C5-C6 root) and upper motor neuron pathology examinations.',
    degrees: '0° to 145° at elbow',
    diagramSvgType: 'flexion'
  },
  {
    id: 'extension',
    nameEn: 'Extension',
    nameAr: 'البسط (Extension)',
    plane: 'Sagittal Plane (المستوى السهمي)',
    axis: 'Transverse Axis',
    primeMover: 'Triceps Brachii (Elbow) / Latissimus Dorsi & Posterior Deltoid (Shoulder)',
    description: 'Straightening movement that increases the angle between body segments, returning from flexion to anatomical position.',
    clinicalNote: 'Tested in triceps reflex (C7-C8 root); radial nerve damage impairs forearm extension (wrist/elbow drop).',
    degrees: '145° to 0° (neutral)',
    diagramSvgType: 'flexion'
  },
  {
    id: 'abduction',
    nameEn: 'Abduction',
    nameAr: 'التبعيد (Abduction)',
    plane: 'Coronal / Frontal Plane (المستوى الإكليلي)',
    axis: 'Anteroposterior Axis',
    primeMover: 'Supraspinatus (first 0-15°), Middle Deltoid (15-90°), Serratus Anterior (>90°)',
    description: 'Movement of a limb or extremity laterally away from the midline of the body.',
    clinicalNote: 'Painful arc syndrome (60°-120°) suggests supraspinatus tendinitis or subacromial impingement.',
    degrees: '0° to 180° total shoulder abduction',
    diagramSvgType: 'abduction'
  },
  {
    id: 'adduction',
    nameEn: 'Adduction',
    nameAr: 'التقريب (Adduction)',
    plane: 'Coronal / Frontal Plane (المستوى الإكليلي)',
    axis: 'Anteroposterior Axis',
    primeMover: 'Pectoralis Major, Latissimus Dorsi, Teres Major',
    description: 'Movement of a limb or extremity toward the sagittal midline plane of the body.',
    clinicalNote: 'Essential for upper limb stabilization, carrying loads, and swimming strokes.',
    degrees: '180° down to 0° and cross-body ~30°',
    diagramSvgType: 'abduction'
  },
  {
    id: 'medial_rotation',
    nameEn: 'Medial (Internal) Rotation',
    nameAr: 'الدوران الإنسي (Medial Rotation)',
    plane: 'Transverse / Axial Plane (المستوى المستعرض)',
    axis: 'Vertical Longitudinal Axis',
    primeMover: 'Subscapularis, Pectoralis Major, Latissimus Dorsi',
    description: 'Rotational movement toward the midline of the anterior body surface.',
    clinicalNote: "Tested with Gerber's lift-off test to evaluate subscapularis muscle tears.",
    degrees: '0° to 70° shoulder rotation',
    diagramSvgType: 'rotation'
  },
  {
    id: 'lateral_rotation',
    nameEn: 'Lateral (External) Rotation',
    nameAr: 'الدوران الوحشي (Lateral Rotation)',
    plane: 'Transverse / Axial Plane (المستوى المستعرض)',
    axis: 'Vertical Longitudinal Axis',
    primeMover: 'Infraspinatus & Teres Minor',
    description: 'Rotational movement directed laterally away from the midline of the body.',
    clinicalNote: 'Assessed with Patte test; infraspinatus weakness impairs external rotation against resistance.',
    degrees: '0° to 90° shoulder rotation',
    diagramSvgType: 'rotation'
  },
  {
    id: 'pronation',
    nameEn: 'Pronation',
    nameAr: 'الكَبّ (Pronation)',
    plane: 'Transverse rotation of radius around ulna',
    axis: 'Oblique radio-ulnar axis',
    primeMover: 'Pronator Teres & Pronator Quadratus (Median Nerve)',
    description: 'Medial rotation of the forearm such that the palm of the hand faces posteriorly or downwards.',
    clinicalNote: 'Median nerve injury at the elbow causes loss of pronator function and weak wrist flexion.',
    degrees: '0° to 85°',
    diagramSvgType: 'rotation'
  },
  {
    id: 'supination',
    nameEn: 'Supination',
    nameAr: 'الاستلقاء (Supination)',
    plane: 'Transverse rotation of radius around ulna',
    axis: 'Oblique radio-ulnar axis',
    primeMover: 'Supinator (Radial N.) & Biceps Brachii (Musculocutaneous N.)',
    description: 'Lateral rotation of the forearm returning the palm to face anteriorly (anatomical position).',
    clinicalNote: 'Biceps Brachii is the most powerful supinator when the elbow is flexed to 90° (e.g. turning a corkscrew).',
    degrees: '0° to 90°',
    diagramSvgType: 'rotation'
  },
  {
    id: 'inversion',
    nameEn: 'Inversion & Eversion',
    nameAr: 'الانقلاب الداخلي والخارجي للقدم',
    plane: 'Subtalar & Transverse Tarsal Joints',
    axis: 'Oblique subtalar axis',
    primeMover: 'Inversion: Tibialis Anterior & Posterior. Eversion: Fibularis Longus & Brevis.',
    description: 'Inversion turns the sole medially; Eversion turns the sole laterally.',
    clinicalNote: 'Over 85% of ankle sprains are hyper-inversion injuries tearing the Anterior Talofibular Ligament (ATFL).',
    degrees: 'Inversion: ~35° / Eversion: ~15°',
    diagramSvgType: 'foot'
  }
];

interface JointData {
  id: string;
  nameEn: string;
  nameAr: string;
  type: 'fibrous' | 'cartilaginous' | 'synovial';
  mobility: string;
  components: string[];
  examples: string;
  clinicalRelevance: string;
}

const JOINTS_CATALOG: JointData[] = [
  {
    id: 'synovial_knee',
    nameEn: 'Synovial Joint (Knee / Shoulder)',
    nameAr: 'المفصل الزلالي (Synovial Articulation)',
    type: 'synovial',
    mobility: 'Diarthrosis (Freely movable)',
    components: [
      'Articular (Hyaline) Cartilage: Avascular buffer reducing friction',
      'Joint Capsule: Fibrous outer sleeve stabilizing bony ends',
      'Synovial Membrane: Inner lining producing hyaluronic synovial fluid',
      'Synovial Fluid: Nourishes chondrocytes and lubricates motion',
      'Extracapsular & Intracapsular Ligaments (e.g. ACL, PCL, MCL, LCL)',
      'Articular Discs / Menisci: Shock absorbers deepening congruent contact'
    ],
    examples: 'Glenohumeral (ball & socket), Knee (modified hinge), Hip (ball & socket), Elbow (hinge).',
    clinicalRelevance: 'Susceptible to rheumatoid arthritis, osteoarthritis, ligamentous tears (Unhappy Triad of O\'Donoghue), and septic effusion.'
  },
  {
    id: 'cartilaginous',
    nameEn: 'Cartilaginous Joint (Symphysis & Synchondrosis)',
    nameAr: 'المفصل الغضروفي (Cartilaginous)',
    type: 'cartilaginous',
    mobility: 'Amphiarthrosis (Slightly movable)',
    components: [
      'Primary (Synchondrosis): Hyaline cartilage (e.g., Epiphyseal growth plates, 1st chondrosternal)',
      'Secondary (Symphysis): Fibrocartilaginous pad in midline (e.g., Intervertebral discs, Pubic symphysis)'
    ],
    examples: 'Intervertebral discs between vertebral bodies, Symphysis pubis, Manubriosternal joint.',
    clinicalRelevance: 'Herniated nucleus pulposus (slipped disc) impinges spinal nerve roots; pubic symphysis diastasis occurs in pregnancy/trauma.'
  },
  {
    id: 'fibrous',
    nameEn: 'Fibrous Joint (Sutures & Syndesmosis)',
    nameAr: 'المفصل الليفي (Fibrous)',
    type: 'fibrous',
    mobility: 'Synarthrosis (Immovable to negligible motion)',
    components: [
      'Dense Collagenous Connective Tissue connecting bones directly',
      'Sutures: Cranial bones interlocking with Sharpey\'s fibers',
      'Syndesmosis: Interosseous membrane between radius-ulna and tibia-fibula',
      'Gomphosis: Peg-and-socket peg between tooth root and alveolar socket'
    ],
    examples: 'Sagittal and coronal cranial sutures, inferior tibiofibular syndesmosis.',
    clinicalRelevance: 'Craniosynostosis (premature suture fusion alters skull growth); High ankle sprain damages the tibiofibular syndesmosis.'
  }
];

export const AnatomyMovementsAndJointsViewer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'movements' | 'joints'>('movements');
  const [selectedMovement, setSelectedMovement] = useState<MovementData>(MOVEMENTS_CATALOG[0]);
  const [selectedJoint, setSelectedJoint] = useState<JointData>(JOINTS_CATALOG[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right select-none" dir="rtl">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Gray's Anatomy • Chapter 2
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              الحركات التشريحية والمفاصل الحيوية (Kinesiology & Arthrology)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              الدليل العملي التفاعلي للمستويات الحركية والمفاصل الزلالية والغضروفية
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('movements')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'movements'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>الحركات التشريحية (Movements)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('joints')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'joints'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Move3d className="w-4 h-4" />
            <span>تصنيف المفاصل (Articulations)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ANATOMICAL MOVEMENTS */}
      {activeTab === 'movements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Movement Selector Cards (Left in RTL, 5 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              اختر الحركة التشريحية ({MOVEMENTS_CATALOG.length} حركات أساسية)
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {MOVEMENTS_CATALOG.map(mov => {
                const isSelected = mov.id === selectedMovement.id;
                return (
                  <div
                    key={mov.id}
                    onClick={() => setSelectedMovement(mov)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right group ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border-purple-500/70 shadow-lg shadow-purple-900/30'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-purple-500/20 text-purple-300' : 'bg-black/30 text-slate-400'
                      }`}>
                        {mov.degrees}
                      </span>
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {mov.nameAr}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{mov.nameEn}</p>
                    <p className="text-[11px] text-purple-300/80 mt-1 truncate">{mov.plane}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Movement Simulator & Clinical Breakdown (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Visual Canvas Simulator */}
            <div className="relative h-[340px] sm:h-[400px] rounded-3xl overflow-hidden glass-card border border-purple-500/30 shadow-2xl flex flex-col justify-between p-6">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D1E] via-[#070915] to-[#120B24] -z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

              {/* Simulation Header */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                    Kinesiology Visual Engine
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isSimulating ? 'إيقاف المحاكاة' : 'تشغيل الحركة'}</span>
                </button>
              </div>

              {/* Center Dynamic SVG Motion Diagram */}
              <div className="my-auto flex flex-col items-center justify-center relative z-10">
                <svg viewBox="0 0 300 200" className="w-full max-w-sm h-44 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  {/* Base Coordinate Grid */}
                  <line x1="50" y1="150" x2="250" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="150" y1="30" x2="150" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Central Pivot Joint */}
                  <circle cx="150" cy="150" r="14" fill="#0E081A" stroke="#A855F7" strokeWidth="3" />
                  <circle cx="150" cy="150" r="6" fill="#38BDF8" />

                  {/* Fixed Limb Segment */}
                  <line x1="150" y1="150" x2="60" y2="150" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
                  <text x="75" y="170" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Fixed Segment</text>

                  {/* Dynamic Moving Limb Segment */}
                  <g className={isSimulating ? 'animate-pulse' : ''}>
                    <line
                      x1="150"
                      y1="150"
                      x2={selectedMovement.diagramSvgType === 'flexion' ? '210' : '230'}
                      y2={selectedMovement.diagramSvgType === 'flexion' ? '70' : '110'}
                      stroke="#A855F7"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx={selectedMovement.diagramSvgType === 'flexion' ? '210' : '230'}
                      cy={selectedMovement.diagramSvgType === 'flexion' ? '70' : '110'}
                      r="8"
                      fill="#EC4899"
                    />
                  </g>

                  {/* Arc Arrow Showing Direction of Movement */}
                  <path
                    d="M 220,135 A 80 80 0 0 0 190,80"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                    markerEnd="url(#arrow)"
                  />
                  
                  {/* Vector Marker Arrow */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#22D3EE" />
                    </marker>
                  </defs>
                </svg>

                <div className="text-center mt-2">
                  <span className="text-sm font-black text-white bg-purple-950/70 px-4 py-1 rounded-full border border-purple-500/40">
                    {selectedMovement.nameAr} • {selectedMovement.degrees}
                  </span>
                </div>
              </div>

              {/* Simulation Footer Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-white/10 relative z-10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">المستوى (Plane)</span>
                  <span className="font-bold text-slate-200">{selectedMovement.plane.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">المحور (Axis)</span>
                  <span className="font-bold text-slate-200">{selectedMovement.axis}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px]">المدى الحركي</span>
                  <span className="font-bold text-cyan-400 font-mono">{selectedMovement.degrees}</span>
                </div>
              </div>
            </div>

            {/* High-Yield Clinical Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <Zap className="w-4 h-4" />
                  <span>العضلة المحركة الرئيسية (Prime Mover)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  {selectedMovement.primeMover}
                </p>
                <p className="text-[11px] text-slate-400">
                  {selectedMovement.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>الأهمية السريرية والاختبارات (Clinical Exam)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedMovement.clinicalNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: JOINTS & ARTHROLOGY */}
      {activeTab === 'joints' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {JOINTS_CATALOG.map(joint => {
              const isSelected = joint.id === selectedJoint.id;
              return (
                <div
                  key={joint.id}
                  onClick={() => setSelectedJoint(joint)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#0B1528] to-[#08101E] border-cyan-500/80 shadow-xl shadow-cyan-900/30 scale-102'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                      {joint.mobility}
                    </span>
                    <h3 className="text-lg font-black text-white">{joint.nameAr}</h3>
                    <p className="text-xs font-mono text-slate-400">{joint.nameEn}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-bold">
                    <span>عرض التركيب التشريحي</span>
                    <span>←</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Joint Deep-Dive Details */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{selectedJoint.nameAr}</h3>
                <p className="text-xs sm:text-sm text-cyan-300 font-mono">{selectedJoint.nameEn} • {selectedJoint.mobility}</p>
              </div>
              <span className="text-xs font-bold text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                Gray's Anatomy 43rd Ed. Articular System
              </span>
            </div>

            {/* Components Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                التراكيب التشريحية المكونة للمفصل (Anatomical Components):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedJoint.components.map((comp, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-xs text-slate-200 leading-relaxed font-medium">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples & Pathology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  أبرز الأمثلة في جسم الإنسان (Examples):
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedJoint.examples}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/30 space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  الاعتلالات السريرية وأسئلة OSPE (Clinical & Pathology):
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedJoint.clinicalRelevance}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
