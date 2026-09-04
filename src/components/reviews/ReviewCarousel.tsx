import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleReviewsData } from '../../data/reviews';
import { ReviewCard } from './ReviewCard';
import { Button } from '../common/Button';

interface ReviewCarouselProps {
  showActions?: boolean;
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ showActions = true }) => {
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const isPaused = isManualPaused || isHoveredOrTouched;

  // Duplicate for seamless infinite loop on desktop
  const marqueeReviews = [...sampleReviewsData, ...sampleReviewsData];

  // Mobile auto-advance every 6 seconds if not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % sampleReviewsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevMobile = () => {
    setMobileIndex((prev) => (prev === 0 ? sampleReviewsData.length - 1 : prev - 1));
  };

  const handleNextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % sampleReviewsData.length);
  };

  return (
    <div className="relative">
      {/* ========================================================= */}
      {/* 1. DESKTOP / TABLET: Continuous Moving Marquee (md & above) */}
      {/* ========================================================= */}
      <div
        className="hidden md:block relative overflow-hidden py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHoveredOrTouched(true)}
        onMouseLeave={() => setIsHoveredOrTouched(false)}
      >
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

        {/* Moving Marquee Track */}
        <div
          className={`animate-marquee-left gap-6 flex items-stretch ${isPaused ? 'is-paused' : ''}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {marqueeReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[360px] lg:w-[410px] shrink-0 flex flex-col"
            >
              <ReviewCard review={review} className="h-full min-h-[320px]" />
            </div>
          ))}
        </div>

        {/* Desktop Controls Bar */}
        <div className="mt-5 flex items-center justify-between px-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsManualPaused(!isManualPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky-400 cursor-pointer shadow-2xs"
              aria-label={isManualPaused ? 'Resume review movement' : 'Pause review movement'}
            >
              {isManualPaused ? (
                <>
                  <Play className="w-3 h-3 text-brand-teal-600 fill-brand-teal-600" />
                  <span>Resume Movement</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-brand-sky-600" />
                  <span>Pause Movement</span>
                </>
              )}
            </button>
            <span className="text-slate-400">• Hover over any card to pause and read</span>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            15 Curated Traveler Experiences
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE: Controlled Single-Card Carousel (under md)     */}
      {/* ========================================================= */}
      <div
        className="block md:hidden py-2"
        onTouchStart={() => setIsHoveredOrTouched(true)}
        onTouchEnd={() => setIsHoveredOrTouched(false)}
      >
        <div className="relative px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col"
            >
              <ReviewCard review={sampleReviewsData[mobileIndex]} className="min-h-[320px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Carousel Navigation Controls */}
        <div className="mt-4 flex items-center justify-between gap-3 px-2">
          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrevMobile}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-soft flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all focus:outline-none cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          {/* Indicator & Count */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-brand-navy-950">
              {mobileIndex + 1} of {sampleReviewsData.length}
            </span>
            <div className="flex items-center gap-1 mt-1.5">
              {sampleReviewsData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMobileIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    mobileIndex === i
                      ? 'w-5 bg-brand-sky-600'
                      : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNextMobile}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-soft flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all focus:outline-none cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Action Buttons (Optional) */}
      {showActions && (
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button to="/reviews" variant="outline" size="sm" className="w-full sm:w-auto">
            Explore All Traveler Reviews
          </Button>
          <Button
            to="/reviews#leave-review"
            variant="secondary"
            size="sm"
            icon={<MessageSquarePlus className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Share Your Travel Experience
          </Button>
        </div>
      )}
    </div>
  );
};
