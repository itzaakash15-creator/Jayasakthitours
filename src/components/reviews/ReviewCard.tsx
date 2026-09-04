import React from 'react';
import { Quote, Globe } from 'lucide-react';
import { ReviewItem } from '../../data/reviews';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: ReviewItem;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  // Generate clean initials for avatar
  const initials = review.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`group relative rounded-3xl bg-white p-6 sm:p-7 shadow-soft border border-slate-200/90 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:z-30 hover:shadow-soft-xl hover:border-brand-sky-300 flex flex-col justify-between h-full select-none cursor-default transform-gpu ${className}`}
    >
      {/* Top row: Rating & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <StarRating rating={review.rating} size="sm" />
          {review.language === 'Tanglish' && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/80">
              Tanglish
            </span>
          )}
        </div>

        {/* Quote text */}
        <div className="relative mb-6">
          <Quote className="w-8 h-8 text-brand-sky-100 absolute -top-3 -left-2 -z-0 pointer-events-none" />
          <p className="relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
            "{review.review || review.text}"
          </p>
        </div>
      </div>

      {/* Traveler Bio Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-sky-600 to-brand-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ring-2 ring-brand-sky-100">
          {initials}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-brand-navy-950 truncate">
              {review.name}
            </h4>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-brand-sky-700 font-medium inline-flex items-center gap-1 truncate">
              <Globe className="w-3 h-3 shrink-0 text-brand-teal-600" />
              {review.location}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {review.tripType} Travel
          </span>
        </div>
      </div>
    </div>
  );
};
