import React from 'react';
import { LayoutDashboard, FlaskConical, Award, BarChart3, User, Bot } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAiTutor?: () => void;
  onOpenSearch?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenAiTutor,
}) => {
  const isSubjectsActive = [
    'laboratories',
    'anatomy',
    'histology',
    'biochemistry',
    'practical_detail',
    'practicals',
    'spotters',
    'histology_microscope',
    'educational_videos'
  ].includes(activeTab);

  const isExamsActive = [
    'medical_exams',
    'exam_runner',
    'exam_result',
    'quizzes',
    'quiz_runner',
    'mcq_bank'
  ].includes(activeTab);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, isActive: activeTab === 'dashboard' },
    { id: 'laboratories', label: 'Subjects', icon: FlaskConical, isActive: isSubjectsActive },
    { id: 'medical_exams', label: 'Exams', icon: Award, isActive: isExamsActive },
    { id: 'progress', label: 'Progress', icon: BarChart3, isActive: activeTab === 'progress' },
    { id: 'profile', label: 'Profile', icon: User, isActive: activeTab === 'profile' },
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-around shadow-2xl safe-area-bottom"
    >
      {navItems.map(item => {
        const Icon = item.icon;
        const active = item.isActive;

        return (
          <button
            key={item.id}
            type="button"
            id={`mobile-nav-${item.id}`}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all ${
              active
                ? 'text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-500/30 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-cyan-400 scale-110' : 'text-slate-400'} transition-transform`} />
            <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
          </button>
        );
      })}

      {onOpenAiTutor && (
        <button
          type="button"
          onClick={onOpenAiTutor}
          aria-label="Open AI Tutor"
          className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] py-1 px-2 rounded-xl text-indigo-400 hover:text-indigo-300 transition-all hover:bg-indigo-950/40"
        >
          <div className="p-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-[10px] mt-1 font-medium text-indigo-300">AI Tutor</span>
        </button>
      )}
    </nav>
  );
};

