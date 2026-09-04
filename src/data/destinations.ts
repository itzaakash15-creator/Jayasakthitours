export interface DestinationItem {
  id: string;
  name: string;
  region: 'South India' | 'North India' | 'West & Coastal';
  headline: string;
  description: string;
  keyAttractions: string[];
  imageUrl: string;
  travelStyle: string;
}

export const destinationsData: DestinationItem[] = [
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    region: 'South India',
    headline: 'Ancient Dravidian Temples & Living Heritage',
    description: 'Home to monumental soaring gopurams, vibrant classical traditions, coastal French Pondicherry, and the southern tip of the subcontinent at Kanyakumari.',
    keyAttractions: ['Madurai Meenakshi Temple', 'Thanjavur Brihadeeswarar', 'Mahabalipuram Shore Temple', 'Rameswaram Sea Bridge'],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    travelStyle: 'Spiritual, Heritage & Cultural Architecture',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    region: 'South India',
    headline: 'God’s Own Country — Backwaters & Misty Hills',
    description: 'Serene emerald palm-lined canals, tranquil private houseboats, misty aromatic tea slopes of Munnar, and soothing Ayurvedic traditions.',
    keyAttractions: ['Alleppey Backwaters', 'Munnar Tea Plantations', 'Fort Kochi Heritage', 'Periyar Wildlife Sanctuary'],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    travelStyle: 'Relaxation, Nature & Backwater Cruising',
  },
  {
    id: 'golden-triangle',
    name: 'Delhi, Agra & Jaipur',
    region: 'North India',
    headline: 'The Imperial Crown & The Taj Mahal',
    description: 'The definitive introduction to India: Delhi’s monuments and bustling bazaars, Agra’s poetic white marble Taj Mahal, and Jaipur’s regal pink sandstone palaces.',
    keyAttractions: ['Taj Mahal & Agra Fort', 'Amber Palace & Hawa Mahal', 'Humayun’s Tomb & Old Delhi'],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    travelStyle: 'Historic Monuments & World Wonders',
  },
  {
    id: 'rajasthan',
    name: 'Royal Rajasthan',
    region: 'North India',
    headline: 'Land of Maharajas, Fortresses & Dunes',
    description: 'Marvel at golden Thar desert dunes under starlit skies, shimmering lake palaces in Udaipur, and impenetrable blue-walled citadels in Jodhpur.',
    keyAttractions: ['Udaipur Lake Pichola', 'Mehrangarh Fort Jodhpur', 'Jaisalmer Sand Dunes', 'Jaipur City Palace'],
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80',
    travelStyle: 'Palaces, Royal Hospitality & Desert Safari',
  },
  {
    id: 'varanasi',
    name: 'Varanasi & Sacred North',
    region: 'North India',
    headline: 'The Spiritual Heart of Ancient India',
    description: 'Experience one of the world’s oldest continuously inhabited cities along the sacred Ganges river, with dawn boat rides and mystical evening aarti rituals.',
    keyAttractions: ['Ganga Aarti at Dashashwamedh', 'Dawn River Boat Cruise', 'Sarnath Buddhist Stupa', 'Kashi Vishwanath Corridor'],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    travelStyle: 'Deep Spirituality, Sacred Rituals & History',
  },
  {
    id: 'karnataka',
    name: 'Karnataka & Hampi',
    region: 'South India',
    headline: 'Boulders, Empires & Royal Mysore',
    description: 'From the surreal boulder-strewn Vijayanagara ruins of UNESCO Hampi to the opulent Mysore Palace and coffee-scented hills of Coorg.',
    keyAttractions: ['Hampi Stone Chariot', 'Mysore Royal Palace', 'Coorg Coffee Estates', 'Belur & Halebeedu Hoysala Temples'],
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f444f410?auto=format&fit=crop&w=1000&q=80',
    travelStyle: 'Ancient Empires & Plantation Hills',
  },
];
