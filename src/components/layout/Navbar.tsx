import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Itinerary', path: '/itinerary' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none py-0.5">
              <img
                src={business.logo}
                alt="Jayashakthi Tours Logo"
                className="h-10 sm:h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-brand-navy-950 leading-none group-hover:text-brand-sky-700 transition-colors">
                  JAYASHAKTHI
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-brand-sky-700 uppercase leading-tight mt-0.5">
                  TOURS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                      isActive
                        ? 'text-brand-sky-700 bg-brand-sky-50 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-brand-sky-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/90 px-3 py-2 rounded-xl border border-emerald-200/70 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-xs"
                title="Chat with our tour planner on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-transparent" />
                <span>WHATSAPP US</span>
              </a>

              <Button
                to="/booking"
                variant="primary"
                size="sm"
                icon={<CalendarCheck className="w-4 h-4" />}
                className="!text-xs uppercase tracking-wider font-bold"
              >
                PLAN MY TRIP
              </Button>
            </div>

            {/* Mobile Menu Trigger & Plan button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                to="/booking"
                variant="primary"
                size="sm"
                className="!text-xs !px-3 !py-1.5 uppercase font-bold"
              >
                PLAN MY TRIP
              </Button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-brand-sky-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-sky-500"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-navy-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto pt-20">
            <div className="space-y-1">
              <div className="px-3 pb-3 mb-2 border-b border-slate-100 flex items-center gap-2.5">
                <img
                  src={business.logo}
                  alt="Jayashakthi Tours Logo"
                  className="h-9 w-auto object-contain shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-sm tracking-tight text-brand-navy-950 leading-none">
                    JAYASHAKTHI
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-brand-sky-700 uppercase leading-tight mt-0.5">
                    TOURS
                  </span>
                </div>
              </div>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between text-base font-medium px-3.5 py-2.5 rounded-xl transition-colors ${
                      isActive
                        ? 'text-brand-sky-700 bg-brand-sky-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-sky-600" />}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTAs & Quick Info */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Button
                to="/booking"
                variant="primary"
                fullWidth
                icon={<CalendarCheck className="w-4 h-4" />}
                className="py-3 uppercase tracking-wider font-bold"
              >
                PLAN MY TRIP
              </Button>

              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                fullWidth
                icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
                className="py-3"
              >
                WHATSAPP US (+91 98408 15556)
              </Button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <div className="flex items-center justify-center gap-1.5 font-medium text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-brand-sky-600" />
                  <a href={business.phoneCallUrl}>{business.phone}</a>
                </div>
                <p className="mt-1 text-slate-400">{business.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
