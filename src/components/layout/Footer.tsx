import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MessageCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const quickLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Tours', path: '/#tours' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Why Us', path: '/#why-us' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Book Now', path: '/booking' },
  ];

  const travelServices = [
    'Custom Day-by-Day Itineraries',
    'South India Tour Packages',
    'Kerala Houseboat & Hills',
    'Golden Triangle Tours',
    'Tamil Nadu Temple Darshan',
    'Chauffeured Vehicle Coordination',
    'Tempo Traveller Group Travel',
    'Airport Meet & Transfer Support',
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={business.logo}
                alt="Jayashakthi Tours Logo"
                className="h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg text-white tracking-tight group-hover:text-brand-sky-300 transition-colors">
                  JAYASHAKTHI
                </span>
                <span className="text-xs font-semibold tracking-widest text-brand-sky-400 uppercase leading-none mt-0.5">
                  TOURS
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {business.tagline} {business.supportingMessage}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-brand-gold-300 font-medium">
                <span>{business.differentiator}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-brand-sky-400 transition-all duration-200 inline-flex items-center gap-1.5 hover:translate-x-1 cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/booking"
                  className="text-brand-sky-400 font-semibold hover:text-brand-sky-300 transition-all duration-200 inline-flex items-center gap-1.5 hover:translate-x-1 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-brand-sky-400" />
                  <span>Plan My Trip</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {travelServices.slice(0, 6).map((service) => (
                <li key={service} className="text-slate-400">
                  <Link to="/services" className="hover:text-brand-sky-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-xs text-brand-sky-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>View all 16 services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Business Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-sky-400 shrink-0 mt-1" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-white text-sm">Jayashakthi Tours</div>
                  <div className="text-slate-400 text-[11px]">Proprietor: {business.proprietor}</div>
                  <p className="text-slate-300 leading-relaxed text-[12px]">
                    {business.address.street}, {business.address.area}, {business.address.city} – {business.address.pincode}, {business.address.state}, {business.address.country}
                  </p>
                  <div className="pt-0.5">
                    <a
                      href={business.address.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-sky-400 hover:text-brand-sky-300 hover:underline transition-colors cursor-pointer"
                    >
                      <span>Get Directions</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">WhatsApp Enquiry</div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-medium hover:underline"
                  >
                    {business.whatsappFormatted}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Calling Line</div>
                  <a href={business.phoneCallUrl} className="text-slate-300 hover:text-white">
                    {business.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <a
                    href={business.emailMailto}
                    className="text-slate-300 hover:text-brand-sky-300 break-all text-xs"
                  >
                    {business.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {business.name}. All rights reserved. Based in {business.location}.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">
              Contact
            </Link>
            <Link to="/itinerary" className="hover:text-slate-400 transition-colors">
              Itinerary
            </Link>
            <Link to="/booking" className="hover:text-slate-400 transition-colors">
              Plan My Trip
            </Link>
          </div>
        </div>

        {/* Production Footer Statement */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          <p>
            Complete India Travel Coordination • Chennai, Tamil Nadu, India • All tour packages and daily itineraries are customized to your schedule.
          </p>
        </div>
      </div>
    </footer>
  );
};
