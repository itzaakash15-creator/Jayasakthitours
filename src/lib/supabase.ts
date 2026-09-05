import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { clientPhotos } from '../data/clientPhotos';
import { generateNextReferenceId, isValidReferenceId } from '../services/referenceIdService';

// =============================================================================
// TYPES & SCHEMAS
// =============================================================================

export type BookingStatus =
  | 'New'
  | 'Contacted'
  | 'Quotation Sent'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export type GalleryCategory =
  | 'Client Experiences'
  | 'Temple Tours'
  | 'South India'
  | 'Kerala'
  | 'Rajasthan'
  | 'Golden Triangle'
  | 'Cab & Travel'
  | 'Nature & Scenic'
  | 'Other';

export interface BookingRecord {
  id: string; // JST-YY-XXXX (e.g. JST-26-0001)
  reference_id?: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone: string;
  whatsapp_number?: string;
  email: string;
  pickup_location: string;
  destination: string;
  travel_date: string;
  trip_type: string;
  service_type: string;
  tour_package?: string;
  estimated_budget?: string;
  adults: number;
  children: number;
  total_travellers: number;
  preferred_vehicle: string;
  accommodation_preference: string;
  tour_guide_requirement: string;
  special_requests: string;
  additional_notes: string;
  booking_status: BookingStatus;
  admin_notes: string;
}

export interface GalleryPhotoRecord {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  caption: string;
  location: string;
  tour_name?: string;
  category: GalleryCategory;
  image_url: string;
  storage_path?: string;
  aspect: 'landscape' | 'portrait' | 'square';
  status: 'Published' | 'Hidden';
  uploaded_by?: string;
}

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// =============================================================================
// INITIAL SEED DATA FOR SEAMLESS RUNTIME (LOCAL PERSISTENCE)
// =============================================================================

const STORAGE_KEY_BOOKINGS = 'jst_bookings_v3';
const STORAGE_KEY_GALLERY = 'jst_gallery_v2';

