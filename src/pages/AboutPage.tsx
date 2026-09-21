import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      {/* Header Banner */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/official/racgu-official-logo.webp"
            alt="Club Logo" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block">
              Foundation & Charter
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              About Rotaract Club of Gandaki University
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Chartered on 22nd January 2026 under Club No. 8828026, Zone XVI, RID 3292. 
          Combining the academic dedication of Gandaki University with Rotary International's global humanitarian service.
        </p>

        {/* Credentials Bar */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Charter Date</span>
            <span className="font-bold text-white">22nd January 2026</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Rotary International ID</span>
            <span className="font-bold text-white">8828026</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">District & Zone</span>
            <span className="font-bold text-white">RID 3292 • Zone XVI</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Sponsoring Club</span>
            <span className="font-bold text-pink-300">Rotaract Club of Lekhnath</span>
          </div>
        </div>
      </div>

      {/* Club History & Inception */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          Charter Inception & University Collaboration
        </h2>

        <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            The <strong>Rotaract Club of Gandaki University (RCGU)</strong> is a university-based, non-profit,
            non-political and non-sectarian service and leadership organization at Gandaki University, Pokhara.
            Sponsored by the <strong>Rotaract Club of Lekhnath</strong>, it was chartered on <strong>22 January 2026</strong>.
          </p>
          <p>
            The club provides students with a structured platform for leadership development, professional growth,
            fellowship and community service. Guided by Service Above Self, members work together to address
            community needs and convert knowledge and ideas into sustainable impact.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider block">
            Core Direction
          </span>
          <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            To build a resilient and sustainable Rotaract Club of Gandaki University through strategic recruitment,
            meaningful engagement, leadership development and impactful community service.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
            Action Framework
          </span>
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            To engage and develop university students as ethical and responsible leaders through community service,
            professional growth, fellowship, innovation and collaboration while upholding Rotary and Rotaract values.
          </p>
        </div>
      </div>

      {/* Presidential Theme Spotlight */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D91B5C] block">
              Presidential Theme (RY 2026-27)
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              "Insight to Impact"
            </h3>
          </div>
          <div className="h-10">
            <img 
              src="/assets/official/insight-to-impact.webp"
              alt="Insight to Impact" 
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The presidential theme for RY 2026-27, <strong>"Insight to Impact"</strong>, signifies our pledge that university education 
          must not remain confined to textbooks. Every concept learned in software, healthcare, management, and sports is 
          deployed through community service avenues to uplift individuals and communities throughout Pokhara.
        </p>
      </div>

      {/* The Rotary 4-Way Test */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          The Rotary 4-Way Test
        </h3>
        <p className="text-xs text-slate-600">
          The guiding ethical principle observed by all Rotaractors of Gandaki University:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-[#D91B5C] block">Point 1</span>
            <p className="text-sm font-bold text-slate-900">Is it the TRUTH?</p>
            <p className="text-xs text-slate-600">Complete transparency, integrity, and ethical conduct in all actions.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-[#D91B5C] block">Point 2</span>
            <p className="text-sm font-bold text-slate-900">Is it FAIR to all concerned?</p>
            <p className="text-xs text-slate-600">Equity, fairness, and mutual respect among all members and beneficiaries.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-[#D91B5C] block">Point 3</span>
            <p className="text-sm font-bold text-slate-900">Will it build GOODWILL and BETTER FRIENDSHIPS?</p>
            <p className="text-xs text-slate-600">Nurturing genuine fellowship, teamwork, and parent club synergy.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-[#D91B5C] block">Point 4</span>
            <p className="text-sm font-bold text-slate-900">Will it be BENEFICIAL to all concerned?</p>
            <p className="text-xs text-slate-600">Ensuring all service projects provide enduring community value.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
