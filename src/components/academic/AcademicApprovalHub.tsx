import React, { useState } from 'react';
import { Practical, User, ApprovalWorkflowState } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileEdit,
  Eye,
  Send,
  MessageSquare,
  Lock,
  ArrowRight,
  BookOpen,
  Plus
} from 'lucide-react';

interface AcademicApprovalHubProps {
  currentUser: User;
  practicals: Practical[];
  onUpdatePracticalStatus: (practicalId: string, status: ApprovalWorkflowState, comment?: string) => void;
  onViewPractical: (labId: string, practicalId: string) => void;
}

export const AcademicApprovalHub: React.FC<AcademicApprovalHubProps> = ({
  currentUser,
  practicals = [],
  onUpdatePracticalStatus,
  onViewPractical
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [activeModalPractical, setActiveModalPractical] = useState<Practical | null>(null);
  const [revisionNotes, setRevisionNotes] = useState('');

  const safePracticals = Array.isArray(practicals) ? practicals : [];

  const filteredPracticals = safePracticals.filter(p => {
    if (selectedStatusFilter === 'all') return true;
    return p.status === selectedStatusFilter;
  });

  const departmentHeads = [
    {
      dept: 'Department of Anatomy',
      head: 'Prof. Eleanor Vance, MD, PhD',
      status: 'Active Reviewer',
      practicalsCount: safePracticals.filter(p => p.courseId === 'anatomy').length
    },
    {
      dept: 'Department of Histology & Cell Biology',
      head: 'Dr. Marcus Sterling, FRCPath',
      status: 'Active Reviewer',
      practicalsCount: safePracticals.filter(p => p.courseId === 'histology').length
    },
    {
      dept: 'Department of Clinical Biochemistry',
      head: 'Dr. Tariq Vance, MD, MSc',
      status: 'Active Reviewer',
      practicalsCount: safePracticals.filter(p => p.courseId === 'biochemistry').length
    }
  ];

  const handleApprove = (practicalId: string) => {
    onUpdatePracticalStatus(practicalId, 'published', `Approved by ${currentUser.name}`);
    setActiveModalPractical(null);
  };

  const handleRequestRevision = (practicalId: string) => {
    if (!revisionNotes.trim()) return;
    onUpdatePracticalStatus(practicalId, 'revision_requested', revisionNotes);
    setRevisionNotes('');
    setActiveModalPractical(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="academic-approval-hub">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase border border-indigo-100">
              Faculty Directorate
            </span>
            <span className="text-xs text-slate-500 font-medium">Curriculum Accreditation & Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            ACADEMIC CONTENT APPROVAL HUB
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Quality assurance, syllabus verification, and peer review workflow for medical laboratory practicals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-teal-700 font-bold shadow-xs">
            Role: {currentUser.role === 'admin' ? 'Curriculum Dean' : currentUser.role === 'instructor' ? 'Faculty Reviewer' : 'Student (Read-Only Mode)'}
          </span>
        </div>
      </div>

      {/* Department Heads Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departmentHeads.map((dept, idx) => (
          <div key={idx} className="bg-white border border-[#E2E8F0] p-5 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700">{dept.dept}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{dept.head}</h3>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-[#E2E8F0] font-medium">
              <span>{dept.practicalsCount} Practicals Managed</span>
              <span className="text-emerald-700 font-bold">{dept.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'published', 'under_review', 'revision_requested', 'draft'].map(filter => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelectedStatusFilter(filter)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors uppercase shadow-xs ${
              selectedStatusFilter === filter
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            {filter.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Practical Review Table / Cards */}
      <div className="space-y-3.5">
        {filteredPracticals.map(practical => {
          const statusBadgeConfig = {
            published: { label: 'Published / Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            approved: { label: 'Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            under_review: { label: 'Under Review', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
            revision_requested: { label: 'Revision Requested', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
            draft: { label: 'Draft', bg: 'bg-slate-100 text-slate-600 border-[#E2E8F0]' }
          }[practical.status] || { label: practical.status, bg: 'bg-slate-100 text-slate-700 border-[#E2E8F0]' };

          return (
            <div
              key={practical.id}
              className="bg-white border border-[#E2E8F0] hover:border-indigo-300 p-5 rounded-xl shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase ${statusBadgeConfig.bg}`}>
                    {statusBadgeConfig.label}
                  </span>
                  <span className="text-xs font-mono text-teal-700 font-bold">
                    {practical.courseId.toUpperCase()} • Practical {String(practical.practicalNumber).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">v{practical.version}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {practical.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Author: <span className="text-slate-700 font-semibold">{practical.authorName}</span> ({practical.authorRole}) • Last Modified: {practical.lastUpdated}
                </p>
                {practical.approvedBy && (
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Endorsed by {practical.approvedBy} on {practical.approvalDate}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onViewPractical(practical.courseId, practical.id)}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-[#E2E8F0] text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

                {(currentUser.role === 'admin' || currentUser.role === 'instructor') && (
                  <button
                    type="button"
                    onClick={() => setActiveModalPractical(practical)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Review & Actions</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Review & Approval Modal */}
      {activeModalPractical && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono text-indigo-600 font-bold uppercase">
                  Faculty Review Action
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeModalPractical.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPractical(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                As an accredited faculty reviewer ({currentUser.name}), confirm academic rigor, anatomical/microbial accuracy, and biosafety protocols before publishing.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900">
                  Reviewer Feedback / Revision Notes (Optional for Approval):
                </label>
                <textarea
                  value={revisionNotes}
                  onChange={e => setRevisionNotes(e.target.value)}
                  placeholder="E.g., Ensure BSL-2 autoclaving details are expanded in Section 11..."
                  className="w-full h-24 bg-slate-50 border border-[#E2E8F0] focus:border-indigo-500 focus:bg-white rounded-lg p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setActiveModalPractical(null)}
                className="px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-slate-600 text-xs font-semibold hover:bg-slate-50 shadow-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleRequestRevision(activeModalPractical.id)}
                disabled={!revisionNotes.trim()}
                className="px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 disabled:opacity-40 text-rose-700 border border-rose-200 text-xs font-bold inline-flex items-center gap-1 shadow-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Request Revision</span>
              </button>

              <button
                type="button"
                onClick={() => handleApprove(activeModalPractical.id)}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Publish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
