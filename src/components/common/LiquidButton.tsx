import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'gold' | 'emerald' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  showArrowSwap?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  to,
  href,
  external,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  showArrowSwap = true,
  className = '',
  onClick,
  disabled,
  type = 'button',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchQuery = window.matchMedia('(hover: none) or (pointer: coarse)');
      setIsTouchDevice(touchQuery.matches);
      const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
      touchQuery.addEventListener('change', handleTouchChange);
      return () => touchQuery.removeEventListener('change', handleTouchChange);
    }
  }, []);

  // Variant gradient fills using the established website colors:
  // Sky blue (#0284c7) -> Teal (#0d9488) -> Forest deep green (#047857) -> Muted warm gold (#b45309)
  const variantConfig = {
    primary: {
      gradient: 'linear-gradient(115deg, #0284c7 0%, #0d9488 36%, #047857 70%, #b45309 100%)',
      defaultBorder: 'border-slate-200/90',
      hoverBorder: 'border-brand-teal-400/80',
      defaultBg: 'bg-white/95',
      defaultText: 'text-brand-navy-950',
      hoverText: 'text-white',
      defaultArrow: 'text-brand-sky-700',
      hoverArrow: 'text-amber-200',
      shadow: 'shadow-2xs hover:shadow-[0_10px_25px_-4px_rgba(13,148,136,0.25)]',
    },
    gold: {
      gradient: 'linear-gradient(115deg, #b45309 0%, #d97706 42%, #0d9488 78%, #0369a1 100%)',
      defaultBorder: 'border-amber-200/90',
      hoverBorder: 'border-amber-400/90',
      defaultBg: 'bg-amber-50/40',
      defaultText: 'text-amber-950',
      hoverText: 'text-white',
      defaultArrow: 'text-amber-700',
      hoverArrow: 'text-amber-100',
      shadow: 'shadow-2xs hover:shadow-[0_10px_25px_-4px_rgba(217,119,6,0.25)]',
    },
    emerald: {
      gradient: 'linear-gradient(115deg, #059669 0%, #047857 42%, #065f46 76%, #0d9488 100%)',
      defaultBorder: 'border-emerald-200/90',
      hoverBorder: 'border-emerald-400/90',
      defaultBg: 'bg-emerald-50/40',
      defaultText: 'text-emerald-950',
      hoverText: 'text-white',
      defaultArrow: 'text-emerald-700',
      hoverArrow: 'text-emerald-200',
      shadow: 'shadow-2xs hover:shadow-[0_10px_25px_-4px_rgba(5,150,105,0.25)]',
    },
    secondary: {
      gradient: 'linear-gradient(115deg, #0369a1 0%, #0d9488 45%, #047857 78%, #b45309 100%)',
      defaultBorder: 'border-brand-sky-200/80',
      hoverBorder: 'border-brand-teal-400',
      defaultBg: 'bg-brand-sky-50/50',
      defaultText: 'text-brand-sky-950',
      hoverText: 'text-white',
      defaultArrow: 'text-brand-sky-600',
      hoverArrow: 'text-amber-200',
      shadow: 'shadow-2xs hover:shadow-[0_10px_25px_-4px_rgba(2,132,199,0.20)]',
    },
    subtle: {
      gradient: 'linear-gradient(115deg, #f0fdfa 0%, #e0f2fe 48%, #fef3c7 100%)',
      defaultBorder: 'border-slate-200',
      hoverBorder: 'border-slate-300',
      defaultBg: 'bg-white',
      defaultText: 'text-slate-800',
      hoverText: 'text-brand-navy-950',
      defaultArrow: 'text-slate-500',
      hoverArrow: 'text-brand-sky-700',
      shadow: 'shadow-2xs hover:shadow-xs',
    },
  };

  const currentConfig = variantConfig[variant];

  // Sizing definitions: fixed height and proportional padding
  const sizeConfig = {
    sm: {
      container: 'h-[36px] sm:h-[38px] px-3.5 sm:px-4 text-xs',
      arrowSlot: 'w-4 h-4',
      arrowIcon: 'w-3.5 h-3.5',
    },
    md: {
      container: 'h-[42px] sm:h-[46px] px-5 sm:px-6 text-xs sm:text-sm',
      arrowSlot: 'w-4.5 h-4.5',
      arrowIcon: 'w-4 h-4',
    },
    lg: {
      container: 'h-[48px] sm:h-[54px] px-6 sm:px-8 text-sm sm:text-base font-bold',
      arrowSlot: 'w-5 h-5',
      arrowIcon: 'w-4.5 h-4.5',
    },
  };

  const currentSize = sizeConfig[size];

  const handleMouseEnter = () => {
    if (!isTouchDevice && !disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsHovered(false);
  };

  const outerClasses = [
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold select-none cursor-pointer border',
    'transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky-400 focus-visible:ring-offset-2',
    'active:scale-[0.98] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed',
    currentConfig.defaultBorder,
    isHovered ? currentConfig.hoverBorder : '',
    currentConfig.defaultBg,
    currentConfig.shadow,
    currentSize.container,
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  // The inner content: Symmetrical left & right arrow slots ensure the center text remains 100% stationary
  const buttonContent = (
    <>
      {/* Liquid Gradient Flowing Background Layer */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: currentConfig.gradient,
          transform: isHovered ? 'translateX(0%)' : 'translateX(-102%)',
        }}
      />

      {/* Button Content with Fixed Symmetrical Slots to Prevent Text Jump */}
      <span className="relative z-10 flex items-center justify-between w-full h-full gap-1.5 sm:gap-2">
        {/* Left Arrow Slot: Incoming Left Arrow (←) */}
        {showArrowSwap && (
          <span
            className={`${currentSize.arrowSlot} flex items-center justify-center shrink-0 overflow-hidden`}
          >
            <ArrowLeft
              className={`${currentSize.arrowIcon} stroke-[2.4] will-change-transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-6 opacity-0'
              } ${currentConfig.hoverArrow}`}
            />
          </span>
        )}

        {/* Center Text: Stays Rock-Solid in Place (Zero Jump / Zero Shift) */}
        <span
          className={`flex-1 text-center font-bold tracking-wide transition-colors duration-400 ease-out whitespace-nowrap drop-shadow-2xs ${
            isHovered ? currentConfig.hoverText : currentConfig.defaultText
          }`}
        >
          {children}
        </span>

        {/* Right Arrow Slot: Outgoing Right Arrow (→) */}
        {showArrowSwap && (
          <span
            className={`${currentSize.arrowSlot} flex items-center justify-center shrink-0 overflow-hidden`}
          >
            <ArrowRight
              className={`${currentSize.arrowIcon} stroke-[2.4] will-change-transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? 'translate-x-6 opacity-0'
                  : 'translate-x-0 opacity-100'
              } ${currentConfig.defaultArrow}`}
            />
          </span>
        )}
      </span>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={outerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={outerClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={outerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default LiquidButton;
