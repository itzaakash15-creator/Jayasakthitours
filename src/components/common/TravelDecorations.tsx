import React from 'react';

interface DecorationProps {
  className?: string;
  opacity?: string;
}

/**
 * Minimal mountain contour sketch with subtle flying birds
 * Perfect for section corners or side edges (Home, Tours, Contact)
 */
export const MountainContourSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.05]',
}) => (
  <svg
    viewBox="0 0 340 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Far rolling peaks */}
    <path
      d="M10 160 C55 120 90 135 130 95 C170 55 205 85 240 60 C275 35 305 65 330 80"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="4 3"
      vectorEffect="non-scaling-stroke"
    />
    {/* Foreground mountain crest */}
    <path
      d="M0 175 C40 145 80 160 115 130 C150 100 190 125 225 90 C260 55 295 95 340 85"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    {/* Winding mountain road curve */}
    <path
      d="M40 178 C90 165 140 172 185 145 C230 118 270 125 310 100"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 4"
      vectorEffect="non-scaling-stroke"
    />
    {/* Subtle birds soaring */}
    <path
      d="M200 35 C205 30 210 30 215 35 C220 30 225 30 230 35"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M235 22 C239 18 243 18 247 22 C251 18 255 18 259 22"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Refined travel compass rose with cardinal markings
 * Perfect for Tours, Hero, or FAQ backgrounds
 */
export const CompassRoseSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.06]',
}) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
  >
    {/* Outer ring */}
    <circle
      cx="80"
      cy="80"
      r="72"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2 3"
    />
    <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="80" cy="80" r="28" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="80" cy="80" r="4" fill="currentColor" />

    {/* Star points */}
    {/* North / South */}
    <polygon points="80,14 84,68 80,80 76,68" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    <polygon points="80,146 84,92 80,80 76,92" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
    {/* East / West */}
    <polygon points="146,80 92,84 80,80 92,76" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
    <polygon points="14,80 68,84 80,80 68,76" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />

    {/* Cardinal text labels */}
    <text x="80" y="24" fill="currentColor" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">N</text>
    <text x="80" y="142" fill="currentColor" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">S</text>
    <text x="140" y="83" fill="currentColor" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">E</text>
    <text x="21" y="83" fill="currentColor" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">W</text>
  </svg>
);

/**
 * Winding dotted journey route line with waypoints & pins
 * Represents continuous travel across sections
 */
export const WindingRouteSketch: React.FC<DecorationProps & { reversed?: boolean }> = ({
  className = '',
  opacity = 'opacity-[0.06]',
  reversed = false,
}) => (
  <svg
    viewBox="0 0 400 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
    style={{ transform: reversed ? 'scaleX(-1)' : undefined }}
  >
    {/* S-curve journey route */}
    <path
      d="M10 90 C80 20 160 160 240 50 C290 -10 340 120 390 70"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeDasharray="5 5"
      vectorEffect="non-scaling-stroke"
    />

    {/* Waypoint 1 */}
    <circle cx="120" cy="100" r="3.5" fill="currentColor" />
    <circle cx="120" cy="100" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

    {/* Waypoint 2 */}
    <circle cx="240" cy="50" r="3.5" fill="currentColor" />
    <circle cx="240" cy="50" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

    {/* Travel marker icon (small vehicle / plane outline) */}
    <g transform="translate(240, 50) rotate(-25)">
      <path
        d="M-6 -3 L6 0 L-6 3 L-3 0 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </g>

    {/* Destination Pin */}
    <g transform="translate(390, 70)">
      <path
        d="M0 -12 C-5 -12 -8 -8 -8 -4 C-8 2 0 10 0 10 C0 10 8 2 8 -4 C8 -8 5 -12 0 -12 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <circle cx="0" cy="-4" r="2.5" fill="currentColor" />
    </g>
  </svg>
);

/**
 * Coastal South Indian / Kerala Palm Silhouette Line-Art
 * Represents beaches, backwaters, and lush tropical landscapes
 */
