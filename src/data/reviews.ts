export interface ReviewItem {
  id: string;
  name: string;
  country: string;
  location: string;
  tripType: 'Family' | 'Group' | 'Couple' | 'Solo' | 'Temple / Spiritual' | 'Customized' | 'Cultural';
  rating: number;
  review: string;
  text: string;
  language: 'English' | 'Tanglish';
  isSample: true;
}


/**
 * 15 Curated Traveler Experiences
 * 
 * Mix:
 * - 5 from India (Arun, Priya, Karthik, Meena, Suresh)
 * - 10 from other countries (UK, Singapore, Malaysia, France, Australia, Sri Lanka, Germany, USA, Canada, UAE)
 * - Exactly 3 Tanglish (Arun from Chennai, Kavitha from Singapore, Karthik from Bengaluru)
 * - Exactly 2 Tanglish from India (Arun, Karthik)
 * - Exactly 1 Tanglish from another country (Kavitha from Singapore)
 * - Naturally interleaved order
 */
export const sampleReviewsData: ReviewItem[] = [
  // 1. India (Tanglish)
  {
    id: 'rev-1',
    name: 'Arun Kumar',
    location: 'Chennai, India',
    country: 'India',
    tripType: 'Temple / Spiritual',
    rating: 5,
    review:
      'Enga family-ku Tamil Nadu temple tour romba smooth-ah arrange pannirundhanga. Thanjavur, Madurai, Rameswaram ellame proper timing-la darshan panna mudinjadhu. Driver-um romba polite and helpful-ah irundharu. Daily itinerary clear-ah irundhadhala periyavangalukku edhuvum tiredness illa. Super service!',
    text:
      'Enga family-ku Tamil Nadu temple tour romba smooth-ah arrange pannirundhanga. Thanjavur, Madurai, Rameswaram ellame proper timing-la darshan panna mudinjadhu. Driver-um romba polite and helpful-ah irundharu. Daily itinerary clear-ah irundhadhala periyavangalukku edhuvum tiredness illa. Super service!',
    language: 'Tanglish',
    isSample: true,
  },

  // 2. United Kingdom (English)
  {
    id: 'rev-2',
    name: 'Michael Evans',
    location: 'London, United Kingdom',
    country: 'United Kingdom',
    tripType: 'Customized',
    rating: 5,
    review:
      'Planning an India journey from the UK felt overwhelming with so many routes and vendors. Jayashakthi coordinated our complete South India itinerary including airport pickup in Chennai, charming heritage hotels, and an immaculate private car. Having our daily itinerary mapped out in advance made our first visit completely stress-free.',
    text:
      'Planning an India journey from the UK felt overwhelming with so many routes and vendors. Jayashakthi coordinated our complete South India itinerary including airport pickup in Chennai, charming heritage hotels, and an immaculate private car. Having our daily itinerary mapped out in advance made our first visit completely stress-free.',
    language: 'English',
    isSample: true,
  },

  // 3. Singapore (Tanglish)
  {
    id: 'rev-3',
    name: 'Kavitha Raman',
    location: 'Singapore',
    country: 'Singapore',
    tripType: 'Family',
    rating: 5,
    review:
      'Singapore-la irundhu India trip plan pannumbodhu initial-ah konjam confusion irundhuchu. But Jayashakthi team everything romba clear-ah WhatsApp-la coordinate pannitanga. Hotels, vehicle, sightseeing ellame super-ah pochu. Enga kids-kum romba comfortable-ah irundhuchu. Definitely recommend pannuvom for family travel!',
    text:
      'Singapore-la irundhu India trip plan pannumbodhu initial-ah konjam confusion irundhuchu. But Jayashakthi team everything romba clear-ah WhatsApp-la coordinate pannitanga. Hotels, vehicle, sightseeing ellame super-ah pochu. Enga kids-kum romba comfortable-ah irundhuchu. Definitely recommend pannuvom for family travel!',
    language: 'Tanglish',
    isSample: true,
  },

  // 4. India (English)
  {
    id: 'rev-4',
    name: 'Priya Sundaram',
    location: 'Coimbatore, India',
    country: 'India',
    tripType: 'Family',
    rating: 5,
    review:
      'We wanted a peaceful family holiday to Kerala covering Munnar and Alleppey without the stress of driving ourselves. The vehicle provided was spotless and the chauffeur was exceptionally courteous with our children. The private houseboat cruise they arranged in Alleppey was the highlight of our holiday.',
    text:
      'We wanted a peaceful family holiday to Kerala covering Munnar and Alleppey without the stress of driving ourselves. The vehicle provided was spotless and the chauffeur was exceptionally courteous with our children. The private houseboat cruise they arranged in Alleppey was the highlight of our holiday.',
    language: 'English',
    isSample: true,
  },

  // 5. Malaysia (English)
  {
    id: 'rev-5',
    name: 'Rajesh & Malini Pillai',
    location: 'Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    tripType: 'Cultural',
    rating: 5,
    review:
      "We traveled from Malaysia for our parents' ancestral temple visits across Tamil Nadu. Jayashakthi took exceptional care of our elder family members. The vehicle was spacious and comfortable, temple timings were coordinated perfectly around puja schedules, and the boutique hotel selections exceeded our expectations.",
    text:
      "We traveled from Malaysia for our parents' ancestral temple visits across Tamil Nadu. Jayashakthi took exceptional care of our elder family members. The vehicle was spacious and comfortable, temple timings were coordinated perfectly around puja schedules, and the boutique hotel selections exceeded our expectations.",
    language: 'English',
    isSample: true,
  },

  // 6. France (English)
  {
    id: 'rev-6',
    name: 'Julien & Claire Moreau',
    location: 'Lyon, France',
    country: 'France',
    tripType: 'Couple',
    rating: 5,
    review:
      'Our customized journey through Tamil Nadu and Kerala was fantastic. From the French Quarter of Pondicherry to the living Chola temples, every day was organized with cultural insight and genuine care. Our private driver was punctual, discreet, and always ensured we enjoyed authentic local dining.',
    text:
      'Our customized journey through Tamil Nadu and Kerala was fantastic. From the French Quarter of Pondicherry to the living Chola temples, every day was organized with cultural insight and genuine care. Our private driver was punctual, discreet, and always ensured we enjoyed authentic local dining.',
    language: 'English',
    isSample: true,
  },

  // 7. India (Tanglish)
  {
    id: 'rev-7',
    name: 'Karthik Swaminathan',
    location: 'Bengaluru, India',
    country: 'India',
    tripType: 'Customized',
    rating: 5,
    review:
      'Bangalore-la irundhu office friends group tour-ku 12-seater tempo book panninom. Vehicle condition top-notch, AC and pushback seats romba comfortable. Route planning and hotel bookings ellame spot-on. Driver anna routes nalla guide pannaru. Budget-friendly and professional coordination!',
    text:
      'Bangalore-la irundhu office friends group tour-ku 12-seater tempo book panninom. Vehicle condition top-notch, AC and pushback seats romba comfortable. Route planning and hotel bookings ellame spot-on. Driver anna routes nalla guide pannaru. Budget-friendly and professional coordination!',
    language: 'Tanglish',
    isSample: true,
  },

  // 8. Australia (English)
  {
    id: 'rev-8',
    name: 'David & Sarah Miller',
    location: 'Melbourne, Australia',
    country: 'Australia',
    tripType: 'Family',
    rating: 5,
    review:
      'Visiting India with three generations of family was a dream we had postponed for years. The Jayashakthi team built a sensible, unhurried itinerary connecting Delhi, Agra, and Jaipur down to Kerala. Having a dedicated contact over WhatsApp throughout our trip gave us immense peace of mind.',
    text:
      'Visiting India with three generations of family was a dream we had postponed for years. The Jayashakthi team built a sensible, unhurried itinerary connecting Delhi, Agra, and Jaipur down to Kerala. Having a dedicated contact over WhatsApp throughout our trip gave us immense peace of mind.',
    language: 'English',
    isSample: true,
  },

  // 9. Sri Lanka (English)
  {
    id: 'rev-9',
    name: 'Thilagavathi & Family',
    location: 'Colombo, Sri Lanka',
    country: 'Sri Lanka',
    tripType: 'Temple / Spiritual',
    rating: 5,
    review:
      'Coming from Sri Lanka, our primary purpose was spiritual darshan at Madurai Meenakshi, Rameswaram, and Kanchipuram. Jayashakthi arranged our pickup from Madurai airport seamlessly. The driver guided us safely to all temple ceremonies with great reverence and patience. A deeply rewarding spiritual journey.',
    text:
      'Coming from Sri Lanka, our primary purpose was spiritual darshan at Madurai Meenakshi, Rameswaram, and Kanchipuram. Jayashakthi arranged our pickup from Madurai airport seamlessly. The driver guided us safely to all temple ceremonies with great reverence and patience. A deeply rewarding spiritual journey.',
    language: 'English',
    isSample: true,
  },

  // 10. India (English)
  {
    id: 'rev-10',
    name: 'Suresh Reddy',
    location: 'Hyderabad, India',
    country: 'India',
    tripType: 'Group',
    rating: 5,
    review:
      'Organized an extended 10-day Rajasthan heritage tour for our college alumni group. Coordinating 8 travelers across Jaipur, Jodhpur, and Udaipur can be challenging, but Jayashakthi managed domestic travel, palace guides, and palace-view stays without a single hitch. Highly professional team.',
    text:
      'Organized an extended 10-day Rajasthan heritage tour for our college alumni group. Coordinating 8 travelers across Jaipur, Jodhpur, and Udaipur can be challenging, but Jayashakthi managed domestic travel, palace guides, and palace-view stays without a single hitch. Highly professional team.',
    language: 'English',
    isSample: true,
  },

  // 11. Germany (English)
  {
    id: 'rev-11',
    name: 'Lukas & Hanna Weber',
    location: 'Munich, Germany',
    country: 'Germany',
    tripType: 'Cultural',
    rating: 5,
    review:
      'We appreciate precision and punctuality, and Jayashakthi delivered both during our two-week South Indian journey. The day-by-day plan provided before arrival was thorough, vehicle quality was excellent, and the flexibility to adjust afternoon schedules when we wanted extra rest was very accommodating.',
    text:
      'We appreciate precision and punctuality, and Jayashakthi delivered both during our two-week South Indian journey. The day-by-day plan provided before arrival was thorough, vehicle quality was excellent, and the flexibility to adjust afternoon schedules when we wanted extra rest was very accommodating.',
    language: 'English',
    isSample: true,
  },

  // 12. United States (English)
  {
    id: 'rev-12',
    name: 'Robert & Jennifer Clark',
    location: 'Chicago, United States',
    country: 'United States',
    tripType: 'Customized',
    rating: 5,
    review:
      'From the moment we arrived in Chennai to our departure from Kochi, the coordination was impeccable. Navigating Indian traffic and railway systems independently would have been daunting. Having a trusted driver and 24/7 WhatsApp assistance made our vacation relaxing and deeply memorable.',
    text:
      'From the moment we arrived in Chennai to our departure from Kochi, the coordination was impeccable. Navigating Indian traffic and railway systems independently would have been daunting. Having a trusted driver and 24/7 WhatsApp assistance made our vacation relaxing and deeply memorable.',
    language: 'English',
    isSample: true,
  },

  // 13. India (English)
  {
    id: 'rev-13',
    name: 'Meena Balakrishnan',
    location: 'Madurai, India',
    country: 'India',
    tripType: 'Family',
    rating: 5,
    review:
      'Booked a private tour for my in-laws visiting from North India to explore Kanyakumari, Rameshwaram, and Thanjavur. Pacing was very gentle and elder-friendly, with regular refreshment breaks and wheelchair assistance wherever needed at temple entrances. Truly compassionate and reliable travel service.',
    text:
      'Booked a private tour for my in-laws visiting from North India to explore Kanyakumari, Rameshwaram, and Thanjavur. Pacing was very gentle and elder-friendly, with regular refreshment breaks and wheelchair assistance wherever needed at temple entrances. Truly compassionate and reliable travel service.',
    language: 'English',
    isSample: true,
  },

  // 14. Canada (English)
  {
    id: 'rev-14',
    name: 'Emily Watson',
    location: 'Toronto, Canada',
    country: 'Canada',
    tripType: 'Customized',
    rating: 5,
    review:
      'As a solo traveler joining friends later in India, safety and clear communication were my top priorities. The Jayashakthi team communicated everything clearly over WhatsApp, met me right at airport arrivals, and provided trustworthy chauffeurs who looked after every single detail.',
    text:
      'As a solo traveler joining friends later in India, safety and clear communication were my top priorities. The Jayashakthi team communicated everything clearly over WhatsApp, met me right at airport arrivals, and provided trustworthy chauffeurs who looked after every single detail.',
    language: 'English',
    isSample: true,
  },

  // 15. United Arab Emirates (English)
  {
    id: 'rev-15',
    name: 'Tariq & Fatima Al-Hashimi',
    location: 'Dubai, United Arab Emirates',
    country: 'United Arab Emirates',
    tripType: 'Couple',
    rating: 5,
    review:
      'We chose Jayashakthi for a luxury getaway to Munnar and Kerala backwaters. The premium SUV was immaculately maintained, private resort check-ins were swift, and the itinerary was tailored to our preference for privacy and scenic relaxation. We look forward to planning our North India trip with them next winter.',
    text:
      'We chose Jayashakthi for a luxury getaway to Munnar and Kerala backwaters. The premium SUV was immaculately maintained, private resort check-ins were swift, and the itinerary was tailored to our preference for privacy and scenic relaxation. We look forward to planning our North India trip with them next winter.',
    language: 'English',
    isSample: true,
  },
];
