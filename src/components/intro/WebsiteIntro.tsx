import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { business } from '../../config/business';

const STORAGE_KEY = 'jayashakthi_intro_shown';

type IntroPhase = 'calm' | 'route' | 'logo' | 'tagline' | 'reveal';

export const WebsiteIntro: React.FC = () => {
  // Session storage check: show only on first visit per browser session
  const shouldSkipIntro = useMemo(() => {
    if (typeof window === 'undefined') return true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('intro') === 'true') {
      return false; // Allow manual testing override
    }
    return Boolean(sessionStorage.getItem(STORAGE_KEY));
  }, []);

  const [isVisible, setIsVisible] = useState<boolean>(!shouldSkipIntro);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [phase, setPhase] = useState<IntroPhase>('calm');
  const [showSkip, setShowSkip] = useState<boolean>(false);

  // Dismiss intro smoothly into the live website
  const dismissIntro = useCallback(() => {
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // Storage quota / private browsing fallback
      }
    }
    // Allow the soft fade transition to complete before unmounting
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || shouldSkipIntro) return;

    // Accessibility: Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        dismissIntro();
      }, 900);
      return () => clearTimeout(quickTimer);
    }

    // Discreet skip button appears early (at 0.5s)
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 500);

    // Continuous, overlapping phase schedule:
    // 0.0s – 0.9s: 'calm' (Atmospheric India awakening, "Every Journey Tells a Story")
    // 0.8s – 1.8s: 'route' (Overlap: Chennai waypoint illuminates, travel route draws across India)
    // 1.7s – 2.7s: 'logo' (Overlap: Warm light converges, original client logo softly emerges)
    // 2.6s – 3.3s: 'tagline' (Brand name + "Your Journey Across India Starts Here" + "Let's Create Brighter Journeys")
    // 3.3s – 4.0s: 'reveal' (Gentle background dissolve unveiling the live homepage)
    const timers = [
      setTimeout(() => setPhase('route'), 850),
      setTimeout(() => setPhase('logo'), 1750),
      setTimeout(() => setPhase('tagline'), 2650),
      setTimeout(() => {
        setPhase('reveal');
        dismissIntro();
      }, 3400),
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
        background: 'linear-gradient(165deg, #FAF8F5 0%, #F5F3EB 40%, #EDF4F8 75%, #FAF8F5 100%)',
      }}
    >
      {/* ===================================================================== */}
      {/* 1. CONSISTENT ATMOSPHERIC BACKGROUND WORLD                            */}
      {/* One continuous painted/cinematic Indian landscape with 3 depth layers */}
      {/* Moves continuously like a slow camera dolly (zoom & gentle drift)     */}
      {/* ===================================================================== */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ scale: 1, x: 0 }}
        animate={{ scale: 1.045, x: -12 }}
        transition={{ duration: 4.2, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Soft atmospheric sunrise / morning sky radial glows */}
        <div className="absolute -top-24 left-1/4 w-[750px] h-[550px] bg-gradient-to-b from-amber-100/35 via-brand-sky-100/25 to-transparent rounded-full blur-3xl opacity-75" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[500px] bg-gradient-to-tr from-brand-teal-100/30 via-brand-sky-50/20 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 left-1/3 w-[650px] h-[450px] bg-gradient-to-t from-brand-gold-100/30 via-slate-100/20 to-transparent rounded-full blur-3xl opacity-50" />

        {/* Volumetric diagonal sunlight rays */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(125deg, rgba(217,119,6,0.5) 0px, rgba(217,119,6,0.5) 60px, transparent 60px, transparent 180px)',
          }}
        />

        {/* ----------------------------------------------------------------- */}
        {/* LAYER 1: FAR BACKGROUND (Mountains, distant sky, gliding birds)  */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          {/* Distant Mountain Ridges */}
          <svg
            viewBox="0 0 1440 280"
            preserveAspectRatio="none"
            className="w-full h-36 sm:h-48 md:h-60 text-slate-400/15"
            fill="currentColor"
          >
            {/* Deepest mountain ridge */}
            <path d="M0,130 C160,95 280,140 440,110 C600,80 720,135 880,105 C1040,75 1180,120 1320,95 C1380,85 1410,105 1440,100 L1440,280 L0,280 Z" />
            {/* Mid mountain ridge */}
            <path
              d="M0,170 C140,145 300,185 480,150 C640,120 800,165 960,140 C1120,115 1260,155 1440,135 L1440,280 L0,280 Z"
              fillOpacity="0.65"
            />
          </svg>

          {/* Distant Birds Gliding Across Horizon */}
          <motion.div
            className="absolute top-6 left-1/4 flex items-center gap-6 opacity-30 text-slate-600"
            initial={{ x: -20, y: 10, opacity: 0 }}
            animate={{ x: 60, y: -5, opacity: 0.35 }}
            transition={{ duration: 4.2, ease: 'linear' }}
          >
            <svg width="18" height="12" viewBox="0 0 24 14" fill="currentColor">
              <path d="M0 7 C4 2 8 2 12 7 C16 2 20 2 24 7 C20 4 16 5 12 9 C8 5 4 4 0 7 Z" />
            </svg>
            <svg width="14" height="9" viewBox="0 0 24 14" fill="currentColor" className="-mt-3">
              <path d="M0 7 C4 2 8 2 12 7 C16 2 20 2 24 7 C20 4 16 5 12 9 C8 5 4 4 0 7 Z" />
            </svg>
            <svg width="11" height="7" viewBox="0 0 24 14" fill="currentColor" className="mt-2">
              <path d="M0 7 C4 2 8 2 12 7 C16 2 20 2 24 7 C20 4 16 5 12 9 C8 5 4 4 0 7 Z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* LAYER 2: MIDDLE BACKGROUND (Distant temple gopuram & palm trees) */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
        >
          <svg
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="w-full h-28 sm:h-36 md:h-44 text-brand-navy-900/[0.08]"
            fill="currentColor"
          >
            {/* Left Palm Tree Silhouette Cluster */}
            <path d="M45,220 C52,175 68,140 85,115 C75,108 60,110 50,118 C62,105 76,102 87,108 C80,95 68,90 55,92 C72,85 86,90 92,103 C96,90 105,82 118,80 C110,92 104,102 100,112 C115,105 130,108 140,115 C125,120 110,118 97,120 C90,145 80,180 75,220 Z" />
            <path d="M110,220 C114,185 125,155 138,132 C130,126 118,128 110,134 C120,123 132,120 140,125 C135,114 125,110 115,112 C128,106 140,110 145,121 C152,112 165,108 175,110 C165,118 158,126 153,135 C164,130 176,134 182,140 C170,144 158,142 148,143 C142,165 135,190 130,220 Z" />

            {/* Distant South Indian Temple Gopuram Silhouette (center-right) */}
            <g transform="translate(1040, 45)">
              {/* Kalasham Finials on top */}
              <rect x="58" y="0" width="4" height="12" rx="2" />
              <circle cx="60" cy="2" r="4" />
              <rect x="46" y="4" width="3" height="8" rx="1.5" />
              <rect x="71" y="4" width="3" height="8" rx="1.5" />
              {/* Top Taper Tier 1 */}
              <polygon points="40,12 80,12 76,28 44,28" />
              {/* Tier 2 */}
              <polygon points="36,30 84,30 80,48 40,48" />
              {/* Tier 3 */}
              <polygon points="32,50 88,50 84,70 36,70" />
              {/* Tier 4 */}
              <polygon points="28,72 92,72 88,94 32,94" />
              {/* Base Temple Sanctorum & Mandapa */}
              <rect x="22" y="96" width="76" height="79" />
              <rect x="5" y="125" width="110" height="50" />
              {/* Arched gateway silhouette */}
              <path d="M50,175 C50,145 70,145 70,175 Z" fill="#FAF8F5" fillOpacity="0.4" />
            </g>

            {/* Far Right Coastal Palms */}
            <path d="M1360,220 C1355,180 1345,145 1330,120 C1340,112 1355,114 1365,122 C1352,110 1338,106 1328,112 C1335,100 1348,95 1360,98 C1342,90 1328,95 1322,108 C1318,95 1308,88 1295,85 C1302,98 1308,108 1312,118 C1298,110 1282,112 1272,120 C1288,125 1302,122 1315,125 C1322,150 1332,185 1338,220 Z" />

            {/* Soft ground contour */}
            <path d="M0,205 C350,195 720,212 1080,200 C1240,195 1360,205 1440,198 L1440,220 L0,220 Z" />
          </svg>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* LAYER 3: FOREGROUND ATMOSPHERE (Drifting mist & light motes)      */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          {/* Subtle floating golden motes */}
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-brand-gold-400/40 blur-[0.5px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-brand-sky-400/30 blur-[0.5px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/30 blur-[0.5px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </motion.div>
      </motion.div>

      {/* ===================================================================== */}
      {/* SKIP INTRO BUTTON (Discreet, appears early, instant soft dissolve)     */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={dismissIntro}
            aria-label="Skip website intro animation"
            className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-semibold text-slate-600 hover:text-brand-navy-950 border border-slate-200/90 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-sky-500/40"
          >
            <span>Skip Intro</span>
            <span className="text-brand-sky-600 font-bold">→</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 2. CENTRAL OVERLAPPING STAGE                                          */}
      {/* All elements live on this continuous stage with smooth crossfades     */}
      {/* No sudden unmounting or slideshow-like hard cuts                     */}
      {/* ===================================================================== */}
      <div className="relative z-10 max-w-2xl w-full px-6 flex flex-col items-center justify-center text-center">

        {/* ------------------------------------------------------------------- */}
        {/* PHASE 1: A CALM BEGINNING (0.0s – 1.4s)                            */}
        {/* Soft centered text: "Every Journey Tells a Story"                   */}
        {/* Gently fades out as Phase 2 illuminates without leaving empty space */}
        {/* ------------------------------------------------------------------- */}
        <motion.div
          className="flex flex-col items-center absolute"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: phase === 'calm' ? 1 : 0,
            y: phase === 'calm' ? 0 : -10,
            scale: phase === 'calm' ? 1 : 0.98,
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: phase === 'calm' ? 'auto' : 'none' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky-50/80 border border-brand-sky-200/60 text-brand-sky-800 text-xs font-semibold uppercase tracking-widest mb-3.5 backdrop-blur-xs shadow-xs">
            <Compass className="w-3.5 h-3.5 text-brand-sky-600" />
            <span>Incredible India</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight">
            Every Journey <br />
            <span className="font-semibold text-brand-navy-950">Tells a Story</span>
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent" />
        </motion.div>

        {/* ------------------------------------------------------------------- */}
        {/* PHASE 2: THE ROUTE BEGINS (0.8s – 2.0s)                            */}
        {/* Subtle India peninsula outline + Chennai waypoint + animated curve  */}
        {/* "From Chennai · To Everywhere in India"                             */}
        {/* Crossfades smoothly from Phase 1 and into Phase 3                   */}
        {/* ------------------------------------------------------------------- */}
        <motion.div
          className="flex flex-col items-center absolute w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: phase === 'route' ? 1 : 0,
            scale: phase === 'route' ? 1 : 0.96,
            y: phase === 'route' ? 0 : -8,
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: phase === 'route' ? 'auto' : 'none' }}
        >
          {/* Subtle India outline & Chennai travel curve */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full text-slate-400 drop-shadow-xs overflow-visible"
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

              {/* Animated Journey Curve from Chennai (coords 172, 215) curving northward */}
              <motion.path
                d="M172 215 C160 190 130 175 140 140 C150 105 180 95 150 55"
                stroke="url(#continuousRouteGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase === 'route' ? 1 : 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />

              <defs>
                <linearGradient id="continuousRouteGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>

              {/* Chennai Waypoint Marker */}
              <g transform="translate(172, 215)">
                <circle r="9" className="fill-brand-gold-500/25 animate-ping" />
                <circle r="4.5" className="fill-brand-gold-600 stroke-white stroke-2" />
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

              {/* Moving vehicle / travel beacon */}
              <motion.g
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: phase === 'route' ? '100%' : '0%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{
                  offsetPath: 'path("M172 215 C160 190 130 175 140 140 C150 105 180 95 150 55")',
                }}
              >
                <circle r="5.5" fill="#0284c7" className="shadow-xs" />
                <circle r="2.5" fill="#ffffff" />
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

        {/* ------------------------------------------------------------------- */}
        {/* PHASE 3 & 4: THE ORIGINAL CLIENT LOGO & BRAND REVEAL               */}
        {/* (1.7s onward, smoothly emerging into the center)                    */}
        {/* CRITICAL: Must use the exact original client logo asset directly   */}
        {/* (`public/images/logo/jayashakthi-logo-cropped.png`)                 */}
        {/* Preserves India-map shape, J/S monogram, temple, compass, colors    */}
        {/* ------------------------------------------------------------------- */}
        <motion.div
          className="flex flex-col items-center w-full"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: phase === 'logo' || phase === 'tagline' || phase === 'reveal' ? 1 : 0,
            scale: phase === 'logo' || phase === 'tagline' || phase === 'reveal' ? 1 : 0.94,
            y: phase === 'logo' || phase === 'tagline' || phase === 'reveal' ? 0 : 12,
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            pointerEvents: phase === 'logo' || phase === 'tagline' ? 'auto' : 'none',
          }}
        >
          {/* Logo Frame with Soft Center Ambient Light */}
          <div className="relative group">
            {/* Gentle ambient backlight */}
            <div className="absolute inset-0 -m-6 bg-gradient-to-r from-brand-sky-400/20 via-brand-teal-400/15 to-brand-gold-400/25 rounded-full blur-2xl opacity-75" />

            {/* Original client logo asset container */}
            <div className="relative overflow-hidden rounded-2xl p-2.5 sm:p-3.5 bg-white/45 backdrop-blur-xs border border-white/70 shadow-[0_8px_32px_rgba(2,132,199,0.08)]">
              <img
                src={business.logo}
                alt="Jayashakthi Tours & Travels — Original Logo"
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain filter drop-shadow-[0_4px_16px_rgba(2,132,199,0.18)] select-none pointer-events-none"
              />

              {/* Refined Diagonal Sunlight Sweep across Logo (Phase 'logo' -> 'tagline') */}
              {(phase === 'logo' || phase === 'tagline') && (
                <motion.div
                  initial={{ x: '-120%', opacity: 0 }}
                  animate={{ x: '180%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(115deg, transparent 15%, rgba(254, 243, 199, 0.4) 45%, rgba(125, 211, 252, 0.5) 55%, rgba(94, 234, 212, 0.4) 65%, transparent 85%)',
                    mixBlendMode: 'screen',
                  }}
                />
              )}
            </div>
          </div>

          {/* Brand Name Typography */}
          <div className="mt-4 flex flex-col items-center">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-brand-navy-950 leading-none">
              JAYASHAKTHI
            </h1>
            <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.26em] text-brand-sky-700 uppercase leading-tight mt-1">
              TOURS &amp; TRAVELS
            </span>
          </div>

          {/* Tagline & Final Message with Smooth Cross-Dissolve */}
          <div className="mt-3.5 min-h-[50px] flex items-center justify-center">
            {phase === 'logo' && (
              <motion.p
                key="tagline-1"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs sm:text-sm md:text-base font-medium text-slate-600 tracking-wide flex items-center gap-1.5 justify-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
                <span>Your Journey Across India Starts Here</span>
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
              </motion.p>
            )}

            {(phase === 'tagline' || phase === 'reveal') && (
              <motion.div
                key="tagline-2"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center"
              >
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-light text-slate-800 tracking-tight">
                  Let’s Create{' '}
                  <span className="font-bold bg-gradient-to-r from-brand-sky-700 via-brand-teal-700 to-brand-gold-600 bg-clip-text text-transparent">
                    Brighter Journeys
                  </span>
                </h2>
                <p className="text-[11px] sm:text-xs font-semibold tracking-widest text-slate-500 uppercase mt-1 flex items-center gap-2">
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
          </div>
        </motion.div>
      </div>

      {/* Subtle indicator bar at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-60">
        {(['calm', 'route', 'logo', 'tagline'] as IntroPhase[]).map((p) => {
          const phasesOrder: IntroPhase[] = ['calm', 'route', 'logo', 'tagline'];
          const currentIndex = phasesOrder.indexOf(phase);
          const itemIndex = phasesOrder.indexOf(p);
          const isActive = currentIndex === itemIndex;
          const isPassed = currentIndex > itemIndex;

          return (
            <div
              key={p}
              className={`h-1 rounded-full transition-all duration-500 ${
                isActive
                  ? 'w-7 bg-brand-sky-600'
                  : isPassed
                  ? 'w-2 bg-brand-sky-300'
                  : 'w-1.5 bg-slate-300/60'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
