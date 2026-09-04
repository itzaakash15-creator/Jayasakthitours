// components/animated-nav-framer.tsx
"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { Navigation, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Tours", href: "#tours" },
  { name: "Gallery", href: "#gallery" },
  { name: "Why Us", href: "#why-us" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    }
  },
};

export interface AnimatedNavFramerProps {
  items?: NavItem[];
  className?: string;
  isFloating?: boolean;
}

export function AnimatedNavFramer({
  items = defaultNavItems,
  className,
  isFloating = true,
}: AnimatedNavFramerProps) {
  const [isExpanded, setExpanded] = React.useState(true);
  
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest; 
    } 
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    
    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const navContent = (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      whileHover={!isExpanded ? { scale: 1.1 } : {}}
      whileTap={!isExpanded ? { scale: 0.95 } : {}}
      onClick={handleNavClick}
      className={cn(
        "flex items-center overflow-hidden rounded-full border border-slate-200/90 bg-white/90 shadow-md backdrop-blur-md h-11 sm:h-12 transition-colors",
        !isExpanded && "cursor-pointer justify-center shadow-lg bg-white",
        className
      )}
    >
      <motion.div
        variants={logoVariants}
        className="flex-shrink-0 flex items-center font-semibold pl-3 sm:pl-4 pr-1 sm:pr-2 text-brand-sky-700"
      >
        <Navigation className="h-5 w-5 sm:h-6 sm:w-6" />
      </motion.div>
      
      <motion.div
        className={cn(
          "flex items-center gap-0.5 sm:gap-1 lg:gap-2 pr-3 sm:pr-4",
          !isExpanded && "pointer-events-none"
        )}
      >
        {items.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            variants={itemVariants}
            onClick={(e) => {
              e.stopPropagation();
              if (item.onClick) {
                item.onClick(e);
              }
            }}
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-sky-700 hover:bg-slate-50 transition-colors px-2.5 py-1.5 rounded-lg"
          >
            {item.name}
          </motion.a>
        ))}
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          variants={collapsedIconVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          className="text-slate-800"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.div>
      </div>
    </motion.nav>
  );

  if (!isFloating) {
    return navContent;
  }

  return (
    <div className="fixed top-5 sm:top-6 left-1/2 -translate-x-1/2 z-50">
      {navContent}
    </div>
  );
}

export default AnimatedNavFramer;
