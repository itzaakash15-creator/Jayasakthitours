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

export interface ReviewRecord {
  id: string; // uuid
  created_at: string;
  customer_name: string;
  rating: number; // 1-5
  review_text: string;
  approved: boolean;
}

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================

// Official Supabase credentials for Jayashakthi Tours & Travels
const DEFAULT_SUPABASE_URL = 'https://ouxbzcsgrfxlgcyegtwa.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_gh-Ta8gDHh2hfUtII8sUgg_NXQvqc8F';

export const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL)) ||
  (typeof (globalThis as any).process !== 'undefined' && (globalThis as any).process.env && ((globalThis as any).process.env.VITE_SUPABASE_URL || (globalThis as any).process.env.SUPABASE_URL)) ||
  DEFAULT_SUPABASE_URL;

export const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)) ||
  (typeof (globalThis as any).process !== 'undefined' && (globalThis as any).process.env && ((globalThis as any).process.env.VITE_SUPABASE_PUBLISHABLE_KEY || (globalThis as any).process.env.VITE_SUPABASE_ANON_KEY || (globalThis as any).process.env.SUPABASE_ANON_KEY)) ||
  DEFAULT_SUPABASE_ANON_KEY;

// If in Node/SSR environment without native WebSocket, polyfill globalThis.WebSocket to avoid runtime crash
if (typeof window === 'undefined' && typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = class DummyWebSocket {};
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
});

// =============================================================================
// INITIAL SEED DATA FOR GALLERY (LOCAL PERSISTENCE & FALLBACK)
// =============================================================================

const STORAGE_KEY_GALLERY = 'jst_gallery_v2';

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

// Helper for local storage retrieval with safety
function getStoredItems<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[Supabase Storage] Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function saveStoredItems<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(`jst:${key}_updated`, { detail: items }));
  } catch (err) {
    console.error(`[Supabase Storage] Error writing to ${key}:`, err);
  }
}

// =============================================================================
// DATABASE PAYLOAD ADAPTERS (MATCHING SUPABASE TABLE SCHEMA)
// =============================================================================

/**
 * Strips client-only / generated columns before inserting to Supabase.
 * - 'id' stores the Reference ID (e.g. 'JST-26-0001').
 * - 'total_travellers' is GENERATED ALWAYS in PostgreSQL (must NOT be in payload).
 * - 'reference_id' is mapped to 'id'.
 * - 'email' must be a non-null string to satisfy PostgreSQL NOT NULL constraint.
 */
export function toSupabaseBookingPayload(record: BookingRecord) {
  return {
    id: record.id,
    created_at: record.created_at || new Date().toISOString(),
    updated_at: record.updated_at || new Date().toISOString(),
    full_name: record.full_name || 'Anonymous Guest',
    phone: record.phone || '',
    email: record.email ? record.email.trim() : '',
    pickup_location: record.pickup_location || '',
    destination: record.destination || '',
    travel_date: record.travel_date || '',
    trip_type: record.trip_type || 'Family Vacation',
    service_type: record.service_type || 'Tour Package',
    tour_package: record.tour_package || null,
    estimated_budget: record.estimated_budget || null,
    adults: Number(record.adults) || 1,
    children: Number(record.children) || 0,
    preferred_vehicle: record.preferred_vehicle || 'Toyota Innova Crysta (AC)',
    accommodation_preference: record.accommodation_preference || 'Deluxe 4-Star / Heritage Stays',
    tour_guide_requirement: record.tour_guide_requirement || 'Yes — Sightseeing & Temple Guide',
    special_requests: record.special_requests || '',
    additional_notes: record.additional_notes || '',
    booking_status: record.booking_status || 'New',
    admin_notes: record.admin_notes || '',
  };
}

/**
 * Reconstructs a full typed BookingRecord from a Supabase row.
 */
export function fromSupabaseBookingRow(row: any): BookingRecord {
  const adults = Number(row.adults) || 0;
  const children = Number(row.children) || 0;
  return {
    id: row.id,
    reference_id: row.id,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
    full_name: row.full_name || 'Guest',
    phone: row.phone || '',
    whatsapp_number: row.phone || '',
    email: row.email || '',
    pickup_location: row.pickup_location || '',
    destination: row.destination || '',
    travel_date: row.travel_date || '',
    trip_type: row.trip_type || 'Family Vacation',
    service_type: row.service_type || 'Tour Package',
    tour_package: row.tour_package || '',
    estimated_budget: row.estimated_budget || '',
    adults,
    children,
    total_travellers:
      Number(row.total_travellers) || (adults + children),
    preferred_vehicle: row.preferred_vehicle || 'Toyota Innova Crysta (AC)',
    accommodation_preference: row.accommodation_preference || '',
    tour_guide_requirement: row.tour_guide_requirement || '',
    special_requests: row.special_requests || '',
    additional_notes: row.additional_notes || '',
    booking_status: (row.booking_status as BookingStatus) || 'New',
    admin_notes: row.admin_notes || '',
  };
}

