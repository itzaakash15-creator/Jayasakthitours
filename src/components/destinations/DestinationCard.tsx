import React from 'react';
import { MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { DestinationItem } from '../../data/destinations';
import { Button } from '../common/Button';

interface DestinationCardProps {
  destination: DestinationItem;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="group rounded-3xl bg-white overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1 border border-slate-100 hover:border-brand-sky-200 transition-all duration-300 ease-out flex flex-col justify-between">
      <div>
        {/* Destination Image Banner */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Region Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-navy-900 shadow-2xs">
              {destination.region}
            </span>
          </div>

          {/* Headline on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-display text-xl font-bold tracking-tight">
              {destination.name}
            </h3>
            <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
              {destination.headline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {destination.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-teal-600" />
              <span>Key Attractions:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {destination.keyAttractions.map((attraction, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md text-slate-700"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-6 pt-0">
        <Button
          to={`/booking?destination=${encodeURIComponent(destination.name)}`}
          variant="secondary"
          size="sm"
          fullWidth
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="text-xs uppercase tracking-wider font-bold"
        >
          Plan A Trip To {destination.name}
        </Button>
      </div>
    </div>
  );
};
