import React from 'react';

export const ParentClubPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      {/* Header Banner */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block">
          Institutional Sponsorship & Rotary Mentorship
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Our Parent Clubs
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          The Rotaract Club of Gandaki University owes its inception, charter guidance, and continuous youth 
          mentorship to our esteemed sponsor, <strong>Rotaract Club of Lekhnath</strong>, and our patron Rotary 
          institution, <strong>Rotary Club of Lekhnath</strong>.
        </p>
      </div>

      {/* Dual Parent Club Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Rotaract Club of Lekhnath */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D91B5C] block">
                Sponsoring Club
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Rotaract Club of Lekhnath
              </h3>
              <p className="text-xs text-slate-500">
                Zone XVI • RID 3292 • Kaski, Nepal
              </p>
            </div>
            <div className="px-2.5 py-1 rounded bg-pink-50 text-[#D91B5C] text-xs font-bold border border-pink-200">
              Sponsor
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            One of the most active community clubs in District 3292, the Rotaract Club of Lekhnath 
            has a storied legacy of community development around the Seven Lakes of Lekhnath. Their leadership 
            championed the chartering of RAC Gandaki University, guiding the club through charter documentation, 
            constitution formation, and initial board training.
          </p>

          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            <p>• Charter Sponsor of Club No. 8828026 (Chartered: 22nd Jan 2026)</p>
            <p>• Co-hosts of annual Begnas Lake environmental campaigns</p>
            <p>• Continuous board mentoring and joint fellowship assemblies</p>
          </div>
        </div>

        {/* Card 2: Rotary Club of Lekhnath */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block">
                Parent Rotary Club
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Rotary Club of Lekhnath
              </h3>
              <p className="text-xs text-slate-500">
                District 3292 • Rotary International
              </p>
            </div>
            <div className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Patron
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The Rotary Club of Lekhnath provides the overarching umbrella of ethical counsel, project funding, 
            and strategic mentorship for youth leadership. Through dedicated Rotarian advisors, they guide our 
            health diagnostic camps, scholarship distributions, and professional networking seminars.
          </p>

          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            <p>• Endorsed the official charter petition to Rotary International</p>
            <p>• Appoints official Rotarian Mentors to our Executive Board</p>
            <p>• Grant collaboration for university blood drives and sanitation programs</p>
          </div>
        </div>
      </div>

      {/* Joint Initiatives */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider block">
            Collaborative Synergies
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Flagship Joint Initiatives
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            How Gandaki University Rotaractors and Lekhnath parent clubs unite for measurable service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#D91B5C] uppercase block">Environmental</span>
            <h4 className="text-sm font-bold text-slate-900">Begnas & Rupa Conservation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Joint environmental cleanup, tree plantation, and plastic segregation drives along lake shores 
              involving collegiate youth volunteers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-800 uppercase block">Healthcare</span>
            <h4 className="text-sm font-bold text-slate-900">Health & Blood Donation Camps</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organized biannually on Gandaki University campus with logistics co-sponsored by Rotaract 
              and Rotary Clubs of Lekhnath and Nepal Red Cross Society.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-purple-800 uppercase block">Leadership</span>
            <h4 className="text-sm font-bold text-slate-900">RYLA & Leadership Seminars</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rotary Youth Leadership Awards (RYLA) sponsorships sending promising collegiate members to 
              regional leadership intensives across Nepal.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            View joint service projects on our interactive club calendar:
          </p>
          <button
            onClick={() => setActiveTab('events')}
            className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Explore Joint Events &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
