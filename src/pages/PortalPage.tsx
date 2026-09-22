import React, { useState } from 'react';
import { 
  ClubDocument, 
  ClubEvent, 
  ClubNotice, 
  GalleryPhoto, 
  MemberRegistration, 
  UserProfile, 
  EventCategory 
} from '../types';
import { clubApi } from '../services/api';

interface PortalPageProps {
  currentUser: UserProfile;
  events: ClubEvent[];
  documents: ClubDocument[];
  notices: ClubNotice[];
  gallery: GalleryPhoto[];
  registrations: MemberRegistration[];
  onRefreshRegistrations: () => Promise<void>;
  onAddEvent: (event: Partial<ClubEvent>) => Promise<any>;
  onUpdateEvent: (id: string, updates: Partial<ClubEvent>) => Promise<any>;
  onDeleteEvent: (id: string) => Promise<any>;
  onUploadDocument: (doc: Partial<ClubDocument>) => Promise<any>;
  onDeleteDocument: (id: string) => Promise<any>;
  onAddNotice: (notice: Partial<ClubNotice>) => Promise<any>;
  onDeleteNotice: (id: string) => Promise<any>;
  onAddPhoto: (photo: Partial<GalleryPhoto>) => Promise<any>;
  onDeletePhoto: (id: string) => Promise<any>;
  setActiveTab: (tab: string) => void;
}

