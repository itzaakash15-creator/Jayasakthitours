export type ClientPhotoCategory =
  | 'All'
  | 'Family Trips'
  | 'Group Tours'
  | 'Temple Visits'
  | 'South India'
  | 'Kerala'
  | 'Tamil Nadu'
  | 'Rajasthan'
  | 'Cultural Experiences';

export const clientPhotoCategories: ClientPhotoCategory[] = [
  'All',
  'Family Trips',
  'Group Tours',
  'Temple Visits',
  'South India',
  'Kerala',
  'Tamil Nadu',
  'Rajasthan',
  'Cultural Experiences',
];

export interface ClientPhoto {
  id: number;
  image: string;
  destination: string;
  category: string;
  categories: ClientPhotoCategory[];
  caption: string;
  isPlaceholder?: boolean;
  aspect?: 'portrait' | 'landscape' | 'square';
}

/**
 * Client Travel Memories Data
 * 
 * NOTE FOR WEBSITE ADMINISTRATOR / DEVELOPER:
 * Place authentic traveler and journey photos in `/public/images/client-travel/`
 * and update the image path, destination, category, and caption below.
 * Currently displaying curated sample journey photography as placeholders
 * representing trips arranged by Jayasakthi Tours & Travels.
 */
export const clientPhotos: ClientPhoto[] = [
  {
    id: 1,
    image: '/images/client-travel/photo-01.jpg',
    destination: 'Kerala',
    category: 'Backwater Experience',
    categories: ['Family Trips', 'Kerala', 'South India'],
    caption: 'A memorable family journey cruising the peaceful Alleppey palm-lined waterways on a private houseboat.',
    isPlaceholder: true,
    aspect: 'landscape',
  },
  {
    id: 2,
    image: '/images/client-travel/photo-02.jpg',
    destination: 'Madurai',
    category: 'Temple Visit',
    categories: ['Temple Visits', 'Tamil Nadu', 'South India'],
    caption: 'Witnessing the intricate polychrome gopurams and evening temple ceremonies at Meenakshi Amman Temple.',
    isPlaceholder: true,
    aspect: 'portrait',
  },
  {
    id: 3,
    image: '/images/client-travel/photo-03.jpg',
    destination: 'Rajasthan',
    category: 'Heritage Tour',
    categories: ['Group Tours', 'Rajasthan', 'Cultural Experiences'],
    caption: 'A private group excursion exploring the grand sandstone courtyards and ramparts of Amber Fort in Jaipur.',
    isPlaceholder: true,
    aspect: 'landscape',
  },
  {
    id: 4,
    image: '/images/client-travel/photo-04.jpg',
    destination: 'Chennai',
    category: 'Family Journey',
    categories: ['Family Trips', 'Tamil Nadu', 'South India', 'Cultural Experiences'],
    caption: 'Heritage walk and temple architecture discovery through Mylapore and coastal Chennai landmarks.',
    isPlaceholder: true,
    aspect: 'square',
  },
  {
    id: 5,
    image: '/images/client-travel/photo-05.jpg',
    destination: 'Pondicherry',
    category: 'Coastal Escape',
    categories: ['South India', 'Tamil Nadu', 'Cultural Experiences'],
    caption: 'Relaxing strolls through the French Quarter with vibrant colonial architecture and ocean promenade breezes.',
    isPlaceholder: true,
    aspect: 'portrait',
  },
  {
    id: 6,
    image: '/images/client-travel/photo-06.jpg',
    destination: 'Kanyakumari',
    category: 'South India Journey',
    categories: ['Temple Visits', 'South India', 'Tamil Nadu'],
    caption: 'Sunrise over the confluence of three oceans at the Vivekananda Rock Memorial on India’s southern tip.',
    isPlaceholder: true,
    aspect: 'landscape',
  },
  {
    id: 7,
    image: '/images/client-travel/photo-07.jpg',
    destination: 'Munnar',
    category: 'Hill Station Retreat',
    categories: ['Family Trips', 'Kerala', 'South India'],
    caption: 'Refreshing mountain holiday surrounded by lush tea estates, cool misty mornings, and scenic viewpoints.',
    isPlaceholder: true,
    aspect: 'portrait',
  },
  {
    id: 8,
    image: '/images/client-travel/photo-08.jpg',
    destination: 'Thanjavur',
    category: 'Great Living Temples',
    categories: ['Temple Visits', 'Tamil Nadu', 'South India', 'Cultural Experiences'],
    caption: 'Marveling at the 1,000-year-old monolithic granite vimana of Brihadeeswarar Temple with an expert guide.',
    isPlaceholder: true,
    aspect: 'landscape',
  },
  {
    id: 9,
    image: '/images/client-travel/photo-09.jpg',
    destination: 'Udaipur',
    category: 'Royal Heritage',
    categories: ['Rajasthan', 'Cultural Experiences'],
    caption: 'Lakeside palace tour and evening sunset boat ride over the tranquil waters of Lake Pichola.',
    isPlaceholder: true,
    aspect: 'landscape',
  },
  {
    id: 10,
    image: '/images/client-travel/photo-10.jpg',
    destination: 'Kochi',
    category: 'Spice Coast Exploration',
    categories: ['Group Tours', 'Kerala', 'South India', 'Cultural Experiences'],
    caption: 'Discovering historic Fort Kochi, the cantilevered Chinese fishing nets, and colonial spice trade routes.',
    isPlaceholder: true,
    aspect: 'square',
  },
  {
    id: 11,
    image: '/images/client-travel/photo-11.jpg',
    destination: 'Rameswaram',
    category: 'Island & Temple Trail',
    categories: ['Temple Visits', 'Tamil Nadu', 'South India'],
    caption: 'Crossing the iconic ocean bridge and walking through the majestic thousand-pillar temple corridors.',
    isPlaceholder: true,
    aspect: 'landscape',
  },
  {
    id: 12,
    image: '/images/client-travel/photo-12.jpg',
    destination: 'Varanasi',
    category: 'Spiritual Experience',
    categories: ['Temple Visits', 'Cultural Experiences'],
    caption: 'An unforgettable dawn boat ride along the Ganges ghats witnessing timeless spiritual traditions.',
    isPlaceholder: true,
    aspect: 'portrait',
  },
];
