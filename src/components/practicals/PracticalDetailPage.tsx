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
  Download,
  Share2,
  ChevronLeft,
  Sparkles,
  Info,
  Layers,
  HelpCircle,
  CheckSquare,
  Target,
  ExternalLink,
  Lock
} from 'lucide-react';

interface PracticalDetailPageProps {
  practical: Practical;
  progress: StudentProgress;
  onToggleComplete: (practicalId: string) => void;
  onOpenQuiz: (labId: LabSubjectId, practicalId?: string) => void;
  onOpenSpotter: (labId: LabSubjectId, categoryId?: string) => void;
  onBack: () => void;
}

export const PracticalDetailPage: React.FC<PracticalDetailPageProps> = ({
  practical,
  progress,
  onToggleComplete,
  onOpenQuiz,
  onOpenSpotter,
  onBack
}) => {
  const isCompleted = progress.completedPracticals.includes(practical.id);
  const [activeTab, setActiveTab] = useState<'content' | 'interactive' | 'procedure' | 'clinical'>('content');

  const courseNames: Record<string, string> = {
    anatomy: 'Anatomy Lab',
    histology: 'Histology Lab',
    bacteriology: 'Bacteriology Lab'
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16" id={`practical-page-${practical.id}`}>
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-[#E2E8F0] text-xs font-semibold text-slate-700 transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {courseNames[practical.courseId] || 'Lab'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Mark Complete Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(practical.id)}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-xs ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-[#E2E8F0]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark Practical Complete</span>
              </>
            )}
          </button>

          {/* Quick Quiz CTA */}
          {practical.quizId && (
            <button
              type="button"
              onClick={() => onOpenQuiz(practical.courseId, practical.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Take Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Practical Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              {courseNames[practical.courseId]} • Practical {String(practical.practicalNumber).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              {practical.estimatedTime}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-[#E2E8F0] font-mono">
              Version {practical.version}
            </span>
            <span>Last Updated: {practical.lastUpdated}</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {practical.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1 leading-relaxed">
            {practical.subTitle}
          </p>
        </div>

        {/* Academic Approval Metadata Badge */}
        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-slate-900 font-medium">Author: {practical.authorName}</span>
            <span>({practical.authorRole})</span>
          </div>
          {practical.approvedBy && (
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Approved by {practical.approvedBy} ({practical.approvalDate})</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Primary Column (Sections 1-7) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Section 1: Learning Objectives */}
          <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-4" id="section-objectives">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E2E8F0]">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Learning Objectives</h2>
                <p className="text-[11px] text-slate-500">
                  By the end of this practical, the student should be able to:
                </p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {practical.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-indigo-600 border border-[#E2E8F0] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: Before The Lab */}
          <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-4" id="section-before-lab">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E2E8F0]">
              <div className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-100">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Before the Lab</h2>
                <p className="text-[11px] text-slate-500">Prerequisites & Recommended Readings</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-[#E2E8F0] space-y-1.5">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Core Theoretical Summary:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {practical.beforeTheLab.preLabSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] font-bold text-slate-900 block">
                    Required Prior Knowledge:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {practical.beforeTheLab.previousKnowledge.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] font-bold text-slate-900 block">
                    Recommended Reading:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {practical.beforeTheLab.recommendedReading.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Interactive Slide Viewer */}
          {practical.interactiveImages && practical.interactiveImages.length > 0 && (
            <section className="space-y-3" id="section-interactive-images">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Target className="w-4 h-4" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    6. Interactive Slide & Structure Viewer
                  </h2>
                </div>
                <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 font-mono font-bold">
                  {practical.interactiveImages[0].pins.length} Pin Landmarks
                </span>
              </div>

              <InteractiveSlideViewer interactiveImage={practical.interactiveImages[0]} />
            </section>
          )}

          {/* Section 4: Step-by-Step Procedure */}
          <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-4" id="section-procedure">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E2E8F0]">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Step-by-Step Procedure</h2>
                <p className="text-[11px] text-slate-500">Approved Academic Protocol & Observation Stages</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {practical.procedure.map(step => (
                <div
                  key={step.stepNumber}
                  className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-[#E2E8F0] space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-xs shadow-xs">
                      Step {step.stepNumber}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                    {step.description}
                  </p>

                  {step.cautionNote && (
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-xs text-amber-800 font-medium">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>{step.cautionNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: High-Res Medical Images */}
          {practical.images && practical.images.length > 0 && (
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-4" id="section-images">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#E2E8F0]">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">5. High-Resolution Slides & Specimens</h2>
                  <p className="text-[11px] text-slate-500">Reference images for morphological study</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {practical.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 rounded-xl overflow-hidden border border-[#E2E8F0] group shadow-xs"
                  >
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 border border-white/40 shadow-xs">
                        {img.magnification || img.stainOrView}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 7: Video Demonstration */}
          {practical.videoLecture && (
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-4" id="section-video">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">7. Laboratory Video Demonstration</h2>
                    <p className="text-[11px] text-slate-500">By {practical.videoLecture.instructorName}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 font-bold">
                  Duration: {practical.videoLecture.duration}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-[#E2E8F0] aspect-video flex items-center justify-center group shadow-xs">
                <img
                  src={practical.videoLecture.thumbnail}
                  alt={practical.videoLecture.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-slate-950/30 flex flex-col items-center justify-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-bold text-white drop-shadow-xs">
                    {practical.videoLecture.title}
                  </span>
                </div>
              </div>

              {/* Chapters */}
              <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Video Chapters:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {practical.videoLecture.chapters.map((ch, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="font-mono text-indigo-600 font-semibold">{ch.time}</span>
                      <span className="text-slate-800 font-medium">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Secondary Column (Sections 3, 8-13) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section 8: Key Identification Points (Pearls) */}
          <div className="bg-white border-2 border-indigo-100 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                8. High-Yield Identification Pearls
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              {practical.identificationPoints.map((point, idx) => (
                <li key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0] flex items-start gap-2">
                  <span className="text-indigo-600 font-bold shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 9: Common Mistakes */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                9. Common Exam Mistakes
              </h3>
            </div>
            <div className="space-y-2.5">
              {practical.commonMistakes.map((m, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-[#E2E8F0] space-y-1">
                  <p className="text-xs font-semibold text-rose-700">
                    ✗ Mistake: {m.mistake}
                  </p>
                  <p className="text-xs text-emerald-700">
                    ✓ Correction: {m.correction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 10: Clinical Correlation */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-700">
              <Activity className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                10. Clinical Correlation
              </h3>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-[#E2E8F0] space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">
                {practical.clinicalCorrelation.condition}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {practical.clinicalCorrelation.pathophysiology}
              </p>
              <div className="pt-1 text-teal-700 font-medium">
                <strong>Diagnostic Pearl:</strong> {practical.clinicalCorrelation.diagnosticPearls}
              </div>
            </div>
          </div>

          {/* Section 3: Required Equipment */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Layers className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                3. Required Equipment
              </h3>
            </div>
            <div className="space-y-2.5">
              {practical.equipment.map(eq => (
                <div key={eq.id} className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{eq.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{eq.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 11: Safety Protocol */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                11. Safety & Biosafety SOP
              </h3>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-[#E2E8F0] space-y-2 text-xs">
              <div className="font-mono text-amber-700 font-bold">
                {practical.safety.biosafetyLevel}
              </div>
              <div className="text-slate-600">
                <strong>Required PPE:</strong> {practical.safety.ppeRequired.join(', ')}
              </div>
              <div className="text-[11px] text-slate-500 border-t border-[#E2E8F0] pt-1">
                <strong>Emergency Protocol:</strong> {practical.safety.emergencyProtocol}
              </div>
            </div>
          </div>

          {/* Section 12: Academic References */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                12. References & Textbooks
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              {practical.references.map((ref, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
                  <p className="font-semibold text-slate-900">{ref.title}</p>
                  <p className="text-[11px] text-slate-500">{ref.authors} • {ref.editionOrYear} ({ref.pages})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 13: Practical Assessment CTAs */}
          <div className="bg-white border-2 border-teal-100 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-700">
              <CheckSquare className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                13. Practical Assessment
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Test your knowledge with the official timed quiz and spotter identification questions.
            </p>
            <div className="space-y-2 pt-1">
              {practical.quizId && (
                <button
                  type="button"
                  onClick={() => onOpenQuiz(practical.courseId, practical.id)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-all shadow-xs"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Start Practical Quiz</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onOpenSpotter(practical.courseId, practical.categoryId)}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-teal-700 font-semibold py-2.5 px-4 rounded-lg border border-teal-200 text-xs transition-all shadow-xs"
              >
                <Target className="w-4 h-4" />
                <span>Practice Spotter Stations</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
