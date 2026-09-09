/**
 * Brand Search Variation Map & SEO / AEO / GEO Search Roadmap
 * JAYASHAKTHI TOURS & TRAVELS
 * Official Website: https://www.jayashakthitoursandtravels.com/
 * Single source of truth for query mapping, intent routing, and entity associations.
 */

export interface SearchMatrixEntry {
  searchQuery: string;
  searchVariation: string;
  intent: 'Branded' | 'Informational' | 'Commercial' | 'Transactional' | 'Local' | 'Navigational';
  topic: string;
  targetPage: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  questionVariant?: string;
  location: string;
  travelerType: string;
  status: 'Active' | 'Planned';
}

/**
 * 1. Legitimate Brand Name Variations
 * Real users and search engine queries refer to Jayashakthi Tours & Travels via these natural variations.
 * These do NOT become separate doorway pages; all map to official canonical pages.
 */
export const BRAND_VARIATIONS = [
  'Jayashakthi Tours & Travels',
  'Jayashakthi Tours and Travels',
  'Jaya Shakthi Tours & Travels',
  'Jaya Shakthi Tours and Travels',
  'Jaya Shakti Tours & Travels',
  'Jaya Shakti Tours and Travels',
  'Jaya Sakthi Tours & Travels',
  'Jaya Sakthi Tours and Travels',
  'Jayashakthi Tours',
  'Jayashakthi Travels',
  'Jaya Shakthi Tours',
  'Jaya Shakthi Travels',
  'Jayashakthi Travel',
  'Jaya Shakthi Travel',
  'Jayashakthi Tours Chennai',
  'Jaya Shakthi Tours Chennai',
  'Jayashakthi Travels Chennai',
  'Jaya Shakthi Travels Chennai',
  'Jayashakthi India Tours',
  'Jayashakthi Travel Agency',
  'Jaya Shakthi Travel Agency',
] as const;

/**
 * 2. Natural Spelling Variations
 * Observed user typing habits across phonetic variations.
 */
export const SPELLING_VARIATIONS = [
  'Jayashakthi',
  'Jaya Shakthi',
  'Jaya Shakti',
  'Jaya Sakthi',
  'Jayashakti',
  'Jayashakthy',
  'Jaya Shakthy',
] as const;

/**
 * 3. Legitimate Verified Locations (Operating Hubs & Destination Regions)
 */
export const VERIFIED_LOCATIONS = [
  'Chennai',
  'Tamil Nadu',
  'South India',
  'India',
  'Kerala',
  'Karnataka',
  'Golden Triangle (Delhi, Agra, Jaipur)',
  'Rajasthan',
  'Varanasi',
] as const;

/**
 * 4. Verified Services Supported by the Business
 */
export const VERIFIED_SERVICES = [
  'Customized India Tour Planning',
  'Day-by-Day Itinerary Planning',
  'Car Rentals with Chauffeur (Sedans & SUVs)',
  'Tempo Traveller Rentals (12–17 Seaters)',
  'Hotel & Heritage Stay Bookings',
  'Airport Pickup & Drop Transfers',
  'Temple & Spiritual Darshan Travel',
  'Certified Local Tour Guide Assistance',
  'Flight Ticketing Assistance',
  'India Tourist e-Visa Advisory',
  'Multi-City India Road & Transit Travel',
  'Family & Senior-Friendly Travel Planning',
] as const;

/**
 * 5. Verified Destinations Actually Served
 */
export const VERIFIED_DESTINATIONS = [
  'Chennai',
  'Mahabalipuram (Mamallapuram)',
  'Pondicherry (Puducherry)',
  'Thanjavur (Brihadeeswarar Big Temple)',
  'Madurai (Meenakshi Amman Temple)',
  'Rameswaram & Dhanushkodi',
  'Kanyakumari',
  'Kerala (Kochi, Munnar, Thekkady, Alleppey Backwaters, Kovalam)',
  'Karnataka (Hampi, Mysore, Coorg)',
  'Golden Triangle (Delhi, Agra Taj Mahal, Jaipur)',
  'Rajasthan (Jaipur, Jodhpur, Udaipur, Jaisalmer)',
  'Varanasi & Sacred North (Ganga Ghats, Sarnath, Prayagraj)',
] as const;

/**
 * 6. Supported Traveler Types
 */
export const TRAVELER_TYPES = [
  'Families with Children',
  'Multi-Generational Families & Seniors',
  'Couples & Honeymooners',
  'International Inbound Visitors',
  'Temple & Spiritual Pilgrims',
  'Small Groups & Friends (Tempo Traveller)',
  'Heritage & Cultural Architecture Scholars',
  'Corporate & Delegation Groups',
] as const;