// =============================================================================
// BOOKINGS SERVICE API (DIRECT SUPABASE PERSISTENCE & FETCHING)
// =============================================================================

/**
 * Fetches all bookings directly from Supabase bookings table.
 * Does NOT use mock data or local storage fallbacks.
 */
export async function fetchBookings(): Promise<BookingRecord[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] fetchBookings error:', error);
      return [];
    }

    if (data && Array.isArray(data)) {
      return data.map(fromSupabaseBookingRow);
    }

    return [];
  } catch (err) {
    console.error('[Supabase] fetchBookings unexpected error:', err);
    return [];
  }
}

/**
 * Inserts a customer booking enquiry directly into the Supabase bookings table.
 * Strips generated/missing columns and does not use .select() to prevent RLS representation failure.
 */
export async function createBooking(
  bookingInput: Omit<BookingRecord, 'id' | 'created_at' | 'updated_at'> & {
    id?: string;
    reference_id?: string;
  }
): Promise<BookingRecord> {
  const newRefId =
    bookingInput.id && isValidReferenceId(bookingInput.id)
      ? bookingInput.id
      : bookingInput.reference_id && isValidReferenceId(bookingInput.reference_id)
      ? bookingInput.reference_id
      : generateNextReferenceId();

  const now = new Date().toISOString();

  const newRecord: BookingRecord = {
    ...bookingInput,
    id: newRefId,
    reference_id: newRefId,
    created_at: now,
    updated_at: now,
    email: bookingInput.email?.trim() || '',
    total_travellers: (Number(bookingInput.adults) || 0) + (Number(bookingInput.children) || 0),
    booking_status: bookingInput.booking_status || 'New',
    admin_notes: bookingInput.admin_notes || '',
  };

  const payload = toSupabaseBookingPayload(newRecord);

  // [DEBUG 3] Immediately before supabase.from('bookings').insert()
  console.log('[DEBUG 3] Immediately before supabase.from("bookings").insert(). Target table: "bookings"');

  // [DEBUG 4] Log the exact data object being sent to Supabase
  console.log('[DEBUG 4] Exact data object being sent to Supabase:', payload);

  let insertResponse: any;
  try {
    insertResponse = await supabase
      .from('bookings')
      .insert([payload]);
  } catch (caughtErr: any) {
    // [DEBUG 6] Log any caught exceptions
    console.error('[DEBUG 6] Caught network/runtime exception during supabase.from("bookings").insert():', caughtErr);
    throw caughtErr;
  }

  const { data, error, status, statusText } = insertResponse || {};

  // [DEBUG 5] Immediately after the Supabase insert, log both data and error
  console.log('[DEBUG 5] Immediately after Supabase insert:', {
    data,
    error,
    status,
    statusText,
  });

  if (error) {
    // [DEBUG 6] Log Supabase error object
    console.error('[DEBUG 6] Supabase returned error from insert:', error);

    // Collision handling: if ID already exists, advance sequence and retry once
    if (error.code === '23505') {
      console.warn('[Supabase] ID collision detected in database, advancing sequence...');
      const nextId = generateNextReferenceId();
      const resolvedRecord = { ...newRecord, id: nextId, reference_id: nextId };
      const retryPayload = toSupabaseBookingPayload(resolvedRecord);
      console.log('[DEBUG 4-RETRY] Retrying insert with advanced ID payload:', retryPayload);
      const { data: retryData, error: retryErr } = await supabase.from('bookings').insert([retryPayload]);
      console.log('[DEBUG 5-RETRY] Retry insert result:', { retryData, retryErr });
      if (retryErr) {
        console.error('[DEBUG 6] Retry insert failed:', retryErr);
        throw new Error(retryErr.message || 'Failed to save booking to Supabase database.');
      }
      console.info('[Supabase] Successfully saved booking with advanced ID:', nextId);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('jst:bookings_updated', { detail: resolvedRecord }));
        window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated', { detail: resolvedRecord }));
      }
      return resolvedRecord;
    }

    throw new Error(error.message || `Database error (${error.code || 'UNKNOWN'}): ${JSON.stringify(error)}`);
  }

  console.info('[Supabase] Successfully inserted booking to Supabase table:', newRefId);

  // Notify listeners across the app (Admin Portal, CRM)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated', { detail: newRecord }));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated', { detail: newRecord }));
  }

  return newRecord;
}

