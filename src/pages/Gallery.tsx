import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ClientMemoriesSection } from '../components/gallery/ClientMemoriesSection';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Camera, CalendarCheck, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../components/common/InstagramIcon';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Gallery: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(
    'Hello Jayashakthi Tours, I saw your travel gallery and would like to plan a custom trip across India.'
  );

  return (
    <PageContainer
      seo={{
        title: 'Travel Gallery & Client Memories',
        description:
          'Explore authentic client travel memories from journeys arranged by Jayashakthi Tours, alongside curated India destination photography.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Camera className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Journey Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            India Travel Gallery
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Experience real travel memories created by our travelers across India, followed by destination inspirations for your upcoming adventure.
          </p>
        </div>
      </section>

      {/* 1. FIRST GALLERY SESSION: Past Client / Real Traveler Photos (hideCta=true to avoid duplicate CTA) */}
      <ClientMemoriesSection hideCta={true} />

      {/* Subtle Instagram Link Near Gallery */}
      <div className="text-center -mt-4 sm:-mt-6 mb-12 sm:mb-16">
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-700 hover:text-brand-navy-950 text-xs sm:text-sm font-medium border border-slate-200/90 hover:border-brand-sky-300 shadow-2xs hover:shadow-soft transition-all duration-300 cursor-pointer select-none"
        >
          <InstagramIcon className="w-4 h-4 text-brand-teal-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
          <span>Follow our journeys on Instagram</span>
          <span className="text-slate-400 font-mono text-xs hidden sm:inline">{business.instagramHandle}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-sky-600 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* 2. SECOND GALLERY SESSION: AI / Destination Inspiration Images */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80">
        <SectionHeading
          eyebrow="DESTINATION INSPIRATIONS"
          title="Landscapes & Architectural Highlights"
          description="Towering Dravidian temple vimanas, peaceful Kerala backwaters, royal palaces, and air-conditioned fleets that shape our signature routes."
          align="center"
        />

        <GalleryGrid showFilters={true} />

        {/* ONLY ONE Combined CTA at the end of the entire gallery */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-200 shadow-soft text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-gold-50 text-brand-gold-700 border border-brand-gold-200/80">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
            <span>Start Your Journey</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy-950 tracking-tight">
            Plan Your Trip With Us
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us which destinations inspire your journey. We'll design a customized day-by-day itinerary with verified boutique stays, private transportation, and complete travel support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Button
              to="/booking"
              variant="primary"
              size="lg"
              icon={<CalendarCheck className="w-4 h-4" />}
              className="uppercase tracking-wider font-bold shadow-soft"
            >
              PLAN MY TRIP
            </Button>
            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
              className="shadow-soft"
            >
              WHATSAPP US
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
