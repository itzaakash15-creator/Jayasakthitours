import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApprovedReviews, ReviewRecord } from '../../lib/supabase';
import { ReviewCard } from './ReviewCard';
import { Link } from 'react-router-dom';

interface ReviewCarouselProps {
  showActions?: boolean;
  showSecondaryAction?: boolean;
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  showActions = true,
  showSecondaryAction = true,
}) => {
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const loadReviews = async () => {
    try {
      const data = await fetchApprovedReviews();
      setReviews(data);
    } catch (err) {
      console.error('[ReviewCarousel] Error loading approved reviews:', err);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();

    const handleReviewsUpdated = () => loadReviews();
    window.addEventListener('jst:reviews_updated', handleReviewsUpdated);
    return () => window.removeEventListener('jst:reviews_updated', handleReviewsUpdated);
  }, []);

  const isPaused = isHoveredOrTouched;

  // Duplicate for seamless infinite loop on desktop if more than 1 review
  const marqueeReviews = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

  // Mobile auto-advance every 6 seconds if not paused
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const handlePrevMobile = () => {
    if (reviews.length === 0) return;
    setMobileIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextMobile = () => {
    if (reviews.length === 0) return;
    setMobileIndex((prev) => (prev + 1) % reviews.length);
  };

  if (!isLoading && reviews.length === 0) {
    return (
      <div className="relative py-8">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white/90 border border-slate-200/90 shadow-soft text-center space-y-3.5">
          <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center mx-auto shadow-2xs border border-brand-sky-200/80">
            <Sparkles className="w-6 h-6 text-brand-teal-600" />
          </div>
          <h3 className="text-base font-bold text-brand-navy-950">
            Authentic Guest Experiences
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Have you journeyed with Jayashakthi Tours? Be the first to share your holiday feedback and tour experience!
          </p>
          {showActions && (
            <div className="pt-2">
              <Link
                to="/reviews#leave-review"
                onClick={(e) => {
                  const el = document.getElementById('leave-review');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', '#leave-review');
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-2xs hover:shadow-soft transition-all"
              >
                <MessageSquarePlus className="w-4 h-4 text-white" />
                <span>Share Your Experience</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

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
              <ReviewCard review={reviews[mobileIndex] || reviews[0]} className="min-h-[320px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Carousel Navigation Controls */}
        {reviews.length > 1 && (
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
                {mobileIndex + 1} of {reviews.length}
              </span>
              <div className="flex items-center gap-1 mt-1.5">
                {reviews.map((_, i) => (
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
        )}
      </div>

      {/* Action Buttons (Optional) */}
      {showActions && (
        <div className="mt-10 sm:mt-12 text-center max-w-xl mx-auto px-4">
          {/* Supporting micro-copy directly above the buttons */}
          <p className="text-slate-600 text-sm sm:text-[15px] font-medium leading-relaxed mb-4 sm:mb-5">
            Loved your journey with us? Share your experience with fellow travelers.
          </p>

          {/* Centered CTA action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            {/* Primary CTA: Share Your Travel Experience */}
            <Link
              to="/reviews#leave-review"
              onClick={(e) => {
                const el = document.getElementById('leave-review');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.replaceState(null, '', '#leave-review');
                }
              }}
              className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-[275px] h-[52px] sm:h-[54px] px-6 rounded-[16px] bg-gradient-to-r from-brand-sky-600 via-brand-sky-500 to-brand-teal-600 hover:from-brand-sky-700 hover:via-brand-sky-600 hover:to-brand-teal-700 text-white font-semibold text-[15px] sm:text-base tracking-tight shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] border border-white/20 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky-500 focus-visible:ring-offset-2 select-none"
            >
              <MessageSquarePlus className="w-5 h-5 text-white shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
              <span>Share Your Travel Experience</span>
            </Link>

            {/* Secondary Action: Explore All Traveler Reviews */}
            {showSecondaryAction && (
              <Link
                to="/reviews"
                className="inline-flex items-center justify-center w-full sm:w-[220px] h-[48px] sm:h-[50px] px-5 rounded-[14px] bg-white/95 hover:bg-white text-slate-700 hover:text-brand-navy-950 font-medium sm:font-semibold text-sm sm:text-[14px] border border-slate-200/90 hover:border-brand-sky-300 shadow-xs hover:shadow-soft hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 select-none"
              >
                <span>Explore All Traveler Reviews</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
