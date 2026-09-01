import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Target,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Info,
  MapPin
} from 'lucide-react';
import { AnatomyTopic, AnatomySpotterItem } from './AnatomyData';
import { AnatomyTopicVisual } from './AnatomyTopicVisuals';

interface AnatomyDiagramViewerProps {
  topic: AnatomyTopic;
}

export const AnatomyDiagramViewer: React.FC<AnatomyDiagramViewerProps> = ({ topic }) => {
  const [activeMode, setActiveMode] = useState<'explore' | 'quiz'>('explore');
  const [selectedPin, setSelectedPin] = useState<AnatomySpotterItem | null>(
    topic.spotterItems && topic.spotterItems.length > 0 ? topic.spotterItems[0] : null
  );

  // Quiz Challenge State
  const [currentQuizPinIdx, setCurrentQuizPinIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [attemptedPin, setAttemptedPin] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const spotters = topic.spotterItems || [];
  const targetQuizPin = spotters[currentQuizPinIdx] || spotters[0];

  const handlePinClick = (item: AnatomySpotterItem) => {
    if (activeMode === 'explore') {
      setSelectedPin(item);
    } else {
      // In Quiz Mode
      setAttemptedPin(item.pinNumber);
      if (item.pinNumber === targetQuizPin.pinNumber) {
        setQuizFeedback('correct');
        setQuizScore(prev => prev + 1);
      } else {
        setQuizFeedback('wrong');
      }
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizFeedback('idle');
    setAttemptedPin(null);
    if (currentQuizPinIdx < spotters.length - 1) {
      setCurrentQuizPinIdx(prev => prev + 1);
    } else {
      // Finished quiz loop
      setCurrentQuizPinIdx(0);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizPinIdx(0);
    setQuizFeedback('idle');
    setAttemptedPin(null);
    setQuizScore(0);
  };

  if (spotters.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 text-white space-y-4" id="interactive-diagram-viewer">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              المخطط التوضيحي والتحديد التفاعلي (Interactive Anatomical Spotter)
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Designed specifically for First-Year Medical Students
            </p>
          </div>
        </div>

        {/* Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveMode('explore');
              setQuizFeedback('idle');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'explore'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>استكشاف المعالم (Explore)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('quiz');
              handleResetQuiz();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'quiz'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>تحدي التحديد (Identify Challenge)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left/Top: Visual Diagram with Pin Hotspots */}
        <div className="lg:col-span-7 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 group shadow-inner">
          <div className="relative aspect-4/3 w-full max-h-[380px] sm:max-h-[420px] bg-slate-950 flex items-center justify-center">
            <AnatomyTopicVisual
              topicId={topic.id}
              selectedPinNumber={selectedPin?.pinNumber}
              activePinNumber={activeMode === 'quiz' ? targetQuizPin?.pinNumber : undefined}
              onPinClick={handlePinClick}
              spotters={spotters}
              interactive={true}
              variant="full"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-950/40 pointer-events-none" />

            {/* Interactive Pins Overlay */}
            {spotters.map(item => {
              const isSelected = selectedPin?.pinNumber === item.pinNumber;
              const isTargetInQuiz = targetQuizPin.pinNumber === item.pinNumber;
              const isAttempted = attemptedPin === item.pinNumber;

              let pinBadgeStyle = 'bg-indigo-600 border-white text-white hover:scale-110';

              if (activeMode === 'explore') {
                if (isSelected) {
                  pinBadgeStyle = 'bg-amber-500 border-white text-slate-950 scale-125 shadow-lg shadow-amber-500/50 ring-4 ring-amber-400/30';
                }
              } else {
                // In Quiz Mode
                if (quizFeedback === 'correct' && isTargetInQuiz) {
                  pinBadgeStyle = 'bg-emerald-500 border-white text-white scale-125 shadow-lg shadow-emerald-500/50 animate-bounce';
                } else if (quizFeedback === 'wrong' && isAttempted) {
                  pinBadgeStyle = 'bg-rose-500 border-white text-white scale-110 shadow-lg shadow-rose-500/50';
                } else {
                  pinBadgeStyle = 'bg-slate-700 hover:bg-indigo-600 border-slate-300 text-white hover:scale-110';
                }
              }

              return (
                <button
                  key={item.pinNumber}
                  type="button"
                  onClick={() => handlePinClick(item)}
                  style={{
                    left: `${item.positionX}%`,
                    top: `${item.positionY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute z-20 w-8 h-8 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${pinBadgeStyle}`}
                  title={activeMode === 'explore' ? `${item.pinNumber}. ${item.structureNameEn}` : `Pin #${item.pinNumber}`}
                >
                  <span>{item.pinNumber}</span>
                </button>
              );
            })}

            {/* Bottom Floating Hint Overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md rounded-lg p-2 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                {activeMode === 'explore'
                  ? 'انقر على أي دبوس رقمي لعرض الشرح الطبي المبسط'
                  : `المطلوب: حدد [ ${targetQuizPin.structureNameAr} ]`}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {spotters.length} معالم تشريحية
              </span>
            </div>
          </div>
        </div>

        {/* Right/Bottom: First-Year Pedagogical Card (Simple -> Deep) */}
        <div className="lg:col-span-5 space-y-3">
          {activeMode === 'explore' && selectedPin && (
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
              {/* Pin Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-700/80 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      {selectedPin.pinNumber}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {selectedPin.structureNameEn}
                    </h4>
                  </div>
                  <p className="text-xs font-bold text-amber-300 font-mono mt-0.5">
                    {selectedPin.structureNameAr}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                  {selectedPin.level || 'CORE'}
                </span>
              </div>

              {/* 1. What is it? (ما هو؟) */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                  ما هو؟ (What is it?)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  {selectedPin.whatIsIt}
                </p>
              </div>

              {/* 2. Where is it? (أين يقع؟) */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">
                  أين يقع؟ (Where is it?)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  {selectedPin.whereIsIt}
                </p>
              </div>

              {/* 3. Function & Action (الوظيفة) */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  ما هي وظيفته؟ (What does it do?)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  {selectedPin.functionDesc}
                </p>
              </div>

              {/* 4. How to recognize it (كيف تميزه؟) */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                  كيف أتعرف عليه؟ (How to recognize?)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  {selectedPin.howToRecognize}
                </p>
              </div>

              {/* 5. High-Yield Exam Note */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>مهم للامتحان (Exam Focus):</span>
                </div>
                <p className="leading-snug">{selectedPin.highYieldNote}</p>
              </div>

              {/* 6. Clinical Note */}
              {selectedPin.clinicalNote && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-xs text-rose-200 space-y-0.5">
                  <span className="font-bold text-rose-400 block">Clinical Note:</span>
                  <p className="leading-snug">{selectedPin.clinicalNote}</p>
                </div>
              )}
            </div>
          )}

          {/* QUIZ MODE CARD */}
          {activeMode === 'quiz' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-4 animate-in fade-in duration-200">
              {/* Question Banner */}
              <div className="space-y-1.5 text-center bg-slate-900 p-3.5 rounded-xl border border-slate-700">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  سؤال التحديد العملي ({currentQuizPinIdx + 1} من {spotters.length})
                </span>
                <h4 className="text-base font-black text-white">
                  حدد: {targetQuizPin.structureNameAr}
                </h4>
                <p className="text-xs font-mono text-amber-300 font-bold">
                  ({targetQuizPin.structureNameEn})
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  انقر على الدبوس الصحيح في الصورة أعلاه 👆
                </p>
              </div>

              {/* Feedback State */}
              {quizFeedback === 'correct' && (
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3.5 space-y-2 text-emerald-200 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>✓ أحسنت! إجابة صحيحة (Correct)</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200">
                    {targetQuizPin.whatIsIt}
                  </p>
                  <div className="text-[11px] text-amber-300 font-medium pt-1 border-t border-emerald-500/30">
                    <span className="font-bold">ملاحظة الفحص: </span>
                    {targetQuizPin.highYieldNote}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuizQuestion}
                    className="w-full mt-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>التالي</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {quizFeedback === 'wrong' && (
                <div className="bg-rose-500/20 border border-rose-500/50 rounded-xl p-3.5 space-y-2 text-rose-200 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
                    <XCircle className="w-5 h-5" />
                    <span>✗ حاول مجدداً (Try Again)</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    تلميح: ابحث عن {targetQuizPin.howToRecognize}
                  </p>
                </div>
              )}

              {/* Score & Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700 text-xs text-slate-400">
                <span>
                  النقاط: <strong className="text-amber-400">{quizScore}</strong> / {spotters.length}
                </span>

                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة من البداية</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
