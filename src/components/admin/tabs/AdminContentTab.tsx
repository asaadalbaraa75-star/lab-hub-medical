import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Search,
  Filter,
  Eye,
  FileText,
  Save,
  X
} from 'lucide-react';
import { Practical, PracticalStatus, User, LabSubjectId } from '../../../types';
import { storageService } from '../../../services/storageService';

interface Props {
  currentUser: User;
  onSelectLab?: (labId: LabSubjectId) => void;
  onOpenPractical?: (labId: string, practicalId: string) => void;
}

export const AdminContentTab: React.FC<Props> = ({
  currentUser,
  onSelectLab,
  onOpenPractical
}) => {
  const [practicals, setPracticals] = useState<Practical[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPractical, setEditingPractical] = useState<Practical | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formSubject, setFormSubject] = useState<LabSubjectId>('anatomy');
  const [formTitle, setFormTitle] = useState('');
  const [formSubTitle, setFormSubTitle] = useState('');
  const [formTime, setFormTime] = useState('45 min');
  const [formObjectives, setFormObjectives] = useState('');
  const [formClinical, setFormClinical] = useState('');
  const [formSummary, setFormSummary] = useState('');

  const loadPracticals = () => {
    const list = storageService.getPracticals();
    setPracticals(list);
  };

  useEffect(() => {
    loadPracticals();
  }, []);

  const filteredPracticals = practicals.filter(p => {
    const matchesSubject = selectedSubject === 'all' || p.courseId === selectedSubject;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.subTitle && p.subTitle.toLowerCase().includes(q)) ||
      (p.learningObjectives && p.learningObjectives.some(o => o.toLowerCase().includes(q)));
    return matchesSubject && matchesSearch;
  });

  const handleTogglePublish = (p: Practical) => {
    const newStatus: PracticalStatus = p.status === 'published' ? 'draft' : 'published';
    storageService.updatePracticalStatus(
      p.id,
      newStatus,
      currentUser.name,
      newStatus === 'published' ? 'Approved by Admin' : 'Unpublished by Admin',
      currentUser
    );
    loadPracticals();
  };

  const handleOpenAdd = () => {
    setEditingPractical(null);
    setFormSubject(selectedSubject === 'all' ? 'anatomy' : (selectedSubject as LabSubjectId));
    setFormTitle('');
    setFormSubTitle('Core Clinical Laboratory Protocol');
    setFormTime('45 min');
    setFormObjectives('');
    setFormClinical('');
    setFormSummary('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Practical) => {
    setEditingPractical(p);
    setFormSubject(p.courseId);
    setFormTitle(p.title);
    setFormSubTitle(p.subTitle || '');
    setFormTime(p.estimatedTime || '45 min');
    setFormObjectives(p.learningObjectives ? p.learningObjectives.join('\n') : '');
    setFormClinical(p.clinicalCorrelation ? p.clinicalCorrelation.diagnosticPearls || p.clinicalCorrelation.condition : '');
    setFormSummary(p.beforeTheLab ? p.beforeTheLab.preLabSummary || '' : '');
    setIsAddModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const objectivesArray = formObjectives
      .split('\n')
      .map(o => o.trim())
      .filter(Boolean);

    if (editingPractical) {
      // Edit existing
      const updated: Practical = {
        ...editingPractical,
        title: formTitle.trim(),
        subTitle: formSubTitle.trim() || editingPractical.subTitle,
        courseId: formSubject,
        estimatedTime: formTime.trim(),
        lastUpdated: new Date().toISOString().split('T')[0],
        learningObjectives: objectivesArray.length > 0 ? objectivesArray : editingPractical.learningObjectives,
        clinicalCorrelation: {
          ...editingPractical.clinicalCorrelation,
          diagnosticPearls: formClinical.trim() || editingPractical.clinicalCorrelation?.diagnosticPearls || '',
          condition: formClinical.trim() ? 'Clinical Case Correlation' : (editingPractical.clinicalCorrelation?.condition || 'General')
        },
        beforeTheLab: {
          ...editingPractical.beforeTheLab,
          preLabSummary: formSummary.trim() || editingPractical.beforeTheLab?.preLabSummary || ''
        }
      };
      storageService.savePractical(updated, currentUser);
    } else {
      // Create new
      const newPractical: Practical = {
        id: `prac_${formSubject}_${Date.now().toString(36)}`,
        courseId: formSubject,
        categoryId: `cat_${formSubject}`,
        practicalNumber: practicals.filter(p => p.courseId === formSubject).length + 1,
        title: formTitle.trim(),
        subTitle: formSubTitle.trim() || 'Hands-on Clinical Dissection & Diagnostic Lab',
        estimatedTime: formTime.trim() || '45 min',
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'published',
        authorName: currentUser.name,
        authorRole: 'Chief Academic Administrator',
        learningObjectives: objectivesArray.length > 0 ? objectivesArray : ['Demonstrate practical mastery of laboratory protocol.'],
        beforeTheLab: {
          previousKnowledge: ['Basic physiological and anatomical foundations.'],
          recommendedReading: ['Medical Curriculum Chapter 4.'],
          preparationChecklist: [{ id: 'chk_1', text: 'Review anatomical diagrams and stain procedures.' }],
          preLabSummary: formSummary.trim() || 'Essential preparatory laboratory overview.'
        },
        equipment: [],
        procedure: [
          {
            stepNumber: 1,
            title: 'Preparation & Safety Checks',
            description: 'Wear standard PPE and calibrate lab equipment.'
          }
        ],
        images: [],
        interactiveImages: [],
        identificationPoints: ['Key structural diagnostic features.'],
        commonMistakes: [],
        clinicalCorrelation: {
          condition: 'Clinical Application',
          pathophysiology: 'Diagnostic relevance in hospital and pathology practice.',
          clinicalPresentation: 'Clinical symptoms and correlation.',
          diagnosticPearls: formClinical.trim() || 'Key takeaway for medical board examination.'
        },
        safety: {
          biosafetyLevel: 'BSL-1 / Standard Lab',
          hazards: ['Sharp instruments', 'Chemical reagents'],
          ppeRequired: ['Gloves', 'Lab Coat', 'Safety Goggles'],
          emergencyProtocol: 'Report immediately to the laboratory supervisor.'
        },
        references: [],
        approvedBy: currentUser.name,
        approvalDate: new Date().toISOString()
      };
      storageService.savePractical(newPractical, currentUser);
    }

    setIsAddModalOpen(false);
    loadPracticals();
  };

  const handleDelete = (id: string) => {
    storageService.deletePractical(id, currentUser);
    setDeleteConfirmId(null);
    loadPracticals();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            إدارة المحتوى المعملي الأكاديمي (Educational Content Management)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            إضافة وتعديل وحذف ونشر الدروس المعملية عبر أقسام: التشريح، الأنسجة، البكتيريا، والكيمياء الحيوية
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة درس معملي جديد (Add Practical)</span>
        </button>
      </div>

      {/* Discipline Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-[#E2E8F0]">
        {[
          { id: 'all', label: 'جميع المعامل' },
          { id: 'anatomy', label: '🫀 التشريح (Anatomy)' },
          { id: 'histology', label: '🔬 الأنسجة (Histology)' },
          { id: 'biochemistry', label: '🧪 الكيمياء الحيوية (Biochemistry)' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedSubject(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedSubject === tab.id
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="البحث في الدروس بالعنوان، الموضوع، أو الأهداف التعليمية..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pr-10 pl-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Table of Practicals */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-slate-700">
          <span>قائمة الدروس المعملية المعتمدة ({filteredPracticals.length})</span>
          <span className="text-[11px] text-slate-400 font-normal">متزامن مع قاعدة بيانات المنصة</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3.5">عنوان الدرس (Practical Title)</th>
                <th className="px-4 py-3.5">المعمل / القسم</th>
                <th className="px-4 py-3.5">الرقم التعريفي</th>
                <th className="px-4 py-3.5">المدة التقديرية</th>
                <th className="px-4 py-3.5 text-center">حالة النشر</th>
                <th className="px-4 py-3.5 text-center">إجراءات الإدارة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredPracticals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    لا توجد دروس معملية مسجلة في هذا القسم. انقر على "إضافة درس معملي جديد" لإنشاء درس.
                  </td>
                </tr>
              ) : (
                filteredPracticals.map(p => {
                  const isPublished = p.status === 'published' || p.status === 'approved';

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900">{p.title}</div>
                        {p.subTitle && (
                          <div className="text-[10px] text-slate-400 truncate max-w-md mt-0.5">
                            {p.subTitle}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          p.courseId === 'anatomy' ? 'bg-indigo-50 text-indigo-700' :
                          p.courseId === 'histology' ? 'bg-emerald-50 text-emerald-700' :
                          'bg-cyan-50 text-cyan-700'
                        }`}>
                          {p.courseId.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-600">
                        #{p.practicalNumber || 1}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                        {p.estimatedTime || '45 min'}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {isPublished ? 'منشور (Published)' : 'مسودة (Draft)'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* Toggle Publish */}
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(p)}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border transition-colors ${
                              isPublished
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            }`}
                            title={isPublished ? 'إلغاء النشر وتحويل لمسودة' : 'نشر الدرس للطلاب'}
                          >
                            {isPublished ? 'إلغاء النشر' : 'نشر'}
                          </button>

                          {/* Open Practical */}
                          {onOpenPractical && (
                            <button
                              type="button"
                              onClick={() => onOpenPractical(p.courseId, p.id)}
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                              title="معاينة في وضع الطالب"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                            title="تعديل محتوى الدرس"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                            title="حذف الدرس"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 text-right my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingPractical ? 'تعديل بيانات الدرس المعملي' : 'إنشاء درس عملي جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">القسم المعملي (Discipline)</label>
                  <select
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value as LabSubjectId)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800"
                  >
                    <option value="anatomy">Anatomy (التشريح)</option>
                    <option value="histology">Histology (الأنسجة)</option>
                    <option value="biochemistry">Biochemistry (الكيمياء الحيوية)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">المدة التقديرية (Duration)</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    placeholder="e.g. 45 min"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان الدرس العملي (Title) *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. Cranial Nerves Dissection & Clinical Exam"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">العنوان الفرعي والوصف الموجز (Subtitle)</label>
                <input
                  type="text"
                  value={formSubTitle}
                  onChange={e => setFormSubTitle(e.target.value)}
                  placeholder="e.g. Comprehensive hands-on dissection protocol"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الأهداف التعليمية (سجل كل هدف في سطر)</label>
                <textarea
                  rows={3}
                  value={formObjectives}
                  onChange={e => setFormObjectives(e.target.value)}
                  placeholder="Identify exit foramina&#10;Examine motor and sensory components&#10;Correlate with cranial neuropathies"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الأهمية والارتباط السريري (Clinical Correlation)</label>
                <textarea
                  rows={2}
                  value={formClinical}
                  onChange={e => setFormClinical(e.target.value)}
                  placeholder="High-yield board examination points, clinical case pearls..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ملخص ما قبل المعمل (Pre-Lab Overview)</label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={e => setFormSummary(e.target.value)}
                  placeholder="Essential instructions for students before entering the lab..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm"
                >
                  حفظ وتطبيق الدرس
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 text-right">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              تأكيد حذف الدرس العملي
            </h3>
            <p className="text-xs text-slate-600">
              هل أنت متأكد من حذف هذا الدرس العملي نهائياً من قاعدة بيانات المنصة؟
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors"
              >
                نعم، احذف الدرس
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
