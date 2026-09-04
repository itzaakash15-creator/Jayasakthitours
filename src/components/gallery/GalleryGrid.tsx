import React, { useState } from 'react';
import { Camera, MapPin, ZoomIn, Info } from 'lucide-react';
import { galleryData, galleryCategories, GalleryCategory, GalleryItem } from '../../data/gallery';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  initialCategory?: GalleryCategory;
  limit?: number;
  showFilters?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  initialCategory = 'All',
  limit,
  showFilters = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(initialCategory);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryData.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const currentItem = lightboxIndex !== null ? displayItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + displayItems.length) % displayItems.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % displayItems.length);
    }
  };

  return (
    <div>
      {/* Notice distinguishing demo travel photography */}
      <div className="mb-6 p-3.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-brand-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Visual Collection: </span>
          Curated destination and travel imagery illustrating our routes, heritage stays, and fleet. Structure is optimized so real traveler and fleet photographs can replace them anytime.
        </div>
      </div>

      {/* Filter Tabs */}
      {showFilters && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-soft'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-soft hover:shadow-soft-xl cursor-pointer border border-slate-100 aspect-[4/3]"
          >
            <img
              src={item.imageUrl}
              alt={item.altText}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/80 via-brand-navy-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

            {/* Category tag */}
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-brand-navy-900 shadow-2xs">
                {item.category}
              </span>
            </div>

            {/* Zoom icon on hover */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>

            {/* Caption on Card */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-1 text-[11px] text-brand-sky-300 mb-0.5">
                <MapPin className="w-3 h-3 text-brand-teal-400" />
                <span>{item.location}</span>
              </div>
              <h4 className="font-bold text-base leading-tight group-hover:text-brand-sky-200 transition-colors">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={currentItem}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
