import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  MessageCircle,
  ShieldCheck,
  MapPin,
  Compass,
  ArrowRight,
  ArrowLeft,
  Mountain,
  Landmark,
  Waves,
  Sparkles,
  Binoculars,
  Navigation,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { MountainContourSketch, PalmClusterSketch, WindingRouteSketch } from '../common/TravelDecorations';

interface DiscoveryPoint {
  id: string;
  name: string;
  subtitle: string;
  destinations: string;
  icon: React.ReactNode;
  accent: string;
}

const DISCOVERY_POINTS: DiscoveryPoint[] = [
  {
    id: 'hills',
    name: 'Hills',
    subtitle: 'Highlands & Plantations',
    destinations: 'Ooty • Kodaikanal • Munnar',
    icon: <Mountain className="w-4 h-4 text-emerald-600" />,
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'heritage',
    name: 'Heritage',
    subtitle: 'UNESCO Living History',
    destinations: 'Madurai • Thanjavur • Mahabalipuram',
    icon: <Landmark className="w-4 h-4 text-amber-600" />,
    accent: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'beaches',
    name: 'Beaches',
    subtitle: 'Coastal Serenity',
    destinations: 'Pondicherry • Rameswaram • Coast',
    icon: <Waves className="w-4 h-4 text-cyan-600" />,
    accent: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 'spiritual',
    name: 'Spiritual',
    subtitle: 'Sacred Temples & Darshan',
    destinations: 'Meenakshi • Big Temple • Navagraha',
    icon: <Sparkles className="w-4 h-4 text-brand-gold-600" />,
    accent: 'from-brand-gold-500/20 to-amber-500/10',
  },
  {
    id: 'wildlife',
    name: 'Wildlife',
    subtitle: 'Jungle & Nature Sanctuaries',
    destinations: 'Mudumalai • Thekkady • Periyar',
    icon: <Binoculars className="w-4 h-4 text-teal-600" />,
    accent: 'from-teal-500/20 to-emerald-500/10',
  },
];

