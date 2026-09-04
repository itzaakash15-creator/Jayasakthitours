export type GalleryCategory =
  | 'All'
  | 'Travelers'
  | 'Hotels'
  | 'Temples'
  | 'Nature'
  | 'Transport'
  | 'Culture'
  | 'Group Tours';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  location: string;
  caption: string;
  imageUrl: string;
  altText: string;
}

export const galleryCategories: GalleryCategory[] = [
  'All',
  'Travelers',
  'Hotels',
  'Temples',
  'Nature',
  'Transport',
  'Culture',
  'Group Tours',
];

export const galleryData: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Brihadeeswarar Temple Vimana',
    category: 'Temples',
    location: 'Thanjavur, Tamil Nadu',
    caption: 'The majestic 1,000-year-old monolithic granite vimana glowing at golden hour.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    altText: 'Ancient granite temple tower in Tamil Nadu at dusk',
  },
  {
    id: 'gal-2',
    title: 'Serene Alleppey Houseboat',
    category: 'Nature',
    location: 'Alleppey, Kerala',
    caption: 'Cruising through the emerald palm-fringed backwaters of Kerala on a private luxury houseboat.',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    altText: 'Traditional wooden houseboat floating on calm backwaters in Kerala',
  },
  {
    id: 'gal-3',
    title: 'International Family at the Taj Mahal',
    category: 'Travelers',
    location: 'Agra, Uttar Pradesh',
    caption: 'International travelers experiencing the majestic white marble monument at sunrise.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    altText: 'Travelers visiting the iconic Taj Mahal reflecting in pools',
  },
  {
    id: 'gal-4',
    title: 'Air-Conditioned Chauffeur Travel',
    category: 'Transport',
    location: 'South India Highways',
    caption: 'Clean, modern air-conditioned vehicles and professional chauffeurs for intercity routes.',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    altText: 'Comfortable premium private travel car on scenic open road',
  },
  {
    id: 'gal-5',
    title: 'Heritage Courtyard Boutique Hotel',
    category: 'Hotels',
    location: 'Chettinad & Madurai, Tamil Nadu',
    caption: 'Teakwood pillars, central courtyards, and tranquil hospitality in heritage boutique hotels.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    altText: 'Restored heritage hotel courtyard with traditional columns and gentle illumination',
  },
  {
    id: 'gal-6',
    title: 'Sacred Evening Ganga Aarti',
    category: 'Culture',
    location: 'Varanasi, Uttar Pradesh',
    caption: 'Priests holding blazing multi-tiered brass oil lamps in devotional rhythm by the holy river.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    altText: 'Evening aarti prayer ceremony with fiery brass lamps in Varanasi',
  },
  {
    id: 'gal-7',
    title: 'Group Tour at Amber Fort',
    category: 'Group Tours',
    location: 'Jaipur, Rajasthan',
    caption: 'A coordinated private group tour exploring the royal sandstone ramparts and courtyards.',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    altText: 'Group of travelers admiring the grand architecture of Amber Fort in Jaipur',
  },
  {
    id: 'gal-8',
    title: 'Madurai Meenakshi Gopuram Details',
    category: 'Temples',
    location: 'Madurai, Tamil Nadu',
    caption: 'Intricate polychrome mythological sculptures adorning the soaring gopuram entrance.',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    altText: 'Vibrant and detailed sculpted Dravidian gopuram in Madurai',
  },
  {
    id: 'gal-9',
    title: 'Misty Rolling Tea Hills of Munnar',
    category: 'Nature',
    location: 'Munnar, Kerala',
    caption: 'Vast rolling green carpets of tea estates enveloped in gentle morning mountain mist.',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    altText: 'Lush green tea plantations under soft mist in Munnar hills',
  },
  {
    id: 'gal-10',
    title: 'Tempo Traveller Group Excursion',
    category: 'Transport',
    location: 'Tamil Nadu & Kerala Route',
    caption: 'Spacious high-roof Tempo Traveller keeping larger families and groups together comfortably.',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    altText: 'Group tour vehicle in motion along coastal highway',
  },
  {
    id: 'gal-11',
    title: 'Classical Bharatanatyam & Living Arts',
    category: 'Culture',
    location: 'Chennai & Thanjavur',
    caption: 'Expressive classical temple dance and traditional Carnatic musical heritage of South India.',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    altText: 'Traditional classical Indian dancer in ornate silk attire and jewelry',
  },
  {
    id: 'gal-12',
    title: 'Lakeside Palace Suite Experience',
    category: 'Hotels',
    location: 'Udaipur, Rajasthan',
    caption: 'Tranquil luxury overlooking shimmering waters with royal arches and handcrafted marble.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    altText: 'Luxury hotel terrace overlooking calm waters at dusk',
  },
];
