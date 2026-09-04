import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ItineraryTimeline } from '../components/itinerary/ItineraryTimeline';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import {
  CalendarCheck,
  Compass,
  Clock,
  Car,
  Hotel,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const Itinerary: React.FC = () => {
  const itineraryBenefits = [
    {
      title: 'Realistic Driving Times',
      desc: 'We calculate realistic highway transit hours and recommend best departure times to avoid traffic bottlenecks.',
      icon: <Clock className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      title: 'Temple & Darshan Timing',
      desc: 'South Indian temples operate on specific morning and evening hours. Our schedules ensure you never arrive at closed doors.',
      icon: <Sparkles className="w-5 h-5 text-brand-teal-600" />,
    },
    {
      title: 'Balanced Leisure & Rest',
      desc: 'Travel shouldn’t feel like a marathon. We build in midday siestas, leisurely breakfast hours, and tea breaks.',
      icon: <Hotel className="w-5 h-5 text-brand-gold-600" />,
    },
    {
      title: 'Chauffeur Synchronization',
      desc: 'Your private air-conditioned vehicle is booked and coordinated for the exact daily schedule, airport pickup to drop.',
      icon: <Car className="w-5 h-5 text-brand-sky-700" />,
    },
  ];

  return (
    <PageContainer
      seo={{
        title: 'Know Your Journey Before You Begin | Day-by-Day Itineraries',
        description:
          'Discover how Jayashakthi Tours & Travels organizes clear, day-by-day India travel agendas with route timings, sightseeing schedules, and hotel stays.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Compass className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Core Differentiator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Know Your Journey Before You Begin.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We create a clear day-by-day travel plan so you know where you will go, what you will see, how you will travel and how your journey flows from one destination to the next.
          </p>
        </div>
      </section>

      {/* Why Day-by-Day Planning Matters */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {itineraryBenefits.map((b) => (
              <div
                key={b.title}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center mb-3">
                  {b.icon}
                </div>
                <h4 className="text-sm font-bold text-brand-navy-950 mb-1">
                  {b.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full 10-Day Interactive Timeline */}
      <ItineraryTimeline showIntroHeading={false} />
    </PageContainer>
  );
};
