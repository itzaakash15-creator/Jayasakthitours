export type BookingStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export type ServiceType = 'Tour Package' | 'Cab / Chauffeur' | 'Custom Trip';

export interface BookingEnquiry {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string;
  service_type: ServiceType;
  package_name: string;
  pickup_location: string;
  destination: string;
  travel_date: string;
  travel_style: string;
  adults_count: number;
  children_count: number;
  preferred_vehicle: string;
  accommodation_preference: string;
  guide_requirement: string;
  special_requests: string;
  notes?: string;
  status: BookingStatus;
  estimated_budget?: string;
}

export interface AdminActivity {
  id: string;
  type: 'enquiry_received' | 'status_changed' | 'customer_contacted' | 'trip_confirmed';
  title: string;
  description: string;
  timestamp: string;
  booking_id?: string;
  user?: string;
}

export interface DashboardStats {
  totalEnquiries: number;
  totalChange: string;
  newEnquiries: number;
  newChange: string;
  contacted: number;
  contactedChange: string;
  confirmedTrips: number;
  confirmedChange: string;
  publishedPhotos: number;
  publishedPhotosChange: string;
}

export const initialDashboardStats: DashboardStats = {
  totalEnquiries: 148,
  totalChange: '+14% from last month',
  newEnquiries: 12,
  newChange: 'Requires quick follow-up',
  contacted: 45,
  contactedChange: 'In active coordination',
  confirmedTrips: 86,
  confirmedChange: 'Vehicles & stays assigned',
  publishedPhotos: 24,
  publishedPhotosChange: 'Live on public website',
};

export const initialMockEnquiries: BookingEnquiry[] = [
  {
    id: 'JS-2026-1048',
    created_at: '15 mins ago',
    customer_name: 'Ramesh Krishnan',
    phone: '+91 98401 23456',
    email: 'ramesh.k78@gmail.com',
    service_type: 'Tour Package',
    package_name: 'Tamil Nadu Temple Tour',
    pickup_location: 'Chennai Central Railway Station',
    destination: 'Chennai → Kanchipuram → Thanjavur → Madurai → Rameswaram',
    travel_date: '18 Oct 2026 – 24 Oct 2026 (7 Days)',
    travel_style: 'Spiritual / Temple Darshan',
    adults_count: 4,
    children_count: 0,
    preferred_vehicle: 'Toyota Innova Crysta (AC)',
    accommodation_preference: 'Deluxe 4-Star / Heritage Stays',
    guide_requirement: 'Yes — Sightseeing & Temple Guide',
    special_requests: 'Senior citizen wheelchair assistance requested at Brihadeeswarar Temple and Madurai Meenakshi Temple. Pure vegetarian South Indian meals preferred.',
    notes: 'Family arriving from Coimbatore. Requested early pickup at 6:30 AM.',
    status: 'New',
    estimated_budget: '₹68,000',
  },
  {
    id: 'JS-2026-1047',
    created_at: '1 hour ago',
    customer_name: 'Sarah Jenkins',
    phone: '+44 7911 123456',
    email: 'sarah.jenkins@outlook.co.uk',
    service_type: 'Tour Package',
    package_name: 'Kerala Houseboat & Hills',
    pickup_location: 'Cochin International Airport (COK)',
    destination: 'Kochi → Munnar → Thekkady → Alleppey Backwaters',
    travel_date: '04 Nov 2026 – 11 Nov 2026 (8 Days)',
    travel_style: 'Honeymoon & Leisure',
    adults_count: 2,
    children_count: 0,
    preferred_vehicle: 'Toyota Innova Crysta (AC)',
    accommodation_preference: 'Premium 5-Star / Luxury Resorts',
    guide_requirement: 'Chauffeur cum Guide is sufficient',
    special_requests: 'Private luxury houseboat with traditional Kerala culinary experience. Afternoon tea estate walk in Munnar.',
    notes: 'Flight landing at 11:45 AM. WhatsApp quotation shared with itinerary brochure.',
    status: 'Contacted',
    estimated_budget: '₹95,000',
  },
  {
    id: 'JS-2026-1046',
    created_at: '3 hours ago',
    customer_name: 'Dr. Vikramaditya Rao',
    phone: '+91 94441 87654',
    email: 'dr.v.rao@apollohospitals.com',
    service_type: 'Cab / Chauffeur',
    package_name: 'Chauffeur Car Rental',
    pickup_location: 'Madipakkam, Chennai',
    destination: 'Chennai → Tirupati Balaji → Vellore Golden Temple → Chennai',
    travel_date: '25 Sep 2026 – 27 Sep 2026 (3 Days)',
    travel_style: 'Spiritual / Temple Darshan',
    adults_count: 6,
    children_count: 2,
    preferred_vehicle: 'Tempo Traveller (12-Seater AC)',
    accommodation_preference: 'Self-Arranged (TTD Guest House)',
    guide_requirement: 'No Guide Required',
    special_requests: 'Experienced hill-driving chauffeur required for Tirumala ghat road. Two child seats if feasible.',
    notes: 'Regular customer. Advance received via UPI.',
    status: 'Confirmed',
    estimated_budget: '₹24,500',
  },
  {
    id: 'JS-2026-1045',
    created_at: 'Yesterday',
    customer_name: 'Priya & Anand Sundaram',
    phone: '+65 9123 4567',
    email: 'priya.sundaram@singnet.com.sg',
    service_type: 'Tour Package',
    package_name: 'South India Explorer',
    pickup_location: 'Chennai International Airport (MAA)',
    destination: 'Chennai → Pondicherry → Chettinad → Madurai → Munnar → Kochi',
    travel_date: '10 Dec 2026 – 22 Dec 2026 (13 Days)',
    travel_style: 'Family Vacation',
    adults_count: 5,
    children_count: 1,
    preferred_vehicle: 'Urbania Luxury (AC)',
    accommodation_preference: 'Deluxe 4-Star / Heritage Stays',
    guide_requirement: 'Yes — Sightseeing & Temple Guide',
    special_requests: 'Chettinad heritage mansion stay with traditional banana-leaf cooking demonstration. French quarter walking tour in Pondicherry.',
    notes: 'Non-resident Indian family visiting during school holidays. Sent custom day-by-day plan.',
    status: 'Confirmed',
    estimated_budget: '₹1,85,000',
  },
  {
    id: 'JS-2026-1044',
    created_at: '02 Sep 2026',
    customer_name: 'Amitabh Sharma',
    phone: '+91 98100 45678',
    email: 'amitabh.sharma@tcs.com',
    service_type: 'Tour Package',
    package_name: 'Golden Triangle Tour',
    pickup_location: 'Indira Gandhi International Airport, New Delhi',
    destination: 'Delhi → Agra (Taj Mahal) → Fatehpur Sikri → Jaipur',
    travel_date: '15 Oct 2026 – 20 Oct 2026 (6 Days)',
    travel_style: 'Cultural & Heritage',
    adults_count: 3,
    children_count: 1,
    preferred_vehicle: 'Toyota Etios / Sedan (AC)',
    accommodation_preference: 'Deluxe 4-Star / Heritage Stays',
    guide_requirement: 'Yes — Sightseeing & Temple Guide',
    special_requests: 'Sunrise view of Taj Mahal with licensed Agra monument guide. Amber Fort elephant/jeep transfer in Jaipur.',
    notes: 'Customer enquired for corporate discount. Followed up via phone.',
    status: 'Contacted',
    estimated_budget: '₹52,000',
  },
  {
    id: 'JS-2026-1043',
    created_at: '01 Sep 2026',
    customer_name: 'David & Claire Miller',
    phone: '+1 415 555 0198',
    email: 'david.miller@sfbaytravel.com',
    service_type: 'Custom Trip',
    package_name: 'Custom South India & Goa Circuit',
    pickup_location: 'Bangalore Kempegowda Airport',
    destination: 'Bangalore → Mysore → Coorg → Wayanad → Goa',
    travel_date: '01 Nov 2026 – 12 Nov 2026 (12 Days)',
    travel_style: 'Leisure & Nature',
    adults_count: 2,
    children_count: 0,
    preferred_vehicle: 'Toyota Innova Crysta (AC)',
    accommodation_preference: 'Premium 5-Star / Luxury Resorts',
    guide_requirement: 'Chauffeur cum Guide is sufficient',
    special_requests: 'Coffee plantation bungalow stay in Coorg. Scenic Western Ghats road journey.',
    notes: 'Tour completed successfully last year; client re-booking for this season.',
    status: 'Completed',
    estimated_budget: '₹1,45,000',
  },
  {
    id: 'JS-2026-1042',
    created_at: '28 Aug 2026',
    customer_name: 'Karthik Subramanian',
    phone: '+91 97909 33211',
    email: 'karthik.subra@yahoo.co.in',
    service_type: 'Cab / Chauffeur',
    package_name: 'Outstation Cab Rental',
    pickup_location: 'Velachery, Chennai',
    destination: 'Chennai → Pondicherry (Round Trip)',
    travel_date: '30 Aug 2026 (1 Day)',
    travel_style: 'Family Vacation',
    adults_count: 4,
    children_count: 0,
    preferred_vehicle: 'Toyota Innova Crysta (AC)',
    accommodation_preference: 'Self-Arranged',
    guide_requirement: 'No Guide Required',
    special_requests: 'Pickup at 6:00 AM, drop back by 10:00 PM.',
    notes: 'Trip cancelled by customer due to sudden family health emergency. Security deposit refunded.',
    status: 'Cancelled',
    estimated_budget: '₹7,500',
  },
];

