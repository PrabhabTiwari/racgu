import { ClubDocument, ClubEvent, ClubNotice, GalleryPhoto, UserProfile } from '../types';

/**
 * Official Roster of Rotaract Club of Gandaki University (RY 2026-27)
 * Directly matching the official charter team design banner.
 */
export const INITIAL_MEMBERS: UserProfile[] = [
  // ==========================================
  // BOARD OF DIRECTORS (BOD)
  // ==========================================
  {
    id: 'bod-1',
    districtId: 'RTR23813',
    name: 'Rtr. Prabhab Tiwari',
    email: 'president.racgu@gandaki.edu.np',
    role: 'pst',
    roleTitle: 'Charter President',
    avatar: '/members/prabhab.webp',
    phone: '+977 9748421238',
    faculty: 'B.Tech AI & Data Science',
    bloodGroup: 'B+ve',
    joinedDate: 'Jan 2026',
    bio: 'Charter President of Rotaract Club of Gandaki University for RY 2026-27 under the presidential theme "Insight to Impact". Dedicated to impactful leadership and civic service.',
    badge: 'Charter President'
  },
  {
    id: 'bod-2',
    districtId: 'RTR26242',
    name: 'Rtr. Sujan Shrestha',
    email: 'secretary.racgu@gandaki.edu.np',
    role: 'pst',
    roleTitle: 'Secretary',
    avatar: '/members/sujan-shrestha.webp',
    phone: '',
    faculty: 'BBA (Entrepreneurship)',
    bloodGroup: 'O+ve',
    joinedDate: 'Jan 2026',
    bio: 'Club Secretary overseeing administration, district reporting, meeting minutes, and official communications for RY 2026-27.',
    badge: 'Club Secretary'
  },
  {
    id: 'bod-3',
    districtId: 'RTR26244',
    name: 'Rtr. Madhab Khanal',
    email: 'treasurer.racgu@gandaki.edu.np',
    role: 'pst',
    roleTitle: 'Treasurer',
    avatar: '/members/madhab.webp',
    phone: '+977 9866034567',
    faculty: 'BBA (Finance)',
    bloodGroup: 'A+ve',
    joinedDate: 'Jan 2026',
    bio: 'Club Treasurer managing financial transparency, project budget allocations, audit reports, and dues administration.',
    badge: 'Club Treasurer'
  },
  {
    id: 'bod-4',
    districtId: 'RTR26243',
    name: 'Rtr. Shreya Subedi',
    email: 'shreya.subedi@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Joint-Secretary',
    avatar: '/members/shreya.webp',
    phone: '+977 9846044401',
    faculty: 'Bachelor in Pharmacy',
    bloodGroup: 'AB+ve',
    joinedDate: 'Jan 2026',
    bio: 'Assisting the secretariat in membership records, attendance logs, and administrative documentation.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-5',
    districtId: 'RTR26245',
    name: 'Rtr. Rajiv Rimal',
    email: 'rajiv.rimal@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Joint-Treasurer/SAA',
    avatar: '/members/rajiv.webp',
    phone: '+977 9846044402',
    faculty: 'Bachelor of Sports Management',
    bloodGroup: 'A+ve',
    joinedDate: 'Jan 2026',
    bio: 'Supporting club treasury operations and maintaining meeting decorum, protocol, and club assets as Sergeant-at-Arms.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-6',
    districtId: 'RTR26252',
    name: 'Rtr. Raj Dhakal',
    email: 'raj.dhakal@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Editor/PRO',
    avatar: '/members/raj.webp',
    phone: '+977 9846044403',
    faculty: 'B.Tech AI & Data Science',
    bloodGroup: 'B+ve',
    joinedDate: 'Jan 2026',
    bio: 'Leading public relations, club publications, news bulletin editing, and press releases.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-7',
    districtId: 'RTR26250',
    name: 'Rtr. Manila Adhikari',
    email: 'manila.adhikari@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Club Administration Chair',
    avatar: '/members/manila.webp',
    phone: '+977 9846044404',
    faculty: 'BBA',
    bloodGroup: 'O+ve',
    joinedDate: 'Jan 2026',
    bio: 'Managing club logistics, internal coordination, operational protocol, and assembly compliance.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-8',
    districtId: 'RTR26247',
    name: 'Rtr. Sandhya Sharma',
    email: 'sandhya.sharma@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Service Area Project',
    avatar: '/members/sandhya.webp',
    phone: '+977 9846044405',
    faculty: 'Bachelor in Pharmacy',
    bloodGroup: 'A+ve',
    joinedDate: 'Jan 2026',
    bio: 'Coordinating localized community outreach, health initiatives, and service area engagements across Pokhara.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-9',
    districtId: 'RTR26248',
    name: 'Rtr. Rakhi Bhujel',
    email: 'rakhi.bhujel@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Service Project Chair',
    avatar: '/members/rakhi.webp',
    phone: '+977 9846044406',
    faculty: 'BBA',
    bloodGroup: 'B+ve',
    joinedDate: 'Jan 2026',
    bio: 'Directing community service projects, social welfare drives, and civic volunteer mobilization.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-10',
    districtId: 'RTR26253',
    name: 'Rtr. Sanjana Adhikari',
    email: 'sanjana.adhikari@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Event Management Chair',
    avatar: '/members/sanjana.webp',
    phone: '+977 9846044407',
    faculty: 'BBA',
    bloodGroup: 'O+ve',
    joinedDate: 'Jan 2026',
    bio: 'Overseeing event planning, stage management, university venue logistics, and hospitality for club assemblies.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-11',
    districtId: 'RTR26255',
    name: 'Rtr. Sujan Giri',
    email: 'sujan.giri@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'Sports Co-ordinator',
    avatar: '/members/sujan-giri.webp',
    phone: '+977 9846044408',
    faculty: 'Bachelor of Sports Management',
    bloodGroup: 'AB+ve',
    joinedDate: 'Jan 2026',
    bio: 'Organizing inter-faculty sports tournaments, athletic fellowships, and wellness initiatives for university youth.',
    badge: 'Board of Directors'
  },
  {
    id: 'bod-12',
    districtId: 'RTR26241',
    name: 'Rtr. Arpan Bhandari',
    email: 'arpan.bhandari@gandaki.edu.np',
    role: 'bod',
    roleTitle: 'International Service Chair',
    avatar: '/members/arpan.webp',
    phone: '+977 9846044409',
    faculty: 'B.Tech AI & Data Science',
    bloodGroup: 'A-ve',
    joinedDate: 'Jan 2026',
    bio: 'Fostering international understanding, twin-club partnerships, and global peace exchange initiatives.',
    badge: 'Board of Directors'
  },

  // ==========================================
  // GENERAL MEMBERS
  // ==========================================
  {
    id: 'mem-13',
    districtId: 'RTR26251',
    name: 'Rtr. Sandesh Dhakal',
    email: 'sandesh.dhakal@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/sandesh.webp',
    phone: '+977 9846111001',
    faculty: 'B.Tech AI & Data Science',
    bloodGroup: 'O+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member participating in technological innovations and digital awareness initiatives.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-14',
    districtId: 'RTR26262',
    name: 'Rtr. Pratigya BK',
    email: 'pratigya.bk@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/pratigya.webp',
    phone: '+977 9846111002',
    faculty: 'BBA',
    bloodGroup: 'A+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member contributing to campus entrepreneurship projects and youth leadership events.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-15',
    districtId: 'RTR26257',
    name: 'Rtr. Punam Pun Magar',
    email: 'punam.pm@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/punam.webp',
    phone: '+977 9846111003',
    faculty: 'Bachelor in Pharmacy',
    bloodGroup: 'B+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member supporting community healthcare campaigns and public hygiene programs.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-16',
    districtId: 'RTR26265',
    name: 'Rtr. Salina Bastola',
    email: 'salina.bastola@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/salina.webp',
    phone: '+977 9846111004',
    faculty: 'B.Tech AI & Data Science',
    bloodGroup: 'AB+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member engaging in campus digital drives and academic peer mentoring.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-17',
    districtId: 'District ID pending',
    name: 'Rtr. Sangam Bhujel',
    email: 'sangam.bhujel@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/sangam.webp',
    phone: '+977 9846111005',
    faculty: 'BBA',
    bloodGroup: 'O+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member volunteering in logistical planning and civic relief operations.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-18',
    districtId: 'RTR26266',
    name: 'Rtr. Subarna Poudel',
    email: 'subarna.poudel@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/subarna.webp',
    phone: '+977 9846111006',
    faculty: 'Bachelor of Sports Management',
    bloodGroup: 'A+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member passionate about university sports tournaments and fitness workshops.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-19',
    districtId: 'RTR26282',
    name: 'Rtr. Akriti Bhattarai',
    email: 'akriti.bhattarai@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/akriti.webp',
    phone: '+977 9846111007',
    faculty: 'Bachelor in Pharmacy',
    bloodGroup: 'B-ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member promoting health literacy and maternal-child health awareness.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-20',
    districtId: 'RTR26256',
    name: 'Rtr. Suresh Gurung',
    email: 'suresh.gurung@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/suresh.webp',
    phone: '+977 9846111008',
    faculty: 'Bachelor of Sports Management',
    bloodGroup: 'AB+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member engaging in sports administration and outdoor community fellowships.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-21',
    districtId: 'RTR26261',
    name: 'Rtr. Manoram Subedi',
    email: 'manoram.subedi@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/manoram.webp',
    phone: '+977 9846111009',
    faculty: 'B.Tech AI & Data Science',
    bloodGroup: 'O-ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member supporting web administration, technical registrations, and database indexing.',
    badge: 'Collegiate Member'
  },
  {
    id: 'mem-22',
    districtId: 'RTR27436',
    name: 'Rtr. Diperson BK',
    email: 'diperson.bk@student.gandaki.edu.np',
    role: 'member',
    roleTitle: 'Collegiate Member',
    avatar: '/members/diperson.webp',
    phone: '+977 9846111010',
    faculty: 'BBA',
    bloodGroup: 'B+ve',
    joinedDate: 'Jan 2026',
    bio: 'Active member contributing to club assemblies and youth leadership conventions.',
    badge: 'Collegiate Member'
  },

  // ==========================================
  // ADVISORS
  // ==========================================
  {
    id: 'adv-1',
    districtId: 'RTR26263',
    name: 'Er. Rtr. Shiva Kunwar',
    email: 'shiva.kunwar@gandaki.edu.np',
    role: 'advisor',
    roleTitle: 'Faculty Advisor',
    avatar: '/members/shivakunwar.webp',
    phone: '+977 9856011223',
    faculty: 'Faculty of Science & Technology, Gandaki University',
    bloodGroup: 'O+ve',
    joinedDate: 'Jan 2026',
    bio: 'Faculty Advisor bridging academic mentorship, administrative counsel, and university partnership.',
    badge: 'Faculty Advisor'
  },
  {
    id: 'adv-2',
    name: 'Rtr. Kamal Gautam',
    email: 'kamal.gautam@lekhnathrotary.org',
    role: 'advisor',
    roleTitle: 'Board Advisor',
    avatar: '/assets/official/rotaract-mark.webp',
    phone: '+977 9856099887',
    faculty: 'Board of Directors / Rotary Mentorship',
    bloodGroup: 'B+ve',
    joinedDate: 'Jan 2026',
    bio: 'Board Advisor providing leadership development, rotary compliance guidance, and institutional stewardship.',
    badge: 'Board Advisor'
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'ev-1',
    title: 'Gandaki Health & Blood Donation Camp 2026',
    theme: 'Every Drop Counts - Insight to Impact',
    category: 'Community Service',
    date: '2026-10-05',
    time: '09:00 AM - 03:00 PM NPT',
    location: 'Gandaki University Main Campus, Pokhara 32',
    chairperson: 'Rtr. Rakhi Bhujel (Service Project Chair)',
    description: 'In collaboration with Nepal Red Cross Society Kaski and sponsored by Rotaract Club of Lekhnath, this blood donation and basic diagnostic health check-up camp targets 100+ pints of blood and free screening for local residents.',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    maxSeats: 80,
    registeredMembers: ['bod-1', 'bod-2', 'bod-3'],
    createdAt: '2026-09-01'
  },
  {
    id: 'ev-2',
    title: 'AI in Sustainable Development: Youth Tech Conclave',
    theme: 'Empowering Next-Gen Leaders with Applied AI',
    category: 'Professional Development',
    date: '2026-10-18',
    time: '11:00 AM - 04:30 PM NPT',
    location: 'Gandaki University Auditorium Hall, Pokhara',
    chairperson: 'Rtr. Prabhab Tiwari & Rtr. Raj Dhakal',
    description: 'A premier tech conclave bringing industry veterans, AI researchers, and students together to explore how Machine Learning and Data Science can solve climate and healthcare hurdles.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    maxSeats: 150,
    registeredMembers: ['bod-1', 'bod-2', 'bod-6', 'mem-13'],
    createdAt: '2026-09-05'
  },
  {
    id: 'ev-3',
    title: 'Joint Fellowship with Rotaract Club of Lekhnath',
    theme: 'Rooted Together: Celebrating Our Parent Club Bond',
    category: 'Club Service',
    date: '2026-10-24',
    time: '03:00 PM - 07:00 PM NPT',
    location: 'Begnas Lake View Garden, Lekhnath, Kaski',
    chairperson: 'Rtr. Manila Adhikari (Club Administration Chair)',
    description: 'A grand joint fellowship and induction ceremony at Begnas lakeside honoring our sponsor club Rotaract Club of Lekhnath. Includes team bonding sessions, project reviews, and dinner.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    maxSeats: 60,
    registeredMembers: ['bod-1', 'bod-2', 'bod-3', 'bod-7'],
    createdAt: '2026-09-10'
  },
  {
    id: 'ev-4',
    title: 'Phewa & Rupa Watershed Cleanliness Drive',
    theme: 'Eco-Guardians of Gandaki Waterways',
    category: 'Community Service',
    date: '2026-11-08',
    time: '07:00 AM - 11:30 AM NPT',
    location: 'Rupa Lake Embankment, Pokhara',
    chairperson: 'Rtr. Sandhya Sharma (Service Area Project)',
    description: 'Protecting the ecological biodiversity of Rupa Lake through plastic collection, waste management, and environmental awareness among local communities.',
    image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    maxSeats: 50,
    registeredMembers: ['bod-8', 'bod-9'],
    createdAt: '2026-09-12'
  },
  {
    id: 'ev-5',
    title: 'Global Twin-Club Cultural Exchange & Rotary Meet',
    theme: 'Building Bridges across Borders',
    category: 'International Service',
    date: '2026-11-20',
    time: '06:00 PM - 08:30 PM NPT (Virtual)',
    location: 'Online Hybrid (RAC GU Hall & Zoom)',
    chairperson: 'Rtr. Arpan Bhandari (International Service Chair)',
    description: 'Virtual bilateral exchange session with international Rotaract clubs discussing youth leadership, peace initiatives, and sustainable development.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
    maxSeats: 100,
    registeredMembers: ['bod-1', 'bod-12'],
    createdAt: '2026-09-15'
  },
  {
    id: 'ev-6',
    title: 'Historic Charter Presentation & Installation Ceremony',
    theme: 'The Dawn of Rotaract Gandaki University',
    category: 'Club Service',
    date: '2026-01-22',
    time: '11:00 AM - 04:00 PM NPT',
    location: 'Gandaki University Convention Hall, Pokhara',
    chairperson: 'Past District Governor & Charter Committee',
    description: 'Official Charter presentation day! Rotaract Club of Gandaki University was chartered on 22nd January 2026 under Club No. 8828026, Zone XVI, RID 3292 with sponsorship from Rotaract Club of Lekhnath.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    status: 'completed',
    maxSeats: 200,
    registeredMembers: ['bod-1', 'bod-2', 'bod-3', 'bod-4', 'bod-5', 'bod-6'],
    createdAt: '2026-01-10'
  }
];

