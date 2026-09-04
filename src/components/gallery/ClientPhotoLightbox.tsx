import React, { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { ClientPhoto } from '../../data/clientPhotos';
import { useScrollLock } from './useScrollLock';

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
  // Lock body scroll and preserve exact page scroll position
  useScrollLock(Boolean(photo));

  // Drag / swipe states
  const [dragY, setDragY] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // Gesture tracking refs
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const gestureDirectionRef = useRef<'vertical' | 'horizontal' | null>(null);

  // Keyboard controls
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
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, handleKeyDown]);

  // Reset drag position when photo changes
  useEffect(() => {
    setDragY(0);
    setDragX(0);
    setIsSwiping(false);
    gestureDirectionRef.current = null;
  }, [photo?.id]);

  // Touch Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    gestureDirectionRef.current = null;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Distinguish gesture direction once movement exceeds 8px
    if (!gestureDirectionRef.current) {
      if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        // Downward vertical gesture (swipe-down to dismiss)
        if (deltaY > 0) {
          gestureDirectionRef.current = 'vertical';
        }
      } else if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal gesture (photo navigation)
        gestureDirectionRef.current = 'horizontal';
      }
    }

    if (gestureDirectionRef.current === 'vertical') {
      // Follow finger downward only (damping upward movement)
      const currentY = Math.max(0, deltaY);
      setDragY(currentY);
      setDragX(0);
    } else if (gestureDirectionRef.current === 'horizontal') {
      // Follow finger horizontally with slight resistance
      setDragX(deltaX * 0.7);
      setDragY(0);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const elapsed = Date.now() - touchStartRef.current.time;
    const currentY = dragY;
    const currentX = dragX;

    if (gestureDirectionRef.current === 'vertical') {
      // Close threshold: pulled down > 100px OR quick downward flick > 45px in < 260ms
      const isQuickFlick = elapsed < 260 && currentY > 45;
      if (currentY > 100 || isQuickFlick) {
        onClose();
      } else {
        // Smoothly spring back to center
        setDragY(0);
      }
    } else if (gestureDirectionRef.current === 'horizontal') {
      // Navigation threshold: swipe > 45px OR quick flick > 25px in < 260ms
      const isQuickFlick = elapsed < 260 && Math.abs(currentX) > 25;
      if (currentX < -45 || (isQuickFlick && currentX < 0)) {
        onNext();
      } else if (currentX > 45 || (isQuickFlick && currentX > 0)) {
        onPrev();
      }
      setDragX(0);
    }

    gestureDirectionRef.current = null;
  };

  if (!photo) return null;

  const altText = photo.destination
    ? `Travel memory in ${photo.destination} — Jayashakthi Tours & Travels`
    : 'Client travel memory from Jayashakthi Tours & Travels';

  // Calculate dynamic backdrop opacity based on downward swipe
  const backdropOpacity = Math.max(0.15, 0.95 - dragY / 380);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label={photo.destination || 'Client travel photo viewer'}
        style={{
          backgroundColor: `rgba(2, 6, 23, ${backdropOpacity})`,
        }}
        onClick={(e) => {
          // Close when clicking directly on the backdrop / blank padding
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md select-none touch-none"
      >
        {/* Top Controls Bar (Header) */}
        <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-8 z-50 flex items-center justify-between pointer-events-none">
          {/* Photo Counter Pill */}
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide shadow-md">
            <span>Photo {currentIndex + 1} of {totalPhotos}</span>
          </div>

          {/* Prominent, accessible Close (X) button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 active:scale-95 text-white backdrop-blur-md border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sky-400 shadow-lg cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Previous Image Button (Desktop/Tablet) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 active:scale-95 text-white backdrop-blur-md border border-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sky-400 cursor-pointer shadow-md"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next Image Button (Desktop/Tablet) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 active:scale-95 text-white backdrop-blur-md border border-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sky-400 cursor-pointer shadow-md"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Interactive Image Container */}
        <div
          onClick={(e) => {
            // Click outside the image on the container closes viewer
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center py-8 px-2"
        >
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: Math.max(0.2, 1 - dragY / 300),
              scale: Math.max(0.85, 1 - dragY / 900),
              y: dragY,
              x: dragX,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={
              isSwiping
                ? { duration: 0 }
                : { type: 'spring', damping: 28, stiffness: 320 }
            }
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              // Prevent clicking on the image from closing the lightbox
              e.stopPropagation();
            }}
            className="flex flex-col items-center cursor-default"
          >
            {/* Image Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden max-h-[70vh] bg-black/70 shadow-2xl border border-white/10 select-none">
              <img
                src={photo.image}
                alt={altText}
                draggable={false}
                className="max-h-[70vh] max-w-full w-auto object-contain mx-auto select-none pointer-events-none"
              />
            </div>

            {/* Details Bar */}
            <div className="mt-3 sm:mt-4 text-center max-w-2xl px-4 pointer-events-auto">
              <div className="flex items-center justify-center flex-wrap gap-2 text-xs text-brand-sky-300 mb-1">
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
                <p className="text-xs sm:text-sm font-normal text-slate-200 leading-relaxed mt-1">
                  {photo.caption}
                </p>
              )}

              {/* Mobile swipe-down hint */}
              <div className="mt-2 text-[11px] text-slate-400 hidden sm:block">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Esc</kbd> or click outside to close
              </div>
              <div className="mt-2 text-[11px] text-slate-400 sm:hidden">
                Swipe down or tap outside to close
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
