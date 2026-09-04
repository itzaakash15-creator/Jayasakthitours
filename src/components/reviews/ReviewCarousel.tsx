import React, { useState } from 'react';
import { AlertCircle, MessageSquarePlus, Pause, Play } from 'lucide-react';
import { sampleReviewsData, SAMPLE_REVIEWS_DISCLAIMER } from '../../data/reviews';
import { ReviewCard } from './ReviewCard';
import { Button } from '../common/Button';

interface ReviewCarouselProps {
  hideDisclaimer?: boolean;
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ hideDisclaimer = false }) => {
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);

  const isPaused = isManualPaused || isHoveredOrTouched;

  // Duplicate the 15 reviews to create an infinite seamless loop
  const marqueeReviews = [...sampleReviewsData, ...sampleReviewsData];

  return (
    <div className="relative">
      {/* Sample reviews disclaimer banner */}
      {!hideDisclaimer && (
        <div className="mb-6 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-center gap-2 text-xs text-amber-800 text-center max-w-2xl mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-medium">{SAMPLE_REVIEWS_DISCLAIMER}</span>
        </div>
      )}


      {/* Marquee Track Container with subtle edge fades */}
      <div
        className="relative overflow-hidden py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHoveredOrTouched(true)}
        onMouseLeave={() => setIsHoveredOrTouched(false)}
        onTouchStart={() => setIsHoveredOrTouched(true)}
        onTouchEnd={() => setIsHoveredOrTouched(false)}
      >
        {/* Left & Right Ambient Gradient Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Right -> Left Moving Marquee Track */}
        <div
          className={`animate-marquee-left gap-6 ${isPaused ? 'is-paused' : ''}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {marqueeReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 h-[290px]"
            >
              <ReviewCard review={review} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Play / Pause Toggle & Info */}
      <div className="mt-4 flex items-center justify-between flex-wrap gap-3 px-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsManualPaused(!isManualPaused)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky-400"
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
          <span className="hidden sm:inline text-slate-400">
            • Hover over any card to pause and enlarge
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Showing 15 verified route experiences
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-4">
        <Button to="/reviews" variant="outline" size="sm">
          View All 15 Reviews &amp; Filter
        </Button>
        <Button
          to="/submit-review"
          variant="secondary"
          size="sm"
          icon={<MessageSquarePlus className="w-4 h-4" />}
        >
          Share Your Travel Feedback
        </Button>
      </div>
    </div>
  );
};
