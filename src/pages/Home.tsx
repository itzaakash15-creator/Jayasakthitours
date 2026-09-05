import React, { useState, useMemo } from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import { business } from '../config/business';
import { InstagramIcon } from '../components/common/InstagramIcon';
import { PageContainer } from '../components/layout/PageContainer';
import { HeroSection } from '../components/hero/HeroSection';
import { PackageCard } from '../components/packages/PackageCard';
import { ReviewCarousel } from '../components/reviews/ReviewCarousel';
import { FaqSection } from '../components/home/FaqSection';
import { ContactSection } from '../components/home/ContactSection';
import { SectionHeading } from '../components/common/SectionHeading';
import { ClientPhotoLightbox } from '../components/gallery/ClientPhotoLightbox';
import SocialCards, { CardItem } from '../components/ui/card-fan-carousel';
import { tourPackagesData } from '../data/packages';
import { clientPhotos, ClientPhotoCategory } from '../data/clientPhotos';
import { WhyUsCard, WhyUsPillar } from '../components/home/WhyUsCard';
import { WebsiteIntro } from '../components/intro/WebsiteIntro';
import {
  MountainContourSketch,
  CompassRoseSketch,
  WindingRouteSketch,
  PalmClusterSketch,
  CameraPostcardSketch,
  GlobeWireframeSketch,
  TrustShieldSketch,
} from '../components/common/TravelDecorations';

export const Home: React.FC = () => {
  const [clientLightboxIndex, setClientLightboxIndex] = useState<number | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<ClientPhotoCategory>('All');
  const [activeWhyUsHoverIndex, setActiveWhyUsHoverIndex] = useState<number | null>(null);

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
      {/* Premium Cinematic Intro Animation (Plays once on first visit per session) */}
      <WebsiteIntro />

      {/* ========================================================================= */}
      {/* 1. HOME (Main Landing / Hero Section)                                    */}
      {/* ========================================================================= */}
      <HeroSection />

      {/* ========================================================================= */}
      {/* 2. TOURS (All Tour Packages & Tour-Related Content)                       */}
      {/* ========================================================================= */}
      <section id="tours" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#F3F7FA] via-[#F6F9FB] to-[#F1F5F8] border-t border-slate-200/60 scroll-mt-20 overflow-hidden">
        {/* Subtle pale misty blue-white atmosphere with soft cool lighting */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[500px] bg-brand-sky-100/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 -right-24 w-[600px] h-[450px] bg-slate-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Minimal Scenic Line Art: Mountain contour, travel compass & winding road */}
        <MountainContourSketch className="absolute -bottom-8 -left-10 w-64 sm:w-80 md:w-96 text-slate-700" opacity="opacity-[0.05]" />
        <CompassRoseSketch className="absolute top-8 right-6 sm:right-12 w-28 sm:w-36 text-brand-sky-800" opacity="opacity-[0.06]" />
        <WindingRouteSketch className="absolute top-1/4 left-10 sm:left-20 w-72 sm:w-[28rem] text-brand-teal-800" opacity="opacity-[0.04]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GALLERY (3D Card Fan Carousel with Authentic Client Memories)           */}
      {/* ========================================================================= */}
      <section id="gallery" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#F9F8F3] via-[#FAF9F5] to-[#F7F6F0] border-t border-slate-200/60 scroll-mt-20 overflow-hidden">
        {/* Calm warm ivory atmosphere with pearl-white center so colorful photos remain the hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-white/70 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-24 -left-20 w-[500px] h-[400px] bg-brand-gold-100/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -right-20 w-[500px] h-[400px] bg-amber-100/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Minimal Travel Line-Art: Camera Postcard Stamp, Palm Fronds & Route Line */}
        <CameraPostcardSketch className="absolute top-10 left-6 sm:left-12 w-32 sm:w-44 text-brand-gold-800" opacity="opacity-[0.06]" />
        <PalmClusterSketch className="absolute -bottom-8 -right-6 w-36 sm:w-56 text-brand-teal-800" opacity="opacity-[0.05]" />
        <WindingRouteSketch className="absolute bottom-4 left-1/4 w-64 sm:w-96 text-slate-700" opacity="opacity-[0.04]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

          {/* Subtle Instagram Link Near Gallery */}
          <div className="mt-8 text-center">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-brand-navy-950 text-xs sm:text-sm font-medium border border-slate-200/90 hover:border-brand-sky-300 shadow-2xs hover:shadow-soft transition-all duration-300 cursor-pointer select-none"
            >
              <InstagramIcon className="w-4 h-4 text-brand-teal-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              <span>Follow our journeys on Instagram</span>
              <span className="text-slate-400 font-mono text-xs hidden sm:inline">{business.instagramHandle}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-sky-600 group-hover:translate-x-0.5 transition-transform" />
            </a>
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
      <section id="why-us" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#F2FAF7] via-[#F7FCFA] to-[#EFF8F5] border-t border-slate-200/60 scroll-mt-20 overflow-hidden">
        {/* Extremely pale teal-white atmosphere with subtle cool edge mist */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-white/80 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-0 -left-24 w-[600px] h-[450px] bg-brand-teal-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 -right-24 w-[600px] h-[450px] bg-brand-sky-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Minimal Line Art: Trust Shield, Compass & Continuous Route */}
        <TrustShieldSketch className="absolute top-10 right-6 sm:right-16 w-28 sm:w-36 text-brand-teal-800" opacity="opacity-[0.06]" />
        <CompassRoseSketch className="absolute bottom-6 left-6 sm:left-12 w-28 sm:w-36 text-brand-sky-800" opacity="opacity-[0.05]" />
        <WindingRouteSketch className="absolute bottom-4 left-1/3 w-72 sm:w-[28rem] text-slate-600" opacity="opacity-[0.04]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
      <section id="reviews" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF8F3] via-[#FAF7F0] to-[#F7F5EC] border-t border-slate-200/60 scroll-mt-20 overflow-hidden">
        {/* Warm pearl white with soft neutral cream undertones & subtle warm glow */}
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[450px] bg-brand-gold-100/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 right-1/4 w-[600px] h-[400px] bg-amber-100/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Minimal Travel Line-Art: Globe Wireframe, Mountain Outline & Waypoint Path */}
        <GlobeWireframeSketch className="absolute top-8 right-6 sm:right-16 w-32 sm:w-40 text-brand-gold-800" opacity="opacity-[0.06]" />
        <MountainContourSketch className="absolute -bottom-6 -left-10 w-64 sm:w-80 text-slate-700" opacity="opacity-[0.05]" />
        <WindingRouteSketch className="absolute top-1/4 left-8 sm:left-20 w-72 sm:w-96 text-brand-sky-800" opacity="opacity-[0.04]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
      {/* 7. CONTACT (Contact Hero, Main Contact Hub, Final Journey CTA)             */}
      {/* ========================================================================= */}
      <ContactSection />
    </PageContainer>
  );
};
