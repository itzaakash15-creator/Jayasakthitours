import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, MessageSquarePlus } from 'lucide-react';
import { sampleReviewsData, SAMPLE_REVIEWS_DISCLAIMER } from '../../data/reviews';
import { ReviewCard } from './ReviewCard';
import { Button } from '../common/Button';

export const ReviewCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group into slides of 3 on desktop, 2 on tablet, 1 on mobile
  const totalReviews = sampleReviewsData.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  // Get active items window (3 items)
  const visibleReviews = [
    sampleReviewsData[currentIndex],
    sampleReviewsData[(currentIndex + 1) % totalReviews],
    sampleReviewsData[(currentIndex + 2) % totalReviews],
  ];

  return (
    <div className="relative">
      {/* Sample reviews disclaimer banner */}
      <div className="mb-6 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-center gap-2 text-xs text-amber-800 text-center">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="font-medium">{SAMPLE_REVIEWS_DISCLAIMER}</span>
      </div>

      {/* Reviews Grid / Carousel Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mobile shows 1, tablet 2, desktop 3 */}
        <div className="block">
          <ReviewCard review={visibleReviews[0]} />
        </div>
        <div className="hidden md:block">
          <ReviewCard review={visibleReviews[1]} />
        </div>
        <div className="hidden lg:block">
          <ReviewCard review={visibleReviews[2]} />
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="mt-8 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {sampleReviewsData.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-brand-sky-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="w-10 h-10 rounded-xl bg-white shadow-soft border border-slate-200 flex items-center justify-center text-slate-700 hover:text-brand-sky-700 hover:border-brand-sky-300 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="w-10 h-10 rounded-xl bg-white shadow-soft border border-slate-200 flex items-center justify-center text-slate-700 hover:text-brand-sky-700 hover:border-brand-sky-300 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Link to all reviews & submit review */}
      <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-4">
        <Button to="/reviews" variant="outline" size="sm">
          View All 15 Sample Reviews
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
