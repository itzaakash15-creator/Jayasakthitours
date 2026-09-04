import { business } from '../config/business';

export interface SeoConfig {
  title?: string;
  description?: string;
  canonical?: string;
}

export function updatePageSeo(config: SeoConfig) {
  const baseTitle = `${business.name} | India Tour Packages & Travel Services`;
  document.title = config.title ? `${config.title} | ${business.shortName}` : baseTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      config.description ||
        'Customized India tour packages, day-by-day itinerary planning, hotel and flight bookings, visa assistance, car and Tempo Traveller rentals, sightseeing and complete travel support.'
    );
  }
}

export const travelAgencyStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: business.name,
  description:
    'Complete India travel coordination company based in Chennai. We provide customized tour planning, day-by-day itineraries, flight/hotel bookings, car and Tempo Traveller rentals, temple tours, and full travel support across India.',
  telephone: business.phone,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  areaServed: [
    'India',
    'Tamil Nadu',
    'Kerala',
    'Rajasthan',
    'Karnataka',
    'Golden Triangle (Delhi, Agra, Jaipur)',
    'Varanasi',
  ],
  currenciesAccepted: 'INR, USD, EUR, GBP, SGD, AUD, CAD',
  openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 08:00-21:00',
  priceRange: 'Custom / On Request',
};
