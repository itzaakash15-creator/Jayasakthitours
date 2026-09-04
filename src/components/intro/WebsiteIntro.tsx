import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Sparkles, Navigation } from 'lucide-react';
import { business } from '../../config/business';

const STORAGE_KEY = 'jayashakthi_intro_shown';

interface PostcardData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rotation: number;
}

const DESTINATION_POSTCARDS: PostcardData[] = [
  {
    id: 'heritage',
    title: 'Tamil Nadu Heritage',
    subtitle: 'Great Living Temples',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
    rotation: -4,
  },
  {
    id: 'backwaters',
    title: 'Kerala Backwaters',
    subtitle: 'Tranquil Houseboats',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80',
    rotation: 3,
  },
  {
    id: 'hills',
    title: 'Hill Stations',
    subtitle: 'Misty Tea Plantations',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80',
    rotation: -2,
  },
  {
    id: 'coastline',
    title: 'Indian Coastline',
    subtitle: 'Golden Shores & Breezes',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80',
    rotation: 4,
  },
];

export const WebsiteIntro: React.FC = () => {
  // Check session storage on initial render
  const shouldSkipIntro = useMemo(() => {
    if (typeof window === 'undefined') return true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('intro') === 'true') {
      return false; // Force play if ?intro=true is present
    }
    return Boolean(sessionStorage.getItem(STORAGE_KEY));
  }, []);

  const [isVisible, setIsVisible] = useState<boolean>(!shouldSkipIntro);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [showSkip, setShowSkip] = useState<boolean>(false);

  const dismissIntro = useCallback(() => {
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // Ignore storage errors (e.g. incognito quota)
      }
    }
    // Allow fade-out transition to complete smoothly before unmounting
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || shouldSkipIntro) return;

    // Accessibility: Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Direct quick fade for reduced motion users
      const fastTimer = setTimeout(() => {
        dismissIntro();
      }, 1000);
      return () => clearTimeout(fastTimer);
    }

    // Show skip button after 0.8s
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 800);

    // Timings matching storyboard (total ~3.0s):
    // Scene 1: 0.0s – 0.4s (Calm Beginning)
    // Scene 2: 0.4s – 0.9s (The Route Begins)
    // Scene 3: 0.9s – 1.4s (Original Logo Reveal)
    // Scene 4: 1.4s – 1.8s (Brand Name)
    // Scene 5: 1.8s – 2.1s (Gradient Light Sweep)
    // Scene 6: 2.1s – 2.4s (Brand Tagline)
    // Scene 7: 2.4s – 2.7s (Journey Continues / Destinations)
    // Scene 8: 2.7s – 3.0s (Final Message)
    // Final: 3.0s+ (Seamless Transition into Homepage)
    const timers = [
      setTimeout(() => setCurrentScene(2), 400),
      setTimeout(() => setCurrentScene(3), 900),
      setTimeout(() => setCurrentScene(4), 1400),
      setTimeout(() => setCurrentScene(5), 1800),
      setTimeout(() => setCurrentScene(6), 2100),
      setTimeout(() => setCurrentScene(7), 2400),
      setTimeout(() => setCurrentScene(8), 2700),
      setTimeout(() => {
        dismissIntro();
      }, 3100),
    ];

    return () => {
      clearTimeout(skipTimer);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isVisible, shouldSkipIntro, dismissIntro]);

  if (!isVisible) return null;

  return (
    <div
      aria-label="Website Intro Animation"
      role="region"
      className={`fixed inset-0 z-[99999] overflow-hidden select-none flex flex-col items-center justify-center transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-[1.01] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(145deg, #FAF8F5 0%, #F5F3EC 45%, #EEF4F7 100%)',
      }}
    >
      {/* Ambient background glows: Warm cream, misty blue-grey */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-brand-sky-100/40 via-brand-teal-50/30 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-t from-brand-gold-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl opacity-60" />

        {/* Subtle misty landscape horizon line */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-32 md:h-48 text-slate-300/30 opacity-40 pointer-events-none"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 C180,90 320,150 500,105 C680,60 840,140 1020,110 C1200,80 1340,125 1440,100 L1440,200 L0,200 Z" />
          <path
            d="M0,145 C220,120 440,170 660,135 C880,100 1100,155 1440,130 L1440,200 L0,200 Z"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      {/* Skip Intro Button (Appears after ~0.8s) */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismissIntro}
            aria-label="Skip website intro animation"
            className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-xs font-semibold text-slate-600 hover:text-brand-navy-950 border border-slate-200/90 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-sky-500/40"
          >
            <span>Skip Intro</span>
            <span className="text-brand-sky-600 font-bold">→</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl w-full px-6 flex flex-col items-center justify-center text-center">
        {/* ===================================================================== */}
        {/* SCENE 1 — A CALM BEGINNING (0.0s – 0.4s)                              */}
        {/* "Every Journey Tells a Story"                                         */}
        {/* ===================================================================== */}
        {currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky-50/80 border border-brand-sky-200/60 text-brand-sky-800 text-xs font-semibold uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Incredible India</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight">
              Every Journey <br />
              <span className="font-semibold text-brand-navy-950">Tells a Story</span>
            </h1>
            <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent" />
          </motion.div>
        )}

        {/* ===================================================================== */}
        {/* SCENE 2 — THE ROUTE BEGINS (0.4s – 0.9s)                              */}
        {/* Outline of India + Chennai marker + Route drawing across India        */}
        {/* "From Chennai To Everywhere in India"                                 */}
        {/* ===================================================================== */}
        {currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center w-full"
          >
            {/* Elegant SVG Journey Map */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full text-slate-400 drop-shadow-sm overflow-visible"
                fill="none"
              >
                {/* Minimal India Peninsula Silhouette */}
                <path
                  d="M150 30 C165 40 180 55 190 75 C205 95 215 120 210 145 C200 175 185 205 165 235 C155 250 150 265 150 265 C150 265 145 250 135 235 C115 205 100 175 90 145 C85 120 95 95 110 75 C120 55 135 40 150 30 Z"
                  stroke="rgba(3, 105, 161, 0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  fill="rgba(14, 165, 233, 0.03)"
                />

                {/* Animated Journey Curve from Chennai (approx coords 170, 215) upwards */}
                <motion.path
                  d="M172 215 C160 190 130 175 140 140 C150 105 180 95 150 55"
                  stroke="url(#routeGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>

                {/* Chennai Waypoint Marker */}
                <g transform="translate(172, 215)">
                  {/* Outer pulse */}
                  <circle r="9" className="fill-brand-gold-500/30 animate-ping" />
                  {/* Pin core */}
                  <circle r="4.5" className="fill-brand-gold-600 stroke-white stroke-2" />
                  {/* Label */}
                  <text
                    x="8"
                    y="4"
                    fill="#0f172a"
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="700"
                    className="select-none"
                  >
                    Chennai
                  </text>
                </g>

                {/* Moving Vehicle / Travel Marker along the path */}
                <motion.g
                  initial={{ offsetDistance: '0%' }}
                  animate={{ offsetDistance: '100%' }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  style={{
                    offsetPath: 'path("M172 215 C160 190 130 175 140 140 C150 105 180 95 150 55")',
                  }}
                >
                  <circle r="6" fill="#0284c7" className="shadow-md" />
                  <circle r="3" fill="#ffffff" />
                </motion.g>
              </svg>
            </div>

            <div className="mt-1 space-y-1">
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-brand-gold-700 uppercase">
                From Chennai
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-navy-950">
                To Everywhere in India
              </h2>
            </div>
          </motion.div>
        )}

        {/* ===================================================================== */}
        {/* SCENES 3, 4, 5, 6, 7, 8 — ORIGINAL LOGO & BRAND JOURNEY               */}
        {/* CRITICAL: Must use the exact original client logo asset               */}
        {/* (`public/images/logo/jayashakthi-logo-cropped.png`)                   */}
        {/* Preserving exact India-map shape, J/S monogram, temple, and compass.  */}
        {/* ===================================================================== */}
        {currentScene >= 3 && (
          <motion.div
            key="scenes-brand"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* The Original Client Logo with Soft Radial Glow & Light Sweep */}
            <div className="relative group">
              {/* Scene 3: Subtle ambient glow backlight */}
              <div className="absolute inset-0 -m-4 bg-gradient-to-r from-brand-sky-400/20 via-brand-teal-400/15 to-brand-gold-400/20 rounded-full blur-2xl opacity-80" />

              {/* Logo Frame: Original asset directly used */}
              <div className="relative overflow-hidden rounded-2xl p-2 sm:p-3 bg-white/40 backdrop-blur-xs border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <img
                  src={business.logo}
                  alt="Jayashakthi Tours & Travels — Original Logo"
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain filter drop-shadow-[0_4px_16px_rgba(2,132,199,0.18)] select-none pointer-events-none"
                />

                {/* SCENE 5 — GRADIENT LIGHT SWEEP (1.8s – 2.1s) */}
                {/* Soft diagonal light sweep (gold, teal, sky-blue) passing over the logo */}
                {currentScene === 5 && (
                  <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '180%', opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 15%, rgba(254, 243, 199, 0.45) 45%, rgba(125, 211, 252, 0.55) 55%, rgba(94, 234, 212, 0.45) 65%, transparent 85%)',
                      mixBlendMode: 'screen',
                    }}
                  />
                )}
              </div>
            </div>

            {/* SCENE 4 — BRAND NAME (1.4s – 1.8s) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-4 flex flex-col items-center"
            >
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-brand-navy-950 leading-none">
                JAYASHAKTHI
              </h1>
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.26em] text-brand-sky-700 uppercase leading-tight mt-1">
                TOURS &amp; TRAVELS
              </span>
            </motion.div>

            {/* SCENE 6 — BRAND TAGLINE (2.1s – 2.4s) */}
            {currentScene >= 6 && currentScene < 8 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3"
              >
                <p className="text-xs sm:text-sm md:text-base font-medium text-slate-600 tracking-wide flex items-center gap-1.5 justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
                  <span>Your Journey Across India Starts Here</span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
                </p>
              </motion.div>
            )}

            {/* SCENE 7 — JOURNEY CONTINUES & DESTINATION POSTCARDS (2.4s – 2.7s) */}
            {currentScene === 7 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="mt-4 w-full flex items-center justify-center gap-2 sm:gap-3 px-2 overflow-x-auto no-scrollbar"
              >
                {DESTINATION_POSTCARDS.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    style={{ transform: `rotate(${card.rotation}deg)` }}
                    className="flex-shrink-0 w-24 sm:w-28 bg-white p-1.5 pb-2 rounded-lg shadow-md border border-slate-200/80 text-left transition-transform"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-14 sm:h-16 object-cover rounded"
                      loading="eager"
                    />
                    <div className="mt-1">
                      <p className="text-[10px] font-bold text-slate-900 leading-tight truncate">
                        {card.title}
                      </p>
                      <p className="text-[8px] text-slate-500 truncate">
                        {card.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* SCENE 8 — FINAL MESSAGE (2.7s – 3.0s) */}
            {currentScene === 8 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex flex-col items-center"
              >
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-light text-slate-800 tracking-tight">
                  Let’s Create{' '}
                  <span className="font-bold bg-gradient-to-r from-brand-sky-700 via-brand-teal-700 to-brand-gold-600 bg-clip-text text-transparent">
                    Brighter Journeys
                  </span>
                </h2>
                <p className="text-[11px] sm:text-xs font-semibold tracking-widest text-slate-500 uppercase mt-1.5 flex items-center gap-2">
                  <span>Travel</span>
                  <span className="text-brand-gold-500">•</span>
                  <span>Discover</span>
                  <span className="text-brand-gold-500">•</span>
                  <span>Experience</span>
                  <span className="text-brand-gold-500">•</span>
                  <span>Belong</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Subtle indicator bar at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentScene === s
                ? 'w-6 bg-brand-sky-600'
                : currentScene > s
                ? 'w-2 bg-brand-sky-300'
                : 'w-1.5 bg-slate-300/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
