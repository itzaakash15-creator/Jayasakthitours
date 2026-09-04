import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { BookingForm } from '../components/booking/BookingForm';
import {
  CalendarCheck,
  ShieldCheck,
  Compass,
  MessageCircle,
  Phone,
  Sparkles,
  Car,
} from 'lucide-react';
import { business } from '../config/business';

export const Booking: React.FC = () => {
  const trustHighlights = [
    {
      title: 'One Coordinated Team',
      desc: 'No juggling separate drivers, hotels, and permits.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-teal-600" />,
    },
    {
      title: 'Clear Day-by-Day Agenda',
      desc: 'Know your exact route, transit times, and rest hours.',
      icon: <Compass className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      title: 'Direct WhatsApp Chat',
      desc: 'Speak directly with our Chennai trip planners.',
      icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Comfortable Vehicles',
      desc: 'Private air-conditioned sedans, SUVs & Tempo Travellers.',
      icon: <Car className="w-5 h-5 text-brand-sky-700" />,
    },
  ];

  return (
    <PageContainer
      seo={{
        title: 'Plan Your India Journey | Custom Tour Enquiry',
        description:
          'Tell us about your India travel plans: travel dates, travelers, destination wishlist, and hotel preferences. We prepare a complete day-by-day itinerary and coordinate your entire journey.',
      }}
    >
      {/* Header Banner */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Direct WhatsApp Coordination</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Plan Your India Journey
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Tell us about your trip and we'll help you plan the journey around your dates, destinations and travel preferences.
          </p>

          {/* Micro trust pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              100% Customized
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-sky-500" />
              Day-by-Day Agenda
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-teal-500" />
              Direct WhatsApp Dispatch
            </span>
          </div>
        </div>
      </section>

      {/* Main Booking Wizard Form */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />

        {/* Supporting Trust Grid */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-brand-navy-950">
              {business.differentiator}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Why international travelers trust Jayashakthi Tours & Travels to coordinate their complete India experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustHighlights.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-brand-navy-950 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