const defaultSeedBookings: BookingRecord[] = [
  {
    id: 'JST-26-0001',
    reference_id: 'JST-26-0001',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    full_name: 'Ramesh Krishnan',
    phone: '+91 98401 23456',
    email: 'ramesh.k78@gmail.com',
    pickup_location: 'Chennai Central Railway Station',
    destination: 'Chennai → Kanchipuram → Thanjavur → Madurai → Rameswaram',
    travel_date: '18 Oct 2026 – 24 Oct 2026 (7 Days)',
    trip_type: 'Spiritual / Temple Darshan',
    service_type: 'Tour Package',
    tour_package: 'Tamil Nadu Temple Tour',
    estimated_budget: '₹68,000',
    adults: 4,
    children: 0,
    total_travellers: 4,
    preferred_vehicle: 'Toyota Innova Crysta (AC)',
    accommodation_preference: 'Deluxe 4-Star / Heritage Stays',
    tour_guide_requirement: 'Yes — Sightseeing & Temple Guide',
    special_requests:
      'Senior citizen wheelchair assistance requested at Brihadeeswarar Temple and Madurai Meenakshi Temple. Pure vegetarian South Indian meals preferred.',
    additional_notes: 'Family arriving from Coimbatore. Requested early pickup at 6:30 AM.',
    booking_status: 'New',
    admin_notes: 'Priority enquiry. Chauffeur Kumar flagged for early morning railway station pickup.',
  },
  {
    id: 'JST-26-0002',
    reference_id: 'JST-26-0002',
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    full_name: 'Sarah Jenkins',
    phone: '+44 7911 123456',
    email: 'sarah.jenkins@outlook.co.uk',
    pickup_location: 'Cochin International Airport (COK)',
    destination: 'Kochi → Munnar → Thekkady → Alleppey Backwaters',
    travel_date: '04 Nov 2026 – 11 Nov 2026 (8 Days)',
    trip_type: 'Honeymoon & Leisure',
    service_type: 'Tour Package',
    tour_package: 'Kerala Houseboat & Hills',
    estimated_budget: '₹95,000',
    adults: 2,
    children: 0,
    total_travellers: 2,
    preferred_vehicle: 'Toyota Innova Crysta (AC)',
    accommodation_preference: 'Premium 5-Star / Luxury Resorts',
    tour_guide_requirement: 'Chauffeur cum Guide is sufficient',
    special_requests:
      'Private luxury houseboat with traditional Kerala culinary experience. Afternoon tea estate walk in Munnar.',
    additional_notes: 'Flight landing at 11:45 AM. WhatsApp quotation shared with itinerary brochure.',
    booking_status: 'Contacted',
    admin_notes: 'Spoke with guest via WhatsApp. Sent luxury resort option in Munnar (Fragrant Nature). Waiting for date confirmation.',
  },
  {
    id: 'JST-26-0003',
    reference_id: 'JST-26-0003',
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    full_name: 'Dr. Vikramaditya Rao',
    phone: '+91 94441 87654',
    email: 'dr.v.rao@apollohospitals.com',
    pickup_location: 'Madipakkam, Chennai',
    destination: 'Chennai → Tirupati Balaji → Vellore Golden Temple → Chennai',
    travel_date: '25 Sep 2026 – 27 Sep 2026 (3 Days)',
    trip_type: 'Spiritual / Temple Darshan',
    service_type: 'Cab / Chauffeur',
    tour_package: 'Chauffeur Car Rental',
    estimated_budget: '₹24,500',
    adults: 6,
    children: 2,
    total_travellers: 8,
    preferred_vehicle: 'Tempo Traveller (12-Seater AC)',
    accommodation_preference: 'Self-Arranged (TTD Guest House)',
    tour_guide_requirement: 'No Guide Required',
    special_requests:
      'Experienced hill-driving chauffeur required for Tirumala ghat road. Two child seats if feasible.',
    additional_notes: 'Regular customer. Advance received via UPI.',
    booking_status: 'Confirmed',
    admin_notes: 'Booking confirmed. Chauffeur Murugan assigned with sanitized 12-seater AC Tempo Traveller.',
  },
  {
    id: 'JST-26-0004',
    reference_id: 'JST-26-0004',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    full_name: 'Priya & Anand Sundaram',
    phone: '+65 9123 4567',
    email: 'priya.sundaram@singnet.com.sg',
    pickup_location: 'Chennai International Airport (MAA)',
    destination: 'Chennai → Pondicherry → Chettinad → Madurai → Munnar → Kochi',
    travel_date: '10 Dec 2026 – 22 Dec 2026 (13 Days)',
    trip_type: 'Family Vacation',
    service_type: 'Tour Package',
    tour_package: 'South India Explorer',
    estimated_budget: '₹1,85,000',
    adults: 5,
    children: 1,
    total_travellers: 6,
    preferred_vehicle: 'Urbania Luxury (AC)',
    accommodation_preference: 'Deluxe 4-Star / Heritage Stays',
    tour_guide_requirement: 'Yes — Sightseeing & Temple Guide',
    special_requests:
      'Chettinad heritage mansion stay with traditional banana-leaf cooking demonstration. French quarter walking tour in Pondicherry.',
    additional_notes: 'Non-resident Indian family visiting during school holidays. Sent custom day-by-day plan.',
    booking_status: 'Confirmed',
    admin_notes: 'Detailed 13-day proposal with heritage stays emailed. Follow-up scheduled for Monday.',
  },
  {
    id: 'JST-26-0005',
    reference_id: 'JST-26-0005',
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    full_name: 'Amitabh Sharma',
    phone: '+91 98100 45678',
    email: 'amitabh.sharma@tcs.com',
    pickup_location: 'Indira Gandhi International Airport, New Delhi',
    destination: 'Delhi → Agra (Taj Mahal) → Fatehpur Sikri → Jaipur',
    travel_date: '15 Oct 2026 – 20 Oct 2026 (6 Days)',
    trip_type: 'Cultural & Heritage',
    service_type: 'Tour Package',
    tour_package: 'Golden Triangle Tour',
    estimated_budget: '₹52,000',
    adults: 3,
    children: 1,
    total_travellers: 4,
    preferred_vehicle: 'Toyota Etios / Sedan (AC)',
    accommodation_preference: 'Deluxe 4-Star / Heritage Stays',
    tour_guide_requirement: 'Yes — Sightseeing & Temple Guide',
    special_requests: 'Sunrise view of Taj Mahal with licensed Agra monument guide.',
    additional_notes: 'Customer enquired for corporate travel plan.',
    booking_status: 'Contacted',
    admin_notes: 'Contacted client regarding corporate discount rates. Re-sending updated package breakdown.',
  },
];

