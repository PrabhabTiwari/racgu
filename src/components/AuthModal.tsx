import React, { useState } from 'react';
import { UserProfile } from '../types';
import { clubApi } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('president.racgu@gandaki.edu.np');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const user = await clubApi.login(email, password);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A1931] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            Close [X]
          </button>

          <div>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
              Official Portal Authentication
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">Member Portal Login</h3>
            <p className="text-xs text-slate-300">Rotaract Club of Gandaki University</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {error && (
              <div className="p-2.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institutional Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                placeholder="e.g. member@gandaki.edu.np"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password / Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold transition-colors"
              >
                {isSubmitting ? 'Authenticating...' : 'Log In'}
              </button>
            </div>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-500">
              Rotaract Club of Gandaki University • Club No. 8828026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
