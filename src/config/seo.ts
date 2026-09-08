/**
 * Centralized SEO Configuration for JAYASHAKTHI TOURS & TRAVELS
 * Single source of truth for metadata, canonical URLs, and structured data.
 */

import { business } from './business';

export const PRODUCTION_DOMAIN = 'https://www.jayashakthitoursandtravels.com';
export const BRAND_NAME = 'JAYASHAKTHI TOURS & TRAVELS';

export interface RouteSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  noindex?: boolean;
}

export const defaultSeo: RouteSeoMetadata = {
  title: 'Jayashakthi Tours & Travels | Tours, Travel & Cab Services in India',
  description:
    'Plan memorable journeys across India with Jayashakthi Tours & Travels. Explore customized tours, reliable cab services, travel planning and personalized experiences for your next journey.',
  canonicalPath: '/',
  keywords: [
    'Jayashakthi Tours & Travels',
    'India tour packages',
    'customized India tours',
    'travel agency in Chennai',
    'cab services India',
    'South India tours',
    'private tours India',
  ],
};

export const routesSeo: Record<string, RouteSeoMetadata> = {
  '/': defaultSeo,

  '/packages': {
    title: 'India Tour Packages & Customized Trips | Jayashakthi Tours & Travels',
    description:
      'Explore thoughtfully planned India tours and customized journeys with Jayashakthi Tours & Travels, from South India and Kerala to Rajasthan and other destinations.',
    canonicalPath: '/packages',
    keywords: [
      'India tour packages',
      'customized India tours',
      'South India tours',
      'Kerala tours',
      'Rajasthan tours',
      'family travel India',
      'private tours India',
    ],
  },

  '/gallery': {
    title: 'Travel Gallery | India Journeys | Jayashakthi Tours & Travels',
    description:
      'Explore travel moments, destinations and customer journeys from Jayashakthi Tours & Travels across India.',
    canonicalPath: '/gallery',
    keywords: [
      'India travel gallery',
      'travel moments India',
      'South India travel photos',
      'Jayashakthi Tours gallery',
      'client journey photos',
    ],
  },

  '/about': {
    title: 'About Us | Trusted Travel Partner & Planning | Jayashakthi Tours & Travels',
    description:
      'Discover Jayashakthi Tours & Travels — your trusted travel service based in Chennai. Experienced travel support, customized journeys, reliable transportation and personalized travel planning.',
    canonicalPath: '/about',
    keywords: [
      'trusted travel service',
      'customized journeys',
      'experienced travel support',
      'reliable transportation',
      'personalized travel planning',
      'Jayashakthi Tours & Travels',
    ],
  },

  '/services': {
    title: 'India Travel & Cab Services | Jayashakthi Tours & Travels',
    description:
      'Discover reliable travel planning, cab services, Tempo Traveller rentals, hotel bookings and complete travel coordination across India with Jayashakthi Tours & Travels.',
    canonicalPath: '/services',
    keywords: [
      'cab services India',
      'Tempo Traveller rental Chennai',
      'India travel coordination',
      'hotel booking India',
      'sightseeing transport',
    ],
  },

  '/itinerary': {
    title: 'Day-by-Day Travel Itineraries | Jayashakthi Tours & Travels',
    description:
      'Clear day-by-day travel itineraries and routes across India with realistic transit timings, verified stays, and complete chauffeur coordination.',
    canonicalPath: '/itinerary',
    keywords: [
      'India travel itinerary',
      'custom day by day tour plan',
      'South India itinerary',
      'trip planning route',
    ],
  },

  '/reviews': {
    title: 'Jayashakthi Tours & Travels Reviews & Customer Experiences',
    description:
      'Read authentic customer reviews and travel experiences from families and international travelers who explored India with Jayashakthi Tours & Travels.',
    canonicalPath: '/reviews',
    keywords: [
      'Jayashakthi Tours & Travels reviews',
      'customer experiences',
      'India tour reviews',
      'traveler feedback India',
    ],
  },

  // Alias for /reviews
  '/review': {
    title: 'Jayashakthi Tours & Travels Reviews & Customer Experiences',
    description:
      'Read authentic customer reviews and travel experiences from families and international travelers who explored India with Jayashakthi Tours & Travels.',
    canonicalPath: '/reviews',
  },

  '/booking': {
    title: 'Plan Your Next Journey | Customized India Trips | Jayashakthi Tours & Travels',
    description:
      'Plan your personalized India journey with Jayashakthi Tours & Travels. Share your destination wishlist, travel dates and preferences for custom travel planning.',
    canonicalPath: '/booking',
    keywords: [
      'customized India travel',
      'personalized trip planning',
      'family trips India',
      'private journeys',
      'travel enquiries',
    ],
  },

  // Alias for /booking
  '/plan-my-trip': {
    title: 'Plan Your Next Journey | Customized India Trips | Jayashakthi Tours & Travels',
    description:
      'Plan your personalized India journey with Jayashakthi Tours & Travels. Share your destination wishlist, travel dates and preferences for custom travel planning.',
    canonicalPath: '/booking',
  },

  '/contact': {
    title: 'Contact Jayashakthi Tours & Travels | Plan Your Journey',
    description:
      'Contact Jayashakthi Tours & Travels to plan your next journey across India. Get in touch for tours, travel planning and transportation assistance.',
    canonicalPath: '/contact',
    keywords: [
      'contact Jayashakthi Tours & Travels',
      'travel agency contact Chennai',
      'India tour planning enquiry',
      'call Jayashakthi Tours',
    ],
  },

  '/submit-review': {
    title: 'Submit Your Travel Review | Jayashakthi Tours & Travels',
    description:
      'Share your genuine travel experience and review with Jayashakthi Tours & Travels.',
    canonicalPath: '/submit-review',
    noindex: true,
  },

  // Admin Routes (Strictly Noindex)
  '/admin': {
    title: 'Admin Portal | Jayashakthi Tours & Travels',
    description: 'Internal administration portal.',
    canonicalPath: '/admin',
    noindex: true,
  },
  '/admin/login': {
    title: 'Admin Login | Jayashakthi Tours & Travels',
    description: 'Admin login authentication.',
    canonicalPath: '/admin/login',
    noindex: true,
  },
};

