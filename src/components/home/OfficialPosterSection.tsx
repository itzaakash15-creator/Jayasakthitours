import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CalendarCheck,
  MessageCircle,
  Phone,
  MapPin,
  Maximize2,
  X,
  FileCheck2,
  Navigation,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { Button } from '../common/Button';

export const OfficialPosterSection: React.FC = () => {
  const [isPosterExpanded, setIsPosterExpanded] = useState(false);
  const whatsappUrl = createWhatsAppUrl(
    'Hello Jayashakthi Tours, I saw your official agency poster and would like to enquire about planning an India tour.'
  );

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-brand-sky-50/40 to-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-brand-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Official Poster Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg mx-auto group">
              {/* Floating Verified Badge */}
              <div className="absolute -top-3 -left-2 sm:-left-3 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-navy-950 text-white text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-soft border border-white/20">
                <FileCheck2 className="w-3.5 h-3.5 text-brand-gold-400 shrink-0" />
                <span>Official Agency Poster</span>
              </div>

              {/* Poster Frame Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-xl border-4 border-white bg-white transition-all duration-300 group-hover:shadow-soft-2xl">
                <img
                  src={business.poster}
                  alt="Official Jayashakthi Tours Agency Poster and Travel Highlights"
                  className="w-full h-auto object-contain block select-none cursor-pointer"
                  onClick={() => setIsPosterExpanded(true)}
                  loading="eager"
                />

                {/* Hover overlay hint to zoom */}
                <div
                  onClick={() => setIsPosterExpanded(true)}
                  className="absolute inset-0 bg-brand-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                  title="Click to view full size"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xs text-brand-navy-950 font-bold text-xs shadow-soft uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-brand-sky-700" />
                    Tap to Expand
                  </span>
                </div>
              </div>

              {/* Caption helper below poster */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Preserving official dimensions &amp; services</span>
                <button
                  type="button"
                  onClick={() => setIsPosterExpanded(true)}
                  className="inline-flex items-center gap-1 text-brand-sky-700 font-semibold hover:underline cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View High-Res</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Agency Profile, Credentials & Instant CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sky-100/80 text-brand-sky-900 border border-brand-sky-200/80 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-brand-teal-700 shrink-0" />
              <span>Registered Travel Operator • Chennai</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
              Official Profile of <br className="hidden sm:inline" />
              <span className="text-gradient-brand">JAYASHAKTHI TOURS</span>
            </h2>

            {/* Concise Agency Introduction */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Based in Chennai, <strong>JAYASHAKTHI TOURS</strong> specializes in comprehensive India tour planning, dedicated chauffeur transport, verified heritage and boutique accommodations, and bespoke temple and cultural itineraries for domestic and international travelers.
            </p>

            {/* Official Credentials Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft text-left space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Proprietor
                  </span>
                  <span className="font-bold text-brand-navy-950 text-sm">
                    {business.proprietor}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Headquarters
                  </span>
                  <span className="font-semibold text-slate-700">
                    Chennai, Tamil Nadu, India
                  </span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-brand-sky-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {business.address.formatted}
                </span>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left text-xs font-semibold text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-teal-500 shrink-0" />
                <span>Private Fleet &amp; Chauffeur</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-sky-500 shrink-0" />
                <span>South India Temple Trails</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold-500 shrink-0" />
                <span>Custom Daily Itineraries</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button
                to="/booking"
                variant="primary"
                size="md"
                icon={<CalendarCheck className="w-4 h-4" />}
                className="w-full sm:w-auto uppercase tracking-wider font-bold shadow-soft"
              >
                PLAN MY TRIP
              </Button>

              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
                className="w-full sm:w-auto font-semibold shadow-soft"
              >
                WHATSAPP US
              </Button>

              <Button
                href={business.address.directionsUrl}
                external
                variant="outline"
                size="md"
                icon={<Navigation className="w-4 h-4 text-brand-sky-700" />}
                className="w-full sm:w-auto font-semibold text-xs"
              >
                DIRECTIONS
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Poster Lightbox Modal */}
      <AnimatePresence>
        {isPosterExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsPosterExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-brand-gold-400" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    Official Jayashakthi Tours Poster
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPosterExpanded(false)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close poster view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable image container */}
              <div className="overflow-auto p-2 sm:p-4 bg-slate-100 flex items-center justify-center flex-1">
                <img
                  src={business.poster}
                  alt="Official Jayashakthi Tours Agency Poster Full View"
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-4 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500">
                  Proprietor: {business.proprietor} • {business.phone}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    href={whatsappUrl}
                    external
                    variant="whatsapp"
                    size="sm"
                    className="!text-xs !py-1.5"
                    icon={<MessageCircle className="w-3.5 h-3.5 fill-white/20" />}
                  >
                    Enquire on WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
