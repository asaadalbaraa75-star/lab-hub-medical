import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Layers,
  Eye,
  EyeOff,
  Search,
  Sliders,
  Sparkles,
  Heart,
  Wind,
  Activity,
  Award,
  HelpCircle,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
  Play,
  Pause,
  Compass,
  ArrowRight,
  Shield,
  Stethoscope,
  Move3d,
  Share2
} from 'lucide-react';
import { AnatomySceneManager } from './Anatomy3DSceneBuilder';
import {
  ANATOMICAL_LAYERS,
  ANATOMICAL_STRUCTURES,
  CAMERA_PRESETS
} from './Anatomy3DDatabase';
import {
  AnatomicalLayerId,
  AnatomicalStructure,
  AnatomicalAnimationMode
} from './Anatomy3DTypes';

interface RealisticHuman3DViewerProps {
  onBack?: () => void;
  onOpenQuiz?: (topicId: string) => void;
}

export const RealisticHuman3DViewer: React.FC<RealisticHuman3DViewerProps> = ({
  onBack,
  onOpenQuiz
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<AnatomySceneManager | null>(null);

  // Layer Visibilities and Opacities state
  const [layerVisibility, setLayerVisibility] = useState<Record<AnatomicalLayerId, boolean>>({
    skin: true,
    fascia: true,
    superficial_muscles: true,
    deep_muscles: true,
    bones: true,
    joints: true,
    organs: true,
    arteries: true,
    veins: true,
    nerves: true
  });

  const [layerOpacity, setLayerOpacity] = useState<Record<AnatomicalLayerId, number>>({
    skin: 0.35,
    fascia: 0.65,
    superficial_muscles: 1.0,
    deep_muscles: 1.0,
    bones: 1.0,
    joints: 0.9,
    organs: 1.0,
    arteries: 1.0,
    veins: 1.0,
    nerves: 1.0
  });

  // Selected structure & search
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isIsolated, setIsIsolated] = useState(false);
  const [showLayersDrawer, setShowLayersDrawer] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<AnatomicalAnimationMode>('none');
  const [activePreset, setActivePreset] = useState<string>('anterior');

  // "Test Me" spotter quiz modal
  const [isSpotterQuizOpen, setIsSpotterQuizOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const manager = new AnatomySceneManager(containerRef.current);
    sceneManagerRef.current = manager;

    // Default select heart for instant medical realism
    const defaultStructure = ANATOMICAL_STRUCTURES.find(s => s.id === 'heart_ventricles');
    if (defaultStructure) {
      setSelectedStructure(defaultStructure);
      manager.selectStructure(defaultStructure.id);
    }

    // Click handler for 3D raycasting
    const handleCanvasClick = (e: MouseEvent) => {
      // Avoid clicks if user was dragging
      if (manager.isDragging || manager.isPanning) return;
      const hitId = manager.raycastStructure(e.clientX, e.clientY);
      if (hitId) {
        const found = ANATOMICAL_STRUCTURES.find(s => s.id === hitId);
        if (found) {
          setSelectedStructure(found);
          manager.selectStructure(found.id);
        }
      }
    };

    const dom = manager.renderer.domElement;
    dom.addEventListener('click', handleCanvasClick);

    return () => {
      dom.removeEventListener('click', handleCanvasClick);
      manager.dispose();
      sceneManagerRef.current = null;
    };
  }, []);

  // Handle Layer Toggle
  const toggleLayer = (layerId: AnatomicalLayerId) => {
    const nextVal = !layerVisibility[layerId];
    setLayerVisibility(prev => ({ ...prev, [layerId]: nextVal }));
    sceneManagerRef.current?.setLayerVisibility(layerId, nextVal);
  };

  // Handle Layer Opacity Slider
  const handleOpacityChange = (layerId: AnatomicalLayerId, val: number) => {
    setLayerOpacity(prev => ({ ...prev, [layerId]: val }));
    sceneManagerRef.current?.setLayerOpacity(layerId, val);
  };

  // Handle Camera Preset Selection
  const selectCameraPreset = (presetId: string) => {
    const preset = CAMERA_PRESETS.find(p => p.id === presetId);
    if (preset && sceneManagerRef.current) {
      setActivePreset(presetId);
      sceneManagerRef.current.setCameraView(preset.position, preset.target);
    }
  };

  // Handle Structure Selection
  const handleSelectStructure = (structure: AnatomicalStructure) => {
    setSelectedStructure(structure);
    setIsIsolated(false);
    sceneManagerRef.current?.selectStructure(structure.id);
    setSearchQuery('');
    setIsSearchDropdownOpen(false);

    // If structure is on an invisible layer, automatically make it visible
    if (!layerVisibility[structure.layer]) {
      toggleLayer(structure.layer);
    }

    // Auto switch to appropriate camera region
    if (structure.region === 'thorax') selectCameraPreset('thorax');
    else if (structure.region === 'head_neck') selectCameraPreset('head_neck');
    else if (structure.region === 'abdomen_pelvis') selectCameraPreset('abdomen');
    else if (structure.region === 'lower_limb') selectCameraPreset('pelvis_lower');
  };

  // Handle Isolate
  const handleToggleIsolate = () => {
    if (!selectedStructure) return;
    const nextIsolate = !isIsolated;
    setIsIsolated(nextIsolate);
    sceneManagerRef.current?.isolateStructure(nextIsolate ? selectedStructure.id : null);
  };

  // Handle Animation Trigger
  const handleToggleAnimation = (anim: AnatomicalAnimationMode) => {
    const nextAnim = activeAnimation === anim ? 'none' : anim;
    setActiveAnimation(nextAnim);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.currentAnimation = nextAnim;
    }
  };

  // Handle Reset
  const handleResetScene = () => {
    sceneManagerRef.current?.resetView();
    setActiveAnimation('none');
    setIsIsolated(false);
    setSelectedStructure(null);
    setActivePreset('anterior');
    setLayerVisibility({
      skin: true,
      fascia: true,
      superficial_muscles: true,
      deep_muscles: true,
      bones: true,
      joints: true,
      organs: true,
      arteries: true,
      veins: true,
      nerves: true
    });
  };

  // Filtered search structures
  const filteredStructures = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ANATOMICAL_STRUCTURES.filter(
      s =>
        s.nameEn.toLowerCase().includes(q) ||
        s.nameAr.toLowerCase().includes(q) ||
        s.latinName.toLowerCase().includes(q) ||
        s.regionAr.includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="relative w-full h-[90vh] sm:h-[92vh] rounded-3xl overflow-hidden bg-[#060913] border border-white/10 shadow-2xl flex flex-col font-sans select-none">
      {/* 1. TOP FLOATING CONTROL STRIP */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
        {/* Left: Brand Badge & Back */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-[#0E081A]/85 hover:bg-white/15 backdrop-blur-xl border border-white/15 text-slate-300 hover:text-white transition cursor-pointer shadow-lg"
              title="العودة لمعمل التشريح"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="px-4 py-2 rounded-2xl bg-[#0E081A]/85 backdrop-blur-xl border border-white/15 text-right flex items-center gap-3 shadow-lg" dir="rtl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5 flex items-center justify-center">
              <Move3d className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xs font-black text-white tracking-tight">أطلس التشريح ثلاثي الأبعاد الحقيقي</h2>
              <p className="text-[10px] text-cyan-300 font-mono">LAB HUB 3D Real-Time WebGL Engine</p>
            </div>
          </div>
        </div>

        {/* Center: Search with Autocomplete */}
        <div className="relative w-72 sm:w-96 pointer-events-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchDropdownOpen(true);
              }}
              onFocus={() => setIsSearchDropdownOpen(true)}
              placeholder="Search anatomical structure, muscle, nerve..."
              className="w-full bg-[#0E081A]/85 hover:bg-[#150F26]/95 focus:bg-[#150F26] border border-white/15 focus:border-cyan-400/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-400 backdrop-blur-xl shadow-xl outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Results Dropdown */}
          {isSearchDropdownOpen && filteredStructures.length > 0 && (
            <div className="absolute top-12 left-0 right-0 max-h-64 overflow-y-auto rounded-2xl bg-[#0E081A] border border-white/15 p-2 shadow-2xl z-50 space-y-1 text-right" dir="rtl">
              {filteredStructures.map(s => (
                <div
                  key={s.id}
                  onClick={() => handleSelectStructure(s)}
                  className="p-2.5 rounded-xl hover:bg-white/10 text-xs text-slate-200 cursor-pointer flex items-center justify-between transition"
                >
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-mono">
                    {s.regionAr}
                  </span>
                  <div className="text-right">
                    <p className="font-bold text-white">{s.nameAr}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{s.nameEn}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Reset & Quick View Presets */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={handleResetScene}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0E081A]/85 hover:bg-white/15 backdrop-blur-xl border border-white/15 text-xs font-bold text-slate-200 transition cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
            <span>إعادة ضبط (Reset)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLayersDrawer(!showLayersDrawer)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl backdrop-blur-xl border text-xs font-bold transition cursor-pointer shadow-lg ${
              showLayersDrawer
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-[#0E081A]/85 hover:bg-white/15 border-white/15 text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>الطبقات التشريحية (10 Layers)</span>
          </button>
        </div>
      </div>

      {/* 2. THREE.JS 3D CANVAS CONTAINER */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
      />

      {/* 3. CAMERA PRESETS BAR (Floating at bottom center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-[#0E081A]/85 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-x-auto max-w-[95vw] no-scrollbar">
        {CAMERA_PRESETS.map(preset => (
          <button
            key={preset.id}
            type="button"
            onClick={() => selectCameraPreset(preset.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activePreset === preset.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {preset.nameAr}
          </button>
        ))}
      </div>

      {/* 4. REALISTIC MEDICAL ANIMATION CONTROLS (Floating pill at top right) */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        <div className="p-2.5 rounded-3xl bg-[#0E081A]/85 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-1.5 text-right" dir="rtl">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10 px-1">
            <span className="text-[10px] font-bold text-slate-400">محاكاة الحركة الحية</span>
            <Activity className="w-3.5 h-3.5 text-rose-400" />
          </div>

          {/* Heartbeat Animation Button */}
          <button
            type="button"
            onClick={() => handleToggleAnimation('heartbeat')}
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeAnimation === 'heartbeat'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>نبض القلب (Cardiac Cycle)</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">72 BPM</span>
          </button>

          {/* Respiratory Breathing Animation */}
          <button
            type="button"
            onClick={() => handleToggleAnimation('respiration')}
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeAnimation === 'respiration'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-pink-400" />
              <span>التنفس الرئوي (Respiration)</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">14 RPM</span>
          </button>

          {/* Muscle Contraction (Biceps Flexion) */}
          <button
            type="button"
            onClick={() => handleToggleAnimation('biceps_flexion')}
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeAnimation === 'biceps_flexion'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>تقلص العضلة ذات الرأسين (Biceps Flexion)</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">0-135°</span>
          </button>

          {/* Knee Joint Motion */}
          <button
            type="button"
            onClick={() => handleToggleAnimation('knee_motion')}
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeAnimation === 'knee_motion'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>ميكانيكا الركبة (Knee Biomechanics)</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">Hinge</span>
          </button>
        </div>
      </div>

      {/* 5. ANATOMICAL STRUCTURE INSPECTOR CARD (Floating on Left when structure selected) */}
      {selectedStructure && (
        <div className="absolute top-20 left-4 z-20 w-80 sm:w-96 max-h-[75vh] overflow-y-auto rounded-3xl bg-[#0E081A]/90 backdrop-blur-2xl border border-white/20 p-5 shadow-2xl text-right animate-in slide-in-from-left duration-300" dir="rtl">
          {/* Header & Close */}
          <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 mb-3">
            <button
              type="button"
              onClick={() => {
                setSelectedStructure(null);
                sceneManagerRef.current?.selectStructure(null);
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  {selectedStructure.regionAr}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  {selectedStructure.layer}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">{selectedStructure.nameAr}</h3>
              <p className="text-xs font-mono text-cyan-300">{selectedStructure.nameEn}</p>
              <p className="text-[11px] italic text-slate-400 font-serif">{selectedStructure.latinName}</p>
            </div>
          </div>

          {/* Quick Action Toolbar (Isolate & Test Me) */}
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={handleToggleIsolate}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                isIsolated
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isIsolated ? 'إلغاء العزل' : 'عزل التركيب (Isolate)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSpotterQuizOpen(true)}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>اختبرني (Test Me)</span>
            </button>
          </div>

          {/* Scientific Details Tabs */}
          <div className="space-y-3.5 text-xs text-slate-300">
            {/* Location */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>الموقع التشريحي (Location)</span>
              </h4>
              <p className="leading-relaxed text-slate-300 text-[11px]">{selectedStructure.location}</p>
            </div>

            {/* Function */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>الوظيفة الفسيولوجية (Function)</span>
              </h4>
              <p className="leading-relaxed text-slate-300 text-[11px]">{selectedStructure.function}</p>
            </div>

            {/* Relations */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>المجاورات التشريحية (Relations)</span>
              </h4>
              <ul className="space-y-1 text-[11px] leading-relaxed text-slate-300">
                {selectedStructure.relations.anterior && (
                  <li><strong className="text-white">أمامياً (Anterior):</strong> {selectedStructure.relations.anterior}</li>
                )}
                {selectedStructure.relations.posterior && (
                  <li><strong className="text-white">خلفياً (Posterior):</strong> {selectedStructure.relations.posterior}</li>
                )}
                {selectedStructure.relations.medial && (
                  <li><strong className="text-white">إنسياً (Medial):</strong> {selectedStructure.relations.medial}</li>
                )}
                {selectedStructure.relations.lateral && (
                  <li><strong className="text-white">وحشياً (Lateral):</strong> {selectedStructure.relations.lateral}</li>
                )}
                {selectedStructure.relations.superior && (
                  <li><strong className="text-white">علوياً (Superior):</strong> {selectedStructure.relations.superior}</li>
                )}
                {selectedStructure.relations.inferior && (
                  <li><strong className="text-white">سفلياً (Inferior):</strong> {selectedStructure.relations.inferior}</li>
                )}
              </ul>
            </div>

            {/* HIGH-YIELD Exam Information */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/60 to-purple-950/60 border border-rose-500/30">
              <h4 className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                <span>معلومات امتحانية هامة (HIGH-YIELD OSPE)</span>
              </h4>
              <p className="leading-relaxed text-rose-100 text-[11px] font-semibold">{selectedStructure.highYieldExamInfo}</p>
            </div>

            {/* Clinical Correlates */}
            <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
              <h4 className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                <span>التطبيق السريري (Clinical Correlates)</span>
              </h4>
              <p className="leading-relaxed text-cyan-100 text-[11px]">{selectedStructure.clinicalCorrelates}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. LAYERS DRAWER (Floating on Left when Layers button clicked) */}
      {showLayersDrawer && (
        <div className="absolute top-20 right-4 z-30 w-80 rounded-3xl bg-[#0E081A]/95 backdrop-blur-2xl border border-white/20 p-5 shadow-2xl text-right animate-in slide-in-from-right duration-200" dir="rtl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <button
              type="button"
              onClick={() => setShowLayersDrawer(false)}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-sm font-black text-white">الطبقات التشريحية (10 Layers)</h3>
              <p className="text-[10px] text-slate-400">إظهار/إخفاء والتحكم في الشفافية (Transparency)</p>
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pl-1">
            {ANATOMICAL_LAYERS.map(layer => {
              const isVis = layerVisibility[layer.id];
              const opacityVal = layerOpacity[layer.id];

              return (
                <div key={layer.id} className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleLayer(layer.id)}
                      className={`p-1.5 rounded-xl transition cursor-pointer ${
                        isVis
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-white/5 text-slate-500'
                      }`}
                      title={isVis ? 'إخفاء الطبقة' : 'إظهار الطبقة'}
                    >
                      {isVis ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{layer.nameAr}</span>
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>
                  </div>

                  {/* Opacity slider */}
                  <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono w-8">
                      {Math.round(opacityVal * 100)}%
                    </span>
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.05"
                      value={opacityVal}
                      disabled={!isVis}
                      onChange={e => handleOpacityChange(layer.id, parseFloat(e.target.value))}
                      className="flex-1 accent-cyan-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                    />
                    <span className="text-[9px] text-slate-500">الشفافية</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. SPOTTER "TEST ME" MODAL */}
      {isSpotterQuizOpen && selectedStructure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="rtl">
          <div className="w-full max-w-lg rounded-3xl bg-[#0E081A] border border-white/20 p-6 shadow-2xl space-y-5 text-right animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">اختبار المحطة السريرية (OSPE Spotter)</h3>
                  <p className="text-xs text-purple-300 font-mono">{selectedStructure.nameEn}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSpotterQuizOpen(false);
                  setSelectedOptionIndex(null);
                  setHasSubmittedQuiz(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-white leading-relaxed">
                {selectedStructure.quickSpotterQuiz.questionAr}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {selectedStructure.quickSpotterQuiz.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {selectedStructure.quickSpotterQuiz.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = idx === selectedStructure.quickSpotterQuiz.correctIndex;

                let btnStyle = 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200';
                if (hasSubmittedQuiz) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-purple-600 text-white border-purple-400';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!hasSubmittedQuiz) setSelectedOptionIndex(idx);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-xs text-right transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Submit & Explanation */}
            {!hasSubmittedQuiz ? (
              <button
                type="button"
                disabled={selectedOptionIndex === null}
                onClick={() => setHasSubmittedQuiz(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer shadow-lg"
              >
                تأكيد الإجابة
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white">التعليل الأكاديمي (Rationale)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedStructure.quickSpotterQuiz.explanation}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSpotterQuizOpen(false);
                    setSelectedOptionIndex(null);
                    setHasSubmittedQuiz(false);
                  }}
                  className="w-full mt-3 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold transition hover:bg-purple-500"
                >
                  إغلاق ومتابعة الفحص ثلاثي الأبعاد
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
