import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ZoomIn, Star } from 'lucide-react';
import { ClientPhoto } from '../../data/clientPhotos';

interface ClientPhotoCardProps {
  photo: ClientPhoto;
  onClick: () => void;
  index: number;
}

export const ClientPhotoCard: React.FC<ClientPhotoCardProps> = ({ photo, onClick, index }) => {
  const altText = photo.destination
    ? `Travel memory in ${photo.destination} — Jayasakthi Tours & Travels`
    : 'Client travel memory from Jayasakthi Tours & Travels';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
      onClick={onClick}
      className={`group relative cursor-pointer rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 ease-out transform-gpu ${
        photo.featured ? 'md:col-span-2 md:row-span-1' : 'col-span-1'
      }`}
    >
      {/* Aspect Ratio Container */}
      <div
        className={`w-full overflow-hidden ${
          photo.featured
            ? 'aspect-[16/10] sm:aspect-[16/11]'
            : photo.aspect === 'portrait'
            ? 'aspect-[3/4]'
            : photo.aspect === 'landscape'
            ? 'aspect-[4/3]'
            : 'aspect-square'
        }`}
      >
        <img
          src={photo.image}
          alt={altText}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/85 via-brand-navy-950/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-brand-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-1.5">
          {photo.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-brand-navy-900 shadow-sm border border-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500" />
              {photo.category}
            </span>
          )}
          {photo.featured && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-gold-500/90 backdrop-blur-md text-[10px] font-bold text-white shadow-sm">
              <Star className="w-3 h-3 fill-white" />
              Featured
            </span>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-brand-navy-950/40 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 group-hover:scale-100">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-10">
        {photo.destination ? (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-sky-300 mb-0.5 tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-brand-teal-400 shrink-0" />
            <span>{photo.destination}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-sky-300/90 mb-0.5 tracking-wide">
            <span>Travel Memory</span>
          </div>
        )}

        {photo.caption && (
          <p className="text-xs sm:text-sm font-normal text-slate-100 line-clamp-2 leading-snug">
            {photo.caption}
          </p>
        )}

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-300/80">
          <span className="text-[10px] text-brand-sky-200 font-medium group-hover:underline">
            View Full Photo →
          </span>
        </div>
      </div>
    </motion.div>
  );
};
