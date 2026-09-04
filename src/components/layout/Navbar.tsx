import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  MessageCircle,
  CalendarCheck,
  Compass,
  Sparkles,
  Star,
  Layers,
  ChevronRight,
  Camera,
  Phone,
  HelpCircle,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { AnimatedNavFramer } from '../ui/navigation-menu';
import { LiquidButton } from '../common/LiquidButton';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Exact desktop navigation structure requested:
  // Home | Tours | Gallery | Why Us | Reviews | FAQ | Contact
  const navLinks = [
    { name: 'Home', sectionId: 'home', icon: <Sparkles className="w-4 h-4 text-brand-sky-600" /> },
    { name: 'Tours', sectionId: 'tours', icon: <Compass className="w-4 h-4 text-brand-gold-600" /> },
    { name: 'Gallery', sectionId: 'gallery', icon: <Camera className="w-4 h-4 text-brand-teal-600" /> },
    { name: 'Why Us', sectionId: 'why-us', icon: <Layers className="w-4 h-4 text-brand-sky-600" /> },
    { name: 'Reviews', sectionId: 'reviews', icon: <Star className="w-4 h-4 text-brand-gold-500 fill-brand-gold-400" /> },
    { name: 'FAQ', sectionId: 'faq', icon: <HelpCircle className="w-4 h-4 text-brand-teal-600" /> },
    { name: 'Contact', sectionId: 'contact', icon: <Phone className="w-4 h-4 text-brand-sky-600" /> },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

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
          {/* ================================================================= */}
          {/* TOP BAR: Logo + Desktop Links + Action Buttons                    */}
          {/* ================================================================= */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none py-1 shrink-0"
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
                  TOURS &amp; TRAVELS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Animated Framer Motion Menu */}
            <div className="hidden lg:flex items-center justify-center">
              <AnimatedNavFramer
                items={navLinks.map((link) => ({
                  name: link.name,
                  href: `#${link.sectionId}`,
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    handleNavClick(link.sectionId);
                  },
                }))}
                isFloating={false}
              />
            </div>

            {/* Desktop Right Actions: [ BOOK NOW ] [ WHATSAPP US ] with Liquid Flow */}
            <div className="hidden lg:flex items-center gap-2.5">
              <LiquidButton
                to="/booking"
                size="sm"
                variant="primary"
                className="min-w-[130px]"
              >
                BOOK NOW
              </LiquidButton>

              <LiquidButton
                href={whatsappUrl}
                external
                size="sm"
                variant="emerald"
                className="min-w-[145px]"
              >
                WHATSAPP US
              </LiquidButton>
            </div>

            {/* Mobile Top Right (< lg): WhatsApp CTA + Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-2xs"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-brand-sky-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* MOBILE DIRECT ACCESS BAR (< lg)                                  */}
          {/* Directly Accessible: [ Tours ] [ Gallery ] [ Why Us ] [ BOOK NOW ] */}
          {/* ================================================================= */}
          <div className="lg:hidden py-2 border-t border-slate-100">
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleNavClick('tours')}
                className="py-2 px-1 text-center rounded-xl bg-slate-100/90 hover:bg-slate-200/80 active:bg-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 transition-colors truncate"
              >
                Tours
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('gallery')}
                className="py-2 px-1 text-center rounded-xl bg-slate-100/90 hover:bg-slate-200/80 active:bg-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 transition-colors truncate"
              >
                Gallery
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('why-us')}
                className="py-2 px-1 text-center rounded-xl bg-slate-100/90 hover:bg-slate-200/80 active:bg-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 transition-colors truncate"
              >
                Why Us
              </button>

              <Link
                to="/booking"
                className="py-2 px-1 text-center rounded-xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 active:scale-98 text-[11px] sm:text-xs font-extrabold text-white uppercase tracking-wider shadow-soft transition-all truncate"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* MOBILE DRAWER MENU (☰) — Exact Website Order:                     */}
      {/* Home → Tours → Gallery → Why Us → Reviews → FAQ → Contact        */}
      {/* ================================================================= */}
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
              {/* Drawer Header */}
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
                      TOURS &amp; TRAVELS
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

              {/* Navigation Links in exact order */}
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 pt-1">
                Navigation
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.sectionId)}
                    className="w-full flex items-center justify-between text-sm font-semibold px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-brand-sky-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Drawer Actions: Book Now & WhatsApp */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5">
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white font-bold text-sm uppercase tracking-wider shadow-soft"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>BOOK NOW</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm uppercase tracking-wider shadow-soft"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Us</span>
              </a>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed pt-1">
                {business.address.city}, {business.address.state} • All India Tours
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
