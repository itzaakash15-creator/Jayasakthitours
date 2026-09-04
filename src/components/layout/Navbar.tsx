import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  CalendarCheck,
  MessageCircle,
  Phone,
  Compass,
  Camera,
  Star,
  MapPin,
  Info,
  Clock,
  Send,
} from 'lucide-react';
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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  // Desktop links (all primary & secondary navigation)
  const desktopNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Itinerary', path: '/itinerary' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  // Secondary items for the mobile hamburger menu ONLY
  // (Services, Gallery, Reviews, Plan Trip, WhatsApp are directly on front mobile navigation)
  const secondaryNavLinks = [
    { name: 'About Jayashakthi', path: '/about', icon: <Info className="w-4 h-4 text-brand-sky-600" /> },
    { name: 'Tour Packages', path: '/packages', icon: <Compass className="w-4 h-4 text-brand-teal-600" /> },
    { name: 'Day-by-Day Itinerary', path: '/itinerary', icon: <Clock className="w-4 h-4 text-brand-gold-600" /> },
    { name: 'Contact Us', path: '/contact', icon: <Send className="w-4 h-4 text-brand-sky-600" /> },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* ========================================================= */}
          {/* TOP BAR: Brand Logo + Desktop Nav + Mobile ☰ Trigger       */}
          {/* ========================================================= */}
          <div className="flex items-center justify-between py-2 sm:py-3 lg:py-4">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none py-0.5 shrink-0"
            >
              <img
                src={business.logo}
                alt="Jayashakthi Tours Logo"
                className="h-9 sm:h-11 md:h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-brand-navy-950 leading-none group-hover:text-brand-sky-700 transition-colors">
                  JAYASHAKTHI
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-brand-sky-700 uppercase leading-tight mt-0.5">
                  TOURS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (>= lg) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {desktopNavLinks.map((link) => {
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

            {/* Desktop Right Actions (>= lg) */}
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

            {/* Mobile Hamburger Trigger (☰) for Secondary Navigation */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-brand-sky-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-sky-500 cursor-pointer flex items-center gap-1.5"
                aria-label="Toggle secondary navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden xs:inline">
                  Menu
                </span>
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MOBILE QUICK-NAVIGATION / DASHBOARD (< lg)                  */}
          {/* 5 Visible Options in Front: Services, Gallery, Reviews,   */}
          {/* Plan My Trip, WhatsApp (No Hamburger Opening Required!)   */}
          {/* ========================================================= */}
          <div className="lg:hidden pt-1.5 pb-2 border-t border-slate-100">
            {/* Row 1: Services | Gallery | Reviews */}
            <div className="grid grid-cols-3 gap-1.5 mb-1.5">
              <Link
                to="/services"
                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors text-center truncate ${
                  location.pathname === '/services'
                    ? 'bg-brand-sky-100 text-brand-sky-800 font-bold border border-brand-sky-300/80 shadow-2xs'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-brand-sky-600 shrink-0" />
                <span className="truncate">Services</span>
              </Link>

              <Link
                to="/gallery"
                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors text-center truncate ${
                  location.pathname === '/gallery'
                    ? 'bg-brand-sky-100 text-brand-sky-800 font-bold border border-brand-sky-300/80 shadow-2xs'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-brand-teal-600 shrink-0" />
                <span className="truncate">Gallery</span>
              </Link>

              <Link
                to="/reviews"
                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors text-center truncate ${
                  location.pathname === '/reviews'
                    ? 'bg-brand-sky-100 text-brand-sky-800 font-bold border border-brand-sky-300/80 shadow-2xs'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-brand-gold-500 fill-brand-gold-400 shrink-0" />
                <span className="truncate">Reviews</span>
              </Link>
            </div>

            {/* Row 2: Plan My Trip | WhatsApp */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/booking"
                className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-soft active:scale-98 truncate ${
                  location.pathname === '/booking'
                    ? 'bg-brand-navy-950 text-white ring-2 ring-brand-sky-400'
                    : 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white hover:brightness-105'
                }`}
              >
                <CalendarCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                <span className="truncate">Plan My Trip</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-bold tracking-wide shadow-soft active:scale-98 transition-all truncate"
              >
                <MessageCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-white/20 shrink-0" />
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE DRAWER MENU (☰) — Secondary Navigation ONLY         */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-navy-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
            <div className="space-y-4">
              {/* Drawer Top Header */}
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={business.logo}
                    alt="Jayashakthi Tours Logo"
                    className="h-8 w-auto object-contain shrink-0"
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

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Secondary Navigation Section Title */}
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                More Information &amp; Routes
              </div>

              {/* Secondary Links */}
              <div className="space-y-1">
                {secondaryNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-sm font-semibold px-3.5 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'text-brand-sky-700 bg-brand-sky-50'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon}
                        <span>{link.name}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-sky-600" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer: Contact & Office Details */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Office Headquarters
                </span>
                <p className="text-slate-600 leading-snug font-medium">
                  {business.address.formatted}
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <a
                    href={business.phoneCallUrl}
                    className="text-brand-navy-950 font-bold flex items-center gap-1 hover:text-brand-sky-700"
                  >
                    <Phone className="w-3 h-3 text-brand-sky-600" />
                    <span>{business.phone}</span>
                  </a>
                  <a
                    href={business.address.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-sky-700 font-semibold hover:underline"
                  >
                    Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