export const initialMockActivities: AdminActivity[] = [
  {
    id: 'act-1',
    type: 'enquiry_received',
    title: 'New Booking Enquiry Received',
    description: 'Ramesh Krishnan requested a quote for Tamil Nadu Temple Tour (4 Adults).',
    timestamp: '15 mins ago',
    booking_id: 'JS-2026-1048',
  },
  {
    id: 'act-2',
    type: 'customer_contacted',
    title: 'Customer Contacted via WhatsApp',
    description: 'Quotation and day-by-day plan sent to Sarah Jenkins for Kerala Houseboat & Hills.',
    timestamp: '1 hour ago',
    booking_id: 'JS-2026-1047',
    user: 'Aakash K',
  },
  {
    id: 'act-3',
    type: 'trip_confirmed',
    title: 'Trip Confirmed & Vehicle Assigned',
    description: 'Dr. Vikramaditya Rao confirmed Tirupati & Vellore trip (12-Seater Tempo Traveller assigned).',
    timestamp: '3 hours ago',
    booking_id: 'JS-2026-1046',
    user: 'Operations Team',
  },
  {
    id: 'act-4',
    type: 'status_changed',
    title: 'Itinerary Finalized',
    description: 'Priya & Anand Sundaram confirmed South India Explorer custom 13-day route.',
    timestamp: 'Yesterday, 5:30 PM',
    booking_id: 'JS-2026-1045',
    user: 'Aakash K',
  },
  {
    id: 'act-5',
    type: 'enquiry_received',
    title: 'New Enquiry Received',
    description: 'Amitabh Sharma requested Golden Triangle 6-day package quotation.',
    timestamp: '02 Sep 2026',
    booking_id: 'JS-2026-1044',
  },
];
