import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck, MapPin, Compass, ArrowRight } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { LiquidButton } from '../common/LiquidButton';

export const HeroSection: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const scrollToTours = () => {
    const element = document.getElementById('tours');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-14 lg:pt-12 lg:pb-20 bg-gradient-to-b from-brand-sky-50/60 via-white to-slate-50 scroll-mt-20">
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-sky-200/25 via-brand-teal-200/20 to-brand-gold-100/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Content & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-soft border border-brand-sky-200/80 text-xs font-bold tracking-wider uppercase text-brand-sky-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal-500"></span>
              </span>
              <span>JAYASHAKTHI TOURS &amp; TRAVELS</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-slate-500 font-medium lowercase">chennai</span>
            </div>

            {/* Main Tourism-Focused Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy-950 leading-[1.12]">
              Discover India.{' '}
              <span className="text-gradient-brand block sm:inline">
                Travel Without the Stress.
              </span>
            </h1>

            {/* Supporting Explanation */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Jayashakthi Tours &amp; Travels helps travelers plan and coordinate memorable journeys across India. From private transport and handpicked hotels to custom itineraries and helpful travel assistance, we make exploring India straightforward and enjoyable.
            </p>

            {/* Standardized Primary & Secondary CTAs with Liquid Gradient Flow */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <LiquidButton
                onClick={scrollToTours}
                size="lg"
                variant="primary"
                className="w-full sm:w-auto min-w-[210px]"
              >
                Explore Tours
              </LiquidButton>

              <LiquidButton
                href={whatsappUrl}
                external
                variant="emerald"
                size="lg"
                className="w-full sm:w-auto min-w-[210px]"
              >
                WhatsApp Us
              </LiquidButton>
            </div>

            {/* Direct Value Points */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-teal-600" />
                Coordinated Travel Logistics
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand-sky-600" />
                Customized Daily Itineraries
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold-600" />
                South India &amp; All-India Routes
              </span>
            </div>
          </motion.div>

          {/* Right Column: Official Agency Promotional Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Poster frame with clean borders and soft shadow */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-xl border-2 sm:border-4 border-white bg-white">
                <img
                  src={business.poster}
                  alt="Official Jayashakthi Tours & Travels Promotional Poster"
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