export async function updateBookingStatus(
  id: string,
  newStatus: BookingStatus
): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('bookings')
    .update({ booking_status: newStatus, updated_at: now })
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to update status of ${id}:`, error);
    throw new Error(error.message || 'Failed to update booking status in Supabase');
  }

  console.info(`[Supabase] Successfully updated status of ${id} to ${newStatus}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated'));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated'));
  }
  return null;
}

export async function updateBookingNotes(
  id: string,
  notes: string
): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('bookings')
    .update({ admin_notes: notes, updated_at: now })
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to update notes of ${id}:`, error);
    throw new Error(error.message || 'Failed to update notes in Supabase');
  }

  console.info(`[Supabase] Successfully updated notes of ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated'));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated'));
  }
  return null;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) {
    console.error('[Supabase] Failed to delete booking:', error);
    throw new Error(error.message || 'Failed to delete booking from Supabase');
  }

  console.info(`[Supabase] Successfully deleted booking ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:bookings_updated'));
    window.dispatchEvent(new CustomEvent('jst:jst_bookings_v3_updated'));
  }
  return true;
}

// =============================================================================
// GALLERY PHOTOS SERVICE API
// ===========================================================================================================================================

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

// =============================================================================
// REVIEWS SERVICE API (DIRECT SUPABASE PERSISTENCE)
// =============================================================================

/**
 * Fetches all approved reviews from Supabase for public website display.
 * Only returns reviews where approved = true. Does NOT use fallback or mock data.
 */
export async function fetchApprovedReviews(): Promise<ReviewRecord[]> {
  try {
    console.log('[DEBUG REVIEW] Public Website: Querying supabase.from("reviews").select("*").eq("approved", true)...');
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DEBUG REVIEW] Public Website: Error fetching approved reviews:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    console.log('[DEBUG REVIEW] Public Website: Successfully fetched approved reviews count:', (data || []).length, data);
    return data || [];
  } catch (err) {
    console.error('[DEBUG REVIEW] Public Website: Unexpected error fetching approved reviews:', err);
    return [];
  }
}

/**
 * Fetches all reviews (both approved and pending) from Supabase for Admin Portal.
 * Does NOT use fallback or mock data.
 */
export async function fetchAllReviews(): Promise<ReviewRecord[]> {
  try {
    console.log('[DEBUG REVIEW] Admin Portal: Querying supabase.from("reviews").select("*")...');
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DEBUG REVIEW] Admin Portal: Error fetching all reviews:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    console.log('[DEBUG REVIEW] Admin Portal: Successfully fetched reviews count:', (data || []).length, data);
    return data || [];
  } catch (err) {
    console.error('[DEBUG REVIEW] Admin Portal: Unexpected error fetching all reviews:', err);
    return [];
  }
}

/**
 * Inserts a customer review into Supabase with approved = false.
 */
export async function createReview(input: {
  customer_name: string;
  rating: number;
  review_text: string;
}): Promise<ReviewRecord> {
  const payload = {
    customer_name: input.customer_name.trim(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    review_text: input.review_text.trim(),
    approved: false, // strictly pending approval by default
  };

  console.log('[DEBUG REVIEW] 3. Immediately before Supabase insert:', payload);

  // Direct insertion into the Supabase reviews table
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      customer_name: payload.customer_name,
      rating: payload.rating,
      review_text: payload.review_text,
      approved: false,
    })
    .select();

  console.log('[DEBUG REVIEW] 4. Supabase insert response - data:', data, 'error:', error);

  if (error) {
    console.error('[DEBUG REVIEW] Supabase Insert Error Details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(error.message || `Supabase Insert Error: ${error.code}`);
  }

  if (!data || data.length === 0) {
    throw new Error('Supabase did not return any confirmed created row. Review was not saved.');
  }

  const createdRow = data[0] as ReviewRecord;
  console.log('[DEBUG REVIEW] 5. Successfully inserted review into Supabase:', createdRow);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
  }

  return createdRow;
}

/**
 * Approves a pending review in Supabase (sets approved = true).
 */
export async function approveReview(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('reviews')
    .update({ approved: true })
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to approve review ${id}:`, error);
    throw new Error(error.message || 'Failed to approve review');
  }

  console.info(`[Supabase] Successfully approved review: ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
  }
  return true;
}

/**
 * Deletes a review record permanently from Supabase.
 */
export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`[Supabase] Failed to delete review ${id}:`, error);
    throw new Error(error.message || 'Failed to delete review');
  }

  console.info(`[Supabase] Successfully deleted review: ${id}`);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
  }
  return true;
}
