import React from 'react';
import { ClubEvent, ClubNotice, UserProfile } from '../types';

interface HomePageProps {
  events: ClubEvent[];
  notices: ClubNotice[];
  currentUser: UserProfile | null;
  setActiveTab: (tab: string) => void;
  onOpenRegisterModal: (event: ClubEvent) => void;
  onOpenLogin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  events,
  notices,
  currentUser,
  setActiveTab,
  onOpenRegisterModal,
  onOpenLogin
}) => {
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const urgentNotice = notices.find(n => n.isUrgent) || notices[0];

  return (
    <div className="space-y-12 pb-16">
      {/* --- NOTICE TICKER --- */}
      {urgentNotice && (
        <div className="bg-amber-50 border-b border-amber-200 py-2.5 px-4 text-xs text-amber-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider shrink-0">
                Notice
              </span>
              <span className="font-semibold text-slate-800 truncate">{urgentNotice.title}</span>
              <span className="text-slate-500 text-[11px] hidden sm:inline">— {urgentNotice.issuedBy}</span>
            </div>
            <button
              onClick={() => setActiveTab('notices')}
              className="text-[#D91B5C] hover:underline font-bold text-xs shrink-0 ml-2"
            >
              View Notice &rarr;
            </button>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="bg-white pt-6 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Hero Title & Affiliation */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Official Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                  RID 3292 • Zone XVI
                </div>
                <div className="px-3 py-1 rounded bg-pink-50 text-[#D91B5C] text-xs font-bold border border-pink-200">
                  Chartered 22nd January 2026
                </div>
                <div className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                  Club No. 8828026
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Rotaract Club of <br />
                  <span className="text-[#D91B5C]">Gandaki University</span>
                </h1>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Sponsored by Rotaract Club of Lekhnath • Pokhara, Nepal
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                A university-based community of young leaders committed to transforming knowledge, ideas and
                compassion into meaningful action through leadership, fellowship and community service.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setActiveTab('events')}
                  id="hero-events-btn"
                  className="px-5 py-2.5 rounded-lg bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
                >
                  Events & Calendar
                </button>

                <button
                  onClick={() => setActiveTab('team')}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
                >
                  Members & BOD
                </button>

                <button
                  onClick={() => setActiveTab('parent-club')}
                  className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all"
                >
                  Parent Club
                </button>

                {!currentUser && (
                  <button
                    onClick={onOpenLogin}
                    className="px-4 py-2.5 rounded-lg text-[#D91B5C] hover:underline text-xs sm:text-sm font-bold"
                  >
                    Portal Login &rarr;
                  </button>
                )}
              </div>

              {/* Affiliation Info */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-semibold">Rotary Affiliation</span>
                  <span className="font-bold text-slate-800">RI District 3292</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-semibold">Presidential Theme</span>
                  <span className="font-bold text-[#D91B5C]">Insight to Impact</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-semibold">Campus</span>
                  <span className="font-bold text-slate-800">Gandaki University, Pokhara</span>
                </div>
              </div>
            </div>

            {/* Right Col: Official Club & Theme Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-50 p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-center">
                
                {/* Official Logos Side-by-Side */}
                <div className="flex flex-col items-center justify-center gap-4 py-2">
                  <img 
                    src="/assets/official/racgu-official-logo.webp"
                    alt="Rotaract Club of Gandaki University Logo" 
                    className="w-28 h-28 object-contain"
                  />
                  <div className="w-full h-px bg-slate-200" />
                  <div className="bg-white p-3 rounded-xl border border-slate-200 w-full flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Official Presidential Theme RY 2026-27
                    </span>
                    <img 
                      src="/assets/official/insight-to-impact.webp"
                      alt="Insight to Impact Presidential Theme Logo" 
                      className="h-14 w-auto object-contain max-w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    "Insight to Impact"
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bridging academic knowledge with purposeful community transformation across Pokhara and beyond.
                  </p>
                </div>

                {/* Key Quick Facts */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2 text-xs text-left">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Charter Date</span>
                    <span className="font-bold text-slate-900">22nd January 2026</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Rotaract Club ID</span>
                    <span className="font-bold text-slate-900">8828026</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Sponsor Rotaract</span>
                    <span className="font-bold text-[#D91B5C]">Rotaract Club of Lekhnath</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Mentor Rotary</span>
                    <span className="font-bold text-slate-900">Rotary Club of Lekhnath</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- OFFICIAL LOGO REVEAL --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 bg-black">
              <video
                className="block w-full aspect-video object-cover"
                src="/assets/official/racgu-logo-reveal.mp4"
                poster="/assets/official/racgu-letterhead.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Official Rotaract Club of Gandaki University logo reveal"
              >
                Your browser does not support the official club logo reveal video.
              </video>
            </div>
            <div className="lg:col-span-4 p-6 sm:p-8 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-pink-400">Official Club Identity</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Insight to Impact</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                The official visual identity of the Rotaract Club of Gandaki University for Rotaract Year 2026-27.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS COUNTER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">22</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Charter Roster Members</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-[#D91B5C]">13</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Board Directors (BOD)</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">18+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Planned Projects</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-[#D91B5C]">3,500+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Community Impact</p>
          </div>
        </div>
      </section>

      {/* --- PRESIDENT'S MESSAGE --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 relative min-h-[520px] bg-[#0A1931] overflow-hidden">
              <img
                src="/members/prabhab.webp"
                alt="Rtr. Prabhab Tiwari, Charter President"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152d] via-[#07152d]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white text-left">
                <p className="text-xs font-bold text-pink-300 uppercase tracking-wider">Charter President</p>
                <h3 className="mt-1 text-2xl font-bold">Rtr. Prabhab Tiwari</h3>
                <p className="mt-1 text-xs text-slate-200">Rotaract Year 2026-27</p>
              </div>
            </div>

            <div className="lg:col-span-8 p-6 sm:p-10 text-left">
              <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider block">
                Message from the Charter President
              </span>
              <h4 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                Building a Foundation for Service, Leadership and Lasting Impact
              </h4>
              <div className="mt-5 space-y-4 text-sm text-slate-700 leading-7">
                <p>It is both an honor and a privilege to serve as the Charter President of the Rotaract Club of Gandaki University. The establishment of our club marks the beginning of a new journey—one built on service, leadership, fellowship, and a shared commitment to creating meaningful change.</p>
                <p>As a university-based Rotaract Club, we believe that young people have the potential not only to imagine a better future but also to actively build it. Our club provides a platform where students can develop leadership skills, exchange ideas, serve communities, build lasting friendships, and transform their knowledge into meaningful action.</p>
                <p>Our charter theme, <strong className="text-[#D91B5C]">“Insight to Impact,”</strong> reflects the spirit of our journey. Insight begins with understanding the challenges around us, while impact is created when that understanding is transformed into purposeful action. Through every project, meeting, collaboration, and service initiative, we aim to turn ideas into outcomes that positively influence both our university and the wider community.</p>
                <p>Being a charter club also brings a special responsibility. We are not simply leading a club for one Rotaract year; we are building the foundation upon which future generations of Rotaractors at Gandaki University will stand. Our priority is therefore to create a strong, inclusive, disciplined, and sustainable institution where every member is encouraged to participate, lead, learn, and grow.</p>
                <p>I am deeply grateful to Gandaki University for its support, to our sponsoring club, the Rotaract Club of Lekhnath, for its guidance and encouragement, and to Rotaract District 3292, our mentors, faculty members, well-wishers, and every charter member who believed in this vision from the beginning.</p>
                <p>To every member of the Rotaract Club of Gandaki University, I encourage you to consider this club not merely as an organization you belong to, but as a platform where you can discover your abilities, take responsibility, serve others, and leave behind a meaningful legacy.</p>
                <p>As we move forward, may we continue to learn together, lead with integrity, serve with compassion, and transform our insights into lasting impact.</p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200">
                <img
                  src="/assets/official/president-signature.png"
                  alt="Signature of Rtr. Prabhab Tiwari"
                  className="h-14 sm:h-16 w-auto object-contain object-left"
                />
                <p className="mt-2 text-sm font-bold text-slate-900">Rtr. Prabhab Tiwari</p>
                <p className="text-xs text-slate-600">Charter President, Rotaract Club of Gandaki University</p>
                <p className="mt-1 text-xs font-semibold text-[#D91B5C]">Charter Theme: “Insight to Impact”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- UPCOMING EVENTS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider block">
              Club Activities
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Upcoming Service Projects & Events
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active projects organized by our Board of Directors and Avenue Chairs.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('events')}
            className="text-xs font-bold text-[#D91B5C] hover:underline shrink-0"
          >
            View All Events &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between text-left"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-white text-slate-800">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-xs text-slate-500 font-semibold">
                    <span className="text-[#D91B5C]">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="mx-2">•</span>
                    <span>{event.time.split('NPT')[0]}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <p className="text-[11px] text-slate-500 truncate pt-1">
                    Location: {event.location}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <span className="text-[11px] text-slate-500">
                  {event.registeredMembers.length} Registered
                </span>

                <button
                  onClick={() => onOpenRegisterModal(event)}
                  className="px-3 py-1.5 rounded bg-pink-50 hover:bg-[#D91B5C] text-[#D91B5C] hover:text-white text-xs font-bold transition-all"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5 AVENUES OF SERVICE --- */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider">
              Pillars of Impact
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              5 Avenues of Service
            </h2>
            <p className="text-xs text-slate-600">
              Guided by Rotary International code and executed with university rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#D91B5C] uppercase block">Avenue 1</span>
              <h3 className="text-sm font-bold text-slate-900">Community Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Health camps, environmental cleanup around Pokhara lakes, and basic literacy support.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase block">Avenue 2</span>
              <h3 className="text-sm font-bold text-slate-900">Professional Dev.</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applied AI workshops, career conclaves, entrepreneurship seminars, and industry visits.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-purple-700 uppercase block">Avenue 3</span>
              <h3 className="text-sm font-bold text-slate-900">Club Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fellowship gatherings, charter celebrations, assembly meetings, and member bonding.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase block">Avenue 4</span>
              <h3 className="text-sm font-bold text-slate-900">International Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Twin-club partnerships, cross-border cultural exchange, and global youth peace initiatives.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase block">Avenue 5</span>
              <h3 className="text-sm font-bold text-slate-900">Youth & Sports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                University athletic tournaments, fitness programs, and leadership development activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARENT CLUB SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0A1931] p-6 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
              Institutional Foundation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Sponsored by Rotaract Club of Lekhnath
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our dedicated Parent Club page to discover how Rotaract Club of Lekhnath and Rotary Club of Lekhnath have guided our inception and youth mentorship.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('parent-club')}
            className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold transition-all shrink-0"
          >
            Visit Parent Club Page
          </button>
        </div>
      </section>
    </div>
  );
};