export const INITIAL_NOTICES: ClubNotice[] = [
  {
    id: 'not-1',
    title: 'Call for Regular Board Meeting (BM-09/2026-27)',
    refNo: 'RACGU/SEC/2026-27/014',
    issuedBy: 'Office of Club Secretary',
    date: '2026-09-22',
    category: 'Board Meeting',
    isUrgent: true,
    content: 'All Board of Directors and PST executives are cordially requested to attend the 9th Regular Board Meeting on Friday in the Faculty Lounge, Gandaki University. Agenda: Finalization of Health Camp Budget, Zone XVI Zonal Meet participation, and approval of new member activities.',
    attachmentName: 'Agenda_BM_09_RACGU.pdf'
  },
  {
    id: 'not-2',
    title: 'Call for Volunteer Registrations: Health & Blood Camp',
    refNo: 'RACGU/COMM/2026-27/008',
    issuedBy: 'Community Service Avenue',
    date: '2026-09-18',
    category: 'Project',
    isUrgent: false,
    content: 'Members of Rotaract Club of Gandaki University are encouraged to register through the member portal for active volunteer duties (Registration desk, Donor care, and Triage support) for the upcoming October 5th Camp.',
    attachmentName: 'Volunteer_Briefing_Kit.pdf'
  },
  {
    id: 'not-3',
    title: 'RID 3292 District Dues & Semi-Annual Reporting Circular',
    refNo: 'RACGU/TR/2026-27/005',
    issuedBy: 'Office of Club Treasurer',
    date: '2026-09-12',
    category: 'District 3292',
    isUrgent: false,
    content: 'All club members are reminded that the first semi-annual Rotaract District 3292 dues for RY 2026-27 have been processed successfully. The financial statement for Q1 has been uploaded to the Documents Vault for review.',
    attachmentName: 'Q1_Financial_Report_RACGU.pdf'
  },
  {
    id: 'not-4',
    title: 'Official Adoption of Presidential Theme "Insight to Impact"',
    refNo: 'RACGU/PRES/2026-27/001',
    issuedBy: 'Office of Club President',
    date: '2026-07-01',
    category: 'General',
    isUrgent: false,
    content: 'The club officially announces its presidential theme for Rotaract Year 2026-27: "Insight to Impact". Under this theme, all avenues will align their community, professional, and environmental projects to translate knowledge and academic insight into measurable social transformation.',
    attachmentName: 'Presidential_Theme_Charter_2026.pdf'
  }
];

