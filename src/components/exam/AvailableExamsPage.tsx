import React, { useState } from 'react';
import { MedicalExam, LabSubjectId } from '../../types';
import { storageService } from '../../services/storageService';
import {
  Bone,
  Microscope,
  FlaskConical,
  GraduationCap,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Filter,
  Search,
  BookOpen,
  BarChart2,
  ShieldAlert,
  Layers
} from 'lucide-react';

interface AvailableExamsPageProps {
  exams?: MedicalExam[];
  onStartExam: (exam: MedicalExam) => void;
  onOpenLab?: (labId: LabSubjectId) => void;
  onOpenTeacherDashboard?: () => void;
}

export const AvailableExamsPage: React.FC<AvailableExamsPageProps> = ({
  exams: passedExams,
  onStartExam,
  onOpenLab,
  onOpenTeacherDashboard
}) => {
  const exams = passedExams || storageService.getMedicalExams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredExams = exams.filter(exam => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'mixed' && exam.labId === 'mixed') ||
      exam.labId === selectedCategory;

    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.titleArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getLabBadge = (labId: string) => {
    switch (labId) {
      case 'anatomy':
        return { label: 'Anatomy Lab (معمل التشريح)', icon: Bone, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
      case 'histology':
        return { label: 'Histology Lab (معمل الأنسجة)', icon: Microscope, color: 'text-teal-700 bg-teal-50 border-teal-200' };
      case 'biochemistry':
        return { label: 'Biochemistry Lab (معمل الكيمياء الحيوية)', icon: FlaskConical, color: 'text-amber-700 bg-amber-50 border-amber-200' };
      default:
        return { label: 'Integrated Medical OSPE (امتحان شامل)', icon: GraduationCap, color: 'text-purple-700 bg-purple-50 border-purple-200' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="available-exams-catalog">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive OSPE Practical Stations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
            الاختبارات العملية الطبية (Medical Practical Exams)
          </h1>
          <p className="text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
            محاكاة حقيقية لاختبارات المحطات العملية (OSPE) لطلاب السنة الأولى في كليات الطب البشري، مع توقيت إلكتروني، صور عينات مجهرية وتشريحية، وتقييم فوري.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
            <div className="text-2xl font-black font-mono text-indigo-300">{exams.length}</div>
            <div className="text-xs text-slate-300 font-medium">امتحانات متاحة</div>
          </div>
          {onOpenTeacherDashboard && (
            <button
              type="button"
              onClick={onOpenTeacherDashboard}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>لوحة الأستاذ والأسئلة</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            جميع الاختبارات
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('anatomy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'anatomy'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bone className="w-3.5 h-3.5" />
            <span>Anatomy Lab</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('histology')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'histology'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Histology Lab</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('biochemistry')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'biochemistry'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Biochemistry Lab</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('mixed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'mixed'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Integrated OSPE</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="بحث في أسماء الاختبارات..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
          />
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map(exam => {
          const badge = getLabBadge(exam.labId);
          const Icon = badge.icon;
          const questionsCount = exam.questions?.length || exam.questionIds.length;

          return (
            <div
              key={exam.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Lab Badge & Difficulty */}
                <div className="flex items-center justify-between gap-2">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </div>

                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                    {exam.difficulty.replace('_', ' ')}
                  </span>
                </div>

                {/* Exam Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {exam.titleArabic || exam.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500">{exam.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {exam.description}
                  </p>
                </div>

                {/* Examination Meta Specs */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">الزمن</span>
                    <span className="text-xs font-black font-mono text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      {exam.timeLimitMinutes} دقيقة
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">عدد المحطات</span>
                    <span className="text-xs font-black font-mono text-slate-800 block mt-0.5">
                      {questionsCount} أسئلة
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">نسبة النجاح</span>
                    <span className="text-xs font-black font-mono text-emerald-700 block mt-0.5">
                      {exam.passingScorePercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Start Exam Button */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-500">
                  إعداد: <span className="text-slate-700">{exam.authorName}</span>
                </span>

                <button
                  type="button"
                  onClick={() => onStartExam(exam)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 group-hover:bg-indigo-700"
                >
                  <span>بدء الامتحان العملي</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">لا توجد اختبارات تطابق البحث</h3>
          <p className="text-xs text-slate-500">جرّب تغيير فئة المعمل أو كلمة البحث.</p>
        </div>
      )}
    </div>
  );
};
