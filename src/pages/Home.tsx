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
  CheckCircle2,
  CalendarDays,
  FileCheck,
  Smile,
  Car,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { HeroSection } from '../components/hero/HeroSection';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { PackageCard } from '../components/packages/PackageCard';
import { ReviewCarousel } from '../components/reviews/ReviewCarousel';
import { FaqSection } from '../components/home/FaqSection';
import { QuickEnquirySection } from '../components/home/QuickEnquirySection';
import { SectionHeading } from '../components/common/SectionHeading';
import { ClientPhotoCard } from '../components/gallery/ClientPhotoCard';
import { ClientPhotoLightbox } from '../components/gallery/ClientPhotoLightbox';
import { destinationsData } from '../data/destinations';
import { tourPackagesData } from '../data/packages';
import { clientPhotos, ClientPhotoCategory } from '../data/clientPhotos';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Home: React.FC = () => {
  const [clientLightboxIndex, setClientLightboxIndex] = useState<number | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<ClientPhotoCategory>('All');
  const [showAllGalleryPhotos, setShowAllGalleryPhotos] = useState(false);

  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  // Trust Pillars for "Why Choose Jayashakthi Tours?"
  const whyChooseUsPoints = [
    {
      title: 'Personalized Travel Planning',
      desc: 'Trips planned around your interests, preferred pacing, and specific travel dates.',
      icon: <CalendarCheck className="w-6 h-6 text-brand-sky-600" />,
    },
    {
      title: 'Complete Travel Coordination',
      desc: 'Support with organizing transportation, verified stays, and end-to-end travel logistics.',
      icon: <Layers className="w-6 h-6 text-brand-teal-600" />,
    },
    {
      title: 'Local Travel Knowledge',
      desc: 'Helpful guidance for discovering destinations, darshan timings, and authentic experiences.',
      icon: <Compass className="w-6 h-6 text-brand-gold-600" />,
    },
    {
      title: 'Customer-Focused Service',
      desc: 'A travel experience designed around traveler comfort, safety, and dedicated on-trip assistance.',
      icon: <HeartHandshake className="w-6 h-6 text-brand-sky-600" />,
    },
  ];

  // 4-Step Process for "How It Works"
  const processSteps = [
    {
      number: '01',
      title: 'Tell Us Your Plan',
      desc: 'Share your desired destinations, travel dates, group size, and any special preferences.',
      icon: <CalendarDays className="w-6 h-6 text-brand-sky-600" />,
    },
    {
      number: '02',
      title: 'We Plan Your Trip',
      desc: 'We create a suitable day-by-day travel plan based on your exact requirements.',
      icon: <FileCheck className="w-6 h-6 text-brand-teal-600" />,
    },
    {
      number: '03',
      title: 'Confirm Your Journey',
      desc: 'Finalize the itinerary details, vehicle selection, and stay arrangements with our team.',
      icon: <CheckCircle2 className="w-6 h-6 text-brand-sky-700" />,
    },
    {
      number: '04',
      title: 'Enjoy Your Trip',
      desc: 'Travel comfortably with coordinated private transport, planned sightseeing, and on-trip assistance.',
      icon: <Smile className="w-6 h-6 text-brand-teal-700" />,
    },
  ];

  // Filtered Client Photos for Gallery
  const filteredClientPhotos = useMemo(() => {
    if (activeGalleryCategory === 'All') return clientPhotos;
    return clientPhotos.filter(
      (photo) => photo.categories && photo.categories.includes(activeGalleryCategory)
    );
  }, [activeGalleryCategory]);

  const displayedClientPhotos = showAllGalleryPhotos
    ? filteredClientPhotos
    : filteredClientPhotos.slice(0, 8);

  const galleryCategories: ClientPhotoCategory[] = [
    'All',
    'Group Tours',
    'Temple Visits',
    'South India',
    'Cultural Experiences',
    'Rajasthan',
  ];

  return (
    <PageContainer
      seo={{
        title: 'Jayashakthi Tours & Travels | India Tour Packages & Travel',
        description:
          'Discover India with Jayashakthi Tours & Travels. Customized tour packages, private chauffeur-driven vehicles, verified stays, and complete travel coordination based in Chennai, India. Call 9444796073.',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. HERO / OFFICIAL POSTER                                                */}
      {/* ========================================================================= */}
      <HeroSection />

      {/* ========================================================================= */}
      {/* 2. POPULAR DESTINATIONS (6 Unique Regions)                                */}
      {/* ========================================================================= */}
      <section id="destinations" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          eyebrow="Iconic Regions"
          title="Popular India Destinations"
          description="Explore our most sought-after destinations across South and North India, each offering distinct cultural, spiritual, and natural wonders."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {destinationsData.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TOUR PACKAGES (6 Curated Itineraries with Dual CTAs)                   */}
      {/* ========================================================================= */}
      <section id="tours" className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Cabs & Site Guide Quick Highlights Strip (Anchors for #cabs and #site-guide) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cabs Feature Box */}
            <div id="cabs" className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft flex flex-col justify-between scroll-mt-24">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-700">Dedicated Fleet</span>
                    <h3 className="text-lg font-bold text-brand-navy-950">Chauffeured Cabs &amp; Tempo Travellers</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clean, air-conditioned sedans (Etios / Dzire), premium Innova Crystas, and 12–17 seater luxury pushback Tempo Travellers driven by courteous, verified chauffeurs.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Local &amp; Outstation Hire</span>
                <a
                  href="/booking?service=Cab%20/%20Taxi"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-teal-700 hover:text-brand-teal-800"
                >
                  <span>Book A Cab</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Site Guide Feature Box */}
            <div id="site-guide" className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft flex flex-col justify-between scroll-mt-24">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-sky-700">Local Experts</span>
                    <h3 className="text-lg font-bold text-brand-navy-950">Certified Site Guides &amp; Storytellers</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Knowledgeable English and multilingual local guides for South India temples, UNESCO World Heritage monuments, royal forts, and cultural landmarks.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">English, Regional &amp; Foreign Languages</span>
                <a
                  href="/booking?service=Site%20Guide"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-sky-700 hover:text-brand-sky-800"
                >
                  <span>Book A Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY JAYASHAKTHI TOURS (4 Core Trust Pillars)                           */}
      {/* ========================================================================= */}
      <section id="why-us" className="py-16 lg:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reliable Travel Coordination"
            title="Why Choose Jayashakthi Tours?"
            description="We simplify your travel across India by coordinating the details together into one smooth, memorable journey."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {whyChooseUsPoints.map((point) => (
              <div
                key={point.title}
                className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:border-brand-sky-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-slate-100 flex items-center justify-center mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-2">
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

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS (Simple 4-Step Process)                                   */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Streamlined Journey"
            title="How It Works"
            description="Planning your India trip with our team is simple, transparent, and hassle-free."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-brand-sky-600 tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-sky-50 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRAVEL EXPERIENCE / GALLERY (Authentic Client Memories)                */}
      {/* ========================================================================= */}
      <section id="gallery" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60 mb-3">
              <Camera className="w-3.5 h-3.5 text-brand-teal-600" />
              <span>Authentic Client Photos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy-950 tracking-tight">
              Travel Experiences &amp; Memories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Genuine photographs from past travelers who explored Tamil Nadu temples, Rajasthan forts, the Taj Mahal, and backwaters with Jayashakthi Tours.
            </p>
          </div>
        </div>

        {/* Gallery Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {galleryCategories.map((cat) => {
            const isActive = activeGalleryCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveGalleryCategory(cat);
                  setShowAllGalleryPhotos(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-brand-navy-950 text-white shadow-soft'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Client Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {displayedClientPhotos.map((photo, index) => (
            <ClientPhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => setClientLightboxIndex(index)}
            />
          ))}
        </div>

        {/* Expand / View All Photos Button */}
        {filteredClientPhotos.length > 8 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAllGalleryPhotos(!showAllGalleryPhotos)}
              className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-brand-navy-950 text-xs font-bold uppercase tracking-wider shadow-2xs transition-colors cursor-pointer"
            >
              {showAllGalleryPhotos
                ? 'Show Less Memories'
                : `View All ${filteredClientPhotos.length} Client Memories`}
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        <ClientPhotoLightbox
          photo={clientLightboxIndex !== null ? displayedClientPhotos[clientLightboxIndex] : null}
          currentIndex={clientLightboxIndex ?? 0}
          totalPhotos={displayedClientPhotos.length}
          onClose={() => setClientLightboxIndex(null)}
          onPrev={() =>
            setClientLightboxIndex((prev) =>
              prev !== null
                ? (prev - 1 + displayedClientPhotos.length) % displayedClientPhotos.length
                : null
            )
          }
          onNext={() =>
            setClientLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % displayedClientPhotos.length : null
            )
          }
        />
      </section>

      {/* ========================================================================= */}
      {/* 7. CUSTOMER REVIEWS (Smooth Marquee on Desktop, Single-Card on Mobile)    */}
      {/* ========================================================================= */}
      <section id="reviews" className="py-16 lg:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
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
      {/* 8. PLAN YOUR TRIP / ENQUIRY (Validated WhatsApp Conversion Flow)          */}
      {/* ========================================================================= */}
      <QuickEnquirySection />

      {/* ========================================================================= */}
      {/* 9. FAQ (6 Practical Accordion Items)                                      */}
      {/* ========================================================================= */}
      <FaqSection />

      {/* ========================================================================= */}
      {/* 10. CONTACT (Verified Phone 9444796073, WhatsApp, and Address)            */}
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
