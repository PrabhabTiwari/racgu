import React, { useState } from 'react';
import { ClubNotice } from '../types';

interface NoticesPageProps {
  notices: ClubNotice[];
  isPstUser: boolean;
  onOpenAddNotice?: () => void;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ notices, isPstUser, onOpenAddNotice }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedNotice, setSelectedNotice] = useState<ClubNotice | null>(notices[0] || null);

  const categories = ['all', 'Urgent', 'Board Meeting', 'General', 'Project', 'District 3292'];

  const filteredNotices = notices.filter((n) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'Urgent') return n.isUrgent;
    return n.category === filterCategory;
  });

  const handleDownloadNotice = (n: ClubNotice) => {
    const content = `ROTARACT CLUB OF GANDAKI UNIVERSITY
Official Circular: ${n.refNo}
Date: ${n.date}
Issuing Body: ${n.issuedBy}

Title: ${n.title}
Category: ${n.category}

---------------------------------------------------
CIRCULAR TEXT:
---------------------------------------------------
${n.content}

---------------------------------------------------
Attachment: ${n.attachmentName || 'None'}
Verified by: Secretariat, RACGU
Club ID: 8828026 • RID 3292 Zone XVI`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${n.refNo.replace(/[^a-zA-Z0-9_-]/g, '_')}_Notice.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Header */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
            Official Secretariat Communications
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Club Notices & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Authorized administrative declarations, agendas, and notifications of RACGU.
          </p>
        </div>

        {isPstUser && onOpenAddNotice && (
          <button
            onClick={onOpenAddNotice}
            className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
          >
            + Publish Notice (PST)
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-[#D91B5C] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Notices' : cat}
          </button>
        ))}
      </div>

      {/* Notices 2-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Notice List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredNotices.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
              No notices found under this filter.
            </div>
          ) : (
            filteredNotices.map((n) => {
              const isSelected = selectedNotice?.id === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotice(n)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-pink-50/70 border-[#D91B5C]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {n.refNo}
                    </span>
                    {n.isUrgent ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                        URGENT
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500">
                        {n.category}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-bold line-clamp-2 ${isSelected ? 'text-[#D91B5C]' : 'text-slate-900'}`}>
                    {n.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                    <span className="truncate">{n.issuedBy}</span>
                    <span className="shrink-0">{new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Col: Detailed Notice Reader */}
        <div className="lg:col-span-7">
          {selectedNotice ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              {/* Notice Meta Header */}
              <div className="border-b border-slate-200 pb-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#D91B5C] bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                    Ref: {selectedNotice.refNo}
                  </span>
                  <span className="text-xs text-slate-500">
                    Release: {selectedNotice.date}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {selectedNotice.title}
                </h2>

                <div className="text-xs text-slate-600">
                  Issuing Authority: <strong>{selectedNotice.issuedBy}</strong>
                </div>
              </div>

              {/* Notice Content */}
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {selectedNotice.content}
              </div>

              {/* Download Box */}
              {selectedNotice.attachmentName && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{selectedNotice.attachmentName}</p>
                    <p className="text-[11px] text-slate-500">Official Authenticated Document</p>
                  </div>

                  <button
                    onClick={() => handleDownloadNotice(selectedNotice)}
                    className="px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-[#D91B5C] text-[#D91B5C] hover:text-white border border-pink-200 text-xs font-bold transition-colors"
                  >
                    Download Notice
                  </button>
                </div>
              )}

              {/* Official Seal / Signoff */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Rotaract Club of Gandaki University</span>
                <span className="font-semibold text-slate-700">RID 3292 • Zone XVI</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
              Select a circular on the left to read full notice.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
