import React from 'react';
import {
  Compass,
  CheckCircle2,
  CalendarCheck,
  Building2,
  Car,
  Flame,
  Globe2,
  HeartHandshake,
  MessageCircle,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { routesSeo, travelAgencyStructuredData } from '../config/seo';

export const About: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Jayashakthi Tours & Travels',
    description: routesSeo['/about'].description,
    url: 'https://www.jayashakthitoursandtravels.com/about',
    mainEntity: travelAgencyStructuredData,
  };

  const pillars = [
    {
      title: 'Personalized Planning',
      desc: 'We start with your interests, your family dynamics, and your preferred travel pace rather than pushing cookie-cutter departures.',
      icon: <CalendarCheck className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      title: 'Complete Coordination',
      desc: 'Instead of dealing with separate vendors for flights, hotels, drivers, and temple permits, our team coordinates every segment together.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-teal-600" />,
    },
    {
      title: 'Day-by-Day Itinerary Clarity',
      desc: 'You receive a transparent schedule detailing transit times, morning rituals, afternoon sightseeing, and evening rest before you leave home.',
      icon: <Compass className="w-5 h-5 text-brand-sky-700" />,
    },
    {
      title: 'Verified Transportation & Stays',
      desc: 'Private air-conditioned sedans, SUVs, and luxury Tempo Travellers driven by courteous chauffeurs, paired with vetted heritage & star hotels.',
      icon: <Car className="w-5 h-5 text-brand-teal-700" />,
    },
    {
      title: 'Spiritual & Temple Expertise',
      desc: 'Specialized arrangements for South India’s magnificent temple corridors, darshan timings, dress protocols, and family prayer requirements.',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'Support Throughout Your Journey',
      desc: 'From terminal meet-and-greet in Chennai or any Indian port of entry to departure day, our team remains on call to coordinate your experience.',
      icon: <HeartHandshake className="w-5 h-5 text-brand-sky-600" />,
    },
  ];

  return (
    <PageContainer
      seo={{
        title: routesSeo['/about'].title,
        description: routesSeo['/about'].description,
        canonical: 'https://www.jayashakthitoursandtravels.com/about',
        structuredData: aboutStructuredData,
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white border border-brand-sky-200 text-brand-sky-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-brand-teal-500" />
            <span>Chennai, India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Making India Easy to Explore.
          </h1>

          <p className="text-lg sm:text-xl font-medium text-brand-teal-800">
            More Than a Tour Package.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {business.supportingMessage}
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl font-bold text-brand-navy-950 font-display">
              Why We Coordinate the Complete Journey
            </h2>
            <p>
              India is one of the most culturally rich, visually captivating, and spiritually profound countries in the world. Yet for international travelers and visiting families, planning an India journey can feel complicated: navigating long highway routes, choosing trustworthy hotels, understanding temple protocols, and coordinating punctual local transport.
            </p>
            <p>
              At <strong className="text-brand-navy-900">{business.name}</strong>, we act as your complete India travel coordination partner. You bring your travel dream, destinations, and travel dates — and our team designs, organizes, and coordinates every milestone of your stay.
            </p>
            <p>
              Whether you are an international family visiting South India for the first time, a couple seeking a serene Kerala retreat, or travelers embarking on a deep temple and heritage pilgrimage, we ensure your trip is calm, safe, and deeply enriching.
            </p>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-brand-sky-50/70 border border-brand-sky-100 text-xs sm:text-sm text-brand-sky-900 font-medium">
                "One Trip. One Team. Everything Taken Care Of. You do not have to piece together fragmented services."
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80"
                alt="South Indian Temple corridor in Tamil Nadu"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-sky-300">
                  Headquartered in Chennai
                </span>
                <p className="font-bold text-sm sm:text-base mt-1">
                  Connecting travelers to Tamil Nadu, Kerala, Karnataka, and beyond
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Entity Clarity & Business Information Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200 mb-2">
              <Building2 className="w-3.5 h-3.5 text-brand-teal-600" />
              <span>Official Business Entity &amp; Search Identity</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950">
              Jayashakthi Tours &amp; Travels — Chennai, Tamil Nadu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Established canonical entity details for search engines, answer engines, and traveler inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="space-y-3">
              <div>
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-400">
                  Official Business Name
                </span>
                <span className="font-semibold text-brand-navy-950 text-base">
                  Jayashakthi Tours &amp; Travels
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-400">
                  Proprietorship &amp; Management
                </span>
                <span className="text-slate-800">{business.proprietor}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-400">
                  Registered Office Address
                </span>
                <address className="not-italic text-slate-700 leading-relaxed mt-0.5">
                  Plot No. 14, V.O.C. 2nd Street, Padmanabha Nagar, Choolaimedu, Chennai – 600094, Tamil Nadu, India
                </address>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-400">
                  Brand Search Variations
                </span>
                <p className="text-slate-600 text-xs leading-relaxed mt-0.5">
                  Travelers frequently search for our services as <strong>Jaya Shakthi Tours &amp; Travels</strong>, <strong>Jaya Shakti Tours</strong>, <strong>Jaya Sakthi Tours</strong>, or <strong>Jayashakthi Travels Chennai</strong>. All these variations designate our single official travel company based in Chennai.
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-400">
                  Destinations &amp; Service Regions
                </span>
                <p className="text-slate-600 text-xs leading-relaxed mt-0.5">
                  Tamil Nadu (Chennai, Mahabalipuram, Pondicherry, Thanjavur, Madurai, Rameswaram, Kanyakumari), Kerala (Kochi, Munnar, Alleppey), Karnataka, Golden Triangle (Delhi, Agra, Jaipur), Rajasthan, and Varanasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Pillars */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Commitment"
            title="How We Look After Your Journey"
            description="Our service covers every logistical and cultural detail so you can immerse yourself completely in India’s beauty."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-white shadow-2xs border border-slate-100 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-brand-navy-950 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy-950">
            Let Us Coordinate Your India Travel Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Reach out to our team in Chennai. We'll listen to your travel ideas and prepare a customized plan.
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
              WHATSAPP OUR TEAM
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
