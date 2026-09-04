import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Navigation,
  X,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | null>(null);

  const quickLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Tours', path: '/#tours' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Why Us', path: '/#why-us' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Contact', path: '/#contact' },
  ];

  const travelServices = [
    'Custom Day-by-Day Itineraries',
    'South India Tour Packages',
    'Kerala Houseboat & Hills',
    'Golden Triangle Tours',
    'Tamil Nadu Travel Experiences',
    'Chauffeured Vehicle Coordination',
  ];

  return (
    <footer className="relative bg-[#020617] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden select-none">
      {/* ===================================================================== */}
      {/* ULTRA-SUBTLE TRAVEL-INSPIRED FOOTER BACKGROUND (3-4% Opacity)        */}
      {/* ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft radial glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-sky-900/10 blur-3xl rounded-full" />

        {/* Faint travel route & landscape vector art */}
        <svg
          className="absolute inset-0 w-full h-full text-slate-400/[0.035]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
        >
          {/* Subtle rolling topography outline at bottom */}
          <path
            d="M0 540 Q 300 480, 600 520 T 1200 490 T 1440 530 L 1440 600 L 0 600 Z"
            fill="currentColor"
          />

          {/* Dotted travel routes connecting India regions */}
          <path
            d="M100 120 Q 350 70, 600 140 T 1100 90 T 1380 160"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            fill="none"
          />
          <path
            d="M140 280 Q 450 210, 750 300 T 1320 250"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 5"
            fill="none"
          />

          {/* Mini waypoint nodes */}
          <circle cx="100" cy="120" r="2.5" fill="currentColor" />
          <circle cx="600" cy="140" r="3" fill="currentColor" />
          <circle cx="1100" cy="90" r="2.5" fill="currentColor" />
          <circle cx="1380" cy="160" r="3.5" fill="currentColor" />
          <circle cx="140" cy="280" r="2" fill="currentColor" />
          <circle cx="750" cy="300" r="3" fill="currentColor" />
          <circle cx="1320" cy="250" r="2.5" fill="currentColor" />

          {/* Faint gopuram tower silhouette */}
          <path
            d="M1260 480 L1260 430 L1275 430 L1275 400 L1285 400 L1285 375 L1295 375 L1295 355 L1300 345 L1305 355 L1305 375 L1315 375 L1315 400 L1325 400 L1325 430 L1340 430 L1340 480 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =================================================================== */}
        {/* TOP BRAND GRID (4 CLEARLY STRUCTURED COLUMNS)                       */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 1 — BRAND (Cols 1-4)                                       */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={business.logo}
                alt="Jayashakthi Tours Logo"
                className="h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl text-white tracking-tight group-hover:text-brand-sky-300 transition-colors">
                  JAYASHAKTHI
                </span>
                <span className="text-xs font-semibold tracking-widest text-brand-sky-400 uppercase leading-none mt-0.5">
                  TOURS &amp; TRAVELS
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {business.tagline} {business.supportingMessage}
            </p>

            {/* Premium Outlined Tagline Pill with Travelling Gradient Border */}
            <div className="pt-2">
              <div className="group/pill relative inline-block p-[1px] rounded-full overflow-hidden transition-all duration-300 cursor-default">
                {/* Travelling gradient border sheen on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-brand-sky-500/30 via-brand-teal-400/50 to-brand-sky-500/30 opacity-60 group-hover/pill:opacity-100 group-hover/pill:from-brand-sky-400 group-hover/pill:via-teal-300 group-hover/pill:to-brand-sky-400 transition-all duration-500" />
                <div className="relative px-4 py-1.5 rounded-full bg-slate-900/95 border border-slate-700/60 group-hover/pill:border-transparent text-xs text-brand-sky-200/90 font-medium flex items-center gap-2 transition-colors">
                  <Compass className="w-3.5 h-3.5 text-brand-teal-400 group-hover/pill:rotate-45 transition-transform duration-300" />
                  <span>One Trip. One Team. Everything Taken Care Of.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 2 — QUICK LINKS (Cols 5-6)                                 */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group text-slate-400 hover:text-white transition-all duration-200 inline-flex items-center gap-1 cursor-pointer"
                  >
                    {/* Arrow smoothly slides in from the left on hover */}
                    <span className="w-0 opacity-0 -translate-x-2 group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-sky-400 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="group-hover:translate-x-0.5 group-hover:text-brand-sky-300 transition-all duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/booking"
                  className="group text-brand-sky-400 font-semibold hover:text-brand-sky-300 transition-all duration-200 inline-flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span className="w-0 opacity-0 -translate-x-2 group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-teal-400 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="group-hover:translate-x-0.5 group-hover:text-brand-teal-300 transition-all duration-200">
                    Plan My Journey
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 3 — OUR SERVICES (Cols 7-9)                                */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {travelServices.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="group text-slate-400 hover:text-white transition-all duration-200 inline-flex items-center gap-1 cursor-pointer"
                  >
                    {/* Arrow smoothly slides in from the left on hover */}
                    <span className="w-0 opacity-0 -translate-x-2 group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-sky-400 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="group-hover:translate-x-0.5 group-hover:text-brand-sky-300 transition-all duration-200">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="group text-xs text-brand-sky-400 hover:text-brand-sky-300 inline-flex items-center gap-1.5 pt-1 transition-colors"
                >
                  <span>Explore all coordination services</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUMN 4 — BUSINESS CONTACT (Cols 10-12)                          */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Business Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              {/* Address with Directions Link */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-sky-400 shrink-0 mt-1" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-white text-sm">Jayashakthi Tours</div>
                  <div className="text-slate-400 text-[11px]">
                    Proprietor: {business.proprietor}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[12px]">
                    {business.address.street}, {business.address.area}, {business.address.city} – {business.address.pincode}, {business.address.state}
                  </p>
                  <div className="pt-0.5">
                    <a
                      href={business.address.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-[11px] font-semibold text-brand-sky-400 hover:text-brand-sky-300 transition-colors cursor-pointer"
                    >
                      <span>Get Directions</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </li>

              {/* Phone Line with Subtle Motion */}
              <li className="flex items-start gap-3">
                <a
                  href={business.phoneCallUrl}
                  className="group flex items-start gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-sky-400 shrink-0 mt-0.5 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-brand-sky-300 transition-transform duration-300" />
                  <div>
                    <div className="text-[11px] text-slate-400">Calling Line</div>
                    <strong className="font-semibold text-white group-hover:text-brand-sky-300 transition-colors">
                      {business.phone}
                    </strong>
                  </div>
                </a>
              </li>

              {/* WhatsApp with Message Pop */}
              <li className="flex items-start gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-115 group-hover:-rotate-6 group-hover:text-emerald-300 transition-transform duration-300" />
                  <div>
                    <div className="text-[11px] text-slate-400">WhatsApp Enquiry</div>
                    <span className="text-emerald-400 font-medium group-hover:underline">
                      {business.whatsappFormatted}
                    </span>
                  </div>
                </a>
              </li>

              {/* Email with Envelope Shift */}
              <li className="flex items-start gap-3">
                <a
                  href={business.emailMailto}
                  className="group flex items-start gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-brand-teal-300 transition-all duration-300" />
                  <div>
                    <div className="text-[11px] text-slate-400">Official Email</div>
                    <span className="text-slate-300 group-hover:text-brand-teal-300 break-all text-xs transition-colors">
                      {business.email}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* =================================================================== */}
        {/* FOOTER BOTTOM BAR                                                   */}
        {/* =================================================================== */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {/* Left: Copyright */}
          <div>
            © {currentYear} {business.name}. All rights reserved.
          </div>

          {/* Center: Journey Statement */}
          <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
            <span>Designed for journeys across India</span>
            <span className="text-brand-gold-400">✦</span>
          </div>

          {/* Right: Policy Modals */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setActivePolicyModal('privacy')}
              className="text-slate-400 hover:text-brand-sky-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => setActivePolicyModal('terms')}
              className="text-slate-400 hover:text-brand-sky-300 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>

        {/* Subtle Closing Statement */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
          <p>
            Complete India Travel Coordination • Chennai, Tamil Nadu, India • All tour packages and daily itineraries are customized to your schedule.
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACCESSIBLE MODALS FOR PRIVACY POLICY & TERMS                          */}
      {/* ===================================================================== */}
      {activePolicyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                {activePolicyModal === 'privacy' ? (
                  <ShieldCheck className="w-5 h-5 text-brand-sky-400" />
                ) : (
                  <FileText className="w-5 h-5 text-brand-teal-400" />
                )}
                <h4 className="text-lg font-bold text-white">
                  {activePolicyModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activePolicyModal === 'privacy' ? (
                <>
                  <p>
                    <strong>Jayashakthi Tours &amp; Travels</strong> respects the privacy of all travelers. We collect only necessary details (such as traveler names, contact information, travel dates, and vehicle preferences) exclusively for coordinating your itinerary and travel logistics across India.
                  </p>
                  <p>
                    We never sell, rent, or trade your personal data to unauthorized third parties. Information is shared strictly with verified transport chauffeurs, hotels, and travel coordinators involved in your trip.
                  </p>
                  <p>
                    For queries regarding your information, connect with our privacy team at{' '}
                    <a href={business.emailMailto} className="text-brand-sky-400 underline">
                      {business.email}
                    </a>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Customized Itineraries:</strong> Every tour coordinated by Jayashakthi Tours &amp; Travels is tailored according to traveler preferences, dates, and vehicle requirements.
                  </p>
                  <p>
                    <strong>Booking &amp; Coordination:</strong> Bookings are confirmed upon mutual agreement of the itinerary and deposit. Chauffeur details and stay vouchers are shared prior to commencement.
                  </p>
                  <p>
                    <strong>Travel Support:</strong> 24/7 on-trip assistance is available via WhatsApp and direct telephone for the duration of your journey.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="px-5 py-2 rounded-xl bg-brand-sky-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-soft transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
