import React, { useState, useEffect } from 'react';
import { 
  ClubDocument, 
  ClubEvent, 
  ClubNotice, 
  GalleryPhoto, 
  MemberRegistration, 
  UserProfile 
} from './types';
import { clubApi } from './services/api';
import { INITIAL_MEMBERS } from './data/initialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { RegisterModal } from './components/RegisterModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ParentClubPage } from './pages/ParentClubPage';
import { MessagesPage } from './pages/MessagesPage';
import { EventsPage } from './pages/EventsPage';
import { NoticesPage } from './pages/NoticesPage';
import { GalleryPage } from './pages/GalleryPage';
import { TeamPage } from './pages/TeamPage';
import { MemberDirectoryPage } from './pages/MemberDirectoryPage';
import { ContactPage } from './pages/ContactPage';
import { PortalPage } from './pages/PortalPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    return clubApi.getCurrentUser() || null;
  });

  // Data states
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [documents, setDocuments] = useState<ClubDocument[]>([]);
  const [notices, setNotices] = useState<ClubNotice[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [members, setMembers] = useState<UserProfile[]>(INITIAL_MEMBERS);
  const [registrations, setRegistrations] = useState<MemberRegistration[]>([]);

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedEventForRegister, setSelectedEventForRegister] = useState<ClubEvent | null>(null);

  // Initial load
  useEffect(() => {
    const loadAll = async () => {
      const [evs, docs, nots, gals, mems, regs] = await Promise.all([
        clubApi.getEvents(),
        clubApi.getDocuments(),
        clubApi.getNotices(),
        clubApi.getGallery(),
        clubApi.getMembers(),
        clubApi.getRegistrations()
      ]);
      setEvents(evs);
      setDocuments(docs);
      setNotices(nots);
      setGallery(gals);
      setMembers(mems);
      setRegistrations(regs);
    };
    loadAll();
  }, []);

  // Handlers for Event Management (PST / Public)
  const handleAddEvent = async (eventData: Partial<ClubEvent>) => {
    const created = await clubApi.createEvent(eventData);
    setEvents(prev => [created, ...prev]);
    return created;
  };

  const handleUpdateEvent = async (id: string, updates: Partial<ClubEvent>) => {
    const updated = await clubApi.updateEvent(id, updates);
    if (updated) {
      setEvents(prev => prev.map(e => (e.id === id ? updated : e)));
    }
    return updated;
  };

  const handleDeleteEvent = async (id: string) => {
    await clubApi.deleteEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleConfirmRegistration = async (
    eventId: string,
    memberData: { id: string; name: string; email: string; phone: string; notes?: string }
  ) => {
    const newReg = await clubApi.registerForEvent(eventId, memberData);
    setRegistrations(prev => [newReg, ...prev]);
    // Refresh events to show updated registered count
    const updatedEvents = await clubApi.getEvents();
    setEvents(updatedEvents);
  };

  const handleRefreshRegistrations = async () => {
    const latestRegistrations = await clubApi.getRegistrations();
    setRegistrations(latestRegistrations);
  };

  const handleProfileUpdated = (updated: UserProfile) => {
    setCurrentUser(updated);
    clubApi.setCurrentUser(updated);
    setMembers(previous => previous.map(member =>
      member.id === updated.id || member.email.toLowerCase() === updated.email.toLowerCase()
        ? { ...member, ...updated }
        : member
    ));
  };

  // Handlers for Document Management (PST)
  const handleUploadDocument = async (docData: Partial<ClubDocument>) => {
    const created = await clubApi.uploadDocument(docData);
    setDocuments(prev => [created, ...prev]);
    return created;
  };

  const handleDeleteDocument = async (id: string) => {
    await clubApi.deleteDocument(id);
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  // Handlers for Notice Management (PST)
  const handleAddNotice = async (noticeData: Partial<ClubNotice>) => {
    const created = await clubApi.createNotice(noticeData);
    setNotices(prev => [created, ...prev]);
    return created;
  };

  const handleDeleteNotice = async (id: string) => {
    await clubApi.deleteNotice(id);
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  // Handlers for Gallery (PST)
  const handleAddPhoto = async (photoData: Partial<GalleryPhoto>) => {
    const created = await clubApi.uploadPhoto(photoData);
    setGallery(prev => [created, ...prev]);
    return created;
  };

  const handleDeletePhoto = async (id: string) => {
    await clubApi.deletePhoto(id);
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Auth handlers
  const handleLoginSuccess = async (user: UserProfile) => {
    setCurrentUser(user);
    clubApi.setCurrentUser(user);
    // The first registration request runs before a visitor is authenticated.
    // Reload it after login so PST can immediately see every attendee.
    const latestRegistrations = await clubApi.getRegistrations();
    setRegistrations(latestRegistrations);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clubApi.logout();
    if (activeTab === 'portal') {
      setActiveTab('home');
    }
  };

  const isPstUser = currentUser?.role === 'pst';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#D91B5C]/20 selection:text-[#D91B5C]">
      {/* Header & Main Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            events={events}
            notices={notices}
            currentUser={currentUser}
            setActiveTab={setActiveTab}
            onOpenRegisterModal={(event) => setSelectedEventForRegister(event)}
            onOpenLogin={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'parent-club' && <ParentClubPage setActiveTab={setActiveTab} />}

        {activeTab === 'messages' && <MessagesPage />}

        {activeTab === 'events' && (
          <EventsPage
            events={events}
            onOpenRegisterModal={(event) => setSelectedEventForRegister(event)}
            onOpenAddEvent={() => {
              setActiveTab('portal');
            }}
            isPstUser={isPstUser}
          />
        )}

        {activeTab === 'notices' && (
          <NoticesPage
            notices={notices}
            isPstUser={isPstUser}
            onOpenAddNotice={() => {
              setActiveTab('portal');
            }}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage
            gallery={gallery}
            isPstUser={isPstUser}
            onOpenAddPhoto={() => {
              setActiveTab('portal');
            }}
          />
        )}

        {(activeTab === 'team' || activeTab === 'directory') && (
          <TeamPage members={members} />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'portal' && (
          currentUser ? (
            <PortalPage
              currentUser={currentUser}
              events={events}
              documents={documents}
              notices={notices}
              gallery={gallery}
              registrations={registrations}
              onRefreshRegistrations={handleRefreshRegistrations}
              onProfileUpdated={handleProfileUpdated}
              onAddEvent={handleAddEvent}
              onUpdateEvent={handleUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
              onUploadDocument={handleUploadDocument}
              onDeleteDocument={handleDeleteDocument}
              onAddNotice={handleAddNotice}
              onDeleteNotice={handleDeleteNotice}
              onAddPhoto={handleAddPhoto}
              onDeletePhoto={handleDeletePhoto}
              setActiveTab={setActiveTab}
            />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 shadow-md text-center space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Portal Sign-in Required</h3>
              <p className="text-xs text-slate-600">
                Please log in as PST Executive, Board Director, General Member, or Faculty Advisor to access the portal.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-2.5 bg-[#D91B5C] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Sign In to Member Portal
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Event Registration Modal */}
      <RegisterModal
        event={selectedEventForRegister}
        currentUser={currentUser}
        isOpen={!!selectedEventForRegister}
        onClose={() => setSelectedEventForRegister(null)}
        onConfirmRegistration={handleConfirmRegistration}
      />
    </div>
  );
}

export default App;
