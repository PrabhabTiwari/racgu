import { ClubDocument, ClubEvent, ClubNotice, GalleryPhoto, MemberRegistration, UserProfile } from '../types';
import { INITIAL_DOCUMENTS, INITIAL_EVENTS, INITIAL_GALLERY, INITIAL_MEMBERS, INITIAL_NOTICES, INITIAL_REGISTRATIONS } from '../data/initialData';

const STORAGE_KEYS = {
  EVENTS: 'racgu_events',
  DOCUMENTS: 'racgu_documents',
  NOTICES: 'racgu_notices',
  GALLERY: 'racgu_gallery',
  MEMBERS: 'racgu_members',
  REGISTRATIONS: 'racgu_registrations',
  CURRENT_USER: 'racgu_current_user'
};

function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      if (fallback !== null && fallback !== undefined) {
        localStorage.setItem(key, JSON.stringify(fallback));
      }
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

async function readApiResponse(res: Response, fallback: string): Promise<any> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    if (res.status === 413) throw new Error('The upload is larger than the Apache/PHP post limit.');
    throw new Error(text && !text.trim().startsWith('<') ? text : fallback);
  }
}

export const clubApi = {
  async login(email: string, password: string): Promise<UserProfile> {
    const res = await fetch('/api/index.php/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.error || 'Login failed');
    setLocal(STORAGE_KEYS.CURRENT_USER, json.data);
    return json.data;
  },

  async activateAccount(email: string, temporaryPassword: string, newPassword: string, confirmation: string): Promise<UserProfile> {
    const res = await fetch('/api/index.php/auth/activate', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, temporaryPassword, newPassword, confirmation })
    });
    const json = await readApiResponse(res, 'Account activation failed. Check that PHP and MySQL are running.');
    if (!res.ok || !json.success) throw new Error(json.error || 'Account activation failed.');
    setLocal(STORAGE_KEYS.CURRENT_USER, json.data);
    return json.data;
  },

  // --- EVENTS ---
  async getEvents(): Promise<ClubEvent[]> {
    try {
      const res = await fetch('/api/index.php/events');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocal(STORAGE_KEYS.EVENTS, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback to localStorage
    }
    return getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  async createEvent(eventData: Partial<ClubEvent>): Promise<ClubEvent> {
    const newEvent: ClubEvent = {
      id: 'ev-' + Date.now(),
      title: eventData.title || 'Untitled Event',
      theme: eventData.theme || '',
      category: eventData.category || 'Community Service',
      date: eventData.date || new Date().toISOString().split('T')[0],
      time: eventData.time || '10:00 AM - 01:00 PM',
      location: eventData.location || 'Gandaki University Campus, Pokhara',
      chairperson: eventData.chairperson || 'PST Executive',
      description: eventData.description || '',
      image: eventData.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      status: eventData.status || 'upcoming',
      maxSeats: eventData.maxSeats || 80,
      registeredMembers: [],
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/index.php/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
          setLocal(STORAGE_KEYS.EVENTS, [json.data, ...current]);
          return json.data;
        }
      }
    } catch {
      // Offline fallback
    }

    const current = getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const updated = [newEvent, ...current];
    setLocal(STORAGE_KEYS.EVENTS, updated);
    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<ClubEvent>): Promise<ClubEvent | null> {
    try {
      const res = await fetch(`/api/index.php/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
          const idx = current.findIndex(e => e.id === id);
          if (idx >= 0) {
            current[idx] = json.data;
            setLocal(STORAGE_KEYS.EVENTS, current);
          }
          return json.data;
        }
      }
    } catch {}

    const current = getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const idx = current.findIndex(e => e.id === id);
    if (idx >= 0) {
      current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
      setLocal(STORAGE_KEYS.EVENTS, current);
      return current[idx];
    }
    return null;
  },

  async deleteEvent(id: string): Promise<boolean> {
    try {
      await fetch(`/api/index.php/events/${id}`, { method: 'DELETE' });
    } catch {}

    const current = getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const filtered = current.filter(e => e.id !== id);
    setLocal(STORAGE_KEYS.EVENTS, filtered);
    return true;
  },

  async uploadEventCover(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('cover', file);
    const res = await fetch('/api/index.php/events/upload-cover', {
      method: 'POST', credentials: 'same-origin', body: formData
    });
    const json = await readApiResponse(res, 'The event cover upload did not return a valid API response.');
    if (!res.ok || !json.success || !json.data?.url) throw new Error(json.error || 'Event cover upload failed');
    return json.data.url;
  },

  async registerForEvent(eventId: string, member: { id: string; name: string; email: string; phone: string; notes?: string }): Promise<MemberRegistration> {
    const reg: MemberRegistration = {
      id: 'reg-' + Date.now(),
      eventId,
      eventTitle: '',
      eventDate: '',
      memberId: member.id,
      memberName: member.name,
      memberEmail: member.email,
      memberPhone: member.phone,
      registeredAt: new Date().toLocaleString(),
      status: 'confirmed',
      notes: member.notes || 'Registered online'
    };

    try {
      const res = await fetch(`/api/index.php/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const allRegs = getLocal<MemberRegistration[]>(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
          setLocal(STORAGE_KEYS.REGISTRATIONS, [json.data, ...allRegs]);
          // also update event's registeredMembers locally
          const events = getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
          const ev = events.find(e => e.id === eventId);
          if (ev && !ev.registeredMembers.includes(member.id)) {
            ev.registeredMembers.push(member.id);
            setLocal(STORAGE_KEYS.EVENTS, events);
          }
          return json.data;
        }
      }
      const json = await res.json().catch(() => null);
      throw new Error(json?.error || 'Registration could not be saved. Please try again.');
    } catch (error) {
      throw error instanceof Error ? error : new Error('Registration could not be saved.');
    }
  },

  // --- DOCUMENTS ---
  async getDocuments(): Promise<ClubDocument[]> {
    try {
      const res = await fetch('/api/index.php/documents');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocal(STORAGE_KEYS.DOCUMENTS, json.data);
          return json.data;
        }
      }
    } catch {}
    return getLocal<ClubDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  },

  async uploadDocument(docData: Partial<ClubDocument>): Promise<ClubDocument> {
    const newDoc: ClubDocument = {
      id: 'doc-' + Date.now(),
      title: docData.title || 'Official File',
      category: docData.category || 'Meeting Minutes',
      uploadedBy: docData.uploadedBy || 'PST Secretariat',
      uploadedRole: docData.uploadedRole || 'PST Executive',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: docData.fileSize || '1.5 MB',
      fileType: docData.fileType || 'PDF',
      downloadUrl: docData.downloadUrl || '#download',
      isPstOnly: Boolean(docData.isPstOnly),
      summary: docData.summary || ''
    };

    try {
      const res = await fetch('/api/index.php/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getLocal<ClubDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
          setLocal(STORAGE_KEYS.DOCUMENTS, [json.data, ...current]);
          return json.data;
        }
      }
    } catch {}

    const current = getLocal<ClubDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
    const updated = [newDoc, ...current];
    setLocal(STORAGE_KEYS.DOCUMENTS, updated);
    return newDoc;
  },

  async uploadDocumentFile(file: File): Promise<{ url: string; name: string; size: string; type: string }> {
    const formData = new FormData();
    formData.append('document', file);
    const res = await fetch('/api/index.php/documents/upload', {
      method: 'POST', credentials: 'same-origin', body: formData
    });
    const json = await readApiResponse(res, 'The document upload did not return a valid API response.');
    if (!res.ok || !json.success || !json.data?.url) throw new Error(json.error || 'Document upload failed');
    return json.data;
  },

  async deleteDocument(id: string): Promise<boolean> {
    try {
      await fetch(`/api/index.php/documents/${id}`, { method: 'DELETE' });
    } catch {}
    const current = getLocal<ClubDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
    setLocal(STORAGE_KEYS.DOCUMENTS, current.filter(d => d.id !== id));
    return true;
  },

  // --- NOTICES ---
  async getNotices(): Promise<ClubNotice[]> {
    try {
      const res = await fetch('/api/index.php/notices');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocal(STORAGE_KEYS.NOTICES, json.data);
          return json.data;
        }
      }
    } catch {}
    return getLocal<ClubNotice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
  },

  async createNotice(noticeData: Partial<ClubNotice>): Promise<ClubNotice> {
    const newNotice: ClubNotice = {
      id: 'not-' + Date.now(),
      title: noticeData.title || 'Official Announcement',
      refNo: `RACGU/PUB/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      issuedBy: noticeData.issuedBy || 'Office of Club Secretary',
      date: new Date().toISOString().split('T')[0],
      category: noticeData.category || 'General',
      content: noticeData.content || '',
      isUrgent: Boolean(noticeData.isUrgent),
      attachmentName: noticeData.attachmentName
    };

    try {
      const res = await fetch('/api/index.php/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getLocal<ClubNotice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
          setLocal(STORAGE_KEYS.NOTICES, [json.data, ...current]);
          return json.data;
        }
      }
    } catch {}

    const current = getLocal<ClubNotice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
    const updated = [newNotice, ...current];
    setLocal(STORAGE_KEYS.NOTICES, updated);
    return newNotice;
  },

  async deleteNotice(id: string): Promise<boolean> {
    try {
      await fetch(`/api/index.php/notices/${id}`, { method: 'DELETE' });
    } catch {}
    const current = getLocal<ClubNotice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
    setLocal(STORAGE_KEYS.NOTICES, current.filter(n => n.id !== id));
    return true;
  },

  // --- GALLERY ---
  async getGallery(): Promise<GalleryPhoto[]> {
    try {
      const res = await fetch('/api/index.php/gallery');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocal(STORAGE_KEYS.GALLERY, json.data);
          return json.data;
        }
      }
    } catch {}
    return getLocal<GalleryPhoto[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  },

  async uploadPhoto(photoData: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
    const newPhoto: GalleryPhoto = {
      id: 'gal-' + Date.now(),
      title: photoData.title || 'Event Photograph',
      eventTitle: photoData.eventTitle || 'Club Service Event',
      date: photoData.date || new Date().toISOString().split('T')[0],
      imageUrl: photoData.imageUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=900',
      category: photoData.category || 'Community Service',
      caption: photoData.caption || ''
    };

    try {
      const res = await fetch('/api/index.php/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getLocal<GalleryPhoto[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
          setLocal(STORAGE_KEYS.GALLERY, [json.data, ...current]);
          return json.data;
        }
      }
    } catch {}

    const current = getLocal<GalleryPhoto[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
    const updated = [newPhoto, ...current];
    setLocal(STORAGE_KEYS.GALLERY, updated);
    return newPhoto;
  },

  async uploadGalleryFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('photo', file);
    const res = await fetch('/api/index.php/gallery/upload', {
      method: 'POST', credentials: 'same-origin', body: formData
    });
    const json = await readApiResponse(res, 'The gallery upload did not return a valid API response.');
    if (!res.ok || !json.success || !json.data?.url) throw new Error(json.error || 'Photo upload failed');
    return json.data.url;
  },

  async deletePhoto(id: string): Promise<boolean> {
    try {
      await fetch(`/api/index.php/gallery/${id}`, { method: 'DELETE' });
    } catch {}
    const current = getLocal<GalleryPhoto[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
    setLocal(STORAGE_KEYS.GALLERY, current.filter(p => p.id !== id));
    return true;
  },

  // --- MEMBERS ---
  async getMembers(): Promise<UserProfile[]> {
    try {
      const res = await fetch('/api/index.php/members');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          // The users table stores portal accounts, not the authoritative public
          // roster. Merge matching accounts into the verified roster so a small
          // number of login accounts cannot replace the full club directory.
          const accounts = json.data as UserProfile[];
          const normalize = (value?: string) => (value || '').trim().toLowerCase();
          const roster = INITIAL_MEMBERS.map(member => {
            const account = accounts.find(candidate =>
              normalize(candidate.email) === normalize(member.email) ||
              normalize(candidate.name) === normalize(member.name)
            );
            const officialFaculty = member.role === 'advisor'
              ? member.faculty
              : 'Bachelor of Information Technology (BIT)';

            if (!account) return { ...member, faculty: officialFaculty };

            return {
              ...member,
              ...account,
              // Official media and public role information remain controlled by
              // the verified roster while the database supplies the login ID.
              avatar: member.avatar,
              role: member.role,
              roleTitle: member.roleTitle,
              badge: member.badge,
              faculty: officialFaculty
            };
          });
          setLocal(STORAGE_KEYS.MEMBERS, roster);
          return roster;
        }
      }
    } catch {}
    const local = getLocal<UserProfile[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    if (!local || local.length !== INITIAL_MEMBERS.length || local[0]?.name !== INITIAL_MEMBERS[0]?.name) {
      setLocal(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
      return INITIAL_MEMBERS;
    }
    return local;
  },

  async updateMemberProfile(id: string, updates: Pick<UserProfile, 'bio'>): Promise<UserProfile> {
    const res = await fetch('/api/index.php/members/me', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio: updates.bio })
    });
    const json = await readApiResponse(res, 'The profile update did not return a valid API response.');
    if (!res.ok || !json.success || !json.data) throw new Error(json.error || 'Profile update failed.');

    const updated = { ...this.getCurrentUser(), ...json.data } as UserProfile;
    const current = getLocal<UserProfile[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const idx = current.findIndex(member => member.id === id);
    if (idx >= 0) current[idx] = { ...current[idx], ...updated };
    setLocal(STORAGE_KEYS.MEMBERS, current);
    setLocal(STORAGE_KEYS.CURRENT_USER, updated);
    return updated;
  },

  // --- REGISTRATIONS ---
  async getRegistrations(): Promise<MemberRegistration[]> {
    try {
      const res = await fetch('/api/index.php/registrations');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocal(STORAGE_KEYS.REGISTRATIONS, json.data);
          return json.data;
        }
      }
    } catch {}
    return getLocal<MemberRegistration[]>(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  },

  // --- AUTH SESSION ---
  getCurrentUser(): UserProfile | null {
    return getLocal<UserProfile | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user: UserProfile | null): void {
    setLocal(STORAGE_KEYS.CURRENT_USER, user);
  },

  logout(): void {
    fetch('/api/index.php/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => undefined);
    setLocal(STORAGE_KEYS.CURRENT_USER, null);
  }
};