/**
 * Returns the full canonical URL for a given path
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.split('?')[0].split('#')[0];
  const matched = routesSeo[cleanPath];
  const targetPath = matched ? matched.canonicalPath : cleanPath;
  if (targetPath === '/' || targetPath === '') {
    return `${PRODUCTION_DOMAIN}/`;
  }
  return `${PRODUCTION_DOMAIN}${targetPath.startsWith('/') ? targetPath : `/${targetPath}`}`;
}

/**
 * Schema.org TravelAgency Structured Data
 */
export const travelAgencyStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: BRAND_NAME,
  url: `${PRODUCTION_DOMAIN}/`,
  logo: `${PRODUCTION_DOMAIN}/images/logo/jayashakthi-tours-logo.png`,
  image: `${PRODUCTION_DOMAIN}/images/poster/jayashakthi-tours-poster.png`,
  description:
    'Plan memorable journeys across India with Jayashakthi Tours & Travels. Explore customized tours, reliable cab services, travel planning and personalized experiences.',
  telephone: `+91-${business.phone}`,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 14, V.O.C. 2nd Street, Padmanabha Nagar, Choolaimedu',
    addressLocality: 'Chennai',
    postalCode: '600094',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.instagram.com/jayashakthi_tours'],
  areaServed: [
    'India',
    'Tamil Nadu',
    'Kerala',
    'Karnataka',
    'Rajasthan',
    'Golden Triangle (Delhi, Agra, Jaipur)',
  ],
};

/**
 * Schema.org FAQPage Structured Data (Matches visible FAQs on website)
 */
export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I enquire about a tour package or travel plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can enquire directly by calling our primary line at 9444796073 or messaging us on WhatsApp at +91 98408 15556. Simply share your destination of interest, dates, and number of travelers, and we will prepare a personalized itinerary with complete coordination details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize my trip itinerary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely. Every tour we organize is customized around your schedule, preferred travel pace, hotel comfort preferences, and sightseeing interests. We do not force rigid schedules—your journey is designed around you.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I contact Jayashakthi Tours & Travels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can call us directly on 9444796073, connect with our travel team via WhatsApp on +91 98408 15556, or visit our office at Plot No. 14, V.O.C. 2nd Street, Kannan Nagar, Madipakkam, Chennai - 600 091, Tamil Nadu.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I plan a family or senior-friendly trip?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For family and elder travel, we ensure comfortable, spacious air-conditioned vehicles (like Innova Crysta or luxury Tempo Travellers), select hotels with step-free or elevator access, and design gentle daily pacing with sufficient rest periods.',
      },
    },
    {
      '@type': 'Question',
      name: 'What travel coordination services do you provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We coordinate complete end-to-end travel arrangements across India, including private chauffeur-driven vehicles, hotel and heritage stay reservations, airport pickups and transfers, guided sightseeing, temple darshan coordination, and 24/7 on-trip support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book my journey?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend reaching out at least 2 to 4 weeks before your desired travel date, particularly for peak travel periods such as winter and festival seasons. However, we also do our best to accommodate short-notice travel whenever vehicles and stays are available.',
      },
    },
  ],
};
