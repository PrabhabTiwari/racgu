import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1931] text-slate-300 border-t-2 border-[#D91B5C] text-left">
      {/* 4-Way Test Banner */}
      <div className="bg-[#051124] text-white py-5 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              The Rotary 4-Way Test
            </h4>
            <p className="text-xs text-slate-400">Of the things we think, say or do:</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full md:w-auto text-xs">
            <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-center">
              <span className="text-pink-300 font-bold block text-[10px]">1st</span> Is it the TRUTH?
            </div>
            <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-center">
              <span className="text-pink-300 font-bold block text-[10px]">2nd</span> Is it FAIR to all?
            </div>
            <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-center">
              <span className="text-pink-300 font-bold block text-[10px]">3rd</span> Build GOODWILL?
            </div>
            <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-center">
              <span className="text-pink-300 font-bold block text-[10px]">4th</span> BENEFICIAL to all?
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Club Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <img 
                src="/assets/official/racgu-official-logo.webp"
                alt="Rotaract Club of Gandaki University" 
                className="h-16 w-16 rounded-lg bg-white p-1 object-contain"
              />
              <img 
                src="/assets/official/insight-to-impact.webp"
                alt="Insight to Impact Theme" 
                className="h-16 max-w-32 rounded-lg bg-white p-1 object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Rotaract Club of Gandaki University
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Chartered on: 22nd January 2026. Club No. 8828026. Zone XVI, District 3292. Sponsored by Rotaract Club of Lekhnath.
              </p>
            </div>
            <div className="text-xs text-slate-300">
              Presidential Theme: "Insight to Impact"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  About Us & Charter
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('parent-club'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Parent Club: Rotaract Club of Lekhnath
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('team'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Board of Directors & Members
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('events'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Events & Projects
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('notices'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Club Circulars & Notices
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('portal'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Member & PST Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Avenues of Service */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Avenues of Service
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Community Service (Healthcare & Cleanliness)</li>
              <li>• Professional Development & Innovation</li>
              <li>• Club Service & Inter-Club Fellowship</li>
              <li>• International Service & Twin Clubs</li>
              <li>• Youth Leadership & Sports Avenue</li>
            </ul>
          </div>

          {/* Col 4: Secretariat & Campus Office */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Club Secretariat
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>Gandaki University Campus, Pokhara-32, Kaski, Gandaki Province, Nepal</p>
              <p>Email: racgandakiuniversity@gmail.com</p>
              <p>Telephone: To be officially confirmed</p>
              <div className="pt-1">
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Rotaract District 3292 • Zone XVI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {currentYear} Rotaract Club of Gandaki University. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">Chartered on: 22 January 2026 • Pokhara, Nepal</p>
        </div>
      </div>
    </footer>
  );
};
