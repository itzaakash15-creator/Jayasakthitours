import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MessageCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Jayasakthi', path: '/about' },
    { name: 'Travel Services', path: '/services' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Day-by-Day Itinerary', path: '/itinerary' },
    { name: 'Photo Gallery', path: '/gallery' },
    { name: 'Traveler Reviews', path: '/reviews' },
    { name: 'Submit Your Review', path: '/submit-review' },
    { name: 'Plan My Trip', path: '/booking' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const travelServices = [
    'India Tour Packages',
    'Day-by-Day Itinerary Planning',
    'Hotel & Heritage Bookings',
    'Domestic Flight Bookings',
    'Chauffeured Car Rentals',
    'Tempo Traveller Rentals',
    'India Visa Assistance',
    'Licensed Tour Guides',
    'Temple & Darshan Arrangements',
    'Airport Meet & Greet',
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shadow-soft">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg text-white tracking-tight">
                  JAYASAKTHI
                </span>
                <span className="text-xs font-semibold tracking-widest text-brand-sky-400 uppercase leading-none">
                  TOURS & TRAVELS
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
                    className="text-slate-400 hover:text-brand-sky-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/booking"
                  className="text-brand-sky-400 font-semibold hover:text-brand-sky-300 transition-colors inline-flex items-center gap-1.5"
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
                <MapPin className="w-4 h-4 text-brand-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{business.location}</span>
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

        {/* Demo/Sample Content Disclaimer */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          <p>
            Notice: All traveler testimonials on this website prototype are marked as sample reviews for demonstration purposes and will be replaced with verified customer reviews. All tour packages are fully customizable.
          </p>
        </div>
      </div>
    </footer>
  );
};
