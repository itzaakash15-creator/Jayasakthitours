import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { PackageCard } from '../components/packages/PackageCard';
import { Button } from '../components/common/Button';
import { tourPackagesData } from '../data/packages';
import { CalendarCheck, MessageCircle, Sparkles, SlidersHorizontal } from 'lucide-react';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Packages: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const filterTabs = ['All', 'South India', 'Kerala', 'Heritage', 'Spiritual'];

  const filteredPackages = tourPackagesData.filter(
    (pkg) => selectedFilter === 'All' || pkg.category === selectedFilter
  );

  return (
    <PageContainer
      seo={{
        title: 'Customizable India Tour Packages',
        description:
          'Explore our signature sample India tour packages: South India Explorer, Kerala Backwaters, Golden Triangle, Royal Rajasthan, and Temple Trails. Every package is 100% customizable.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Sample Tour Arcs • Fully Customizable</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Curated India Tour Packages
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            These sample itineraries showcase how classic routes flow across India. Adjust any destination, duration, hotel tier, or vehicle type to match your schedule.
          </p>

          <div className="pt-1">
            <span className="inline-block text-xs font-medium text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/80">
              Notice: All packages are tailored on request. Transparent custom pricing is provided based on your exact travel dates and preferences.
            </span>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Region Filter Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-soft'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Custom Itinerary Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-950">
            Looking for a Completely Bespoke Journey?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            If your desired combination of cities isn't listed above, our travel planners can design a personalized route from scratch around your dates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              to="/booking"
              variant="primary"
              size="md"
              icon={<CalendarCheck className="w-4 h-4" />}
              className="uppercase tracking-wider font-bold"
            >
              CREATE CUSTOM ITINERARY
            </Button>
            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="md"
              icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
            >
              CHAT WITH OUR PLANNER
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
