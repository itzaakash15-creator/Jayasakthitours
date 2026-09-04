import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { Button } from '../components/common/Button';
import { sampleReviewsData, SAMPLE_REVIEWS_DISCLAIMER, ReviewItem } from '../data/reviews';
import { MessageSquarePlus, AlertCircle, Sparkles } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');

  const filterOptions = [
    'All',
    'English',
    'Tanglish',
    'Family',
    'Couple',
    'Group',
    'Temple / Spiritual',
  ];

  const filteredReviews = sampleReviewsData.filter((r: ReviewItem) => {
    if (filterType === 'All') return true;
    if (filterType === 'English') return r.language === 'English';
    if (filterType === 'Tanglish') return r.language === 'Tanglish';
    return r.tripType === filterType;
  });

  return (
    <PageContainer
      seo={{
        title: 'Traveler Experiences | Sample Testimonials',
        description:
          'Read sample traveler testimonials illustrating how international travelers and families experience our coordinated India tours.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Stories & Perspectives</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Traveler Experiences
          </h1>

          <p className="text-lg sm:text-xl font-medium text-brand-teal-800">
            Every journey tells a story.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover how foreign visitors and families value having their day-by-day itinerary, private transport, and hotels organized seamlessly.
          </p>

          {/* Mandatory Clear Sample Disclaimer */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800 text-left sm:text-center max-w-2xl mx-auto">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{SAMPLE_REVIEWS_DISCLAIMER}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Showcase */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top actions & filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {filterOptions.map((opt) => {
              const isActive = filterType === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFilterType(opt)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Submit Review CTA */}
          <Button
            to="/submit-review"
            variant="primary"
            size="sm"
            icon={<MessageSquarePlus className="w-4 h-4" />}
            className="uppercase tracking-wider font-bold text-xs shrink-0 w-full sm:w-auto"
          >
            Submit Traveler Review
          </Button>
        </div>

        {/* Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review: ReviewItem) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Bottom review submission invite */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 shadow-soft text-center space-y-3">
          <h3 className="text-xl font-bold text-brand-navy-950">
            Traveled with Jayasakthi Tours & Travels?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            We value your feedback. Share your experience with our transportation, accommodations, and itinerary planning.
          </p>
          <div className="pt-2">
            <Button
              to="/submit-review"
              variant="secondary"
              size="md"
              icon={<MessageSquarePlus className="w-4 h-4" />}
            >
              How Was Your Journey With Us?
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
