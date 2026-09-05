import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { business } from '../config/business';
import { createWhatsAppUrl } from '../utils/whatsapp';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CalendarCheck,
  Clock,
  Sparkles,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import { InstagramIcon } from '../components/common/InstagramIcon';

export const Contact: React.FC = () => {
  const [quickName, setQuickName] = useState('');
  const [quickMsg, setQuickMsg] = useState('');

  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Jayashakthi Tours,

My name is ${quickName || 'a traveler'}.
Enquiry: ${quickMsg || 'I would like to enquire about India tour planning.'}

Could you please connect with me?`;
    window.open(createWhatsAppUrl(formatted), '_blank', 'noopener,noreferrer');
  };

  return (
    <PageContainer
      seo={{
        title: 'Contact Us | Let’s Plan Your India Journey',
        description:
          'Contact Jayashakthi Tours in Chennai, India. WhatsApp: +91 98408 15556, Calling: 9444796073, Email: jayashakthitourstravels@gmail.com.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Chennai, India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Let's Plan Your India Journey.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Connect directly with our travel coordination team. Whether you have initial questions or need a complete day-by-day itinerary, we're ready to assist.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-7 space-y-5">
            {/* WhatsApp Card (Primary) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-emerald-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 fill-emerald-600/20 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Fastest Response (WhatsApp)
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-navy-950 mt-0.5">
                    {business.whatsappFormatted}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct chat with our trip planning desk. Share dates, destination ideas & group size.
                  </p>
                </div>
              </div>

              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold shrink-0"
              >
                WhatsApp Us
              </Button>
            </div>

            {/* Calling Phone Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Voice Calling
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-navy-950 mt-0.5">
                    {business.phone}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct telephone line for domestic and international travelers.
                  </p>
                </div>
              </div>

              <Button
                href={business.phoneCallUrl}
                variant="outline"
                size="md"
                icon={<Phone className="w-4 h-4 text-brand-sky-700" />}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold shrink-0"
              >
                Call Us
              </Button>
            </div>

            {/* Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Inquiries
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-brand-navy-950 mt-0.5 break-all">
                    {business.email}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Send detailed itineraries, flight tickets or RFP requirements.
                  </p>
                </div>
              </div>

              <Button
                href={business.emailMailto}
                variant="outline"
                size="md"
                icon={<Mail className="w-4 h-4 text-brand-teal-700" />}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold shrink-0"
              >
                Send Email
              </Button>
            </div>

            {/* Instagram Social Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center shrink-0">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Instagram
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Official Social
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-navy-950 mt-0.5 font-mono">
                    {business.instagramHandle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Follow for real customer trip highlights, itinerary reels and travel updates.
                  </p>
                </div>
              </div>

              <Button
                href={business.instagram}
                external
                variant="outline"
                size="md"
                icon={<InstagramIcon className="w-4 h-4 text-brand-sky-700" />}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold shrink-0"
              >
                Follow Us
              </Button>
            </div>

            {/* Official Business Address & Visit Us Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal-600" />
                  Visit Us
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Official Office
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-sky-50/70 border border-brand-sky-100 flex items-center justify-center shrink-0 p-1">
                  <img
                    src={business.logo}
                    alt="Jayashakthi Tours"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
                    Jayashakthi Tours
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-brand-sky-700 mt-0.5">
                    Proprietor: {business.proprietor}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                <p className="font-medium text-slate-800">{business.address.street},</p>
                <p>{business.address.area},</p>
                <p>{business.address.city} – {business.address.pincode}, {business.address.state}, {business.address.country}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  href={business.address.directionsUrl}
                  external
                  variant="primary"
                  size="sm"
                  icon={<MapPin className="w-4 h-4" />}
                  className="uppercase tracking-wider font-bold text-xs"
                >
                  Get Directions
                </Button>
                <a
                  href={business.phoneCallUrl}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-sky-700 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-sky-600" />
                  <span>Call Office Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Reachout & Main CTA */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Inquiry Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-brand-navy-950">
                  Quick Travel Question?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send a quick message directly to our WhatsApp travel desk.
                </p>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-4">
                <div>
                  <label htmlFor="quickName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="quickName"
                    type="text"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="e.g. John Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quickMsg" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Question or Travel Plan
                  </label>
                  <textarea
                    id="quickMsg"
                    rows={3}
                    value={quickMsg}
                    onChange={(e) => setQuickMsg(e.target.value)}
                    placeholder="e.g. We are a family of 4 visiting Chennai & Kerala for 10 days in November..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  icon={<Send className="w-4 h-4" />}
                  className="uppercase tracking-wider font-bold text-xs py-3"
                >
                  Send Quick WhatsApp Message
                </Button>
              </form>
            </div>

            {/* Big Primary Conversion Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-sky-600 via-brand-sky-700 to-brand-teal-700 text-white shadow-soft-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-white" />
              </div>

              <h3 className="text-xl font-bold tracking-tight">
                Want a Complete Day-by-Day Itinerary?
              </h3>

              <p className="text-xs sm:text-sm text-brand-sky-100 leading-relaxed">
                Use our comprehensive trip planner to specify your travel dates, destinations, adult/child counts, and hotel preferences.
              </p>

              <div className="pt-2">
                <Button
                  to="/booking"
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<CalendarCheck className="w-4 h-4 text-brand-sky-700" />}
                  className="!bg-white !text-brand-navy-950 hover:!bg-slate-50 font-bold uppercase tracking-wider text-xs shadow-soft"
                >
                  PLAN MY TRIP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
