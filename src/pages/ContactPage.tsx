import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSending(true);
    try {
      const response = await fetch('/api/index.php/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Unable to send your message.');
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Header */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
          Official Club Secretariat
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Contact Rotaract Club of Gandaki University
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          Get in touch with our Executive Committee for membership questions, partnerships, service initiatives, or university collaborations.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 via-white to-slate-50 p-6 sm:p-8">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D91B5C]">Membership Application</span>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Join the Rotaract Club of Gandaki University</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Become part of a community committed to service, leadership, fellowship and meaningful impact. Open the official membership form using the button or scan the QR code.</p>
            <a href="https://forms.gle/kEuU9vkiXkp2T6Cp8" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center rounded-lg bg-[#D91B5C] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#BE123C]">
              Join Now
            </a>
          </div>
          <a href="https://forms.gle/kEuU9vkiXkp2T6Cp8" target="_blank" rel="noreferrer" className="mx-auto block rounded-2xl border border-slate-200 bg-white p-3 shadow-sm" aria-label="Open RACGU membership application form">
            <img src="/assets/official/racgu-membership-qr.png" alt="QR code for the RACGU membership application" className="h-36 w-36 object-contain" />
          </a>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#D91B5C] uppercase tracking-wider block">
                Official Secretariat
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Club Information & Office
              </h3>
              <p className="text-xs text-slate-500">RID 3292 • Zone XVI • Club No. 8828026</p>
            </div>

            <div className="space-y-3 text-xs text-slate-600 divide-y divide-slate-100">
              <div className="pt-2">
                <strong className="block text-slate-900 font-semibold mb-0.5">Physical Campus Secretariat:</strong>
                <span>Gandaki University Campus, Pokhara, Kaski, Gandaki Province, Nepal</span>
              </div>

              <div className="pt-3">
                <strong className="block text-slate-900 font-semibold mb-0.5">Official Inquiries:</strong>
                <div className="flex flex-col items-start gap-1">
                  <a className="text-[#D91B5C] hover:underline" href="mailto:rotaract@gandakiuniversity.edu.np">rotaract@gandakiuniversity.edu.np</a>
                  <a className="text-[#D91B5C] hover:underline" href="mailto:racgandakiuniversity@gmail.com">racgandakiuniversity@gmail.com</a>
                </div>
              </div>

              <div className="pt-3">
                <strong className="block text-slate-900 font-semibold mb-2">Official Social Media:</strong>
                <div className="flex flex-wrap gap-2">
                  <a href="https://www.facebook.com/profile.php?id=61587242528509" target="_blank" rel="noreferrer" className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 font-bold text-blue-700 hover:bg-blue-100">Facebook</a>
                  <a href="https://www.instagram.com/rotaractgandakiuniversity/" target="_blank" rel="noreferrer" className="rounded-lg border border-pink-200 bg-pink-50 px-3 py-1.5 font-bold text-pink-700 hover:bg-pink-100">Instagram</a>
                </div>
              </div>

              <div className="pt-3">
                <strong className="block text-slate-900 font-semibold mb-0.5">Secretariat Contacts:</strong>
                <p>Contact details are available through the official club secretariat.</p>
              </div>

              <div className="pt-3">
                <strong className="block text-slate-900 font-semibold mb-0.5">Meetings & Assemblies:</strong>
                <p>General Meetings: 1st & 3rd Saturday of every month</p>
                <p className="text-slate-400">Venue: Academic Block Auditorium, Gandaki University</p>
              </div>

              <div className="pt-3">
                <strong className="block text-slate-900 font-semibold mb-0.5">Parent Sponsoring Body:</strong>
                <p>Rotaract Club of Lekhnath (RID 3292)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-xs font-bold uppercase text-emerald-700 block">Message Sent</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Thank You for Reaching Out
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your communication has been forwarded to the Secretariat and Executive Board. We will review and respond promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-lg">{error}</p>}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Send a Message to the Secretariat
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill out the form below to transmit an official inquiry.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Roshan Adhikari"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. roshan@example.com"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Application">Membership Application</option>
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="Parent Club Synergy">Parent Club Synergy (Rotary Lekhnath)</option>
                      <option value="District 3292 Affairs">District 3292 Affairs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / Proposal *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your inquiry or proposal..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-5 py-2.5 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
