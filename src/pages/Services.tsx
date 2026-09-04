import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { ServiceCard } from '../components/services/ServiceCard';
import { Button } from '../components/common/Button';
import { servicesData } from '../data/services';
import { CalendarCheck, MessageCircle, Sparkles } from 'lucide-react';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const categories = [
    { id: 'all', label: 'All 16 Services' },
    { id: 'core', label: 'Trip Planning & Flights' },
    { id: 'transport', label: 'Cars & Tempo Travellers' },
    { id: 'hospitality', label: 'Hotels & Food' },
    { id: 'specialized', label: 'Temples & Cultural Guides' },
  ];

  const filteredServices = servicesData.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  return (
    <PageContainer
      seo={{
        title: 'Complete India Travel Services',
        description:
          'Explore our full suite of 16 travel coordination services: day-by-day itineraries, flight & hotel bookings, car & Tempo Traveller rentals, visa help, and temple arrangements.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>End-to-End India Travel Logistics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Our Travel Coordination Services
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From your airport arrival to your return flight home, explore the 16 specialized travel coordination services managed by our Chennai team.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pill Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-soft'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} showFullDetails={true} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-200 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-950">
            Need Multiple Services Coordinated Together?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            You don't need to book each service independently. Tell us your full itinerary idea and we'll bundle everything into one seamless journey.
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
              WHATSAPP ENQUIRY
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
