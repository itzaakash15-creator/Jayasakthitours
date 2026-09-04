import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CalendarCheck, MessageCircle, Info, Sparkles } from 'lucide-react';
import { clientPhotos, clientPhotoCategories, ClientPhotoCategory, ClientPhoto } from '../../data/clientPhotos';
import { ClientPhotoCard } from './ClientPhotoCard';
import { ClientPhotoLightbox } from './ClientPhotoLightbox';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const ClientMemoriesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ClientPhotoCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return clientPhotos;
    return clientPhotos.filter(
      (photo) => photo.categories && photo.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const activePhoto: ClientPhoto | null =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] || null : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === 0 ? filteredPhotos.length - 1 : prev! - 1
      );
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === filteredPhotos.length - 1 ? 0 : prev! + 1
      );
    }
  };

  const ctaWhatsAppMessage = `Hello Jayasakthi Tours & Travels, I would like to plan a journey across India and create memorable travel experiences. Could you please share how you can assist with our itinerary?`;
  const whatsappUrl = createWhatsAppUrl(ctaWhatsAppMessage);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/70 to-brand-sky-50/40 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="FROM OUR TRAVELERS"
          title="Memories From Our Journeys"
          description="A glimpse into the journeys we've helped organize across India — from family holidays and group tours to temple visits, cultural experiences and unforgettable destinations."
          align="center"
        />

        {/* Informative Authenticity Disclaimer / Owner Guide */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-brand-sky-50/70 border border-brand-sky-200/70 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
          <Info className="w-4 h-4 text-brand-sky-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-brand-navy-950">Curated Journey Showcase: </span>
            Sample travel memories illustrating itineraries, temple trails, and heritage routes organized by Jayasakthi Tours &amp; Travels.
            <span className="hidden sm:inline text-slate-500 ml-1">
              (Website administrators can drop authentic client photos into <code className="bg-white/80 px-1.5 py-0.5 rounded text-brand-sky-800 font-mono text-[11px] border border-brand-sky-200">/public/images/client-travel/</code> to update anytime).
            </span>
          </div>
        </div>

        {/* Elegant Category Filters */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none px-1">
          {clientPhotoCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sky-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-soft shadow-brand-sky-500/20'
                    : 'bg-white text-slate-600 hover:text-brand-navy-900 hover:bg-slate-100/80 border border-slate-200/80'
                }`}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Editorial / Masonry-Style Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <ClientPhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Camera className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-700">No photos in this category yet.</p>
            <p className="text-xs text-slate-500 mt-1">Select another filter or switch to "All" to view all journey memories.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        <ClientPhotoLightbox
          photo={activePhoto}
          currentIndex={lightboxIndex ?? 0}
          totalPhotos={filteredPhotos.length}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Section CTA */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-200/90 shadow-soft text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-gold-50 text-brand-gold-700 border border-brand-gold-200/80 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
            <span>Personalized Travel Experience</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 tracking-tight">
            Ready to Create Your Own India Memories?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us where you'd like to go, how many days you have and how you'd like to travel. We'll help you plan the journey.
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
      </div>
    </section>
  );
};
