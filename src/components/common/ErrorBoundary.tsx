import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { LabHubLogo } from './LabHubLogo';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[LAB HUB] Uncaught application error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    try {
      window.location.hash = '';
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  private handleResetStorage = () => {
    try {
      localStorage.clear();
      window.location.href = '/';
    } catch {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F172A] text-[#E5E7EB] flex flex-col items-center justify-center p-4 sm:p-6 select-none font-sans">
          <div className="max-w-md w-full bg-[#1E293B] border border-[#334155] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            {/* Header Brand */}
            <div className="flex justify-center mb-2">
              <LabHubLogo size="lg" />
            </div>

            {/* Error Icon */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Arabic & English Diagnostic Titles */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                حدث خطأ غير متوقع أثناء تحميل الصفحة
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                An unexpected interface exception occurred. Your medical laboratory progress is safe.
              </p>
            </div>

            {/* Error Details */}
            {this.state.error && (
              <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-left font-mono text-[11px] text-red-400 overflow-x-auto max-h-24">
                {this.state.error.toString()}
              </div>
            )}

            {/* Recovery Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحميل المنصة (Reload)</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetStorage}
                className="px-4 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-[#94A3B8] hover:text-white border border-[#334155] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>إعادة تعيين للرئيسية</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-[#64748B]">
              LAB HUB Clinical Learning Platform • Digital Medical Labs
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
