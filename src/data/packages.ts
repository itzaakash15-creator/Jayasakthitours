export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  destinations: string[];
  duration: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  category: 'South India' | 'Kerala' | 'Heritage' | 'Spiritual';
  idealFor: string;
}

export const tourPackagesData: TourPackage[] = [
  {
    id: 'south-india-explorer',
    title: 'South India Explorer',
    slug: 'south-india-explorer',
    tagline: 'The definitive Grand Tour of Southern India',
    destinations: ['Chennai', 'Pondicherry', 'Thanjavur', 'Madurai', 'Rameswaram', 'Kanyakumari', 'Kerala'],
    duration: '10–14 Days',
    description: 'A complete South India journey combining heritage, ancient living temples, French colonial coastal quarters, vibrant culture and tranquil Kerala backwater experiences.',
    highlights: [
      'UNESCO Brihadeeswarar Temple in Thanjavur',
      'French quarters & promenade in Pondicherry',
      'Majestic Meenakshi Amman Temple in Madurai',
      'India’s southern tip at Kanyakumari',
      'Tranquil Kerala backwaters houseboat cruise',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', // South India Temple / Madurai
    category: 'South India',
    idealFor: 'First-time visitors & comprehensive culture lovers',
  },
  {
    id: 'kerala-experience',
    title: 'Kerala Experience',
    slug: 'kerala-experience',
    tagline: 'Misty hills, aromatic spices & emerald backwaters',
    destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kovalam'],
    duration: '7–10 Days',
    description: 'A relaxed Kerala journey covering misty tea plantation hill stations, wildlife reserves, tranquil houseboat backwaters, and pristine Arabian Sea coastal experiences.',
    highlights: [
      'Historic Fort Kochi and iconic Chinese fishing nets',
      'Lush rolling tea estates and waterfalls of Munnar',
      'Periyar wildlife reserve and spice plantation walks',
      'Overnight traditional private houseboat in Alleppey',
      'Relaxation along the crescent beaches of Kovalam',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', // Kerala Backwaters
    category: 'Kerala',
    idealFor: 'Couples, families & leisure travelers',
  },
  {
    id: 'golden-triangle',
    title: 'Golden Triangle',
    slug: 'golden-triangle',
    tagline: 'Imperial history, the Taj Mahal & regal Jaipur',
    destinations: ['Delhi', 'Agra', 'Jaipur'],
    duration: '5–7 Days',
    description: "Explore India's historic capital city, the timeless ivory marble monument of the Taj Mahal, and the captivating royal palaces and hilltop forts of Rajasthan.",
    highlights: [
      'Humayun’s Tomb and Old Delhi heritage rickshaw ride',
      'Sunrise view of the iconic Taj Mahal in Agra',
      'Mighty Agra Fort and Mughal architecture',
      'Amber Fort elephant pathways and City Palace in Jaipur',
      'Iconic honeycomb facade of Hawa Mahal',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80', // Taj Mahal
    category: 'Heritage',
    idealFor: 'Classic introduction to North India',
  },
  {
    id: 'royal-rajasthan',
    title: 'Royal Rajasthan',
    slug: 'royal-rajasthan',
    tagline: 'Golden dunes, grand fortresses & lakeside palaces',
    destinations: ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer'],
    duration: '8–12 Days',
    description: 'Experience towering sandstone forts, opulent lake palaces, shimmering Thar desert landscapes, and the legendary hospitality of Rajasthan’s royal kingdoms.',
    highlights: [
      'Pink City architecture and astronomical observatory of Jaipur',
      'Blue City vistas from Mehrangarh Fort in Jodhpur',
      'Romantic boat ride on Lake Pichola in Udaipur',
      'Sunset camel ride and folk music in Jaisalmer dunes',
      'Authentic Rajasthani culinary feast experiences',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80', // Rajasthan Palace / Fort
    category: 'Heritage',
    idealFor: 'Photography enthusiasts & architecture travelers',
  },
  {
    id: 'spiritual-india',
    title: 'Spiritual India',
    slug: 'spiritual-india',
    tagline: 'Sacred riverbanks, timeless rituals & holy cities',
    destinations: ['Varanasi', 'Ayodhya', 'Prayagraj'],
    duration: '5–8 Days',
    description: 'A spiritually focused journey through some of humanity’s most ancient living cultural and religious destinations along the sacred Ganges and holy confluence.',
    highlights: [
      'Dawn boat cruise along the historic Varanasi Ghats',
      'Mesmerizing evening Ganga Aarti ceremony with oil lamps',
      'Sarnath deer park where the Buddha first preached',
      'Holy Triveni Sangam boat ride in Prayagraj',
      'Pilgrimage shrines and temple architecture of Ayodhya',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80', // Varanasi Ghats
    category: 'Spiritual',
    idealFor: 'Spiritual seekers & cultural immersion travelers',
  },
  {
    id: 'south-india-temple-trail',
    title: 'South India Temple Trail',
    slug: 'south-india-temple-trail',
    tagline: 'Dravidian gopurams, living heritage & sacred rituals',
    destinations: ['Chennai', 'Kanchipuram', 'Thanjavur', 'Madurai', 'Rameswaram'],
    duration: '6–9 Days',
    description: "A deeply authentic temple-focused journey through South India's most significant spiritual, sculptural, and architectural heritage destinations.",
    highlights: [
      'Kapaleeshwarar & ancient rock-cut cave temples in Kanchipuram',
      'Soaring thousand-year-old vimana of Thanjavur Big Temple',
      'Evening closing ceremony darshan at Madurai Meenakshi',
      'Longest sculptured pillared corridors in Rameswaram',
      'Sacred Agni Theertham sea bathing and Ramanathaswamy shrine',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80', // South India Gopuram
    category: 'South India',
    idealFor: 'Temple devotees, families & heritage scholars',
  },
];