// Seed initial gallery photos from existing verified clientPhotos
const defaultSeedGalleryPhotos: GalleryPhotoRecord[] = clientPhotos.map((photo) => {
  let cat: GalleryCategory = 'Client Experiences';
  if (photo.categories?.includes('Temple Visits')) cat = 'Temple Tours';
  else if (photo.categories?.includes('South India')) cat = 'South India';
  else if (photo.categories?.includes('Rajasthan')) cat = 'Rajasthan';

  return {
    id: `gal-${photo.id}`,
    created_at: new Date(Date.now() - photo.id * 86400 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    title: photo.destination || 'South India Journey',
    caption: photo.caption || photo.destination || 'Authentic client journey with Jayashakthi Tours',
    location: photo.destination || 'South India',
    tour_name: photo.destination || 'Custom South India Tour',
    category: cat,
    image_url: photo.image,
    aspect: photo.aspect || 'landscape',
    status: 'Published',
    uploaded_by: 'Jayashakthi Operations',
  };
});

// Helper for local storage retrieval with safety & format migration
function getStoredItems<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      // Check if older version exists to migrate cleanly
      if (key === STORAGE_KEY_BOOKINGS) {
        const legacy = localStorage.getItem('jst_bookings_v2');
        if (legacy) {
          try {
            const parsedLegacy = JSON.parse(legacy);
            if (Array.isArray(parsedLegacy)) {
              localStorage.setItem(key, JSON.stringify(fallback));
              return fallback;
            }
          } catch {
            // ignore
          }
        }
      }
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }

    const parsed = JSON.parse(raw);

    // Auto-migrate legacy IDs to standard JST-26-XXXX format if present
    if (key === STORAGE_KEY_BOOKINGS && Array.isArray(parsed)) {
      let needsMigration = false;
      const idMap: Record<string, string> = {
        'JS-2026-1048': 'JST-26-0001',
        'JS-2026-1047': 'JST-26-0002',
        'JS-2026-1046': 'JST-26-0003',
        'JS-2026-1045': 'JST-26-0004',
        'JS-2026-1044': 'JST-26-0005',
      };

      const migrated = parsed.map((item: any) => {
        if (idMap[item.id]) {
          needsMigration = true;
          return { ...item, id: idMap[item.id], reference_id: idMap[item.id] };
        }
        if (!item.reference_id && item.id) {
          item.reference_id = item.id;
        }
        return item;
      });

      if (needsMigration) {
        localStorage.setItem(key, JSON.stringify(migrated));
        return migrated as T[];
      }
    }

    return parsed;
  } catch (err) {
    console.warn(`[Supabase Storage] Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function saveStoredItems<T>(key: string, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(`jst:${key}_updated`, { detail: items }));
  } catch (err) {
    console.error(`[Supabase Storage] Error writing to ${key}:`, err);
  }
}

// =============================================================================
// BOOKINGS SERVICE API
// =============================================================================

export async function fetchBookings(): Promise<BookingRecord[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as BookingRecord[];
      }
    } catch (err) {
      console.warn('[Supabase] Falling back to local storage for bookings:', err);
    }
  }

  return getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
}

export async function createBooking(
  bookingInput: Omit<BookingRecord, 'id' | 'created_at' | 'updated_at'> & {
    id?: string;
    reference_id?: string;
  }
): Promise<BookingRecord> {
  const existing = getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
  const newRefId =
    bookingInput.id && isValidReferenceId(bookingInput.id)
      ? bookingInput.id
      : bookingInput.reference_id && isValidReferenceId(bookingInput.reference_id)
      ? bookingInput.reference_id
      : generateNextReferenceId(existing);

  const now = new Date().toISOString();

  const newRecord: BookingRecord = {
    ...bookingInput,
    id: newRefId,
    reference_id: newRefId,
    created_at: now,
    updated_at: now,
    total_travellers: (bookingInput.adults || 0) + (bookingInput.children || 0),
    booking_status: bookingInput.booking_status || 'New',
    admin_notes: bookingInput.admin_notes || '',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([newRecord])
        .select()
        .single();

      if (!error && data) {
        // Also update local cache
        const local = getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
        saveStoredItems(STORAGE_KEY_BOOKINGS, [data, ...local.filter((b) => b.id !== newRefId)]);
        return data as BookingRecord;
      }
    } catch (err) {
      console.warn('[Supabase] Failed to insert to Supabase, writing to local storage:', err);
    }
  }

  // Local storage save
  const updated = [newRecord, ...existing.filter((b) => b.id !== newRefId)];
  saveStoredItems(STORAGE_KEY_BOOKINGS, updated);
  return newRecord;
}

export async function updateBookingStatus(
  id: string,
  newStatus: BookingStatus
): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ booking_status: newStatus, updated_at: now })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const local = getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
        saveStoredItems(
          STORAGE_KEY_BOOKINGS,
          local.map((b) => (b.id === id ? (data as BookingRecord) : b))
        );
        return data as BookingRecord;
      }
    } catch (err) {
      console.warn('[Supabase] Failed to update status in Supabase:', err);
    }
  }

  const existing = getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
  let updatedRecord: BookingRecord | null = null;
  const nextList = existing.map((b) => {
    if (b.id === id) {
      updatedRecord = { ...b, booking_status: newStatus, updated_at: now };
      return updatedRecord;
    }
    return b;
  });
  saveStoredItems(STORAGE_KEY_BOOKINGS, nextList);
  return updatedRecord;
}

export async function updateBookingNotes(
  id: string,
  notes: string
): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ admin_notes: notes, updated_at: now })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const local = getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
        saveStoredItems(
          STORAGE_KEY_BOOKINGS,
          local.map((b) => (b.id === id ? (data as BookingRecord) : b))
        );
        return data as BookingRecord;
      }
    } catch (err) {
      console.warn('[Supabase] Failed to update notes in Supabase:', err);
    }
  }

  const existing = getStoredItems<BookingRecord>(STORAGE_KEY_BOOKINGS, defaultSeedBookings);
  let updatedRecord: BookingRecord | null = null;
  const nextList = existing.map((b) => {
    if (b.id === id) {
      updatedRecord = { ...b, admin_notes: notes, updated_at: now };
      return updatedRecord;
    }
    return b;
  });
  saveStoredItems(STORAGE_KEY_BOOKINGS, nextList);
  return updatedRecord;
}

// =============================================================================
// GALLERY PHOTOS SERVICE API
// =============================================================================

export async function fetchGalleryPhotos(): Promise<GalleryPhotoRecord[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as GalleryPhotoRecord[];
      }
    } catch (err) {
      console.warn('[Supabase] Falling back to local storage for gallery photos:', err);
    }
  }

  return getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
}

export async function fetchPublishedGalleryPhotos(): Promise<GalleryPhotoRecord[]> {
  const all = await fetchGalleryPhotos();
  return all.filter((photo) => photo.status === 'Published');
}

export async function createGalleryPhoto(
  photoInput: Omit<GalleryPhotoRecord, 'id' | 'created_at' | 'updated_at'> & { id?: string }
): Promise<GalleryPhotoRecord> {
  const newId = photoInput.id || `gal-${Date.now()}`;
  const now = new Date().toISOString();

  const newRecord: GalleryPhotoRecord = {
    ...photoInput,
    id: newId,
    created_at: now,
    updated_at: now,
    status: photoInput.status || 'Published',
    aspect: photoInput.aspect || 'landscape',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .insert([newRecord])
        .select()
        .single();

      if (!error && data) {
        const local = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
        saveStoredItems(STORAGE_KEY_GALLERY, [data, ...local.filter((g) => g.id !== newId)]);
        return data as GalleryPhotoRecord;
      }
    } catch (err) {
      console.warn('[Supabase] Failed to insert gallery photo to Supabase:', err);
    }
  }

  const existing = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
  const updated = [newRecord, ...existing.filter((g) => g.id !== newId)];
  saveStoredItems(STORAGE_KEY_GALLERY, updated);
  return newRecord;
}

export async function updateGalleryPhoto(
  id: string,
  updates: Partial<Omit<GalleryPhotoRecord, 'id' | 'created_at'>>
): Promise<GalleryPhotoRecord | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .update({ ...updates, updated_at: now })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const local = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
        saveStoredItems(
          STORAGE_KEY_GALLERY,
          local.map((g) => (g.id === id ? (data as GalleryPhotoRecord) : g))
        );
        return data as GalleryPhotoRecord;
      }
    } catch (err) {
      console.warn('[Supabase] Failed to update gallery photo in Supabase:', err);
    }
  }

  const existing = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
  let updatedRecord: GalleryPhotoRecord | null = null;
  const nextList = existing.map((g) => {
    if (g.id === id) {
      updatedRecord = { ...g, ...updates, updated_at: now };
      return updatedRecord;
    }
    return g;
  });
  saveStoredItems(STORAGE_KEY_GALLERY, nextList);
  return updatedRecord;
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
      if (!error) {
        const local = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
        saveStoredItems(
          STORAGE_KEY_GALLERY,
          local.filter((g) => g.id !== id)
        );
        return true;
      }
    } catch (err) {
      console.warn('[Supabase] Failed to delete gallery photo in Supabase:', err);
    }
  }

  const existing = getStoredItems<GalleryPhotoRecord>(STORAGE_KEY_GALLERY, defaultSeedGalleryPhotos);
  const nextList = existing.filter((g) => g.id !== id);
  saveStoredItems(STORAGE_KEY_GALLERY, nextList);
  return true;
}

/**
 * Upload an image file to Supabase storage if available,
 * or convert to high-efficiency data URL / object URL locally.
 */
export async function uploadGalleryImage(file: File): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `client-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (!uploadError) {
        const { data } = supabase.storage.from('gallery').getPublicUrl(filePath);
        if (data?.publicUrl) return data.publicUrl;
      }
    } catch (err) {
      console.warn('[Supabase Storage] Fallback to FileReader:', err);
    }
  }

  // Local fallback: convert to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
