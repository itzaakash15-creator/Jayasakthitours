import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Navigation,
  MapPin,
  Mail,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import {
  HeritageArchitectureSketch,
  PalmClusterSketch,
  MountainContourSketch,
  WindingRouteSketch,
} from '../common/TravelDecorations';

export const ContactSection: React.FC = () => {
  const [activeActionCard, setActiveActionCard] = useState<string | null>(null);
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F8F6F0] via-[#FAF8F3] to-[#F1EFE8] border-t border-slate-200/60 scroll-mt-20 overflow-hidden"
    >
      {/* ===================================================================== */}
      {/* SUBTLE BACKGROUND DETAILS: Soft Warm Ivory & Muted Gold Atmosphere    */}
      {/* ===================================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Soft warm ivory & muted gold atmospheric gradient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-brand-gold-100/25 via-amber-50/20 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-10 right-10 w-[600px] h-[400px] bg-amber-100/15 rounded-full blur-3xl pointer-events-none" />

        {/* Outer Edge Silhouette & Route Vector Art (Ultra-subtle 4% opacity) */}
        <svg
          className="absolute inset-0 w-full h-full text-brand-navy-950/[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          {/* Faint South Indian rolling hill contours (left bottom) */}
          <path
            d="M-50 820 Q 180 760, 380 810 T 780 790 T 1150 820 T 1500 780 L 1500 920 L -50 920 Z"
            fill="currentColor"
          />

          {/* Gentle secondary hill tier */}
          <path
            d="M-50 850 Q 240 800, 520 840 T 960 830 T 1500 850 L 1500 920 L -50 920 Z"
            fill="currentColor"
            opacity="0.6"
          />

          {/* Faint temple gopuram pinnacle profile (left edge) */}
          <path
            d="M40 760 L40 700 L55 700 L55 670 L65 670 L65 645 L72 645 L72 630 L75 620 L78 630 L78 645 L85 645 L85 670 L95 670 L95 700 L110 700 L110 760 Z"
            fill="currentColor"
          />

          {/* Coastal palm fronds outline (right upper edge) */}
          <path
            d="M1380 140 Q 1330 180, 1310 230 M1380 140 Q 1340 150, 1315 185 M1380 140 Q 1360 200, 1350 250 M1380 140 Q 1395 190, 1420 220"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Subtle curved travel route line across background */}
          <path
            d="M120 260 Q 320 210, 560 280 T 1000 240 T 1360 310"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            fill="none"
          />

          {/* Mini route waypoint dots */}
          <circle cx="120" cy="260" r="3" fill="currentColor" />
          <circle cx="560" cy="280" r="3" fill="currentColor" />
          <circle cx="1000" cy="240" r="3" fill="currentColor" />
          <circle cx="1360" cy="310" r="3" fill="currentColor" />
        </svg>

        {/* Subtle Indian Travel Elements: Heritage Gopuram Outline, Coastal Palms & Mountains */}
        <HeritageArchitectureSketch className="absolute top-12 right-6 sm:right-16 w-32 sm:w-44 text-brand-navy-900" opacity="opacity-[0.05]" />
        <PalmClusterSketch className="absolute bottom-16 left-4 sm:left-10 w-32 sm:w-48 text-brand-teal-800" opacity="opacity-[0.05]" />
        <MountainContourSketch className="absolute -bottom-6 right-1/4 w-64 sm:w-96 text-slate-700" opacity="opacity-[0.04]" />

        {/* Minimal handwritten-style travel annotations along outer edges */}
        <div className="hidden lg:block absolute left-8 top-36 rotate-[-6deg] text-slate-400/40 text-xs font-mono tracking-wider">
          ✦ Your Journey Starts Here
        </div>
        <div className="hidden lg:block absolute right-10 top-44 rotate-[4deg] text-slate-400/40 text-xs font-mono tracking-wider">
          From Chennai to Everywhere in India ➔
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* =================================================================== */}
        {/* SECTION 1 — CONTACT HERO                                            */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Small Premium Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-soft border border-brand-sky-200/80 text-xs font-bold tracking-wider uppercase text-brand-sky-800">
            <MapPin className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>LET&apos;S STAY CONNECTED</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-brand-navy-950 leading-tight">
            We&apos;re Here for Your{' '}
            <span className="text-gradient-brand">Next Journey</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Have a question, need a custom plan, or ready to travel? Reach out to us — we’d love to help you.
          </p>
        </div>

        {/* =================================================================== */}
        {/* SECTION 2 — MAIN CONTACT HUB                                        */}
        {/* =================================================================== */}
        <div className="rounded-3xl bg-white/95 border border-slate-200/90 shadow-soft-lg backdrop-blur-sm p-6 sm:p-8 lg:p-12 transition-all hover:shadow-soft-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ------------------------------------------------------------- */}
            {/* Left Side: Headquarters Information                            */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6 lg:border-r lg:border-slate-200/80 lg:pr-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-sky-50 text-brand-sky-800 border border-brand-sky-200/70 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-brand-teal-600" />
                <span>HEADQUARTERS &amp; DIRECT CONTACT</span>
              </div>

              {/* Title & Proprietor */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy-950 tracking-tight">
                  Jayashakthi Tours &amp; Travels
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-brand-sky-700">
                  Proprietor:{' '}
                  <span className="text-brand-navy-900 font-bold">{business.proprietor}</span>
                </p>
              </div>

              {/* Physical Address */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70">
                <p className="font-semibold text-brand-navy-900">{business.address.street},</p>
                <p>{business.address.area},</p>
                <p>
                  {business.address.city} – {business.address.pincode}, {business.address.state}, {business.address.country}
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-3 pt-1">
                <a
                  href={business.phoneCallUrl}
                  className="group flex items-center gap-3 text-xs sm:text-sm text-slate-700 hover:text-brand-sky-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-sky-50 text-brand-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-sky-100 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Direct Calling Line</span>
                    <strong className="font-bold text-brand-navy-950 group-hover:text-brand-sky-700">
                      {business.phone}
                    </strong>
                  </div>
                </a>

                <a
                  href={business.emailMailto}
                  className="group flex items-center gap-3 text-xs sm:text-sm text-slate-700 hover:text-brand-teal-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-teal-50 text-brand-teal-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-teal-100 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Official Email</span>
                    <span className="font-medium text-slate-800 break-all group-hover:text-brand-teal-700">
                      {business.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Right Side: Three Interactive Contact Action Cards             */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-4">
              {/* Action Card 1: CALL US (Signal Ripple Interaction) */}
              <a
                href={business.phoneCallUrl}
                onMouseEnter={() => setActiveActionCard('call')}
                onMouseLeave={() => setActiveActionCard(null)}
                className="group relative block p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/85 hover:border-brand-sky-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle soft gradient background on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-sky-50/0 via-brand-sky-50/30 to-brand-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Phone Icon with single ripple wave animation on hover */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 border border-brand-sky-200/70 text-brand-sky-600 flex items-center justify-center group-hover:bg-brand-sky-500 group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Phone className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-105" />
                      </div>
                      {/* Ripple wave ring */}
                      <span className="absolute -inset-1 rounded-2xl border-2 border-brand-sky-400 opacity-0 group-hover:opacity-75 group-hover:scale-115 transition-all duration-500 pointer-events-none" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-brand-navy-950 group-hover:text-brand-sky-800 transition-colors">
                          Call Us
                        </h4>
                        <span className="text-[11px] font-semibold text-brand-sky-600 bg-brand-sky-50 px-2 py-0.5 rounded-md border border-brand-sky-100">
                          {business.phone}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        Speak directly with our team for quick assistance.
                      </p>
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="w-9 h-9 rounded-xl bg-slate-100/80 group-hover:bg-brand-sky-50 text-slate-400 group-hover:text-brand-sky-600 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </a>

              {/* Action Card 2: WHATSAPP US (Message Pop Micro-Interaction) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveActionCard('whatsapp')}
                onMouseLeave={() => setActiveActionCard(null)}
                className="group relative block p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/85 hover:border-emerald-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Soft Emerald Gradient on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/40 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* WhatsApp Icon with pop / bounce response */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                        <MessageCircle className="w-5 h-5 fill-emerald-600/20 group-hover:fill-white/30 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-brand-navy-950 group-hover:text-emerald-800 transition-colors">
                          WhatsApp Us
                        </h4>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          {business.whatsappFormatted}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        Message us anytime for itineraries, quotes and travel support.
                      </p>
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="w-9 h-9 rounded-xl bg-slate-100/80 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </a>

              {/* Action Card 3: GET DIRECTIONS (Route Draw & Pin Highlight) */}
              <a
                href={business.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveActionCard('directions')}
                onMouseLeave={() => setActiveActionCard(null)}
                className="group relative block p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/85 hover:border-brand-sky-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Soft Sky Gradient on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-sky-50/0 via-brand-sky-50/30 to-brand-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Subtle Route Dotted Decoration inside the card */}
                <div
                  className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 w-28 h-8 hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <svg className="w-full h-full text-brand-sky-500" viewBox="0 0 120 30" fill="none">
                    <path
                      d="M10 20 C 35 5, 60 25, 95 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className="transition-all duration-500 group-hover:stroke-brand-teal-500"
                    />
                    <circle cx="10" cy="20" r="2.5" fill="currentColor" />
                    <circle
                      cx="95"
                      cy="12"
                      r="3.5"
                      className="fill-brand-sky-600 group-hover:fill-brand-teal-600 transition-colors"
                    />
                  </svg>
                </div>

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Navigation Icon */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 border border-brand-sky-200/70 text-brand-sky-600 flex items-center justify-center group-hover:bg-brand-sky-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Navigation className="w-5 h-5 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-12" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-brand-navy-950 group-hover:text-brand-sky-800 transition-colors">
                          Get Directions
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          Chennai Office
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        Visit our office in Chennai. Choolaimedu.
                      </p>
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="w-9 h-9 rounded-xl bg-slate-100/80 group-hover:bg-brand-sky-50 text-slate-400 group-hover:text-brand-sky-600 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION 3 — FINAL JOURNEY CTA                                       */}
        {/* =================================================================== */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft bg-gradient-to-r from-slate-900 via-brand-navy-950 to-slate-900 text-white p-8 sm:p-10 lg:p-12">
          {/* Subtle Indian Travel Landscape Background Silhouette (3-5% opacity) */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.07]"
            aria-hidden="true"
          >
            <svg
              className="w-full h-full text-white"
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft Hills */}
              <path
                d="M0 250 Q 200 180, 400 230 T 800 210 T 1200 240 L 1200 300 L 0 300 Z"
                fill="currentColor"
              />
              {/* Distant mountains */}
              <path
                d="M150 220 L 250 160 L 350 220 L 450 170 L 550 230"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              {/* Palm trees outline on the right */}
              <path
                d="M1050 240 Q 1060 190, 1070 150 M1070 150 Q 1030 140, 1010 160 M1070 150 Q 1040 125, 1025 145 M1070 150 Q 1085 120, 1110 135 M1070 150 Q 1100 145, 1120 170"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              {/* Decorative note */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-sky-300/80 tracking-wider">
                <Compass className="w-3.5 h-3.5 text-brand-teal-400" />
                <span>Let&apos;s create memories together</span>
                <span className="text-brand-teal-400">➔</span>
              </div>

              {/* Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
                Ready for Your{' '}
                <span className="bg-gradient-to-r from-brand-sky-400 via-brand-teal-300 to-brand-sky-400 bg-clip-text text-transparent">
                  Next Journey?
                </span>
              </h3>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Tell us where you want to go. We’ll take care of how you get there.
              </p>
            </div>

            {/* Liquid Gradient Button CTA */}
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                to="/booking"
                className="group relative overflow-hidden inline-flex w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 rounded-xl bg-gradient-to-r from-brand-sky-500 via-brand-teal-500 to-brand-sky-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-sm sm:text-base tracking-wider font-bold uppercase shadow-soft hover:shadow-soft-lg transition-all duration-500 items-center justify-center cursor-pointer"
              >
                {/* Left Arrow entering from left on hover */}
                <span className="inline-flex items-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out mr-0 group-hover:mr-2">
                  <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                </span>

                <span className="relative z-10 transition-transform duration-300">
                  PLAN MY JOURNEY
                </span>

                {/* Right Arrow exiting to right on hover */}
                <span className="inline-flex items-center translate-x-0 opacity-100 group-hover:translate-x-4 group-hover:opacity-0 transition-all duration-300 ease-out ml-2 group-hover:ml-0">
                  <ArrowRight className="w-5 h-5 stroke-[2.2]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
