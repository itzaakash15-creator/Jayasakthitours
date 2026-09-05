import React from 'react';
import { Quote, Globe, CheckCircle } from 'lucide-react';
import { ReviewItem } from '../../data/reviews';
import { ReviewRecord } from '../../lib/supabase';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: ReviewItem | ReviewRecord;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  const name = (review as any).customer_name || (review as any).name || 'Traveler';
  const text = (review as any).review_text || (review as any).review || (review as any).text || '';
  const rating = Number(review.rating) || 5;
  const location = (review as any).location || 'Verified Tour Guest';
  const tripType = (review as any).tripType || 'Client';
  const language = (review as any).language;

  // Generate initials for avatar
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || 'TR';

  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-soft border border-slate-200/90 transition-all duration-300 ease-out flex flex-col justify-between select-none cursor-default min-h-[300px] sm:min-h-[320px] w-full text-left transform-gpu hover:shadow-soft-lg hover:border-brand-sky-300 ${className}`}
    >
      {/* Top row: Star Rating & Verified Tag */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <StarRating rating={rating} size="sm" />
          <span className="text-xs font-bold text-brand-navy-950">{rating.toFixed(1)}</span>
        </div>

        {language === 'Tanglish' ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/80 shrink-0">
            Tanglish
          </span>
        ) : (
          <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70 inline-flex items-center gap-1 shrink-0">
            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
            Verified
          </span>
        )}
      </div>

      {/* Quote text with natural wrapping and zero overflow */}
      <div className="relative py-4 flex-1 flex flex-col justify-center">
        <Quote className="w-8 h-8 text-brand-sky-100 absolute top-1 left-0 -z-0 pointer-events-none opacity-80" />
        <p className="relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed italic font-normal line-clamp-6">
          "{text}"
        </p>
      </div>

      {/* Traveler Bio Footer */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center gap-3 mt-auto shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-sky-600 to-brand-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ring-2 ring-brand-sky-100">
          {initials}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-brand-navy-950 truncate max-w-[140px] sm:max-w-[180px]">
              {name}
            </h4>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-brand-sky-700 font-medium inline-flex items-center gap-1 truncate max-w-[140px] sm:max-w-[180px]">
              <Globe className="w-3 h-3 shrink-0 text-brand-teal-600" />
              {location}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {tripType} Travel Experience
          </span>
        </div>
      </div>
    </div>
  );
};
