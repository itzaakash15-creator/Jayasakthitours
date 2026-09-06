export type ClientPhotoCategory =
  | 'All'
  | 'Group Tours'
  | 'Temple Visits'
  | 'South India'
  | 'Tamil Nadu'
  | 'Rajasthan'
  | 'Cultural Experiences';

export const clientPhotoCategories: ClientPhotoCategory[] = [
  'All',
  'Group Tours',
  'Temple Visits',
  'South India',
  'Tamil Nadu',
  'Rajasthan',
  'Cultural Experiences',
];

export interface ClientPhoto {
  id: number | string;
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
 * Curated from real photographs of journeys organized by Jayashakthi Tours & Travels.
 * Combines existing verified traveler photos with newly added past-client journey photographs.
 */
export const clientPhotos: ClientPhoto[] = [
  {
    id: 1,
    image: '/images/client-travel/client-travel-01.jpg',
    destination: 'Tamil Nadu Countryside',
    category: 'Group Tours',
    categories: ['Group Tours', 'South India', 'Tamil Nadu'],
    caption: 'International group enjoying the lush rural landscapes and village fields of Tamil Nadu',
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 2,
    image: '/images/client-travel/client-travel-02.jpg',
    destination: 'Airavatesvara Temple, Darasuram',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences', 'Tamil Nadu', 'South India'],
    caption: 'Travelers resting on the UNESCO World Heritage stone chariot mandapa steps in Kumbakonam',
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 3,
    image: '/images/client-travel/client-travel-03.jpg',
    destination: 'Thirumalai Nayakkar Mahal, Madurai',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'Group Tours', 'Tamil Nadu', 'South India'],
    caption: 'Group photo in the majestic courtyard arcade of the 17th-century Nayak palace in Madurai',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 4,
    image: '/images/client-travel/client-travel-04.jpg',
    destination: 'Meenakshi Temple, Madurai',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences', 'Tamil Nadu', 'South India'],
    caption: 'Travelers in traditional attire before the iconic colorful gopuram of Madurai Meenakshi Amman Temple',
    featured: true,
    aspect: 'portrait',
  },
  {
    id: 5,
    image: '/images/client-travel/client-travel-05.jpg',
    destination: 'Brihadisvara Temple, Thanjavur',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences', 'Tamil Nadu', 'South India'],
    caption: 'Tour group at the entrance gateway of the Great Chola Big Temple in Thanjavur',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 6,
    image: '/images/client-travel/client-travel-06.jpg',
    destination: 'Kanyakumari Coast, Tamil Nadu',
    category: 'Group Tours',
    categories: ['Group Tours', 'South India', 'Tamil Nadu'],
    caption: 'Playful travel moments at sunset by the rocky promenade of India’s southernmost tip in Kanyakumari',
    featured: false,
    aspect: 'landscape',
  },
  {
    id: 7,
    image: '/images/client-travel/client-travel-07.jpg',
    destination: 'Mahabalipuram, Tamil Nadu',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'Tamil Nadu', 'South India'],
    caption: 'Authentic village cart encounter and cultural exploration near the coastal heritage town of Mahabalipuram',
    featured: false,
    aspect: 'landscape',
  },
  {
    id: 8,
    image: '/images/client-travel/client-travel-08.jpg',
    destination: 'Pichavaram Mangroves, Chidambaram',
    category: 'Group Tours',
    categories: ['Group Tours', 'South India', 'Tamil Nadu'],
    caption: 'Boating excursion with life jackets through the winding tidal mangrove canals of Pichavaram',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 9,
    image: '/images/client-travel/client-travel-09.jpg',
    destination: 'Tamil Nadu Heritage Village',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'South India', 'Tamil Nadu'],
    caption: 'Immersive countryside walk among towering palm groves and traditional farmland in Tamil Nadu',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 10,
    image: '/images/client-travel/client-travel-10.jpg',
    destination: 'Thirumalai Nayakkar Palace, Madurai',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences', 'South India', 'Tamil Nadu'],
    caption: 'Travelers marveling at the soaring stucco arches and classical pillars of Madurai’s royal palace',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 11,
    image: '/images/past-clients/past-client-10.jpg',
    destination: 'Taj Mahal, Agra',
    category: 'Group Tours',
    categories: ['Group Tours', 'Cultural Experiences'],
    caption: 'Our traveler group gathered before the monumental Darwaza-i-Rauza (Great Gate) of the Taj Mahal in Agra',
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 12,
    image: '/images/past-clients/past-client-01.jpg',
    destination: 'Amber Fort, Jaipur',
    category: 'Rajasthan',
    categories: ['Rajasthan', 'Cultural Experiences'],
    caption: 'Scenic vista of historic Amber Fort, Maota Lake, and the Aravalli hill fortifications in Jaipur, Rajasthan',
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 13,
    image: '/images/past-clients/past-client-02.jpg',
    destination: 'Amer Palace, Jaipur',
    category: 'Rajasthan',
    categories: ['Rajasthan', 'Cultural Experiences'],
    caption: 'The geometric Mughal Charbagh garden and Jaigarh Fort seen from the Amber Palace corridors',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 14,
    image: '/images/past-clients/past-client-03.jpg',
    destination: 'Amber Fort, Jaipur',
    category: 'Rajasthan',
    categories: ['Rajasthan', 'Cultural Experiences'],
    caption: 'Courtyard and Aravalli hills framed through a carved star-shaped palace window at Amber Fort',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 15,
    image: '/images/past-clients/past-client-04.jpg',
    destination: 'Amer Town, Jaipur',
    category: 'Rajasthan',
    categories: ['Rajasthan', 'Cultural Experiences'],
    caption: 'Panoramic view overlooking historic Amer settlement and the hill ramparts from the fort palace',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 16,
    image: '/images/past-clients/past-client-05.jpg',
    destination: 'Sheesh Mahal, Jaipur',
    category: 'Rajasthan',
    categories: ['Rajasthan', 'Cultural Experiences'],
    caption: 'Classical scalloped arches opening onto the manicured central garden of Amber Fort Palace',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 17,
    image: '/images/past-clients/past-client-06.jpg',
    destination: 'Raisina Hill, New Delhi',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences'],
    caption: 'Grand colonial heritage architecture and sandstone domes of Central Secretariat in New Delhi',
    featured: false,
    aspect: 'landscape',
  },
  {
    id: 18,
    image: '/images/past-clients/past-client-07.jpg',
    destination: 'Lotus Temple, New Delhi',
    category: 'Cultural Experiences',
    categories: ['Cultural Experiences'],
    caption: 'The iconic white marble lotus petals of the Baháʼí House of Worship amidst landscaped lawns in New Delhi',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 19,
    image: '/images/past-clients/past-client-08.jpg',
    destination: 'Dashashwamedh Ghat, Varanasi',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences'],
    caption: 'Bustling pilgrimage boats and riverside temple spires at the sacred Dashashwamedh Ghat along the Ganges in Varanasi',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 20,
    image: '/images/past-clients/past-client-09.jpg',
    destination: 'Sarnath, Uttar Pradesh',
    category: 'Temple Visits',
    categories: ['Temple Visits', 'Cultural Experiences'],
    caption: 'The revered 80-foot Standing Buddha statue and golden Dharma wheel at the holy Buddhist site of Sarnath',
    featured: false,
    aspect: 'portrait',
  },
];

