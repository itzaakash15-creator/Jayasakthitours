import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  MessageCircle,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Layers,
  CalendarDays,
  Car,
  HeartHandshake,
  Globe2,
  Flame,
  MapPin,
  Phone,
  Navigation,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { HeroSection } from '../components/hero/HeroSection';
import { TrustStrip } from '../components/hero/TrustStrip';
import { JourneyFlow } from '../components/journey/JourneyFlow';
import { ItineraryTimeline } from '../components/itinerary/ItineraryTimeline';
import { ServiceCard } from '../components/services/ServiceCard';
import { PackageCard } from '../components/packages/PackageCard';
import { ReviewCarousel } from '../components/reviews/ReviewCarousel';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { servicesData } from '../data/services';
import { tourPackagesData } from '../data/packages';
import { clientPhotos } from '../data/clientPhotos';
import { ClientPhotoCard } from '../components/gallery/ClientPhotoCard';
import { ClientPhotoLightbox } from '../components/gallery/ClientPhotoLightbox';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Home: React.FC = () => {
  const [clientLightboxIndex, setClientLightboxIndex] = useState<number | null>(null);
  const quickServices = servicesData.filter((s) => s.isQuickService);
  const featuredPackages = tourPackagesData.slice(0, 3);
  const featuredClientPhotos = clientPhotos.slice(0, 4);
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const customTravelOptions = [
    {
      title: 'Family Travel',
      desc: 'Comfortable vehicles, spacious child-friendly stays, and balanced daily pacing.',
      icon: <Users className="w-5 h-5 text-brand-sky-600" />,
      tag: 'All Generations',
    },
    {
      title: 'Group Travel',
      desc: 'Dedicated 12–17 seater luxury Tempo Travellers and coordinated logistics.',
      icon: <Users className="w-5 h-5 text-brand-teal-600" />,
      tag: 'Private Fleet',
    },
    {
      title: 'International Travelers',
      desc: 'Airport reception, e-Visa assistance, English-speaking guides, and vetted stays.',
      icon: <Globe2 className="w-5 h-5 text-brand-gold-600" />,
      tag: 'Global Standards',
    },
    {
      title: 'Temple & Spiritual Travel',
      desc: 'Special darshan timing guidance, sacred rituals, and historic South Indian temple trails.',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      tag: 'Darshan & Pooja',
    },
    {
      title: 'Cultural Travel',
      desc: 'Living arts, classical dance, artisan weaving clusters, and authentic regional feasts.',
      icon: <Sparkles className="w-5 h-5 text-brand-sky-600" />,
      tag: 'Heritage & Arts',
    },
    {
      title: 'Multi-City India Tours',
      desc: 'Connecting South India heritage, Kerala waterways, and North India wonders smoothly.',
      icon: <Compass className="w-5 h-5 text-brand-teal-600" />,
      tag: 'Cross-Country',
    },
  ];

  const whyChooseUsPoints = [
    {
      title: 'Personalized Planning',
      desc: 'Your journey is planned around your interests and schedule.',
      icon: <CalendarCheck className="w-6 h-6 text-brand-sky-600" />,
    },
    {
      title: 'Complete Coordination',
      desc: 'Travel arrangements are coordinated together instead of separately.',
      icon: <Layers className="w-6 h-6 text-brand-teal-600" />,
    },
    {
      title: 'Day-by-Day Itinerary',
      desc: 'Know your planned journey before you begin.',
      icon: <CalendarDays className="w-6 h-6 text-brand-sky-700" />,
    },
    {
      title: 'Comfortable Transportation',
      desc: 'Choose transportation that fits your group and travel style.',
      icon: <Car className="w-6 h-6 text-brand-teal-700" />,
    },
    {
      title: 'Local Experiences',
      desc: "Discover India's culture, food, temples and destinations.",
      icon: <Sparkles className="w-6 h-6 text-brand-gold-600" />,
    },
    {
      title: 'Travel Support',
      desc: 'Receive assistance throughout your journey.',
      icon: <HeartHandshake className="w-6 h-6 text-brand-sky-600" />,
    },
  ];

  return (
    <PageContainer
      seo={{
        title: 'India Tour Packages & Travel Services',
        description:
          'Customized India tour packages, day-by-day itinerary planning, hotel and flight bookings, visa assistance, car and Tempo Traveller rentals, sightseeing and complete travel support.',
      }}
    >
      {/* 1. Main Hero Section */}
      <HeroSection />

      {/* 2. Hero Trust Strip */}
      <TrustStrip />

      {/* 3. Key Services & Destinations Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500 animate-pulse" />
              Essential Services
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy-950 tracking-tight">
              Coordinated Travel Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              From comfortable transportation to verified heritage hotels, every arrangement is planned together.
            </p>
          </div>

          <Button
            to="/services"
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="self-start md:self-auto text-xs font-bold uppercase tracking-wider"
          >
            View All Services
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. Complete Travel Journey Flow (7 Steps) */}
      <JourneyFlow />

      {/* 6. Day-by-Day Itinerary Feature */}
      <ItineraryTimeline limitDays={4} />

      {/* 7. Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Jayashakthi Difference"
            title="India Can Be Complicated. Your Trip Doesn't Have To Be."
            description="Traveling across India is magical, but organizing drivers, hotels, temple timings, and luggage routes independently can be overwhelming. We streamline the entire journey into a relaxing experience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUsPoints.map((point) => (
              <div
                key={point.title}
                className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-brand-sky-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-100 flex items-center justify-center shrink-0">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-1">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Sample Tour Packages Preview */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500" />
              Sample Itineraries
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy-950 tracking-tight">
              Signature India Tour Arcs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              These sample routes represent our most requested journeys. Every single tour is fully customized to your travel window.
            </p>
          </div>

          <Button
            to="/packages"
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="self-start md:self-auto text-xs font-bold uppercase tracking-wider"
          >
            Explore All 6 Packages
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 9. Custom Travel Options ("Don't Want a Fixed Package?") */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-sky-50 via-white to-brand-teal-50 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="100% Customized Journeys"
            title="Don't Want a Fixed Package?"
            description="Tell us where you want to go, how many days you have and how you want to travel. We'll help organize the journey around you."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {customTravelOptions.map((opt) => (
              <div
                key={opt.title}
                className="p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-sky-50 flex items-center justify-center">
                    {opt.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-700 bg-brand-teal-50 px-2.5 py-0.5 rounded-full border border-brand-teal-100">
                    {opt.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-brand-navy-950 mb-1.5">
                  {opt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              to="/booking"
              variant="primary"
              size="lg"
              icon={<CalendarCheck className="w-5 h-5" />}
              className="uppercase tracking-wider font-bold shadow-soft-lg px-8 py-3.5"
            >
              BUILD MY TRIP
            </Button>
          </div>
        </div>
      </section>

      {/* 10. REAL TRAVELER GALLERY (Authentic Past Client Photos) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60 mb-3">
              <Camera className="w-3.5 h-3.5 text-brand-teal-600" />
              From Our Travelers
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy-950 tracking-tight">
              Real Traveler Gallery
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Authentic photographs and memories from previous clients who traveled across India with Jayashakthi Tours.
            </p>
          </div>

          <Button
            to="/gallery"
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="self-start md:self-auto text-xs font-bold uppercase tracking-wider"
          >
            Explore Client Memories
          </Button>
        </div>

        {/* Real Client Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {featuredClientPhotos.map((photo, index) => (
            <ClientPhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => setClientLightboxIndex(index)}
            />
          ))}
        </div>

        {/* Lightbox for Real Client Photos */}
        <ClientPhotoLightbox
          photo={clientLightboxIndex !== null ? featuredClientPhotos[clientLightboxIndex] : null}
          currentIndex={clientLightboxIndex ?? 0}
          totalPhotos={featuredClientPhotos.length}
          onClose={() => setClientLightboxIndex(null)}
          onPrev={() =>
            setClientLightboxIndex((prev) =>
              prev !== null
                ? (prev - 1 + featuredClientPhotos.length) % featuredClientPhotos.length
                : null
            )
          }
          onNext={() =>
            setClientLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % featuredClientPhotos.length : null
            )
          }
        />
      </section>

      {/* 11. AI DESTINATION INSPIRATION GALLERY */}
      <section className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60 mb-3">
                <ImageIcon className="w-3.5 h-3.5 text-brand-gold-600" />
                Destination Inspirations
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy-950 tracking-tight">
                AI Destination Gallery
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Explore the magnificent temples, serene waterways, royal forts, and landscapes that inspire our custom routes.
              </p>
            </div>

            <Button
              to="/gallery"
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="self-start md:self-auto text-xs font-bold uppercase tracking-wider"
            >
              View Full Gallery
            </Button>
          </div>

          <GalleryGrid limit={6} showFilters={false} />
        </div>
      </section>

      {/* 12. ANIMATED REVIEWS (Desktop Marquee + Mobile Single-Card Slider) */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Traveler Stories"
            title="Traveler Experiences & Reviews"
            description="Every journey tells a story. Here is what travelers say about the clarity of our day-by-day itineraries and travel coordination."
          />

          <ReviewCarousel showActions={true} />
        </div>
      </section>

      {/* 13. PLAN YOUR TRIP CTA (High-Impact Banner) */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-brand-sky-700 via-brand-sky-600 to-brand-teal-600 text-white relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-brand-gold-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>Start Your Journey Across India</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Plan Your Trip With Us
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-brand-sky-100 max-w-2xl mx-auto leading-relaxed">
            Tell us where you want to go, how many days you have and how you want to travel. We'll help you plan the complete journey.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to="/booking"
              variant="outline"
              size="lg"
              icon={<CalendarCheck className="w-5 h-5 text-brand-sky-700" />}
              className="w-full sm:w-auto px-8 py-4 font-bold uppercase tracking-wider !bg-white !text-brand-navy-950 hover:!bg-slate-50 shadow-soft-lg"
            >
              PLAN MY TRIP
            </Button>

            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-soft-lg"
            >
              WHATSAPP US (+91 98408 15556)
            </Button>
          </div>
        </div>
      </section>

      {/* 14. OFFICIAL OFFICE & CONTACT STRIP */}
      <section className="py-12 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 border border-slate-200/90 shadow-soft flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-brand-sky-800 border border-brand-sky-200 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-brand-teal-600" />
                <span>Office Address • Chennai Headquarters</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950">
                JAYASHAKTHI TOURS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Proprietor: <strong className="text-brand-navy-900">{business.proprietor}</strong><br />
                {business.address.formatted}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Button
                href={business.address.directionsUrl}
                external
                variant="primary"
                size="md"
                icon={<Navigation className="w-4 h-4" />}
                className="w-full sm:w-auto text-xs uppercase font-bold tracking-wider"
              >
                Get Directions
              </Button>
              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
                className="w-full sm:w-auto text-xs font-bold"
              >
                WhatsApp Us
              </Button>
              <Button
                href={business.phoneCallUrl}
                variant="outline"
                size="md"
                icon={<Phone className="w-4 h-4 text-brand-sky-700" />}
                className="w-full sm:w-auto text-xs font-semibold"
              >
                Call {business.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
