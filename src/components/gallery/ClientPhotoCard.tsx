import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ZoomIn, Heart } from 'lucide-react';
import { ClientPhoto } from '../../data/clientPhotos';

interface ClientPhotoCardProps {
  photo: ClientPhoto;
  onClick: () => void;
  index: number;
}

export const ClientPhotoCard: React.FC<ClientPhotoCardProps> = ({ photo, onClick, index }) => {
  const [imgSrc, setImgSrc] = useState(photo.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-soft hover:shadow-soft-xl transition-all duration-300 transform-gpu"
    >
      {/* Aspect Ratio Container */}
      <div
        className={`w-full overflow-hidden ${
          photo.aspect === 'portrait'
            ? 'aspect-[3/4]'
            : photo.aspect === 'landscape'
            ? 'aspect-[4/3]'
            : 'aspect-square'
        }`}
      >
        <img
          src={imgSrc}
          alt={`${photo.destination} - ${photo.category}`}
          loading="lazy"
          onError={() => {
            // Graceful fallback to Unsplash if custom local file is missing
            setImgSrc('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80');
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/90 via-brand-navy-950/25 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-brand-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-brand-navy-900 shadow-sm border border-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500 animate-pulse" />
          {photo.category}
        </span>

        <div className="w-8 h-8 rounded-full bg-brand-navy-950/40 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 group-hover:scale-100">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Information Card */}
      <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-sky-300 mb-1.5 tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-brand-teal-400 shrink-0" />
          <span>{photo.destination}</span>
        </div>

        <p className="text-xs sm:text-sm font-medium text-slate-100 line-clamp-2 leading-snug group-hover:text-white transition-colors">
          {photo.caption}
        </p>

        {/* Subtle memory indicator */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300/80">
          <span className="inline-flex items-center gap-1">
            <Heart className="w-3 h-3 text-brand-gold-400 fill-brand-gold-400/40" />
            <span>Journey Memory</span>
          </span>
          <span className="text-[10px] text-brand-sky-200/90 font-medium group-hover:underline">
            View Photo →
          </span>
        </div>
      </div>
    </motion.div>
  );
};
