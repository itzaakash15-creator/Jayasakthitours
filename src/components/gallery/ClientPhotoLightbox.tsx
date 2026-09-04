import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { ClientPhoto } from '../../data/clientPhotos';

interface ClientPhotoLightboxProps {
  photo: ClientPhoto | null;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ClientPhotoLightbox: React.FC<ClientPhotoLightboxProps> = ({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onPrev,
  onNext,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      onNext();
    } else if (diff < -50) {
      onPrev();
    }
    setTouchStartX(null);
  };

  if (!photo) return null;

  const altText = photo.destination
    ? `Travel memory in ${photo.destination} — Jayasakthi Tours & Travels`
    : 'Client travel memory from Jayasakthi Tours & Travels';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={photo.destination || 'Client travel photo'}
        className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-950/94 backdrop-blur-md p-3 sm:p-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Controls Bar */}
        <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-50 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wide">
            <span>Photo {currentIndex + 1} of {totalPhotos}</span>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky-400"
            aria-label="Close photo view"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Prev button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sky-400"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sky-400"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Central Card with Image and Info */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl w-full max-h-[88vh] flex flex-col items-center justify-center px-2"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden max-h-[68vh] bg-black/70 shadow-2xl border border-white/10">
            <img
              src={photo.image}
              alt={altText}
              className="max-h-[68vh] max-w-full w-auto object-contain mx-auto select-none"
            />
          </div>

          {/* Details Bar */}
          <div className="mt-4 sm:mt-5 text-center max-w-2xl px-4">
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs text-brand-sky-300 mb-1.5">
              {photo.destination ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal-400" />
                  {photo.destination}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-semibold">
                  Travel Memory
                </span>
              )}

              {photo.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-500/20 border border-brand-teal-400/30 text-brand-teal-300 font-medium">
                  <Tag className="w-3.5 h-3.5 text-brand-teal-400" />
                  {photo.category}
                </span>
              )}
            </div>

            {photo.caption && (
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed mt-1">
                {photo.caption}
              </p>
            )}

            <div className="mt-2 text-[11px] text-slate-400">
              Jayasakthi Tours &amp; Travels — Client Journey Photograph
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
