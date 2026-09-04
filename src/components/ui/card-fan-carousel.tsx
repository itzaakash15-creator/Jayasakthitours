"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

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
  autoPlaySpeed?: number; // Normalized cycle speed
}

export default function SocialCards({ cards, autoPlaySpeed = 0.024 }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Expand small arrays so the continuous semi-circle arc is always lush and seamless
  const normalizedCards = useMemo(() => {
    if (!cards || cards.length === 0) return [];
    if (cards.length >= 7) return cards;
    // Repeat items to ensure minimum 7-9 cards for continuous arc curvature
    const repeated: CardItem[] = [];
    while (repeated.length < 8) {
      repeated.push(...cards);
    }
    return repeated;
  }, [cards]);

  const totalCards = normalizedCards.length;

  // Animation state stored in refs to prevent React re-renders on every frame (60fps performance)
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const lastActiveIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Touch/drag handling refs
  const touchStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // Active center index for pagination dots (updated only when center card changes)
  const [activeCenterIndex, setActiveCenterIndex] = useState(0);

  // Dimensions & responsive parameters
  const getResponsiveParams = useCallback(() => {
    if (typeof window === "undefined") {
      return { rx: 560, ry: 64, span: 0.44, rot: 11, rem: 16 };
    }
    const w = window.innerWidth;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

    if (w < 480) {
      // Mobile: tighter radius, prominent center
      return { rx: w * 0.44, ry: 28, span: 0.36, rot: 7, rem };
    }
    if (w < 640) {
      return { rx: w * 0.46, ry: 36, span: 0.38, rot: 8, rem };
    }
    if (w < 768) {
      // Small tablet
      return { rx: 340, ry: 48, span: 0.40, rot: 9, rem };
    }
    if (w < 1024) {
      // Tablet
      return { rx: 440, ry: 56, span: 0.42, rot: 10, rem };
    }
    if (w < 1280) {
      // Laptop / Desktop
      return { rx: 540, ry: 68, span: 0.44, rot: 11, rem };
    }
    // Large Desktop
    return { rx: 620, ry: 76, span: 0.45, rot: 11.5, rem };
  }, []);

  const paramsRef = useRef(getResponsiveParams());

  useEffect(() => {
    const handleResize = () => {
      paramsRef.current = getResponsiveParams();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getResponsiveParams]);

  // Main 60fps render loop
  useEffect(() => {
    if (totalCards === 0) return;

    let isRunning = true;

    const renderLoop = (now: number) => {
      if (!isRunning) return;

      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      // Advance automatic progression if not paused by hover or drag
      if (!isPausedRef.current && !isDraggingRef.current) {
        targetOffsetRef.current += (autoPlaySpeed / totalCards) * delta;
      }

      // Smooth interpolation towards target offset
      const lerpSpeed = isDraggingRef.current ? 0.35 : 0.08;
      offsetRef.current += (targetOffsetRef.current - offsetRef.current) * Math.min(1, lerpSpeed * (delta * 60));

      const currentOffset = offsetRef.current;
      const { rx, ry, span, rot: maxRot, rem } = paramsRef.current;
      const hoveredIdx = hoveredIndexRef.current;

      let closestIndex = 0;
      let minDistance = Infinity;

      // Update positions along horizontal semi-circle arc for each card
      for (let i = 0; i < totalCards; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // Normalized relative distance d from arc center in range [-0.5, 0.5]
        let d = ((i / totalCards - currentOffset) % 1 + 1) % 1 - 0.5;

        const absD = Math.abs(d);
        if (absD < minDistance) {
          minDistance = absD;
          closestIndex = i;
        }

        // Normalized arc coordinate u in [-1, 1] within visible span
        const u = d / span;
        const absU = Math.abs(u);

        // Cards outside the visible arc are smoothly hidden and non-interactive
        if (absU > 1.1) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          el.style.visibility = "hidden";
          continue;
        }

        el.style.visibility = "visible";

        // Semi-circular horizontal & vertical coordinates
        const angle = u * Math.PI * 0.44;
        let x = rx * Math.sin(angle);
        let y = ry * (1 - Math.cos(angle));

        // Scale: center card is noticeably larger (~1.12x), sides taper naturally to ~0.78x
        let scale = 1.12 - 0.34 * (u * u);

        // Rotation: subtle fan tilt following the arc while keeping cards facing viewer
        let rot = u * maxRot;

        // Z-Index: center is closest (depth order)
        let zIndex = Math.round(30 * (1 - absU)) + 1;

        // Edge fade: smoothly transition opacity as cards enter and exit the arc
        let opacity = 1;
        if (absU > 0.78) {
          opacity = Math.max(0, (1.08 - absU) / 0.30);
        }

        // HOVER INTERACTION: "POP" forward when mouse hovers over this card
        if (hoveredIdx !== null) {
          if (hoveredIdx === i) {
            // Hovered card pops forward with extra scale, lift, and front z-index
            scale *= 1.10;
            y -= 1.4 * rem; // Lift upward/forward
            rot *= 0.4;     // Gently straighten facing the viewer
            zIndex = 60;
            opacity = 1;
            el.style.boxShadow =
              "0 26px 54px -8px rgba(15, 23, 42, 0.28), 0 10px 22px -3px rgba(15, 23, 42, 0.12)";
          } else {
            // Non-hovered cards remain visible but slightly subdued
            opacity *= 0.82;
            el.style.boxShadow =
              "0 12px 28px -6px rgba(15, 23, 42, 0.14), 0 3px 8px -2px rgba(15, 23, 42, 0.06)";
          }
        } else {
          // Standard elegant shadow
          el.style.boxShadow =
            "0 14px 32px -6px rgba(15, 23, 42, 0.16), 0 4px 10px -2px rgba(15, 23, 42, 0.08)";
        }

        // Hardware-accelerated CSS transform
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = opacity.toFixed(3);
        el.style.pointerEvents = opacity > 0.3 ? "auto" : "none";
      }

      // Update active center index for dots without spamming React state
      const actualCenterIdx = closestIndex % cards.length;
      if (actualCenterIdx !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = actualCenterIdx;
        setActiveCenterIndex(actualCenterIdx);
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [totalCards, cards.length, autoPlaySpeed]);

  // Navigate to next / previous card along the arc
  const cycle = useCallback((direction: "left" | "right") => {
    if (totalCards === 0) return;
    const step = 1 / totalCards;
    targetOffsetRef.current += direction === "right" ? step : -step;
  }, [totalCards]);

  // Click dot to navigate specific card to center
  const goToCard = useCallback((cardIndex: number) => {
    if (totalCards === 0) return;
    // Find closest index matching cardIndex
    const currentOffset = offsetRef.current;
    let bestDelta = Infinity;
    let bestStep = 0;

    for (let i = 0; i < totalCards; i++) {
      if (i % cards.length === cardIndex) {
        let d = ((i / totalCards - currentOffset) % 1 + 1) % 1 - 0.5;
        if (Math.abs(d) < Math.abs(bestDelta)) {
          bestDelta = d;
          bestStep = d;
        }
      }
    }

    targetOffsetRef.current += bestStep;
  }, [totalCards, cards.length]);

  // Mouse hover handlers
  const handleMouseEnterCard = useCallback((index: number) => {
    hoveredIndexRef.current = index;
    isPausedRef.current = true;
  }, []);

  const handleMouseLeaveCard = useCallback(() => {
    hoveredIndexRef.current = null;
    isPausedRef.current = false;
  }, []);

  // Touch drag / swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    isPausedRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || !isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartXRef.current;
    touchStartXRef.current = currentX;

    const dragFactor = (diffX / window.innerWidth) * 0.75;
    targetOffsetRef.current -= dragFactor;
    offsetRef.current -= dragFactor;
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    isDraggingRef.current = false;
    // Resume auto play after gentle pause
    setTimeout(() => {
      if (!isDraggingRef.current) {
        isPausedRef.current = false;
      }
    }, 400);
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
      >
        <div
          ref={containerRef}
          className="fan-layout flex relative justify-center items-center w-full max-w-[85rem]"
        >
          {normalizedCards.map((card, index) => {
            const cardContent = (
              <div className="relative w-full h-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[1.75rem] bg-slate-900 group">
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || card.title || `Gallery image ${index + 1}`}
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
        {/* Compact Previous Button */}
        <button
          type="button"
          onClick={() => cycle("left")}
          aria-label="Previous photograph"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-sm flex items-center justify-center text-slate-700 hover:text-brand-navy-950 transition-all active:scale-95 group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 stroke-[2.2]" />
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

        {/* Compact Next Button */}
        <button
          type="button"
          onClick={() => cycle("right")}
          aria-label="Next photograph"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-sm flex items-center justify-center text-slate-700 hover:text-brand-navy-950 transition-all active:scale-95 group cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 stroke-[2.2]" />
        </button>
      </div>
    </section>
  );
}

export { SocialCards, SocialCards as CardFanCarousel };
