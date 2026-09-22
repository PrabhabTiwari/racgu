import React, { useState } from 'react';
import { UserProfile } from '../types';

interface TeamPageProps {
  members: UserProfile[];
}

export const TeamPage: React.FC<TeamPageProps> = ({ members }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [facultyFilter, setFacultyFilter] = useState<string>('all');
  const [bloodFilter, setBloodFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedMember, setSelectedMember] = useState<UserProfile | null>(null);

  const bloodGroups = ['all', 'A+ve', 'B+ve', 'O+ve', 'AB+ve', 'A-ve', 'B-ve', 'O-ve', 'AB-ve'];
  const faculties = [
    'all',
    'B.Tech AI & Data Science',
    'BBA (Entrepreneurship)',
    'BBA (Finance)',
    'BBA',
    'Bachelor in Pharmacy',
    'Bachelor of Sports Management',
    'Faculty of Science & Technology, Gandaki University',
    'Board of Directors / Rotary Mentorship'
  ];

  // Filtering
  const filteredMembers = members.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.bio && m.bio.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      activeCategory === 'all' ||
      (activeCategory === 'pst' && m.role === 'pst') ||
      (activeCategory === 'bod' && m.role === 'bod') ||
      (activeCategory === 'member' && m.role === 'member') ||
      (activeCategory === 'advisor' && m.role === 'advisor');

    const matchesFaculty = facultyFilter === 'all' || m.faculty.toLowerCase().includes(facultyFilter.toLowerCase());
    const matchesBlood = bloodFilter === 'all' || m.bloodGroup === bloodFilter;

    return matchesSearch && matchesCategory && matchesFaculty && matchesBlood;
  });

  const pstMembers = members.filter(m => m.role === 'pst');
  const bodMembers = members.filter(m => m.role === 'bod');
  const generalMembers = members.filter(m => m.role === 'member');
  const advisorMembers = members.filter(m => m.role === 'advisor');

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'pst':
        return 'bg-[#D91B5C] text-white';
      case 'bod':
        return 'bg-blue-800 text-white';
      case 'advisor':
        return 'bg-purple-800 text-white';
      default:
        return 'bg-emerald-800 text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      {/* Official Header Banner */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md border border-white/10">
              <img 
                src="/assets/official/insight-to-impact.webp"
                alt="Presidential Theme" 
                className="h-5 w-auto object-contain"
              />
              <span className="text-xs font-semibold text-pink-200">
                Presidential Theme 2026-27
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Board of Directors & Members Roster
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official Charter Team of Rotaract Club of Gandaki University for Rotaract Year 2026-27.
              Under the leadership of Charter President Rtr. Prabhab Tiwari, Secretary Rtr. Sujan Shrestha, and Treasurer Rtr. Madhab Khanal.
            </p>
          </div>

          {/* Quick Roster Count */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <span className="text-xl font-bold text-pink-400 block">{members.length}</span>
              <span className="text-[11px] text-slate-300">Total Roster</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <span className="text-xl font-bold text-rose-300 block">{pstMembers.length}</span>
              <span className="text-[11px] text-slate-300">Executive PST</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <span className="text-xl font-bold text-blue-300 block">{pstMembers.length + bodMembers.length + advisorMembers.filter(m => m.roleTitle === 'Faculty Advisor').length}</span>
              <span className="text-[11px] text-slate-300">Board & Faculty Advisor</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <span className="text-xl font-bold text-emerald-300 block">{generalMembers.length}</span>
              <span className="text-[11px] text-slate-300">Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `All Members (${members.length})` },
            { id: 'pst', label: `PST Executives (${pstMembers.length})` },
            { id: 'bod', label: `Board of Directors (${bodMembers.length})` },
            { id: 'member', label: `Members (${generalMembers.length})` },
            { id: 'advisor', label: `Advisors (${advisorMembers.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-[#D91B5C] text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* View Toggle */}
          <div className="ml-auto hidden sm:flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                viewMode === 'grid' ? 'bg-[#D91B5C] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Large Photos
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                viewMode === 'table' ? 'bg-[#D91B5C] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Search & Dropdown Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role title, or faculty..."
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D91B5C] bg-white text-slate-800"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D91B5C] bg-white text-slate-800"
            >
              <option value="all">All Faculties / Departments</option>
              {faculties.filter(f => f !== 'all').map(fac => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D91B5C] bg-white text-slate-800"
            >
              <option value="all">All Blood Groups</option>
              {bloodGroups.filter(b => b !== 'all').map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VIEW MODE: LARGE PHOTO CARDS (Grid View) */}
      {viewMode === 'grid' && (
        <div className="space-y-10">
          {filteredMembers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No members matched your search filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  {/* LARGE PHOTO CONTAINER */}
                  <div className="relative w-full aspect-[4/5] sm:h-80 bg-slate-100 overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />

                    {/* Gradient Bottom Shading for High Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${getRoleBadgeStyle(member.role)}`}>
                        {member.badge}
                      </span>
                    </div>

                    {/* Blood Group */}
                    <div className="absolute top-3 right-3 bg-white text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-200">
                      Blood: {member.bloodGroup}
                    </div>

                    {/* Role Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-black/70 text-pink-300 inline-block">
                        {member.roleTitle}
                      </span>
                    </div>
                  </div>

                  {/* MEMBER DETAILS */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {member.name}
                      </h3>

                      <p className="text-xs font-medium text-slate-600">
                        {member.faculty}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                        {member.bio}
                      </p>
                    </div>

                    {/* Contact & Profile Action */}
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>Joined: {member.joinedDate}</span>
                        <a
                          href={`tel:${member.phone}`}
                          className="text-[#D91B5C] hover:underline font-semibold"
                        >
                          {member.phone}
                        </a>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-[#D91B5C] text-xs font-semibold text-center border border-slate-200 truncate"
                        >
                          Email
                        </a>

                        <button
                          onClick={() => setSelectedMember(member)}
                          className="py-1.5 px-3 rounded-lg bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE: TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200 text-[11px]">
                  <th className="py-3 px-5">Member & Photograph</th>
                  <th className="py-3 px-5">Role</th>
                  <th className="py-3 px-5">Faculty</th>
                  <th className="py-3 px-5">Blood</th>
                  <th className="py-3 px-5">Contact</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {member.name}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Inducted: {member.joinedDate}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <span className="font-bold text-[#D91B5C] block">
                        {member.roleTitle}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase">
                        {member.badge}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-slate-700">
                      {member.faculty}
                    </td>
                    <td className="py-3 px-5">
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded border border-rose-200">
                        {member.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3 px-5 space-y-0.5">
                      <div>
                        <a href={`mailto:${member.email}`} className="text-slate-700 hover:text-[#D91B5C]">
                          {member.email}
                        </a>
                      </div>
                      <div>
                        <a href={`tel:${member.phone}`} className="text-slate-500 hover:text-[#D91B5C]">
                          {member.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-3 py-1 rounded bg-pink-50 text-[#D91B5C] hover:bg-[#D91B5C] hover:text-white font-bold text-xs border border-pink-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MEMBER PROFILE MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0A1931] p-5 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
                Rotaract Club of Gandaki University Roster
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <div className="w-44 h-56 shrink-0 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getRoleBadgeStyle(selectedMember.role)} inline-block`}>
                    {selectedMember.badge}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedMember.name}
                  </h2>
                  <p className="text-sm font-bold text-[#D91B5C]">
                    {selectedMember.roleTitle}
                  </p>

                  <div className="space-y-1 text-xs text-slate-600 pt-2">
                    <p><strong>Faculty:</strong> {selectedMember.faculty}</p>
                    <p><strong>Blood Group:</strong> {selectedMember.bloodGroup}</p>
                    <p><strong>Inducted:</strong> {selectedMember.joinedDate}</p>
                    <p><strong>Phone:</strong> {selectedMember.phone}</p>
                    <p><strong>Email:</strong> {selectedMember.email}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Profile & Commitment
                </span>
                <p>{selectedMember.bio}</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