export const HeroSection: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [isPosterHovered, setIsPosterHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const posterContainerRef = useRef<HTMLDivElement>(null);

  // Detect touch devices and reduced-motion preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchQuery = window.matchMedia('(hover: none) or (pointer: coarse)');
      setIsTouchDevice(touchQuery.matches);

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);

      const handleTouch = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
      const handleMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

      touchQuery.addEventListener('change', handleTouch);
      motionQuery.addEventListener('change', handleMotion);

      return () => {
        touchQuery.removeEventListener('change', handleTouch);
        motionQuery.removeEventListener('change', handleMotion);
      };
    }
  }, []);

  // Subtle 3D Perspective Tilt on Poster (Max ~3.5° rotation, gentle spring return)
  const handlePosterMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || prefersReducedMotion || !posterContainerRef.current) return;

      const rect = posterContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1 relative to center
      const px = (x - rect.width / 2) / (rect.width / 2);
      const py = (y - rect.height / 2) / (rect.height / 2);

      // Controlled subtle tilt (2.5° to 3.5° max)
      const tiltX = -py * 3.2;
      const tiltY = px * 3.2;
      const shiftX = px * 3.5;
      const shiftY = py * 3.5;

      const style = posterContainerRef.current.style;
      style.setProperty('--poster-x', `${x.toFixed(1)}px`);
      style.setProperty('--poster-y', `${y.toFixed(1)}px`);
      style.setProperty('--poster-tilt-x', `${tiltX.toFixed(2)}deg`);
      style.setProperty('--poster-tilt-y', `${tiltY.toFixed(2)}deg`);
      style.setProperty('--poster-shift-x', `${shiftX.toFixed(2)}px`);
      style.setProperty('--poster-shift-y', `${shiftY.toFixed(2)}px`);
    },
    [isTouchDevice, prefersReducedMotion]
  );

  const handlePosterMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsPosterHovered(true);
  }, [isTouchDevice]);

  const handlePosterMouseLeave = useCallback(() => {
    if (isTouchDevice || !posterContainerRef.current) return;
    setIsPosterHovered(false);

    const style = posterContainerRef.current.style;
    style.setProperty('--poster-tilt-x', '0deg');
    style.setProperty('--poster-tilt-y', '0deg');
    style.setProperty('--poster-shift-x', '0px');
    style.setProperty('--poster-shift-y', '0px');
  }, [isTouchDevice]);

  const scrollToTours = () => {
    const element = document.getElementById('tours');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Coordinated entrance sequence animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-6 pb-14 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#FAF9F6] via-[#F8F6F0] to-[#F4F8FA] scroll-mt-20 select-none"
    >
      {/* ===================================================================== */}
      {/* 8. ATMOSPHERIC LIGHTING: Misty blue & extremely soft teal glows        */}
      {/* ===================================================================== */}
      <div className="absolute -top-16 left-1/4 w-[700px] h-[450px] bg-brand-sky-200/15 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-10 -left-20 w-[550px] h-[400px] bg-brand-teal-100/18 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-brand-gold-100/12 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Minimal Travel Line-Art Illustrations: Mountains, Palm, Journey Route */}
      <MountainContourSketch className="absolute -bottom-6 -left-10 w-72 sm:w-96 text-slate-700" opacity="opacity-[0.06]" />
      <PalmClusterSketch className="absolute -top-12 -right-8 w-44 sm:w-64 text-brand-teal-800" opacity="opacity-[0.05]" />
      <WindingRouteSketch className="absolute bottom-6 left-1/4 w-72 sm:w-[32rem] text-brand-sky-800" opacity="opacity-[0.05]" />

      {/* Decorative Faint Indian Architecture & Terrain Silhouettes (3% - 5% opacity) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-[0.04] text-slate-800">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          {/* Subtle rolling hills contour */}
          <path
            d="M0 450 C300 400 450 480 720 430 C980 380 1200 460 1440 420 L1440 600 L0 600 Z"
            fill="currentColor"
          />
          {/* Faint temple tower / gopuram silhouette profile */}
          <path
            d="M180 430 L195 360 L210 360 L220 320 L230 320 L235 280 L240 250 L245 280 L250 320 L260 320 L270 360 L285 360 L300 430 Z"
            fill="currentColor"
          />
          {/* Heritage fort battlement outline */}
          <path
            d="M1100 430 L1100 370 L1120 370 L1120 390 L1140 390 L1140 370 L1160 370 L1160 390 L1180 390 L1180 370 L1200 370 L1200 430 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Hero Content, Interactive Discovery Path, CTAs       */}
          {/* ================================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Step 2: Eyebrow Brand Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-soft border border-brand-sky-200/80 text-xs font-bold tracking-wider uppercase text-brand-sky-800">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal-500"></span>
                </span>
                <span>JAYASHAKTHI TOURS &amp; TRAVELS</span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline text-slate-500 font-medium lowercase">chennai</span>
              </div>
            </motion.div>

            {/* Step 3: Main Tourism-Focused Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy-950 leading-[1.12]"
            >
              Discover India.{' '}
              <span className="text-gradient-brand block sm:inline">
                Travel Without the Stress.
              </span>
            </motion.h1>

            {/* Step 4: Supporting Explanation */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Jayashakthi Tours &amp; Travels helps travelers plan and coordinate memorable journeys across India. From private transport and handpicked hotels to custom itineraries and helpful travel assistance, we make exploring India straightforward and enjoyable.
            </motion.p>

            {/* =============================================================== */}
            {/* 6. PRIMARY & SECONDARY CTA BUTTONS                              */}
            {/* =============================================================== */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1"
            >
              {/* Primary CTA with Liquid Gradient & Arrow Swap Interaction */}
              <button
                type="button"
                onClick={scrollToTours}
                className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-sky-600 via-brand-teal-600 to-brand-sky-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-base tracking-wide font-bold uppercase shadow-soft hover:shadow-soft-lg transition-all duration-500 flex items-center justify-center cursor-pointer"
              >
                {/* Left Arrow entering from left on hover */}
                <span className="inline-flex items-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out mr-0 group-hover:mr-2">
                  <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                </span>

                <span className="relative z-10 transition-transform duration-300">
                  Explore Tours
                </span>

                {/* Right Arrow exiting to right on hover */}
                <span className="inline-flex items-center translate-x-0 opacity-100 group-hover:translate-x-4 group-hover:opacity-0 transition-all duration-300 ease-out ml-2 group-hover:ml-0">
                  <ArrowRight className="w-5 h-5 stroke-[2.2]" />
                </span>
              </button>

              {/* WhatsApp Secondary CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 text-white text-base font-semibold shadow-soft hover:shadow-soft-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20 transition-transform duration-300 group-hover:scale-110" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* =============================================================== */}
            {/* 2, 3, 4. INTERACTIVE INDIA TRAVEL DISCOVERY PATH                */}
            {/* =============================================================== */}
            <motion.div
              variants={itemVariants}
              className="pt-2 pb-1 relative"
            >
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-sky-800 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-brand-teal-600" />
                  <span>Interactive Journey Discovery</span>
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Hover points to preview regions
                </span>
              </div>

              {/* The Discovery Path Strip */}
              <div className="relative p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs backdrop-blur-sm">
                {/* SVG Route Line connecting discovery nodes with traveling beacon */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 pointer-events-none -z-0 hidden sm:block">
                  <svg className="w-full h-4 -translate-y-1.5 overflow-visible" viewBox="0 0 500 16" fill="none">
                    <path
                      d="M 10 8 Q 125 2, 250 8 T 490 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="text-brand-sky-300/80"
                    />
                  </svg>
                  {/* Gentle Travelling Marker Beacon */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full animate-journey-travel pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-sky-500 ring-4 ring-brand-sky-200/60 shadow-2xs" />
                  </div>
                </div>

                {/* 5 Discovery Hotspots along the Path */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-3 relative z-10">
                  {DISCOVERY_POINTS.map((pt) => {
                    const isHovered = activePoint === pt.id;
                    return (
                      <div
                        key={pt.id}
                        onMouseEnter={() => !isTouchDevice && setActivePoint(pt.id)}
                        onMouseLeave={() => !isTouchDevice && setActivePoint(null)}
                        onClick={() => setActivePoint(activePoint === pt.id ? null : pt.id)}
                        tabIndex={0}
                        onFocus={() => setActivePoint(pt.id)}
                        onBlur={() => setActivePoint(null)}
                        className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
                      >
                        {/* Hotspot Circular Node */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                            isHovered
                              ? 'bg-white shadow-soft scale-110 border-brand-sky-400 ring-2 ring-brand-sky-100'
                              : 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {pt.icon}
                        </div>

                        {/* Node Label */}
                        <span
                          className={`text-[10px] sm:text-xs font-bold mt-1.5 transition-colors text-center truncate w-full ${
                            isHovered ? 'text-brand-sky-700' : 'text-slate-600'
                          }`}
                        >
                          {pt.name}
                        </span>

                        {/* Hover / Tap Reveal Card */}
                        {isHovered && (
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 sm:w-56 p-2.5 rounded-xl bg-brand-navy-950 text-white shadow-xl z-30 pointer-events-none text-left animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                              <MapPin className="w-3 h-3" />
                              <span>{pt.subtitle}</span>
                            </div>
                            <p className="text-xs text-slate-200 leading-snug">
                              {pt.destinations}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* =============================================================== */}
            {/* 7. SERVICE HIGHLIGHTS (Subtle Hover Micro-Interactions)         */}
            {/* =============================================================== */}
            <motion.div
              variants={itemVariants}
              className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-medium text-slate-600"
            >
              {/* Highlight 1 */}
              <div className="group/item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70 hover:border-brand-teal-300 hover:bg-white hover:-translate-y-0.5 shadow-2xs hover:shadow-soft transition-all duration-200 cursor-default">
                <ShieldCheck className="w-4 h-4 text-brand-teal-600 transition-transform duration-300 group-hover/item:scale-115 group-hover/item:rotate-6" />
                <span className="font-semibold text-brand-navy-950">Coordinated Travel Logistics</span>
              </div>

              {/* Highlight 2 */}
              <div className="group/item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70 hover:border-brand-sky-300 hover:bg-white hover:-translate-y-0.5 shadow-2xs hover:shadow-soft transition-all duration-200 cursor-default">
                <Compass className="w-4 h-4 text-brand-sky-600 transition-transform duration-300 group-hover/item:scale-115 group-hover/item:rotate-12" />
                <span className="font-semibold text-brand-navy-950">Customized Daily Itineraries</span>
              </div>

              {/* Highlight 3 */}
              <div className="group/item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70 hover:border-brand-gold-400 hover:bg-white hover:-translate-y-0.5 shadow-2xs hover:shadow-soft transition-all duration-200 cursor-default">
                <MapPin className="w-4 h-4 text-brand-gold-600 transition-transform duration-300 group-hover/item:scale-115 group-hover/item:-rotate-6" />
                <span className="font-semibold text-brand-navy-950">South India &amp; All-India Routes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Official Agency Poster with Cursor-Reactive Depth   */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative [perspective:1000px]"
            onMouseMove={handlePosterMouseMove}
            onMouseEnter={handlePosterMouseEnter}
            onMouseLeave={handlePosterMouseLeave}
          >
            <div
              ref={posterContainerRef}
              className="relative mx-auto max-w-md lg:max-w-none will-change-transform"
              style={{
                transform: prefersReducedMotion || isTouchDevice
                  ? undefined
                  : 'perspective(1000px) rotateX(var(--poster-tilt-x, 0deg)) rotateY(var(--poster-tilt-y, 0deg)) translate3d(var(--poster-shift-x, 0px), var(--poster-shift-y, 0px), 0)',
                transformStyle: 'preserve-3d',
                transition: isPosterHovered
                  ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              }}
            >
              {/* Soft decorative aura background plate for layered depth */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-sky-300/30 via-brand-teal-200/20 to-brand-gold-200/25 blur-xl -z-10 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: isPosterHovered ? 1 : 0.6,
                  transform: 'translate3d(calc(var(--poster-shift-x, 0px) * -1.2), calc(var(--poster-shift-y, 0px) * -1.2), 0)',
                }}
              />

              {/* Poster Frame with clean borders and soft shadow */}
              <div
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white bg-white transition-all duration-300 ${
                  isPosterHovered
                    ? 'shadow-[0_24px_48px_-12px_rgba(15,23,42,0.22)]'
                    : 'shadow-soft-xl'
                }`}
              >
                <img
                  src={business.poster}
                  alt="Official Jayashakthi Tours & Travels Promotional Poster"
                  className="w-full h-auto object-contain block mx-auto select-none pointer-events-none"
                  loading="eager"
                />

                {/* Soft Specular Light Highlight Following Cursor */}
                {!isTouchDevice && (
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300 overflow-hidden"
                    style={{
                      opacity: isPosterHovered ? 1 : 0,
                      background:
                        'radial-gradient(400px circle at var(--poster-x, 50%) var(--poster-y, 50%), rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.1) 35%, transparent 65%)',
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