/**
 * Combines original website gallery images with newly published Supabase storage gallery photos.
 * Guarantees that all 20 original images are always present and never disappear.
 * If an image is hosted in Supabase Storage, it serves directly from the Supabase Storage CDN.
 * Newly uploaded photos from Admin Portal are placed at the beginning of the gallery.
 */
export function mergeWithOriginalGallery(
  publishedSupabaseRecords: Array<{
    id?: string;
    image_url?: string;
    title?: string;
    caption?: string;
    location?: string;
    category?: string;
    aspect?: 'landscape' | 'portrait' | 'square';
    status?: string;
  }> = []
): ClientPhoto[] {
  const getFileBasename = (urlOrPath: string) => {
    if (!urlOrPath) return '';
    const clean = urlOrPath.split('?')[0];
    const parts = clean.split('/');
    return (parts[parts.length - 1] || '').toLowerCase().trim();
  };

  // Map of original client photos by their filename basename
  const originalByBasename = new Map<string, ClientPhoto>();
  clientPhotos.forEach((photo) => {
    const base = getFileBasename(photo.image);
    if (base) originalByBasename.set(base, photo);
  });

  // Keep a copy of client photos that can have their CDN image URL updated from Supabase Storage
  const updatedOriginals = clientPhotos.map((p) => ({ ...p }));
  const matchedOriginalBases = new Set<string>();

  const newAdminPhotos: ClientPhoto[] = [];

  (publishedSupabaseRecords || [])
    .filter((r) => {
      if (!r || r.status !== 'Published') return false;
      if (!r.image_url || typeof r.image_url !== 'string' || !r.image_url.trim()) return false;
      return true;
    })
    .forEach((r, idx) => {
      const recordBase = getFileBasename(r.image_url || '');
      // Check if this matches one of the 20 original client photos
      const matchOriginal = originalByBasename.get(recordBase);
      if (matchOriginal && !matchedOriginalBases.has(recordBase)) {
        matchedOriginalBases.add(recordBase);
        // Serve from the Supabase Storage CDN URL
        const targetIndex = updatedOriginals.findIndex((p) => getFileBasename(p.image) === recordBase);
        if (targetIndex !== -1) {
          updatedOriginals[targetIndex] = {
            ...updatedOriginals[targetIndex],
            image: r.image_url!,
            ...(r.title && { destination: r.title }),
            ...(r.caption && { caption: r.caption }),
          };
        }
      } else if (!matchOriginal) {
        // Brand new photo uploaded in Admin Portal
        const catList: ClientPhotoCategory[] = ['All'];
        const cat = r.category || 'Client Experiences';
        if (cat === 'Temple Tours') catList.push('Temple Visits');
        if (cat === 'South India' || cat === 'Kerala') catList.push('South India', 'Tamil Nadu');
        if (cat === 'Rajasthan' || cat === 'Golden Triangle') catList.push('Rajasthan');
        if (cat === 'Client Experiences' || cat === 'Cab & Travel') catList.push('Group Tours', 'Cultural Experiences');
        catList.push('Cultural Experiences');

        newAdminPhotos.push({
          id: r.id || `supa-${idx}-${Date.now()}`,
          image: String(r.image_url || '').trim(),
          destination: r.location || r.title || 'India',
          category: cat,
          categories: Array.from(new Set(catList)),
          caption: r.caption || r.title || 'Travel memory with Jayashakthi Tours',
          featured: true,
          aspect: r.aspect || 'landscape',
        });
      }
    });

  // ALWAYS return new admin photos at the front + all 20 client photos
  return [...newAdminPhotos, ...updatedOriginals];
}

