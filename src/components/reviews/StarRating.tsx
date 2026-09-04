import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md',
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const currentVal = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= currentVal;

        if (interactive) {
          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange && onChange(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              className="p-1 focus:outline-none focus:ring-1 focus:ring-brand-gold-400 rounded transition-transform hover:scale-110"
              aria-label={`Rate ${starValue} of ${maxStars} stars`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'fill-brand-gold-400 text-brand-gold-500'
                    : 'fill-slate-100 text-slate-300'
                } transition-colors`}
              />
            </button>
          );
        }

        return (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              isFilled
                ? 'fill-brand-gold-400 text-brand-gold-500'
                : 'fill-slate-100 text-slate-300'
            }`}
          />
        );
      })}
    </div>
  );
};
