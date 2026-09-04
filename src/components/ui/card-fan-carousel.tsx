"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  title?: string;
  caption?: string;
  onClick?: () => void;
}

interface SocialCardsProps {
  cards: CardItem[];
  autoPlaySpeed?: number; // Positions advanced per second (e.g. 0.62)
}

interface ResponsiveConfig {
  spacingX: number;
  maxY: number;
  maxRot: number;
  rem: number;
}

function getResponsiveConfig(): ResponsiveConfig {
  if (typeof window === "undefined") {
    return {
      spacingX: 255,
      maxY: 68,
      maxRot: 5.5,
      rem: 16,
    };
  }
  const w = window.innerWidth;
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

  if (w < 480) {
    // Mobile phones: tighter spacing, prominent center
    return {
      spacingX: Math.min(140, w * 0.35),
      maxY: 42,
      maxRot: 4.2,
      rem,
    };
  }
  if (w < 640) {
    return {
      spacingX: 175,
      maxY: 50,
      maxRot: 4.8,
      rem,
    };
  }
  if (w < 768) {
    return {
      spacingX: 205,
      maxY: 56,
      maxRot: 5.2,
      rem,
    };
  }
  if (w < 1024) {
    // Tablet
    return {
      spacingX: 230,
      maxY: 62,
      maxRot: 5.5,
      rem,
    };
  }
  if (w < 1280) {
    // Standard Desktop
    return {
      spacingX: 255,
      maxY: 68,
      maxRot: 5.5,
      rem,
    };
  }
  // Large Desktop
  return {
    spacingX: 285,
    maxY: 74,
    maxRot: 5.8,
    rem,
  };
}

