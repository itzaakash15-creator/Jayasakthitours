/**
 * Centralized business configuration for Jayashakthi Tours & Travels
 * All business details are strictly kept here as the single source of truth.
 */
export const business = {
  name: "JAYASHAKTHI TOURS & TRAVELS",
  shortName: "Jayashakthi Tours",
  logo: "/images/logo/jayashakthi-logo-cropped.png",
  fullLogo: "/images/logo/jayashakthi-tours-logo.png",
  poster: "/images/poster/jayashakthi-tours-poster.png",
  location: "Chennai, India",
  whatsapp: "919840815556",
  whatsappFormatted: "+91 98408 15556",
  phone: "9444796073",
  phoneCallUrl: "tel:+919444796073",
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
    "Hello Jayashakthi Tours, I would like to enquire about an India tour package.",
  proprietor: "T. Jayaraj Thangarasu",
  address: {
    street: "Plot No. 14, V.O.C. 2nd Street",
    area: "Padmanabha Nagar, Choolaimedu",
    city: "Chennai",
    pincode: "600094",
    state: "Tamil Nadu",
    country: "India",
    formatted:
      "Plot No. 14, V.O.C. 2nd Street, Padmanabha Nagar, Choolaimedu, Chennai – 600094, Tamil Nadu, India",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+No.+14,+V.O.C.+2nd+Street,+Padmanabha+Nagar,+Choolaimedu,+Chennai+600094,+Tamil+Nadu,+India",
  },
} as const;

export type BusinessConfig = typeof business;