export const PortalPage: React.FC<PortalPageProps> = ({
  currentUser,
  events,
  documents,
  notices,
  gallery,
  registrations,
  onRefreshRegistrations,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onUploadDocument,
  onDeleteDocument,
  onAddNotice,
  onDeleteNotice,
  onAddPhoto,
  onDeletePhoto,
  setActiveTab
}) => {
  const [portalTab, setPortalTab] = useState<'overview' | 'events' | 'documents' | 'registrations' | 'notices' | 'gallery' | 'profile'>('overview');
  
  const isPst = currentUser.role === 'pst';
  const isBod = currentUser.role === 'bod' || isPst;

  // Event form state
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventCoverFile, setEventCoverFile] = useState<File | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventFormData, setEventFormData] = useState<Partial<ClubEvent>>({
    title: '',
    theme: '',
    category: 'Community Service',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM - 02:00 PM NPT',
    location: 'Gandaki University Campus, Pokhara',
    chairperson: `${currentUser.name} (${currentUser.roleTitle})`,
    description: '',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    maxSeats: 100,
    status: 'upcoming'
  });

  // Document form state
  const [showDocForm, setShowDocForm] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [docFormData, setDocFormData] = useState<Partial<ClubDocument>>({
    title: '',
    category: 'Meeting Minutes',
    fileSize: '1.4 MB',
    fileType: 'PDF',
    isPstOnly: false,
    summary: ''
  });

  // Notice form state
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeFormData, setNoticeFormData] = useState<Partial<ClubNotice>>({
    title: '',
    category: 'General',
    content: '',
    isUrgent: false,
    attachmentName: ''
  });

  // Photo form state
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoFormData, setPhotoFormData] = useState<Partial<GalleryPhoto>>({
    title: '',
    eventTitle: '',
    category: 'Community Service',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=900',
    caption: ''
  });

  const [statusMessage, setStatusMessage] = useState<string>('');
  const [selectedEventAttendees, setSelectedEventAttendees] = useState<ClubEvent | null>(null);

  const flashMessage = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const myRegistrations = registrations.filter(r => r.memberId === currentUser.id);

  // Document download handler with PST RBAC enforcement
  const handleDownloadDocument = (doc: ClubDocument) => {
    if (doc.isPstOnly && !isPst) {
      alert(`Access Restricted: "${doc.title}" is classified for Executive PST members only (President, Secretary, Treasurer). Your current role is ${currentUser.roleTitle}.`);
      return;
    }

    if (doc.downloadUrl && doc.downloadUrl !== '#download') {
      const link = document.createElement('a');
      link.href = doc.downloadUrl;
      link.download = doc.title;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Preserve a text download for older records that have no uploaded file.
    const fileContent = `=====================================================
ROTARACT CLUB OF GANDAKI UNIVERSITY (RID 3292, Zone XVI)
Official Document Repository - Club No. 8828026
=====================================================

Title:          ${doc.title}
Category:       ${doc.category}
Uploaded On:    ${doc.uploadDate}
Uploaded By:    ${doc.uploadedBy}
File Format:    ${doc.fileType} (${doc.fileSize})
Classification: ${doc.isPstOnly ? 'PST Confidential (Executive Only)' : 'General Member Archive'}

-----------------------------------------------------
EXECUTIVE SUMMARY / CONTENT:
-----------------------------------------------------
${doc.summary || 'Official record of the Rotaract Club of Gandaki University.'}

Verified by: Executive Committee, Rotaract Club of Gandaki University
Gandaki University Campus, Pokhara-32, Kaski, Nepal
=====================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Official.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    flashMessage(`Downloaded "${doc.title}".`);
  };

  // Event handlers
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPst) {
      alert('Only Executive PST (President, Secretary, Treasurer) can publish or edit events.');
      return;
    }

    try {
      const image = eventCoverFile ? await clubApi.uploadEventCover(eventCoverFile) : eventFormData.image;
      const payload = { ...eventFormData, image };
      if (editingEventId) {
        await onUpdateEvent(editingEventId, payload);
        flashMessage(`Event "${eventFormData.title}" updated successfully.`);
        setEditingEventId(null);
      } else {
        await onAddEvent(payload);
        flashMessage(`New event "${eventFormData.title}" created.`);
      }
      setEventCoverFile(null);
      setShowEventForm(false);
    } catch (error) {
      flashMessage(error instanceof Error ? error.message : 'The event could not be saved.');
    }
  };

  const startEditEvent = (ev: ClubEvent) => {
    if (!isPst) {
      alert('Only Executive PST can modify club events.');
      return;
    }
    setEditingEventId(ev.id);
    setEventFormData({ ...ev });
    setShowEventForm(true);
    setPortalTab('events');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (ev: ClubEvent) => {
    if (!isPst) {
      alert('Only Executive PST can delete club events.');
      return;
    }
    if (confirm(`Are you sure you want to delete "${ev.title}"? This cannot be undone.`)) {
      await onDeleteEvent(ev.id);
      flashMessage(`Event "${ev.title}" has been deleted.`);
      if (selectedEventAttendees?.id === ev.id) {
        setSelectedEventAttendees(null);
      }
    }
  };

  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPst) {
      alert('Only Executive PST can upload official documents to the vault.');
      return;
    }
    if (!documentFile) {
      flashMessage('Select a document file before uploading.');
      return;
    }
    try {
      const uploaded = await clubApi.uploadDocumentFile(documentFile);
      await onUploadDocument({
        ...docFormData,
        downloadUrl: uploaded.url,
        fileSize: uploaded.size,
        fileType: uploaded.type as ClubDocument['fileType'],
        uploadedBy: `${currentUser.name} (${currentUser.roleTitle})`,
        uploadedRole: currentUser.role.toUpperCase()
      });
      flashMessage(`Document "${docFormData.title}" uploaded to the vault.`);
      setDocumentFile(null);
      setShowDocForm(false);
      setDocFormData({ title: '', category: 'Meeting Minutes', fileSize: '1.4 MB', fileType: 'PDF', isPstOnly: false, summary: '' });
    } catch (error) {
      flashMessage(error instanceof Error ? error.message : 'Document upload failed.');
    }
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPst) {
      alert('Only Executive PST can issue official notices.');
      return;
    }
    await onAddNotice({
      ...noticeFormData,
      issuedBy: `Office of ${currentUser.roleTitle}`
    });
    flashMessage(`Notice "${noticeFormData.title}" published.`);
    setShowNoticeForm(false);
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPst || !photoFile) {
      flashMessage(!isPst ? 'Only PST officers can upload photographs.' : 'Select a photo first.');
      return;
    }
    try {
      const imageUrl = await clubApi.uploadGalleryFile(photoFile);
      await onAddPhoto({ ...photoFormData, imageUrl });
      flashMessage(`Photo "${photoFormData.title}" added to the gallery.`);
      setPhotoFile(null);
      setShowPhotoForm(false);
    } catch (error) {
      flashMessage(error instanceof Error ? error.message : 'Photo upload failed.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Flash Status Notification */}
      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <span>{statusMessage}</span>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs text-emerald-800 underline font-bold"
          >
            View Live Site &rarr;
          </button>
        </div>
      )}

      {/* Member Session Identity Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white ${
                  currentUser.role === 'pst' ? 'bg-[#D91B5C]' : currentUser.role === 'bod' ? 'bg-blue-800' : 'bg-emerald-800'
                }`}>
                  {currentUser.badge}
                </span>
                <span className="text-xs text-slate-500 font-mono">ID: {currentUser.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {currentUser.name}
              </h1>
              <p className="text-xs font-semibold text-[#D91B5C]">
                {currentUser.roleTitle} • {currentUser.faculty}
              </p>
            </div>
          </div>

          {isPst && (
            <a href="/api/create-user.php" className="px-4 py-2.5 rounded-lg bg-[#D91B5C] text-white text-xs font-bold">
              Manage Member Accounts
            </a>
          )}
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-slate-100 pt-4">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'events', label: isPst ? 'PST Event Management' : 'Club Events' },
            { id: 'documents', label: 'Documents Vault' },
            { id: 'registrations', label: `My Registrations (${myRegistrations.length})` },
            { id: 'notices', label: isPst ? 'Manage Notices' : 'Club Notices' },
            { id: 'gallery', label: 'Photo Gallery' },
            { id: 'profile', label: 'My Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPortalTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                portalTab === tab.id
                  ? 'bg-[#D91B5C] text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: OVERVIEW */}
      {/* ============================================================ */}
      {portalTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-xl font-bold text-slate-900 block">{events.length}</span>
              <span className="text-xs text-slate-500">Club Events</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-xl font-bold text-[#D91B5C] block">{documents.length}</span>
              <span className="text-xs text-slate-500">Vault Documents</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-xl font-bold text-slate-900 block">{notices.length}</span>
              <span className="text-xs text-slate-500">Active Notices</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-xl font-bold text-emerald-700 block">{myRegistrations.length}</span>
              <span className="text-xs text-slate-500">My Registrations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick PST Powers Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider block">
                Access Tier: {currentUser.role.toUpperCase()}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {isPst ? 'Executive PST Privileges Active' : 'Member Portal Access'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isPst 
                  ? 'As a member of the Executive PST (President, Secretary, Treasurer), you have full administrative clearance to create and edit club events, download confidential minutes and financial statements, issue official circulars, and monitor attendance rosters.'
                  : 'As an active member, you can download general club documents, register for service initiatives, view official circulars, and access your profile credentials.'}
              </p>

              {isPst && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setPortalTab('events');
                      setShowEventForm(true);
                    }}
                    className="px-3 py-1.5 rounded bg-[#D91B5C] text-white text-xs font-bold"
                  >
                    + Create Event
                  </button>
                  <button
                    onClick={() => {
                      setPortalTab('documents');
                      setShowDocForm(true);
                    }}
                    className="px-3 py-1.5 rounded bg-slate-800 text-white text-xs font-bold"
                  >
                    + Upload Document
                  </button>
                </div>
              )}
            </div>

            {/* My Profile Quick Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Official Roster Record
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {currentUser.name}
              </h3>
              <div className="space-y-1 text-xs text-slate-600">
                <p><strong>Faculty:</strong> {currentUser.faculty}</p>
                <p><strong>Blood Group:</strong> {currentUser.bloodGroup}</p>
                <p><strong>Phone:</strong> {currentUser.phone}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Inducted:</strong> {currentUser.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: EVENTS & PST EVENT MANAGEMENT */}
      {/* ============================================================ */}
      {portalTab === 'events' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isPst ? 'PST Event Management Panel' : 'Club Events Schedule'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isPst 
                  ? 'Authorized for Executive PST: Create, edit, publish, and delete official club events.'
                  : 'View all upcoming service projects and track registrations.'}
              </p>
            </div>

            {isPst && (
              <button
                onClick={() => {
                  setEditingEventId(null);
                  setShowEventForm(!showEventForm);
                }}
                className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
              >
                {showEventForm ? 'Close Form' : '+ New Event'}
              </button>
            )}
          </div>

          {/* Event Form (PST Only) */}
          {isPst && showEventForm && (
            <form onSubmit={handleSaveEvent} className="bg-slate-50 rounded-2xl border border-pink-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                {editingEventId ? 'Edit Event Details' : 'Publish New Service Project or Assembly'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="e.g. Begnas Lake Cleanliness Campaign"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Avenue Category</label>
                  <select
                    value={eventFormData.category}
                    onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  >
                    <option value="Community Service">Community Service</option>
                    <option value="Professional Development">Professional Development</option>
                    <option value="Club Service">Club Service</option>
                    <option value="International Service">International Service</option>
                    <option value="Youth & Sports">Youth & Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Time</label>
                  <input
                    type="text"
                    value={eventFormData.time}
                    onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                    placeholder="e.g. 10:00 AM - 02:00 PM NPT"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={eventFormData.status || 'upcoming'}
                    onChange={(e) => setEventFormData({ ...eventFormData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location / Venue</label>
                  <input
                    type="text"
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    placeholder="e.g. Gandaki University Auditorium"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Chairperson / Lead</label>
                  <input
                    type="text"
                    value={eventFormData.chairperson}
                    onChange={(e) => setEventFormData({ ...eventFormData, chairperson: e.target.value })}
                    placeholder="e.g. Rtr. Prabhab Tiwari (Charter President)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Objectives</label>
                <textarea
                  rows={3}
                  value={eventFormData.description}
                  onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                  placeholder="Outline project objectives, logistics, and student responsibilities..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Cover Photo</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setEventCoverFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800 file:mr-3 file:border-0 file:rounded file:bg-pink-50 file:px-3 file:py-1 file:text-[#D91B5C] file:font-bold"
                />
                <p className="mt-1 text-[11px] text-slate-500">JPG, PNG or WebP, maximum 8 MB. When editing, leave empty to retain the current cover.</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded"
                >
                  {editingEventId ? 'Save Updates' : 'Publish Event'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Events List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Club Events Registry ({events.length})
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{isPst ? 'PST Controls Enabled' : 'Member View'}</span>
                {isPst && <button type="button" onClick={() => void onRefreshRegistrations()} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-100">Refresh Attendees</button>}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {events.map((ev) => (
                <div key={ev.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-50 text-[#D91B5C] uppercase border border-pink-200">
                        {ev.category}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        {ev.date} • {ev.time}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        ev.status === 'completed' ? 'bg-slate-200 text-slate-700' : ev.status === 'ongoing' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {ev.status || 'upcoming'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{ev.title}</h4>
                    <p className="text-xs text-slate-600">{ev.description}</p>
                    <p className="text-[11px] text-slate-500">Venue: {ev.location} • Lead: {ev.chairperson}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isPst && (
                      <button
                        onClick={() => setActiveTab('events')}
                        className="px-3 py-1.5 rounded bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold"
                      >
                        Register
                      </button>
                    )}

                    {isPst && (
                      <button
                        onClick={() => setSelectedEventAttendees(ev)}
                        className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold"
                      >
                        Attendees ({registrations.filter(r => r.eventId === ev.id).length})
                      </button>
                    )}

                    {isPst && (
                      <>
                        <button
                          onClick={() => startEditEvent(ev)}
                          className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev)}
                          className="px-3 py-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendees Modal */}
          {isPst && selectedEventAttendees && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Attendees Roster: {selectedEventAttendees.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Total Registered: {registrations.filter(r => r.eventId === selectedEventAttendees.id).length}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEventAttendees(null)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded"
                  >
                    Close
                  </button>
                </div>

                {registrations.filter(r => r.eventId === selectedEventAttendees.id).length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    No members have registered for this event yet.
                  </p>
                ) : (
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {registrations.filter(r => r.eventId === selectedEventAttendees.id).map((regRecord, i) => {
                      const attendeeId = regRecord.memberId;
                      const foundMember = INITIAL_MEMBERS.find(m => m.id === attendeeId);
                      const name = foundMember?.name || regRecord.memberName;
                      const email = foundMember?.email || regRecord.memberEmail;
                      const phone = foundMember?.phone || regRecord.memberPhone;
                      const faculty = foundMember ? foundMember.faculty : 'Gandaki University';

                      return (
                        <div key={i} className="py-2.5 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 block">{name} ({faculty})</span>
                            <span className="text-[11px] text-slate-500">{email} • {phone}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">
                            ID: {attendeeId}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedEventAttendees(null)}
                    className="px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: DOCUMENTS VAULT (WITH PST ACCESS RESTRICTIONS) */}
      {/* ============================================================ */}
      {portalTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Official Documents & Minutes Vault
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Meeting minutes, financial records, bylaws, and district circulars. 
                Confidential records are restricted to Executive PST members.
              </p>
            </div>

            {isPst && (
              <button
                onClick={() => setShowDocForm(!showDocForm)}
                className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
              >
                {showDocForm ? 'Close Form' : '+ Upload Document (PST)'}
              </button>
            )}
          </div>

          {/* Upload Document Form (PST Only) */}
          {isPst && showDocForm && (
            <form onSubmit={handleSaveDocument} className="bg-slate-50 rounded-2xl border border-pink-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Upload Document to Club Vault
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={docFormData.title}
                    onChange={(e) => setDocFormData({ ...docFormData, title: e.target.value })}
                    placeholder="e.g. Minutes of 10th BOD Assembly"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={docFormData.category}
                    onChange={(e) => setDocFormData({ ...docFormData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  >
                    <option value="Meeting Minutes">Meeting Minutes</option>
                    <option value="Project Reports">Project Reports</option>
                    <option value="Club Bylaws">Club Bylaws</option>
                    <option value="Financial Statements">Financial Statements</option>
                    <option value="District Guidelines">District Guidelines</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Document File *</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                    onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800 file:mr-3 file:border-0 file:rounded file:bg-pink-50 file:px-3 file:py-1 file:text-[#D91B5C] file:font-bold"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">PDF, Word, Excel or ZIP, maximum 15 MB.</p>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="docPstOnly"
                    checked={docFormData.isPstOnly}
                    onChange={(e) => setDocFormData({ ...docFormData, isPstOnly: e.target.checked })}
                    className="w-4 h-4 text-[#D91B5C] rounded"
                  />
                  <label htmlFor="docPstOnly" className="text-xs font-bold text-slate-700">
                    Restricted: PST Only (President, Secretary, Treasurer)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Record Excerpt</label>
                <textarea
                  rows={2}
                  value={docFormData.summary}
                  onChange={(e) => setDocFormData({ ...docFormData, summary: e.target.value })}
                  placeholder="Summary of agenda, resolutions passed, or financial balance..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded"
                >
                  Upload into Vault
                </button>
                <button
                  type="button"
                  onClick={() => setShowDocForm(false)}
                  className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Document Vault Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => {
              const isRestrictedForUser = doc.isPstOnly && !isPst;

              return (
                <div
                  key={doc.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${
                    isRestrictedForUser 
                      ? 'bg-slate-50 border-slate-200 opacity-90' 
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 uppercase">
                        {doc.category}
                      </span>
                      {doc.isPstOnly && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                          PST Confidential
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {doc.summary}
                    </p>

                    <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                      <p>Uploaded by: {doc.uploadedBy}</p>
                      <p>Date: {doc.uploadDate} • Size: {doc.fileSize} ({doc.fileType})</p>
                    </div>

                    {isRestrictedForUser && (
                      <div className="p-2 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-medium">
                        Access Restricted: This document is classified for Executive PST members only.
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      className={`px-3.5 py-1.5 rounded text-xs font-bold transition-colors ${
                        isRestrictedForUser
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-pink-50 hover:bg-[#D91B5C] text-[#D91B5C] hover:text-white border border-pink-200'
                      }`}
                    >
                      {isRestrictedForUser ? 'PST Restricted' : 'Download Document'}
                    </button>

                    {isPst && (
                      <button
                        onClick={async () => {
                          if (confirm(`Delete document "${doc.title}"?`)) {
                            await onDeleteDocument(doc.id);
                            flashMessage(`Document "${doc.title}" deleted.`);
                          }
                        }}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: MY REGISTRATIONS */}
      {/* ============================================================ */}
      {portalTab === 'registrations' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              My Active Project Registrations
            </h2>
            <p className="text-xs text-slate-500">
              Service projects and gatherings you have officially signed up for.
            </p>
          </div>

          {myRegistrations.length === 0 ? (
            <p className="text-xs text-slate-500 py-6">
              You have not registered for any upcoming events yet. Check the events tab to sign up.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {myRegistrations.map((reg) => (
                <div key={reg.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#D91B5C] uppercase">Confirmed Participation</span>
                    <h4 className="text-sm font-bold text-slate-900">{reg.eventTitle || 'Service Initiative'}</h4>
                    <p className="text-xs text-slate-500">Registered at: {reg.registeredAt}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-start sm:self-center">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: NOTICES */}
      {/* ============================================================ */}
      {portalTab === 'notices' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Official Notices & Circulars
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Executive circulars issued to members.
              </p>
            </div>

            {isPst && (
              <button
                onClick={() => setShowNoticeForm(!showNoticeForm)}
                className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
              >
                {showNoticeForm ? 'Close Form' : '+ Issue Notice (PST)'}
              </button>
            )}
          </div>

          {isPst && showNoticeForm && (
            <form onSubmit={handleSaveNotice} className="bg-slate-50 rounded-2xl border border-pink-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Issue Official Club Notice
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={noticeFormData.title}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                    placeholder="e.g. Call for General Assembly"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeFormData.category}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  >
                    <option value="General">General Notice</option>
                    <option value="Meeting">Meeting Call</option>
                    <option value="Event">Event Circular</option>
                    <option value="Urgent">Urgent Circular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Content</label>
                <textarea
                  rows={3}
                  required
                  value={noticeFormData.content}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, content: e.target.value })}
                  placeholder="Full text of the notice..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noticeUrgent"
                  checked={noticeFormData.isUrgent}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, isUrgent: e.target.checked })}
                  className="w-4 h-4 text-[#D91B5C] rounded"
                />
                <label htmlFor="noticeUrgent" className="text-xs font-bold text-slate-700">
                  Mark as Urgent Circular
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded"
                >
                  Publish Notice
                </button>
                <button
                  type="button"
                  onClick={() => setShowNoticeForm(false)}
                  className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                    {n.category}
                  </span>
                  <span className="text-xs text-slate-400">{n.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Issued By: {n.issuedBy}</span>
                  {isPst && (
                    <button
                      onClick={async () => {
                        if (confirm(`Delete notice "${n.title}"?`)) {
                          await onDeleteNotice(n.id);
                          flashMessage(`Notice "${n.title}" removed.`);
                        }
                      }}
                      className="text-rose-600 hover:text-rose-800 font-bold"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: PHOTO GALLERY */}
      {/* ============================================================ */}
      {portalTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Club Photo Archive
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official photographs from service initiatives and meetings.
              </p>
            </div>

            {isPst && (
              <button
                onClick={() => setShowPhotoForm(!showPhotoForm)}
                className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
              >
                {showPhotoForm ? 'Close Form' : 'Upload Photo'}
              </button>
            )}
          </div>

          {isPst && showPhotoForm && (
            <form onSubmit={handleSavePhoto} className="bg-slate-50 rounded-2xl border border-pink-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Add Photo to Club Gallery
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={photoFormData.title}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, title: e.target.value })}
                    placeholder="e.g. Tree Plantation Drive"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    value={photoFormData.eventTitle}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, eventTitle: e.target.value })}
                    placeholder="e.g. Green Pokhara Project"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo file *</label>
                <input
                  type="file"
                  required
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                />
                <p className="mt-1 text-[11px] text-slate-500">JPG, PNG or WebP, maximum 5 MB.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption</label>
                <input
                  type="text"
                  value={photoFormData.caption}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, caption: e.target.value })}
                  placeholder="Brief description of the photo..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded"
                >
                  Save Photo
                </button>
                <button
                  type="button"
                  onClick={() => setShowPhotoForm(false)}
                  className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">{item.caption || item.eventTitle}</p>
                  {isPst && (
                    <button
                      onClick={async () => {
                        if (confirm(`Delete photo "${item.title}"?`)) {
                          await onDeletePhoto(item.id);
                          flashMessage(`Photo "${item.title}" deleted.`);
                        }
                      }}
                      className="text-[11px] text-rose-600 hover:underline font-semibold pt-1 block"
                    >
                      Delete Photo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 7: MY PROFILE */}
      {/* ============================================================ */}
      {portalTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Member Credentials & Verification
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-32 h-40 rounded-xl object-cover border border-slate-200"
            />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold text-[#D91B5C] uppercase tracking-wider block">
                {currentUser.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{currentUser.name}</h3>
              <p className="text-sm font-semibold text-slate-700">{currentUser.roleTitle}</p>
              <div className="space-y-1 text-xs text-slate-600 pt-2">
                <p><strong>Faculty:</strong> {currentUser.faculty}</p>
                <p><strong>Blood Group:</strong> {currentUser.bloodGroup}</p>
                <p><strong>Phone:</strong> {currentUser.phone}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Joined Date:</strong> {currentUser.joinedDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Official Bio
            </span>
            <p>{currentUser.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};