export default function SocialCards({ cards, autoPlaySpeed = 0.58 }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Ensure minimum 10 cards on the continuous loop track so the arc is always populated
  const conveyorCards = useMemo(() => {
    if (!cards || cards.length === 0) return [];
    if (cards.length >= 10) return cards;
    const repeated: CardItem[] = [];
    while (repeated.length < 10) {
      repeated.push(...cards);
    }
    return repeated;
  }, [cards]);

  const totalCards = conveyorCards.length;

  // Continuous conveyor progress: P increases continuously so cards move Left -> Center -> Right
  const progressRef = useRef(0);
  const isPausedRef = useRef(false);
  const isTweeningRef = useRef(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Touch gesture handling
  const touchStartXRef = useRef<number | null>(null);
  const isTouchingRef = useRef(false);

  // Active dot indicator state (only updated when central card index changes)
  const [activeCenterIndex, setActiveCenterIndex] = useState(0);
  const lastCenterIdxRef = useRef(0);

  // Config ref updated on window resize
  const configRef = useRef<ResponsiveConfig>(getResponsiveConfig());

  useEffect(() => {
    const handleResize = () => {
      configRef.current = getResponsiveConfig();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main 60fps continuous animation engine
  useEffect(() => {
    if (totalCards === 0) return;

    let isRunning = true;
    let lastTime = performance.now();
    let animId: number | null = null;

    const renderTick = (now: number) => {
      if (!isRunning) return;

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Automatically advance conveyor if not paused by mouse hover, touch, or active button tween
      if (!isPausedRef.current && !isTouchingRef.current && !isTweeningRef.current) {
        progressRef.current += autoPlaySpeed * delta;
      }

      const P = progressRef.current;
      const config = configRef.current;
      const hoveredIdx = hoveredIndexRef.current;
      const { spacingX, maxY, maxRot, rem } = config;

      let closestIndex = 0;
      let minDistanceToCenter = Infinity;

      // Render each card along the continuous semi-circular arc
      for (let i = 0; i < totalCards; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // Position u along the arc:
        // u = 0 is center (peak of arc)
        // u < 0 is left side (entering from outer left)
        // u > 0 is right side (traveling toward outer right)
        let rawPos = ((i + P) % totalCards + totalCards) % totalCards;
        let u = rawPos;
        if (u > totalCards / 2) {
          u -= totalCards;
        }

        const absU = Math.abs(u);

        if (absU < minDistanceToCenter) {
          minDistanceToCenter = absU;
          closestIndex = i;
        }

        // Invisible cards recycling behind the scene
        if (absU > 3.0) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          el.style.visibility = "hidden";
          continue;
        }

        el.style.visibility = "visible";

        // 1. Horizontal position along the arc
        const x = u * spacingX * (1 - 0.05 * absU);

        // 2. Vertical position along the arc:
        // Center (u = 0) is at y = 0 (highest peak of arc).
        // Side cards sit lower down (y > 0 in screen coordinates).
        let y = Math.pow(absU / 2.0, 1.8) * maxY;

        // 3. Card Scale:
        // Center (u = 0) -> 1.06 (largest, most prominent)
        // Inner (u = ±1) -> ~0.94
        // Outer (u = ±2) -> ~0.80
        // Far edge (u = ±2.8) -> ~0.65
        let scale = Math.max(0.62, 1.06 - 0.08 * absU - 0.03 * (absU * absU));

        // 4. Rotation:
        // Left side: negative rotation (-11deg)
        // Center: 0deg (straight toward viewer)
        // Right side: positive rotation (+11deg)
        let rot = u * maxRot;

        // 5. Z-Index: Center is highest in stacking order
        let zIndex = Math.max(1, Math.round(30 - 8 * absU));

        // 6. Seamless recycling opacity:
        // Cards are fully visible up to absU = 1.9, then fade gracefully to 0 at edges
        let opacity = 1.0;
        if (absU > 1.9) {
          opacity = Math.max(0, (2.8 - absU) / 0.9);
        }

        // HOVER INTERACTION: "POP" forward when mouse hovers over this card
        if (hoveredIdx !== null) {
          if (hoveredIdx === i) {
            scale *= 1.10; // Pop forward ~10%
            y -= 1.2 * rem; // Lift upward
            rot *= 0.3; // Straighten gently
            zIndex = 60;
            opacity = 1;
            el.style.boxShadow =
              "0 26px 54px -8px rgba(15, 23, 42, 0.28), 0 10px 22px -3px rgba(15, 23, 42, 0.12)";
          } else {
            // Non-hovered cards are slightly subdued
            opacity *= 0.84;
            el.style.boxShadow =
              "0 12px 28px -6px rgba(15, 23, 42, 0.14), 0 3px 8px -2px rgba(15, 23, 42, 0.06)";
          }
        } else {
          // Standard soft warm elevation shadow
          el.style.boxShadow =
            "0 14px 32px -6px rgba(15, 23, 42, 0.16), 0 4px 10px -2px rgba(15, 23, 42, 0.08)";
        }

        // Apply hardware-accelerated CSS transforms directly
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = opacity.toFixed(3);
        el.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
      }

      // Map central card to original cards array for pagination dots
      const realCenterIndex = ((totalCards - (Math.round(P) % totalCards)) % totalCards + totalCards) % totalCards;
      const dotIndex = realCenterIndex % cards.length;
      if (dotIndex !== lastCenterIdxRef.current) {
        lastCenterIdxRef.current = dotIndex;
        setActiveCenterIndex(dotIndex);
      }

      animId = requestAnimationFrame(renderTick);
    };

    lastTime = performance.now();
    animId = requestAnimationFrame(renderTick);

    return () => {
      isRunning = false;
      if (animId !== null) cancelAnimationFrame(animId);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [totalCards, cards.length, autoPlaySpeed]);

  // Manual Advance: Clicking Next / Prev arrows advances the carousel by 1 position smoothly
  const cycle = useCallback((direction: "left" | "right") => {
    if (totalCards === 0) return;
    const currentP = progressRef.current;
    // When moving right (Next card), P increases by 1; when moving left (Prev card), P decreases by 1
    const step = direction === "right" ? 1 : -1;
    const targetP = Math.round(currentP) + step;

    if (tweenRef.current) tweenRef.current.kill();
    isTweeningRef.current = true;

    tweenRef.current = gsap.to(progressRef, {
      current: targetP,
      duration: 0.65,
      ease: "power2.out",
      onComplete: () => {
        isTweeningRef.current = false;
      },
    });
  }, [totalCards]);

  // Click dot to smoothly glide specific card to the center
  const goToCard = useCallback((cardIndex: number) => {
    if (totalCards === 0) return;
    const currentP = progressRef.current;
    const desiredBase = (totalCards - (cardIndex % totalCards)) % totalCards;
    const currentBase = ((Math.round(currentP) % totalCards) + totalCards) % totalCards;

    let diff = desiredBase - currentBase;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;

    const targetP = Math.round(currentP) + diff;

    if (tweenRef.current) tweenRef.current.kill();
    isTweeningRef.current = true;

    tweenRef.current = gsap.to(progressRef, {
      current: targetP,
      duration: 0.75,
      ease: "power2.out",
      onComplete: () => {
        isTweeningRef.current = false;
      },
    });
  }, [totalCards]);

  // Mouse hover handlers: Pause motion & pop card forward
  const handleMouseEnterCard = useCallback((index: number) => {
    hoveredIndexRef.current = index;
    isPausedRef.current = true;
  }, []);

  const handleMouseLeaveCard = useCallback(() => {
    hoveredIndexRef.current = null;
    isPausedRef.current = false;
  }, []);

  // Touch drag / swipe handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isTouchingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || !isTouchingRef.current) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartXRef.current;
    touchStartXRef.current = currentX;

    const dragFactor = (diffX / window.innerWidth) * 2.2;
    progressRef.current -= dragFactor;
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    isTouchingRef.current = false;
  };

  if (!cards || cards.length === 0) return null;

  return (
    <section className="flex flex-col items-center w-full py-2 lg:py-6 px-4 md:px-8 relative z-20 overflow-hidden select-none">
      {/* Semi-Circle Arc Carousel Viewport */}
      <div
        className="flex items-center justify-center w-full max-w-[92rem]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredIndexRef.current = null;
          isPausedRef.current = false;
        }}
      >
        <div
          ref={containerRef}
          className="fan-layout relative w-full max-w-[85rem]"
        >
          {conveyorCards.map((card, index) => {
            const cardContent = (
              <div className="relative w-full h-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[1.75rem] bg-slate-900 group">
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || card.title || `Travel photo ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                />

                {/* Subtle dark gradient overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-20 pointer-events-none" />

                {/* Card Location & Title Information */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none">
                  {(card.title || card.alt) && (
                    <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 drop-shadow" />
                      <p className="text-white text-xs sm:text-sm font-bold tracking-tight drop-shadow-md line-clamp-1">
                        {card.title || card.alt}
                      </p>
                    </div>
                  )}
                  {card.caption && (
                    <p className="text-white/80 text-[10px] sm:text-xs line-clamp-1 font-medium drop-shadow">
                      {card.caption}
                    </p>
                  )}
                </div>
              </div>
            );

            const commonProps = {
              ref: (el: HTMLElement | null) => {
                cardRefs.current[index] = el;
              },
              onMouseEnter: () => handleMouseEnterCard(index),
              onMouseLeave: handleMouseLeaveCard,
              onClick: card.onClick,
              className: "fan-card block cursor-pointer select-none",
            };

            return card.linkUrl ? (
              <a
                key={index}
                href={card.linkUrl}
                target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                {...commonProps}
              >
                {cardContent}
              </a>
            ) : (
              <div key={index} {...commonProps}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* Refined, Compact Navigation Controls & Subtle Dot Indicators */}
      <div className="flex items-center justify-center gap-5 mt-6 sm:mt-8 z-30">
        {/* Compact Previous Button with Subtle Liquid Gradient Fill */}
        <button
          type="button"
          onClick={() => cycle("left")}
          aria-label="Previous photograph"
          className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-slate-200/90 shadow-2xs hover:shadow-soft flex items-center justify-center text-slate-700 transition-all active:scale-95 cursor-pointer"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-[102%] group-hover:translate-x-0 bg-gradient-to-r from-brand-sky-600 via-brand-teal-600 to-emerald-600" />
          <ChevronLeft className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-white stroke-[2.2]" />
        </button>

        {/* Elegant Dot Indicators */}
        <div className="flex items-center gap-2 px-1">
          {cards.slice(0, Math.min(cards.length, 12)).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToCard(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="py-2 px-0.5 group cursor-pointer focus:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === activeCenterIndex
                    ? "w-5 bg-brand-sky-600 shadow-2xs"
                    : "w-1.5 bg-slate-300 group-hover:bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Compact Next Button with Subtle Liquid Gradient Fill */}
        <button
          type="button"
          onClick={() => cycle("right")}
          aria-label="Next photograph"
          className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-slate-200/90 shadow-2xs hover:shadow-soft flex items-center justify-center text-slate-700 transition-all active:scale-95 cursor-pointer"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-[102%] group-hover:translate-x-0 bg-gradient-to-r from-brand-sky-600 via-brand-teal-600 to-emerald-600" />
          <ChevronRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white stroke-[2.2]" />
        </button>
      </div>
    </section>
  );
}

export { SocialCards, SocialCards as CardFanCarousel };
