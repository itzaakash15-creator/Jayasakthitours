import React, { useState } from 'react';
import { MapPin, ZoomIn } from 'lucide-react';
import { galleryData, galleryCategories, GalleryCategory } from '../../data/gallery';
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
            className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-soft hover:shadow-soft-xl hover:-translate-y-1 cursor-pointer border border-slate-100 transition-all duration-300 ease-out aspect-[4/3]"
          >
            <img
              src={item.imageUrl}
              alt={item.altText}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
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
