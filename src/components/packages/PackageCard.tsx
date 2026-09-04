import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock, MapPin, CheckCircle2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { TourPackage } from '../../data/packages';
import { createWhatsAppUrl } from '../../utils/whatsapp';

interface PackageCardProps {
  pkg: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeavingRef = useRef(false);

  const packageWhatsAppMessage = `Hi Jayashakthi Tours & Travels, I'm interested in the ${pkg.title} (${pkg.duration}) tour package. Could you please provide details and availability?`;
  const packageWhatsAppUrl = createWhatsAppUrl(packageWhatsAppMessage);

  // Detect touch devices and prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchQuery = window.matchMedia('(hover: none) or (pointer: coarse)');
      setIsTouchDevice(touchQuery.matches);

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);

      const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
      const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

      touchQuery.addEventListener('change', handleTouchChange);
      motionQuery.addEventListener('change', handleMotionChange);

      return () => {
        touchQuery.removeEventListener('change', handleTouchChange);
        motionQuery.removeEventListener('change', handleMotionChange);
      };
    }
  }, []);

  // Precise cursor tracking with pure CSS custom properties for 60fps compositor performance
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1 relative to center
      const px = (x - rect.width / 2) / (rect.width / 2);
      const py = (y - rect.height / 2) / (rect.height / 2);

      // Elegant, small tilt: 3.5° - 4.5° maximum for a refined, premium feel
      const tiltX = -py * 4.2;
      const tiltY = px * 4.2;

      // Parallax shift offsets
      const shiftX = px * 3.5;
      const shiftY = py * 3.5;

      const style = cardRef.current.style;
      style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
      style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
      style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      style.setProperty('--shift-x', `${shiftX.toFixed(2)}px`);
      style.setProperty('--shift-y', `${shiftY.toFixed(2)}px`);
      style.setProperty('--card-lift', '-6px');
      style.setProperty('--card-scale', '1.025');
    },
    [isTouchDevice, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    isLeavingRef.current = false;
    setIsHovered(true);
  }, [isTouchDevice]);

  // Smooth return animation: effortlessly reset all properties with cubic-bezier spring easing
  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice || !cardRef.current) return;
    isLeavingRef.current = true;
    setIsHovered(false);

    const style = cardRef.current.style;
    style.setProperty('--tilt-x', '0deg');
    style.setProperty('--tilt-y', '0deg');
    style.setProperty('--shift-x', '0px');
    style.setProperty('--shift-y', '0px');
    style.setProperty('--card-lift', '0px');
    style.setProperty('--card-scale', '1');
  }, [isTouchDevice]);

  return (
    <div
      className="relative [perspective:1000px] w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Tiltable Card Shell */}
      <div
        ref={cardRef}
        className={`group rounded-3xl bg-white overflow-hidden border border-slate-200/85 flex flex-col justify-between relative will-change-transform ${
          isHovered
            ? 'z-20 border-brand-sky-300 shadow-[0_22px_42px_-8px_rgba(15,23,42,0.16),0_8px_18px_-4px_rgba(15,23,42,0.08)]'
            : 'z-10 shadow-soft'
        }`}
        style={{
          transform: prefersReducedMotion
            ? undefined
            : 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(var(--card-lift, 0px)) scale(var(--card-scale, 1))',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Cursor-Following Soft Radial Highlight / Sheen Layer */}
        {!isTouchDevice && (
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-500 overflow-hidden"
            style={{
              opacity: isHovered ? 1 : 0,
              background:
                'radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.12) 32%, transparent 68%)',
            }}
          />
        )}

        <div>
          {/* ========================================================= */}
          {/* PARALLAX LAYER 1: Package Image Banner                    */}
          {/* ========================================================= */}
          <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 rounded-t-3xl">
            <img
              src={pkg.imageUrl}
              alt={pkg.title}
              loading="lazy"
              className="w-full h-full object-cover object-center will-change-transform pointer-events-none"
              style={{
                transform:
                  prefersReducedMotion || isTouchDevice
                    ? undefined
                    : 'translate3d(calc(var(--shift-x, 0px) * -1.6), calc(var(--shift-y, 0px) * -1.6), 0) scale(1.08)',
                transition: isHovered
                  ? 'transform 0.15s ease-out'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* ========================================================= */}
            {/* PARALLAX LAYER 2: Badges (Duration & Category)            */}
            {/* ========================================================= */}
            {/* Duration Badge (Top Left) */}
            <div
              className="absolute top-3.5 left-3.5 z-20 pointer-events-none will-change-transform"
              style={{
                transform:
                  prefersReducedMotion || isTouchDevice
                    ? undefined
                    : 'translate3d(calc(var(--shift-x, 0px) * 1.3), calc(var(--shift-y, 0px) * 1.3), 16px)',
                transition: isHovered
                  ? 'transform 0.15s ease-out'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-brand-navy-950 shadow-sm border border-white/60">
                <Clock className="w-3.5 h-3.5 text-brand-teal-600" />
                {pkg.duration}
              </span>
            </div>

            {/* Category Tag (Top Right) */}
            <div
              className="absolute top-3.5 right-3.5 z-20 pointer-events-none will-change-transform"
              style={{
                transform:
                  prefersReducedMotion || isTouchDevice
                    ? undefined
                    : 'translate3d(calc(var(--shift-x, 0px) * 1.3), calc(var(--shift-y, 0px) * 1.3), 16px)',
                transition: isHovered
                  ? 'transform 0.15s ease-out'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="px-2.5 py-0.5 rounded-full bg-brand-sky-600/95 text-white text-[11px] font-semibold tracking-wide shadow-2xs">
                {pkg.category}
              </span>
            </div>

            {/* ========================================================= */}
            {/* PARALLAX LAYER 3: Title & Tagline on Image                */}
            {/* ========================================================= */}
            <div
              className="absolute bottom-3.5 left-4 right-4 text-white z-20 pointer-events-none will-change-transform"
              style={{
                transform:
                  prefersReducedMotion || isTouchDevice
                    ? undefined
                    : 'translate3d(calc(var(--shift-x, 0px) * 0.9), calc(var(--shift-y, 0px) * 0.9), 22px)',
                transition: isHovered
                  ? 'transform 0.15s ease-out'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight drop-shadow-md">
                {pkg.title}
              </h3>
              <p className="text-xs text-slate-200 line-clamp-1 mt-0.5 font-medium drop-shadow-sm">
                {pkg.tagline}
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PARALLAX LAYER 4: Content Body (Destinations & Highlights) */}
          {/* ========================================================= */}
          <div
            className="p-5 sm:p-6 will-change-transform"
            style={{
              transform:
                prefersReducedMotion || isTouchDevice
                  ? undefined
                  : 'translate3d(calc(var(--shift-x, 0px) * 0.45), calc(var(--shift-y, 0px) * 0.45), 10px)',
              transition: isHovered
                ? 'transform 0.15s ease-out'
                : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Key destinations covered */}
            <div className="mb-3">
              <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                <MapPin className="w-3.5 h-3.5 text-brand-sky-600 shrink-0" />
                <span>Destinations Covered:</span>
              </div>
              <p className="text-xs text-brand-navy-900 font-semibold leading-relaxed line-clamp-2">
                {pkg.destinations.join(' • ')}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
              {pkg.description}
            </p>

            {/* Highlights */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Key Places &amp; Highlights:
              </span>
              {pkg.highlights.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>

            {/* Customization Notice */}
            <div className="mt-4 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-medium text-[11px] sm:text-xs">
                Itinerary can be fully customized around your schedule.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PARALLAX LAYER 5: Dual CTA Action Buttons                 */}
        {/* ========================================================= */}
        <div
          className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5 relative z-30 will-change-transform"
          style={{
            transform:
              prefersReducedMotion || isTouchDevice
                ? undefined
                : 'translate3d(calc(var(--shift-x, 0px) * 0.65), calc(var(--shift-y, 0px) * 0.65), 18px)',
            transition: isHovered
              ? 'transform 0.15s ease-out'
              : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <a
            href={`/booking?package=${encodeURIComponent(pkg.title)}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-brand-navy-950 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={packageWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold uppercase tracking-wider shadow-soft hover:shadow-soft-md transition-all duration-200 text-center cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20 shrink-0" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
};