export const INITIAL_DOCUMENTS: ClubDocument[] = [
  {
    id: 'doc-1',
    title: 'Minutes of 8th Board of Directors Meeting (RY 2026-27)',
    category: 'Meeting Minutes',
    uploadedBy: 'Rtr. Sujan Shrestha (Secretary)',
    uploadedRole: 'PST Secretary',
    uploadDate: '2026-09-14',
    fileSize: '1.4 MB',
    fileType: 'PDF',
    downloadUrl: '#download-minutes-08',
    isPstOnly: false,
    summary: 'Detailed meeting minutes covering charter anniversary preparations, financial audit approval, and appointment of Avenue sub-committees.'
  },
  {
    id: 'doc-2',
    title: 'Charter Constitution & Bylaws of RACGU',
    category: 'Club Bylaws',
    uploadedBy: 'Rtr. Prabhab Tiwari (Charter President)',
    uploadedRole: 'PST President',
    uploadDate: '2026-01-22',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    downloadUrl: '#download-bylaws',
    isPstOnly: false,
    summary: 'The founding bylaws, governing code, election procedures, and avenue guidelines officially adopted on Charter Day 22nd January 2026.'
  },
  {
    id: 'doc-3',
    title: 'Q1 Financial Balance Sheet & Project Expense Audit',
    category: 'Financial Statements',
    uploadedBy: 'Rtr. Madhab Khanal (Treasurer)',
    uploadedRole: 'PST Treasurer',
    uploadDate: '2026-09-10',
    fileSize: '860 KB',
    fileType: 'XLSX',
    downloadUrl: '#download-financial-q1',
    isPstOnly: false,
    summary: 'Audited income and expenditure statement for July to September 2026, verified by the Finance Committee and Rotarian Mentor.'
  },
  {
    id: 'doc-4',
    title: 'Project Proposal & Logistical Plan: Health Camp 2026',
    category: 'Project Reports',
    uploadedBy: 'Rtr. Rakhi Bhujel (Service Project Chair)',
    uploadedRole: 'PST / BOD',
    uploadDate: '2026-09-08',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    downloadUrl: '#download-bloodcamp-proposal',
    isPstOnly: false,
    summary: 'Full event execution plan, risk mitigation strategy, volunteer shift rosters, and Red Cross logistical requirements.'
  },
  {
    id: 'doc-5',
    title: 'Confidential: Zonal & District Award Nomination Dossier',
    category: 'District Guidelines',
    uploadedBy: 'Rtr. Prabhab Tiwari (Charter President)',
    uploadedRole: 'PST President',
    uploadDate: '2026-09-15',
    fileSize: '4.5 MB',
    fileType: 'PDF',
    downloadUrl: '#download-award-nominations',
    isPstOnly: true,
    summary: 'Restricted PST administrative document detailing individual and club service nominations for Zone XVI and District 3292 Assembly.'
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Historic Charter Day Celebration',
    eventTitle: 'Charter Presentation 22nd January 2026',
    date: '2026-01-22',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=900',
    category: 'Club Service',
    caption: 'Official handing over of the Charter Certificate to Charter President Rtr. Prabhab Tiwari in presence of sponsor club Rotaract Club of Lekhnath.'
  },
  {
    id: 'gal-2',
    title: 'Gandaki Riverbank Tree Plantation Drive',
    eventTitle: 'Green Roots Initiative 2026',
    date: '2026-06-05',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=900',
    category: 'Community Service',
    caption: 'Native saplings planted along Seti and Begnas watershed with active participation of university students and local youths.'
  },
  {
    id: 'gal-3',
    title: 'Tech & Career Literacy Workshop',
    eventTitle: 'Digital Horizon Bootcamp',
    date: '2026-05-18',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=900',
    category: 'Professional Development',
    caption: 'Hands-on programming and AI literacy workshop conducted for secondary school students in Lekhnath.'
  },
  {
    id: 'gal-4',
    title: 'Rotary-Rotaract Joint Lekhnath Assembly',
    eventTitle: 'Parent Club Annual Fellowship',
    date: '2026-07-20',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=900',
    category: 'Club Service',
    caption: 'Honoring the mentorship and fellowship of our parent club, Rotaract Club of Lekhnath.'
  },
  {
    id: 'gal-5',
    title: 'Free Vision & Eye Health Screening',
    eventTitle: 'Insight to Sight Camp',
    date: '2026-08-14',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900',
    category: 'Community Service',
    caption: 'Providing ophthalmic consultations and free reading glasses for villagers in Kaski.'
  },
  {
    id: 'gal-6',
    title: 'Inter-College Futsal Championship',
    eventTitle: 'Gandaki Youth Sports Cup',
    date: '2026-04-12',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=900',
    category: 'Youth & Sports',
    caption: 'Encouraging athletic vigor, healthy habits, and youth sportsmanship across collegiate teams in Pokhara.'
  }
];