export const PalmClusterSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.06]',
}) => (
  <svg
    viewBox="0 0 200 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
  >
    {/* Tall curved trunk */}
    <path
      d="M60 240 C65 180 85 130 110 85"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    {/* Secondary trunk */}
    <path
      d="M90 240 C95 195 115 155 140 120"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />

    {/* Palm Fronds (Tree 1) */}
    <g transform="translate(110, 85)">
      <path d="M0 0 C-25 -20 -55 -15 -75 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M0 0 C-20 -35 -40 -45 -65 -35" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M0 0 C-5 -45 5 -60 -10 -75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M0 0 C25 -40 45 -50 65 -45" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M0 0 C35 -25 60 -20 80 -5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M0 0 C30 -5 55 15 70 35" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </g>

    {/* Palm Fronds (Tree 2) */}
    <g transform="translate(140, 120)">
      <path d="M0 0 C-20 -15 -45 -10 -60 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M0 0 C-15 -30 -30 -35 -48 -25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M0 0 C20 -30 35 -35 50 -30" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M0 0 C25 -15 45 -10 60 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * South Indian Temple Gopuram / Heritage Architecture Line-Art
 * Represents Tamil Nadu heritage, Chola temples, and cultural exploration
 */
export const HeritageArchitectureSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.05]',
}) => (
  <svg
    viewBox="0 0 200 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
  >
    {/* Kalasham Finials on Top */}
    <line x1="100" y1="20" x2="100" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="100" cy="22" r="3" stroke="currentColor" strokeWidth="1.2" />
    <line x1="88" y1="28" x2="88" y2="38" stroke="currentColor" strokeWidth="1.2" />
    <line x1="112" y1="28" x2="112" y2="38" stroke="currentColor" strokeWidth="1.2" />

    {/* Gopuram Tiers */}
    <path d="M80 38 L120 38 L116 58 L84 58 Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M75 60 L125 60 L121 82 L79 82 Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M70 84 L130 84 L126 108 L74 108 Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M65 110 L135 110 L131 138 L69 138 Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M60 140 L140 140 L136 170 L64 170 Z" stroke="currentColor" strokeWidth="1.2" />

    {/* Temple Base & Arched Gateway */}
    <rect x="52" y="172" width="96" height="64" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M84 236 L84 200 C84 188 116 188 116 200 L116 236"
      stroke="currentColor"
      strokeWidth="1.3"
    />

    {/* Decorative Pillared Wings */}
    <line x1="30" y1="210" x2="52" y2="210" stroke="currentColor" strokeWidth="1" />
    <line x1="30" y1="236" x2="30" y2="210" stroke="currentColor" strokeWidth="1.2" />
    <line x1="148" y1="210" x2="170" y2="210" stroke="currentColor" strokeWidth="1" />
    <line x1="170" y1="236" x2="170" y2="210" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/**
 * Camera & Postcard Stamp Sketch
 * Perfect for the Gallery Section background
 */
export const CameraPostcardSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.06]',
}) => (
  <svg
    viewBox="0 0 160 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
  >
    {/* Postcard Stamp Border */}
    <rect
      x="12"
      y="12"
      width="136"
      height="116"
      rx="6"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeDasharray="4 3"
    />

    {/* Fine Camera Line Art */}
    <g transform="translate(48, 42)">
      <rect x="0" y="10" width="64" height="44" rx="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M22 10 L26 3 L38 3 L42 10 Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="52" cy="20" r="2.5" fill="currentColor" />
    </g>

    {/* Postcard stamp wavy cancellation mark */}
    <path
      d="M100 18 C115 14 125 22 140 18 M100 24 C115 20 125 28 140 24 M100 30 C115 26 125 34 140 30"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Globe Wireframe & Travel Flight Path
 * Perfect for the Reviews Section background
 */
export const GlobeWireframeSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.06]',
}) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
  >
    {/* Outer circle */}
    <circle cx="80" cy="80" r="68" stroke="currentColor" strokeWidth="1.2" />
    {/* Equator */}
    <ellipse cx="80" cy="80" rx="68" ry="24" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    {/* Prime Meridian */}
    <ellipse cx="80" cy="80" rx="30" ry="68" stroke="currentColor" strokeWidth="1" />
    <line x1="80" y1="12" x2="80" y2="148" stroke="currentColor" strokeWidth="1" />
    <line x1="12" y1="80" x2="148" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

    {/* Curved flight arc orbiting the globe */}
    <path
      d="M25 125 C30 60 90 20 145 45"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    {/* Tiny plane on path */}
    <g transform="translate(145, 45) rotate(45)">
      <path d="M-5 -2 L5 0 L-5 2 L-3 0 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.8" />
    </g>
  </svg>
);

/**
 * Trust Shield & Star Emblem Sketch
 * Perfect for the Why Us Section background
 */
export const TrustShieldSketch: React.FC<DecorationProps> = ({
  className = '',
  opacity = 'opacity-[0.06]',
}) => (
  <svg
    viewBox="0 0 140 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${opacity} ${className}`}
  >
    {/* Shield contour */}
    <path
      d="M70 12 L124 32 C124 85 96 128 70 148 C44 128 16 85 16 32 Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M70 24 L112 40 C112 80 90 115 70 134 C50 115 28 80 28 40 Z"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeDasharray="3 3"
    />

    {/* Center checkmark / handshake motif */}
    <path
      d="M50 78 L64 92 L92 62"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Top star */}
    <g transform="translate(70, 48) scale(0.8)">
      <polygon
        points="0,-8 2.5,-2.5 8,-2.5 3.5,1.5 5.5,7 0,3.5 -5.5,7 -3.5,1.5 -8,-2.5 -2.5,-2.5"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1"
      />
    </g>
  </svg>
);
