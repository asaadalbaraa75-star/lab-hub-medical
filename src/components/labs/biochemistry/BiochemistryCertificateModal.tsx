import React, { useState, useRef } from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Sparkles, 
  Calendar, 
  User, 
  Building2 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultStudentName?: string;
  scorePercentage?: number;
}

export const BiochemistryCertificateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultStudentName = 'Medical Student',
  scorePercentage = 95
}) => {
  const [studentName, setStudentName] = useState<string>(defaultStudentName);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Generate deterministic/consistent ID
  const [certId] = useState<string>(() => {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `LH-BIO-2026-${randomHex}`;
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Biochemistry Laboratory Certificate</h3>
              <p className="text-xs text-slate-400">Verified Medical Student Completion Credential</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center space-x-1.5 shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customizable Name Input */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
            <User className="w-4 h-4 text-sky-400" />
            <span>Recipient Name:</span>
          </span>
          <input
            type="text"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            placeholder="Enter Student Full Name..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* 2. THE OFFICIAL CERTIFICATE CANVAS */}
        <div 
          ref={certificateRef}
          id="printable-biochemistry-certificate"
          className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-8 sm:p-12 rounded-3xl border-4 border-amber-500/60 shadow-2xl overflow-hidden"
        >
          {/* Ornate Gold Border Outline */}
          <div className="absolute inset-3 border border-amber-400/30 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 border border-dashed border-amber-400/20 rounded-xl pointer-events-none" />

          {/* Subtle Watermark in Center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-amber-400" />
          </div>

          <div className="relative z-10 text-center space-y-6">
            
            {/* Header / Crest */}
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xl shadow-xl shadow-amber-500/20 mx-auto mb-2">
                LH
              </div>
              <h4 className="text-xs tracking-[0.25em] font-extrabold uppercase text-amber-400">
                LAB HUB MEDICAL EDUCATION PLATFORM
              </h4>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide">
                CERTIFICATE OF COMPLETION
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-light">
                This academic verification certifies that
              </p>
            </div>

            {/* Recipient Full Name */}
            <div className="py-2 border-b-2 border-amber-500/40 inline-block min-w-[280px]">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                {studentName || 'Medical Student'}
              </h2>
            </div>

            {/* Completion Description */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              has successfully completed all practical modules, bench protocols, carbohydrate identification assays (Molisch, Benedict, Barfoed, Seliwanoff, Iodine, Fehling), and practical examinations for
            </p>

            <div className="inline-block px-6 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-bold text-sm sm:text-base tracking-wide">
              Medical Biochemistry Practical Laboratory
            </div>

            {/* Performance Stats & Date */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto pt-4 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">Performance Grade</span>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">{scorePercentage}% (Distinction)</p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">Date of Issue</span>
                <p className="text-sm font-bold text-slate-200 mt-0.5">{currentDate}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">Certificate ID</span>
                <p className="text-xs font-mono font-bold text-amber-400 mt-0.5">{certId}</p>
              </div>
            </div>

            {/* Signatures & Security Stamp */}
            <div className="pt-8 flex flex-wrap items-end justify-between gap-6 border-t border-slate-800/80 max-w-2xl mx-auto">
              
              {/* Supervisor Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-lg text-amber-300">
                  سكينة أسعد
                </div>
                <div className="w-36 h-0.5 bg-slate-700 mx-auto" />
                <p className="text-[11px] font-bold text-slate-200">سكينة أسعد</p>
                <p className="text-[10px] text-slate-400">Educational Supervisor & Content Lead</p>
              </div>

              {/* Security Seal */}
              <div className="w-20 h-20 rounded-full border-2 border-amber-400/60 bg-amber-500/10 flex flex-col items-center justify-center p-1 text-center shadow-lg shadow-amber-500/10 mx-auto sm:mx-0">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <span className="text-[8px] font-black uppercase text-amber-300 tracking-wider">LAB HUB VERIFIED</span>
              </div>

              {/* Academic Director */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-lg text-slate-200">
                  Academic Board
                </div>
                <div className="w-36 h-0.5 bg-slate-700 mx-auto" />
                <p className="text-[11px] font-bold text-slate-200">LAB HUB Academic Review</p>
                <p className="text-[10px] text-slate-400">Medical Curriculum Committee</p>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-slate-500 pt-2 font-light">
              Disclaimer: This certificate confirms student completion of LAB HUB online educational modules and interactive laboratory evaluations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
