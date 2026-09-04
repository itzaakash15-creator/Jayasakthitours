import React from 'react';
import { Quote, Globe } from 'lucide-react';
import { ReviewItem } from '../../data/reviews';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Generate initials for avatar
  const initials = review.name.slice(0, 2).toUpperCase();

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-soft hover:shadow-soft-lg border border-slate-200/80 transition-all duration-300 flex flex-col justify-between h-full relative">
      {/* Top row: Rating & Sample badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <StarRating rating={review.rating} size="sm" />
          <div className="flex items-center gap-1.5">
            {review.language === 'Tanglish' && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                Tanglish
              </span>
            )}
            <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
              Sample Demo
            </span>
          </div>
        </div>

        {/* Quote text */}
        <div className="relative mb-6">
          <Quote className="w-8 h-8 text-brand-sky-100 absolute -top-3 -left-2 -z-0" />
          <p className="relative z-10 text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{review.text}"
          </p>
        </div>
      </div>

      {/* Traveler Bio Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-sky-600 to-brand-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
          {initials}
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-brand-navy-950">
              {review.name}
            </h4>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-brand-sky-700 font-medium inline-flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {review.country}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {review.tripType} Travel
          </span>
        </div>
      </div>
    </div>
  );
};
