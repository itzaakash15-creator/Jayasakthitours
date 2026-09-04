import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ClientMemoriesSection } from '../components/gallery/ClientMemoriesSection';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Camera, CalendarCheck, MessageCircle, Sparkles } from 'lucide-react';
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
