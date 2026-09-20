import React, { useState } from 'react';
import { UserProfile } from '../types';

interface MemberDirectoryPageProps {
  members: UserProfile[];
}

export const MemberDirectoryPage: React.FC<MemberDirectoryPageProps> = ({ members }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedBlood, setSelectedBlood] = useState<string>('all');

  const bloodGroups = ['all', 'A+ve', 'B+ve', 'O+ve', 'AB+ve', 'A-ve', 'B-ve'];

  const filteredMembers = members.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || m.role === selectedRole;
    const matchesBlood = selectedBlood === 'all' || m.bloodGroup === selectedBlood;

    return matchesSearch && matchesRole && matchesBlood;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Header */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
          Official Club Roster
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Rotaract Member Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Profiles and verified directory of our Gandaki University collegiate members and leaders.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, faculty, or role..."
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
          >
            <option value="all">All Roles</option>
            <option value="pst">Executive PST</option>
            <option value="bod">Board of Directors</option>
            <option value="member">General Members</option>
            <option value="advisor">Advisors</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedBlood}
            onChange={(e) => setSelectedBlood(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
          >
            <option value="all">Blood Group (All)</option>
            {bloodGroups.filter(b => b !== 'all').map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-xs">
            No club members matched your search filters.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                      <p className="text-xs text-[#D91B5C] font-semibold">{member.roleTitle}</p>
                    </div>
                  </div>

                  {member.bloodGroup && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                      {member.bloodGroup}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <p className="truncate">Faculty: {member.faculty}</p>
                  <p>Member since: {member.joinedDate}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-[#D91B5C] font-semibold truncate">{member.email}</span>
                <span className="text-slate-500 font-mono text-[11px]">{member.phone}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
