import React, { useEffect, useRef, useState } from 'react';
import { ClubEvent, ClubNotice, UserProfile } from '../types';
import { INITIAL_MEMBERS } from '../data/initialData';

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
  const heroSlides = [
    { image: '/assets/hero/charter-ceremony.webp', label: 'Charter Ceremony' },
    { image: '/assets/hero/guru-purnima.webp', label: 'Guru Purnima Celebration' },
    { image: '/assets/hero/installation-fellowship.webp', label: 'Rotaract Fellowship' }
  ];
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const guidingTeam = INITIAL_MEMBERS.filter(member => member.role === 'pst' || member.role === 'advisor');
  const [activeGuide, setActiveGuide] = useState(0);
  const logoVideoRef = useRef<HTMLVideoElement>(null);
  const logoVideoVisibleRef = useRef(false);
  const statsRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState({ members: 0, bod: 0, projects: 0 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide(current => (current + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveGuide(current => (current + 1) % guidingTeam.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [guidingTeam.length]);

  useEffect(() => {
    const video = logoVideoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (!logoVideoVisibleRef.current || document.hidden) return;
      video.muted = true;
      void video.play().catch(() => {
        // Some browsers need a second attempt after media data is ready.
        window.setTimeout(() => {
          if (logoVideoVisibleRef.current && !document.hidden) {
            void video.play().catch(() => undefined);
          }
        }, 250);
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      logoVideoVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        playVideo();
      } else {
        video.pause();
      }
    }, { threshold: 0.15 });

    const handleVisibilityChange = () => {
      if (document.hidden) video.pause();
      else playVideo();
    };

    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    observer.observe(video);
    video.load();

    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;
    let frame = 0;
    let hasAnimated = false;
    const targets = { members: 22, bod: 13, projects: 18 };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated) return;
      hasAnimated = true;
      const startedAt = performance.now();
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1200;

      const animate = (now: number) => {
        const progress = duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setStats({
          members: Math.round(targets.members * eased),
          bod: Math.round(targets.bod * eased),
          projects: Math.round(targets.projects * eased)
        });
        if (progress < 1) frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.3 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

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

      {/* --- AUTOMATIC HERO SLIDESHOW --- */}
      <section className={`relative min-h-[620px] overflow-hidden bg-slate-950 ${urgentNotice ? '-mt-12' : ''}`}>
        <div className="absolute inset-0" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeHeroSlide ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/72 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto min-h-[620px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex items-center">
          <div className="max-w-3xl text-left text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-white/12 border border-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                RID 3292 · Zone XVI
              </span>
              <span className="px-3 py-1 rounded bg-[#D91B5C] text-xs font-bold">
                Chartered on: 22nd January 2026
              </span>
              <span className="px-3 py-1 rounded bg-white/12 border border-white/20 text-xs font-semibold backdrop-blur-sm">
                Club No. 8828026
              </span>
            </div>

            <p className="mt-8 text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-pink-300">
              Welcome to the official website
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              Rotaract Club of
              <span className="block text-pink-400">Gandaki University</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-slate-100">
              A university-based community of young leaders transforming knowledge, ideas and compassion into meaningful action through leadership, fellowship and service.
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-300">
              Sponsored by Rotaract Club of Lekhnath, Pokhara, Nepal
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('events')}
                className="px-5 py-3 rounded-lg bg-[#D91B5C] hover:bg-[#BE123C] text-white text-sm font-bold transition-colors"
              >
                Events & Calendar
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className="px-5 py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold transition-colors"
              >
                Members & BOD
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-3 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm font-bold backdrop-blur-sm transition-colors"
              >
                Discover Our Club
              </button>
              {!currentUser && (
                <button onClick={onOpenLogin} className="px-4 py-3 text-sm font-bold text-pink-300 hover:text-white">
                  Portal Login
                </button>
              )}
            </div>

            <div className="mt-10 flex items-center gap-2" role="group" aria-label="Slideshow selection">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setActiveHeroSlide(index)}
                  aria-label={`Show ${slide.label}`}
                  aria-current={index === activeHeroSlide}
                  className={`h-1.5 rounded-full transition-all ${index === activeHeroSlide ? 'w-10 bg-pink-400' : 'w-5 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
              <span className="ml-2 text-xs font-semibold text-slate-200">{heroSlides[activeHeroSlide].label}</span>
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
                ref={logoVideoRef}
                className="block w-full aspect-video object-cover"
                poster="/assets/official/racgu-letterhead.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onEnded={event => {
                  event.currentTarget.currentTime = 0;
                  void event.currentTarget.play().catch(() => undefined);
                }}
                aria-label="Official Rotaract Club of Gandaki University logo reveal"
              >
                <source src="/assets/official/racgu-logo-reveal.mp4?v=20260922-2" type="video/mp4" />
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
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.members}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Charter Roster Members</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-[#D91B5C]">{stats.bod}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Board Directors (BOD)</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.projects}+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Planned Projects</p>
          </div>
        </div>
      </section>

      {/* --- PRESIDENT'S MESSAGE --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 relative bg-[#0A1931] overflow-hidden self-start">
              <img
                src="/members/prabhab-portrait.webp"
                alt="Rtr. Prabhab Tiwari, Charter President"
                className="block w-full h-auto object-contain"
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
                <p>It is an honor and privilege to serve as the Charter President of the Rotaract Club of Gandaki University. Our club was founded with a shared commitment to service, leadership, fellowship, and creating meaningful change.</p>
                <p>Our charter theme, <strong className="text-[#D91B5C]">“Insight to Impact,”</strong> represents our belief that understanding must lead to purposeful action. Through our projects, collaborations, and initiatives, we aim to transform ideas into positive outcomes for our university and the wider community.</p>
                <p>As a charter club, we have the responsibility of building a strong, inclusive, and sustainable foundation for future generations of Rotaractors at Gandaki University. I am sincerely grateful to Gandaki University, our sponsoring club—the Rotaract Club of Lekhnath—Rotaract District 3292, our mentors, faculty members, well-wishers, and every charter member for their support.</p>
                <p>Together, may we continue to learn, lead with integrity, serve with compassion, and turn our <strong className="text-[#D91B5C]">Insight into Impact.</strong></p>
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

      {/* --- GUIDING TEAM RY 2026-27 --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#0A1931] text-white shadow-sm">
          <div className="grid min-h-[390px] grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-white/5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Leadership & Mentorship</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black">Guiding Team for RY 2026-27</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">Meet the executive officers and advisors guiding the Rotaract Club of Gandaki University through its charter year.</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2" aria-label="Guiding team slideshow controls">
                {guidingTeam.map((member, index) => (
                  <button key={member.id} type="button" onClick={() => setActiveGuide(index)} aria-label={`Show ${member.name}`} aria-current={index === activeGuide} className={`h-2 rounded-full transition-all ${index === activeGuide ? 'w-10 bg-pink-400' : 'w-5 bg-white/30 hover:bg-white/60'}`} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative min-h-[390px] bg-slate-100 text-slate-900">
              {guidingTeam.map((member, index) => (
                <article key={member.id} className={`absolute inset-0 grid grid-cols-1 sm:grid-cols-2 transition-all duration-500 ${index === activeGuide ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 translate-x-4'}`} aria-hidden={index !== activeGuide}>
                  <div className="min-h-64 overflow-hidden bg-slate-200">
                    <img src={member.avatar} alt={member.name} className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-9 text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">{member.role === 'pst' ? 'Executive PST' : 'Club Advisor'}</span>
                    <h3 className="mt-2 text-2xl font-black text-slate-900">{member.name}</h3>
                    <p className="mt-1 text-sm font-bold text-[#D91B5C]">{member.roleTitle}</p>
                    <p className="mt-5 text-sm leading-7 text-slate-600">{member.bio || `${member.roleTitle} guiding the club's leadership, governance and service initiatives for Rotaract Year 2026-27.`}</p>
                    <button type="button" onClick={() => setActiveTab('team')} className="mt-6 w-fit rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 hover:border-[#D91B5C] hover:text-[#D91B5C]">View Full Team</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
              Explore our dedicated Parent Club page to discover how the Rotaract Club of Lekhnath supported our inception, leadership development and fellowship.
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
