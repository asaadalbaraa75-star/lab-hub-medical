import React, { useState } from 'react';
import {
  BIOCHEMISTRY_VISUAL_TESTS,
  BiochemistryTestCard,
  VisualBioTest
} from './BiochemistryTestCard';
import {
  FlaskConical,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Printer
} from 'lucide-react';
import { BiochemistryCertificateModal } from './BiochemistryCertificateModal';
import { BiochemistryPathwaysViewer } from './BiochemistryPathwaysViewer';

interface BiochemistryLabViewProps {
  searchQuery?: string;
  onSelectTest?: (testId: string) => void;
}

export const BiochemistryLabView: React.FC<BiochemistryLabViewProps> = ({
  searchQuery = '',
  onSelectTest
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [internalQuery, setInternalQuery] = useState<string>('');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [showPathways, setShowPathways] = useState<boolean>(false);

  if (showPathways) {
    return (
      <BiochemistryPathwaysViewer
        onBack={() => setShowPathways(false)}
      />
    );
  }

  const activeQuery = (searchQuery || internalQuery).trim().toLowerCase();

  const filteredTests = BIOCHEMISTRY_VISUAL_TESTS.filter(test => {
    if (selectedTab !== 'all' && test.id !== selectedTab) {
      return false;
    }
    if (!activeQuery) return true;
    return (
      test.titleEn.toLowerCase().includes(activeQuery) ||
      test.titleAr.toLowerCase().includes(activeQuery) ||
      test.principle.toLowerCase().includes(activeQuery) ||
      test.positiveDescAr.toLowerCase().includes(activeQuery) ||
      test.positiveDescEn.toLowerCase().includes(activeQuery) ||
      test.negativeDescAr.toLowerCase().includes(activeQuery) ||
      test.negativeDescEn.toLowerCase().includes(activeQuery) ||
      test.reagents.some(r => r.toLowerCase().includes(activeQuery))
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="biochemistry-lab-container">
      {/* Visual Navigation Bar / Test Selector Tabs */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4 sm:p-5 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#334155] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#E5E7EB] tracking-tight">
                الاختبارات النوعية للكربوهيدرات
              </h2>
              <p className="text-[11px] sm:text-xs text-[#94A3B8] font-mono">
                Carbohydrate Qualitative Identification Tests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => setShowPathways(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>مسارات الأيض والتحاليل (Pathways & Assays)</span>
            </button>

            <button
              onClick={() => setIsCertificateOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>شهادة إتمام المعمل (Certificate)</span>
            </button>
            <span className="text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl font-semibold">
              6 اختبارات معتمدة
            </span>
          </div>
        </div>

        {/* Test Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            id="tab-bio-all"
            onClick={() => setSelectedTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedTab === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#E5E7EB] border border-[#334155]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>عرض جميع الاختبارات (All Tests)</span>
          </button>

          {BIOCHEMISTRY_VISUAL_TESTS.map(test => {
            const isCurrent = selectedTab === test.id;
            return (
              <button
                key={test.id}
                type="button"
                id={`tab-bio-${test.id}`}
                onClick={() => setSelectedTab(test.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#E5E7EB] border border-[#334155]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">0{test.testNumber}</span>
                <span>{test.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Scientific Summary Table for 3-second at-a-glance learning */}
      {selectedTab === 'all' && !activeQuery && (
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#334155] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm sm:text-base font-bold text-[#E5E7EB]">
                ملخص المقارنة السريعة للاختبارات (QUICK RECAP AT A GLANCE)
              </h3>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-mono">
              3-Second Visual Reference
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-[#E5E7EB] border-collapse">
              <thead>
                <tr className="bg-[#0F172A] border-b border-[#334155] text-[#94A3B8]">
                  <th className="p-3 text-right font-bold">الاختبار (Test)</th>
                  <th className="p-3 text-right font-bold">الكاشف (Reagent)</th>
                  <th className="p-3 text-right font-bold text-emerald-400">النتيجة الإيجابية (Positive)</th>
                  <th className="p-3 text-right font-bold text-slate-400">النتيجة السلبية (Negative)</th>
                  <th className="p-3 text-right font-bold">الكشف عن (Target)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]/60 font-medium">
                {BIOCHEMISTRY_VISUAL_TESTS.map(t => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTab(t.id)}
                    className="hover:bg-[#0F172A]/70 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-bold text-amber-300">
                      <span className="font-mono text-slate-500 mr-1.5">0{t.testNumber}.</span>
                      {t.titleEn}
                    </td>
                    <td className="p-3 text-[#CBD5E1] font-mono text-[11px]">
                      {t.reagents[0]}
                    </td>
                    <td className="p-3 text-emerald-300">
                      {t.positiveDescAr}
                    </td>
                    <td className="p-3 text-slate-400">
                      {t.negativeDescAr}
                    </td>
                    <td className="p-3 text-sky-300 font-semibold text-[11px]">
                      {t.positiveTarget}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Visual Test Cards List */}
      <div className="space-y-8" id="biochemistry-visual-cards-list">
        {filteredTests.length === 0 ? (
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8 text-center space-y-3">
            <FlaskConical className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-[#E5E7EB]">
              لا توجد اختبارات تطابق البحث
            </h3>
            <p className="text-xs text-[#94A3B8]">
              جرب البحث عن اسم الاختبار، الكاشف، أو النتيجة.
            </p>
          </div>
        ) : (
          filteredTests.map(test => (
            <BiochemistryTestCard
              key={test.id}
              test={test}
              isActive={selectedTab === test.id}
              onSelect={() => setSelectedTab(test.id)}
            />
          ))
        )}
      </div>

      {/* Biochemistry Completion Certificate Modal */}
      <BiochemistryCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        scorePercentage={100}
      />
    </div>
  );
};
