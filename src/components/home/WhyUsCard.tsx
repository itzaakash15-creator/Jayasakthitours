import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface WhyUsPillar {
  id: string;
  title: string;
  desc: string;
  badge: string;
  highlights: string[];
  iconType: 'planning' | 'coordination' | 'knowledge' | 'service';
}

interface WhyUsCardProps {
  pillar: WhyUsPillar;
  index: number;
  activeHoveredIndex: number | null;
  setActiveHoveredIndex: (index: number | null) => void;
}

export const WhyUsCard: React.FC<WhyUsCardProps> = ({
  pillar,
  index,
  activeHoveredIndex,
  setActiveHoveredIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check touch and reduced-motion preferences
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

  // 1. Magnetic Attraction & 2. Spotlight tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Magnetic pull offset: subtle 2px - 6px towards cursor
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const pullX = ((x - centerX) / centerX) * 5.5;
      const pullY = ((y - centerY) / centerY) * 5.5;

      const style = cardRef.current.style;
      style.setProperty('--spot-x', `${x.toFixed(1)}px`);
      style.setProperty('--spot-y', `${y.toFixed(1)}px`);
      style.setProperty('--mag-x', `${pullX.toFixed(2)}px`);
      style.setProperty('--mag-y', `${pullY.toFixed(2)}px`);
    },
    [isTouchDevice, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    setActiveHoveredIndex(index);
  }, [index, isTouchDevice, setActiveHoveredIndex]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice || !cardRef.current) return;
    setIsHovered(false);
    setActiveHoveredIndex(null);

    const style = cardRef.current.style;
    style.setProperty('--mag-x', '0px');
    style.setProperty('--mag-y', '0px');
  }, [isTouchDevice, setActiveHoveredIndex]);

  // Mobile tap toggle
  const handleMobileTap = () => {
    if (isTouchDevice) {
      setIsHovered(!isHovered);
    }
  };

  // Group-level visual emphasis: if another card is hovered, slightly subdue this card
  const isAnotherHovered = activeHoveredIndex !== null && activeHoveredIndex !== index;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileTap}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group relative rounded-3xl p-6 sm:p-7 bg-white border transition-all duration-400 ease-out cursor-pointer select-none flex flex-col justify-between overflow-hidden will-change-transform focus:outline-none focus:ring-2 focus:ring-brand-sky-400 ${
        isHovered
          ? 'z-20 border-brand-sky-300/90 shadow-[0_20px_35px_-8px_rgba(15,23,42,0.12),0_8px_16px_-4px_rgba(15,23,42,0.06)]'
          : 'z-10 border-slate-200/80 shadow-soft'
      } ${isAnotherHovered ? 'opacity-90 scale-[0.99]' : 'opacity-100'}`}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : isHovered
          ? 'translate3d(var(--mag-x, 0px), calc(var(--mag-y, 0px) - 6px), 0) scale(1.022)'
          : 'translate3d(0px, 0px, 0) scale(1)',
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease, opacity 0.3s ease',
      }}
    >
      {/* ========================================================= */}
      {/* 2. CURSOR SPOTLIGHT EFFECT (Soft Gradient Surface Sheen)  */}
      {/* ========================================================= */}
      {!isTouchDevice && (
        <>
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 overflow-hidden"
            style={{
              opacity: isHovered ? 1 : 0,
              background:
                'radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(14, 165, 233, 0.08), rgba(20, 184, 166, 0.04) 40%, transparent 70%)',
            }}
          />
          {/* Subtle perimeter border illumination near cursor */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 border border-brand-sky-400/50"
            style={{
              opacity: isHovered ? 1 : 0,
              maskImage:
                'radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), black 30%, transparent 80%)',
              WebkitMaskImage:
                'radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), black 30%, transparent 80%)',
            }}
          />
        </>
      )}

      {/* Card Content Top Section */}
      <div className="relative z-10">
        {/* Header Badge & Unique Animated Icon */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Icon Box with Unique Micro-Animation */}
          <div
            className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
              isHovered
                ? 'bg-gradient-to-br from-brand-sky-50 to-brand-teal-50/60 border-brand-sky-200/80 shadow-2xs scale-105'
                : 'bg-slate-50 border-slate-100 shadow-2xs'
            }`}
          >
            <PillarMicroIcon iconType={pillar.iconType} isHovered={isHovered} />
          </div>

          {/* Pillar Category Badge */}
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 border ${
              isHovered
                ? 'bg-brand-sky-50 text-brand-sky-800 border-brand-sky-200 shadow-2xs'
                : 'bg-slate-100/80 text-slate-600 border-slate-200/60'
            }`}
          >
            {pillar.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-brand-navy-950 mb-2.5 tracking-tight group-hover:text-brand-sky-800 transition-colors">
          {pillar.title}
        </h3>

        {/* Primary Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {pillar.desc}
        </p>

        {/* ========================================================= */}
        {/* 4. PROGRESSIVE INFORMATION REVEAL                         */}
        {/* ========================================================= */}
        <div
          className={`grid transition-all duration-400 ease-out overflow-hidden ${
            isHovered
              ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-slate-100'
              : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold uppercase tracking-wider text-brand-sky-700 mb-2">
              Key Advantages:
            </p>
            <ul className="space-y-1.5">
              {pillar.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-700 font-medium transition-transform duration-300"
                  style={{
                    transform: isHovered ? 'translateX(0)' : 'translateX(-4px)',
                    transitionDelay: `${idx * 40}ms`,
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Subtle indicator prompt for mobile users */}
      {isTouchDevice && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-sky-700 font-semibold">
          <span>{isHovered ? 'Tap to close details' : 'Tap to reveal details'}</span>
          <span className="text-slate-400 text-xs">{isHovered ? '▲' : '▼'}</span>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// 5. UNIQUE ICON MICRO-ANIMATIONS
// =============================================================================

interface PillarMicroIconProps {
  iconType: WhyUsPillar['iconType'];
  isHovered: boolean;
}

const PillarMicroIcon: React.FC<PillarMicroIconProps> = ({ iconType, isHovered }) => {
  switch (iconType) {
    // 1. Personalized Travel Planning: Mini route draws itself with moving waypoint dot
    case 'planning':
      return (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-brand-sky-600 stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Calendar outline */}
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />

            {/* Micro Route Path drawn on hover */}
            <path
              d="M7 15 Q11 12 13 16 T18 14"
              className={`transition-all duration-700 ease-in-out ${
                isHovered ? 'stroke-brand-teal-600 stroke-[2.5]' : 'opacity-40'
              }`}
              strokeDasharray="24"
              strokeDashoffset={isHovered ? '0' : '24'}
            />
          </svg>

          {/* Animated Waypoint Dot travelling along route */}
          <div
            className={`absolute w-2 h-2 rounded-full bg-brand-sky-500 shadow-2xs transition-all duration-700 ease-out pointer-events-none ${
              isHovered
                ? 'opacity-100 translate-x-2.5 -translate-y-0.5 scale-110'
                : 'opacity-0 -translate-x-2 translate-y-1 scale-75'
            }`}
          />
        </div>
      );

    // 2. Complete Travel Coordination: Connected multi-layers gently shift and align
    case 'coordination':
      return (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-brand-teal-600 stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bottom layer */}
            <polygon
              points="12 2 2 7 12 12 22 7 12 2"
              className={`transition-transform duration-500 ${
                isHovered ? 'translate-y-0.5' : ''
              }`}
            />
            {/* Middle layer */}
            <polyline
              points="2 17 12 22 22 17"
              className={`transition-transform duration-500 ${
                isHovered ? 'translate-y-0' : ''
              }`}
            />
            {/* Top layer */}
            <polyline
              points="2 12 12 17 22 12"
              className={`transition-transform duration-500 ${
                isHovered ? '-translate-y-0.5 stroke-brand-sky-600' : ''
              }`}
            />
          </svg>
        </div>
      );

    // 3. Local Travel Knowledge: Compass needle gently sweeps and settles
    case 'knowledge':
      return (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-brand-gold-600 stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Compass Dial */}
            <circle cx="12" cy="12" r="10" />

            {/* Compass Needle with gentle deflection animation on hover */}
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
              className={`origin-center transition-transform duration-600 ease-out fill-brand-gold-500/20 ${
                isHovered ? 'rotate-[38deg]' : 'rotate-0'
              }`}
            />
          </svg>

          {/* Soft discovery pulse ring */}
          <div
            className={`absolute inset-0 rounded-full border border-brand-gold-400/40 pointer-events-none transition-all duration-700 ${
              isHovered ? 'scale-125 opacity-100' : 'scale-90 opacity-0'
            }`}
          />
        </div>
      );

    // 4. Customer-Focused Service: Heartfelt care with gentle pulse & soft expanding ripple
    case 'service':
      return (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`w-6 h-6 text-brand-sky-600 stroke-current transition-transform duration-400 ease-out ${
              isHovered ? 'scale-115 stroke-brand-teal-600' : 'scale-100'
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Heart / Hands of care icon */}
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>

          {/* Soft Expanding Ripple */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-brand-sky-400/40 pointer-events-none transition-all duration-600 ease-out ${
              isHovered ? 'scale-135 opacity-0' : 'scale-75 opacity-70'
            }`}
          />
        </div>
      );

    default:
      return null;
  }
};
