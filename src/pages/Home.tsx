import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Layers,
  Compass,
  HeartHandshake,
  Camera,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Mail,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { HeroSection } from '../components/hero/HeroSection';
import { PackageCard } from '../components/packages/PackageCard';
import { ReviewCarousel } from '../components/reviews/ReviewCarousel';
import { FaqSection } from '../components/home/FaqSection';
import { SectionHeading } from '../components/common/SectionHeading';
import { ClientPhotoLightbox } from '../components/gallery/ClientPhotoLightbox';
import SocialCards, { CardItem } from '../components/ui/card-fan-carousel';
import { tourPackagesData } from '../data/packages';
import { clientPhotos, ClientPhotoCategory } from '../data/clientPhotos';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { WhyUsCard, WhyUsPillar } from '../components/home/WhyUsCard';

export const Home: React.FC = () => {
  const [clientLightboxIndex, setClientLightboxIndex] = useState<number | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<ClientPhotoCategory>('All');
  const [activeWhyUsHoverIndex, setActiveWhyUsHoverIndex] = useState<number | null>(null);

  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  // Trust Pillars for "4. Why Us" (Magnetic Spotlight + Progressive Reveal)
  const whyUsPillars: WhyUsPillar[] = [
    {
      id: 'planning',
      title: 'Personalized Travel Planning',
      desc: 'Trips planned around your interests, preferred pacing, and specific travel dates.',
      badge: 'Custom Itineraries',
      highlights: [
        'Customized itineraries',
        'Flexible travel plans',
        'Travel based on your preferences',
      ],
      iconType: 'planning',
    },
    {
      id: 'coordination',
      title: 'Complete Travel Coordination',
      desc: 'Support with organizing transportation, verified stays, and end-to-end travel logistics.',
      badge: 'Seamless Logistics',
      highlights: [
        'Transport coordination',
        'Stay and travel support',
        'End-to-end trip planning',
      ],
      iconType: 'coordination',
    },
    {
      id: 'knowledge',
      title: 'Local Travel Knowledge',
      desc: 'Helpful guidance for discovering destinations, darshan timings, and authentic experiences.',
      badge: 'Authentic Guidance',
      highlights: [
        'Authentic local experiences',
        'Helpful destination guidance',
        'Better travel recommendations',
      ],
      iconType: 'knowledge',
    },
    {
      id: 'service',
      title: 'Customer-Focused Service',
      desc: 'A travel experience designed around traveler comfort, safety, and dedicated on-trip assistance.',
      badge: 'Dedicated Care',
      highlights: [
        'Comfort-focused planning',
        'Dedicated trip assistance',
        'Support throughout your journey',
      ],
      iconType: 'service',
    },
  ];

  // Filtered Client Photos for "3. Gallery"
  const filteredClientPhotos = useMemo(() => {
    if (activeGalleryCategory === 'All') return clientPhotos;
    return clientPhotos.filter(
      (photo) => photo.categories && photo.categories.includes(activeGalleryCategory)
    );
  }, [activeGalleryCategory]);

  const galleryCategories: ClientPhotoCategory[] = [
    'All',
    'Group Tours',
    'Temple Visits',
    'South India',
    'Cultural Experiences',
    'Rajasthan',
  ];

  // Transform authentic client photos into SocialCards items for the 3D Card Fan Carousel
  const fanCards: CardItem[] = useMemo(() => {
    return filteredClientPhotos.map((photo, index) => ({
      imgUrl: photo.image,
      alt: photo.destination ? `${photo.destination}` : photo.caption || 'Client Travel Memory',
      title: photo.destination,
      caption: photo.caption,
      onClick: () => setClientLightboxIndex(index),
    }));
  }, [filteredClientPhotos]);

  return (
    <PageContainer
      seo={{
        title: 'Jayashakthi Tours & Travels | India Tour Packages & Travel',
        description:
          'Discover India with Jayashakthi Tours & Travels. Customized tour packages, private chauffeur-driven vehicles, verified stays, and complete travel coordination based in Chennai, India. Call 9444796073.',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. HOME (Main Landing / Hero Section)                                    */}
      {/* ========================================================================= */}
      <HeroSection />

      {/* ========================================================================= */}
      {/* 2. TOURS (All Tour Packages & Tour-Related Content)                       */}
      {/* ========================================================================= */}
      <section id="tours" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          eyebrow="Signature Routes"
          title="India Tour Packages"
          description="Proven travel routes designed for couples, families, and groups. Every itinerary can be tailored to match your schedule."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {tourPackagesData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GALLERY (3D Card Fan Carousel with Authentic Client Memories)           */}
      {/* ========================================================================= */}
      <section id="gallery" className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60 mb-3">
              <Camera className="w-3.5 h-3.5 text-brand-teal-600" />
              <span>Authentic Client Memories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy-950 tracking-tight">
              Travel Experiences &amp; Memories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Genuine photographs from travelers who explored Tamil Nadu temples, Rajasthan forts, the Taj Mahal, and backwaters with Jayashakthi Tours. Click any card to view full photo.
            </p>
          </div>

          {/* Gallery Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none px-2">
            {galleryCategories.map((cat) => {
              const isActive = activeGalleryCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveGalleryCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-brand-navy-950 text-white shadow-soft'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Interactive 3D Card Fan Carousel */}
          <div className="py-2">
            <SocialCards cards={fanCards} />
          </div>

          {/* Lightbox Modal for Full-Resolution Photo Viewing */}
          <ClientPhotoLightbox
            photo={clientLightboxIndex !== null ? filteredClientPhotos[clientLightboxIndex] : null}
            currentIndex={clientLightboxIndex ?? 0}
            totalPhotos={filteredClientPhotos.length}
            onClose={() => setClientLightboxIndex(null)}
            onPrev={() =>
              setClientLightboxIndex((prev) =>
                prev !== null
                  ? (prev - 1 + filteredClientPhotos.length) % filteredClientPhotos.length
                  : null
              )
            }
            onNext={() =>
              setClientLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % filteredClientPhotos.length : null
              )
            }
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY US (Why Choose Jayashakthi Tours — 4 Core Trust Pillars)            */}
      {/* ========================================================================= */}
      <section id="why-us" className="py-16 lg:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reliable Travel Coordination"
            title="Why Choose Jayashakthi Tours?"
            description="We simplify your travel across India by coordinating the details together into one smooth, memorable journey."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {whyUsPillars.map((pillar, idx) => (
              <WhyUsCard
                key={pillar.id}
                pillar={pillar}
                index={idx}
                activeHoveredIndex={activeWhyUsHoverIndex}
                setActiveHoveredIndex={setActiveWhyUsHoverIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. REVIEWS (Customer Reviews with Desktop Marquee & Mobile Slider)        */}
      {/* ========================================================================= */}
      <section id="reviews" className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Traveler Stories"
            title="Customer Reviews"
            description="Genuine feedback from Indian and international travelers who trusted us with their journeys across India."
          />

          <ReviewCarousel showActions={true} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ (Frequently Asked Questions with Accordion Behavior)               */}
      {/* ========================================================================= */}
      <FaqSection />

      {/* ========================================================================= */}
      {/* 7. CONTACT (Direct Telephone 9444796073, WhatsApp, Office Address)        */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 lg:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-soft flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-brand-sky-800 border border-brand-sky-200 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-brand-teal-600" />
                <span>Headquarters &amp; Direct Contact</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 tracking-tight">
                Jayashakthi Tours &amp; Travels
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Proprietor: <strong className="text-brand-navy-900">{business.proprietor}</strong><br />
                {business.address.formatted}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-sky-600" />
                  Direct Calling: <strong className="text-brand-navy-950 font-bold">{business.phone}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-teal-600" />
                  {business.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href={business.phoneCallUrl}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-soft transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-sky-400" />
                <span>Call {business.phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-soft transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={business.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-brand-navy-950 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <Navigation className="w-4 h-4 text-brand-sky-600" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
