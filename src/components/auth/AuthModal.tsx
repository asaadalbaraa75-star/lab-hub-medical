/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Authentication & Role Access Modal Component
 */

import React, { useState } from 'react';
import {
  X,
  Lock,
  UserCheck,
  Shield,
  GraduationCap,
  Sliders,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { authService } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserChange: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange
}) => {
  const [selectedUser, setSelectedUser] = useState<User>(currentUser);
  const [securityPin, setSecurityPin] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const result = authService.loginAsUser(selectedUser, securityPin);
    if (!result.success) {
      setStatusMessage({ text: result.message, isError: true });
      return;
    }

    onUserChange(selectedUser);
    setStatusMessage({ text: result.message, isError: false });
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">LAB HUB Authentication Portal</h2>
              <p className="text-xs text-slate-400">
                Secure Role-Based Access Control (RBAC)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select User Account & Role
            </label>
            <div className="space-y-2">
              {DEMO_USERS.map(u => {
                const isSelected = selectedUser.id === u.id;
                const isCurrent = currentUser.id === u.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      setSelectedUser(u);
                      setStatusMessage(null);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarUrl}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{u.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{u.department}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                        u.role === 'admin'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : u.role === 'instructor'
                          ? 'bg-teal-100 text-teal-800 border border-teal-300'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security PIN for Elevated Roles */}
          {(selectedUser.role === 'admin' || selectedUser.role === 'instructor') && (
            <div className="space-y-1.5 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                  Elevated Role Security PIN Required
                </span>
                <span className="text-[10px] text-amber-700 font-mono">
                  {selectedUser.role === 'admin' ? 'Default: 2026' : 'Default: 1234'}
                </span>
              </div>
              <input
                type="password"
                value={securityPin}
                onChange={e => setSecurityPin(e.target.value)}
                placeholder={selectedUser.role === 'admin' ? 'Enter Admin PIN (2026)' : 'Enter Faculty PIN (1234)'}
                className="w-full text-sm px-3 py-2 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.isError
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {statusMessage.isError ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Confirm & Authenticate Session</span>
            </button>
          </div>

          {/* Mandated Platform Ownership Notice */}
          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
            <div className="font-bold text-slate-700">LAB HUB © 2026 All Rights Reserved.</div>
            <div>Created and developed by: <strong className="text-slate-800">سكينة أسعد</strong></div>
          </div>
        </form>
      </div>
    </div>
  );
};
