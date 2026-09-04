import { business } from '../config/business';

export interface BookingFormData {
  fullName: string;
  email: string;
  whatsappNumber: string;
  country: string;
  startDate: string;
  endDate: string;
  totalDays?: number | string;
  totalNights?: number | string;
  adults: number;
  children: number;
  childAges?: string[];
  destinations: string[];
  customDestination?: string;
  accommodation: 'Budget' | 'Standard' | 'Premium' | 'Luxury' | 'Not Sure';
  transportation: 'Car' | 'Tempo Traveller' | 'Bus' | 'Flight' | 'Not Sure';
  wantItinerary: 'Yes' | 'No';
  templeRequirements?: string;
  additionalRequirements?: string;
}

/**
 * Encodes a text message and formats it into the official WhatsApp URL for Jayashakthi Tours
 */
export function createWhatsAppUrl(message: string): string {
  const cleanNumber = business.whatsapp.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Direct helper to open WhatsApp in a new tab/window
 */
export function openWhatsApp(message: string): void {
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Formats full booking details into the standardized, highly readable WhatsApp enquiry template
 */
export function formatBookingEnquiry(data: BookingFormData): string {
  const allDestinations = [...data.destinations];
  if (data.customDestination && data.customDestination.trim()) {
    allDestinations.push(data.customDestination.trim());
  }

  const childAgesText =
    data.children > 0 && data.childAges && data.childAges.length > 0
      ? data.childAges.filter(Boolean).join(', ') || 'Ages to be confirmed'
      : 'None';

  return `Hello Jayashakthi Tours & Travels, I would like to enquire about planning an India tour.

*CUSTOMER DETAILS*
Name: ${data.fullName}
Email: ${data.email}
WhatsApp: ${data.whatsappNumber}
Country: ${data.country}

*TRAVEL DETAILS*
Start Date: ${data.startDate || 'Flexible'}
End Date: ${data.endDate || 'Flexible'}
Total Days: ${data.totalDays || 'Custom'}
Total Nights: ${data.totalNights || 'Custom'}

*TRAVELERS*
Adults: ${data.adults}
Children: ${data.children}
Child Ages: ${childAgesText}

*DESTINATIONS*
Selected Destinations: ${allDestinations.length > 0 ? allDestinations.join(', ') : 'Open to suggestions'}

*ACCOMMODATION*
Preference: ${data.accommodation}

*TRANSPORTATION*
Preference: ${data.transportation}

*ITINERARY*
Complete Day-by-Day Itinerary: ${data.wantItinerary}

*TEMPLE / PRAYER REQUIREMENTS*
Details: ${data.templeRequirements?.trim() || 'None specified'}

*ADDITIONAL REQUIREMENTS*
Details: ${data.additionalRequirements?.trim() || 'None specified'}

Thank you.`;
}

/**
 * Quick enquiry formatter for specific packages or services
 */
export function createQuickEnquiryMessage(topic: string, details?: string): string {
  return `Hello Jayashakthi Tours & Travels,

I am interested in enquiring about: *${topic}*.
${details ? `\nNote: ${details}\n` : ''}
Could you please share details on how you can help plan and coordinate this travel experience?

Thank you!`;
}
