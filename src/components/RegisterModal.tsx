import React, { useState } from 'react';
import { ClubEvent, UserProfile } from '../types';

interface RegisterModalProps {
  event: ClubEvent | null;
  currentUser: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRegistration: (eventId: string, memberData: { id: string; name: string; email: string; phone: string; notes?: string }) => Promise<void>;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  event,
  currentUser,
  isOpen,
  onClose,
  onConfirmRegistration
}) => {
  if (!isOpen || !event) return null;

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onConfirmRegistration(event.id, {
        id: currentUser?.id || 'guest-' + Date.now(),
        name,
        email,
        phone,
        notes
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 text-left">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
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

          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
            Event Registration Form
          </span>

          <h3 className="text-lg font-bold text-white mt-1">
            {event.title}
          </h3>

          <div className="text-xs text-slate-300 mt-1">
            <span>{event.date} • {event.time}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-2">
              <span className="text-xs font-bold uppercase text-emerald-700 block">Confirmed</span>
              <h4 className="text-lg font-bold text-slate-900">
                Registration Confirmed
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                You are registered for {event.title}. Your details have been logged in the official roster.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Venue:</strong> {event.location}</p>
                <p><strong>Avenue:</strong> {event.category} • <strong>Chair:</strong> {event.chairperson}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Participant Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rtr. Anjana KC"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. member@gandaki.edu.np"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Volunteer Notes / Transportation Needs (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Willing to assist with registration desk or event logistics..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Confirming...' : 'Complete Registration'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
