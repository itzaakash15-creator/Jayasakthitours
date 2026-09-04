import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { ClientMemoriesSection } from '../components/gallery/ClientMemoriesSection';
import { Button } from '../components/common/Button';
import { Camera, CalendarCheck, MessageCircle } from 'lucide-react';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Gallery: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  return (
    <PageContainer
      seo={{
        title: 'India Travel & Client Memories Gallery',
        description:
          'Browse our photography collection covering South Indian living temples, serene Kerala backwaters, heritage stays, and previous client travel memories across India.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Camera className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Visual Inspirations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            India Travel Gallery
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From towering Dravidian temple vimanas to peaceful palm-lined waterways, discover the landscapes, stays, and vehicles that shape your journey.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid showFilters={true} />

        {/* CTA Footer */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-200 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-950">
            Inspired by What You See?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Let us know which places captured your imagination, and we'll weave them into your custom itinerary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              to="/booking"
              variant="primary"
              size="md"
              icon={<CalendarCheck className="w-4 h-4" />}
              className="uppercase tracking-wider font-bold"
            >
              PLAN MY TRIP
            </Button>
            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="md"
              icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
            >
              ENQUIRE ON WHATSAPP
            </Button>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Memories From Our Journeys (Client Travel Memories) */}
      <ClientMemoriesSection />
    </PageContainer>
  );
};

