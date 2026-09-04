/**
 * Centralized business configuration for Jayasakthi Tours & Travels
 * All business details are strictly kept here as the single source of truth.
 */
export const business = {
  name: "JAYASAKTHI TOURS & TRAVELS",
  shortName: "Jayasakthi Tours",
  location: "Chennai, India",
  whatsapp: "919840815556",
  whatsappFormatted: "+91 98408 15556",
  phone: "+91 94444 40744",
  phoneCallUrl: "tel:+919444440744",
  email: "jayashakthitourstravels@gmail.com",
  emailMailto: "mailto:jayashakthitourstravels@gmail.com",
  tagline: "Your Journey Across India. We Take Care of Everything.",
  supportingMessage:
    "From your arrival in India to your journey back home, we plan, coordinate and manage your complete travel experience.",
  differentiator: "One Trip. One Team. Everything Taken Care Of.",
  itineraryHeadline: "Know Your Journey Before You Begin.",
  itinerarySubtext:
    "We create a clear day-by-day travel plan so you know where you will go, what you will see, how you will travel and how your journey flows from one destination to the next.",
  whyChooseUsHeadline: "India Can Be Complicated. Your Trip Doesn't Have To Be.",
  defaultWhatsAppMessage:
    "Hello Jayasakthi Tours & Travels, I would like to enquire about an India tour package.",
} as const;

export type BusinessConfig = typeof business;
