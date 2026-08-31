import React, { useState } from 'react';
import { SpotterItem, LabSubjectId } from '../../types';
import { Target, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, HelpCircle, ChevronLeft } from 'lucide-react';

interface SpotterViewProps {
  spotters: SpotterItem[];
  selectedLabId?: LabSubjectId;
  onBack: () => void;
}

export const SpotterView: React.FC<SpotterViewProps> = ({
  spotters = [],
  selectedLabId,
  onBack
}) => {
  const [activeLabFilter, setActiveLabFilter] = useState<LabSubjectId | 'all'>(selectedLabId || 'all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const safeSpotters = Array.isArray(spotters) ? spotters : [];

  const filteredSpotters = safeSpotters.filter(s => {
    if (activeLabFilter === 'all') return true;
    return s.labId === activeLabFilter;
  });

  const currentSpotter = filteredSpotters[currentIndex] || filteredSpotters[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentSpotter) return;
    setIsAnswerSubmitted(true);
    setAnsweredCount(prev => prev + 1);
    if (selectedOption === currentSpotter.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextSpotter = () => {
    if (currentIndex < filteredSpotters.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed all
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnsweredCount(0);
  };

  if (filteredSpotters.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 text-center space-y-4 shadow-sm">
        <Target className="w-12 h-12 text-indigo-500 mx-auto opacity-50" />
        <h3 className="text-lg font-bold text-slate-900">No Spotters Found</h3>
        <p className="text-sm text-slate-500">There are no spotter stations for this filter.</p>
        <button
          type="button"
          onClick={() => setActiveLabFilter('all')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shadow-xs"
        >
          View All Spotters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="spotter-practice-view">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-[#E2E8F0] text-slate-500 hover:text-slate-900 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase border border-indigo-100">
                Spotter Examination Simulator
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Station {currentIndex + 1} of {filteredSpotters.length}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              PRACTICAL SPOTTER IDENTIFICATION
            </h1>
          </div>
        </div>

        {/* Lab Filter Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setActiveLabFilter('all'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              activeLabFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            All Labs
          </button>
          <button
            type="button"
            onClick={() => { setActiveLabFilter('anatomy'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              activeLabFilter === 'anatomy'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            Anatomy
          </button>
          <button
            type="button"
            onClick={() => { setActiveLabFilter('histology'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              activeLabFilter === 'histology'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            Histology
          </button>
          <button
            type="button"
            onClick={() => { setActiveLabFilter('bacteriology'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              activeLabFilter === 'bacteriology'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            Bacteriology
          </button>
        </div>
      </div>

      {/* Spotter Stage Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Specimen Image with Pointer */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-4 bg-slate-50 border-b border-[#E2E8F0] flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {currentSpotter.title}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white text-teal-700 border border-[#E2E8F0] capitalize font-mono font-bold">
              {currentSpotter.difficulty} Station
            </span>
          </div>

          <div className="relative bg-slate-900 p-4 flex items-center justify-center min-h-[380px]">
            <img
              src={currentSpotter.image}
              alt={currentSpotter.title}
              className="max-h-[400px] w-auto rounded-xl object-contain shadow-2xl"
            />

            {/* Visual Pointer / Pin on Image */}
            {currentSpotter.pointerX !== undefined && currentSpotter.pointerY !== undefined && (
              <div
                style={{ left: `${currentSpotter.pointerX}%`, top: `${currentSpotter.pointerY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full border-2 border-indigo-400 bg-indigo-500/30 animate-ping absolute" />
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xl ring-4 ring-indigo-300">
                  <Target className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 border-t border-[#E2E8F0] text-xs text-slate-500 text-center font-medium">
            Carefully inspect the highlighted pointer landmark before answering.
          </div>
        </div>

        {/* Right: Question, Options & Feedback */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Question:
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                {currentSpotter.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentSpotter.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentSpotter.correctIndex;

                let btnStyles = 'bg-slate-50 hover:bg-slate-100 border-[#E2E8F0] text-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyles = 'bg-rose-50 border-rose-300 text-rose-800';
                  } else {
                    btnStyles = 'bg-slate-50/50 border-[#E2E8F0]/60 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyles = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold ring-2 ring-indigo-200';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm shadow-xs ${btnStyles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] text-slate-700 font-bold flex items-center justify-center font-mono text-xs shrink-0 shadow-2xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium">{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box after submission */}
            {isAnswerSubmitted && (
              <div className="bg-slate-50 p-4 rounded-lg border border-[#E2E8F0] space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  {selectedOption === currentSpotter.correctIndex ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Incorrect Answer
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {currentSpotter.explanation}
                </p>

                <div className="pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[11px] font-bold text-teal-700 block mb-1">
                    Key Identification Features:
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-1 font-medium">
                    {currentSpotter.identificationKeyPoints.map((kp, i) => (
                      <li key={i}>• {kp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-medium">
              Score: <strong className="text-slate-900 font-bold">{score}/{answeredCount}</strong>
            </div>

            <div className="flex items-center gap-2">
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-xs"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextSpotter}
                  className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-xs"
                >
                  <span>{currentIndex < filteredSpotters.length - 1 ? 'Next Station' : 'Restart Spotter'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
