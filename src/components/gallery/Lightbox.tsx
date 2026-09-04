import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { GalleryItem } from '../../data/gallery';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Modal */}
      <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden max-h-[72vh] bg-black">
          <img
            src={item.imageUrl}
            alt={item.altText}
            className="max-h-[72vh] max-w-full w-auto object-contain mx-auto"
          />
        </div>

        {/* Caption & Location Info */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="flex items-center justify-center gap-3 text-xs text-brand-sky-300 mb-1">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-teal-400" />
              {item.location}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-brand-gold-400" />
              {item.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