export const INITIAL_REGISTRATIONS: Array<{
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
}> = [
  {
    id: 'reg-1',
    eventId: 'ev-1',
    eventTitle: 'Gandaki Health & Blood Donation Camp 2026',
    eventDate: '2026-10-05',
    memberId: 'bod-1',
    memberName: 'Rtr. Prabhab Tiwari',
    memberEmail: 'president.racgu@gandaki.edu.np',
    memberPhone: '+977 9748421238',
    registeredAt: '2026-09-02 10:15 AM',
    status: 'confirmed',
    notes: 'Coordination lead'
  },
  {
    id: 'reg-2',
    eventId: 'ev-1',
    eventTitle: 'Gandaki Health & Blood Donation Camp 2026',
    eventDate: '2026-10-05',
    memberId: 'bod-2',
    memberName: 'Rtr. Sujan Shrestha',
    memberEmail: 'secretary.racgu@gandaki.edu.np',
    memberPhone: '',
    registeredAt: '2026-09-06 02:40 PM',
    status: 'confirmed',
    notes: 'Secretariat desk'
  },
  {
    id: 'reg-3',
    eventId: 'ev-2',
    eventTitle: 'AI in Sustainable Development: Youth Tech Conclave',
    eventDate: '2026-10-18',
    memberId: 'bod-6',
    memberName: 'Rtr. Raj Dhakal',
    memberEmail: 'raj.dhakal@gandaki.edu.np',
    memberPhone: '+977 9846044403',
    registeredAt: '2026-09-08 11:20 AM',
    status: 'confirmed',
    notes: 'Media & PRO lead'
  }
];