/**
 * 7. Master Search Query Intent & Routing Matrix
 */
export const masterSearchMatrix: SearchMatrixEntry[] = [
  // ==========================================
  // BRANDED SEARCHES & DIRECT INTENT MAPPINGS
  // ==========================================
  {
    searchQuery: 'Jayashakthi Tours and Travels',
    searchVariation: 'Jayashakthi Tours and Travels',
    intent: 'Branded',
    topic: 'Official Brand Homepage',
    targetPage: '/',
    primaryKeyword: 'Jayashakthi Tours & Travels',
    secondaryKeywords: ['Jayashakthi Tours and Travels', 'Jayashakthi Travels official site'],
    questionVariant: 'Who is Jayashakthi Tours & Travels?',
    location: 'Chennai, India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jaya Shakthi Tours and Travels',
    searchVariation: 'Jaya Shakthi Tours and Travels',
    intent: 'Branded',
    topic: 'Brand Spelling Variant',
    targetPage: '/',
    primaryKeyword: 'Jayashakthi Tours & Travels',
    secondaryKeywords: ['Jaya Shakthi Tours', 'Jaya Shakthi Travels'],
    questionVariant: 'Is Jaya Shakthi Tours the same as Jayashakthi Tours & Travels?',
    location: 'Chennai, India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jaya Shakti Tours and Travels',
    searchVariation: 'Jaya Shakti Tours',
    intent: 'Branded',
    topic: 'Brand Spelling Variant',
    targetPage: '/',
    primaryKeyword: 'Jayashakthi Tours & Travels',
    secondaryKeywords: ['Jaya Shakti Tours Chennai', 'Jaya Shakti Travels'],
    questionVariant: 'Where is Jaya Shakti Tours located?',
    location: 'Chennai, India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jaya Sakthi Tours and Travels',
    searchVariation: 'Jaya Sakthi Tours',
    intent: 'Branded',
    topic: 'Brand Spelling Variant',
    targetPage: '/',
    primaryKeyword: 'Jayashakthi Tours & Travels',
    secondaryKeywords: ['Jaya Sakthi Tours Chennai', 'Jaya Sakthi Travels'],
    questionVariant: 'Is Jaya Sakthi Tours in Chennai?',
    location: 'Chennai, India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi Tours Chennai',
    searchVariation: 'Jayashakthi Tours Chennai',
    intent: 'Local',
    topic: 'Local Travel Agency Chennai',
    targetPage: '/',
    primaryKeyword: 'Jayashakthi Tours Chennai',
    secondaryKeywords: ['travel agency in Chennai', 'Jayashakthi Travels Chennai office'],
    questionVariant: 'Where is Jayashakthi Tours located in Chennai?',
    location: 'Padmanabha Nagar, Choolaimedu, Chennai',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jaya Shakthi Travels Chennai',
    searchVariation: 'Jaya Shakthi Travels Chennai',
    intent: 'Local',
    topic: 'Local Travel Operator',
    targetPage: '/about',
    primaryKeyword: 'Jaya Shakthi Travels Chennai',
    secondaryKeywords: ['Jayashakthi tours and travels office', 'travel company Chennai'],
    questionVariant: 'What is the office address of Jayashakthi Tours & Travels in Chennai?',
    location: 'Chennai, Tamil Nadu',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi contact',
    searchVariation: 'Jayashakthi phone number',
    intent: 'Navigational',
    topic: 'Customer Contact & Support',
    targetPage: '/contact',
    primaryKeyword: 'contact Jayashakthi Tours & Travels',
    secondaryKeywords: ['Jayashakthi phone number', 'Jayashakthi WhatsApp number', 'Jayashakthi address'],
    questionVariant: 'How can I contact Jayashakthi Tours & Travels?',
    location: 'Chennai, India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi reviews',
    searchVariation: 'Jayashakthi tours reviews',
    intent: 'Commercial',
    topic: 'Customer Reviews & Feedback',
    targetPage: '/reviews',
    primaryKeyword: 'Jayashakthi Tours & Travels reviews',
    secondaryKeywords: ['customer reviews Jayashakthi', 'Jayashakthi tours experiences', 'travel feedback'],
    questionVariant: 'Where can I find Jayashakthi Tours & Travels reviews?',
    location: 'India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi tours packages',
    searchVariation: 'Jayashakthi travel packages',
    intent: 'Commercial',
    topic: 'Curated Tour Packages',
    targetPage: '/packages',
    primaryKeyword: 'Jayashakthi tour packages',
    secondaryKeywords: ['Jayashakthi India packages', 'South India packages Jayashakthi'],
    questionVariant: 'What tour packages does Jayashakthi Tours offer?',
    location: 'India',
    travelerType: 'Families & Couples',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi tours booking',
    searchVariation: 'plan trip with Jayashakthi',
    intent: 'Transactional',
    topic: 'Custom Trip Enquiry',
    targetPage: '/booking',
    primaryKeyword: 'book tour with Jayashakthi',
    secondaryKeywords: ['plan trip Jayashakthi', 'custom itinerary booking'],
    questionVariant: 'How can I book a tour with Jayashakthi Tours & Travels?',
    location: 'India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi itinerary planning',
    searchVariation: 'Jayashakthi day by day tour',
    intent: 'Informational',
    topic: 'Day-by-Day Travel Schedules',
    targetPage: '/itinerary',
    primaryKeyword: 'Jayashakthi itinerary planning',
    secondaryKeywords: ['day by day travel itinerary', 'South India route schedule'],
    questionVariant: 'Does Jayashakthi provide day-by-day itineraries?',
    location: 'South India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Jayashakthi cab services',
    searchVariation: 'Jayashakthi car rental Chennai',
    intent: 'Commercial',
    topic: 'Fleet & Chauffeur Services',
    targetPage: '/services',
    primaryKeyword: 'Jayashakthi cab services',
    secondaryKeywords: ['Tempo Traveller rental Chennai', 'chauffeur car rental Chennai'],
    questionVariant: 'Does Jayashakthi Tours provide car rental and Tempo Travellers?',
    location: 'Chennai, Tamil Nadu',
    travelerType: 'Groups & Families',
    status: 'Active',
  },

  // ==========================================
  // NON-BRAND CLUSTERS: INDIA TRAVEL
  // ==========================================
  {
    searchQuery: 'India tour packages',
    searchVariation: 'tour packages for India',
    intent: 'Commercial',
    topic: 'India Travel Packages',
    targetPage: '/packages',
    primaryKeyword: 'India tour packages',
    secondaryKeywords: ['customized India tours', 'private India travel packages'],
    questionVariant: 'What is the best way to plan a tour across India?',
    location: 'India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'customized India tours',
    searchVariation: 'tailor made India tours',
    intent: 'Commercial',
    topic: 'Custom Travel Planning',
    targetPage: '/booking',
    primaryKeyword: 'customized India tours',
    secondaryKeywords: ['bespoke India itineraries', 'personalized India holiday'],
    questionVariant: 'Can I customize an India tour itinerary?',
    location: 'India',
    travelerType: 'Families & Couples',
    status: 'Active',
  },
  {
    searchQuery: 'private India tours for international travelers',
    searchVariation: 'India tours for foreigners',
    intent: 'Commercial',
    topic: 'Inbound International Travel',
    targetPage: '/about',
    primaryKeyword: 'private India tours for international travelers',
    secondaryKeywords: ['India travel planning for international visitors', 'India private driver tour'],
    questionVariant: 'Can international travelers book private tours in India?',
    location: 'India',
    travelerType: 'International Inbound Visitors',
    status: 'Active',
  },

  // ==========================================
  // NON-BRAND CLUSTERS: CHENNAI HUB
  // ==========================================
  {
    searchQuery: 'Chennai travel agency',
    searchVariation: 'travel agency in Chennai',
    intent: 'Local',
    topic: 'Chennai Travel Services',
    targetPage: '/',
    primaryKeyword: 'Chennai travel agency',
    secondaryKeywords: ['travel company in Chennai', 'tour operator Chennai', 'best travel agency in Chennai'],
    questionVariant: 'Which travel agency in Chennai can help plan an India trip?',
    location: 'Chennai, Tamil Nadu',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Tempo Traveller rental Chennai',
    searchVariation: '12 seater tempo traveller Chennai',
    intent: 'Commercial',
    topic: 'Group Transport Rental',
    targetPage: '/services',
    primaryKeyword: 'Tempo Traveller rental Chennai',
    secondaryKeywords: ['14 seater tempo traveller Chennai', 'luxury tempo traveller rental Chennai'],
    questionVariant: 'Where can I hire a Tempo Traveller in Chennai for an outstation tour?',
    location: 'Chennai, Tamil Nadu',
    travelerType: 'Small Groups & Friends',
    status: 'Active',
  },
  {
    searchQuery: 'Chennai airport pickup cab service',
    searchVariation: 'Chennai airport to Mahabalipuram taxi',
    intent: 'Transactional',
    topic: 'Airport Transfers & Transit',
    targetPage: '/services',
    primaryKeyword: 'Chennai airport pickup cab service',
    secondaryKeywords: ['reliable Chennai airport transfers', 'chauffeured car Chennai'],
    questionVariant: 'How can I arrange an airport transfer in Chennai?',
    location: 'Chennai',
    travelerType: 'All Travelers',
    status: 'Active',
  },

  // ==========================================
  // NON-BRAND CLUSTERS: TAMIL NADU HERITAGE
  // ==========================================
  {
    searchQuery: 'Tamil Nadu tour packages',
    searchVariation: 'Tamil Nadu temple tour',
    intent: 'Commercial',
    topic: 'Tamil Nadu Heritage & Spiritual',
    targetPage: '/packages',
    primaryKeyword: 'Tamil Nadu tour packages',
    secondaryKeywords: ['Tamil Nadu temple trail', 'Madurai Thanjavur Rameswaram tour'],
    questionVariant: 'How many days do I need for a Tamil Nadu tour?',
    location: 'Tamil Nadu',
    travelerType: 'Temple & Spiritual Pilgrims, Heritage Scholars',
    status: 'Active',
  },
  {
    searchQuery: 'Chennai to Mahabalipuram and Pondicherry tour',
    searchVariation: 'East Coast Road heritage tour',
    intent: 'Commercial',
    topic: 'Coastal & Heritage Routes',
    targetPage: '/itinerary',
    primaryKeyword: 'Chennai to Mahabalipuram and Pondicherry tour',
    secondaryKeywords: ['Pondicherry weekend trip from Chennai', 'Mahabalipuram day trip'],
    questionVariant: 'How do I travel from Chennai to Mahabalipuram and Pondicherry?',
    location: 'Tamil Nadu & Pondicherry',
    travelerType: 'Couples & Families',
    status: 'Active',
  },

  // ==========================================
  // NON-BRAND CLUSTERS: SOUTH INDIA
  // ==========================================
  {
    searchQuery: 'South India tour packages',
    searchVariation: 'South India itinerary 10 days',
    intent: 'Commercial',
    topic: 'Grand South India Circuit',
    targetPage: '/packages',
    primaryKeyword: 'South India tour packages',
    secondaryKeywords: ['South India travel agency', 'Tamil Nadu and Kerala combined tour'],
    questionVariant: 'How do I plan a South India tour starting from Chennai?',
    location: 'South India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'Kerala tour packages from Chennai',
    searchVariation: 'Kerala houseboat and Munnar package',
    intent: 'Commercial',
    topic: 'Kerala Hills & Backwaters',
    targetPage: '/packages',
    primaryKeyword: 'Kerala tour packages from Chennai',
    secondaryKeywords: ['Munnar Alleppey tour', 'Kerala family holiday'],
    questionVariant: 'Can I include Kerala backwaters in my South India itinerary?',
    location: 'Kerala, South India',
    travelerType: 'Families & Couples',
    status: 'Active',
  },

  // ==========================================
  // AEO & CONVERSATIONAL SEARCH QUESTIONS
  // ==========================================
  {
    searchQuery: 'Who can help me plan a private trip to India?',
    searchVariation: 'private trip planner India',
    intent: 'Informational',
    topic: 'Conversational Travel Assistance',
    targetPage: '/about',
    primaryKeyword: 'private trip planner India',
    secondaryKeywords: ['India travel coordinator', 'bespoke tour operator India'],
    questionVariant: 'Who can help me plan a private trip to India?',
    location: 'India',
    travelerType: 'All Travelers',
    status: 'Active',
  },
  {
    searchQuery: 'How can elder travelers comfortably visit South Indian temples?',
    searchVariation: 'senior friendly temple tour South India',
    intent: 'Informational',
    topic: 'Accessible & Senior Travel',
    targetPage: '/itinerary',
    primaryKeyword: 'senior friendly temple tour South India',
    secondaryKeywords: ['elder travel assistance temples', 'comfortable vehicle temple darshan'],
    questionVariant: 'How can senior citizens visit Tamil Nadu temples without fatigue?',
    location: 'Tamil Nadu, South India',
    travelerType: 'Multi-Generational Families & Seniors',
    status: 'Active',
  },
];
