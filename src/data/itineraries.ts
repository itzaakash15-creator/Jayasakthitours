export interface ItineraryDayItem {
  dayNumber: number;
  title: string;
  route: string;
  distanceTime?: string;
  highlights: string[];
  schedule: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  stayLocation: string;
  transportMode: string;
}

export interface DetailedItinerary {
  id: string;
  name: string;
  duration: string;
  destinationsCovered: string;
  overview: string;
  days: ItineraryDayItem[];
}

export const sampleItineraries: DetailedItinerary[] = [
  {
    id: 'south-india-signature',
    name: 'South India Heritage & Coastal Arc',
    duration: '10 Days / 9 Nights',
    destinationsCovered: 'Chennai • Mahabalipuram • Pondicherry • Thanjavur • Madurai • Rameswaram • Kerala',
    overview:
      'A masterfully planned journey showcasing how we organize every segment: private airport reception, scenic highway transitions, temple ceremonies, boutique stays, and seamless departure connections.',
    days: [
      {
        dayNumber: 1,
        title: 'Arrive in Chennai — Welcome to India',
        route: 'Chennai International Airport → Hotel',
        distanceTime: 'Airport transfer (~45 mins)',
        highlights: ['Warm terminal meet & greet', 'Assistance with luggage & local SIM', 'Comfortable hotel check-in & rest'],
        schedule: {
          morning: 'Arrival into Chennai International Airport. Chauffeur waiting with personalized welcome signage.',
          afternoon: 'Check-in to your selected hotel. Relax and unwind after your long international flight.',
          evening: 'Gentle orientation drive along Marina Beach with breezy coastal views. Traditional South Indian welcome dinner.',
        },
        stayLocation: 'Chennai',
        transportMode: 'Private AC Sedan / SUV / Tempo Traveller',
      },
      {
        dayNumber: 2,
        title: 'Explore Chennai — Colonial Heritage & Living Culture',
        route: 'Chennai City Sightseeing',
        distanceTime: 'Local sightseeing routes',
        highlights: ['Kapaleeshwarar Temple (Mylapore)', 'San Thome Basilica', 'Government Museum bronze gallery'],
        schedule: {
          morning: 'Visit the 7th-century Dravidian Kapaleeshwarar Temple in Mylapore and witness morning pooja rituals.',
          afternoon: 'Explore the neo-Gothic San Thome Cathedral built over St. Thomas’s tomb, followed by fresh filter coffee.',
          evening: 'Discover fine South Indian bronze art at the National Museum. Evening free for leisurely local shopping.',
        },
        stayLocation: 'Chennai',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 3,
        title: 'Chennai → Mahabalipuram (Mamallapuram)',
        route: 'Chennai → East Coast Road → Mahabalipuram',
        distanceTime: '55 km (~1.5 hours scenic drive)',
        highlights: ['Shore Temple by the Bay of Bengal', 'Arjuna’s Penance rock relief', 'Pancha Rathas (Five Rathas)'],
        schedule: {
          morning: 'Breakfast and leisurely departure along the scenic East Coast Road (ECR).',
          afternoon: 'Check-in to coastal beach resort. Guided walk through the UNESCO-listed 7th-century rock monuments and Arjuna’s Penance.',
          evening: 'Marvel at the sunset against the ancient Shore Temple by the crashing waves. Fresh coastal seafood dining.',
        },
        stayLocation: 'Mahabalipuram',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 4,
        title: 'Mahabalipuram → Pondicherry (Puducherry)',
        route: 'Mahabalipuram → Auroville → French Quarter',
        distanceTime: '100 km (~2 hours)',
        highlights: ['Matrimandir viewing in Auroville', 'French colonial White Town', 'Promenade seaside walk'],
        schedule: {
          morning: 'Scenic drive southward to the international experimental township of Auroville and the golden Matrimandir sphere.',
          afternoon: 'Check-in to your French-heritage boutique stay in Pondicherry. Stroll past bougainvillea-framed colonial villas.',
          evening: 'Sunset walk along the lively Promenade Beach. Dinner at an open-air Franco-Tamil bistro.',
        },
        stayLocation: 'Pondicherry',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 5,
        title: 'Pondicherry → Chidambaram → Thanjavur',
        route: 'Pondicherry → Chidambaram Nataraja → Thanjavur',
        distanceTime: '175 km (~4 hours with temple stop)',
        highlights: ['Chidambaram Nataraja Cosmic Dance Temple', 'Paddy fields of the Cauvery Delta', 'Brihadeeswarar Temple at twilight'],
        schedule: {
          morning: 'Departure through the lush green Cauvery delta. Mid-morning stop at ancient Chidambaram temple.',
          afternoon: 'Arrive in Thanjavur, ancient royal capital of the Cholas. Rest and refresh.',
          evening: 'Step into the awe-inspiring 1,000-year-old UNESCO Brihadeeswarar Big Temple as the granite glows warm gold at dusk.',
        },
        stayLocation: 'Thanjavur',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 6,
        title: 'Thanjavur → Chettinad → Madurai',
        route: 'Thanjavur → Chettinad Mansions → Madurai',
        distanceTime: '190 km (~4.5 hours)',
        highlights: ['Thanjavur Art Gallery & royal palace', 'Grand heritage mansions of Chettinad', 'Madurai Meenakshi night ceremony'],
        schedule: {
          morning: 'Visit the Thanjavur Maratha Palace and view local artisan bronze casting and Tanjore painting workshops.',
          afternoon: 'Drive through the palatial heritage villages of Chettinad. Enjoy an authentic 18-dish banana-leaf lunch.',
          evening: 'Check in to Madurai hotel. Witness the unforgettable evening bedtime ritual at Sri Meenakshi Sundareswarar Temple.',
        },
        stayLocation: 'Madurai',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 7,
        title: 'Madurai → Rameswaram Island',
        route: 'Madurai → Pamban Bridge → Rameswaram',
        distanceTime: '170 km (~3.5 hours)',
        highlights: ['Iconic Pamban Sea Bridge', 'Ramanathaswamy 1,200 pillared corridor', 'Sacred Agni Theertham waters'],
        schedule: {
          morning: 'Morning exploration of the Thirumalai Nayakkar Palace. Drive east toward the sacred island of Rameswaram.',
          afternoon: 'Cross the dramatic Pamban Bridge over the turquoise ocean. Check in to Rameswaram hotel.',
          evening: 'Darshan at Sri Ramanathaswamy Temple, marveling at the world’s longest sculptured stone temple corridors.',
        },
        stayLocation: 'Rameswaram',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 8,
        title: 'Rameswaram → Dhanushkodi → Kanyakumari',
        route: 'Rameswaram → Ghost Town Dhanushkodi → Kanyakumari',
        distanceTime: '310 km (~5.5 hours)',
        highlights: ['Dhanushkodi tip of India view', 'Triveni Sangam confluence of 3 oceans', 'Sunset at the southernmost point'],
        schedule: {
          morning: 'Early trip to Dhanushkodi beach where the Indian Ocean and Bay of Bengal meet. Scenic coastal drive south.',
          afternoon: 'Arrive at Kanyakumari, India’s southern tip. Check-in and relax.',
          evening: 'Take the ferry to Vivekananda Rock Memorial & Thiruvalluvar Statue. Watch the ocean sunset across the water.',
        },
        stayLocation: 'Kanyakumari',
        transportMode: 'Private AC Chauffeured Vehicle',
      },
      {
        dayNumber: 9,
        title: 'Kanyakumari → Kovalam / Alleppey (Kerala)',
        route: 'Kanyakumari → Suchindram → Kerala Backwaters',
        distanceTime: '230 km (~5 hours)',
        highlights: ['Suchindram Thanumalayan Temple', 'Entering lush green Kerala', 'Traditional private luxury houseboat boarding'],
        schedule: {
          morning: 'Watch the sunrise over the three seas. Drive past coconut groves and water lily canals into Kerala.',
          afternoon: 'Board your private, air-conditioned Kerala houseboat in Alleppey. Savor freshly prepared Keralan lunch on board.',
          evening: 'Glide through tranquil village canals, palm-fringed lagoons, and paddy fields. Serene overnight stay on water.',
        },
        stayLocation: 'Alleppey (Overnight Luxury Houseboat)',
        transportMode: 'Chauffeured Vehicle + Private Houseboat',
      },
      {
        dayNumber: 10,
        title: 'Alleppey → Kochi Airport — Journey Back Home',
        route: 'Alleppey → Fort Kochi → Cochin International Airport',
        distanceTime: '85 km (~2.5 hours transfer)',
        highlights: ['Morning canoe ride in backwaters', 'Fort Kochi Chinese fishing nets', 'Punctual airport departure transfer'],
        schedule: {
          morning: 'Peaceful breakfast on the houseboat deck. Disembark and drive to the spice port of Fort Kochi.',
          afternoon: 'Browse spice markets, antique shops, and the Mattancherry Dutch Palace.',
          evening: 'Punctual transfer directly to Cochin International Airport (COK) for your flight back home, completing your unforgettable journey.',
        },
        stayLocation: 'Departure',
        transportMode: 'Private AC Airport Transfer',
      },
    ],
  },
];
