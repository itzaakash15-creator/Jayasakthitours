import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { BookingForm } from '../components/booking/BookingForm';
import {
  CalendarCheck,
  ShieldCheck,
  Compass,
  MessageCircle,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { business } from '../config/business';

export const Booking: React.FC = () => {
  const trustHighlights = [
    {
      title: 'Personalized Itineraries',
      desc: 'Trips planned around your preferred pace, dates and interests.',
      icon: <Compass className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      title: 'Trusted Travel Partner',
      desc: 'Safe, verified stays, experienced chauffeurs and reliable support.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-teal-600" />,
    },
    {
      title: 'Support at Every Step',
      desc: 'We’re here throughout your journey via direct WhatsApp and phone.',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Direct WhatsApp Dispatch',
      desc: 'Instant connection with our Chennai trip coordination team.',
      icon: <MessageCircle className="w-5 h-5 text-brand-sky-600" />,
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
      {/* ===================================================================== */}
      {/* 1. HERO — START OF A JOURNEY ATMOSPHERE                               */}
      {/* ===================================================================== */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-brand-sky-50/70 via-white to-slate-50/80 border-b border-slate-100 overflow-hidden select-none">
        {/* Subtle Indian Travel Scenic Atmosphere (Low contrast, 4% opacity) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-r from-brand-sky-100/30 via-brand-teal-50/20 to-transparent rounded-full blur-3xl opacity-60" />

          <svg
            className="absolute inset-0 w-full h-full text-brand-navy-950/[0.04]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 400"
          >
            {/* Rolling hills / tea plantations contour */}
            <path
              d="M0 360 Q 240 280, 520 330 T 1000 300 T 1440 340 L 1440 400 L 0 400 Z"
              fill="currentColor"
            />
            <path
              d="M0 380 Q 350 320, 750 360 T 1440 370 L 1440 400 L 0 400 Z"
              fill="currentColor"
              opacity="0.5"
            />

            {/* Coastal palm silhouettes at right edge */}
            <path
              d="M1360 160 Q 1340 210, 1330 260 M1360 160 Q 1320 180, 1300 220 M1360 160 Q 1380 200, 1400 235"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Heritage landmark outline at left edge */}
            <path
              d="M60 360 L60 310 L75 310 L75 285 L85 285 L85 260 L92 260 L92 245 L95 235 L98 245 L98 260 L105 260 L105 285 L115 285 L115 310 L130 310 L130 360 Z"
              fill="currentColor"
            />

            {/* Travel-route dashed line across hero */}
            <path
              d="M140 180 Q 420 120, 720 170 T 1300 130"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Small Premium Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-soft border border-brand-sky-200/80 text-xs font-bold tracking-wider uppercase text-brand-sky-800">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>✦ PLAN YOUR JOURNEY</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Plan Your <span className="text-gradient-brand">India Journey</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Tell us about your trip and we’ll help you plan the journey around your dates, destinations and travel preferences.
          </p>

          {/* Micro Trust Points */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Customized
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs">
              <CalendarCheck className="w-3.5 h-3.5 text-brand-sky-600" />
              Day-by-Day Agenda
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs">
              <MessageCircle className="w-3.5 h-3.5 text-brand-teal-600" />
              Direct WhatsApp Dispatch
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2 & 3. MAIN INTERACTIVE JOURNEY BUILDER (FORM + LIVE SUMMARY)        */}
      {/* ===================================================================== */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />

        {/* =================================================================== */}
        {/* 14. TRUST STRIP BELOW THE FORM                                      */}
        {/* =================================================================== */}
        <div className="mt-16 pt-12 border-t border-slate-200/90">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky-700 block mb-1">
              Peace of Mind Guaranteed
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-brand-navy-950">
              {business.differentiator}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Why domestic and international travelers trust Jayashakthi Tours &amp; Travels to coordinate their complete India experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustHighlights.map((item) => (
              <div
                key={item.title}
                className="group p-5 rounded-2xl bg-white border border-slate-200/85 hover:border-brand-sky-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-brand-sky-50 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-brand-navy-950 mb-1 group-hover:text-brand-sky-800 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
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

