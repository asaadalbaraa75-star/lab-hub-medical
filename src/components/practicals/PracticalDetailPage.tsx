import React, { useState } from 'react';
import {
  Practical,
  LabSubjectId,
  StudentProgress
} from '../../types';
import { InteractiveSlideViewer } from '../interactive/InteractiveSlideViewer';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  FileText,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  HelpCircle,
  CheckSquare,
  Target,
  RotateCw,
  Award,
  Stethoscope,
  Lightbulb,
  ArrowRight,
  BrainCircuit,
  Eye
} from 'lucide-react';

interface PracticalDetailPageProps {
  practical: Practical;
  progress: StudentProgress;
  onToggleComplete: (practicalId: string) => void;
  onOpenQuiz: (labId: LabSubjectId, practicalId?: string) => void;
  onOpenSpotter: (labId: LabSubjectId, categoryId?: string) => void;
  onBack: () => void;
}

type LearningStep =
  | 'quick_idea'
  | 'learn'
  | 'visual'
  | 'clinical'
  | 'practice'
  | 'mini_quiz'
  | 'high_yield';

export const PracticalDetailPage: React.FC<PracticalDetailPageProps> = ({
  practical,
  progress,
  onToggleComplete,
  onOpenQuiz,
  onOpenSpotter,
  onBack
}) => {
  const isCompleted = progress.completedPracticals.includes(practical.id);
  const [currentStep, setCurrentStep] = useState<LearningStep>('quick_idea');

  // Flashcard state for Step 5
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  // Mini Quiz state for Step 6
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const courseNames: Record<string, string> = {
    anatomy: 'Anatomy Lab',
    histology: 'Histology Lab',
    biochemistry: 'Biochemistry Lab'
  };

  const stepsList: { id: LearningStep; label: string; icon: any; short: string }[] = [
    { id: 'quick_idea', label: '1. Quick Idea', icon: Lightbulb, short: 'What is this?' },
    { id: 'learn', label: '2. Learn Concept', icon: BookOpen, short: 'Core Facts' },
    { id: 'visual', label: '3. Visual Atlas', icon: Eye, short: 'Interactive Slide' },
    { id: 'clinical', label: '4. Clinical Relevance', icon: Stethoscope, short: 'Doctor Context' },
    { id: 'practice', label: '5. Quick Practice', icon: BrainCircuit, short: 'Flashcards' },
    { id: 'mini_quiz', label: '6. Mini Quiz', icon: CheckSquare, short: '2-3 Questions' },
    { id: 'high_yield', label: '7. Exam Mode', icon: Award, short: 'High-Yield OSPE' }
  ];

  // Dynamic Flashcards derived from practical data
  const flashcards = [
    {
      front: `Key Diagnostic Landmark for ${practical.title}`,
      back: practical.identificationPoints[0] || practical.subTitle,
      hint: 'Primary visual indicator in microscope/specimen'
    },
    {
      front: `Clinical Condition: ${practical.clinicalCorrelation.condition}`,
      back: practical.clinicalCorrelation.diagnosticPearls,
      hint: 'Why this matters in patient presentation'
    },
    {
      front: 'Common Exam Pitfall to Avoid',
      back: practical.commonMistakes[0]
        ? `Mistake: ${practical.commonMistakes[0].mistake}\n\nCorrection: ${practical.commonMistakes[0].correction}`
        : 'Confusing normal histology with artifact.',
      hint: 'High-yield deduction point in practical exam'
    },
    ...(practical.identificationPoints[1]
      ? [
          {
            front: 'Secondary Morphological Hallmark',
            back: practical.identificationPoints[1],
            hint: 'Cellular or architectural feature'
          }
        ]
      : [])
  ];

  // Dynamic Mini-Quiz questions (2-3 questions)
  const miniQuizQuestions = [
    {
      question: `What is the hallmark diagnostic feature of ${practical.title}?`,
      options: [
        practical.identificationPoints[0] || 'Characteristic structural pattern with high diagnostic sensitivity',
        'Random cellular degeneration without specific pattern',
        'Complete absence of nuclear material or stained organelles',
        'Artifact due to poor fixation technique'
      ],
      correctIndex: 0,
      explanation: practical.identificationPoints[0]
        ? `Correct! ${practical.identificationPoints[0]}`
        : 'This feature is the primary morphological identifier.'
    },
    {
      question: `In clinical practice, this practical is directly relevant to which condition?`,
      options: [
        practical.clinicalCorrelation.condition,
        'Idiopathic general fatigue without morphological signs',
        'Normal physiological variation with zero clinical impact',
        'Non-medical lab artifact'
      ],
      correctIndex: 0,
      explanation: `Correct! ${practical.clinicalCorrelation.pathophysiology}`
    },
    {
      question: `Which common exam mistake should be avoided when evaluating this topic?`,
      options: [
        practical.commonMistakes[0]?.mistake || 'Misidentifying surrounding connective tissue as target parenchyma',
        'Checking the specimen under appropriate light',
        'Focusing using the fine adjustment knob',
        'Verifying the slide label before exam submission'
      ],
      correctIndex: 0,
      explanation: practical.commonMistakes[0]
        ? `Avoid: "${practical.commonMistakes[0].mistake}". Remember: ${practical.commonMistakes[0].correction}`
        : 'Careful differentiation under correct magnification prevents common grading deductions.'
    }
  ];

  const currentStepIndex = stepsList.findIndex(s => s.id === currentStep);

  const goToNextStep = () => {
    if (currentStepIndex < stepsList.length - 1) {
      setCurrentStep(stepsList[currentStepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(stepsList[currentStepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20 max-w-5xl mx-auto" id={`practical-page-${practical.id}`}>
      {/* Top Header & Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to {courseNames[practical.courseId] || 'Subject'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Mark Complete Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(practical.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs ${
              isCompleted
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700/80 text-slate-300 border-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Topic Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark Complete</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Practical Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
              {courseNames[practical.courseId]} • Practical {String(practical.practicalNumber).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {practical.estimatedTime}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              v{practical.version}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {practical.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed">
            {practical.subTitle}
          </p>
        </div>

        {/* 7-Step Navigation Sequence Bar */}
        <div className="pt-3 border-t border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            7-Step Learning Sequence
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
            {stepsList.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isPassed = idx < currentStepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  id={`step-tab-${step.id}`}
                  onClick={() => setCurrentStep(step.id)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                    isActive
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/50 scale-[1.02]'
                      : isPassed
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-cyan-400' : isPassed ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">{step.label}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{step.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP 1: Quick Idea (What is this?) */}
      {currentStep === 'quick_idea' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step 1: Quick Idea</h2>
              <p className="text-xs text-slate-400">What is this topic and why do we study it? (No jargon overload)</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/20 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              In 2-3 Simple Sentences:
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {practical.beforeTheLab.preLabSummary || practical.subTitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Core Question</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                How do we recognize and differentiate this under a microscope or in a practical exam station?
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Est. Study Time</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {practical.estimatedTime} • Micro-learning sequence designed for 1st-year medical students.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">Clinical Target</span>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {practical.clinicalCorrelation.condition}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Continue to Step 2: Learn Concept</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: Learn the Concept */}
      {currentStep === 'learn' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step 2: Learn the Concept</h2>
              <p className="text-xs text-slate-400">Clear bullet points & high-yield academic procedure</p>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Learning Goals:
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {practical.learningObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Procedure */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Protocol & Observation Stages:
            </span>
            <div className="space-y-3">
              {practical.procedure.map(step => (
                <div key={step.stepNumber} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500 text-white font-bold text-xs shadow-xs">
                      Stage {step.stepNumber}
                    </span>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">{step.description}</p>
                  {step.cautionNote && (
                    <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-300 font-medium">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>{step.cautionNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Continue to Step 3: Visual Atlas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: Visual / Atlas / Diagram */}
      {currentStep === 'visual' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Step 3: Visual Atlas & Diagram</h2>
                <p className="text-xs text-slate-400">Interactive viewer: zoom, click pins, explore morphological landmarks</p>
              </div>
            </div>
          </div>

          {/* Interactive Slide Viewer */}
          {practical.interactiveImages && practical.interactiveImages.length > 0 ? (
            <div className="space-y-4">
              <InteractiveSlideViewer interactiveImage={practical.interactiveImages[0]} />
            </div>
          ) : (
            practical.images && practical.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {practical.images.map((img, idx) => (
                  <div key={idx} className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                    <div className="relative h-56 bg-slate-950">
                      <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-slate-900/90 text-cyan-300 font-mono text-[10px] border border-slate-700">
                        {img.magnification || img.stainOrView}
                      </div>
                    </div>
                    <div className="p-3 text-xs text-slate-300">{img.caption}</div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Additional Slides if available */}
          {practical.images && practical.images.length > 1 && (
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Additional Reference Stains:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {practical.images.slice(1).map((img, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                    <img src={img.url} alt={img.caption} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                    <div className="text-xs space-y-1">
                      <span className="font-mono text-[10px] text-cyan-400 font-bold">{img.magnification || img.stainOrView}</span>
                      <p className="text-slate-300 line-clamp-2">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Continue to Step 4: Clinical Relevance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 4: Clinical Correlation (Why does this matter?) */}
      {currentStep === 'clinical' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step 4: Clinical Relevance</h2>
              <p className="text-xs text-slate-400">Why does a doctor need to know this in the hospital?</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase">
                Clinical Scenario / Disease
              </span>
              <h3 className="text-base font-bold text-white">{practical.clinicalCorrelation.condition}</h3>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Pathophysiology & Hospital Presentation:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {practical.clinicalCorrelation.pathophysiology}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-1">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Doctor Diagnostic Pearl:
              </span>
              <p className="text-xs sm:text-sm text-teal-200 leading-relaxed font-medium">
                {practical.clinicalCorrelation.diagnosticPearls}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Continue to Step 5: Quick Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 5: Quick Practice (Interactive Flashcards) */}
      {currentStep === 'practice' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Step 5: Quick Practice</h2>
                <p className="text-xs text-slate-400">Interactive flashcards: tap to flip, test your memory</p>
              </div>
            </div>
            <span className="text-xs text-purple-300 font-mono font-bold bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30">
              Card {activeCardIndex + 1} of {flashcards.length}
            </span>
          </div>

          {/* Interactive Flip Card */}
          <div className="flex flex-col items-center justify-center py-4">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-lg min-h-[220px] rounded-3xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 hover:border-purple-400/60 transition-all cursor-pointer shadow-xl flex flex-col justify-between select-none relative group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-400 uppercase tracking-wider">
                  {isFlipped ? 'Diagnosis / Key Fact (Back)' : 'Question / Landmark (Front)'}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-purple-300 transition-colors">
                  <RotateCw className="w-3 h-3" />
                  Tap to Flip
                </span>
              </div>

              <div className="py-6 text-center">
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {isFlipped ? flashcards[activeCardIndex].back : flashcards[activeCardIndex].front}
                </p>
                {!isFlipped && (
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Hint: {flashcards[activeCardIndex].hint}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span>Click anywhere on card to reveal answer</span>
              </div>
            </div>

            {/* Flashcard Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                disabled={activeCardIndex === 0}
                onClick={() => {
                  setActiveCardIndex(prev => Math.max(0, prev - 1));
                  setIsFlipped(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-bold"
              >
                Previous Card
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!masteredCards.includes(activeCardIndex)) {
                    setMasteredCards(prev => [...prev, activeCardIndex]);
                  }
                  if (activeCardIndex < flashcards.length - 1) {
                    setActiveCardIndex(prev => prev + 1);
                    setIsFlipped(false);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950"
              >
                ✓ I Know This!
              </button>

              <button
                type="button"
                disabled={activeCardIndex === flashcards.length - 1}
                onClick={() => {
                  setActiveCardIndex(prev => Math.min(flashcards.length - 1, prev + 1));
                  setIsFlipped(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-bold"
              >
                Next Card
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Continue to Step 6: Mini Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 6: Mini Quiz (2-3 questions with instant explanation) */}
      {currentStep === 'mini_quiz' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Step 6: Mini Quiz</h2>
                <p className="text-xs text-slate-400">2-3 instant checkpoint questions with full explanations</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-500/30">
              3 Questions
            </span>
          </div>

          <div className="space-y-6">
            {miniQuizQuestions.map((q, qIndex) => {
              const selectedOpt = userAnswers[qIndex];
              const hasAnswered = selectedOpt !== undefined;

              return (
                <div key={qIndex} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center justify-center font-mono">
                      Q{qIndex + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">{q.question}</h3>
                  </div>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      const isCorrect = q.correctIndex === optIndex;

                      let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80';
                      if (hasAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-300 font-bold';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => {
                            if (!hasAnswered) {
                              setUserAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
                            }
                          }}
                          className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {hasAnswered && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/70 text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-cyan-400 block">Explanation:</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Continue to Step 7: Exam Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 7: High-Yield Summary (Exam Mode) */}
      {currentStep === 'high_yield' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Step 7: High-Yield Exam Mode</h2>
                <p className="text-xs text-slate-400">OSPE station pearls, examiner traps, and what is tested in exams</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
              OSPE Ready
            </span>
          </div>

          {/* Identification Pearls */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              What Examiners Test (High-Yield Pearls):
            </span>
            <div className="space-y-2">
              {practical.identificationPoints.map((point, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-amber-400 font-bold shrink-0">★</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Common Exam Mistakes (Point Deductions to Avoid):
            </span>
            <div className="space-y-2.5">
              {practical.commonMistakes.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1 text-xs">
                  <p className="text-rose-400 font-semibold">
                    ✗ Mistake: {m.mistake}
                  </p>
                  <p className="text-emerald-400 font-medium">
                    ✓ Exam Correction: {m.correction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Step 6</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenSpotter(practical.courseId, practical.categoryId)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold border border-cyan-500/30 text-xs shadow-xs"
              >
                <Target className="w-4 h-4" />
                <span>Practice Spotter Stations</span>
              </button>

              {practical.quizId && (
                <button
                  type="button"
                  onClick={() => onOpenQuiz(practical.courseId, practical.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Start Full OSPE Exam</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
