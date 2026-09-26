export type UserRole = 'pst' | 'bod' | 'member' | 'advisor';

export interface UserProfile {
  id: string;
  districtId?: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string; // e.g., "President", "Secretary", "Director of Community Service", "General Member", "Faculty Advisor"
  avatar: string;
  phone: string;
  faculty: string; // Gandaki University Faculty, e.g., "BBA", "B.Tech AI", "Pharmacy", "Sports Science"
  bloodGroup: string;
  joinedDate: string;
  bio: string;
  badge?: string;
  mustChangePassword?: boolean;
}

export type EventCategory = 'Community Service' | 'Club Service' | 'Professional Development' | 'International Service' | 'Youth & Sports';

export interface ClubEvent {
  id: string;
  title: string;
  theme?: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // e.g., "11:00 AM - 02:00 PM"
  location: string;
  chairperson: string;
  description: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  maxSeats?: number;
  registeredMembers: string[]; // member ids or names
  createdAt: string;
  updatedAt?: string;
}

export interface ClubNotice {
  id: string;
  title: string;
  refNo: string;
  issuedBy: string; // e.g. "Club Secretariat", "Office of the President"
  date: string;
  category: 'General' | 'Urgent' | 'Board Meeting' | 'Project' | 'District 3292';
  content: string;
  isUrgent: boolean;
  attachmentName?: string;
  attachmentUrl?: string;
}

export interface ClubDocument {
  id: string;
  title: string;
  category: 'Meeting Minutes' | 'Project Reports' | 'Club Bylaws' | 'Financial Statements' | 'District Guidelines';
  uploadedBy: string;
  uploadedRole: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  downloadUrl: string;
  isPstOnly: boolean;
  summary: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  eventTitle: string;
  date: string;
  imageUrl: string;
  category: EventCategory;
  caption: string;
}

export interface MemberRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  registeredAt: string;
  status: 'confirmed' | 'attended' | 'cancelled';
  notes?: string;
}
