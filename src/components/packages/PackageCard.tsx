import React from 'react';
import { Clock, MapPin, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { TourPackage } from '../../data/packages';
import { Button } from '../common/Button';

interface PackageCardProps {
  pkg: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div className="group rounded-3xl bg-white overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1 border border-slate-200/80 hover:border-brand-sky-300 transition-all duration-300 ease-out flex flex-col justify-between">
      <div>
        {/* Package Image */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Duration Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-brand-navy-950 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-brand-teal-600" />
              {pkg.duration}
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-full bg-brand-sky-600/90 text-white text-[11px] font-semibold backdrop-blur-xs">
              {pkg.category}
            </span>
          </div>

          {/* Title & Tagline on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-display text-xl font-bold tracking-tight">
              {pkg.title}
            </h3>
            <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
              {pkg.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Destinations covered */}
          <div className="mb-3.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <MapPin className="w-3.5 h-3.5 text-brand-sky-600 shrink-0" />
              <span className="font-semibold text-slate-700">Destinations:</span>
            </div>
            <p className="text-xs text-brand-navy-900 font-medium leading-relaxed">
              {pkg.destinations.join(' • ')}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {pkg.description}
          </p>

          {/* Highlights List */}
          <div className="space-y-1.5 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Route Highlights:
            </span>
            {pkg.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          {/* Customizable notice badge */}
          <div className="mt-4 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-medium">Every package can be customized.</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0">
        <Button
          to={`/booking?package=${encodeURIComponent(pkg.title)}`}
          variant="primary"
          size="md"
          fullWidth
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="uppercase tracking-wider font-bold text-xs shadow-soft"
        >
          ENQUIRE NOW
        </Button>
      </div>
    </div>
  );
};
