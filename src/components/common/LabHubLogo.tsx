import React from 'react';

interface LabHubLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const LabHubLogo: React.FC<LabHubLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-lg font-bold tracking-tight',
    md: 'text-xl font-extrabold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`} id="lab-hub-brand-logo">
      <div
        className={`${iconSizes[size]} rounded-xl bg-indigo-600 flex items-center justify-center p-1.5 shadow-sm text-white relative overflow-hidden group`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Microscope & Lab Flask Hybrid Vector */}
          <path d="M6 18h8" />
          <path d="M3 22h18" />
          <path d="M14 22a7 7 0 1 0 0-14h-1" />
          <path d="M9 14h2" />
          <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
          <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </svg>
        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSizes[size]} text-slate-900`}>
            LAB <span className="text-indigo-600">HUB</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
            MED
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] text-slate-500 font-medium tracking-tight">
            All Your Labs. One Place.
          </span>
        )}
      </div>
    </div>
  );
};
