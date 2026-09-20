import React, { useState } from 'react';
import { GalleryPhoto } from '../types';

interface GalleryPageProps {
  gallery: GalleryPhoto[];
  isPstUser: boolean;
  onOpenAddPhoto?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery, isPstUser, onOpenAddPhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Community Service', 'Club Service', 'Professional Development', 'Youth & Sports'];

  const filtered = gallery.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Header */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
            Visual Archive of Fellowship & Impact
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Club Service Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Moments captured during our humanitarian projects, youth summits, and club assemblies.
          </p>
        </div>

        {isPstUser && onOpenAddPhoto && (
          <button
            onClick={onOpenAddPhoto}
            className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
          >
            + Upload Photo (PST)
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Avenue:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#D91B5C] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Photographs' : cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white text-slate-800">
                  {photo.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-[#D91B5C]">{photo.eventTitle}</span>
                <span>{photo.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 line-clamp-1 hover:text-[#D91B5C] transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 px-3 py-1 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-bold transition-colors"
            >
              Close [X]
            </button>

            <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-2 text-left bg-white">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded bg-pink-50 text-[#D91B5C] font-bold uppercase">
                  {selectedPhoto.category}
                </span>
                <span className="text-slate-400">{selectedPhoto.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Event: {selectedPhoto.eventTitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
