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
  destination?: string;
  category?: string;
  categories: ClientPhotoCategory[];
  caption?: string;
  featured?: boolean;
  aspect: 'portrait' | 'landscape' | 'square';
}

/**
 * Authentic Client Travel Memories
 * Curated from real photographs of journeys organized by Jayasakthi Tours & Travels.
 */
export const clientPhotos: ClientPhoto[] = [
  {
    id: 1,
    image: '/images/client-travel/client-travel-01.jpg',
    category: 'Group Tours',
    categories: ['Group Tours', 'South India'],
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 2,
    image: '/images/client-travel/client-travel-02.jpg',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences', 'South India'],
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 3,
    image: '/images/client-travel/client-travel-03.jpg',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'Group Tours', 'South India'],
    featured: true,
    aspect: 'portrait',
  },
  {
    id: 4,
    image: '/images/client-travel/client-travel-04.jpg',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences', 'South India'],
    featured: true,
    aspect: 'portrait',
  },
  {
    id: 5,
    image: '/images/client-travel/client-travel-05.jpg',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences', 'South India'],
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 6,
    image: '/images/client-travel/client-travel-06.jpg',
    category: 'Group Tours',
    categories: ['Group Tours', 'South India'],
    featured: false,
    aspect: 'landscape',
  },
  {
    id: 7,
    image: '/images/client-travel/client-travel-07.jpg',
    destination: 'Mahabalipuram',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'Tamil Nadu', 'South India'],
    featured: false,
    aspect: 'landscape',
  },
  {
    id: 8,
    image: '/images/client-travel/client-travel-08.jpg',
    category: 'Group Tours',
    categories: ['Group Tours', 'South India'],
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 9,
    image: '/images/client-travel/client-travel-09.jpg',
    category: 'South India',
    categories: ['South India', 'Group Tours'],
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 10,
    image: '/images/client-travel/client-travel-10.jpg',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'South India'],
    featured: false,
    aspect: 'portrait',
  },
];
