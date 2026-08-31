import React from 'react';
import { LayoutDashboard, FlaskConical, Calendar, Bot, Award } from 'lucide-react';

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
  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'laboratories', label: 'المعامل', icon: FlaskConical },
    { id: 'medical_exams', label: 'الامتحانات', icon: Award },
    { id: 'ai_tutor', label: 'AI Tutor', icon: Bot, isTutor: true },
    { id: 'progress', label: 'التقدم', icon: Calendar }
  ];

  return (
    <div
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E2E8F0] px-2 py-2 flex items-center justify-around shadow-lg"
    >
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || (item.id === 'laboratories' && ['anatomy', 'histology', 'bacteriology', 'biochemistry'].includes(activeTab));

        if (item.isTutor) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={onOpenAiTutor}
              className="flex flex-col items-center gap-1 p-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <div className="p-1 rounded-lg bg-indigo-50 border border-indigo-200 shadow-2xs">
                <Icon className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-[10px] font-bold text-indigo-600">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
