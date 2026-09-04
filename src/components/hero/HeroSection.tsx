import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, MessageCircle, ShieldCheck, MapPin, Compass, Sparkles } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-brand-sky-50/70 via-white to-slate-50">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-sky-200/30 via-brand-teal-200/25 to-brand-gold-100/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-soft border border-brand-sky-200/80 text-xs font-semibold text-brand-sky-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal-500"></span>
              </span>
              <span>Complete India Travel Coordination</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-slate-500">Based in Chennai</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy-950 leading-[1.12]">
              Experience India.{' '}
              <span className="text-gradient-brand block sm:inline">
                We'll Handle the Journey.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              From airport pickup and hotels to transportation, sightseeing, guides and your journey back home — we coordinate the complete India travel experience around you.
            </p>

            {/* Core Differentiator Callout Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-brand-sky-100 shadow-soft max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sky-50 text-brand-sky-700 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-brand-teal-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy-900">
                    {business.differentiator}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    No need to piece together flights, cabs, stays, and temple passes yourself. Tell us your plan, and we coordinate everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                to="/booking"
                variant="primary"
                size="lg"
                icon={<CalendarCheck className="w-5 h-5" />}
                className="w-full sm:w-auto px-8 py-4 text-base tracking-wide font-bold uppercase"
              >
                PLAN MY TRIP
              </Button>

              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold"
              >
                WHATSAPP US
              </Button>
            </div>

            {/* Direct Micro-trust points */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-teal-600" />
                Zero Fragmented Booking Stress
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand-sky-600" />
                Custom Day-by-Day Itineraries
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold-600" />
                South India & Pan-India Routes
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase — Agency Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Poster Card with rounded corners, subtle white border, and soft shadow */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-xl border-2 sm:border-4 border-white bg-white">
                <img
                  src={business.poster}
                  alt="Jayashakthi Tours & Travels"
                  className="w-full h-auto object-contain block mx-auto select-none"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
