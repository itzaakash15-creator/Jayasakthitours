import React from 'react';
import { business } from '../../config/business';

export const AgencyPosterSection: React.FC = () => {
  return (
    <section className="py-6 sm:py-10 lg:py-12 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-lg sm:shadow-soft-xl border border-slate-200/80 bg-white">
          <img
            src={business.poster}
            alt="Jayashakthi Tours Poster"
            className="w-full h-auto object-contain block select-none mx-auto"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
