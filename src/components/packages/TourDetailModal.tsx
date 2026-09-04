import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Compass,
  MessageCircle,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  Users,
} from 'lucide-react';
import { TourPackage } from '../../data/packages';
import { createWhatsAppUrl } from '../../utils/whatsapp';

interface TourDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: TourPackage | null;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  isOpen,
  onClose,
  pkg,
}) => {
  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!pkg) return null;

  const whatsAppMessage = `Hi Jayashakthi Tours & Travels, I would like more information on the "${pkg.title}" (${pkg.duration}) tour package. Could you please share itinerary options, pricing, and availability?`;
  const whatsAppUrl = createWhatsAppUrl(whatsAppMessage);
  const bookingUrl = `/booking?package=${encodeURIComponent(pkg.title)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-modal-title"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy-950/60 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-brand-navy-950 flex items-center justify-center shadow-md border border-slate-200/80 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-sky-500"
              aria-label="Close tour details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto overscroll-contain flex-1 p-0 scrollbar-thin">
              {/* Hero Banner Image */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/85 via-brand-navy-950/35 to-transparent" />

                {/* Floating Badges on Hero */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-navy-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                    {pkg.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-navy-900/80 backdrop-blur-md text-amber-300 text-xs font-semibold shadow-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                {/* Title & Tagline in Hero Header */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2
                    id="tour-modal-title"
                    className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
                  >
                    {pkg.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1">
                    {pkg.tagline}
                  </p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-8 space-y-6">
                {/* Route Overview Pill */}
                <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-brand-sky-100/80">
                  <div className="flex items-center gap-1.5 text-brand-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-sky-600" />
                    <span>Destinations Covered in this Journey</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {pkg.destinations.map((city, idx) => (
                      <React.Fragment key={city}>
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-brand-navy-950 shadow-2xs">
                          {city}
                        </span>
                        {idx < pkg.destinations.length - 1 && (
                          <span className="text-slate-400 font-bold text-xs">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Overview Description */}
                <div>
                  <h3 className="text-sm font-bold text-brand-navy-950 uppercase tracking-wider mb-2">
                    Tour Overview
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Key Places & Highlights */}
                <div>
                  <h3 className="text-sm font-bold text-brand-navy-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-teal-600" />
                    <span>Key Places &amp; Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pkg.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-teal-600 shrink-0 mt-0.5" />
                        <span className="font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For Callout */}
                {pkg.idealFor && (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-sky-50/70 border border-brand-sky-200/70 text-brand-navy-950 text-xs sm:text-sm">
                    <Users className="w-4 h-4 text-brand-sky-700 shrink-0" />
                    <div>
                      <span className="font-bold">Recommended for: </span>
                      <span className="text-slate-700">{pkg.idealFor}</span>
                    </div>
                  </div>
                )}

                {/* Customization Guarantee */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200/70 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-brand-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                      100% Tailored To Your Preference
                    </h4>
                    <p className="text-xs text-amber-900/80 leading-relaxed mt-0.5">
                      Every Jayashakthi Tours itinerary is personalized around your flight schedule, travel pace, choice of private vehicle, and preferred hotel accommodations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action CTAs */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Private Chauffeur • Verified Stays • 24/7 Assistance</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp Enquiry</span>
                </a>

                <a
                  href={bookingUrl}
                  onClick={onClose}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 hover:from-brand-sky-500 hover:to-brand-teal-500 active:scale-95 text-white text-xs font-bold uppercase tracking-wider shadow-soft transition-all cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Plan This Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
