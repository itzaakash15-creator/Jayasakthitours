import React from 'react';
import { Clock, MapPin, CheckCircle2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { TourPackage } from '../../data/packages';
import { createWhatsAppUrl } from '../../utils/whatsapp';

interface PackageCardProps {
  pkg: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const packageWhatsAppMessage = `Hi Jayashakthi Tours & Travels, I'm interested in the ${pkg.title} (${pkg.duration}) tour package. Could you please provide details and availability?`;
  const packageWhatsAppUrl = createWhatsAppUrl(packageWhatsAppMessage);

  return (
    <div className="group rounded-3xl bg-white overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1 border border-slate-200/80 hover:border-brand-sky-300 transition-all duration-300 ease-out flex flex-col justify-between">
      <div>
        {/* Package Image Banner */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Duration Badge */}
          <div className="absolute top-3.5 left-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-brand-navy-950 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-brand-teal-600" />
              {pkg.duration}
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-sky-600 text-white text-[11px] font-semibold tracking-wide shadow-2xs">
              {pkg.category}
            </span>
          </div>

          {/* Title & Tagline on Image */}
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
              {pkg.title}
            </h3>
            <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
              {pkg.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Key destinations covered */}
          <div className="mb-3">
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5 text-brand-sky-600 shrink-0" />
              <span>Destinations Covered:</span>
            </div>
            <p className="text-xs text-brand-navy-900 font-semibold leading-relaxed line-clamp-2">
              {pkg.destinations.join(' • ')}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
            {pkg.description}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Key Places &amp; Highlights:
            </span>
            {pkg.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          {/* Customization Notice */}
          <div className="mt-4 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">Itinerary can be fully customized around your schedule.</span>
          </div>
        </div>
      </div>

      {/* Dual CTA Actions */}
      <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
        <a
          href={`/booking?package=${encodeURIComponent(pkg.title)}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-brand-navy-950 text-xs font-bold uppercase tracking-wider transition-colors text-center"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <a
          href={packageWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold uppercase tracking-wider shadow-soft transition-colors text-center"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white/20 shrink-0" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </div>
  );
};
