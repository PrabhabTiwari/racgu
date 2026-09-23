import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setAboutDropdownOpen(false);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAboutActive = activeTab === 'about' || activeTab === 'parent-club' || activeTab === 'messages';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* --- TOP THEME BAR --- */}
      <div className="bg-[#0A1931] text-white text-xs px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto min-h-9 py-1.5 flex flex-wrap items-center justify-center lg:justify-between gap-x-5 gap-y-1 text-[10px] sm:text-[11px] font-semibold">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
            <span className="text-amber-400 font-bold uppercase tracking-wide">Rotaract Club of Gandaki University</span>
            <span>Zone XVI</span>
            <span>District 3292</span>
            <span>Sponsored by: Rotaract Club of Lekhnath</span>
            <span>Club No. 8828026</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span>RY 2026-27 Theme: Insight to Impact</span>
            <div className="h-7 flex items-center bg-white px-2 py-0.5 rounded border border-white/20">
              <img 
                src="/assets/official/insight-to-impact.webp"
                alt="Insight to Impact" 
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION BAR --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Complete official brand lockup; the image itself links back home. */}
          <button
            type="button"
            className="shrink-0 select-none rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D91B5C] focus-visible:ring-offset-2"
            onClick={() => handleNavClick('home')}
            id="navbar-brand-link"
            aria-label="Go to Rotaract Club of Gandaki University home page"
          >
            <img
              src="/assets/official/racgu-header-brand.png"
              alt="Rotaract Club of Gandaki University"
              className="h-11 w-auto max-w-[230px] object-contain sm:h-14 sm:max-w-[310px]"
            />
          </button>

          {/* Desktop Direct Nav Links (No hamburger on PC) */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              id="nav-link-home"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all ${
                activeTab === 'home'
                  ? 'bg-pink-50 text-[#D91B5C]'
                  : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* About Dropdown (About Us + Parent Club) */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                onMouseEnter={() => setAboutDropdownOpen(true)}
                id="nav-about-menu-btn"
                className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all inline-flex items-center gap-1 ${
                  isAboutActive
                    ? 'bg-pink-50 text-[#D91B5C]'
                    : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
                }`}
              >
                <span>About</span>
                <span className="text-[10px] font-normal leading-none opacity-70">▾</span>
              </button>

              {aboutDropdownOpen && (
                <div 
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-44 rounded-lg bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100"
                >
                  <button
                    onClick={() => handleNavClick('about')}
                    id="nav-sublink-about-us"
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                      activeTab === 'about'
                        ? 'bg-pink-50 text-[#D91B5C] font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#D91B5C]'
                    }`}
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => handleNavClick('messages')}
                    id="nav-sublink-messages"
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                      activeTab === 'messages'
                        ? 'bg-pink-50 text-[#D91B5C] font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#D91B5C]'
                    }`}
                  >
                    Leadership Messages
                  </button>
                  <button
                    onClick={() => handleNavClick('parent-club')}
                    id="nav-sublink-parent-club"
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                      activeTab === 'parent-club'
                        ? 'bg-pink-50 text-[#D91B5C] font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#D91B5C]'
                    }`}
                  >
                    Parent Club
                  </button>
                </div>
              )}
            </div>

            {/* Events & Calendar */}
            <button
              onClick={() => handleNavClick('events')}
              id="nav-link-events"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all ${
                activeTab === 'events'
                  ? 'bg-pink-50 text-[#D91B5C]'
                  : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
              }`}
            >
              Events & Calendar
            </button>

            {/* Notices */}
            <button
              onClick={() => handleNavClick('notices')}
              id="nav-link-notices"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all ${
                activeTab === 'notices'
                  ? 'bg-pink-50 text-[#D91B5C]'
                  : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
              }`}
            >
              Notices
            </button>

            {/* Gallery */}
            <button
              onClick={() => handleNavClick('gallery')}
              id="nav-link-gallery"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all ${
                activeTab === 'gallery'
                  ? 'bg-pink-50 text-[#D91B5C]'
                  : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
              }`}
            >
              Gallery
            </button>

            {/* Members & BOD (Unified Team & Directory) */}
            <button
              onClick={() => handleNavClick('team')}
              id="nav-link-team"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all ${
                activeTab === 'team'
                  ? 'bg-pink-50 text-[#D91B5C]'
                  : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
              }`}
            >
              Members & BOD
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              id="nav-link-contact"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-normal transition-all ${
                activeTab === 'contact'
                  ? 'bg-pink-50 text-[#D91B5C]'
                  : 'text-slate-700 hover:text-[#D91B5C] hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Auth Action: Default to Login when logged out, Logout when logged in */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  id="user-portal-menu-button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-pink-300 transition-all text-xs"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#D91B5C]"
                  />
                  <div className="text-left">
                    <span className="font-bold text-slate-800 block truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#D91B5C] uppercase block">
                      {currentUser.roleTitle}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">▾</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-60 rounded-lg bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser.roleTitle}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-pink-100 text-[#D91B5C]">
                        {currentUser.role === 'pst' ? 'PST' : 'MEMBER'}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleNavClick('portal');
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-pink-50 hover:text-[#D91B5C]"
                      >
                        {currentUser.role === 'pst' ? 'PST Portal' : 'Member Portal'}
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        id="logout-button-menu"
                        className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                id="portal-login-button"
                className="px-4 py-2 rounded-lg bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle (Only on small screens) */}
          <div className="flex lg:hidden items-center gap-2">
            {!currentUser ? (
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 rounded bg-[#D91B5C] text-white text-xs font-bold"
              >
                Login
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded border border-rose-200 text-rose-600 text-xs font-bold"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-nav-toggle"
              className="px-2.5 py-1.5 rounded border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

        </div>
      </div>

      {/* --- MOBILE ACCORDION (Mobile Only) --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1.5">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${
              activeTab === 'home' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-800'
            }`}
          >
            Home
          </button>

          {/* About Subpages in Mobile */}
          <div className="border-l-2 border-pink-200 pl-3 my-1 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block px-1">
              About RACGU
            </span>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-1.5 rounded text-xs font-semibold ${
                activeTab === 'about' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-700'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('messages')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'messages' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-700'
              }`}
            >
              Leadership Messages
            </button>
            <button
              onClick={() => handleNavClick('parent-club')}
              className={`w-full text-left px-3 py-1.5 rounded text-xs font-semibold ${
                activeTab === 'parent-club' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-700'
              }`}
            >
              Parent Club
            </button>
          </div>

          <button
            onClick={() => handleNavClick('events')}
            className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${
              activeTab === 'events' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-800'
            }`}
          >
            Events & Calendar
          </button>

          <button
            onClick={() => handleNavClick('notices')}
            className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${
              activeTab === 'notices' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-800'
            }`}
          >
            Notices
          </button>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${
              activeTab === 'gallery' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-800'
            }`}
          >
            Gallery
          </button>

          <button
            onClick={() => handleNavClick('team')}
            className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${
              activeTab === 'team' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-800'
            }`}
          >
            Members & BOD
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${
              activeTab === 'contact' ? 'bg-pink-50 text-[#D91B5C]' : 'text-slate-800'
            }`}
          >
            Contact
          </button>

          {currentUser && (
            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={() => handleNavClick('portal')}
                className="w-full py-2 bg-[#D91B5C] text-white text-xs font-bold rounded text-center"
              >
                {currentUser.role === 'pst' ? 'PST Portal' : 'Member Portal'}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
